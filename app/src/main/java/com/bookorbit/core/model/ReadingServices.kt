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
    val libraries: List<ReadingServiceLibrarySetting> = emptyList(),
    /** Only populated for providers that declare it (currently private adapters); the two
     * built-in providers (Readwise, Hardcover) leave this null and render through their own
     * existing web settings UI. */
    val displayName: String? = null,
    val description: String? = null,
    val iconUrl: String? = null,
    val authMethods: List<ReadingServiceAuthMethod> = emptyList(),
    /** True when a stored credential exists but the provider reported it expired/invalid. */
    val needsReconnect: Boolean = false,
) {
    /** Whether [feature] is both supported by the provider and not explicitly turned off. */
    fun featureActive(feature: String): Boolean = capabilities.containsKey(feature) && features[feature] != false

    /** The name to show in the UI: [displayName] when the server sent one, else the provider id. */
    val resolvedDisplayName: String get() = displayName ?: provider.replaceFirstChar(Char::uppercase)

    /** True when this provider has an in-app sign-in flow (a private adapter with `authMethods`).
     * Built-ins (readwise/hardcover) have none here and keep their "Manage on the web" link. */
    val hasInAppSignIn: Boolean get() = authMethods.isNotEmpty()
}

/** True for a sub-adapter grouped under another provider's Integrations detail instead of
 * getting its own row (e.g. `readwise-social` under `readwise`) - any provider id prefixed with
 * `"$parentProvider-"`. */
fun ReadingServiceSummary.isSubAdapterOf(parentProvider: String): Boolean =
    provider.startsWith("$parentProvider-")

/**
 * Splits `GET /reading-services` summaries into top-level providers (each gets its own
 * Integrations row) and the sub-adapters grouped under them, keyed by parent provider id. A
 * sub-adapter is any provider whose id is `"$parent-..."` for some other provider [parent] in the
 * same list (so a currently-unknown `"readwise-"`-prefixed id with no matching `"readwise"` entry
 * still gets its own row instead of silently disappearing).
 */
fun groupReadingServiceSummaries(
    summaries: List<ReadingServiceSummary>,
): Pair<List<ReadingServiceSummary>, Map<String, List<ReadingServiceSummary>>> {
    val parentIds = summaries.map { it.provider }.toSet()
    val subAdapters = summaries.filter { summary ->
        parentIds.any { parent -> parent != summary.provider && summary.isSubAdapterOf(parent) }
    }
    val subAdapterProviders = subAdapters.map { it.provider }.toSet()
    val topLevel = summaries.filterNot { it.provider in subAdapterProviders }
    val bySubParent = subAdapters.groupBy { summary ->
        parentIds.first { parent -> parent != summary.provider && summary.isSubAdapterOf(parent) }
    }
    return topLevel to bySubParent
}

/**
 * One way a provider lets a user sign in (server: `ReadingServiceAuthMethod`,
 * `packages/types/src/reading-services.ts`). Modelled as one flat data class instead of a sealed
 * hierarchy: [fields] is only present for `kind == "password"`, everything else ignores it.
 */
@Serializable
data class ReadingServiceAuthMethod(
    val kind: String,
    val label: String = "",
    val help: String? = null,
    val placeholder: String? = null,
    val fields: ReadingServicePasswordFields? = null,
) {
    companion object {
        const val TOKEN = "token"
        const val DEVICE_CODE = "device_code"
        const val PASSWORD = "password"
    }
}

@Serializable
data class ReadingServicePasswordFields(
    val username: ReadingServiceAuthField,
    val password: ReadingServiceAuthField,
)

@Serializable
data class ReadingServiceAuthField(
    val label: String,
    val placeholder: String? = null,
)

/** `POST /reading-services/{provider}/auth/device/start` response. Never carries the device
 * handle itself - just what the UI needs to show the user and poll. */
@Serializable
data class ReadingServiceDeviceAuthStart(
    val verificationUrl: String,
    val userCode: String? = null,
    val expiresAt: String,
    val pollIntervalSeconds: Int = 5,
)

/** `POST /reading-services/{provider}/auth/device/poll` response. */
@Serializable
data class ReadingServiceDeviceAuthPollResult(
    val status: String,
    val accountLabel: String? = null,
    val message: String? = null,
) {
    companion object {
        const val PENDING = "pending"
        const val APPROVED = "approved"
        const val EXPIRED = "expired"
        const val DENIED = "denied"
        const val ERROR = "error"
    }
}

/** `POST /reading-services/{provider}/auth/password` response. Never carries the password back. */
@Serializable
data class ReadingServicePasswordLoginResult(
    val ok: Boolean = false,
    val accountLabel: String? = null,
    val reason: String? = null,
    val message: String? = null,
)

/** `POST /reading-services/{provider}/auth/token` response. */
@Serializable
data class ReadingServiceAuthResult(
    val ok: Boolean = false,
    val accountLabel: String? = null,
)

/** Body for `POST /reading-services/{provider}/auth/token`. */
@Serializable
data class ConnectReadingServiceTokenRequest(val credential: String)

/** Body for `POST /reading-services/{provider}/auth/password`. */
@Serializable
data class ConnectReadingServicePasswordRequest(val username: String, val password: String)

/** `DELETE /reading-services/{provider}/auth` response. */
@Serializable
data class ReadingServiceOkResult(val ok: Boolean = true)

/**
 * One library's per-provider sync scope from [ReadingServiceSummary.libraries] (server:
 * `ReadingServiceLibrarySetting`, `packages/types/src/reading-services.ts`). The server lists one
 * entry per library the user can access, so a missing/empty list here means an older server that
 * predates per-library scope, not "every library disabled".
 */
@Serializable
data class ReadingServiceLibrarySetting(
    val libraryId: Int,
    val enabled: Boolean = true,
    val features: Map<String, Boolean> = emptyMap(),
)

/** Library-scope counts for one provider's Integrations row, derived from [ReadingServiceSummary.libraries]. */
data class LibraryScopeSummary(
    val enabledCount: Int,
    val totalCount: Int,
    val customisedCount: Int,
) {
    /** True when every library is enabled with no per-library feature narrowing. */
    val isAllLibraries: Boolean get() = enabledCount == totalCount && customisedCount == 0
}

/**
 * Summarises [ReadingServiceSummary.libraries] for display (e.g. "All libraries" or "2 of 3
 * libraries, 1 customised") - null when the field is absent or empty, so an older server that
 * never sent per-library scope renders no scope line instead of claiming "0 of 0 libraries".
 */
fun ReadingServiceSummary.libraryScopeSummary(): LibraryScopeSummary? {
    if (libraries.isEmpty()) return null
    val enabledLibraries = libraries.filter { it.enabled }
    val customisedCount = enabledLibraries.count { entry -> entry.features.values.any { value -> !value } }
    return LibraryScopeSummary(
        enabledCount = enabledLibraries.size,
        totalCount = libraries.size,
        customisedCount = customisedCount,
    )
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
    ReadingServiceShelf.FRIENDS_READING -> com.bookorbit.R.string.shelf_friends_reading
    ReadingServiceShelf.FRIENDS_FINISHED -> com.bookorbit.R.string.shelf_friends_finished
    ReadingServiceShelf.TRENDING -> com.bookorbit.R.string.shelf_trending
    ReadingServiceShelf.RECOMMENDATIONS -> com.bookorbit.R.string.shelf_recommended
    else -> com.bookorbit.R.string.shelf_external_books
}
