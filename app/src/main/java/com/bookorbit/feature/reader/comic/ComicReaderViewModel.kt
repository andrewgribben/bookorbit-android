package com.bookorbit.feature.reader.comic

import android.content.Context
import com.bookorbit.R
import com.bookorbit.ui.UiText
import androidx.lifecycle.SavedStateHandle
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.bookorbit.core.model.BookFiles
import com.bookorbit.core.model.BookRecommendation
import com.bookorbit.core.network.ApiService
import com.bookorbit.core.settings.AppSettingsStore
import com.bookorbit.core.storage.LocalRef
import com.bookorbit.core.di.ApplicationScope
import com.bookorbit.core.wallpaper.CoverWallpaperFollowController
import com.bookorbit.feature.bookdetail.BookDetailRepository
import com.bookorbit.feature.downloads.DownloadsRepository
import com.bookorbit.feature.reader.ReaderControlsSettings
import com.bookorbit.feature.reader.ReaderControlsStore
import com.bookorbit.feature.reader.ReaderProgressRepository
import com.bookorbit.feature.reader.ReaderSettingsScope
import com.bookorbit.feature.reader.trackingEnabled
import com.bookorbit.feature.sessions.ReadingSessionTracker
import dagger.hilt.android.lifecycle.HiltViewModel
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import javax.inject.Inject

private const val PROGRESS_THROTTLE_MS = 2_000L

/** How long the "Next in series" card's auto-advance countdown runs before it opens the next
 * book on its own (cancellable the whole time - see [ComicReaderViewModel.cancelAutoAdvance]). */
private const val AUTO_ADVANCE_SECONDS = 3

/** The next book's own card data (see [pickNextInSeries]), independent of which reader it opens
 * in - that's resolved lazily, only when the user (or auto-advance) actually opens it. */
data class NextSeriesBook(
    val id: Int,
    val title: String?,
    val hasCover: Boolean,
    val seriesIndex: Double?,
)

/** A one-shot "open this book, replacing the current reader" request - see
 * [ComicReaderViewModel.openNextBook]. */
data class OpenBookRequest(val bookId: Int, val target: BookFiles.ReadingTarget)

/**
 * Pages through a comic (CBZ, CBR or CB7). A downloaded CBZ is read from the device; anything else
 * uses the pages the server renders as images. Also owns the comic reader's Configure sheet
 * state: Global/This-book scope, the effective [ComicReaderSettings] for this book, and the
 * Save as default / Reset to default / Restore built-in actions, mirroring how the ebook
 * `ReaderViewModel` drives its own settings sheet.
 */
