package com.bookorbit.feature.reader

import org.junit.Assert.assertArrayEquals
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test
import java.io.ByteArrayOutputStream
import java.io.File
import java.util.zip.CRC32
import java.util.zip.ZipOutputStream
import java.util.zip.ZipEntry

/**
 * Builds a minimal zip by hand (rather than via [java.util.zip.ZipOutputStream], which refuses to
 * write a STORED entry's general-purpose flag 0x08 once sizes are known upfront) so these tests
 * exercise exactly the shape real EPUB packagers emit for Media Overlay audio: a STORED entry with
 * a trailing data descriptor, zero crc/sizes in its local header. [java.util.zip.ZipFile] (used by
 * [LocalEpubZipReader]) reads such entries fine via the central directory - the case
 * [java.util.zip.ZipInputStream] throws on. Mirrors the narration feature's
 * `EpubZipEntryReaderTest` fixture builder.
 */
private fun buildStoredZipWithDataDescriptor(entries: List<Pair<String, ByteArray>>): ByteArray {
    val out = ByteArrayOutputStream()
    fun writeShort(v: Int) {
        out.write(v and 0xFF)
        out.write((v ushr 8) and 0xFF)
    }
    fun writeUInt(v: Long) {
        out.write((v and 0xFF).toInt())
        out.write(((v ushr 8) and 0xFF).toInt())
        out.write(((v ushr 16) and 0xFF).toInt())
        out.write(((v ushr 24) and 0xFF).toInt())
    }

    data class EntryMeta(val name: String, val offset: Int, val crc: Long, val size: Int)
    val metas = mutableListOf<EntryMeta>()

    for ((name, data) in entries) {
        val offset = out.size()
        val nameBytes = name.toByteArray(Charsets.UTF_8)
        val crc = CRC32().apply { update(data) }.value

        writeUInt(0x04034b50) // local file header signature
        writeShort(20) // version needed to extract
        writeShort(0x0008) // general purpose bit flag: sizes/crc in trailing data descriptor
        writeShort(0) // compression method: STORED
        writeShort(0) // last mod time
        writeShort(0x21) // last mod date
        writeUInt(0) // crc-32: zero in local header when flag bit 3 is set
        writeUInt(0) // compressed size: ditto
        writeUInt(0) // uncompressed size: ditto
        writeShort(nameBytes.size)
        writeShort(0) // extra field length
        out.write(nameBytes)
        out.write(data)
        writeUInt(0x08074b50) // (optional) data descriptor signature
        writeUInt(crc)
        writeUInt(data.size.toLong())
        writeUInt(data.size.toLong())

        metas += EntryMeta(name, offset, crc, data.size)
    }

    val centralDirStart = out.size()
    for (m in metas) {
        val nameBytes = m.name.toByteArray(Charsets.UTF_8)
        writeUInt(0x02014b50) // central file header signature
        writeShort(20) // version made by
        writeShort(20) // version needed to extract
        writeShort(0x0008)
        writeShort(0)
        writeShort(0)
        writeShort(0x21)
        writeUInt(m.crc)
        writeUInt(m.size.toLong())
        writeUInt(m.size.toLong())
        writeShort(nameBytes.size)
        writeShort(0) // extra field length
        writeShort(0) // file comment length
        writeShort(0) // disk number start
        writeShort(0) // internal file attributes
        writeUInt(0) // external file attributes
        writeUInt(m.offset.toLong()) // relative offset of local header
        out.write(nameBytes)
    }
    val centralDirSize = out.size() - centralDirStart

    writeUInt(0x06054b50) // end of central dir signature
    writeShort(0) // disk number
    writeShort(0) // disk with central dir
    writeShort(metas.size) // entries on this disk
    writeShort(metas.size) // total entries
    writeUInt(centralDirSize.toLong())
    writeUInt(centralDirStart.toLong())
    writeShort(0) // comment length

    return out.toByteArray()
}

