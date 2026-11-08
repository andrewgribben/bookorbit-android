package com.bookorbit.feature.dashboard

import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.bookorbit.core.model.BookCard
import com.bookorbit.core.model.ReadingGoalWidget
import com.bookorbit.core.model.ReadingRecapWidget
import com.bookorbit.core.model.ReadingServiceShelfItem
import com.bookorbit.core.model.ReadingStreakWidget
import com.bookorbit.core.model.ShelfConfigEntry
import com.bookorbit.core.model.capabilityForShelf
import com.bookorbit.core.model.ReadingServiceShelf
import com.bookorbit.core.network.ReadingServicesRepository
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

/** One reading-service external shelf (e.g. Readwise "owned elsewhere", Hardcover "friends"),
 * resolved to its books. Hidden by [DashboardViewModel] whenever [books] would be empty. */
data class ExternalShelfUi(val shelfId: String, val provider: String, val books: List<ReadingServiceShelfItem>)

@HiltViewModel
class DashboardViewModel @Inject constructor(
    private val repo: BrowseRepository,
    private val shelfConfigRepo: DashboardShelfConfigRepository,
    private val readingServicesRepo: ReadingServicesRepository,
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
        /** Null on an older server, or when no connected provider has the `recap_widget` capability. */
        val recap: ReadingRecapWidget? = null,
        /** Reading-service shelves (owned-elsewhere, friends, trending, recommendations) with at
         * least one book; empty on an older server or when no provider is connected. */
        val externalShelves: List<ExternalShelfUi> = emptyList(),
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
            val recap = async { runCatching { repo.readingRecap() }.getOrNull() }
            val externalShelves = async { loadExternalShelves() }
            val shelves = enabledShelves.map { entry -> async { load(entry) } }.awaitAll()

            _ui.value = UiState(
                shelves = shelves,
                loading = false,
                error = enabledShelves.isNotEmpty() && failures == enabledShelves.size,
                streak = streak.await(),
                goal = goal.await(),
                recap = recap.await(),
                externalShelves = externalShelves.await(),
            )
        }
    }

    /**
     * One shelf per configured-and-enabled `(provider, shelf)` pair from the user's
     * `dashboardShelfConfig.externalShelves` (web picker, S9), in that config's order; falls
     * back to "owned-elsewhere only" for every connected provider when the server has no such
     * config at all (older server, or a user who has never opened the web picker). Each pair is
     * skipped unless its provider is connected and has the shelf's capability turned on, and is
     * dropped if it ends up with no books - [ReadingServicesRepository] already degrades every
     * call to an empty result, so an older server or an unsupported shelf never errors here.
     */
    private suspend fun loadExternalShelves(): List<ExternalShelfUi> {
        val summaries = runCatching { readingServicesRepo.summaries() }.getOrDefault(emptyList())
        val connected = summaries.filter { it.connected }.associateBy { it.provider }
        if (connected.isEmpty()) return emptyList()

        val configured = runCatching { shelfConfigRepo.externalShelves() }.getOrNull()
        val candidates: List<Pair<String, String>> = if (configured != null) {
            configured.filter { it.enabled }.sortedBy { it.order }.map { it.provider to it.shelf }
        } else {
            connected.keys.map { it to ReadingServiceShelf.OWNED_ELSEWHERE }
        }

        val result = mutableListOf<ExternalShelfUi>()
        for ((provider, shelfId) in candidates) {
            val summary = connected[provider] ?: continue
            val capability = capabilityForShelf(shelfId) ?: continue
            if (!summary.featureActive(capability)) continue
            val books = readingServicesRepo.shelf(provider, shelfId)
            if (books.isNotEmpty()) result += ExternalShelfUi(shelfId, provider, books)
        }
        return result
    }
}

/** First non-empty shelf of [type] in display order, or an empty list if none/disabled. */
fun List<ShelfUi>.booksFor(type: String): List<BookCard> = firstOrNull { it.entry.type == type }?.books.orEmpty()
