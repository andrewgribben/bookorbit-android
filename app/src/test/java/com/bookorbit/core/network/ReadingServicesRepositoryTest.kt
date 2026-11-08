package com.bookorbit.core.network

import com.bookorbit.core.model.ExternalBookCard
import com.bookorbit.core.model.ReadingServiceSummary
import io.mockk.coEvery
import io.mockk.mockk
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test
import java.io.IOException

@OptIn(ExperimentalCoroutinesApi::class)
class ReadingServicesRepositoryTest {

    @Test
    fun `summaries degrades to empty on a server that predates the endpoint`() = runTest {
        val api = mockk<ApiService>()
        coEvery { api.getReadingServices() } throws IOException("404")
        val repo = ReadingServicesRepository(api)

        assertTrue(repo.summaries().isEmpty())
    }

    @Test
    fun `summaries passes through the server response unchanged`() = runTest {
        val api = mockk<ApiService>()
        val summary = ReadingServiceSummary(provider = "readwise", connected = true, capabilities = mapOf("owned" to "read"))
        coEvery { api.getReadingServices() } returns listOf(summary)
        val repo = ReadingServicesRepository(api)

        assertEquals(listOf(summary), repo.summaries())
    }

    @Test
    fun `shelf degrades to empty when the shelf endpoint 404s`() = runTest {
        val api = mockk<ApiService>()
        coEvery { api.getReadingServiceShelf(any(), any(), any()) } throws IOException("404")
        val repo = ReadingServicesRepository(api)

        assertTrue(repo.shelf("readwise", "owned-elsewhere").isEmpty())
    }

    @Test
    fun `shelf returns the mapped external book cards`() = runTest {
        val api = mockk<ApiService>()
        val card = ExternalBookCard(title = "Remote Title", provider = "readwise")
        coEvery { api.getReadingServiceShelf("readwise", "owned-elsewhere", 20) } returns listOf(card)
        val repo = ReadingServicesRepository(api)

        assertEquals(listOf(card), repo.shelf("readwise", "owned-elsewhere"))
    }
}
