package com.bookorbit.feature.reader

import com.bookorbit.R
import com.bookorbit.ui.UiText
import androidx.lifecycle.SavedStateHandle
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.bookorbit.core.model.BookAnnotation
import com.bookorbit.core.model.BookBookmark
import com.bookorbit.core.storage.LocalRef
import com.bookorbit.feature.bookdetail.BookDetailRepository
import com.bookorbit.feature.downloads.DownloadsRepository
import com.bookorbit.feature.player.PlayerManager
import com.bookorbit.feature.reader.narration.NarrationAudioSource
import com.bookorbit.feature.reader.narration.NarrationItem
import com.bookorbit.feature.reader.narration.NarrationLocator
import com.bookorbit.feature.reader.narration.NarrationMediaItems
import com.bookorbit.feature.reader.narration.NarrationTimeline
import com.bookorbit.feature.sessions.ReadingSessionTracker
import dagger.hilt.android.lifecycle.HiltViewModel
import androidx.annotation.OptIn
import androidx.media3.common.util.UnstableApi
import kotlinx.coroutines.Job
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asSharedFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import javax.inject.Inject
import kotlin.math.roundToInt

private const val PROGRESS_THROTTLE_MS = 2_000L

@HiltViewModel
class ReaderViewModel @Inject constructor(
    savedStateHandle: SavedStateHandle,
    private val bookRepo: BookDetailRepository,
    private val downloads: DownloadsRepository,
    private val source: ReaderSource,
    private val progress: ReaderProgressRepository,
    private val settingsStore: ReaderSettingsStore,
    private val sessions: ReadingSessionTracker,
    private val annotationRepo: ReaderAnnotationRepository,
    private val bookmarkRepo: ReaderBookmarkRepository,
    private val playerManager: PlayerManager,
    private val narrationSource: NarrationAudioSource,
) : ViewModel() {

    val bookId: Int = savedStateHandle.get<Int>("id") ?: 0

    data class ResolvedOpen(
        val ref: LocalRef,
        val format: String,
        val fileId: Int,
        val initial: InitialProgress,
    )

    /** Text the user has selected in the page, not yet saved as a highlight. */
    data class PendingSelection(val text: String, val cfi: String)

    /** What the floating highlight toolbar is acting on: a new selection, or an existing highlight. */
    data class ToolbarTarget(
        val rect: ViewportRect?,
        val selection: PendingSelection? = null,
        val annotationId: Int? = null,
    )

    data class UiState(
        val loadingFile: Boolean = true,
        val error: UiText? = null,
        val title: String? = null,
        val resolved: ResolvedOpen? = null,
        val settings: ReaderSettings = ReaderSettings(),
        val toc: List<TocItem> = emptyList(),
        val chapterTitle: String? = null,
        val percentage: Int = 0,
        val loaded: Boolean = false,
        val showPagingHint: Boolean = false,
        val annotations: List<BookAnnotation> = emptyList(),
        val bookmarks: List<BookBookmark> = emptyList(),
        val search: SearchState? = null,
        val toolbar: ToolbarTarget? = null,
        /** One-shot message for the screen to toast, then clear via [consumeMessage]. */
        val message: UiText? = null,
        /** True when this EPUB has EPUB 3 Media Overlays — gates the "Listen" toggle. */
        val hasMediaOverlay: Boolean = false,
        /** True once narration has been turned on and a queue is loaded in [PlayerManager]. */
        val narrationOn: Boolean = false,
        val narrationLoading: Boolean = false,
        /** The text href foliate should currently highlight, or null to clear it. */
        val narrationHighlightTextHref: String? = null,
    )

    /** One-shot instructions for the screen to run on [ReaderController] — narration's SMIL parsing
     * and highlight drawing both happen in the WebView, so this VM only tells it what to do. */
    sealed interface ReaderCommand {
        /** [generation] is echoed back by the WebView on the matching `narrationTimeline(Error)`
         * event, so a stale reply from an abandoned prepare (see [NarrationCancelPrepare]) can be
         * told apart from the current one. */
        data class NarrationPrepare(val generation: Int) : ReaderCommand
        /** Tells the WebView to abandon any `buildNarrationTimeline` still in flight; its eventual
         * result (if any) is ignored both there (its own generation token) and here. */
        data object NarrationCancelPrepare : ReaderCommand
        data class NarrationHighlight(val textHref: String) : ReaderCommand
        data object NarrationUnhighlight : ReaderCommand
    }

    /** In-book search: the query, matches grouped by chapter as they stream in, and progress. */
    data class SearchState(
        val query: String = "",
        val running: Boolean = false,
        val progress: Double = 0.0,
        val groups: List<SearchGroup> = emptyList(),
        val total: Int = 0,
        val capped: Boolean = false,
        val done: Boolean = false,
    )

    data class SearchGroup(val label: String, val hits: List<SearchHit>)

    private val _ui = MutableStateFlow(UiState())
    val ui = _ui.asStateFlow()

    private val _commands = MutableSharedFlow<ReaderCommand>(extraBufferCapacity = 8)
    val commands = _commands.asSharedFlow()

    private var narrationTimeline: NarrationTimeline? = null
    private var narrationSorted: List<NarrationItem> = emptyList()
    private var narrationWatchJob: Job? = null
    /** The extract-and-load work kicked off by [onNarrationReady]; cancelled by [stopNarration] so
     * a toggle-off during a slow extraction can't still load narration after the user left. */
    private var narrationLoadJob: Job? = null
    /** Bumped on every prepare request and on [stopNarration]; a `narrationTimeline`/`Error` event
     * whose echoed generation doesn't match the current one is a stale reply and is ignored. */
    private var narrationGeneration = 0

    private var lastSaved = 0L
    private var pending: Pair<String?, Double>? = null

    /** Where the reader is now, so a bookmark can be dropped there. */
    private var currentCfi: String? = null

    init {
        load()
        loadAnnotations()
    }

    private fun load() {
        viewModelScope.launch {
            val settings = settingsStore.load()
            // Coach the paginated tap-zones once (they're invisible by design).
            val showHint = settings.flow == "paginated" && !settingsStore.hasSeenPagingHint()
            _ui.update { it.copy(settings = settings, showPagingHint = showHint) }

            // Fall back to the offline-downloaded copy when the network is unavailable.
            val book = runCatching { bookRepo.detail(bookId) }.getOrNull() ?: downloads.cachedBook(bookId)
            if (book == null) {
                _ui.update { it.copy(loadingFile = false, error = UiText.of(R.string.reader_err_load_book)) }
                return@launch
            }
            _ui.update { it.copy(title = book.title) }

            try {
                val resolved = source.resolve(book)
                val initial = progress.resolveInitial(resolved.fileId)
                sessions.beginReading(resolved.fileId, initial.fraction?.let { it * 100 })
                _ui.update {
                    it.copy(
                        loadingFile = false,
                        resolved = ResolvedOpen(resolved.ref, resolved.format, resolved.fileId, initial),
                    )
                }
            } catch (e: Exception) {
                _ui.update { it.copy(loadingFile = false, error = e.message?.let { m -> UiText.raw(m) } ?: UiText.of(R.string.reader_err_open_book)) }
            }
        }
    }

    fun onLoaded(toc: List<TocItem>, title: String?, hasMediaOverlay: Boolean = false) {
        _ui.update { it.copy(loaded = true, toc = toc, chapterTitle = it.chapterTitle ?: title, hasMediaOverlay = hasMediaOverlay) }
    }

    // --- narration (EPUB 3 Media Overlays) ---

    /** Turns narration on (prepares the timeline, then starts the native player) or off. */
    fun toggleNarration() {
        if (_ui.value.narrationOn || _ui.value.narrationLoading) {
            stopNarration()
        } else {
            val generation = ++narrationGeneration
            _ui.update { it.copy(narrationLoading = true) }
            viewModelScope.launch { _commands.emit(ReaderCommand.NarrationPrepare(generation)) }
        }
    }

    /** Stops narration (including a prepare/extract/load still in flight) and tells the WebView to
     * abandon any `buildNarrationTimeline` it may still be running. Also called from [onCleared] -
     * leaving the reader stops narration, but merely backgrounding it (screen off, app switch while
     * still in the reader) must not. */
    fun stopNarration() {
        narrationGeneration++
        narrationWatchJob?.cancel()
        narrationWatchJob = null
        narrationLoadJob?.cancel()
        narrationLoadJob = null
        narrationTimeline = null
        narrationSorted = emptyList()
        playerManager.stopNarration()
        narrationSource.release()
        _ui.update { it.copy(narrationOn = false, narrationLoading = false, narrationHighlightTextHref = null) }
        viewModelScope.launch {
            _commands.emit(ReaderCommand.NarrationCancelPrepare)
            _commands.emit(ReaderCommand.NarrationUnhighlight)
        }
    }

    /** The WebView finished parsing SMIL for every section; extract its audio and start playing.
     * [generation] must match the request currently in flight, or this is a stale reply (an
     * abandoned prepare, or one superseded by a later toggle) and is ignored. */
    @OptIn(UnstableApi::class)
    fun onNarrationReady(timeline: NarrationTimeline, generation: Int) {
        if (generation != narrationGeneration) return
        val resolved = _ui.value.resolved
        if (resolved == null) {
            onNarrationFailed(null, generation)
            return
        }
        narrationTimeline = timeline
        narrationLoadJob = viewModelScope.launch {
            try {
                val resolution = narrationSource.resolve(resolved.ref, bookId, timeline.audioSrcs)
                if (generation != narrationGeneration) return@launch
                // Items pointing at audio that wasn't found in the EPUB are dropped rather than
                // failing narration outright; their audioIndex is remapped onto the compacted
                // (playable-only) entry list resolve() returned.
                val remap = resolution.playableAudioIndices.withIndex().associate { (newIndex, oldIndex) -> oldIndex to newIndex }
                val playableItems = timeline.items.mapNotNull { item ->
                    remap[item.audioIndex]?.let { item.copy(audioIndex = it) }
                }
                if (playableItems.isEmpty()) {
                    onNarrationFailed(null, generation)
                    return@launch
                }
                narrationSorted = NarrationLocator.sortForLookup(playableItems)
                val mediaItems = NarrationMediaItems.build(_ui.value.title, resolution.epubPath, resolution.entryNames)
                val startItem = timeline.startTextHref
                    ?.let { href -> playableItems.firstOrNull { it.textHref == href } }
                    ?: playableItems.firstOrNull()
                val startIndex = startItem?.audioIndex ?: 0
                val startPositionMs = ((startItem?.beginSec ?: 0.0) * 1000).toLong()
                playerManager.loadNarrationQueue(mediaItems, startIndex, startPositionMs, autoPlay = true)
                if (generation != narrationGeneration) return@launch
                _ui.update { it.copy(narrationOn = true, narrationLoading = false) }
                watchNarrationPosition()
            } catch (e: Exception) {
                onNarrationFailed(e.message, generation)
            }
        }
    }

    fun onNarrationFailed(message: String?, generation: Int) {
        if (generation != narrationGeneration) return
        narrationTimeline = null
        narrationSorted = emptyList()
        _ui.update {
            it.copy(
                narrationLoading = false,
                narrationOn = false,
                message = message?.let(UiText::raw) ?: UiText.of(R.string.narration_err_unavailable),
            )
        }
    }

    /** Follows [PlayerManager]'s narration position, pushing the matching highlight to the WebView
     * and clearing local state if narration is stopped elsewhere (e.g. the notification's stop
     * action, or another queue replacing it). */
    private fun watchNarrationPosition() {
        narrationWatchJob?.cancel()
        narrationWatchJob = viewModelScope.launch {
            playerManager.state.collect { s ->
                if (!s.narrationActive) {
                    if (_ui.value.narrationOn) {
                        _ui.update { it.copy(narrationOn = false, narrationHighlightTextHref = null) }
                        _commands.emit(ReaderCommand.NarrationUnhighlight)
                    }
                    return@collect
                }
                val position = NarrationLocator.Position(s.narrationMediaIndex, s.narrationPositionMs / 1000.0)
                val href = NarrationLocator.locate(narrationSorted, position)?.textHref
                if (href != _ui.value.narrationHighlightTextHref) {
                    _ui.update { it.copy(narrationHighlightTextHref = href) }
                    _commands.emit(if (href != null) ReaderCommand.NarrationHighlight(href) else ReaderCommand.NarrationUnhighlight)
                }
            }
        }
    }

    /** Keep the last reading position and reset page state before a fresh WebView is created. */
    fun onRendererGone() {
        _ui.update { state ->
            state.copy(
                loaded = false,
                toolbar = null,
                search = null,
                resolved = state.resolved?.let { resolved ->
                    resolved.copy(initial = InitialProgress(
                        currentCfi ?: resolved.initial.cfi,
                        if (state.loaded) state.percentage / 100.0 else resolved.initial.fraction,
                    ))
                },
            )
        }
    }

    fun onRelocate(cfi: String?, fraction: Double?, chapterTitle: String?) {
        _ui.update {
            it.copy(
                chapterTitle = chapterTitle ?: it.chapterTitle,
                percentage = fraction?.let { f -> (f * 100).roundToInt() } ?: it.percentage,
            )
        }
        if (cfi != null) currentCfi = cfi
        if (cfi != null && fraction != null) {
            report(cfi, fraction * 100)
            sessions.onReadingProgress(fraction * 100)
        }
    }

    // --- in-book search ---

    fun startSearch(query: String) {
        val q = query.trim()
        _ui.update {
            it.copy(search = if (q.isEmpty()) null else SearchState(query = q, running = true))
        }
    }

    fun clearSearch() = _ui.update { it.copy(search = null) }

    fun onSearchResults(label: String, hits: List<SearchHit>) = _ui.update { s ->
        val cur = s.search ?: return@update s
        cur.copy(groups = cur.groups + SearchGroup(label, hits), total = cur.total + hits.size).let { s.copy(search = it) }
    }

    fun onSearchProgress(progress: Double) = _ui.update { s ->
        s.search?.let { s.copy(search = it.copy(progress = progress)) } ?: s
    }

    fun onSearchDone(total: Int, capped: Boolean) = _ui.update { s ->
        s.search?.let { s.copy(search = it.copy(running = false, done = true, total = total, capped = capped, progress = 1.0)) } ?: s
    }

    // --- bookmarks ---

    fun loadBookmarks() {
        viewModelScope.launch {
            runCatching { bookmarkRepo.list(bookId) }.onSuccess { list -> _ui.update { it.copy(bookmarks = list) } }
        }
    }

    /** Bookmark the current page, named after the chapter and how far through the book it is. */
    fun addBookmark() {
        val cfi = currentCfi ?: return
        val s = _ui.value
        val title = BookmarkNames.default(s.chapterTitle, s.percentage)
        viewModelScope.launch {
            runCatching { bookmarkRepo.add(bookId, cfi, title) }
                .onSuccess { created -> _ui.update { it.copy(bookmarks = it.bookmarks + created) } }
                .onFailure { _ui.update { it.copy(message = UiText.of(R.string.reader_err_bookmark_save)) } }
        }
    }

    fun deleteBookmark(id: Int) {
        viewModelScope.launch {
            runCatching { bookmarkRepo.delete(bookId, id) }
                .onSuccess { _ui.update { s -> s.copy(bookmarks = s.bookmarks.filterNot { it.id == id }) } }
                .onFailure { _ui.update { it.copy(message = UiText.of(R.string.reader_err_bookmark_delete)) } }
        }
    }

    // --- highlights & notes ---

    private fun loadAnnotations() {
        viewModelScope.launch {
            // Show what we already have straight away (cached server copy + queued changes), then
            // push anything queued and refresh from the server.
            _ui.update { it.copy(annotations = annotationRepo.local(bookId)) }
            syncAnnotations()
        }
    }

    /** Replay queued changes, then reload so placeholder ids are swapped for the server's. */
    private fun syncAnnotations() {
        viewModelScope.launch {
            annotationRepo.flushPending()
            _ui.update { it.copy(annotations = annotationRepo.load(bookId)) }
        }
    }

    private suspend fun refreshLocalAnnotations() {
        _ui.update { it.copy(annotations = annotationRepo.local(bookId), toolbar = null) }
    }

    fun onSelection(text: String, cfi: String?, rect: ViewportRect?) {
        if (cfi == null) return
        _ui.update { it.copy(toolbar = ToolbarTarget(rect, selection = PendingSelection(text, cfi))) }
    }

    fun onSelectionCleared() {
        // A selection going away dismisses the new-highlight toolbar, but not one opened on an existing highlight.
        _ui.update { s -> if (s.toolbar?.annotationId == null) s.copy(toolbar = null) else s }
    }

    fun onAnnotationTap(cfi: String, rect: ViewportRect?) {
        val ann = _ui.value.annotations.firstOrNull { it.cfi == cfi } ?: return
        _ui.update { it.copy(toolbar = ToolbarTarget(rect, annotationId = ann.id)) }
    }

    fun dismissToolbar() = _ui.update { it.copy(toolbar = null) }

    fun consumeMessage() = _ui.update { it.copy(message = null) }

    /** Highlight the selection in [color], or recolour the highlight the toolbar is open on. */
    fun highlight(color: String) = saveAnnotation(color = color, note = null)

    /** Save a note: on the open highlight, or on the selection as a new (yellow) highlight. */
    fun saveNote(note: String) = saveAnnotation(color = null, note = note)

    private fun saveAnnotation(color: String?, note: String?) {
        val target = _ui.value.toolbar ?: return
        val fileId = _ui.value.resolved?.fileId
        viewModelScope.launch {
            runCatching {
                when {
                    target.annotationId != null -> {
                        if (color != null) annotationRepo.setColor(bookId, target.annotationId, color)
                        if (note != null) annotationRepo.setNote(bookId, target.annotationId, note)
                    }
                    target.selection != null && fileId != null -> annotationRepo.create(
                        bookId = bookId,
                        fileId = fileId,
                        cfi = target.selection.cfi,
                        text = target.selection.text,
                        color = color ?: ReaderAnnotationRepository.COLORS.first().second,
                        note = note,
                        chapterTitle = _ui.value.chapterTitle,
                    )
                }
            }.onSuccess {
                refreshLocalAnnotations()
                syncAnnotations()
            }.onFailure {
                _ui.update { s -> s.copy(message = UiText.of(R.string.reader_err_highlight_save)) }
            }
        }
    }

    fun deleteAnnotation(id: Int) {
        viewModelScope.launch {
            runCatching { annotationRepo.delete(bookId, id) }
                .onSuccess {
                    refreshLocalAnnotations()
                    syncAnnotations()
                }
                .onFailure { _ui.update { s -> s.copy(message = UiText.of(R.string.reader_err_highlight_delete)) } }
        }
    }

    fun onError(message: String) {
        _ui.update { it.copy(error = UiText.raw(message)) }
    }

    fun updateSettings(settings: ReaderSettings) {
        _ui.update { it.copy(settings = settings) }
        viewModelScope.launch { settingsStore.save(settings) }
    }

    fun dismissPagingHint() {
        _ui.update { it.copy(showPagingHint = false) }
        viewModelScope.launch { settingsStore.markPagingHintSeen() }
    }

    private fun report(cfi: String?, percentage: Double) {
        pending = cfi to percentage
        if (System.currentTimeMillis() - lastSaved >= PROGRESS_THROTTLE_MS) flush()
    }

    fun flush() {
        val fileId = _ui.value.resolved?.fileId ?: return
        val p = pending ?: return
        pending = null
        lastSaved = System.currentTimeMillis()
        viewModelScope.launch { progress.report(fileId, p.first, p.second) }
    }

    override fun onCleared() {
        flush()
        sessions.end()
        stopNarration()
        super.onCleared()
    }
}
