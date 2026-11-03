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
import com.bookorbit.feature.sessions.ReadingSessionTracker
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
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
        val globalSettings: ReaderSettings = ReaderSettings(),
        val bookState: BookSettingsState = BookSettingsState(),
        /** Which scope the settings sheet is currently showing/editing - UI-only, not persisted. */
        val scope: ReaderSettingsScope = ReaderSettingsScope.GLOBAL,
        val globalSavedDefault: ReaderSettings? = null,
        val bookSavedDefault: ReaderSettings? = null,
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
    ) {
        /** What's actually applied to the reader: the book's own snapshot, else Global. */
        val effective: ReaderSettings get() = effectiveSettings(globalSettings, bookState)
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
            val settings = settingsStore.loadGlobal()
            val bookState = settingsStore.loadBookState(bookId)
            val globalSavedDefault = settingsStore.loadGlobalSavedDefault()
            val bookSavedDefault = settingsStore.loadBookSavedDefault(bookId)
            // Coach the paginated tap-zones once (they're invisible by design). Based on what's
            // actually applied (effective), not necessarily Global.
            val effective = effectiveSettings(settings, bookState)
            val showHint = effective.flow == "paginated" && !settingsStore.hasSeenPagingHint()
            _ui.update {
                it.copy(
                    globalSettings = settings,
                    bookState = bookState,
                    globalSavedDefault = globalSavedDefault,
                    bookSavedDefault = bookSavedDefault,
                    showPagingHint = showHint,
                )
            }

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

    fun onLoaded(toc: List<TocItem>, title: String?) {
        _ui.update { it.copy(loaded = true, toc = toc, chapterTitle = it.chapterTitle ?: title) }
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

    /** Called from the sheet when the user edits a field for the active scope (never cross-writes). */
    fun updateSettings(scope: ReaderSettingsScope, settings: ReaderSettings) {
        when (scope) {
            ReaderSettingsScope.GLOBAL -> {
                _ui.update { it.copy(globalSettings = settings) }
                viewModelScope.launch { settingsStore.saveGlobal(settings) }
            }
            ReaderSettingsScope.THIS_BOOK -> {
                // Editing in book scope only ever writes to the book's own override, never
                // Global, and implies the book now has (and keeps) its own settings.
                val newState = _ui.value.bookState.copy(useGlobal = false, override = settings)
                _ui.update { it.copy(bookState = newState) }
                viewModelScope.launch { settingsStore.saveBookState(bookId, newState) }
            }
        }
    }

    fun setScope(scope: ReaderSettingsScope) = _ui.update { it.copy(scope = scope) }

    /** The "Use global settings" master switch (requirement 2): one per book, all-or-nothing. */
    fun setUseGlobal(useGlobal: Boolean) {
        val newState = _ui.value.bookState.withUseGlobal(useGlobal, _ui.value.globalSettings)
        _ui.update { it.copy(bookState = newState) }
        viewModelScope.launch { settingsStore.saveBookState(bookId, newState) }
    }

    /** "Save as default" (requirement 4): saves the WHOLE current settings for [scope]. */
    fun saveAsDefault(scope: ReaderSettingsScope) {
        val s = _ui.value
        when (scope) {
            ReaderSettingsScope.GLOBAL -> {
                _ui.update { it.copy(globalSavedDefault = s.globalSettings, message = UiText.of(R.string.rs_saved_default_global)) }
                viewModelScope.launch { settingsStore.saveGlobalSavedDefault(s.globalSettings) }
            }
            ReaderSettingsScope.THIS_BOOK -> {
                val current = s.effective
                _ui.update { it.copy(bookSavedDefault = current, message = UiText.of(R.string.rs_saved_default_book)) }
                viewModelScope.launch { settingsStore.saveBookSavedDefault(bookId, current) }
            }
        }
    }

    /**
     * "Reset to saved default" (requirement 4): reverts the scope's current settings from its
     * saved default, falling back from book -> Global saved default -> built-in (see
     * [resolvedSavedDefault]). Caller must have already shown/confirmed the dialog - nothing
     * mutates until this is called.
     */
    fun resetToSavedDefault(scope: ReaderSettingsScope) {
        val s = _ui.value
        if (scope == ReaderSettingsScope.THIS_BOOK && s.bookState.useGlobal) return
        val resolved = resolvedSavedDefault(scope, s.globalSavedDefault, s.bookSavedDefault)
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

    /**
     * "Restore built-in defaults" (requirement 4): resets the scope's current settings to the
     * built-in defaults. Deliberately does NOT touch the saved default for that scope - only
     * "Reset to saved default"/"Save as default" write that tier. Caller must have already shown
     * the (separate) confirmation dialog.
     */
    fun restoreBuiltInDefaults(scope: ReaderSettingsScope) {
        if (scope == ReaderSettingsScope.THIS_BOOK && _ui.value.bookState.useGlobal) return
        when (scope) {
            ReaderSettingsScope.GLOBAL -> {
                _ui.update { it.copy(globalSettings = ReaderSettings(), message = UiText.of(R.string.rs_restore_done_global)) }
                viewModelScope.launch { settingsStore.restoreGlobalBuiltIn() }
            }
            ReaderSettingsScope.THIS_BOOK -> {
                val newState = _ui.value.bookState.copy(useGlobal = false, override = ReaderSettings())
                _ui.update { it.copy(bookState = newState, message = UiText.of(R.string.rs_restore_done_book)) }
                viewModelScope.launch { settingsStore.saveBookState(bookId, newState) }
            }
        }
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
        super.onCleared()
    }
}
