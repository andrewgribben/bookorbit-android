package com.bookorbit.feature.reader

import java.io.Closeable
import java.io.EOFException
import java.io.InputStream
import java.util.zip.ZipFile

/**
 * Serves one local EPUB's zip entries lazily, by name, instead of loading the whole file.
 *
 * Opened with [java.util.zip.ZipFile] (reads the central directory), not
 * [java.util.zip.ZipInputStream], because real EPUB packagers write Media Overlay audio as a
 * STORED entry with a trailing data descriptor (general-purpose bit flag 0x08) - a shape
 * `ZipInputStream` refuses (`ZipException: only DEFLATED entries can have EXT descriptor`) since
 * it parses local headers as it streams rather than consulting the central directory. See the
 * narration feature's `EpubZipEntryReader` for the same approach applied to audio playback.
 *
 * Pure JVM/`java.util.zip` - no Android dependency - so position/range/validation logic (the part
 * worth covering) runs as a plain unit test. [LocalEpubAssetHandler] is the thin Android/WebView
 * wrapper around this.
 */
class LocalEpubZipReader private constructor(
    private val zipFile: ZipFile,
    private val onClose: () -> Unit,
) : Closeable {
    /** Snapshot of real entry names, so [openEntry] can reject anything not actually in the zip. */
    private val knownNames: Set<String> = zipFile.entries().asSequence().map { it.name }.toSet()

    data class EntryInfo(val name: String, val size: Long)

    /**
     * Non-directory, non-audio entries available to serve. Audio (Media Overlay narration) is
     * never needed to render reading pages, so it is excluded here rather than left for foliate
     * to accidentally request and have us stream megabytes of it through the WebView bridge.
     */
    fun listEntries(): List<EntryInfo> =
        zipFile.entries().asSequence()
            .filterNot { it.isDirectory }
            .filterNot { isAudioEntry(it.name) }
            .map { EntryInfo(it.name, it.size) }
            .toList()

    sealed interface EntryResult {
        /** [rangeStart]/[rangeLength] describe what [stream] yields; [totalLength] is the whole entry's size. */
        data class Ok(
            val stream: InputStream,
            val totalLength: Long,
            val rangeStart: Long,
            val rangeLength: Long,
            val partial: Boolean,
        ) : EntryResult

        data object NotFound : EntryResult

        /** Unknown/unsafe name (path traversal, blank) or a name that resolves to an audio entry. */
        data object Rejected : EntryResult

        data class RangeNotSatisfiable(val totalLength: Long) : EntryResult
    }

    /**
     * Opens [name] (an exact zip entry name, never URL-decoded-then-reinterpreted as a filesystem
     * path) honouring an optional HTTP `Range: bytes=start-end` header value. A `null`/unparsable
     * [rangeHeader] serves the whole entry.
     */
    fun openEntry(name: String, rangeHeader: String?): EntryResult {
        if (!isSyntacticallySafe(name) || isAudioEntry(name)) return EntryResult.Rejected
        if (!knownNames.contains(name)) return EntryResult.NotFound
        val entry = zipFile.getEntry(name) ?: return EntryResult.NotFound
        val total = entry.size.let { if (it < 0) 0 else it }
        val range = parseRange(rangeHeader, total)
        if (range == RANGE_NOT_SATISFIABLE) return EntryResult.RangeNotSatisfiable(total)
        val (start, endInclusive, isPartial) = range
        val length = endInclusive - start + 1
        val raw = zipFile.getInputStream(entry) ?: return EntryResult.NotFound
        skipFully(raw, start)
        // Bound the stream to exactly `length` bytes: the underlying entry stream otherwise keeps
        // yielding bytes to the end of the (possibly much larger) entry past a partial range.
        return EntryResult.Ok(BoundedInputStream(raw, length), total, start, length, isPartial)
    }

    override fun close() {
        runCatching { zipFile.close() }
        onClose()
    }

    /** No traversal (zip entry names are lookup keys, never filesystem paths, but reject on
     * principle) - membership in the zip's real entries is checked separately so a syntactically
     * safe but genuinely absent name reports [EntryResult.NotFound], not [EntryResult.Rejected]. */
    private fun isSyntacticallySafe(name: String): Boolean =
        name.isNotBlank() && !name.contains("..")

    private fun skipFully(stream: InputStream, toSkip: Long) {
        var remaining = toSkip
        while (remaining > 0) {
            val skipped = stream.skip(remaining)
            if (skipped > 0) {
                remaining -= skipped
                continue
            }
            if (stream.read() == -1) throw EOFException("EOF skipping to range start")
            remaining--
        }
    }

    companion object {
        private val AUDIO_EXTENSIONS = setOf("mp3", "mp4", "m4a", "m4b", "aac", "oga", "ogg", "ogv", "wav", "flac", "opus", "wma")

        fun isAudioEntry(name: String): Boolean {
            val ext = name.substringAfterLast('.', "").lowercase()
            return ext in AUDIO_EXTENSIONS
        }

        /** Opens a plain on-disk EPUB by absolute path. */
        fun open(path: String): LocalEpubZipReader = LocalEpubZipReader(ZipFile(path), onClose = {})

        /** Opens an EPUB behind an already-open [android.os.ParcelFileDescriptor]-backed path (see
         * [com.bookorbit.core.storage.LocalRef.ContentDoc]), calling [onClose] once the zip itself
         * is closed so the caller can close the pfd afterwards. */
        fun openFdPath(fdPath: String, onClose: () -> Unit): LocalEpubZipReader =
            LocalEpubZipReader(ZipFile(fdPath), onClose)

        private val RANGE_NOT_SATISFIABLE = Triple(-1L, -1L, false)
        /** Returns (start, endInclusive, isPartial), or [RANGE_NOT_SATISFIABLE]. A missing/unparsable
         * header yields the whole entry (start=0, end=total-1, isPartial=false). */
        private fun parseRange(header: String?, total: Long): Triple<Long, Long, Boolean> {
            if (header.isNullOrBlank()) return Triple(0, (total - 1).coerceAtLeast(0), false)
            val m = Regex("""^bytes=(\d*)-(\d*)$""").find(header.trim()) ?: return Triple(0, (total - 1).coerceAtLeast(0), false)
            val (startStr, endStr) = m.destructured
            if (startStr.isEmpty() && endStr.isEmpty()) return Triple(0, (total - 1).coerceAtLeast(0), false)
            val start: Long
            val end: Long
            if (startStr.isEmpty()) {
                // suffix range: last N bytes
                val suffixLength = endStr.toLongOrNull() ?: return Triple(0, (total - 1).coerceAtLeast(0), false)
                start = (total - suffixLength).coerceAtLeast(0)
                end = total - 1
            } else {
                start = startStr.toLongOrNull() ?: return Triple(0, (total - 1).coerceAtLeast(0), false)
                end = if (endStr.isEmpty()) total - 1 else (endStr.toLongOrNull() ?: (total - 1)).coerceAtMost(total - 1)
            }
            if (start < 0 || start > end || start >= total) return RANGE_NOT_SATISFIABLE
            return Triple(start, end, true)
        }
    }
}

/** Caps [wrapped] at [limit] bytes, so a range read never spills into the rest of a zip entry. */
private class BoundedInputStream(private val wrapped: InputStream, private var remaining: Long) : InputStream() {
    override fun read(): Int {
        if (remaining <= 0) return -1
        val b = wrapped.read()
        if (b >= 0) remaining--
        return b
    }

    override fun read(b: ByteArray, off: Int, len: Int): Int {
        if (remaining <= 0) return -1
        val toRead = minOf(len.toLong(), remaining).toInt()
        val n = wrapped.read(b, off, toRead)
        if (n > 0) remaining -= n
        return n
    }

    override fun close() = wrapped.close()
}
