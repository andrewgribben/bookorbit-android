package com.bookorbit.feature.dashboard

import android.util.Log
import com.bookorbit.core.auth.SessionManager
import com.bookorbit.core.model.DashboardShelfConfig
import com.bookorbit.core.model.DashboardShelfRow
import com.bookorbit.core.model.ExternalShelfConfig
import com.bookorbit.core.model.ShelfConfigEntry
import com.bookorbit.core.model.UpdateMeSettingsRequest
import com.bookorbit.core.network.ApiService
import com.bookorbit.core.network.ReadingServicesRepository
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.SharedFlow
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put
import javax.inject.Inject
import javax.inject.Singleton

/**
 * Reads and writes the signed-in user's dashboard shelf config, stored server-side at
 * `user.settings.dashboardShelfConfig` (see [DashboardShelfConfig] for the exact contract).
 * Scrollers and external (reading-service) shelves share one order sequence - see
 * [DashboardShelfConfig.mergedRows] - so this class reads/writes both together as
 * [DashboardShelfRow]s.
 *
 * When the user turns on "use this device's layout" ([DashboardLocalLayoutStore]), this
 * repository stops reading/writing the server copy for enabled/order (for both scrollers and
 * external shelves) and instead keeps a per-device list, merged against the current server list
 * on every read so shelves added on the server still show up and ones deleted there disappear
 * (see [DashboardShelfConfig.mergedRowsWithLocalLayout]).
 */
