package com.bookorbit.feature.library

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import androidx.paging.Pager
import androidx.paging.PagingConfig
import androidx.paging.PagingData
import androidx.paging.cachedIn
import com.bookorbit.core.model.BookCard
import com.bookorbit.core.model.Library
import com.bookorbit.core.paging.BookPagingSource
import com.bookorbit.core.paging.DEFAULT_PAGE_SIZE
import com.bookorbit.feature.browse.BrowseRepository
import com.bookorbit.feature.library.filters.CatalogKind
import com.bookorbit.feature.library.filters.LibraryFilters
import com.bookorbit.feature.library.filters.LibrarySort
import com.bookorbit.feature.library.filters.StoredFilterPrefs
import com.bookorbit.feature.library.filters.FilterPrefsStore
import com.bookorbit.feature.library.filters.buildBookQuery
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.FlowPreview
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.debounce
import kotlinx.coroutines.flow.distinctUntilChanged
import kotlinx.coroutines.flow.emptyFlow
import kotlinx.coroutines.flow.flatMapLatest
import kotlinx.coroutines.launch
import javax.inject.Inject

private const val SEARCH_DEBOUNCE_MS = 300L

@HiltViewModel
class LibrariesViewModel @Inject constructor(
    private val repo: BrowseRepository,
    private val prefsStore: FilterPrefsStore,
) : ViewModel() {

    private val _libraries = MutableStateFlow<List<Library>>(emptyList())
    val libraries = _libraries.asStateFlow()

    /** Where loading the library list stands, so the screen can show an error instead of spinning forever. */
    enum class Status { LOADING, READY, EMPTY, ERROR }

    private val _status = MutableStateFlow(Status.LOADING)
    val status = _status.asStateFlow()

    private val _selectedId = MutableStateFlow<Int?>(null)
    val selectedId = _selectedId.asStateFlow()

    private val _filters = MutableStateFlow(LibraryFilters())
    val filters = _filters.asStateFlow()

    private val _sort = MutableStateFlow(LibrarySort())
    val sort = _sort.asStateFlow()

    /** Raw text as the user types it, echoed straight back to the field. */
    private val _query = MutableStateFlow("")
    val query = _query.asStateFlow()

    @OptIn(ExperimentalCoroutinesApi::class, FlowPreview::class)
    val books: Flow<PagingData<BookCard>> =
        combine(
            _selectedId,
            _filters,
            _sort,
            _query.debounce(SEARCH_DEBOUNCE_MS).distinctUntilChanged(),
        ) { id, filters, sort, q -> QueryState(id, filters, sort, q) }
            .flatMapLatest { state ->
                if (state.libraryId == null) emptyFlow() else pagerFor(state.libraryId, state.filters, state.sort, state.query)
            }
            .cachedIn(viewModelScope)

    private data class QueryState(val libraryId: Int?, val filters: LibraryFilters, val sort: LibrarySort, val query: String)

    init {
        loadLibraries()
    }

    fun loadLibraries() {
        _status.value = Status.LOADING
        viewModelScope.launch {
            val result = runCatching { repo.libraries() }
            val libs = result.getOrDefault(emptyList())
            _libraries.value = libs
            _status.value = when {
                result.isFailure -> Status.ERROR
                libs.isEmpty() -> Status.EMPTY
                else -> Status.READY
            }
            if (_selectedId.value == null) {
                libs.firstOrNull()?.id?.let { selectLibrary(it) }
            }
        }
    }

    fun selectLibrary(id: Int) {
        _selectedId.value = id
        viewModelScope.launch {
            val prefs = prefsStore.load(id)
            _filters.value = prefs.filters
            _sort.value = prefs.sort
        }
    }

    fun applyFilters(filters: LibraryFilters, sort: LibrarySort) {
        _filters.value = filters
        _sort.value = sort
        _selectedId.value?.let { id ->
            viewModelScope.launch { prefsStore.save(id, StoredFilterPrefs(filters, sort)) }
        }
    }

    /** From the quick sort control next to the search field; keeps the same persisted prefs as the sheet. */
    fun updateSort(sort: LibrarySort) {
        _sort.value = sort
        _selectedId.value?.let { id ->
            viewModelScope.launch { prefsStore.save(id, StoredFilterPrefs(_filters.value, sort)) }
        }
    }

    fun onQueryChange(value: String) {
        _query.value = value
    }

    suspend fun searchCatalog(kind: CatalogKind, query: String): List<String> =
        repo.searchCatalog(kind.path, query)

    private fun pagerFor(libraryId: Int, filters: LibraryFilters, sort: LibrarySort, query: String): Flow<PagingData<BookCard>> =
        Pager(
            config = PagingConfig(DEFAULT_PAGE_SIZE, initialLoadSize = DEFAULT_PAGE_SIZE, enablePlaceholders = false),
        ) {
            BookPagingSource(DEFAULT_PAGE_SIZE) { page, size ->
                val bookQuery = buildBookQuery(filters, sort, page, size, q = query)
                val result = repo.libraryBooks(libraryId, bookQuery)
                Triple(result.items, result.total, result.size)
            }
        }.flow
}
