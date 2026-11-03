package com.bookorbit.feature.reader.comic

import java.io.Closeable
import java.util.zip.ZipEntry
import java.util.zip.ZipFile

/**
 * The pages of a downloaded CBZ, read straight from the zip on the device.
 *
 * Pages are chosen and ordered exactly like the server's `CbzService.getCbzIndex` (image entries
 * only, no hidden paths, stored or deflated, non-empty, natural sort), so page N here is page N on
 * the server and in the web reader, and a synced page number lands on the same page everywhere.
 *
 * Pure JVM (`java.util.zip`), so the selection and ordering rules run as a plain unit test.
 * `ZipFile` is safe to read from several threads at once, which Coil does while preloading pages.
 */
class LocalComicArchive private constructor(
    private val zip: ZipFile,
    /** Identifies this archive in image cache keys, so two files never share a cached page. */
    val key: String,
    private val onClose: () -> Unit,
) : Closeable {

    private val pages: List<ZipEntry> = zip.entries().asSequence()
        .filter(::isPage)
        .sortedWith(compareBy(NaturalOrder) { it.name })
        .toList()

    val pageCount: Int get() = pages.size

    /** Zip entry names in page order (exposed for tests and diagnostics). */
    val pageNames: List<String> get() = pages.map { it.name }

    /** Raw bytes of [index] (0-based). Throws [IndexOutOfBoundsException] for a page that isn't there. */
    fun readPage(index: Int): ByteArray {
        val entry = pages[index]
        return zip.getInputStream(entry).use { it.readBytes() }
    }

    override fun close() {
        try {
            zip.close()
        } finally {
            onClose()
        }
    }

    companion object {
        private val IMAGE_EXTENSIONS = setOf("jpg", "jpeg", "png", "webp", "gif", "bmp", "avif")

        /** Opens a plain on-disk CBZ by absolute path. */
        fun open(path: String): LocalComicArchive = LocalComicArchive(ZipFile(path), key = path, onClose = {})

        /**
         * Opens a CBZ behind an already-open file descriptor path (`/proc/self/fd/N`, used for files
         * in a user-chosen download folder), calling [onClose] once the zip is closed so the caller
         * can close the descriptor. [key] must be stable for the file, e.g. its content Uri.
         */
        fun openFdPath(fdPath: String, key: String, onClose: () -> Unit): LocalComicArchive =
            LocalComicArchive(ZipFile(fdPath), key, onClose)

        internal fun isPage(entry: ZipEntry): Boolean {
            val name = entry.name
            if (entry.isDirectory || name.endsWith("/")) return false
            if (name.split('/').any { it.startsWith(".") }) return false
            val ext = name.substringAfterLast('.', "").lowercase()
            if (ext !in IMAGE_EXTENSIONS) return false
            if (entry.method != ZipEntry.STORED && entry.method != ZipEntry.DEFLATED) return false
            // The server skips entries with no data; an unknown size (-1) is kept and read anyway.
            return entry.compressedSize != 0L
        }
    }
}

/**
 * Natural, case-insensitive name order, approximating the server's
 * `a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })`: runs of digits compare
 * by value ("page2" before "page10"), letters ignore case, and punctuation sorts before digits,
 * which sort before letters, as in the Unicode root collation.
 */
internal object NaturalOrder : Comparator<String> {
    override fun compare(a: String, b: String): Int {
        var i = 0
        var j = 0
        while (i < a.length && j < b.length) {
            val ca = a[i]
            val cb = b[j]
            if (ca.isDigit() && cb.isDigit()) {
                val endA = digitRunEnd(a, i)
                val endB = digitRunEnd(b, j)
                val cmp = compareNumbers(a.substring(i, endA), b.substring(j, endB))
                if (cmp != 0) return cmp
                i = endA
                j = endB
                continue
            }
            val cmp = compareChars(ca, cb)
            if (cmp != 0) return cmp
            i++
            j++
        }
        return (a.length - i).compareTo(b.length - j)
    }

    private fun digitRunEnd(s: String, start: Int): Int {
        var end = start
        while (end < s.length && s[end].isDigit()) end++
        return end
    }

    private fun compareNumbers(x: String, y: String): Int {
        val a = x.trimStart('0')
        val b = y.trimStart('0')
        if (a.length != b.length) return a.length.compareTo(b.length)
        return a.compareTo(b)
    }

    private fun rank(c: Char): Int = when {
        c.isLetter() -> 2
        c.isDigit() -> 1
        else -> 0
    }

    private fun compareChars(a: Char, b: Char): Int {
        val ra = rank(a)
        val rb = rank(b)
        if (ra != rb) return ra.compareTo(rb)
        return a.lowercaseChar().compareTo(b.lowercaseChar())
    }
}
