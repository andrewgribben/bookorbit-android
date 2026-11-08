package com.bookorbit.core.network

import com.bookorbit.core.model.ConnectReadingServicePasswordRequest
import com.bookorbit.core.model.ConnectReadingServiceTokenRequest
import com.bookorbit.core.model.ReadingServiceAuthResult
import com.bookorbit.core.model.ReadingServiceAvailableShelf
import com.bookorbit.core.model.ReadingServiceDeviceAuthPollResult
import com.bookorbit.core.model.ReadingServiceDeviceAuthStart
import com.bookorbit.core.model.ReadingServicePasswordLoginResult
import com.bookorbit.core.model.ReadingServiceShelfItem
import com.bookorbit.core.model.ReadingServiceSummary
import javax.inject.Inject
import javax.inject.Singleton

/**
 * Thin wrapper over the `reading-services` endpoints, shared by the Home dashboard (external
 * shelves) and Settings (Integrations row + provider sign-in). Every read method degrades to an
 * empty result instead of throwing: a server that predates this feature (404), a disconnected
 * provider, or a transient network failure all look the same to a caller - "nothing to show",
 * never an error state. Auth/mutation methods surface failures through [Result] so the caller can
 * show the real reason (invalid credential, network, server doesn't support this method). All DTO
 * mapping for this surface lives in this one file plus the model types it returns, so a later
 * server-side field rename or shelf-id change is a one-file fix.
 */
@Singleton
class ReadingServicesRepository @Inject constructor(
    private val api: ApiService,
) {
    /** Every provider's connection/capability summary, or an empty list on an older server. */
    suspend fun summaries(): List<ReadingServiceSummary> =
        runCatching { api.getReadingServices() }.getOrDefault(emptyList())

    /** Every shelf a provider currently exposes (connected or not), or empty on an older server. */
    suspend fun availableShelves(): List<ReadingServiceAvailableShelf> =
        runCatching { api.getAvailableReadingServiceShelves() }.getOrDefault(emptyList())

    /** One external shelf's books, or an empty list if the endpoint/provider/shelf doesn't exist. */
    suspend fun shelf(provider: String, shelf: String): List<ReadingServiceShelfItem> =
        runCatching { api.getReadingServiceShelf(provider, shelf) }.getOrDefault(emptyList())

    /** Submits a `token`-method credential. The caller never re-sends it; a failure surfaces the
     * server's rejection message through [Result.exceptionOrNull]. */
    suspend fun connectWithToken(provider: String, credential: String): Result<ReadingServiceAuthResult> =
        runCatching { api.connectReadingServiceToken(provider, ConnectReadingServiceTokenRequest(credential)) }

    /** Submits a `password`-method sign-in. [password] is read once here and handed straight to
     * the request body; this repository holds no reference to it afterwards. A rejected sign-in
     * (bad credentials, MFA required, unsupported) comes back as `ok: false` inside the success
     * [Result], not as a thrown exception - only transport/server errors throw. */
    suspend fun connectWithPassword(provider: String, username: String, password: String): Result<ReadingServicePasswordLoginResult> =
        runCatching { api.connectReadingServicePassword(provider, ConnectReadingServicePasswordRequest(username, password)) }

    /** Starts a `device_code` sign-in. The handle itself never reaches this app; only the
     * verification URL, user code and poll interval do. */
    suspend fun startDeviceAuth(provider: String): Result<ReadingServiceDeviceAuthStart> =
        runCatching { api.startReadingServiceDeviceAuth(provider) }

    /** Polls a sign-in started by [startDeviceAuth]. */
    suspend fun pollDeviceAuth(provider: String): Result<ReadingServiceDeviceAuthPollResult> =
        runCatching { api.pollReadingServiceDeviceAuth(provider) }

    /** Deletes the stored credential for this provider. */
    suspend fun disconnect(provider: String): Result<Boolean> =
        runCatching { api.disconnectReadingService(provider).ok }
}
