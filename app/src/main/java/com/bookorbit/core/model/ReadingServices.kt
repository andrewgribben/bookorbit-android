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
 * `"owned"`, `"friends_shelf"`, `"trending_shelf"`, `"recommendations_shelf"`, `"recap_widget"`)
 * to its sync direction (`"both" | "push" | "pull" | "read"`) - a feature's key is only present
 * when the provider supports it at all. [features] is the user's per-feature on/off toggle; a
 * feature absent from this map reads as enabled (every feature defaults to opt-out except
 * `publish_sessions`, which isn't relevant to anything this app renders).
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
 * Shelf ids from `READING_SERVICE_SHELVES` (`packages/types/src/reading-services.ts`), requested
 * via `GET /reading-services/{provider}/shelves/{shelf}` and listed via
 * `GET /reading-services/shelves/available`.
 */
object ReadingServiceShelf {
    const val OWNED_ELSEWHERE = "owned-elsewhere"
    const val FRIENDS_READING = "friends-reading"
    const val FRIENDS_FINISHED = "friends-finished"
    const val TRENDING = "trending"
    const val RECOMMENDATIONS = "recommendations"
}

/** The `ReadingServiceFeature` capability key that gates a given [ReadingServiceShelf] id, per
 * the server adapters (`HardcoverReadingServicesAdapterService`/`readwise-owned-elsewhere.service.ts`).
 * An unrecognised shelf id has no gating feature, so it never shows (returns null). */
fun capabilityForShelf(shelfId: String): String? = when (shelfId) {
    ReadingServiceShelf.OWNED_ELSEWHERE -> "owned"
    ReadingServiceShelf.FRIENDS_READING, ReadingServiceShelf.FRIENDS_FINISHED -> "friends_shelf"
    ReadingServiceShelf.TRENDING -> "trending_shelf"
    ReadingServiceShelf.RECOMMENDATIONS -> "recommendations_shelf"
    else -> null
}

/** Only present on `friends-reading`/`friends-finished` shelf items. */
@Serializable
data class ReadingServiceShelfFriend(
    val displayName: String? = null,
    val avatarUrl: String? = null,
    val status: String? = null,
    val date: String? = null,
)

/**
 * One row of `GET /reading-services/{provider}/shelves/{shelf}` - a book that lives on the
 * external provider. [bookId] is set when the server already matched it to a local book (by ISBN
 * or title+author, resolved server-side even for a private adapter with no DB access); tapping
 * such a card opens that book, otherwise it opens [externalUrl] in a browser. The server never
 * sends `isbn`/`asin` match hints to the client - those are stripped before the response leaves
 * the server, so this type doesn't model them.
 */
@Serializable
data class ReadingServiceShelfItem(
    val provider: String? = null,
    val externalId: String? = null,
    val title: String? = null,
    val authors: List<String> = emptyList(),
    val coverUrl: String? = null,
    val externalUrl: String? = null,
    val bookId: Int? = null,
    val friend: ReadingServiceShelfFriend? = null,
) {
    /** Display string for [authors] - joined, or null when the provider gave none. */
    val authorText: String? get() = authors.takeIf { it.isNotEmpty() }?.joinToString(", ")
}

/** One shelf a connected provider currently exposes, from `GET /reading-services/shelves/available`
 * - used by [capabilityForShelf]-gated callers to decide what's worth offering in a shelf picker. */
@Serializable
data class ReadingServiceAvailableShelf(
    val provider: String? = null,
    val shelf: String? = null,
    val connected: Boolean = false,
)

/**
 * One provider shelf the user chose to show on the dashboard, from the web's "Customize
 * Dashboard" picker (`ExternalShelfConfig`, `packages/types/src/dashboard.ts`). Stored in
 * `user.settings.dashboardShelfConfig.externalShelves`, alongside `scrollers` - see
 * [DashboardShelfConfig.parseExternalShelves]. This app has no picker UI to write this list yet;
 * it only reads and honours whatever the web (or a future app picker) persisted.
 */
data class ExternalShelfConfig(
    val provider: String,
    val shelf: String,
    val enabled: Boolean,
    val order: Int,
)

/** Known-shelf display name; an unrecognised shelf id (a future server addition) still renders,
 * with a generic label - mirrors [knownShelfLabelRes]'s fallback for an unknown scroller type. */
fun externalShelfLabelRes(shelfId: String): Int = when (shelfId) {
    ReadingServiceShelf.OWNED_ELSEWHERE -> com.bookorbit.R.string.shelf_owned_elsewhere
    ReadingServiceShelf.FRIENDS_READING, ReadingServiceShelf.FRIENDS_FINISHED -> com.bookorbit.R.string.shelf_friends_activity
    ReadingServiceShelf.TRENDING -> com.bookorbit.R.string.shelf_trending
    ReadingServiceShelf.RECOMMENDATIONS -> com.bookorbit.R.string.shelf_recommended
    else -> com.bookorbit.R.string.shelf_external_books
}
