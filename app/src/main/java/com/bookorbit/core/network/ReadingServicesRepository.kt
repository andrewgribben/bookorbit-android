package com.bookorbit.core.network

import com.bookorbit.core.model.ExternalBookCard
import com.bookorbit.core.model.ReadingServiceSummary
import javax.inject.Inject
import javax.inject.Singleton

/**
 * Thin wrapper over the `reading-services` endpoints, shared by the Home dashboard (external
 * shelves) and Settings (Integrations row). Every method degrades to an empty result instead of
 * throwing: a server that predates this feature (404), a disconnected provider, or a transient
 * network failure all look the same to a caller - "nothing to show", never an error state. All
 * DTO mapping for this surface lives in this one file plus the model types it returns, so a later
 * server-side field rename or shelf-id change is a one-file fix.
 */
@Singleton
class ReadingServicesRepository @Inject constructor(
    private val api: ApiService,
) {
    /** Every provider's connection/capability summary, or an empty list on an older server. */
    suspend fun summaries(): List<ReadingServiceSummary> =
        runCatching { api.getReadingServices() }.getOrDefault(emptyList())

    /** One external shelf's books, or an empty list if the endpoint/provider/shelf doesn't exist. */
    suspend fun shelf(provider: String, shelf: String, limit: Int = 20): List<ExternalBookCard> =
        runCatching { api.getReadingServiceShelf(provider, shelf, limit) }.getOrDefault(emptyList())
}
