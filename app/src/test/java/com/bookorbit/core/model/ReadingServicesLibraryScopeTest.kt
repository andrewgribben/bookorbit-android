package com.bookorbit.core.model

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Test

class ReadingServicesLibraryScopeTest {

    @Test
    fun `returns null when the libraries field is absent, tolerating an older server`() {
        val summary = ReadingServiceSummary(provider = "hardcover", connected = true)

        assertNull(summary.libraryScopeSummary())
    }

    @Test
    fun `reports all libraries when every library is enabled with no feature narrowing`() {
        val summary = ReadingServiceSummary(
            provider = "hardcover",
            connected = true,
            libraries = listOf(
                ReadingServiceLibrarySetting(libraryId = 1, enabled = true),
                ReadingServiceLibrarySetting(libraryId = 2, enabled = true),
            ),
        )

        val scope = summary.libraryScopeSummary()

        assertEquals(LibraryScopeSummary(enabledCount = 2, totalCount = 2, customisedCount = 0), scope)
        assertEquals(true, scope?.isAllLibraries)
    }

    @Test
    fun `reports N of M libraries when a library is disabled`() {
        val summary = ReadingServiceSummary(
            provider = "readwise",
            connected = true,
            libraries = listOf(
                ReadingServiceLibrarySetting(libraryId = 1, enabled = true),
                ReadingServiceLibrarySetting(libraryId = 2, enabled = false),
                ReadingServiceLibrarySetting(libraryId = 3, enabled = true),
            ),
        )

        val scope = summary.libraryScopeSummary()

        assertEquals(LibraryScopeSummary(enabledCount = 2, totalCount = 3, customisedCount = 0), scope)
        assertEquals(false, scope?.isAllLibraries)
    }

    @Test
    fun `counts a customised library only when it is enabled with a feature turned off`() {
        val summary = ReadingServiceSummary(
            provider = "hardcover",
            connected = true,
            libraries = listOf(
                ReadingServiceLibrarySetting(libraryId = 1, enabled = true, features = mapOf("rating" to false)),
                ReadingServiceLibrarySetting(libraryId = 2, enabled = false, features = mapOf("status" to false)),
                ReadingServiceLibrarySetting(libraryId = 3, enabled = true),
            ),
        )

        val scope = summary.libraryScopeSummary()

        // library 2 is disabled, so its own feature override doesn't count toward "customised".
        assertEquals(LibraryScopeSummary(enabledCount = 2, totalCount = 3, customisedCount = 1), scope)
    }
}
