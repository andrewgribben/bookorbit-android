package com.bookorbit.feature.reader.comic

import kotlin.math.roundToInt

/**
 * Page <-> progress maths for the comic reader. Pages are 0-based; progress is 0..100. The formulas
 * match the web comic reader (CbzReaderView.vue) so a position saved on one client resumes on the
 * same page on the other.
 */
object ComicPaging {
    /** Progress for being on [page] of [pageCount], as the web reader reports it: (page + 1) / count. */
    fun percentage(page: Int, pageCount: Int): Double {
        if (pageCount <= 0) return 0.0
        return (page.coerceIn(0, pageCount - 1) + 1).toDouble() / pageCount * 100.0
    }

    /**
     * The page to resume on. A saved one-based [pageNumber] wins (the web reader resumes from it
     * too); otherwise the page is estimated from the saved [fraction] (0..1) the same way the web
     * reader does; otherwise the first page.
     */
    fun resumePage(pageNumber: Int?, fraction: Double?, pageCount: Int): Int {
        if (pageCount <= 1) return 0
        if (pageNumber != null && pageNumber >= 1) return (pageNumber - 1).coerceIn(0, pageCount - 1)
        if (fraction == null || fraction <= 0.0) return 0
        val estimated = (fraction.coerceIn(0.0, 1.0) * pageCount).roundToInt()
        return (estimated - 1).coerceIn(0, pageCount - 1)
    }

    /** One-based page number sent to the server alongside the percentage. */
    fun pageNumber(page: Int): Int = page + 1
}
