package com.bookorbit.feature.dashboard

import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.bookorbit.core.model.BookCard
import com.bookorbit.core.model.ReadingGoalWidget
import com.bookorbit.core.model.ReadingStreakWidget
import com.bookorbit.core.model.ShelfConfigEntry
import com.bookorbit.feature.browse.BrowseRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.async
import kotlinx.coroutines.awaitAll
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

/** One configured shelf with the books it resolved to (possibly empty - the caller hides it). */
data class ShelfUi(val entry: ShelfConfigEntry, val books: List<BookCard>)

@HiltViewModel
class DashboardViewModel @Inject constructor(
    private val repo: BrowseRepository,
    private val shelfConfigRepo: DashboardShelfConfigRepository,
) : ViewModel() {

    data class UiState(
        /** The user's enabled shelves, in their configured order, each with its fetched books -
         * including shelf types this app doesn't recognise (see [DashboardShelfConfigRepository]).
         * A shelf with no books hides itself at render time, same as before this config existed. */
        val shelves: List<ShelfUi> = emptyList(),
        val loading: Boolean = true,
        /** True when every enabled shelf failed to load - distinct from a genuinely empty library. */
        val error: Boolean = false,
        /** Null when the server predates the widget endpoints (or the call failed): the strip is simply hidden. */
        val streak: ReadingStreakWidget? = null,
        val goal: ReadingGoalWidget? = null,
    )

    private val _ui = MutableStateFlow(UiState())
    val ui = _ui.asStateFlow()

    init {
        refresh()
        viewModelScope.launch { shelfConfigRepo.saved.collect { refresh() } }
    }

    fun refresh() {
        _ui.value = _ui.value.copy(loading = true)
        viewModelScope.launch {
            val enabledShelves = shelfConfigRepo.shelves().filter { it.enabled }
            var failures = 0

            suspend fun load(entry: ShelfConfigEntry): ShelfUi {
                val books = runCatching { repo.scroller(entry.type, entry.limit, entry.smartScopeId) }
                    .onFailure {
                        failures++
                        Log.w("Dashboard", "scroller ${entry.type} failed", it)
                    }
                    .getOrDefault(emptyList())
                return ShelfUi(entry, books)
            }

            val streak = async { runCatching { repo.readingStreak() }.getOrNull() }
            val goal = async { runCatching { repo.readingGoal() }.getOrNull() }
            val shelves = enabledShelves.map { entry -> async { load(entry) } }.awaitAll()

            _ui.value = UiState(
                shelves = shelves,
                loading = false,
                error = enabledShelves.isNotEmpty() && failures == enabledShelves.size,
                streak = streak.await(),
                goal = goal.await(),
            )
        }
    }
}

/** First non-empty shelf of [type] in display order, or an empty list if none/disabled. */
fun List<ShelfUi>.booksFor(type: String): List<BookCard> = firstOrNull { it.entry.type == type }?.books.orEmpty()
