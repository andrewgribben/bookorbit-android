package com.bookorbit.feature.authors

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import androidx.paging.Pager
import androidx.paging.PagingConfig
import androidx.paging.PagingData
import androidx.paging.cachedIn
import com.bookorbit.core.model.AuthorSummary
import com.bookorbit.core.model.BookCard
import com.bookorbit.core.paging.AuthorsPagingSource
import com.bookorbit.core.paging.BookPagingSource
import com.bookorbit.feature.browse.BrowseRepository
import com.bookorbit.feature.library.filters.FilterPrefsStore
import com.bookorbit.feature.library.filters.LibrarySort
import com.bookorbit.feature.library.filters.sortForQueryChange
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.FlowPreview
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.debounce
import kotlinx.coroutines.flow.distinctUntilChanged
import kotlinx.coroutines.flow.flatMapLatest
import kotlinx.coroutines.launch
import javax.inject.Inject

private const val LIST_PAGE_SIZE = 100
private const val SEARCH_DEBOUNCE_MS = 300L
const val AUTHORS_DEFAULT_SORT_FIELD = "name"

@HiltViewModel
class AuthorsViewModel @Inject constructor(
    private val repo: BrowseRepository,
    private val prefsStore: FilterPrefsStore,
) : ViewModel() {

    private val _sort = MutableStateFlow(LibrarySort(AUTHORS_DEFAULT_SORT_FIELD, "asc"))
    val sort = _sort.asStateFlow()

    private val _query = MutableStateFlow("")
    val query = _query.asStateFlow()

    init {
        viewModelScope.launch {
            _sort.value = prefsStore.loadAuthorsSort(LibrarySort(AUTHORS_DEFAULT_SORT_FIELD, "asc"))
        }
    }

    fun onQueryChange(value: String) {
        _query.value = value
        _sort.value = sortForQueryChange(_sort.value, value, AUTHORS_DEFAULT_SORT_FIELD)
    }

    fun updateSort(sort: LibrarySort) {
        _sort.value = sort
        viewModelScope.launch { prefsStore.saveAuthorsSort(sort) }
    }

    @OptIn(ExperimentalCoroutinesApi::class, FlowPreview::class)
    val authors: Flow<PagingData<AuthorSummary>> =
        combine(_sort, _query.debounce(SEARCH_DEBOUNCE_MS).distinctUntilChanged()) { sort, q -> sort to q }
            .flatMapLatest { (sort, q) ->
                Pager(
                    config = PagingConfig(LIST_PAGE_SIZE, initialLoadSize = LIST_PAGE_SIZE, enablePlaceholders = false),
                ) {
                    AuthorsPagingSource(LIST_PAGE_SIZE) { page, size ->
                        val p = repo.authors(page, size, sort.field, sort.dir, q)
                        Triple(p.items, p.total, p.size)
                    }
                }.flow
            }
            .cachedIn(viewModelScope)

    fun authorBooks(authorId: Int): Flow<PagingData<BookCard>> = Pager(
        config = PagingConfig(LIST_PAGE_SIZE, initialLoadSize = LIST_PAGE_SIZE, enablePlaceholders = false),
    ) {
        BookPagingSource(LIST_PAGE_SIZE) { page, size ->
            val p = repo.authorBooks(authorId, page, size)
            Triple(p.items, p.total, p.size)
        }
    }.flow
}
