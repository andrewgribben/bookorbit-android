package com.bookorbit.feature.reader.comic

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

class ComicSpreadLayoutTest {

    @Test
    fun `single mode gives one spread per page`() {
        val spreads = buildComicSpreads(
            pageCount = 3,
            isTwoPageEffective = false,
            direction = ComicDirection.LTR,
            spreadAlignment = ComicSpreadAlignment.NORMAL,
            widePageSingletonMode = ComicWidePageMode.AUTO,
        )
        assertEquals(3, spreads.size)
        assertTrue(spreads.all { it.kind == ComicSpreadKind.SINGLE })
        assertEquals(listOf(0, 1, 2), spreads.map { it.anchorPage })
    }

    @Test
    fun `normal alignment pairs the cover alone then 1-2, 3-4`() {
        val spreads = buildComicSpreads(
            pageCount = 5,
            isTwoPageEffective = true,
            direction = ComicDirection.LTR,
            spreadAlignment = ComicSpreadAlignment.NORMAL,
            widePageSingletonMode = ComicWidePageMode.AUTO,
        )
        assertEquals(listOf(listOf(0), listOf(1, 2), listOf(3, 4)), spreads.map { it.pages })
    }

    @Test
    fun `shifted alignment inserts a singleton after the cover then pairs 2-3, 4-5`() {
        val spreads = buildComicSpreads(
            pageCount = 6,
            isTwoPageEffective = true,
            direction = ComicDirection.LTR,
            spreadAlignment = ComicSpreadAlignment.SHIFTED,
            widePageSingletonMode = ComicWidePageMode.AUTO,
        )
        assertEquals(listOf(listOf(0), listOf(1), listOf(2, 3), listOf(4, 5)), spreads.map { it.pages })
    }

    @Test
    fun `ltr direction puts the lower page on the left`() {
        val spreads = buildComicSpreads(
            pageCount = 3,
            isTwoPageEffective = true,
            direction = ComicDirection.LTR,
            spreadAlignment = ComicSpreadAlignment.NORMAL,
            widePageSingletonMode = ComicWidePageMode.AUTO,
        )
        val spread = spreads.last()
        assertEquals(1, spread.leftPage)
        assertEquals(2, spread.rightPage)
    }

    @Test
    fun `rtl direction mirrors left and right`() {
        val spreads = buildComicSpreads(
            pageCount = 3,
            isTwoPageEffective = true,
            direction = ComicDirection.RTL,
            spreadAlignment = ComicSpreadAlignment.NORMAL,
            widePageSingletonMode = ComicWidePageMode.AUTO,
        )
        val spread = spreads.last()
        assertEquals(2, spread.leftPage)
        assertEquals(1, spread.rightPage)
    }

    @Test
    fun `auto wide page mode breaks a wide page out as a singleton`() {
        val spreads = buildComicSpreads(
            pageCount = 5,
            isTwoPageEffective = true,
            direction = ComicDirection.LTR,
            spreadAlignment = ComicSpreadAlignment.NORMAL,
            widePageSingletonMode = ComicWidePageMode.AUTO,
            isWidePage = { it == 2 },
        )
        // 0 alone, then page 1 would pair with wide page 2 - instead 1 pairs alone (virtual
        // blank), then wide page 2 alone, then 3-4 pair normally.
        assertEquals(listOf(listOf(0), listOf(1), listOf(2), listOf(3, 4)), spreads.map { it.pages })
        assertTrue(spreads[1].hasVirtualBlank)
    }

    @Test
    fun `disabled wide page mode ignores the wide page heuristic`() {
        val spreads = buildComicSpreads(
            pageCount = 5,
            isTwoPageEffective = true,
            direction = ComicDirection.LTR,
            spreadAlignment = ComicSpreadAlignment.NORMAL,
            widePageSingletonMode = ComicWidePageMode.DISABLE,
            isWidePage = { it == 2 },
        )
        assertEquals(listOf(listOf(0), listOf(1, 2), listOf(3, 4)), spreads.map { it.pages })
    }

