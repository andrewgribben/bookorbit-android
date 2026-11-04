package com.bookorbit.feature.reader.comic

import com.bookorbit.core.model.BookRecommendation
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Test

class ComicNextInSeriesTest {
    private fun rec(id: Int, seriesIndex: Double?, title: String = "Book $id") =
        BookRecommendation(id = id, title = title, hasCover = true, authors = emptyList(), seriesIndex = seriesIndex)

    @Test
    fun `picks the lowest series index greater than the current book's`() {
        val books = listOf(rec(1, 1.0), rec(2, 2.0), rec(3, 3.0), rec(4, 4.0))
        val next = pickNextInSeries(currentBookId = 2, currentSeriesIndex = 2.0, books = books)
        assertEquals(3, next?.id)
    }

    @Test
    fun `skips the current book even if it reappears in the list`() {
        val books = listOf(rec(1, 1.0), rec(2, 2.0))
        val next = pickNextInSeries(currentBookId = 1, currentSeriesIndex = 1.0, books = books)
        assertEquals(2, next?.id)
    }

    @Test
    fun `returns null for the last book in the series`() {
        val books = listOf(rec(1, 1.0), rec(2, 2.0))
        val next = pickNextInSeries(currentBookId = 2, currentSeriesIndex = 2.0, books = books)
        assertNull(next)
    }

    @Test
    fun `out-of-order series indices still pick the next numerically`() {
        val books = listOf(rec(3, 3.0), rec(1, 1.0), rec(2, 2.0))
        val next = pickNextInSeries(currentBookId = 1, currentSeriesIndex = 1.0, books = books)
        assertEquals(2, next?.id)
    }

    @Test
    fun `falls back to list order when the current book has no series index`() {
        val books = listOf(rec(1, null), rec(2, null), rec(3, null))
        val next = pickNextInSeries(currentBookId = 1, currentSeriesIndex = null, books = books)
        assertEquals(2, next?.id)
    }

    @Test
    fun `falls back to list order when no candidate has a higher index`() {
        val books = listOf(rec(1, 1.0), rec(2, null))
        val next = pickNextInSeries(currentBookId = 1, currentSeriesIndex = 1.0, books = books)
        assertEquals(2, next?.id)
    }

    @Test
    fun `returns null when the current book isn't in the list and nothing has a higher index`() {
        val books = listOf(rec(2, 1.0))
        val next = pickNextInSeries(currentBookId = 99, currentSeriesIndex = null, books = books)
        assertNull(next)
    }

    @Test
    fun `an empty series list has no next book`() {
        assertNull(pickNextInSeries(currentBookId = 1, currentSeriesIndex = 1.0, books = emptyList()))
    }
}
