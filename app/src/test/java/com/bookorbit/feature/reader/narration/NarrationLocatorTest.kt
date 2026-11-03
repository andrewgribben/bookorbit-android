package com.bookorbit.feature.reader.narration

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Test

class NarrationLocatorTest {
    private fun item(sectionIndex: Int, textHref: String, begin: Double, end: Double?, audioIndex: Int) =
        NarrationItem(sectionIndex, textHref, begin, end, audioIndex)

    @Test
    fun `finds the item active at an exact cue start`() {
        val items = listOf(
            item(0, "c1.xhtml#p1", 0.0, 2.0, audioIndex = 0),
            item(0, "c1.xhtml#p2", 2.0, 4.5, audioIndex = 0),
            item(1, "c2.xhtml#p1", 0.0, 3.0, audioIndex = 1),
        )
        val sorted = NarrationLocator.sortForLookup(items)
        assertEquals(items[1], NarrationLocator.locate(sorted, NarrationLocator.Position(0, 2.0)))
    }

    @Test
    fun `finds the item active mid-cue`() {
        val items = listOf(
            item(0, "c1.xhtml#p1", 0.0, 2.0, audioIndex = 0),
            item(0, "c1.xhtml#p2", 2.0, 4.5, audioIndex = 0),
        )
        val sorted = NarrationLocator.sortForLookup(items)
        assertEquals(items[0], NarrationLocator.locate(sorted, NarrationLocator.Position(0, 1.2)))
        assertEquals(items[1], NarrationLocator.locate(sorted, NarrationLocator.Position(0, 4.4)))
    }

    @Test
    fun `before the first cue of a file returns null`() {
        val items = listOf(item(0, "c1.xhtml#p1", 1.5, 3.0, audioIndex = 0))
        val sorted = NarrationLocator.sortForLookup(items)
        assertNull(NarrationLocator.locate(sorted, NarrationLocator.Position(0, 0.0)))
    }

    @Test
    fun `a file with no narration items returns null even past other files' cues`() {
        val items = listOf(
            item(0, "c1.xhtml#p1", 0.0, 2.0, audioIndex = 0),
            item(2, "c3.xhtml#p1", 0.0, 2.0, audioIndex = 2),
        )
        val sorted = NarrationLocator.sortForLookup(items)
        assertNull(NarrationLocator.locate(sorted, NarrationLocator.Position(1, 50.0)))
    }

    @Test
    fun `switching to a later audio file picks up its own first cue`() {
        val items = listOf(
            item(0, "c1.xhtml#p1", 0.0, 2.0, audioIndex = 0),
            item(1, "c2.xhtml#p1", 0.0, 3.0, audioIndex = 1),
            item(1, "c2.xhtml#p2", 3.0, 6.0, audioIndex = 1),
        )
        val sorted = NarrationLocator.sortForLookup(items)
        assertEquals(items[1], NarrationLocator.locate(sorted, NarrationLocator.Position(1, 0.0)))
        assertEquals(items[2], NarrationLocator.locate(sorted, NarrationLocator.Position(1, 5.9)))
    }

    @Test
    fun `seeking past the last cue of a file stays on that cue`() {
        val items = listOf(item(0, "c1.xhtml#p1", 0.0, 2.0, audioIndex = 0))
        val sorted = NarrationLocator.sortForLookup(items)
        assertEquals(items[0], NarrationLocator.locate(sorted, NarrationLocator.Position(0, 999.0)))
    }

    @Test
    fun `sortForLookup orders by audioIndex then beginSec regardless of input order`() {
        val items = listOf(
            item(1, "c2.xhtml#p2", 3.0, 6.0, audioIndex = 1),
            item(0, "c1.xhtml#p1", 0.0, 2.0, audioIndex = 0),
            item(1, "c2.xhtml#p1", 0.0, 3.0, audioIndex = 1),
        )
        val sorted = NarrationLocator.sortForLookup(items)
        assertEquals(listOf(0, 1, 1), sorted.map { it.audioIndex })
        assertEquals(listOf(0.0, 0.0, 3.0), sorted.map { it.beginSec })
    }
}
