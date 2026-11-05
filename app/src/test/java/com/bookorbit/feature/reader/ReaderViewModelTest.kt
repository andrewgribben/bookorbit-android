package com.bookorbit.feature.reader

import androidx.lifecycle.SavedStateHandle
import androidx.lifecycle.ViewModelStore
import com.bookorbit.core.model.BookDetail
import com.bookorbit.core.model.BookFileRef
import com.bookorbit.core.storage.LocalRef
import com.bookorbit.core.wallpaper.CoverWallpaperController
import com.bookorbit.core.wallpaper.CoverWallpaperFollowController
import com.bookorbit.feature.bookdetail.BookDetailRepository
import com.bookorbit.feature.downloads.DownloadsRepository
import com.bookorbit.feature.player.PlayerManager
import com.bookorbit.feature.reader.narration.NarrationAudioSource
import com.bookorbit.feature.sessions.ReadingSessionTracker
import com.bookorbit.util.MainDispatcherRule
import io.mockk.coEvery
import io.mockk.coVerify
import io.mockk.every
import io.mockk.mockk
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.test.runTest
import org.junit.Assert.assertEquals
import org.junit.Before
import org.junit.Rule
import org.junit.Test
import java.io.File

/**
 * Covers the read-aloud EPUB <-> audiobook position-sync fixes:
 *  - a relocate caused by reflow or by restoring the saved position must not overwrite progress
 *    the server may have mapped onto this file from listening (defect #1).
 *  - the final pending position at [onCleared] must still reach the repository even though
 *    `viewModelScope` is already cancelled by then (defect #2).
 */
@OptIn(ExperimentalCoroutinesApi::class)
class ReaderViewModelTest {
    @get:Rule val mainDispatcherRule = MainDispatcherRule()

    private lateinit var bookRepo: BookDetailRepository
    private lateinit var downloads: DownloadsRepository
    private lateinit var source: ReaderSource
    private lateinit var progress: ReaderProgressRepository
    private lateinit var settingsStore: ReaderSettingsStore
    private lateinit var sessions: ReadingSessionTracker
    private lateinit var annotationRepo: ReaderAnnotationRepository
    private lateinit var bookmarkRepo: ReaderBookmarkRepository
    private lateinit var playerManager: PlayerManager
    private lateinit var narrationSource: NarrationAudioSource
    private lateinit var wallpaper: CoverWallpaperController
    private lateinit var wallpaperFollow: CoverWallpaperFollowController
    private lateinit var controlsStore: ReaderControlsStore

    private val book = BookDetail(
        id = 1, libraryId = 1, libraryName = "L", status = "active", addedAt = "2024-01-01",
        files = listOf(BookFileRef(id = 5, format = "epub", role = "primary")),
    )
    private val resolvedFile = ReaderSource.ResolvedFile(LocalRef.PlainFile(File("book.epub")), "epub", fileId = 5)

    private fun vm(appScope: CoroutineScope = CoroutineScope(Dispatchers.Unconfined)) = ReaderViewModel(
        SavedStateHandle(mapOf("id" to 1)),
        bookRepo, downloads, source, progress, settingsStore, sessions, annotationRepo, bookmarkRepo,
        playerManager, narrationSource, wallpaper, wallpaperFollow, controlsStore, appScope,
    )

    @Before
    fun setUp() {
        bookRepo = mockk()
        downloads = mockk(relaxed = true)
        source = mockk()
        progress = mockk(relaxed = true)
        settingsStore = mockk(relaxed = true)
        sessions = mockk(relaxed = true)
        annotationRepo = mockk(relaxed = true)
        bookmarkRepo = mockk(relaxed = true)
        playerManager = mockk(relaxed = true)
        narrationSource = mockk(relaxed = true)
        wallpaper = mockk(relaxed = true)
        wallpaperFollow = mockk(relaxed = true)
        controlsStore = mockk(relaxed = true)

        coEvery { settingsStore.loadGlobal() } returns ReaderSettings()
        coEvery { settingsStore.loadBookState(any()) } returns BookSettingsState()
        coEvery { settingsStore.loadGlobalSavedDefault() } returns null
        coEvery { settingsStore.loadBookSavedDefault(any()) } returns null
        coEvery { settingsStore.hasSeenPagingHint() } returns true
        coEvery { controlsStore.load() } returns ReaderControlsSettings()
        coEvery { bookRepo.detail(1) } returns book
        coEvery { source.resolve(book) } returns resolvedFile
        coEvery { progress.resolveInitial(5) } returns InitialProgress(null, 0.0)
        every { playerManager.state } returns MutableStateFlow(PlayerManager.UiState())
        coEvery { playerManager.flushPendingIfCurrent(any()) } returns Unit
    }

