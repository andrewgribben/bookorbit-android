package com.bookorbit.feature.reader.comic

import com.bookorbit.core.model.BookRecommendation

/**
 * Chooses the next book in a series to read after finishing [currentBookId], from the list
 * `GET books/{id}/series-books` returns (which includes the current book itself).
 *
 * Prefers ordering by [BookRecommendation.seriesIndex]: the candidate with the lowest index that
 * is still greater than [currentSeriesIndex]. When that can't place a next book - the current
 * book's own index is missing, or no candidate has a higher one - falls back to the list's own
 * order: whatever immediately follows the current book's position. Returns null when there is
 * nothing after the current book either way (it's the last one, or it isn't in the list at all).
 */
fun pickNextInSeries(
    currentBookId: Int,
    currentSeriesIndex: Double?,
    books: List<BookRecommendation>,
): BookRecommendation? {
    if (currentSeriesIndex != null) {
        books.asSequence()
            .filter { it.id != currentBookId && it.seriesIndex != null && it.seriesIndex > currentSeriesIndex }
            .minByOrNull { it.seriesIndex!! }
            ?.let { return it }
    }
    val currentPos = books.indexOfFirst { it.id == currentBookId }
    if (currentPos < 0) return null
    return books.getOrNull(currentPos + 1)?.takeIf { it.id != currentBookId }
}