@Singleton
class DashboardShelfConfigRepository @Inject constructor(
    private val api: ApiService,
    private val session: SessionManager,
    private val localLayoutStore: DashboardLocalLayoutStore,
    private val readingServicesRepo: ReadingServicesRepository,
) {
    private fun rawConfig(): JsonObject? = session.currentUser?.settings?.get("dashboardShelfConfig") as? JsonObject

    /** True when the signed-in user has turned on the per-device layout for the current server. */
    suspend fun useLocalLayout(): Boolean {
        val userId = session.currentUser?.id ?: return false
        return localLayoutStore.isEnabled(userId, session.serverUrl)
    }

    /**
     * Turns the per-device layout on or off. Turning it on seeds the local layout (scrollers and
     * external shelves, on their shared order) from the current server list the first time (a
     * later toggle-off then toggle-on restores whatever was last saved locally, rather than
     * reseeding). Turning it off only flips the flag - the local copy is kept as-is so re-enabling
     * restores it.
     */
    suspend fun setUseLocalLayout(enabled: Boolean) {
        val userId = session.currentUser?.id ?: return
        if (enabled && localLayoutStore.loadRows(userId, session.serverUrl) == null) {
            refreshUser()
            val server = DashboardShelfConfig.mergedRows(rawConfig())
            localLayoutStore.saveRows(userId, session.serverUrl, server)
        }
        localLayoutStore.setEnabled(userId, session.serverUrl, enabled)
    }

    /** Ordered, enabled-filtered-by-caller scroller entries for the signed-in user (or the
     * defaults when signed out or the server has no config - see [DashboardShelfConfig.parse]).
     * Re-reads the user from the server first: the session copy is only fetched at sign-in, so
     * shelves added or reordered on the web would otherwise never appear (and a save would
     * overwrite them). Falls back to the cached copy offline. */
    suspend fun shelves(): List<ShelfConfigEntry> {
        refreshUser()
        val userId = session.currentUser?.id
        val rows = effectiveRows(userId)
        val entries = rows.filterIsInstance<DashboardShelfRow.Scroller>().map { it.entry }
        Log.i(TAG, "shelves: ${describeEntries(entries)}")
        return entries
    }

    /** The user's configured external (reading-service) shelves, enabled-filtered-by-caller, in
     * their shared order with [shelves] - or `null` when the server (or the local layout) has no
     * `externalShelves` config at all (older server, or never opened the picker), so the caller
     * can fall back to its own default. */
    suspend fun externalShelves(): List<ExternalShelfConfig>? {
        refreshUser()
        val userId = session.currentUser?.id
        if (!externalShelvesConfigured(userId)) return null
        return effectiveRows(userId).filterIsInstance<DashboardShelfRow.External>().map { it.entry }
    }

    private suspend fun externalShelvesConfigured(userId: Int?): Boolean {
        if (userId != null && localLayoutStore.isEnabled(userId, session.serverUrl)) {
            return localLayoutStore.hasExternalShelvesKey(userId, session.serverUrl)
        }
        return rawConfig()?.get("externalShelves") is JsonArray
    }

    /** Every scroller and configured external shelf, in their shared merged order (both enabled
     * and disabled rows), honouring the per-device local layout when it's on. */
    private suspend fun effectiveRows(userId: Int?): List<DashboardShelfRow> {
        val server = DashboardShelfConfig.mergedRows(rawConfig())
        if (userId == null || !localLayoutStore.isEnabled(userId, session.serverUrl)) return server
        val local = localLayoutStore.loadRows(userId, session.serverUrl) ?: server
        val merged = DashboardShelfConfig.mergedRowsWithLocalLayout(server, local)
        if (merged != local) localLayoutStore.saveRows(userId, session.serverUrl, merged)
        return merged
    }

    /**
     * The full row set for the Customize Dashboard picker: every configured row (scrollers and
     * external shelves, enabled or not, in their current effective order - server or local
     * layout, as per [effectiveRows]) plus one disabled row appended at the end for every shelf
     * `GET /reading-services/shelves/available` reports that isn't configured yet.
     */
    suspend fun rowsForEditing(): List<DashboardShelfRow> {
        refreshUser()
        val userId = session.currentUser?.id
        val base = effectiveRows(userId)
        val available = runCatching { readingServicesRepo.availableShelves() }.getOrDefault(emptyList())
        return DashboardShelfConfig.appendAvailable(base, available)
    }

    private val _saved = MutableSharedFlow<Unit>(extraBufferCapacity = 1)

    /** Emits after each successful [save], so Home can reload its shelves. */
    val saved: SharedFlow<Unit> = _saved

    private suspend fun refreshUser() {
        if (session.currentUser != null) {
            runCatching { api.getMe() }.getOrNull()?.let(session::updateCurrentUser)
        }
    }

    /**
     * Writes [rows] (scrollers and external shelves together) back to the server or, when the
     * per-device layout is on, to the local store - preserving every field this app doesn't model
     * (see [DashboardShelfConfig.buildConfigJsonForRows]) and upgrading the stored config to
     * `shelfOrderVersion: 2` on this first unified save. Never throws - callers get a [Result].
     */
    suspend fun save(rows: List<DashboardShelfRow>): Result<Unit> = runCatching {
        val ordered = DashboardShelfConfig.orderedRows(rows).mapIndexed { i, row -> row.withOrder(i + 1) }
        val userId = session.currentUser?.id
        if (userId != null && localLayoutStore.isEnabled(userId, session.serverUrl)) {
            Log.i(TAG, "saving shelves locally: ${describeRows(ordered)}")
            localLayoutStore.saveRows(userId, session.serverUrl, ordered)
            _saved.tryEmit(Unit)
            return@runCatching
        }
        refreshUser()
        val server = DashboardShelfConfig.mergedRows(rawConfig())
        val merged = DashboardShelfConfig.mergedRowsForSave(server, ordered)
        Log.i(TAG, "saving shelves: ${describeRows(merged)}")
        val configJson = DashboardShelfConfig.buildConfigJsonForRows(rawConfig(), merged)
        val request = UpdateMeSettingsRequest(buildJsonObject { put("dashboardShelfConfig", configJson) })
        val response = api.updateMySettings(request)
        val currentUser = session.currentUser
        if (currentUser != null && response.settings != null) {
            session.updateCurrentUser(currentUser.copy(settings = response.settings))
        }
        _saved.tryEmit(Unit)
    }

    private fun describeEntries(entries: List<ShelfConfigEntry>) =
        entries.joinToString { "${it.type}#${it.id}${if (it.enabled) "" else "(off)"}" } +
            " sync=" + (rawConfig()?.get("syncAcrossSessions") ?: "unset")

    private fun describeRows(rows: List<DashboardShelfRow>) = rows.joinToString {
        when (it) {
            is DashboardShelfRow.Scroller -> "${it.entry.type}#${it.entry.id}${if (it.enabled) "" else "(off)"}@${it.order}"
            is DashboardShelfRow.External -> "${it.entry.provider}:${it.entry.shelf}${if (it.enabled) "" else "(off)"}@${it.order}"
        }
    }

    private companion object {
        const val TAG = "DashboardShelves"
    }
}
