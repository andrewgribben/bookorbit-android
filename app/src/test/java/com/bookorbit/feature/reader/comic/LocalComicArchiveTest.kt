package com.bookorbit.feature.reader.comic

import org.junit.Assert.assertArrayEquals
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Rule
import org.junit.Test
import org.junit.rules.TemporaryFolder
import java.io.File
import java.util.zip.CRC32
import java.util.zip.ZipEntry
import java.util.zip.ZipOutputStream

class LocalComicArchiveTest {
    @get:Rule
    val tmp = TemporaryFolder()

    private fun cbz(vararg entries: Pair<String, ByteArray?>): File {
        val file = tmp.newFile("test.cbz")
        ZipOutputStream(file.outputStream()).use { zip ->
            for ((name, bytes) in entries) {
                val entry = ZipEntry(name)
                if (bytes != null && bytes.isEmpty()) {
                    entry.method = ZipEntry.STORED
                    entry.size = 0
                    entry.compressedSize = 0
                    entry.crc = CRC32().value
                }
                zip.putNextEntry(entry)
                if (bytes != null) zip.write(bytes)
                zip.closeEntry()
            }
        }
        return file
    }

    @Test
    fun `pages are the images only, in natural order, like the server`() {
        val file = cbz(
            "Page 10.jpg" to byteArrayOf(10),
            "Page 2.jpg" to byteArrayOf(2),
            "page 1.PNG" to byteArrayOf(1),
            "ComicInfo.xml" to byteArrayOf(9),
            "extras/" to null,
            ".hidden/cover.jpg" to byteArrayOf(9),
            "__MACOSX/._Page 2.jpg" to byteArrayOf(9),
            "blank.jpg" to byteArrayOf(),
        )
        LocalComicArchive.open(file.absolutePath).use { archive ->
            assertEquals(listOf("page 1.PNG", "Page 2.jpg", "Page 10.jpg"), archive.pageNames)
            assertEquals(3, archive.pageCount)
            assertArrayEquals(byteArrayOf(2), archive.readPage(1))
        }
    }

    @Test
    fun `pages in sub-folders count and sort by their full path`() {
        val file = cbz(
            "vol1/ch2/001.webp" to byteArrayOf(3),
            "vol1/ch1/002.webp" to byteArrayOf(2),
            "vol1/ch1/001.webp" to byteArrayOf(1),
        )
        LocalComicArchive.open(file.absolutePath).use { archive ->
            assertEquals(listOf("vol1/ch1/001.webp", "vol1/ch1/002.webp", "vol1/ch2/001.webp"), archive.pageNames)
        }
    }

    @Test
    fun `natural order compares digit runs by value and ignores case and leading zeros`() {
        val sorted = listOf("p10", "P2", "p002b", "p1", "p02").sortedWith(NaturalOrder)
        assertEquals(listOf("p1", "P2", "p02", "p002b", "p10"), sorted)
    }

    @Test
    fun `natural order puts punctuation before digits and digits before letters`() {
        assertTrue(NaturalOrder.compare("a_1", "a1") < 0)
        assertTrue(NaturalOrder.compare("a1", "ab") < 0)
        assertTrue(NaturalOrder.compare("cover", "cover-2") < 0)
    }
}
