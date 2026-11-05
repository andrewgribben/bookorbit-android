package com.bookorbit.feature.series

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import androidx.paging.Pager
import androidx.paging.PagingConfig
import androidx.paging.PagingData
import androidx.paging.cachedIn
import com.bookorbit.core.model.BookCard
import com.bookorbit.core.model.SeriesSummary
import com.bookorbit.core.paging.BookPagingSource
import com.bookorbit.core.paging.SeriesPagingSource
import com.bookorbit.core.settings.AppSettingsStore
import com.bookorbit.core.settings.SeriesViewMode
import com.bookorbit.feature.browse.BrowseRepository
import com.bookorbit.feature.library.filters.FilterPrefsStore
import com.bookorbit.feature.library.filters.LibrarySort
import com.bookorbit.feature.library.filters.sortForQueryChange
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.FlowPreview
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.debounce
import kotlinx.coroutines.flow.distinctUntilChanged
import kotlinx.coroutines.flow.flatMapLatest
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import javax.inject.Inject

private const val LIST_PAGE_SIZE = 100
private const val SEARCH_DEBOUNCE_MS = 300L
const val SERIES_DEFAULT_SORT_FIELD = "name"

@HiltViewModel
class SeriesViewModel @Inject constructor(
    private val repo: BrowseRepository,
    private val appSettings: AppSettingsStore,
    private val prefsStore: FilterPrefsStore,
) : ViewModel() {

    val viewMode: StateFlow<SeriesViewMode> = appSettings.seriesViewMode
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), SeriesViewMode.LIST)

    fun setViewMode(mode: SeriesViewMode) {
        viewModelScope.launch { appSettings.setSeriesViewMode(mode) }
    }

    private val _sort = MutableStateFlow(LibrarySort(SERIES_DEFAULT_SORT_FIELD, "asc"))
    val sort = _sort.asStateFlow()

    private val _query = MutableStateFlow("")
    val query = _query.asStateFlow()

    init {
        viewModelScope.launch {
            _sort.value = prefsStore.loadSeriesSort(LibrarySort(SERIES_DEFAULT_SORT_FIELD, "asc"))
        }
    }

    fun onQueryChange(value: String) {
        _query.value = value
        _sort.value = sortForQueryChange(_sort.value, value, SERIES_DEFAULT_SORT_FIELD)
    }

    fun updateSort(sort: LibrarySort) {
        _sort.value = sort
        viewModelScope.launch { prefsStore.saveSeriesSort(sort) }
    }

    @OptIn(ExperimentalCoroutinesApi::class, FlowPreview::class)
    val series: Flow<PagingData<SeriesSummary>> =
        combine(_sort, _query.debounce(SEARCH_DEBOUNCE_MS).distinctUntilChanged()) { sort, q -> sort to q }
            .flatMapLatest { (sort, q) ->
                Pager(
                    config = PagingConfig(LIST_PAGE_SIZE, initialLoadSize = LIST_PAGE_SIZE, enablePlaceholders = false),
                ) {
                    SeriesPagingSource(LIST_PAGE_SIZE) { page, size ->
                        val p = repo.series(page, size, sort.field, sort.dir, q)
                        Triple(p.items, p.total, p.size)
                    }
                }.flow
            }
            .cachedIn(viewModelScope)

    fun seriesBooks(seriesId: Int): Flow<PagingData<BookCard>> = Pager(
        config = PagingConfig(LIST_PAGE_SIZE, initialLoadSize = LIST_PAGE_SIZE, enablePlaceholders = false),
    ) {
        BookPagingSource(LIST_PAGE_SIZE) { page, size ->
            val p = repo.seriesBooks(seriesId, page, size)
            Triple(p.items, p.total, p.size)
        }
    }.flow
}