class LocalEpubZipReaderTest {
    private fun storedDataDescriptorZip(entries: List<Pair<String, ByteArray>>): File =
        File.createTempFile("local-epub-fixture", ".epub").apply {
            deleteOnExit()
            writeBytes(buildStoredZipWithDataDescriptor(entries))
        }

    /** A normal DEFLATE zip for cases that don't need the STORED/data-descriptor shape. */
    private fun ordinaryZip(entries: List<Pair<String, ByteArray>>): File =
        File.createTempFile("local-epub-fixture-plain", ".epub").apply {
            deleteOnExit()
            ZipOutputStream(outputStream()).use { zos ->
                for ((name, data) in entries) {
                    zos.putNextEntry(ZipEntry(name))
                    zos.write(data)
                    zos.closeEntry()
                }
            }
        }

    @Test
    fun `lists non-directory entries with their sizes`() {
        val zip = ordinaryZip(
            listOf(
                "META-INF/container.xml" to "container".toByteArray(),
                "OEBPS/ch1.xhtml" to "chapter one text".toByteArray(),
            ),
        )
        val reader = LocalEpubZipReader.open(zip.absolutePath)
        val names = reader.listEntries().map { it.name }.toSet()
        assertTrue(names.contains("META-INF/container.xml"))
        assertTrue(names.contains("OEBPS/ch1.xhtml"))
        val ch1 = reader.listEntries().first { it.name == "OEBPS/ch1.xhtml" }
        assertEquals("chapter one text".length.toLong(), ch1.size)
        reader.close()
    }

    @Test
    fun `excludes audio entries from the listing`() {
        val zip = ordinaryZip(
            listOf(
                "OEBPS/ch1.xhtml" to "text".toByteArray(),
                "OEBPS/Audio/00001.mp3" to "fake audio".toByteArray(),
            ),
        )
        val reader = LocalEpubZipReader.open(zip.absolutePath)
        val names = reader.listEntries().map { it.name }
        assertTrue(names.contains("OEBPS/ch1.xhtml"))
        assertFalse(names.contains("OEBPS/Audio/00001.mp3"))
        reader.close()
    }

    @Test
    fun `reads a whole entry byte for byte`() {
        val data = "<html><body>hello</body></html>".toByteArray()
        val zip = ordinaryZip(listOf("OEBPS/ch1.xhtml" to data))
        val reader = LocalEpubZipReader.open(zip.absolutePath)

        val result = reader.openEntry("OEBPS/ch1.xhtml", rangeHeader = null)
        check(result is LocalEpubZipReader.EntryResult.Ok)
        assertFalse(result.partial)
        assertEquals(data.size.toLong(), result.totalLength)
        assertEquals(data.size.toLong(), result.rangeLength)
        assertArrayEquals(data, result.stream.readBytes())
        reader.close()
    }

    @Test
    fun `honours a bytes range header`() {
        val data = ByteArray(100) { it.toByte() }
        val zip = ordinaryZip(listOf("asset.bin" to data))
        val reader = LocalEpubZipReader.open(zip.absolutePath)

        val result = reader.openEntry("asset.bin", rangeHeader = "bytes=10-29")
        check(result is LocalEpubZipReader.EntryResult.Ok)
        assertTrue(result.partial)
        assertEquals(100L, result.totalLength)
        assertEquals(10L, result.rangeStart)
        assertEquals(20L, result.rangeLength)
        assertArrayEquals(data.copyOfRange(10, 30), result.stream.readBytes())
        reader.close()
    }

    @Test
    fun `honours an open-ended suffix range header`() {
        val data = ByteArray(50) { it.toByte() }
        val zip = ordinaryZip(listOf("asset.bin" to data))
        val reader = LocalEpubZipReader.open(zip.absolutePath)

        val result = reader.openEntry("asset.bin", rangeHeader = "bytes=40-")
        check(result is LocalEpubZipReader.EntryResult.Ok)
        assertEquals(10L, result.rangeLength)
        assertArrayEquals(data.copyOfRange(40, 50), result.stream.readBytes())
        reader.close()
    }

