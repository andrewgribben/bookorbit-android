package com.bookorbit.feature.dashboard

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.bookorbit.core.model.DashboardShelfConfig
import com.bookorbit.core.model.ShelfConfigEntry
import com.bookorbit.ui.UiText
import com.bookorbit.R
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

/** Settings > Appearance > Customize Dashboard: toggle and reorder the home shelves. */
@HiltViewModel
class CustomizeDashboardViewModel @Inject constructor(
    private val repo: DashboardShelfConfigRepository,
) : ViewModel() {

    data class UiState(
        val entries: List<ShelfConfigEntry> = emptyList(),
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
            _ui.value = UiState(entries = repo.shelves(), useLocalLayout = repo.useLocalLayout(), loading = false)
        }
    }

    fun consumeMessage() {
        _message.value = null
    }

    fun toggle(id: String) = persist(DashboardShelfConfig.toggled(_ui.value.entries, id))

    fun move(index: Int, delta: Int) = persist(DashboardShelfConfig.moved(_ui.value.entries, index, delta))

    fun resetToDefault() = persist(DashboardShelfConfig.DEFAULT_ENTRIES)

    /** Flips "use this device's layout". Reloads the shelf list afterwards since switching
     * between the server list and the local one can change what's shown (new server shelves
     * appended, or the seeded/local copy swapped in). */
    fun setUseLocalLayout(enabled: Boolean) {
        _ui.value = _ui.value.copy(useLocalLayout = enabled, saving = true)
        viewModelScope.launch {
            repo.setUseLocalLayout(enabled)
            _ui.value = _ui.value.copy(entries = repo.shelves(), saving = false)
        }
    }

    /** Updates the list immediately (so the row reacts without waiting on the network), then saves. */
    private fun persist(next: List<ShelfConfigEntry>) {
        val ordered = DashboardShelfConfig.ordered(next)
        _ui.value = _ui.value.copy(entries = ordered, saving = true)
        viewModelScope.launch {
            repo.save(ordered)
                .onFailure { _message.value = UiText.of(R.string.dashboard_customize_save_failed) }
            _ui.value = _ui.value.copy(saving = false)
        }
    }
}
