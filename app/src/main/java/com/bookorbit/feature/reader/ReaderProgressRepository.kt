package com.bookorbit.feature.reader

import android.util.Log
import com.bookorbit.core.db.ReaderProgressDao
import com.bookorbit.core.db.ReaderProgressEntity
import com.bookorbit.core.model.SaveFileProgress
import com.bookorbit.core.network.ApiService
import com.bookorbit.core.sync.SyncScheduler
import java.time.Instant
import javax.inject.Inject
import javax.inject.Singleton

data class InitialProgress(
    val cfi: String?,
    val fraction: Double?,
    val pageNumber: Int? = null,
    /** The server row's `updatedAt`, in ms since epoch, as read at open - the seed for the
     * "Continue from another device?" prompt's `knownServerStamp` (null if the server wasn't
     * reachable, or had no `updatedAt`, at open). */
    val serverStampMs: Long? = null,
)

/** The server's current file position, with its write time - what the "newer position" check
 * compares against this reader's own [InitialProgress.serverStampMs]/writes. */
data class ServerPosition(val cfi: String?, val fraction: Double, val percentage: Double, val stampMs: Long)

/**
 * Offline-first reading-position store keyed by server file id, backed by Room: every position is
 * written locally first (so it survives offline + restart) and kept dirty until the server accepts
 * it.
 */
@Singleton
class ReaderProgressRepository @Inject constructor(
    private val dao: ReaderProgressDao,
    private val api: ApiService,
    private val syncScheduler: SyncScheduler,
) {
    /**
     * Save locally, then attempt to push to the server (clearing dirty on success). [pageNumber] is
     * forwarded to the server for cross-client parity (the web comic reader resumes from it) and kept
     * locally so a later offline retry re-sends it.
     */
    suspend fun report(fileId: Int, cfi: String?, percentage: Double, pageNumber: Int? = null) {
        dao.upsert(ReaderProgressEntity(fileId, cfi, percentage, System.currentTimeMillis(), dirty = true, pageNumber = pageNumber))
        val ok = runCatching {
            api.saveFileProgress(fileId, SaveFileProgress(cfi, percentage, pageNumber))
        }.isSuccess
        if (ok) dao.markSynced(fileId) else syncScheduler.schedule()
    }

    /** Push every dirty position to the server. Returns true if anything is still dirty afterward. */
    suspend fun flushPending(): Boolean {
        for (entry in dao.dirtyEntries()) {
            val ok = runCatching {
                api.saveFileProgress(entry.fileId, SaveFileProgress(entry.cfi, entry.percentage, entry.pageNumber))
            }.isSuccess
            if (ok) dao.markSynced(entry.fileId)
        }
        return dao.dirtyEntries().isNotEmpty()
    }

    /** Do not let a web reader start behind a pending offline position for this file. */
    suspend fun syncBeforeWeb(fileId: Int) {
        val local = dao.get(fileId) ?: return
        if (!local.dirty) return
        api.saveFileProgress(fileId, SaveFileProgress(local.cfi, local.percentage, local.pageNumber))
        dao.markSynced(fileId)
    }

    /**
     * Where to resume: a not-yet-synced local position wins (most recent reading) UNLESS the
     * server has a genuinely newer write (e.g. listening moved the audiobook position past it -
     * see `advanceNarrationToText`/`upsertSyncedEpubProgressIfNewer` server-side); otherwise the
     * server's, otherwise the start.
     */
    suspend fun resolveInitial(fileId: Int): InitialProgress {
        val local = dao.get(fileId)
        val server = runCatching { api.getFileProgress(fileId) }.getOrNull()
        val serverMillis = server?.updatedAt?.let(::epochMillis)

        val useLocal = when {
            local == null -> false
            server == null -> true
            !local.dirty -> false
            serverMillis == null -> true
            else -> local.updatedAt >= serverMillis
        }
        Log.d(
            TAG,
            "resolveInitial fileId=$fileId source=${if (useLocal) "local" else "server"} " +
                "localUpdatedAt=${local?.updatedAt} localDirty=${local?.dirty} serverUpdatedAt=$serverMillis",
        )

        val cfi: String?
        val percentage: Double?
        val pageNumber: Int?
        if (useLocal && local != null) {
            cfi = local.cfi
            percentage = local.percentage
            pageNumber = local.pageNumber
        } else if (server != null) {
            cfi = server.cfi
            percentage = server.percentage
            pageNumber = server.pageNumber
        } else {
            return InitialProgress(null, null, serverStampMs = serverMillis)
        }
        return InitialProgress(cfi, percentage?.let { it / 100.0 }, pageNumber, serverStampMs = serverMillis)
    }

    /**
     * The server's current position for the "Continue from another device?" prompt - null if
     * unreachable (offline), if it has no row yet, or if it has no `updatedAt` to compare against.
     */
    suspend fun fetchServerPosition(fileId: Int): ServerPosition? {
        val server = runCatching { api.getFileProgress(fileId) }.getOrNull() ?: return null
        val stampMs = server.updatedAt?.let(::epochMillis) ?: return null
        return ServerPosition(server.cfi, server.percentage / 100.0, server.percentage, stampMs)
    }

    private fun epochMillis(iso: String): Long? = runCatching { Instant.parse(iso).toEpochMilli() }.getOrNull()

    private companion object {
        const val TAG = "ReaderProgressRepo"
    }
}
