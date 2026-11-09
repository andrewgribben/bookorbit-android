package com.bookorbit.core.network

import com.bookorbit.core.model.BookRequestAvailability
import com.bookorbit.core.model.BookRequestSubmitResult
import com.bookorbit.core.model.BookRequestSummaryRef
import com.bookorbit.core.model.CheckBookRequestAvailabilityRequest
import com.bookorbit.core.model.CreateBookRequestRequest
import com.bookorbit.core.model.ReadingServiceShelfItem
import io.mockk.coEvery
import io.mockk.mockk
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test
import java.io.IOException

@OptIn(ExperimentalCoroutinesApi::class)
class BookRequestsRepositoryTest {

    private val card = ReadingServiceShelfItem(title = "Remote Title", authors = listOf("Jane Doe"), provider = "readwise")

    @Test
    fun `checkAvailability returns the first result for the one item sent`() = runTest {
        val api = mockk<ApiService>()
        val availability = BookRequestAvailability(ownedBookId = 7)
        coEvery { api.checkBookRequestAvailability(any()) } returns listOf(availability)
        val repo = BookRequestsRepository(api)

        assertEquals(availability, repo.checkAvailability(card))
    }

    @Test
    fun `checkAvailability sends the card's title and author`() = runTest {
        val api = mockk<ApiService>()
        var captured: CheckBookRequestAvailabilityRequest? = null
        coEvery { api.checkBookRequestAvailability(any()) } answers {
            captured = firstArg()
            listOf(BookRequestAvailability())
        }
        val repo = BookRequestsRepository(api)

        repo.checkAvailability(card)

        assertEquals(1, captured?.items?.size)
        assertEquals("Remote Title", captured?.items?.first()?.title)
        assertEquals("Jane Doe", captured?.items?.first()?.author)
    }

    @Test
    fun `checkAvailability returns null on failure`() = runTest {
        val api = mockk<ApiService>()
        coEvery { api.checkBookRequestAvailability(any()) } throws IOException("offline")
        val repo = BookRequestsRepository(api)

        assertNull(repo.checkAvailability(card))
    }

    @Test
    fun `submit succeeds with the created request`() = runTest {
        val api = mockk<ApiService>()
        val result = BookRequestSubmitResult(BookRequestSummaryRef(id = 42))
        coEvery { api.createBookRequest(any()) } returns result
        val repo = BookRequestsRepository(api)

        val submitted = repo.submit(card)

        assertTrue(submitted.isSuccess)
        assertEquals(result, submitted.getOrNull())
    }

    @Test
    fun `submit sends the card's title, authors and cover`() = runTest {
        val api = mockk<ApiService>()
        var captured: CreateBookRequestRequest? = null
        coEvery { api.createBookRequest(any()) } answers {
            captured = firstArg()
            BookRequestSubmitResult(BookRequestSummaryRef(id = 1))
        }
        val repo = BookRequestsRepository(api)
        val coveredCard = card.copy(coverUrl = "https://example.com/cover.jpg")

        repo.submit(coveredCard)

        assertEquals("Remote Title", captured?.title)
        assertEquals(listOf("Jane Doe"), captured?.authors)
        assertEquals("https://example.com/cover.jpg", captured?.coverUrl)
    }

    @Test
    fun `submit surfaces a failure through Result`() = runTest {
        val api = mockk<ApiService>()
        coEvery { api.createBookRequest(any()) } throws IOException("offline")
        val repo = BookRequestsRepository(api)

        assertTrue(repo.submit(card).isFailure)
    }
}
