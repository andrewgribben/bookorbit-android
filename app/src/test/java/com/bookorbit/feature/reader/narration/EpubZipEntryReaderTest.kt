package com.bookorbit.feature.reader.narration

import org.junit.Assert.assertArrayEquals
import org.junit.Assert.assertEquals
import org.junit.Assert.assertThrows
import org.junit.Test
import java.io.ByteArrayOutputStream
import java.io.File
import java.io.FileNotFoundException
import java.util.zip.CRC32

/**
 * Builds a minimal zip by hand (rather than via [java.util.zip.ZipOutputStream], which refuses to
 * write a STORED entry's general-purpose flag 0x08 once sizes are known upfront) so these tests
 * exercise exactly the shape real EPUB packagers emit for Media Overlay audio: a STORED entry with
 * a trailing data descriptor, zero crc/sizes in its local header. [java.util.zip.ZipFile] (used by
 * [EpubZipEntryReader]) reads such entries fine via the central directory; this is the case
 * [java.util.zip.ZipInputStream] (the old `NarrationAudioExtractor`'s approach) threw on.
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

class EpubZipEntryReaderTest {
    private fun tempZip(entries: List<Pair<String, ByteArray>>): File =
        File.createTempFile("epub-fixture", ".epub").apply {
            deleteOnExit()
            writeBytes(buildStoredZipWithDataDescriptor(entries))
        }

    @Test
    fun `reads a whole STORED entry with a data descriptor`() {
        val data = "fake mp4 payload bytes".toByteArray()
        val zip = tempZip(listOf("OEBPS/Audio/00001-00001.mp4" to data))

        val reader = EpubZipEntryReader(zip.absolutePath, "OEBPS/Audio/00001-00001.mp4")
        val remaining = reader.open(position = 0, length = LENGTH_UNSET)
        assertEquals(data.size.toLong(), remaining)

        val buffer = ByteArray(data.size)
        var readTotal = 0
        while (readTotal < data.size) {
            val n = reader.read(buffer, readTotal, data.size - readTotal)
            assertEquals(true, n > 0)
            readTotal += n
        }
        assertArrayEquals(data, buffer)
        assertEquals(-1, reader.read(ByteArray(4), 0, 4))
        reader.close()
    }

    @Test
    fun `honours position by skipping without decompressing`() {
        val data = ByteArray(64) { it.toByte() }
        val zip = tempZip(listOf("entry.mp4" to data))

        val reader = EpubZipEntryReader(zip.absolutePath, "entry.mp4")
        val remaining = reader.open(position = 10, length = LENGTH_UNSET)
        assertEquals((data.size - 10).toLong(), remaining)

        val buffer = ByteArray(data.size - 10)
        var readTotal = 0
        while (readTotal < buffer.size) {
            val n = reader.read(buffer, readTotal, buffer.size - readTotal)
            readTotal += n
        }
        assertArrayEquals(data.copyOfRange(10, data.size), buffer)
        reader.close()
    }

    @Test
    fun `honours an explicit length shorter than the remaining entry`() {
        val data = ByteArray(100) { it.toByte() }
        val zip = tempZip(listOf("entry.mp4" to data))

        val reader = EpubZipEntryReader(zip.absolutePath, "entry.mp4")
        val remaining = reader.open(position = 5, length = 20)
        assertEquals(20L, remaining)

        val buffer = ByteArray(20)
        var readTotal = 0
        while (readTotal < buffer.size) {
            val n = reader.read(buffer, readTotal, buffer.size - readTotal)
            readTotal += n
        }
        assertArrayEquals(data.copyOfRange(5, 25), buffer)
        // The range is exhausted even though the underlying entry has more bytes after it.
        assertEquals(-1, reader.read(ByteArray(4), 0, 4))
        reader.close()
    }

    @Test
    fun `selects the right entry among several by exact name`() {
        val first = "first entry data".toByteArray()
        val second = "second entry data, different length".toByteArray()
        val zip = tempZip(listOf("OEBPS/Audio/00001-00001.mp4" to first, "OEBPS/Audio/00001-00002.mp4" to second))

        val reader = EpubZipEntryReader(zip.absolutePath, "OEBPS/Audio/00001-00002.mp4")
        val remaining = reader.open(position = 0, length = LENGTH_UNSET)
        assertEquals(second.size.toLong(), remaining)
        val buffer = ByteArray(second.size)
        var readTotal = 0
        while (readTotal < buffer.size) {
            readTotal += reader.read(buffer, readTotal, buffer.size - readTotal)
        }
        assertArrayEquals(second, buffer)
        reader.close()
    }

    @Test
    fun `throws when the entry is missing rather than silently returning nothing`() {
        val zip = tempZip(listOf("entry.mp4" to "data".toByteArray()))
        val reader = EpubZipEntryReader(zip.absolutePath, "missing.mp4")
        assertThrows(FileNotFoundException::class.java) { reader.open(position = 0, length = LENGTH_UNSET) }
    }
}
