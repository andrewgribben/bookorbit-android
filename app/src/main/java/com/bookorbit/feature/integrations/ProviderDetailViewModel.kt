package com.bookorbit.feature.integrations

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.bookorbit.core.auth.SessionManager
import com.bookorbit.core.model.ReadingServiceAuthMethod
import com.bookorbit.core.model.ReadingServiceDeviceAuthPollResult
import com.bookorbit.core.model.ReadingServiceDeviceAuthStart
import com.bookorbit.core.model.ReadingServiceSummary
import com.bookorbit.core.network.ReadingServicesRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import javax.inject.Inject

/** Device-code polling states (card: "waiting/approved/expired/denied/error"). [IDLE] is before
 * [ProviderDetailViewModel.startDeviceAuth] has been called at all. */
enum class DevicePollState { IDLE, WAITING, APPROVED, EXPIRED, DENIED, ERROR }

data class ProviderDetailUiState(
    val loading: Boolean = true,
    val summary: ReadingServiceSummary? = null,
    /** The auth method currently selected in the method picker; null until [summary] loads. */
    val selectedMethod: ReadingServiceAuthMethod? = null,
    val username: String = "",
    val password: String = "",
    val passwordVisible: Boolean = false,
    val token: String = "",
    val tokenVisible: Boolean = false,
    val submitting: Boolean = false,
    val errorMessage: String? = null,
    val deviceAuth: ReadingServiceDeviceAuthStart? = null,
    val devicePollState: DevicePollState = DevicePollState.IDLE,
    /** Set only for the lifetime of this app session - see the design note's "Assumptions". */
    val connectedAccountLabel: String? = null,
    val confirmDisconnect: Boolean = false,
) {
    val connected: Boolean get() = summary?.connected == true
}

/**
 * Drives one provider's Integrations detail screen: loading its [ReadingServiceSummary], the
 * sign-in forms for each `authMethods` kind, device-code polling, and disconnect/switch-account.
 * One instance per screen (not shared), same pattern as the existing `useReadingServiceMigration`
 * composable on the web side.
 */