    @Test
    fun `a reflow relocate does not report a fresh position`() = runTest {
        val model = vm()
        model.onRelocate("epubcfi(/6/2)", 0.5, "Ch 1", reason = "anchor", restoring = false)
        model.flush()

        coVerify(exactly = 0) { progress.report(any(), any(), any(), any(), any()) }
    }

    @Test
    fun `the relocate that restores the saved position does not report a fresh position`() = runTest {
        val model = vm()
        model.onRelocate("epubcfi(/6/2)", 0.5, "Ch 1", reason = "navigation", restoring = true)
        model.flush()

        coVerify(exactly = 0) { progress.report(any(), any(), any(), any(), any()) }
    }

    @Test
    fun `a real page turn still reports`() = runTest {
        coEvery { progress.report(any(), any(), any(), any(), any()) } returns Unit
        val model = vm()
        model.onRelocate("epubcfi(/6/4)", 0.6, "Ch 1", reason = "page", restoring = false)
        model.flush()

        coVerify { progress.report(5, "epubcfi(/6/4)", 60.0, null, null) }
    }

    @Test
    fun `a read-aloud page turn reports its first narrated sentence`() = runTest {
        coEvery { progress.report(any(), any(), any(), any(), any()) } returns Unit
        val model = vm()
        val sentence = PageNarrationMarker("OEBPS/c016.xhtml#c016-s0", 21)
        model.onRelocate("epubcfi(/6/44)", 0.4, "Ch 16", reason = "page", restoring = false, narration = sentence)
        model.flush()

        coVerify { progress.report(5, "epubcfi(/6/44)", 40.0, null, sentence) }
    }

    @Test
    fun `the final pending position is still written when the screen is left`() = runTest {
        coEvery { progress.report(any(), any(), any(), any(), any()) } returns Unit
        // A real app-lifetime scope (not the test dispatcher) proves this does not depend on
        // viewModelScope, which is already cancelled by the time onCleared() runs for real.
        val model = vm(appScope = CoroutineScope(Dispatchers.Unconfined))
        // The first relocate auto-flushes (lastSaved starts at 0, so the throttle always passes
        // the first time) - the second lands inside the 2s throttle window and stays pending
        // until onCleared() has to flush it itself.
        model.onRelocate("epubcfi(/6/2)", 0.1, "Ch 1", reason = "page", restoring = false)
        model.onRelocate("epubcfi(/6/8)", 0.9, "Ch 2", reason = "page", restoring = false)

        // Drive onCleared() the real way: ViewModelStore.clear() cancels viewModelScope THEN
        // calls onCleared() - the exact ordering that drops a `viewModelScope.launch` started
        // from onCleared(). A direct onCleared() call wouldn't exercise that at all.
        val store = ViewModelStore()
        store.put("reader", model)
        store.clear()

        coVerify { progress.report(5, "epubcfi(/6/8)", 90.0, null, null) }
    }

    // --- "Continue from another device?" (newer-position prompt) ---

    @Test
    fun `onReaderResumed offers a newer position from another device`() = runTest {
        coEvery { progress.resolveInitial(5) } returns InitialProgress("epubcfi(/6/2)", 0.1, serverStampMs = 100L)
        coEvery { progress.fetchServerPosition(5) } returns
            ServerPosition(cfi = "epubcfi(/6/9)", fraction = 0.8, percentage = 80.0, stampMs = 200L)
        val model = vm()
        model.onLoaded(emptyList(), "Title")
        model.onRelocate("epubcfi(/6/2)", 0.1, "Ch 1", reason = "navigation", restoring = true)
        model.flush()

        model.onReaderResumed()

        assertEquals("epubcfi(/6/9)", model.ui.value.newerPosition?.cfi)
        assertEquals(80.0, model.ui.value.newerPosition?.remotePercentage)
    }

    @Test
    fun `onReaderResumed does nothing before the book has finished its initial load`() = runTest {
        coEvery { progress.resolveInitial(5) } returns InitialProgress("epubcfi(/6/2)", 0.1, serverStampMs = 100L)
        coEvery { progress.fetchServerPosition(5) } returns
            ServerPosition(cfi = "epubcfi(/6/9)", fraction = 0.8, percentage = 80.0, stampMs = 200L)
        val model = vm() // onLoaded() never called - initial navigation still "pending"

        model.onReaderResumed()

        coVerify(exactly = 0) { progress.fetchServerPosition(5) }
    }

    @Test
    fun `onReaderResumed does not offer when there is no newer server stamp`() = runTest {
        coEvery { progress.resolveInitial(5) } returns InitialProgress("epubcfi(/6/2)", 0.1, serverStampMs = 200L)
        coEvery { progress.fetchServerPosition(5) } returns
            ServerPosition(cfi = "epubcfi(/6/2)", fraction = 0.1, percentage = 10.0, stampMs = 200L)
        val model = vm()
        model.onLoaded(emptyList(), "Title")

        model.onReaderResumed()

        assertEquals(null, model.ui.value.newerPosition)
    }

