package com.bookorbit.feature.reader.narration

import android.content.Context
import android.util.Log
import com.bookorbit.core.storage.LocalRef
import com.bookorbit.core.storage.openInputStream
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.io.File
import java.net.URLDecoder
import java.util.zip.ZipInputStream
import javax.inject.Inject
import javax.inject.Singleton

/**
 * Extracts a book's Media Overlay audio files out of its EPUB (a zip archive) once into a cache
 * dir, so they can be handed to Media3 as plain local files. Streams through the zip sequentially
 * and copies entries straight to disk (never buffers a whole entry in memory) since [LocalRef] may
 * be a SAF document with no random access.
 */
@Singleton
class NarrationAudioExtractor @Inject constructor(
    @ApplicationContext private val context: Context,
) {
    /** One [File] per *playable* entry of the requested `audioSrcs`, plus which original indices
     * (into that list) they correspond to, in the same order as [files] - so a caller can remap
     * [NarrationItem.audioIndex] through [playableAudioIndices] and drop items that pointed at an
     * index that didn't make it in. */
    data class Result(val files: List<File>, val playableAudioIndices: List<Int>)

    /**
     * Extracts [audioSrcs] (EPUB-internal zip paths, as resolved by bridge.js) for [bookId],
     * reusing cached copies from an earlier call. An entry whose audio can't be found in the zip
     * is dropped rather than failing the whole book - see [Result] - and this only throws if
     * *nothing* in the book turned out to be playable.
     *
     * Also evicts every other book's narration cache dir on extract: this audio can run to
     * hundreds of MB per book, so only the book currently being listened to is kept on disk.
     */
    suspend fun extract(ref: LocalRef, bookId: Int, audioSrcs: List<String>): Result =
        withContext(Dispatchers.IO) {
            val root = File(context.cacheDir, "narration-cache").apply { mkdirs() }
            evictOtherBooks(root, bookId)
            val dir = File(root, "$bookId").apply { mkdirs() }
            val dests = audioSrcs.indices.map { i -> File(dir, "a$i.audio") }
            val missing = audioSrcs.indices
                .filter { i -> !dests[i].exists() || dests[i].length() <= 0L }
                .toMutableSet()
            if (missing.isNotEmpty()) {
                // Match zip entries by decoded name, so a zip-internal path that differs only in
                // URL-encoding (e.g. spaces as %20) from what bridge.js resolved still matches.
                val wanted = missing.associateTo(LinkedHashMap()) { i -> decodedName(audioSrcs[i]) to i }
                ZipInputStream(ref.openInputStream(context)).use { zis ->
                    while (wanted.isNotEmpty()) {
                        val entry = zis.nextEntry ?: break
                        val i = wanted.remove(decodedName(entry.name))
                        if (i != null) {
                            dests[i].outputStream().use { out -> zis.copyTo(out) }
                            missing.remove(i)
                        }
                        zis.closeEntry()
                    }
                }
                for (i in missing) {
                    Log.w(TAG, "narration audio not found in EPUB bookId=$bookId src=${audioSrcs[i]}")
                }
            }
            check(missing.size < audioSrcs.size) { "No narration audio found in EPUB (bookId=$bookId)" }
            val playableIndices = audioSrcs.indices.filterNot { it in missing }
            Result(files = playableIndices.map { dests[it] }, playableAudioIndices = playableIndices)
        }

    private fun decodedName(name: String): String = runCatching { URLDecoder.decode(name, "UTF-8") }.getOrDefault(name)

    /** Deletes every narration cache subdirectory except [keepBookId]'s. Best-effort: a failure to
     * delete an old dir just leaves it behind for next time rather than failing this extraction. */
    private fun evictOtherBooks(root: File, keepBookId: Int) {
        val keep = keepBookId.toString()
        root.listFiles()?.forEach { child ->
            if (child.isDirectory && child.name != keep) {
                runCatching { child.deleteRecursively() }
                    .onFailure { Log.w(TAG, "couldn't evict narration cache dir ${child.name}", it) }
            }
        }
    }

    private companion object {
        const val TAG = "BookOrbitNarration"
    }
}
