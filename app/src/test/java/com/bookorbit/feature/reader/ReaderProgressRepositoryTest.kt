package com.bookorbit.feature.reader

import com.bookorbit.core.db.ReaderProgressDao
import com.bookorbit.core.db.ReaderProgressEntity
import com.bookorbit.core.model.FileProgress
import com.bookorbit.core.model.SaveFileProgress
import com.bookorbit.core.network.ApiService
import com.bookorbit.core.sync.SyncScheduler
import io.mockk.coEvery
import io.mockk.coVerify
import io.mockk.mockk
import io.mockk.verify
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test

@OptIn(ExperimentalCoroutinesApi::class)
class ReaderProgressRepositoryTest {

    private lateinit var dao: ReaderProgressDao
    private lateinit var api: ApiService
    private lateinit var syncScheduler: SyncScheduler
    private lateinit var repo: ReaderProgressRepository

    @Before
    fun setUp() {
        dao = mockk(relaxed = true)
        api = mockk()
        syncScheduler = mockk(relaxed = true)
        repo = ReaderProgressRepository(dao, api, syncScheduler)
    }

    @Test
    fun `report schedules a background retry when the network call fails`() = runTest {
        coEvery { api.saveFileProgress(any(), any()) } throws RuntimeException("offline")

        repo.report(fileId = 1, cfi = "epubcfi(...)", percentage = 50.0)

        coVerify { dao.upsert(match { it.fileId == 1 && it.cfi == "epubcfi(...)" && it.percentage == 50.0 && it.dirty }) }
        coVerify(exactly = 0) { dao.markSynced(any()) }
        verify { syncScheduler.schedule() }
    }

    @Test
    fun `report does not schedule a retry when the network call succeeds`() = runTest {
        coEvery { api.saveFileProgress(any(), any()) } returns Unit

        repo.report(fileId = 1, cfi = null, percentage = 50.0)

        coVerify { dao.markSynced(1) }
        verify(exactly = 0) { syncScheduler.schedule() }
    }

    @Test
    fun `flushPending returns false once every dirty entry syncs`() = runTest {
        coEvery { dao.dirtyEntries() } returnsMany listOf(
            listOf(ReaderProgressEntity(1, null, 10.0, 100L, dirty = true)),
            emptyList(),
        )
        coEvery { api.saveFileProgress(any(), any()) } returns Unit

        assertFalse(repo.flushPending())
        coVerify { dao.markSynced(1) }
    }

    @Test
    fun `report keeps the page number locally and sends it to the server`() = runTest {
        coEvery { api.saveFileProgress(any(), any()) } returns Unit

        repo.report(fileId = 3, cfi = null, percentage = 70.8, pageNumber = 34)

        coVerify { dao.upsert(match { it.fileId == 3 && it.pageNumber == 34 && it.dirty }) }
        coVerify { api.saveFileProgress(3, SaveFileProgress(null, 70.8, 34)) }
    }

    @Test
    fun `flushPending resends a pending page number`() = runTest {
        coEvery { dao.dirtyEntries() } returnsMany listOf(
            listOf(ReaderProgressEntity(3, null, 70.8, 100L, dirty = true, pageNumber = 34)),
            emptyList(),
        )
        coEvery { api.saveFileProgress(any(), any()) } returns Unit

        repo.flushPending()

        coVerify { api.saveFileProgress(3, SaveFileProgress(null, 70.8, 34)) }
    }

    @Test
    fun `report keeps the first narrated sentence locally and sends it`() = runTest {
        coEvery { api.saveFileProgress(any(), any()) } returns Unit

        repo.report(fileId = 4, cfi = "epubcfi(/6/44)", percentage = 40.0, narration = PageNarrationMarker("c016.xhtml#c016-s0", 21))

        coVerify { dao.upsert(match { it.mediaOverlayFragment == "c016.xhtml#c016-s0" && it.mediaOverlaySectionIndex == 21 && it.dirty }) }
        coVerify { api.saveFileProgress(4, SaveFileProgress("epubcfi(/6/44)", 40.0, null, "c016.xhtml#c016-s0", 21)) }
    }

    @Test
    fun `flushPending resends an offline-queued narrated sentence`() = runTest {
        coEvery { dao.dirtyEntries() } returnsMany listOf(
            listOf(ReaderProgressEntity(4, "epubcfi(/6/44)", 40.0, 100L, dirty = true, mediaOverlayFragment = "c016.xhtml#c016-s0", mediaOverlaySectionIndex = 21)),
            emptyList(),
        )
        coEvery { api.saveFileProgress(any(), any()) } returns Unit

        repo.flushPending()

        coVerify { api.saveFileProgress(4, SaveFileProgress("epubcfi(/6/44)", 40.0, null, "c016.xhtml#c016-s0", 21)) }
    }

    @Test
    fun `resolveInitial carries the server page number`() = runTest {
        coEvery { dao.get(3) } returns null
        coEvery { api.getFileProgress(3) } returns FileProgress(cfi = null, percentage = 70.8, pageNumber = 34)

        val initial = repo.resolveInitial(3)

        assertEquals(34, initial.pageNumber)
        assertEquals(0.708, initial.fraction!!, 1e-9)
    }