@HiltViewModel
class ProviderDetailViewModel @Inject constructor(
    private val repository: ReadingServicesRepository,
    private val session: SessionManager,
) : ViewModel() {

    private val _uiState = MutableStateFlow(ProviderDetailUiState())
    val uiState: StateFlow<ProviderDetailUiState> = _uiState.asStateFlow()

    private var provider: String? = null
    private var pollJob: Job? = null

    /** Read-only link to the web Integrations settings page for a built-in provider (no in-app
     * sign-in flow here); mirrors `SettingsViewModel.integrationsUrl`. */
    fun webSettingsUrl(provider: String): String = "${session.serverUrl.orEmpty().trimEnd('/')}/settings/integrations/$provider"

    /** Loads the provider's summary. Safe to call more than once (e.g. after reconnecting). */
    fun load(provider: String) {
        this.provider = provider
        viewModelScope.launch {
            _uiState.update { it.copy(loading = true) }
            val summary = repository.summaries().firstOrNull { it.provider == provider }
            _uiState.update {
                it.copy(
                    loading = false,
                    summary = summary,
                    selectedMethod = summary?.authMethods?.firstOrNull(),
                )
            }
        }
    }

    fun selectMethod(method: ReadingServiceAuthMethod) {
        _uiState.update { it.copy(selectedMethod = method, errorMessage = null) }
    }

    fun updateUsername(value: String) = _uiState.update { it.copy(username = value, errorMessage = null) }

    fun updatePassword(value: String) = _uiState.update { it.copy(password = value, errorMessage = null) }

    fun togglePasswordVisible() = _uiState.update { it.copy(passwordVisible = !it.passwordVisible) }

    fun updateToken(value: String) = _uiState.update { it.copy(token = value, errorMessage = null) }

    fun toggleTokenVisible() = _uiState.update { it.copy(tokenVisible = !it.tokenVisible) }

    fun submitPassword() {
        val provider = provider ?: return
        val username = _uiState.value.username
        val password = _uiState.value.password
        if (username.isBlank() || password.isBlank()) return
        viewModelScope.launch {
            _uiState.update { it.copy(submitting = true, errorMessage = null) }
            val result = repository.connectWithPassword(provider, username, password)
            // Clear the password from state immediately once the call resolves, success or not.
            _uiState.update { it.copy(password = "", submitting = false) }
            result.fold(
                onSuccess = { login ->
                    if (login.ok) {
                        onConnected(login.accountLabel)
                    } else {
                        _uiState.update { it.copy(errorMessage = login.message ?: login.reason) }
                    }
                },
                onFailure = { e -> _uiState.update { it.copy(errorMessage = e.message) } },
            )
        }
    }

    fun submitToken() {
        val provider = provider ?: return
        val token = _uiState.value.token
        if (token.isBlank()) return
        viewModelScope.launch {
            _uiState.update { it.copy(submitting = true, errorMessage = null) }
            val result = repository.connectWithToken(provider, token)
            _uiState.update { it.copy(submitting = false) }
            result.fold(
                onSuccess = { auth ->
                    if (auth.ok) {
                        onConnected(auth.accountLabel)
                    } else {
                        _uiState.update { it.copy(errorMessage = "Could not connect") }
                    }
                },
                onFailure = { e -> _uiState.update { it.copy(errorMessage = e.message) } },
            )
        }
    }

    /** Starts a device-code sign-in and begins polling at the server's advertised interval. */
    fun startDeviceAuth() {
        val provider = provider ?: return
        pollJob?.cancel()
        viewModelScope.launch {
            _uiState.update { it.copy(submitting = true, errorMessage = null, devicePollState = DevicePollState.IDLE) }
            val result = repository.startDeviceAuth(provider)
            _uiState.update { it.copy(submitting = false) }
            result.fold(
                onSuccess = { start ->
                    _uiState.update { it.copy(deviceAuth = start, devicePollState = DevicePollState.WAITING) }
                    beginPolling(provider, start)
                },
                onFailure = { e -> _uiState.update { it.copy(errorMessage = e.message, devicePollState = DevicePollState.ERROR) } },
            )
        }
    }

    private fun beginPolling(provider: String, start: ReadingServiceDeviceAuthStart) {
        pollJob = viewModelScope.launch {
            while (true) {
                delay(start.pollIntervalSeconds.coerceAtLeast(1) * 1000L)
                val result = repository.pollDeviceAuth(provider)
                val terminal = result.fold(
                    onSuccess = { poll -> applyPollResult(poll) },
                    onFailure = { e -> _uiState.update { it.copy(devicePollState = DevicePollState.ERROR, errorMessage = e.message) }; true },
                )
                if (terminal) break
            }
        }
    }

    /** Returns true when polling should stop (a terminal status was reached). */
    private fun applyPollResult(poll: ReadingServiceDeviceAuthPollResult): Boolean = when (poll.status) {
        ReadingServiceDeviceAuthPollResult.APPROVED -> {
            onConnected(poll.accountLabel)
            true
        }
        ReadingServiceDeviceAuthPollResult.EXPIRED -> {
            _uiState.update { it.copy(devicePollState = DevicePollState.EXPIRED, errorMessage = poll.message) }
            true
        }
        ReadingServiceDeviceAuthPollResult.DENIED -> {
            _uiState.update { it.copy(devicePollState = DevicePollState.DENIED, errorMessage = poll.message) }
            true
        }
        ReadingServiceDeviceAuthPollResult.ERROR -> {
            _uiState.update { it.copy(devicePollState = DevicePollState.ERROR, errorMessage = poll.message) }
            true
        }
        else -> {
            _uiState.update { it.copy(devicePollState = DevicePollState.WAITING) }
            false
        }
    }

    private fun onConnected(accountLabel: String?) {
        pollJob?.cancel()
        val current = _uiState.value.summary
        _uiState.update {
            it.copy(
                connectedAccountLabel = accountLabel,
                devicePollState = DevicePollState.APPROVED,
                summary = current?.copy(connected = true),
            )
        }
    }

    fun requestDisconnect() = _uiState.update { it.copy(confirmDisconnect = true) }

    fun cancelDisconnectRequest() = _uiState.update { it.copy(confirmDisconnect = false) }

    fun confirmDisconnect() {
        val provider = provider ?: return
        viewModelScope.launch {
            _uiState.update { it.copy(submitting = true, confirmDisconnect = false) }
            repository.disconnect(provider)
            val current = _uiState.value.summary
            _uiState.update {
                it.copy(
                    submitting = false,
                    connectedAccountLabel = null,
                    devicePollState = DevicePollState.IDLE,
                    deviceAuth = null,
                    summary = current?.copy(connected = false),
                )
            }
        }
    }

    /** Switching account disconnects the current credential, then returns to the sign-in form. */
    fun switchAccount() = confirmDisconnect()

    /** Called when the screen leaves composition - stops device-code polling, which otherwise
     * would keep hitting the server from a screen the user can no longer see. */
    fun onScreenLeft() {
        pollJob?.cancel()
    }

    override fun onCleared() {
        pollJob?.cancel()
        super.onCleared()
    }
}
