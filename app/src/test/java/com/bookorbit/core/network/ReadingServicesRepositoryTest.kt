package com.bookorbit.core.network

import com.bookorbit.core.model.ReadingServiceAvailableShelf
import com.bookorbit.core.model.ReadingServiceShelfItem
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
    fun `availableShelves degrades to empty on a server that predates the endpoint`() = runTest {
        val api = mockk<ApiService>()
        coEvery { api.getAvailableReadingServiceShelves() } throws IOException("404")
        val repo = ReadingServicesRepository(api)

        assertTrue(repo.availableShelves().isEmpty())
    }

    @Test
    fun `availableShelves passes through the server response unchanged`() = runTest {
        val api = mockk<ApiService>()
        val shelf = ReadingServiceAvailableShelf(provider = "readwise", shelf = "owned-elsewhere", connected = true)
        coEvery { api.getAvailableReadingServiceShelves() } returns listOf(shelf)
        val repo = ReadingServicesRepository(api)

        assertEquals(listOf(shelf), repo.availableShelves())
    }

    @Test
    fun `shelf degrades to empty when the shelf endpoint 404s`() = runTest {
        val api = mockk<ApiService>()
        coEvery { api.getReadingServiceShelf(any(), any()) } throws IOException("404")
        val repo = ReadingServicesRepository(api)

        assertTrue(repo.shelf("readwise", "owned-elsewhere").isEmpty())
    }

    @Test
    fun `shelf returns the mapped shelf items with no limit param`() = runTest {
        val api = mockk<ApiService>()
        val item = ReadingServiceShelfItem(title = "Remote Title", provider = "readwise")
        coEvery { api.getReadingServiceShelf("readwise", "owned-elsewhere") } returns listOf(item)
        val repo = ReadingServicesRepository(api)

        assertEquals(listOf(item), repo.shelf("readwise", "owned-elsewhere"))
    }
}