@HiltViewModel
class ComicReaderViewModel @Inject constructor(
    private val savedStateHandle: SavedStateHandle,
    private val bookRepo: BookDetailRepository,
    private val downloads: DownloadsRepository,
    private val api: ApiService,
    private val progress: ReaderProgressRepository,
    private val sessions: ReadingSessionTracker,
    private val appSettings: AppSettingsStore,
    private val settingsStore: ComicReaderSettingsStore,
    private val preferencesRepo: ComicReaderPreferencesRepository,
    private val wallpaperFollow: CoverWallpaperFollowController,
    private val controlsStore: ReaderControlsStore,
    @ApplicationContext private val context: Context,
    @ApplicationScope private val appScope: CoroutineScope,
) : ViewModel() {

    val bookId: Int = savedStateHandle.get<Int>("id") ?: 0

    /** Peek mode: no saved-position load, no progress writes, no reading session (see
     * ReaderViewModel.tracking for the full doc). */
    private var tracking: Boolean = trackingEnabled(savedStateHandle)

    data class UiState(
        val loading: Boolean = true,
        val error: UiText? = null,
        val title: String? = null,
        val fileId: Int = 0,
        val pageCount: Int = 0,
        val source: ComicPageSource? = null,
        val initialPage: Int = 0,
        val currentPage: Int = 0,
        val globalSettings: ComicReaderSettings = ComicReaderSettings(),
        val bookState: ComicBookSettingsState = ComicBookSettingsState(),
        /** Which scope the Configure sheet is currently showing/editing - UI-only, not persisted. */
        val scope: ReaderSettingsScope = ReaderSettingsScope.GLOBAL,
        val globalSavedDefault: ComicReaderSettings? = null,
        val bookSavedDefault: ComicReaderSettings? = null,
        val showConfigureSheet: Boolean = false,
        /** One-shot message for the screen to toast, then clear via [consumeMessage]. */
        val message: UiText? = null,
        /** Pages whose loaded image aspect ratio marks them as wide (see [isWidePageAspect]),
         * discovered as each page's image finishes loading - see [markPageDimensions]. Drives
         * [ComicWidePageMode.AUTO] pairing once a page is known to be wide. */
        val widePages: Set<Int> = emptySet(),
        /** App-wide tap/gesture Controls (owner decisions 2 and 5): device-only, no Global/This-
         * book scope - shared verbatim with the ebook reader's own Controls tab. */
        val controlsSettings: ReaderControlsSettings = ReaderControlsSettings(),
        /** This book's own series position (`BookDetail.seriesIndex`), used to pick its
         * successor in [resolveNextBook]; null when the book isn't in a series or has no index. */
        val seriesIndex: Double? = null,
        /** True once the end has been reached (any of the ways [onEndReached] is called) and the
         * "Next in series" end card should be showing. */
        val nextBookCardVisible: Boolean = false,
        /** True while the series-books lookup for the end card is in flight. */
        val nextBookLoading: Boolean = false,
        /** The chosen next book, once resolved; null while loading or when there isn't one
         * (last in series, offline, or the lookup failed). */
        val nextBook: NextSeriesBook? = null,
        /** Seconds left in the auto-advance countdown, or null when it isn't running - see
         * [startAutoAdvanceCountdown]/[cancelAutoAdvance]. */
        val autoAdvanceSecondsLeft: Int? = null,
        /** One-shot: the screen opens this book (replacing the reader in the back stack) then
         * calls [consumeOpenNextBookRequest]. */
        val openNextBookRequest: OpenBookRequest? = null,
        val peek: Boolean = false,
    ) {
        /** What's actually applied to the reader: the book's own override, else Global. */
        val effective: ComicReaderSettings get() = effectiveComicSettings(globalSettings, bookState)
    }

    private val _ui = MutableStateFlow(UiState(peek = !tracking))
    val ui = _ui.asStateFlow()

    private var lastSaved = 0L
    private var pendingPage: Int? = null
    private var localArchive: LocalComicArchive? = null
    /** Cached result of `books/{id}/series-books` - fetched only once the end is actually
     * reached ([onEndReached]), never eagerly on load. */
    private var seriesBooksCache: List<BookRecommendation>? = null
    private var autoAdvanceJob: Job? = null

    init {
        load()
        loadSettings()
        loadControlsSettings()
        if (tracking) wallpaperFollow.noteOpenBook(bookId)
    }

    fun load() {
        _ui.update { it.copy(loading = true, error = null) }
        viewModelScope.launch {
            val book = runCatching { bookRepo.detail(bookId) }.getOrNull() ?: downloads.cachedBook(bookId)
            val file = book?.let(BookFiles::comicFile)
            if (book == null || file == null) {
                _ui.update { it.copy(loading = false, error = UiText.of(R.string.comic_err_load)) }
                return@launch
            }
            val local = openLocal(file.id, file.format)
            val source: ComicPageSource = local ?: ComicPageSource.Server(file.id)
            val count = local?.archive?.pageCount
                ?: runCatching { api.getComicPageCount(file.id).pageCount }.getOrNull()
            if (count == null || count <= 0) {
                _ui.update {
                    it.copy(
                        loading = false,
                        title = book.title,
                        error = UiText.of(R.string.comic_err_read),
                    )
                }
                return@launch
            }
            // Peeking opens at the start: no saved-position load, no reading session.
            val initial = if (tracking) progress.resolveInitial(file.id) else com.bookorbit.feature.reader.InitialProgress(null, null)
            val page = if (tracking) ComicPaging.resumePage(initial.pageNumber, initial.fraction, count) else 0
            if (tracking) sessions.beginReading(file.id, ComicPaging.percentage(page, count))
            _ui.update {
                it.copy(
                    loading = false,
                    title = book.title,
                    fileId = file.id,
                    pageCount = count,
                    source = source,
                    initialPage = page,
                    currentPage = page,
                    seriesIndex = book.seriesIndex,
                )
            }
        }
    }

    /** Loads Global/This-book comic settings (owner decision 3: Global migrates/syncs; This-book stays local). */
    private fun loadSettings() {
        viewModelScope.launch {
            val legacyRtl = appSettings.comicRtl.first()
            val global = preferencesRepo.loadGlobalEffective(legacyRtl)
            val bookState = settingsStore.loadBookState(bookId)
            val globalSavedDefault = settingsStore.loadGlobalSavedDefault()
            val bookSavedDefault = settingsStore.loadBookSavedDefault(bookId)
            _ui.update {
                it.copy(
                    globalSettings = global,
                    bookState = bookState,
                    globalSavedDefault = globalSavedDefault,
                    bookSavedDefault = bookSavedDefault,
                )
            }
        }
    }

    fun openConfigureSheet() = _ui.update { it.copy(showConfigureSheet = true) }
    fun dismissConfigureSheet() = _ui.update { it.copy(showConfigureSheet = false) }

    /** Loads the app-wide Controls settings (device-only, no scope - see [ReaderControlsStore]). */
    private fun loadControlsSettings() {
        viewModelScope.launch {
            val settings = controlsStore.load()
            _ui.update { it.copy(controlsSettings = settings) }
        }
    }

    /** Edited from the Controls tab; applies immediately and persists app-wide. */
    fun updateControlsSettings(settings: ReaderControlsSettings) {
        _ui.update { it.copy(controlsSettings = settings) }
        viewModelScope.launch { controlsStore.save(settings) }
    }

    fun setScope(scope: ReaderSettingsScope) = _ui.update { it.copy(scope = scope) }

    /** The "Use global settings" master switch: one per book, all-or-nothing. */
    fun setUseGlobal(useGlobal: Boolean) {
        val newState = _ui.value.bookState.withUseGlobal(useGlobal, _ui.value.globalSettings)
        _ui.update { it.copy(bookState = newState) }
        viewModelScope.launch { settingsStore.saveBookState(bookId, newState) }
    }

    /** Called from the sheet when the user edits a field for the active scope (never cross-writes). */
    fun updateSettings(scope: ReaderSettingsScope, settings: ComicReaderSettings) {
        when (scope) {
            ReaderSettingsScope.GLOBAL -> {
                _ui.update { it.copy(globalSettings = settings) }
                viewModelScope.launch { settingsStore.saveGlobal(settings) }
            }
            ReaderSettingsScope.THIS_BOOK -> {
                val newState = _ui.value.bookState.copy(useGlobal = false, override = settings)
                _ui.update { it.copy(bookState = newState) }
                viewModelScope.launch { settingsStore.saveBookState(bookId, newState) }
            }
        }
    }

    /** Quick top-bar direction toggle: edits whichever scope is currently effective for this book. */
    fun toggleDirection() {
        val s = _ui.value
        val scope = if (s.bookState.useGlobal) ReaderSettingsScope.GLOBAL else ReaderSettingsScope.THIS_BOOK
        val current = s.effective
        val flipped = current.copy(direction = if (current.direction == ComicDirection.RTL) ComicDirection.LTR else ComicDirection.RTL)
        updateSettings(scope, flipped)
    }

    /** "Save as default": saves the WHOLE current settings for [scope]; Global also pushes to the server when sync is on. */
    fun saveAsDefault(scope: ReaderSettingsScope) {
        val s = _ui.value
        when (scope) {
            ReaderSettingsScope.GLOBAL -> {
                _ui.update { it.copy(globalSavedDefault = s.globalSettings, message = UiText.of(R.string.rs_saved_default_global)) }
                viewModelScope.launch { preferencesRepo.saveGlobalDefault(s.globalSettings) }
            }
            ReaderSettingsScope.THIS_BOOK -> {
                val current = s.effective
                _ui.update { it.copy(bookSavedDefault = current, message = UiText.of(R.string.rs_saved_default_book)) }
                viewModelScope.launch { settingsStore.saveBookSavedDefault(bookId, current) }
            }
        }
    }

    /** "Reset to saved default": reverts the scope's current settings from its saved default. */
    fun resetToSavedDefault(scope: ReaderSettingsScope) {
        val s = _ui.value
        if (scope == ReaderSettingsScope.THIS_BOOK && s.bookState.useGlobal) return
        val resolved = resolvedComicSavedDefault(scope, s.globalSavedDefault, s.bookSavedDefault)
        when (scope) {
            ReaderSettingsScope.GLOBAL -> {
                _ui.update { it.copy(globalSettings = resolved, message = UiText.of(R.string.rs_reset_done_global)) }
                viewModelScope.launch { settingsStore.saveGlobal(resolved) }
            }
            ReaderSettingsScope.THIS_BOOK -> {
                val newState = s.bookState.copy(useGlobal = false, override = resolved)
                _ui.update { it.copy(bookState = newState, message = UiText.of(R.string.rs_reset_done_book)) }
                viewModelScope.launch { settingsStore.saveBookState(bookId, newState) }
            }
        }
    }

    /** "Restore built-in defaults": Global also clears the server default when sync is on. */
    fun restoreBuiltInDefaults(scope: ReaderSettingsScope) {
        if (scope == ReaderSettingsScope.THIS_BOOK && _ui.value.bookState.useGlobal) return
        when (scope) {
            ReaderSettingsScope.GLOBAL -> {
                _ui.update { it.copy(globalSettings = ComicReaderSettings(), message = UiText.of(R.string.rs_restore_done_global)) }
                viewModelScope.launch { preferencesRepo.restoreGlobalBuiltIn() }
            }
            ReaderSettingsScope.THIS_BOOK -> {
                val newState = _ui.value.bookState.copy(useGlobal = false, override = ComicReaderSettings())
                _ui.update { it.copy(bookState = newState, message = UiText.of(R.string.rs_restore_done_book)) }
                viewModelScope.launch { settingsStore.saveBookState(bookId, newState) }
            }
        }
    }

    fun consumeMessage() = _ui.update { it.copy(message = null) }

    /** Called once a page's image finishes loading, with its decoded pixel size (Coil's
     * `onSuccess`/a local bounds decode) - detects wide pages for [ComicWidePageMode.AUTO]
     * without re-decoding on every recomposition. Only updates state (and so only triggers a
     * spread recompute) the first time a page is found to be wide. */
    fun markPageDimensions(page: Int, widthPx: Int, heightPx: Int) {
        if (!isWidePageAspect(widthPx, heightPx)) return
        _ui.update { if (page in it.widePages) it else it.copy(widePages = it.widePages + page) }
    }

    /**
     * Called whenever the reader tries to move past the last page: a tap-zone Next, a swipe past
     * the end, the volume-key/hardware-arrow or bottom-bar Next, or just scrolling to the end in
     * the infinite modes. Shows the "Next in series" end card, resolving the next book (and
     * starting the auto-advance countdown, if it's on) once the lookup completes. A no-op while
     * the card is already showing.
     */
    fun onEndReached() {
        if (_ui.value.nextBookCardVisible) return
        _ui.update { it.copy(nextBookCardVisible = true, nextBookLoading = true, nextBook = null) }
        viewModelScope.launch {
            val next = resolveNextBook()
            _ui.update { it.copy(nextBookLoading = false, nextBook = next) }
            if (next != null && _ui.value.effective.autoAdvance) startAutoAdvanceCountdown()
        }
    }

    /** Fetches `books/{id}/series-books` once (cached in [seriesBooksCache] for the rest of this
     * screen's life) and picks the next one with [pickNextInSeries]. Offline or any failure shows
     * the card with no next book, never crashes. */
    private suspend fun resolveNextBook(): NextSeriesBook? {
        val books = seriesBooksCache
            ?: runCatching { api.getSeriesBooksForBook(bookId) }.getOrNull()?.also { seriesBooksCache = it }
            ?: return null
        val next = pickNextInSeries(bookId, _ui.value.seriesIndex, books) ?: return null
        return NextSeriesBook(id = next.id, title = next.title, hasCover = next.hasCover, seriesIndex = next.seriesIndex)
    }

    /** "Open"/auto-advance: resolves which reader the next book opens in (comic for comics, the
     * matching route for other formats, or its book detail page when it isn't readable at all -
     * see [BookFiles.readingTarget]) and publishes a one-shot [OpenBookRequest] for the screen. */
    fun openNextBook() {
        val next = _ui.value.nextBook ?: return
        cancelAutoAdvance()
        viewModelScope.launch {
            val detail = runCatching { bookRepo.detail(next.id) }.getOrNull()
            val target = detail?.let(BookFiles::readingTarget) ?: BookFiles.ReadingTarget.None
            _ui.update { it.copy(openNextBookRequest = OpenBookRequest(next.id, target)) }
        }
    }

    /** Consumed by the screen immediately after acting on [UiState.openNextBookRequest]. */
    fun consumeOpenNextBookRequest() = _ui.update { it.copy(openNextBookRequest = null) }

    /** Dismisses the end card ("Back to book" / the close control), cancelling any running
     * auto-advance countdown without opening anything. */
    fun dismissNextBookCard() {
        cancelAutoAdvance()
        _ui.update { it.copy(nextBookCardVisible = false, nextBookLoading = false, nextBook = null) }
    }

    /** Starts (or restarts) the ~3-second auto-advance countdown; opens [openNextBook] when it
     * reaches zero unless [cancelAutoAdvance] stops it first. */
    private fun startAutoAdvanceCountdown() {
        autoAdvanceJob?.cancel()
        _ui.update { it.copy(autoAdvanceSecondsLeft = AUTO_ADVANCE_SECONDS) }
        autoAdvanceJob = viewModelScope.launch {
            var remaining = AUTO_ADVANCE_SECONDS
            while (remaining > 0) {
                delay(1_000L)
                remaining--
                _ui.update { it.copy(autoAdvanceSecondsLeft = remaining) }
            }
            openNextBook()
        }
    }

    /** Cancels a running auto-advance countdown (the card's own Cancel control, or dismissing/
     * leaving the card entirely); harmless when none is running. */
    fun cancelAutoAdvance() {
        autoAdvanceJob?.cancel()
        autoAdvanceJob = null
        _ui.update { it.copy(autoAdvanceSecondsLeft = null) }
    }

    /** The downloaded CBZ for [fileId], if there is one and it opens with at least one page. */
    private suspend fun openLocal(fileId: Int, format: String?): ComicPageSource.Local? {
        closeLocal()
        if (!format.equals("cbz", ignoreCase = true)) return null
        val path = downloads.localFiles(bookId)[fileId] ?: return null
        val archive = withContext(Dispatchers.IO) { tryOpenLocalComic(LocalRef.parse(path), context) } ?: return null
        if (archive.pageCount <= 0) {
            withContext(Dispatchers.IO) { runCatching { archive.close() } }
            return null
        }
        localArchive = archive
        return ComicPageSource.Local(archive)
    }

    private fun closeLocal() {
        val archive = localArchive ?: return
        localArchive = null
        runCatching { archive.close() }
    }

    fun onPageChanged(page: Int) {
        val s = _ui.value
        if (s.pageCount <= 0 || page == s.currentPage) return
        _ui.update { it.copy(currentPage = page) }
        pendingPage = page
        if (tracking) sessions.onReadingProgress(ComicPaging.percentage(page, s.pageCount))
        if (tracking && System.currentTimeMillis() - lastSaved >= PROGRESS_THROTTLE_MS) flush()
    }

    fun flush() {
        if (!tracking) return
        val page = pendingPage ?: return
        val s = _ui.value
        if (s.fileId == 0 || s.pageCount <= 0) return
        pendingPage = null
        lastSaved = System.currentTimeMillis()
        viewModelScope.launch {
            progress.report(s.fileId, cfi = null, percentage = ComicPaging.percentage(page, s.pageCount), pageNumber = ComicPaging.pageNumber(page))
        }
    }

    /** "Start reading": switches this reader to tracked mode in place and immediately saves the
     * current page position (see ReaderViewModel.startReading for the full doc). */
    fun startReading() {
        if (tracking) return
        tracking = true
        savedStateHandle["peek"] = false // survive process death
        _ui.update { it.copy(peek = false) }
        wallpaperFollow.noteOpenBook(bookId)
        val s = _ui.value
        if (s.fileId == 0 || s.pageCount <= 0) return
        sessions.beginReading(s.fileId, ComicPaging.percentage(s.currentPage, s.pageCount))
        pendingPage = s.currentPage
        lastSaved = 0L
        flush()
    }

    override fun onCleared() {
        autoAdvanceJob?.cancel()
        // viewModelScope is already cancelled by the time onCleared() runs, so flush()'s
        // viewModelScope.launch would never execute - use the application-lifetime scope so the
        // last page turn before leaving isn't silently dropped.
        val page = pendingPage
        val s = _ui.value
        if (tracking && s.fileId != 0 && s.pageCount > 0 && page != null) {
            pendingPage = null
            appScope.launch {
                progress.report(s.fileId, cfi = null, percentage = ComicPaging.percentage(page, s.pageCount), pageNumber = ComicPaging.pageNumber(page))
            }
        }
        sessions.end()
        closeLocal()
        super.onCleared()
    }
}
