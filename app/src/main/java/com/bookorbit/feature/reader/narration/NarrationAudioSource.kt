package com.bookorbit.feature.reader.narration

import android.content.Context
import android.os.ParcelFileDescriptor
import android.util.Log
import com.bookorbit.core.storage.LocalRef
import com.bookorbit.core.storage.openParcelFileDescriptor
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.io.File
import java.net.URLDecoder
import java.util.zip.ZipFile
import javax.inject.Inject
import javax.inject.Singleton

/**
 * Resolves a book's Media Overlay audio entries so narration can play them straight out of the
 * EPUB (via [EpubZipDataSource]) instead of extracting them to disk first. Replaces the old
 * `NarrationAudioExtractor`, which streamed entries through [java.util.zip.ZipInputStream] and
 * copied them to a cache dir - that throws on the STORED-with-trailing-data-descriptor entries
 * real EPUB packagers emit for audio (`ZipException: only DEFLATED entries can have EXT
 * descriptor`), since `ZipInputStream` can't consult the central directory the way
 * [java.util.zip.ZipFile] does.
 */
@Singleton
class NarrationAudioSource @Inject constructor(
    @ApplicationContext private val context: Context,
) {
    /**
     * [epubPath] is what [EpubZipDataSource] (via [ZipFile]) should (re)open to read audio from -
     * see [resolveEpubPath]. [entryNames] is one *exact* zip entry name (as stored in the EPUB,
     * not URL-decoded) per *playable* entry of the requested `audioSrcs`, alongside which original
     * indices (into that list) they correspond to - the same contract the old extractor's `Result`
     * had, so a caller can remap [NarrationItem.audioIndex] through [playableAudioIndices] and
     * drop items that pointed at an index that didn't make it in.
     */
    data class Result(val epubPath: String, val entryNames: List<String>, val playableAudioIndices: List<Int>)

    // Kept open for as long as narration from a SAF-backed EPUB might still read from it - see
    // resolveEpubPath/release. Only ever one at a time: narration plays one book at a time.
    private var heldPfd: ParcelFileDescriptor? = null

    init {
        // Old extracted copies (from before this class replaced NarrationAudioExtractor) are dead
        // weight now - can run to hundreds of MB per book - so clear them out once per process
        // rather than leaving them on disk forever.
        runCatching { File(context.cacheDir, "narration-cache").deleteRecursively() }
    }

    /**
     * Resolves [audioSrcs] (EPUB-internal zip paths, as resolved by bridge.js) for [bookId]
     * against [ref]'s EPUB. An entry whose audio can't be found in the zip is dropped rather than
     * failing the whole book - see [Result] - and this only throws if *nothing* in the book turned
     * out to be playable.
     */
    suspend fun resolve(ref: LocalRef, bookId: Int, audioSrcs: List<String>): Result =
        withContext(Dispatchers.IO) {
            val epubPath = resolveEpubPath(ref)
            // Match zip entries by decoded name, so a zip-internal path that differs only in
            // URL-encoding (e.g. spaces as %20) from what bridge.js resolved still matches.
            val wanted = audioSrcs.withIndex().associateTo(LinkedHashMap()) { (i, src) -> decodedName(src) to i }
            val matchedNames = arrayOfNulls<String>(audioSrcs.size)
            ZipFile(epubPath).use { zip ->
                val entries = zip.entries()
                while (wanted.isNotEmpty() && entries.hasMoreElements()) {
                    val entry = entries.nextElement()
                    val i = wanted.remove(decodedName(entry.name))
                    if (i != null) matchedNames[i] = entry.name
                }
            }
            for (i in audioSrcs.indices) {
                if (matchedNames[i] == null) {
                    Log.w(TAG, "narration audio not found in EPUB bookId=$bookId src=${audioSrcs[i]}")
                }
            }
            val playableIndices = audioSrcs.indices.filter { matchedNames[it] != null }
            check(playableIndices.isNotEmpty()) { "No narration audio found in EPUB (bookId=$bookId)" }
            Result(
                epubPath = epubPath,
                entryNames = playableIndices.map { matchedNames[it]!! },
                playableAudioIndices = playableIndices,
            )
        }

    /** Releases whatever [resolveEpubPath] opened for the current/last book, if anything (a plain
     * [LocalRef.PlainFile] needs nothing closed). Safe to call even if narration never ran. */
    fun release() {
        heldPfd?.let { runCatching { it.close() } }
        heldPfd = null
    }

    /** A path [ZipFile] can open: [ref]'s own absolute path for a [LocalRef.PlainFile], or
     * `/proc/self/fd/<fd>` backed by a freshly opened [ParcelFileDescriptor] for a SAF
     * [LocalRef.ContentDoc] - [ZipFile] opens that symlink like any other file path. The pfd is
     * kept open (replacing any previous one - see [release]) for as long as narration audio from
     * it might still be read, since closing it invalidates the path.
     */
    private fun resolveEpubPath(ref: LocalRef): String = when (ref) {
        is LocalRef.PlainFile -> ref.file.absolutePath
        is LocalRef.ContentDoc -> {
            release()
            val pfd = ref.openParcelFileDescriptor(context, "r")
            heldPfd = pfd
            "/proc/self/fd/${pfd.fd}"
        }
    }

    private fun decodedName(name: String): String = runCatching { URLDecoder.decode(name, "UTF-8") }.getOrDefault(name)

    private companion object {
        const val TAG = "BookOrbitNarration"
    }
}