    @Test
    fun `reports range not satisfiable past the end of the entry`() {
        val data = ByteArray(10)
        val zip = ordinaryZip(listOf("asset.bin" to data))
        val reader = LocalEpubZipReader.open(zip.absolutePath)

        val result = reader.openEntry("asset.bin", rangeHeader = "bytes=100-200")
        check(result is LocalEpubZipReader.EntryResult.RangeNotSatisfiable)
        assertEquals(10L, result.totalLength)
        reader.close()
    }

    @Test
    fun `rejects a name not present in the zip`() {
        val zip = ordinaryZip(listOf("real.xhtml" to "x".toByteArray()))
        val reader = LocalEpubZipReader.open(zip.absolutePath)
        val result = reader.openEntry("does-not-exist.xhtml", rangeHeader = null)
        assertEquals(LocalEpubZipReader.EntryResult.NotFound, result)
        reader.close()
    }

    @Test
    fun `rejects path traversal attempts even if the string matches nothing real`() {
        val zip = ordinaryZip(listOf("real.xhtml" to "x".toByteArray()))
        val reader = LocalEpubZipReader.open(zip.absolutePath)
        val result = reader.openEntry("../../etc/passwd", rangeHeader = null)
        assertEquals(LocalEpubZipReader.EntryResult.Rejected, result)
        reader.close()
    }

    @Test
    fun `rejects serving an audio entry even when asked for it by exact name`() {
        val zip = ordinaryZip(listOf("OEBPS/Audio/track.mp3" to "fake".toByteArray()))
        val reader = LocalEpubZipReader.open(zip.absolutePath)
        val result = reader.openEntry("OEBPS/Audio/track.mp3", rangeHeader = null)
        assertEquals(LocalEpubZipReader.EntryResult.Rejected, result)
        reader.close()
    }

    @Test
    fun `reads a STORED entry with a trailing data descriptor, same shape as EPUB audio`() {
        val data = "fake media overlay payload".toByteArray()
        val zip = storedDataDescriptorZip(listOf("OEBPS/text/ch1.xhtml" to data))
        val reader = LocalEpubZipReader.open(zip.absolutePath)

        val result = reader.openEntry("OEBPS/text/ch1.xhtml", rangeHeader = null)
        check(result is LocalEpubZipReader.EntryResult.Ok)
        assertArrayEquals(data, result.stream.readBytes())
        reader.close()
    }

    @Test
    fun `listEntries also tolerates STORED entries with a data descriptor`() {
        val zip = storedDataDescriptorZip(listOf("OEBPS/ch1.xhtml" to "hello".toByteArray()))
        val reader = LocalEpubZipReader.open(zip.absolutePath)
        assertEquals(listOf("OEBPS/ch1.xhtml"), reader.listEntries().map { it.name })
        reader.close()
    }

    @Test
    fun `close runs the onClose callback, releasing a held fd-backed reader`() {
        val zip = ordinaryZip(listOf("a.txt" to "x".toByteArray()))
        var closed = false
        val reader = LocalEpubZipReader.openFdPath(zip.absolutePath, onClose = { closed = true })
        assertFalse(closed)
        reader.close()
        assertTrue(closed)
    }

    @Test
    fun `isAudioEntry recognizes common audio extensions case-insensitively`() {
        assertTrue(LocalEpubZipReader.isAudioEntry("OEBPS/Audio/00001.MP3"))
        assertTrue(LocalEpubZipReader.isAudioEntry("x.m4a"))
        assertFalse(LocalEpubZipReader.isAudioEntry("x.xhtml"))
        assertFalse(LocalEpubZipReader.isAudioEntry("no-extension"))
    }
}
