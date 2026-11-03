package com.bookorbit.feature.reader.narration

import android.content.Context
import com.bookorbit.core.storage.LocalRef
import com.bookorbit.core.storage.openInputStream
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.io.File
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
    /**
     * Extracts [audioSrcs] (EPUB-internal zip paths, as resolved by bridge.js) for [bookId],
     * reusing cached copies from an earlier call. Returns one file per entry in [audioSrcs], in
     * the same order.
     */
    suspend fun extract(ref: LocalRef, bookId: Int, audioSrcs: List<String>): List<File> =
        withContext(Dispatchers.IO) {
            val dir = File(context.cacheDir, "narration-cache/$bookId").apply { mkdirs() }
            val dests = audioSrcs.indices.map { i -> File(dir, "a$i.audio") }
            val wanted = audioSrcs.indices
                .filter { i -> !dests[i].exists() || dests[i].length() <= 0L }
                .associateTo(LinkedHashMap()) { i -> audioSrcs[i] to dests[i] }
            if (wanted.isNotEmpty()) {
                ZipInputStream(ref.openInputStream(context)).use { zis ->
                    while (wanted.isNotEmpty()) {
                        val entry = zis.nextEntry ?: break
                        val dest = wanted.remove(entry.name)
                        if (dest != null) {
                            dest.outputStream().use { out -> zis.copyTo(out) }
                        }
                        zis.closeEntry()
                    }
                }
                check(wanted.isEmpty()) { "Narration audio not found in EPUB: ${wanted.keys.first()}" }
            }
            dests
        }
}
