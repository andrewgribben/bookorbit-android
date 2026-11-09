package com.bookorbit.core.model

import kotlinx.serialization.Serializable

/** Server permission required to submit/manage book requests (`Permission.BookRequestAccess`,
 * `packages/types/src/permissions.ts`). Superusers bypass this on the server, same as every
 * other permission, so callers check [AuthUser.isSuperuser] alongside it. */
const val BOOK_REQUEST_ACCESS_PERMISSION = "book_request_access"

fun AuthUser.canRequestBooks(): Boolean = isSuperuser || BOOK_REQUEST_ACCESS_PERMISSION in permissions

/** The only medium this app's request flows ever submit: an unmatched external-shelf card has no
 * audiobook/ebook distinction of its own, so it is always requested as an ebook. */
private const val REQUEST_MEDIA_KIND_EBOOK = "ebook"

/** One item of `POST /book-requests/availability`'s body (server: `AvailabilityQueryDto`,
 * `check-availability.dto.ts`). `forbidNonWhitelisted` is on, so only these fields are sent. */
@Serializable
data class BookRequestAvailabilityQuery(
    val title: String,
    val mediaKind: String = REQUEST_MEDIA_KIND_EBOOK,
    val author: String? = null,
)

@Serializable
data class CheckBookRequestAvailabilityRequest(val items: List<BookRequestAvailabilityQuery>)

/** One result of `POST /book-requests/availability` (server: `BookRequestAvailability`,
 * `packages/types/src/book-request.ts`), one per item in the same order they were sent. */
@Serializable
data class BookRequestAvailability(
    val ownedBookId: Int? = null,
    val existingRequestId: Int? = null,
    val existingRequestStatus: String? = null,
    val alreadySubscribed: Boolean = false,
)

/** Body of `POST /book-requests` (server: `CreateBookRequestDto`). Only the fields this app ever
 * sends - the DTO has many more optional fields this flow has no value for. */
@Serializable
data class CreateBookRequestRequest(
    val title: String,
    val mediaKind: String = REQUEST_MEDIA_KIND_EBOOK,
    val authors: List<String>? = null,
    val coverUrl: String? = null,
)

/** The part of `POST /book-requests`'s response this app reads; the server returns more. */
@Serializable
data class BookRequestSubmitResult(val request: BookRequestSummaryRef)

@Serializable
data class BookRequestSummaryRef(val id: Int)
