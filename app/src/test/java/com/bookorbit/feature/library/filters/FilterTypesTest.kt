package com.bookorbit.feature.library.filters

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

/** Pure sort-field logic shared by the Books/Series/Authors quick sort controls. */
class FilterTypesTest {

    @Test
    fun `name-like fields default to ascending`() {
        listOf("title", "author", "series", "name", "sortName").forEach { field ->
            assertEquals("asc for $field", "asc", defaultSortDirection(field))
        }
    }

    @Test
    fun `everything else defaults to descending`() {
        listOf("addedAt", "updatedAt", "rating", "lastReadAt", "bookCount", "lastAddedAt", "lastEnrichedAt", "readProgress", "relevance")
            .forEach { field ->
                assertEquals("desc for $field", "desc", defaultSortDirection(field))
            }
    }

    @Test
    fun `relevance is hidden until a query is typed`() {
        val withoutQuery = visibleSortOptions(SERIES_SORT_OPTIONS, hasQuery = false)
        assertFalse(withoutQuery.any { it.first == "relevance" })

        val withQuery = visibleSortOptions(SERIES_SORT_OPTIONS, hasQuery = true)
        assertTrue(withQuery.any { it.first == "relevance" })
        assertEquals(SERIES_SORT_OPTIONS.size, withQuery.size)
    }

    @Test
    fun `typing a query switches an untouched default sort to relevance`() {
        val default = LibrarySort("name", "asc")
        val result = sortForQueryChange(default, "dune", defaultField = "name")
        assertEquals(LibrarySort("relevance", "desc"), result)
    }

    @Test
    fun `clearing the query restores the default sort from relevance`() {
        val relevance = LibrarySort("relevance", "desc")
        val result = sortForQueryChange(relevance, "", defaultField = "name")
        assertEquals(LibrarySort("name", "asc"), result)
    }

    @Test
    fun `a sort the user picked explicitly is left alone while searching`() {
        val chosen = LibrarySort("bookCount", "desc")
        val result = sortForQueryChange(chosen, "dune", defaultField = "name")
        assertEquals(chosen, result)
    }
}
