package com.bookorbit.core.network

import com.bookorbit.core.model.BookRequestAvailability
import com.bookorbit.core.model.BookRequestAvailabilityQuery
import com.bookorbit.core.model.BookRequestSubmitResult
import com.bookorbit.core.model.CheckBookRequestAvailabilityRequest
import com.bookorbit.core.model.CreateBookRequestRequest
import com.bookorbit.core.model.ReadingServiceShelfItem
import javax.inject.Inject
import javax.inject.Singleton

/**
 * Thin wrapper over `book-requests` for the "Add to requests" action on an unmatched
 * external-shelf card ([com.bookorbit.ui.components.ExternalBookScroller]). Every call surfaces
 * failure through [Result] rather than degrading - unlike [ReadingServicesRepository], a failure
 * here must reach the user (a request that silently didn't happen is worse than an error).
 */
@Singleton
class BookRequestsRepository @Inject constructor(
    private val api: ApiService,
) {
    /** Availability for one unmatched card, or null if the call fails (caller falls back to
     * treating it as neither owned nor already requested). */
    suspend fun checkAvailability(card: ReadingServiceShelfItem): BookRequestAvailability? =
        runCatching {
            api.checkBookRequestAvailability(
                CheckBookRequestAvailabilityRequest(
                    items = listOf(BookRequestAvailabilityQuery(title = card.title.orEmpty(), author = card.authorText)),
                ),
            )
        }.getOrNull()?.firstOrNull()

    suspend fun submit(card: ReadingServiceShelfItem): Result<BookRequestSubmitResult> =
        runCatching {
            api.createBookRequest(
                CreateBookRequestRequest(
                    title = card.title.orEmpty(),
                    authors = card.authors.takeIf { it.isNotEmpty() },
                    coverUrl = card.coverUrl,
                ),
            )
        }
}