    @Test
    fun `onReaderResumed does not offer while narration is playing`() = runTest {
        coEvery { progress.resolveInitial(5) } returns InitialProgress("epubcfi(/6/2)", 0.1, serverStampMs = 100L)
        coEvery { progress.fetchServerPosition(5) } returns
            ServerPosition(cfi = "epubcfi(/6/9)", fraction = 0.8, percentage = 80.0, stampMs = 200L)
        val model = vm()
        model.onLoaded(emptyList(), "Title")
        // narrationOn only flips on a real `NarrationReady` event, which needs media3's
        // MediaItem.Builder (android.os.Bundle-backed - unavailable outside Robolectric/
        // instrumentation). onReaderResumed's gate is exercised directly via reflection instead,
        // keeping this test a plain JVM unit test like the rest of the suite.
        val uiField = ReaderViewModel::class.java.getDeclaredField("_ui")
        uiField.isAccessible = true
        @Suppress("UNCHECKED_CAST")
        val uiFlow = uiField.get(model) as kotlinx.coroutines.flow.MutableStateFlow<ReaderViewModel.UiState>
        uiFlow.value = uiFlow.value.copy(narrationOn = true)
        assertEquals(true, model.ui.value.narrationOn)

        model.onReaderResumed()

        coVerify(exactly = 0) { progress.fetchServerPosition(5) }
    }

    @Test
    fun `onReaderResumed is throttled to one check per 5 seconds`() = runTest {
        coEvery { progress.resolveInitial(5) } returns InitialProgress("epubcfi(/6/2)", 0.1, serverStampMs = 100L)
        coEvery { progress.fetchServerPosition(5) } returns
            ServerPosition(cfi = "epubcfi(/6/9)", fraction = 0.8, percentage = 80.0, stampMs = 200L)
        val model = vm()
        model.onLoaded(emptyList(), "Title")

        model.onReaderResumed()
        model.onReaderResumed()

        coVerify(exactly = 1) { progress.fetchServerPosition(5) }
    }

    @Test
    fun `followNewerPosition navigates without saving back`() = runTest {
        coEvery { progress.resolveInitial(5) } returns InitialProgress("epubcfi(/6/2)", 0.1, serverStampMs = 100L)
        coEvery { progress.fetchServerPosition(5) } returns
            ServerPosition(cfi = "epubcfi(/6/9)", fraction = 0.8, percentage = 80.0, stampMs = 200L)
        val model = vm()
        model.onLoaded(emptyList(), "Title")
        model.onReaderResumed()
        assertEquals("epubcfi(/6/9)", model.ui.value.newerPosition?.cfi)

        model.followNewerPosition()
        // The WebView lands back on the adopted cfi; that relocate must not be reported.
        model.onRelocate("epubcfi(/6/9)", 0.8, "Ch 9", reason = "navigation", restoring = false)
        model.flush()

        assertEquals(null, model.ui.value.newerPosition)
        coVerify(exactly = 0) { progress.report(any(), any(), any(), any(), any()) }
    }

    @Test
    fun `stayAtCurrentPosition saves this reader's own position immediately`() = runTest {
        coEvery { progress.resolveInitial(5) } returns InitialProgress("epubcfi(/6/2)", 0.1, serverStampMs = 100L)
        coEvery { progress.fetchServerPosition(5) } returns
            ServerPosition(cfi = "epubcfi(/6/9)", fraction = 0.8, percentage = 80.0, stampMs = 200L)
        coEvery { progress.report(any(), any(), any(), any(), any()) } returns Unit
        val model = vm()
        model.onLoaded(emptyList(), "Title")
        model.onRelocate("epubcfi(/6/2)", 0.1, "Ch 1", reason = "navigation", restoring = true)
        model.onReaderResumed()
        assertEquals("epubcfi(/6/9)", model.ui.value.newerPosition?.cfi)

        model.stayAtCurrentPosition()

        assertEquals(null, model.ui.value.newerPosition)
        coVerify { progress.report(5, "epubcfi(/6/2)", 10.0, null, null) }
    }

    @Test
    fun `a same-cfi check adopts the server stamp without offering`() = runTest {
        coEvery { progress.resolveInitial(5) } returns InitialProgress("epubcfi(/6/2)", 0.1, serverStampMs = 100L)
        coEvery { progress.fetchServerPosition(5) } returns
            ServerPosition(cfi = "epubcfi(/6/2)", fraction = 0.1, percentage = 10.0, stampMs = 200L)
        val model = vm()
        model.onLoaded(emptyList(), "Title")
        model.onRelocate("epubcfi(/6/2)", 0.1, "Ch 1", reason = "navigation", restoring = true)

        model.onReaderResumed()

        assertEquals(null, model.ui.value.newerPosition)
    }
}
