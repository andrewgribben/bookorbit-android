package com.bookorbit.feature.dashboard

import com.bookorbit.core.model.BookCard
import com.bookorbit.core.model.ScrollerType
import com.bookorbit.core.model.ShelfConfigEntry
import com.bookorbit.feature.browse.BrowseRepository
import com.bookorbit.util.MainDispatcherRule
import io.mockk.coEvery
import io.mockk.every
import io.mockk.mockk
import kotlinx.coroutines.ExperimentalCoroutinesApi
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Rule
import org.junit.Test
import java.io.IOException

@OptIn(ExperimentalCoroutinesApi::class)
class DashboardViewModelTest {
    @get:Rule
    val mainRule = MainDispatcherRule()

    private fun book(id: Int) = BookCard(id = id, title = "Book $id", addedAt = "2024-01-01")

    private fun entry(type: String, order: Int, enabled: Boolean = true) =
        ShelfConfigEntry(id = type, type = type, label = "", enabled = enabled, order = order)

    private fun shelfConfigRepo(entries: List<ShelfConfigEntry>): DashboardShelfConfigRepository {
        val repo = mockk<DashboardShelfConfigRepository>()
        every { repo.shelves() } returns entries
        return repo
    }

    private fun repo(
        continueReading: Result<List<BookCard>> = Result.success(emptyList()),
        continueListening: Result<List<BookCard>> = Result.success(emptyList()),
        recentlyAdded: Result<List<BookCard>> = Result.success(emptyList()),
        wantToRead: Result<List<BookCard>> = Result.success(emptyList()),
        upNextInSeries: Result<List<BookCard>> = Result.success(emptyList()),
    ): BrowseRepository {
        val repo = mockk<BrowseRepository>()
        coEvery { repo.readingStreak() } throws IOException("no widget")
        coEvery { repo.readingGoal() } throws IOException("no widget")
        coEvery { repo.scroller(ScrollerType.CONTINUE_READING, any(), any()) } returns continueReading.getOrThrow()
        coEvery { repo.scroller(ScrollerType.CONTINUE_LISTENING, any(), any()) } returns continueListening.getOrThrow()
        coEvery { repo.scroller(ScrollerType.RECENTLY_ADDED, any(), any()) } returns recentlyAdded.getOrThrow()
        coEvery { repo.scroller(ScrollerType.WANT_TO_READ, any(), any()) } returns wantToRead.getOrThrow()
        coEvery { repo.scroller(ScrollerType.UP_NEXT_IN_SERIES, any(), any()) } returns upNextInSeries.getOrThrow()
        return repo
    }

    private fun failingRepo(): BrowseRepository {
        val repo = mockk<BrowseRepository>()
        coEvery { repo.readingStreak() } throws IOException("no widget")
        coEvery { repo.readingGoal() } throws IOException("no widget")
        coEvery { repo.scroller(any(), any(), any()) } throws IOException("offline")
        return repo
    }

    private val defaultEntries = listOf(
        entry(ScrollerType.CONTINUE_READING, 1),
        entry(ScrollerType.CONTINUE_LISTENING, 2),
        entry(ScrollerType.RECENTLY_ADDED, 3),
        entry(ScrollerType.WANT_TO_READ, 4),
        entry(ScrollerType.UP_NEXT_IN_SERIES, 5),
    )

    @Test
    fun `want-to-read and up-next-in-series shelves populate from the server`() {
        val vm = DashboardViewModel(
            repo(
                wantToRead = Result.success(listOf(book(1))),
                upNextInSeries = Result.success(listOf(book(2))),
            ),
            shelfConfigRepo(defaultEntries),
        )
        assertEquals(listOf(1), vm.ui.value.shelves.booksFor(ScrollerType.WANT_TO_READ).map { it.id })
        assertEquals(listOf(2), vm.ui.value.shelves.booksFor(ScrollerType.UP_NEXT_IN_SERIES).map { it.id })
        assertFalse(vm.ui.value.error)
    }

    @Test
    fun `an older server hiding new scroller types is not an error`() {
        // Simulates the server returning nothing for types it doesn't recognise, rather than failing.
        val vm = DashboardViewModel(repo(), shelfConfigRepo(defaultEntries))
        assertTrue(vm.ui.value.shelves.booksFor(ScrollerType.WANT_TO_READ).isEmpty())
        assertTrue(vm.ui.value.shelves.booksFor(ScrollerType.UP_NEXT_IN_SERIES).isEmpty())
        assertFalse(vm.ui.value.error)
    }

    @Test
    fun `error is only set when every enabled shelf fails`() {
        val vm = DashboardViewModel(failingRepo(), shelfConfigRepo(defaultEntries))
        assertTrue(vm.ui.value.error)
    }

    @Test
    fun `disabled shelves are not fetched at all`() {
        val vm = DashboardViewModel(
            repo(wantToRead = Result.success(listOf(book(1)))),
            shelfConfigRepo(listOf(entry(ScrollerType.WANT_TO_READ, 1, enabled = false))),
        )
        assertTrue(vm.ui.value.shelves.isEmpty())
        assertFalse(vm.ui.value.error)
    }

    @Test
    fun `a shelf type this app can't recognise still renders generically`() {
        val repo = mockk<BrowseRepository>()
        coEvery { repo.readingStreak() } throws IOException("no widget")
        coEvery { repo.readingGoal() } throws IOException("no widget")
        coEvery { repo.scroller("future-shelf-type", 20, 7) } returns listOf(book(9))
        val vm = DashboardViewModel(
            repo,
            shelfConfigRepo(
                listOf(ShelfConfigEntry(id = "x", type = "future-shelf-type", label = "From the Future", enabled = true, order = 1, limit = 20, smartScopeId = 7)),
            ),
        )
        assertEquals(listOf(9), vm.ui.value.shelves.single().books.map { it.id })
        assertFalse(vm.ui.value.error)
    }

    @Test
    fun `shelves render in the configured order`() {
        val vm = DashboardViewModel(
            repo(
                recentlyAdded = Result.success(listOf(book(1))),
                wantToRead = Result.success(listOf(book(2))),
            ),
            shelfConfigRepo(
                listOf(
                    entry(ScrollerType.WANT_TO_READ, 1),
                    entry(ScrollerType.RECENTLY_ADDED, 2),
                ),
            ),
        )
        assertEquals(listOf(ScrollerType.WANT_TO_READ, ScrollerType.RECENTLY_ADDED), vm.ui.value.shelves.map { it.entry.type })
    }
}