    @Test
    fun `odd trailing page gets a virtual blank spread`() {
        val spreads = buildComicSpreads(
            pageCount = 4,
            isTwoPageEffective = true,
            direction = ComicDirection.LTR,
            spreadAlignment = ComicSpreadAlignment.NORMAL,
            widePageSingletonMode = ComicWidePageMode.AUTO,
        )
        val last = spreads.last()
        assertEquals(listOf(3), last.pages)
        assertTrue(last.hasVirtualBlank)
    }

    @Test
    fun `layout navigation walks anchors forward and backward and clamps at the ends`() {
        val layout = comicSpreadLayout(
            pageCount = 5,
            isTwoPageEffective = true,
            direction = ComicDirection.LTR,
            spreadAlignment = ComicSpreadAlignment.NORMAL,
            widePageSingletonMode = ComicWidePageMode.AUTO,
        )
        // Spreads: [0], [1,2], [3,4]
        assertEquals(0, layout.anchorForPage(0))
        assertEquals(1, layout.anchorForPage(1))
        assertEquals(1, layout.anchorForPage(2))
        assertEquals(3, layout.anchorForPage(3))
        assertEquals(3, layout.anchorForPage(4))

        assertEquals(1, layout.nextAnchor(0))
        assertEquals(3, layout.nextAnchor(1))
        assertEquals(3, layout.nextAnchor(3)) // clamps at the last spread
        assertEquals(0, layout.prevAnchor(1))
        assertEquals(0, layout.prevAnchor(0)) // clamps at the first spread
    }

    @Test
    fun `empty book has no spreads and safe default navigation`() {
        val layout = comicSpreadLayout(
            pageCount = 0,
            isTwoPageEffective = true,
            direction = ComicDirection.LTR,
            spreadAlignment = ComicSpreadAlignment.NORMAL,
            widePageSingletonMode = ComicWidePageMode.AUTO,
        )
        assertTrue(layout.spreads.isEmpty())
        assertEquals(0, layout.anchorForPage(5))
        assertEquals(0, layout.nextAnchor(0))
        assertEquals(0, layout.prevAnchor(0))
    }

    @Test
    fun `effectiveTwoPage only applies in paged mode`() {
        val base = ComicReaderSettings(scrollMode = ComicScrollMode.INFINITE, forceTwoPage = true)
        assertFalse(effectiveTwoPage(base, widthDp = 1200))
    }

    @Test
    fun `effectiveTwoPage is forced on regardless of width when forceTwoPage is set`() {
        val settings = ComicReaderSettings(forceTwoPage = true)
        assertTrue(effectiveTwoPage(settings, widthDp = 400))
    }

    @Test
    fun `effectiveTwoPage defaults on at the fold-or-landscape breakpoint`() {
        val settings = ComicReaderSettings()
        assertFalse(effectiveTwoPage(settings, widthDp = 600))
        assertTrue(effectiveTwoPage(settings, widthDp = 900))
    }

    @Test
    fun `isWidePageAspect matches the web's 1_2 ratio threshold`() {
        assertFalse(isWidePageAspect(1000, 1000))
        assertFalse(isWidePageAspect(1199, 1000))
        assertTrue(isWidePageAspect(1200, 1000))
        assertFalse(isWidePageAspect(100, 0))
    }

    @Test
    fun `comicPageRangeLabel shows a single 1-based page number`() {
        assertEquals("12", comicPageRangeLabel(listOf(11)))
    }

    @Test
    fun `comicPageRangeLabel shows a spread's range, sorted low-to-high regardless of order`() {
        assertEquals("12-13", comicPageRangeLabel(listOf(11, 12)))
        // RTL spreads store the pages reading-order (right page first); the label stays low-to-high.
        assertEquals("12-13", comicPageRangeLabel(listOf(12, 11)))
    }

    @Test
    fun `comicPageRangeLabel falls back to page 1 for an empty list`() {
        assertEquals("1", comicPageRangeLabel(emptyList()))
    }

    @Test
    fun `comicPageCounterLabel appends the total`() {
        assertEquals("12 / 48", comicPageCounterLabel(listOf(11), 48))
        assertEquals("12-13 / 48", comicPageCounterLabel(listOf(11, 12), 48))
    }
}