    @Test
    fun `resolveInitial prefers a pending local page number`() = runTest {
        coEvery { dao.get(3) } returns ReaderProgressEntity(3, null, 75.0, 100L, dirty = true, pageNumber = 36)
        coEvery { api.getFileProgress(3) } returns FileProgress(cfi = null, percentage = 70.8, pageNumber = 34)

        assertEquals(36, repo.resolveInitial(3).pageNumber)
    }

    @Test
    fun `resolveInitial prefers a newer server write over a stale dirty local row`() = runTest {
        // e.g. listening moved past this file's locally-saved position before it synced; the
        // server already mapped the newer position onto this EPUB file (upsertSyncedEpubProgressIfNewer).
        coEvery { dao.get(3) } returns ReaderProgressEntity(3, "epubcfi(local)", 10.0, 100L, dirty = true)
        coEvery { api.getFileProgress(3) } returns
            FileProgress(cfi = "epubcfi(server)", percentage = 55.0, updatedAt = "2026-01-01T00:00:01Z")

        val initial = repo.resolveInitial(3)

        assertEquals("epubcfi(server)", initial.cfi)
        assertEquals(0.55, initial.fraction!!, 1e-9)
        assertEquals("epubcfi(local)", initial.previousCfi)
    }

    @Test
    fun `resolveInitial offers no undo when the server position is this device's own`() = runTest {
        coEvery { dao.get(3) } returns ReaderProgressEntity(3, "epubcfi(same)", 55.0, 100L, dirty = false)
        coEvery { api.getFileProgress(3) } returns FileProgress(cfi = "epubcfi(same)", percentage = 55.0, updatedAt = "2026-01-01T00:00:01Z")

        assertNull(repo.resolveInitial(3).previousCfi)
    }

    @Test
    fun `resolveInitial offers undo when a synced row replaced this device's synced position`() = runTest {
        // e.g. read on the web or listened since this device last read: local is clean but older.
        coEvery { dao.get(3) } returns ReaderProgressEntity(3, "epubcfi(local)", 10.0, 100L, dirty = false)
        coEvery { api.getFileProgress(3) } returns FileProgress(cfi = "epubcfi(server)", percentage = 55.0, updatedAt = "2026-01-01T00:00:01Z")

        assertEquals("epubcfi(local)", repo.resolveInitial(3).previousCfi)
    }

    @Test
    fun `resolveInitial keeps a dirty local row that is actually newer than the server`() = runTest {
        coEvery { dao.get(3) } returns ReaderProgressEntity(3, "epubcfi(local)", 10.0, 2_000_000_000_000L, dirty = true)
        coEvery { api.getFileProgress(3) } returns
            FileProgress(cfi = "epubcfi(server)", percentage = 55.0, updatedAt = "2000-01-01T00:00:00Z")

        val initial = repo.resolveInitial(3)

        assertEquals("epubcfi(local)", initial.cfi)
        assertNull(initial.previousCfi)
    }

    @Test
    fun `fetchServerPosition returns the server row with its write time`() = runTest {
        coEvery { api.getFileProgress(5) } returns
            FileProgress(cfi = "epubcfi(x)", percentage = 42.5, updatedAt = "2026-01-01T00:00:05Z")

        val result = repo.fetchServerPosition(5)

        assertEquals("epubcfi(x)", result?.cfi)
        assertEquals(42.5, result?.percentage!!, 1e-9)
        assertEquals(0.425, result.fraction, 1e-9)
        assertEquals(1_767_225_605_000L, result.stampMs)
    }

    @Test
    fun `fetchServerPosition returns null when offline`() = runTest {
        coEvery { api.getFileProgress(5) } throws RuntimeException("offline")

        assertEquals(null, repo.fetchServerPosition(5))
    }

    @Test
    fun `fetchServerPosition returns null without an updatedAt to compare against`() = runTest {
        coEvery { api.getFileProgress(5) } returns FileProgress(cfi = "epubcfi(x)", percentage = 10.0, updatedAt = null)

        assertEquals(null, repo.fetchServerPosition(5))
    }

    @Test
    fun `resolveInitial carries the server stamp even when local wins`() = runTest {
        coEvery { dao.get(3) } returns ReaderProgressEntity(3, "epubcfi(local)", 10.0, 2_000_000_000_000L, dirty = true)
        coEvery { api.getFileProgress(3) } returns
            FileProgress(cfi = "epubcfi(server)", percentage = 55.0, updatedAt = "2000-01-01T00:00:00Z")

        val initial = repo.resolveInitial(3)

        assertEquals("epubcfi(local)", initial.cfi)
        assertEquals(946_684_800_000L, initial.serverStampMs)
    }

    @Test
    fun `flushPending returns true when an entry stays dirty after a failed retry`() = runTest {
        val stillDirty = ReaderProgressEntity(1, null, 10.0, 100L, dirty = true)
        coEvery { dao.dirtyEntries() } returns listOf(stillDirty)
        coEvery { api.saveFileProgress(any(), any()) } throws RuntimeException("offline")

        assertTrue(repo.flushPending())
        coVerify(exactly = 0) { dao.markSynced(any()) }
    }
}
