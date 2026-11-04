package com.bookorbit.feature.reader.narration

import java.io.EOFException
import java.io.FileNotFoundException
import java.io.IOException
import java.io.InputStream
import java.util.zip.ZipFile

/** Sentinel meaning "play to the end of the entry" - mirrors `androidx.media3.common.C.LENGTH_UNSET`
 * without pulling a media3/Android dependency into this class, so it stays plain-JVM testable. */
const val LENGTH_UNSET: Long = -1L

/**
 * Reads a byte range out of one EPUB-internal zip entry, directly from the EPUB, via
 * [java.util.zip.ZipFile] rather than [java.util.zip.ZipInputStream]. `ZipFile` reads the zip's
 * central directory, so (unlike `ZipInputStream`, which parses local headers as it streams and
 * refuses the combination) it tolerates STORED entries written with a trailing data descriptor
 * (general-purpose bit flag 0x08) - the form real-world EPUB packagers emit for Media Overlay
 * audio, since they don't know the entry's final size while still writing it.
 *
 * Deliberately has no Android/media3 dependency (only `java.util.zip`/`java.io`) so its position/
 * length/skip logic - the part that actually needs covering - can run as a plain JVM unit test;
 * [EpubZipDataSource] is the thin Media3 wrapper around it.
 */
class EpubZipEntryReader(private val epubPath: String, private val entryName: String) {
    private var zipFile: ZipFile? = null
    private var input: InputStream? = null
    private var bytesRemaining: Long = 0

    /**
     * Opens [entryName] in [epubPath], skips to [position] and returns the number of bytes
     * available to read from there: [length] if it isn't [LENGTH_UNSET], else the entry's
     * remaining size from [position] onward. Skipping is cheap here since every EPUB audio entry
     * observed so far is STORED (uncompressed), so [InputStream.skip] never has to inflate.
     */
    fun open(position: Long, length: Long): Long {
        val zip = ZipFile(epubPath)
        try {
            val entry = zip.getEntry(entryName)
                ?: throw FileNotFoundException("Entry not found in EPUB: $entryName")
            val entrySize = entry.size
            if (position < 0 || (entrySize >= 0 && position > entrySize)) {
                throw IOException("position $position out of range for $entryName (size=$entrySize)")
            }
            val stream = zip.getInputStream(entry)
                ?: throw FileNotFoundException("Unable to open EPUB entry: $entryName")
            skipFully(stream, position)
            zipFile = zip
            input = stream
            bytesRemaining = if (length != LENGTH_UNSET) length else entrySize - position
            return bytesRemaining
        } catch (e: Exception) {
            zip.close()
            throw e
        }
    }

    /** Reads up to [length] bytes, never more than what [open] reported remaining. Returns -1 at
     * the end of the requested range, matching `androidx.media3.common.C.RESULT_END_OF_INPUT`. */
    fun read(buffer: ByteArray, offset: Int, length: Int): Int {
        if (length == 0) return 0
        val stream = input ?: throw IOException("EpubZipEntryReader not open")
        if (bytesRemaining == 0L) return -1
        val toRead = if (bytesRemaining == LENGTH_UNSET) length else minOf(length.toLong(), bytesRemaining).toInt()
        val read = stream.read(buffer, offset, toRead)
        if (read == -1) {
            if (bytesRemaining != LENGTH_UNSET) {
                throw EOFException("Unexpected EOF reading $entryName, $bytesRemaining bytes still expected")
            }
            return -1
        }
        if (bytesRemaining != LENGTH_UNSET) bytesRemaining -= read
        return read
    }

    fun close() {
        input?.let { runCatching { it.close() } }
        input = null
        zipFile?.let { runCatching { it.close() } }
        zipFile = null
    }

    private fun skipFully(stream: InputStream, toSkip: Long) {
        var remaining = toSkip
        while (remaining > 0) {
            val skipped = stream.skip(remaining)
            if (skipped > 0) {
                remaining -= skipped
                continue
            }
            // skip() may legitimately return 0 without being at EOF; fall back to a single
            // read-and-discard to make progress (or detect real EOF) rather than looping forever.
            if (stream.read() == -1) throw EOFException("EOF skipping to position in entry")
            remaining--
        }
    }
}
