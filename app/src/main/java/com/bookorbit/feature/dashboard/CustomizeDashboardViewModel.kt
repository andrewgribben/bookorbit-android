package com.bookorbit.feature.dashboard

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.bookorbit.core.model.DashboardShelfConfig
import com.bookorbit.core.model.DashboardShelfRow
import com.bookorbit.core.network.ReadingServicesRepository
import com.bookorbit.ui.UiText
import com.bookorbit.R
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

/**
 * Settings > Appearance > Customize Dashboard: one reorderable list mixing built-in/server
 * shelves and reading-service (external) shelves, sharing a single order - see
 * [DashboardShelfConfig.mergedRows].
 */
@HiltViewModel
class CustomizeDashboardViewModel @Inject constructor(
    private val repo: DashboardShelfConfigRepository,
    private val readingServicesRepo: ReadingServicesRepository,
) : ViewModel() {

    data class UiState(
        val rows: List<DashboardShelfRow> = emptyList(),
        /** Providers with a live connection right now - a [DashboardShelfRow.External] row for
         * any other provider shows the "Sign in to <provider>" hint and a disabled switch. */
        val connectedProviders: Set<String> = emptySet(),
        val useLocalLayout: Boolean = false,
        val loading: Boolean = true,
        val saving: Boolean = false,
    )

    private val _ui = MutableStateFlow(UiState())
    val ui = _ui.asStateFlow()

    private val _message = MutableStateFlow<UiText?>(null)
    val message = _message.asStateFlow()

    init {
        viewModelScope.launch {
            val rows = repo.rowsForEditing()
            val connected = connectedProviders()
            _ui.value = UiState(rows = rows, connectedProviders = connected, useLocalLayout = repo.useLocalLayout(), loading = false)
        }
    }

    private suspend fun connectedProviders(): Set<String> =
        runCatching { readingServicesRepo.summaries() }.getOrDefault(emptyList())
            .filter { it.connected }.map { it.provider }.toSet()

    fun consumeMessage() {
        _message.value = null
    }

    fun toggle(key: String) = persist(DashboardShelfConfig.toggledRow(_ui.value.rows, key))

    fun move(index: Int, delta: Int) = persist(DashboardShelfConfig.movedRow(_ui.value.rows, index, delta))

    /** Resets only the built-in/server shelves to their default order, everything on - keeps the
     * current external-shelf choices as they are, since "reset" is scoped to the shelves this
     * button has always controlled. */
    fun resetToDefault() {
        val externalRows = _ui.value.rows.filterIsInstance<DashboardShelfRow.External>()
        val scrollerRows = DashboardShelfConfig.DEFAULT_ENTRIES.map { DashboardShelfRow.Scroller(it) }
        persist(scrollerRows + externalRows)
    }

    /** Flips "use this device's layout". Reloads the row list afterwards since switching between
     * the server list and the local one can change what's shown (new server/available shelves
     * appended, or the seeded/local copy swapped in). */
    fun setUseLocalLayout(enabled: Boolean) {
        _ui.value = _ui.value.copy(useLocalLayout = enabled, saving = true)
        viewModelScope.launch {
            repo.setUseLocalLayout(enabled)
            _ui.value = _ui.value.copy(rows = repo.rowsForEditing(), saving = false)
        }
    }

    /** Updates the list immediately (so the row reacts without waiting on the network), then saves. */
    private fun persist(next: List<DashboardShelfRow>) {
        val ordered = DashboardShelfConfig.orderedRows(next)
        _ui.value = _ui.value.copy(rows = ordered, saving = true)
        viewModelScope.launch {
            repo.save(ordered)
                .onFailure { _message.value = UiText.of(R.string.dashboard_customize_save_failed) }
            _ui.value = _ui.value.copy(saving = false)
        }
    }
}
