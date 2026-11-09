package com.bookorbit.core.model

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * [groupReadingServiceSummaries] - the pure function behind hiding `readwise-social` (and any
 * future `readwise-*` sub-adapter) from its own Integrations row and folding it under its parent
 * provider's detail screen and Settings summary instead.
 */
class GroupReadingServiceSummariesTest {

    private fun summary(provider: String, connected: Boolean = false) =
        ReadingServiceSummary(provider = provider, connected = connected)

    @Test
    fun `a sub-adapter is grouped under its parent and dropped from the top-level list`() {
        val readwise = summary("readwise")
        val readwiseSocial = summary("readwise-social")
        val hardcover = summary("hardcover")

        val (topLevel, bySubParent) = groupReadingServiceSummaries(listOf(readwise, readwiseSocial, hardcover))

        assertEquals(listOf(readwise, hardcover), topLevel)
        assertEquals(listOf(readwiseSocial), bySubParent["readwise"])
        assertTrue("hardcover" !in bySubParent)
    }

    @Test
    fun `a provider id with no matching parent in the list keeps its own row`() {
        val readwiseSocial = summary("readwise-social")

        val (topLevel, bySubParent) = groupReadingServiceSummaries(listOf(readwiseSocial))

        assertEquals(listOf(readwiseSocial), topLevel)
        assertTrue(bySubParent.isEmpty())
    }

    @Test
    fun `no sub-adapters leaves the list and grouping unchanged`() {
        val readwise = summary("readwise")
        val hardcover = summary("hardcover")

        val (topLevel, bySubParent) = groupReadingServiceSummaries(listOf(readwise, hardcover))

        assertEquals(listOf(readwise, hardcover), topLevel)
        assertTrue(bySubParent.isEmpty())
    }

    @Test
    fun `multiple sub-adapters under the same parent are all grouped`() {
        val readwise = summary("readwise")
        val readwiseSocial = summary("readwise-social")
        val readwiseTrending = summary("readwise-trending")

        val (topLevel, bySubParent) = groupReadingServiceSummaries(listOf(readwise, readwiseSocial, readwiseTrending))

        assertEquals(listOf(readwise), topLevel)
        assertEquals(listOf(readwiseSocial, readwiseTrending), bySubParent["readwise"])
    }

    @Test
    fun `isSubAdapterOf matches only the prefixed id`() {
        assertTrue(summary("readwise-social").isSubAdapterOf("readwise"))
        assertTrue(!summary("readwise").isSubAdapterOf("readwise"))
        assertTrue(!summary("hardcover").isSubAdapterOf("readwise"))
    }
}
