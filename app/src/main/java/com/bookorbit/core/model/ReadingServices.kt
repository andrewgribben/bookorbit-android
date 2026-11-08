package com.bookorbit.core.model

import kotlinx.serialization.Serializable

/**
 * Reading-service provider ids (`packages/types/src/reading-services.ts`:
 * `READING_SERVICE_PROVIDERS`). Kept as plain string constants rather than a sealed/enum type so
 * an unrecognised provider from a newer server still round-trips through [ReadingServiceSummary]
 * instead of failing to decode.
 */
object ReadingServiceProvider {
    const val READWISE = "readwise"
    const val HARDCOVER = "hardcover"
}

/**
 * `GET /reading-services` summary for one provider. [capabilities] maps a feature name (e.g.
 * `"owned"`, `"friends_shelf"`, `"discover_shelf"`, `"recap_widget"`) to its sync direction
 * (`"both" | "push" | "pull" | "read"`) - a feature's key is only present when the provider
 * supports it at all. [features] is the user's per-feature on/off toggle; a feature absent from
 * this map reads as enabled (every feature defaults to opt-out except `publish_sessions`, which
 * isn't relevant to anything this app renders).
 */
@Serializable
data class ReadingServiceSummary(
    val provider: String,
    val connected: Boolean = false,
    val capabilities: Map<String, String> = emptyMap(),
    val features: Map<String, Boolean> = emptyMap(),
    val disabledReason: String? = null,
) {
    /** Whether [feature] is both supported by the provider and not explicitly turned off. */
    fun featureActive(feature: String): Boolean = capabilities.containsKey(feature) && features[feature] != false
}

/**
 * Shelf ids this app requests from `GET /reading-services/{provider}/shelves/{shelf}`.
 *
 * ASSUMPTION: at the time this was built, that endpoint did not exist yet on the integration
 * branch (`feat-reading-services-integration`) - a concurrent agent was still unifying the shelf
 * shape server-side. These ids and the [ExternalBookCard] shape below are taken from the task
 * brief, not a live response. If the real endpoint lands with different shelf ids or an
 * `ExternalBookCard` field rename, only this file needs to change: [DashboardViewModel]/
 * [HomeExternalShelfUi] never see raw JSON, only these two types.
 */
object ReadingServiceShelf {
    const val OWNED_ELSEWHERE = "owned-elsewhere"
    const val FRIENDS = "friends"
    const val TRENDING = "trending"
    const val RECOMMENDATIONS = "recommendations"
}

/**
 * One row of `GET /reading-services/{provider}/shelves/{shelf}` - a book that lives on the
 * external provider. [libraryBookId] is set when the server already matched it to a local book;
 * tapping such a card opens that book, otherwise it opens [providerUrl] in a browser.
 */
@Serializable
data class ExternalBookCard(
    val title: String? = null,
    val author: String? = null,
    val coverUrl: String? = null,
    val isbn13: String? = null,
    val provider: String? = null,
    val providerUrl: String? = null,
    val libraryBookId: Int? = null,
    val people: List<String> = emptyList(),
)

/** Known-shelf display name; an unrecognised shelf id (a future server addition) still renders,
 * with a generic label - mirrors [knownShelfLabelRes]'s fallback for an unknown scroller type. */
fun externalShelfLabelRes(shelfId: String): Int = when (shelfId) {
    ReadingServiceShelf.OWNED_ELSEWHERE -> com.bookorbit.R.string.shelf_owned_elsewhere
    ReadingServiceShelf.FRIENDS -> com.bookorbit.R.string.shelf_friends_activity
    ReadingServiceShelf.TRENDING -> com.bookorbit.R.string.shelf_trending
    ReadingServiceShelf.RECOMMENDATIONS -> com.bookorbit.R.string.shelf_recommended
    else -> com.bookorbit.R.string.shelf_external_books
}
