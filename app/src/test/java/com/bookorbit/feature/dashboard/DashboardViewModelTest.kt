package com.bookorbit.feature.dashboard

import com.bookorbit.core.model.BookCard
import com.bookorbit.core.model.ExternalBookCard
import com.bookorbit.core.model.ReadingRecapWidget
import com.bookorbit.core.model.ReadingServiceSummary
import com.bookorbit.core.model.ScrollerType
import com.bookorbit.core.model.ShelfConfigEntry
import com.bookorbit.core.network.ReadingServicesRepository
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

    private fun shelfConfigRepo(
        entries: List<ShelfConfigEntry>,
        saved: kotlinx.coroutines.flow.SharedFlow<Unit> = kotlinx.coroutines.flow.MutableSharedFlow(),
    ): DashboardShelfConfigRepository {
        val repo = mockk<DashboardShelfConfigRepository>()
        coEvery { repo.shelves() } returns entries
        every { repo.saved } returns saved
        return repo
    }

    /** No connected providers at all - matches an older server (404 on `GET /reading-services`). */
    private fun noReadingServices(): ReadingServicesRepository {
        val repo = mockk<ReadingServicesRepository>()
        coEvery { repo.summaries() } returns emptyList()
        coEvery { repo.shelf(any(), any(), any()) } returns emptyList()
        return repo
    }

    @Test
    fun `saving the shelf config reloads home`() {
        val saved = kotlinx.coroutines.flow.MutableSharedFlow<Unit>(extraBufferCapacity = 1)
        val config = shelfConfigRepo(defaultEntries, saved)
        val vm = DashboardViewModel(repo(), config, noReadingServices())
        coEvery { config.shelves() } returns listOf(entry(ScrollerType.WANT_TO_READ, 1))

        saved.tryEmit(Unit)

        assertEquals(listOf(ScrollerType.WANT_TO_READ), vm.ui.value.shelves.map { it.entry.type })
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
        coEvery { repo.readingRecap() } throws IOException("no widget")
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
        coEvery { repo.readingRecap() } throws IOException("no widget")
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
            noReadingServices(),
        )
        assertEquals(listOf(1), vm.ui.value.shelves.booksFor(ScrollerType.WANT_TO_READ).map { it.id })
        assertEquals(listOf(2), vm.ui.value.shelves.booksFor(ScrollerType.UP_NEXT_IN_SERIES).map { it.id })
        assertFalse(vm.ui.value.error)
    }

    @Test
    fun `an older server hiding new scroller types is not an error`() {
        // Simulates the server returning nothing for types it doesn't recognise, rather than failing.
        val vm = DashboardViewModel(repo(), shelfConfigRepo(defaultEntries), noReadingServices())
        assertTrue(vm.ui.value.shelves.booksFor(ScrollerType.WANT_TO_READ).isEmpty())
        assertTrue(vm.ui.value.shelves.booksFor(ScrollerType.UP_NEXT_IN_SERIES).isEmpty())
        assertFalse(vm.ui.value.error)
    }

    @Test
    fun `error is only set when every enabled shelf fails`() {
        val vm = DashboardViewModel(failingRepo(), shelfConfigRepo(defaultEntries), noReadingServices())
        assertTrue(vm.ui.value.error)
    }

    @Test
    fun `disabled shelves are not fetched at all`() {
        val vm = DashboardViewModel(
            repo(wantToRead = Result.success(listOf(book(1)))),
            shelfConfigRepo(listOf(entry(ScrollerType.WANT_TO_READ, 1, enabled = false))),
            noReadingServices(),
        )
        assertTrue(vm.ui.value.shelves.isEmpty())
        assertFalse(vm.ui.value.error)
    }

    @Test
    fun `a shelf type this app can't recognise still renders generically`() {
        val repo = mockk<BrowseRepository>()
        coEvery { repo.readingStreak() } throws IOException("no widget")
        coEvery { repo.readingGoal() } throws IOException("no widget")
        coEvery { repo.readingRecap() } throws IOException("no widget")
        coEvery { repo.scroller("future-shelf-type", 20, 7) } returns listOf(book(9))
        val vm = DashboardViewModel(
            repo,
            shelfConfigRepo(
                listOf(ShelfConfigEntry(id = "x", type = "future-shelf-type", label = "From the Future", enabled = true, order = 1, limit = 20, smartScopeId = 7)),
            ),
            noReadingServices(),
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
            noReadingServices(),
        )
        assertEquals(listOf(ScrollerType.WANT_TO_READ, ScrollerType.RECENTLY_ADDED), vm.ui.value.shelves.map { it.entry.type })
    }

    @Test
    fun `recap is null when the endpoint fails (older server or disconnected)`() {
        val vm = DashboardViewModel(repo(), shelfConfigRepo(defaultEntries), noReadingServices())
        assertEquals(null, vm.ui.value.recap)
    }

    @Test
    fun `recap populates from the widget endpoint`() {
        val browse = repo()
        coEvery { browse.readingRecap() } returns ReadingRecapWidget(booksFinished = 12, sessions = 40, totalSeconds = 36000, readingDays = 20, goal = 50, byMonth = listOf(1, 2, 3))
        val vm = DashboardViewModel(browse, shelfConfigRepo(defaultEntries), noReadingServices())
        assertEquals(12, vm.ui.value.recap?.booksFinished)
        assertEquals(50, vm.ui.value.recap?.goal)
    }

    @Test
    fun `external shelves are empty when no provider is connected`() {
        val vm = DashboardViewModel(repo(), shelfConfigRepo(defaultEntries), noReadingServices())
        assertTrue(vm.ui.value.externalShelves.isEmpty())
    }

    @Test
    fun `a connected provider's owned-elsewhere shelf shows when it has books`() {
        val services = mockk<ReadingServicesRepository>()
        coEvery { services.summaries() } returns listOf(
            ReadingServiceSummary(provider = "readwise", connected = true, capabilities = mapOf("owned" to "read")),
        )
        coEvery { services.shelf("readwise", any(), any()) } returns emptyList()
        coEvery { services.shelf("readwise", "owned-elsewhere", any()) } returns listOf(ExternalBookCard(title = "A Remote Book"))

        val vm = DashboardViewModel(repo(), shelfConfigRepo(defaultEntries), services)

        val shelf = vm.ui.value.externalShelves.single()
        assertEquals("owned-elsewhere", shelf.shelfId)
        assertEquals("readwise", shelf.provider)
        assertEquals(listOf("A Remote Book"), shelf.books.map { it.title })
    }

    @Test
    fun `a provider's shelf is skipped when the feature toggle is off`() {
        val services = mockk<ReadingServicesRepository>()
        coEvery { services.summaries() } returns listOf(
            ReadingServiceSummary(
                provider = "readwise",
                connected = true,
                capabilities = mapOf("owned" to "read"),
                features = mapOf("owned" to false),
            ),
        )
        coEvery { services.shelf(any(), any(), any()) } returns listOf(ExternalBookCard(title = "Should not show"))

        val vm = DashboardViewModel(repo(), shelfConfigRepo(defaultEntries), services)

        assertTrue(vm.ui.value.externalShelves.isEmpty())
    }

    @Test
    fun `a disconnected provider's shelves are never fetched`() {
        val services = mockk<ReadingServicesRepository>()
        coEvery { services.summaries() } returns listOf(
            ReadingServiceSummary(provider = "hardcover", connected = false, capabilities = mapOf("friends_shelf" to "read")),
        )

        val vm = DashboardViewModel(repo(), shelfConfigRepo(defaultEntries), services)

        assertTrue(vm.ui.value.externalShelves.isEmpty())
    }
}
