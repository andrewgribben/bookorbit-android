package com.bookorbit.feature.dashboard

import com.bookorbit.core.model.BookCard
import com.bookorbit.core.model.ScrollerType
import com.bookorbit.feature.browse.BrowseRepository
import com.bookorbit.util.MainDispatcherRule
import io.mockk.coEvery
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
        coEvery { repo.scroller(ScrollerType.CONTINUE_READING) } returns continueReading.getOrThrow()
        coEvery { repo.scroller(ScrollerType.CONTINUE_LISTENING) } returns continueListening.getOrThrow()
        coEvery { repo.scroller(ScrollerType.RECENTLY_ADDED) } returns recentlyAdded.getOrThrow()
        coEvery { repo.scroller(ScrollerType.WANT_TO_READ) } returns wantToRead.getOrThrow()
        coEvery { repo.scroller(ScrollerType.UP_NEXT_IN_SERIES) } returns upNextInSeries.getOrThrow()
        return repo
    }

    private fun failingRepo(): BrowseRepository {
        val repo = mockk<BrowseRepository>()
        coEvery { repo.readingStreak() } throws IOException("no widget")
        coEvery { repo.readingGoal() } throws IOException("no widget")
        coEvery { repo.scroller(any()) } throws IOException("offline")
        return repo
    }

    @Test
    fun `want-to-read and up-next-in-series shelves populate from the server`() {
        val vm = DashboardViewModel(
            repo(
                wantToRead = Result.success(listOf(book(1))),
                upNextInSeries = Result.success(listOf(book(2))),
            ),
        )
        assertEquals(listOf(1), vm.ui.value.wantToRead.map { it.id })
        assertEquals(listOf(2), vm.ui.value.upNextInSeries.map { it.id })
        assertFalse(vm.ui.value.error)
    }

    @Test
    fun `an older server hiding new scroller types is not an error`() {
        // Simulates the server returning nothing for types it doesn't recognise, rather than failing.
        val vm = DashboardViewModel(repo())
        assertTrue(vm.ui.value.wantToRead.isEmpty())
        assertTrue(vm.ui.value.upNextInSeries.isEmpty())
        assertFalse(vm.ui.value.error)
    }

    @Test
    fun `error is only set when every scroller fails`() {
        val vm = DashboardViewModel(failingRepo())
        assertTrue(vm.ui.value.error)
    }
}
