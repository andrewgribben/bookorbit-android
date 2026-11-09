package com.bookorbit.core.model

import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.booleanOrNull
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.contentOrNull
import kotlinx.serialization.json.intOrNull
import kotlinx.serialization.json.put

/**
 * One configured home shelf: a server scroller type plus the user's enabled/order choice. Mirrors
 * the web's `ScrollerConfig` (`packages/types/src/dashboard.ts:68-78`). [extra] carries every field
 * this app doesn't model (e.g. `rows`, or whatever a future server adds) so it survives unchanged
 * when the config is written back - this app only ever edits `enabled` and `order`.
 */
data class ShelfConfigEntry(
    val id: String,
    val type: String,
    /** Stored label from the server config; used for shelf types this app doesn't recognise (a
     * known type's display name instead comes from [knownShelfLabelRes] at render time). */
    val label: String,
    val enabled: Boolean,
    val order: Int,
    val limit: Int = 20,
    val smartScopeId: Int? = null,
    val extra: JsonObject = JsonObject(emptyMap()),
)

/**
 * One row of the unified Customize Dashboard list: either a built-in/server shelf ([Scroller]) or
 * a reading-service shelf ([External]), sharing one `order` number space - see
 * [DashboardShelfConfig.mergedRows]. [key] is stable across a toggle/move/save round-trip so the UI
 * and [DashboardShelfConfig.toggledRow]/[DashboardShelfConfig.movedRow] can address a row without
 * depending on its current position.
 */
sealed class DashboardShelfRow {
    abstract val key: String
    abstract val enabled: Boolean
    abstract val order: Int
    abstract fun withOrder(order: Int): DashboardShelfRow
    abstract fun withEnabled(enabled: Boolean): DashboardShelfRow

    data class Scroller(val entry: ShelfConfigEntry) : DashboardShelfRow() {
        override val key get() = "scroller:${entry.id}"
        override val enabled get() = entry.enabled
        override val order get() = entry.order
        override fun withOrder(order: Int) = copy(entry = entry.copy(order = order))
        override fun withEnabled(enabled: Boolean) = copy(entry = entry.copy(enabled = enabled))
    }

    data class External(val entry: ExternalShelfConfig) : DashboardShelfRow() {
        override val key get() = "external:${entry.provider}:${entry.shelf}"
        override val enabled get() = entry.enabled
        override val order get() = entry.order
        override fun withOrder(order: Int) = copy(entry = entry.copy(order = order))
        override fun withEnabled(enabled: Boolean) = copy(entry = entry.copy(enabled = enabled))
    }
}

/**
 * Reads, merges and writes the per-user dashboard shelf config that the server persists at
 * `user.settings.dashboardShelfConfig` (`packages/types/src/dashboard.ts:82-86`,
 * `PATCH /api/v1/users/me/settings` - `user.controller.ts:92-95`). The web only treats this as
 * authoritative when `syncAcrossSessions` is on (`useDashboardConfig.ts:175-232`) and otherwise
 * keeps its own copy in `localStorage`; this app's own per-device copy is
 * [com.bookorbit.feature.dashboard.DashboardLocalLayoutStore].
 *
 * Shelf order is shared across `scrollers` and `externalShelves` - see [mergedRows] - behind
 * `shelfOrderVersion: 2`. A config written before that field existed (or that never set it) is
 * read under the legacy rule: every external shelf (by its own `order`) first, then every
 * scroller (by its own `order`) - the order the web rendered before this feature existed. The
 * first save of either array always upgrades the stored config to version 2 with both arrays
 * renumbered into one shared 1..N sequence (no gaps, no duplicates across the two arrays).
 */
object DashboardShelfConfig {

    private val KNOWN_SCROLLER_KEYS = setOf("id", "type", "label", "enabled", "order", "limit", "smartScopeId")
    private const val SHELF_ORDER_VERSION = 2

    /**
     * The app's own defaults when the server has no stored config at all - a server that predates
     * `dashboardShelfConfig`, or a user who has never opened Customize Dashboard. Every shelf type
     * this app currently renders, enabled, in the order the app has always used (requirement:
     * older servers fall back to the default order with everything on).
     */
    val DEFAULT_ENTRIES: List<ShelfConfigEntry> = listOf(
        ShelfConfigEntry(id = "default-continue-reading", type = ScrollerType.CONTINUE_READING, label = "", enabled = true, order = 1),
        ShelfConfigEntry(id = "default-continue-listening", type = ScrollerType.CONTINUE_LISTENING, label = "", enabled = true, order = 2),
        ShelfConfigEntry(id = "default-recently-added", type = ScrollerType.RECENTLY_ADDED, label = "", enabled = true, order = 3),
        ShelfConfigEntry(id = "default-want-to-read", type = ScrollerType.WANT_TO_READ, label = "", enabled = true, order = 4),
        ShelfConfigEntry(id = "default-up-next-in-series", type = ScrollerType.UP_NEXT_IN_SERIES, label = "", enabled = true, order = 5),
    )

    /**
     * Parses `dashboardShelfConfig.scrollers` into ordered entries. Null/missing/empty/all-invalid
     * falls back to [DEFAULT_ENTRIES]. An entry with no usable `type` is dropped (mirrors the web's
     * `normalizeScroller`, `useDashboardConfig.ts:95-115`); everything else - known field or not -
     * is kept, so a shelf type this app has never heard of (a new built-in type, or a smart-scope
     * shelf the user made on the server) still shows up and can be toggled/reordered.
     */
    fun parse(configJson: JsonObject?): List<ShelfConfigEntry> {
        val scrollersJson = (configJson?.get("scrollers") as? JsonArray) ?: return DEFAULT_ENTRIES
        val parsed = scrollersJson.mapIndexedNotNull { index, element -> parseEntry(element, index) }
        return parsed.ifEmpty { DEFAULT_ENTRIES }
    }

    private fun parseEntry(element: JsonElement, index: Int): ShelfConfigEntry? {
        val obj = element as? JsonObject ?: return null
        val type = (obj["type"] as? JsonPrimitive)?.contentOrNull?.takeIf { it.isNotBlank() } ?: return null
        val id = (obj["id"] as? JsonPrimitive)?.contentOrNull?.takeIf { it.isNotBlank() } ?: (index + 1).toString()
        val label = (obj["label"] as? JsonPrimitive)?.contentOrNull.orEmpty()
        val enabled = (obj["enabled"] as? JsonPrimitive)?.booleanOrNull ?: true
        val order = (obj["order"] as? JsonPrimitive)?.intOrNull ?: (index + 1)
        val limit = (obj["limit"] as? JsonPrimitive)?.intOrNull?.takeIf { it > 0 } ?: 20
        val smartScopeId = (obj["smartScopeId"] as? JsonPrimitive)?.intOrNull
        val extra = JsonObject(obj.filterKeys { it !in KNOWN_SCROLLER_KEYS })
        return ShelfConfigEntry(id, type, label, enabled, order, limit, smartScopeId, extra)
    }

    /** Display order: by `order`, ties broken by list position (stable sort). */
    fun ordered(entries: List<ShelfConfigEntry>): List<ShelfConfigEntry> = entries.sortedBy { it.order }

    fun toggled(entries: List<ShelfConfigEntry>, id: String): List<ShelfConfigEntry> =
        entries.map { if (it.id == id) it.copy(enabled = !it.enabled) else it }

    /** Swaps the entry at [index] (in display order) with its neighbour [delta] places away, and
     * renumbers `order` to match. No-op if either index is out of range. */
    fun moved(entries: List<ShelfConfigEntry>, index: Int, delta: Int): List<ShelfConfigEntry> {
        val list = ordered(entries).toMutableList()
        val to = index + delta
        if (index !in list.indices || to !in list.indices) return entries
        list.add(to, list.removeAt(index))
        return list.mapIndexed { i, entry -> entry.copy(order = i + 1) }
    }

    /**
     * Parses `dashboardShelfConfig.externalShelves` (`ExternalShelfConfig[]`,
     * `packages/types/src/dashboard.ts`) into [ExternalShelfConfig] entries, in `order`. Returns
     * `null`, not an empty list, when the key is missing entirely (an older server, or a user who
     * has never opened the web picker) - that is the "unreadable" case a caller should fall back
     * on its own default for. An explicitly empty or all-invalid array returns an empty list: the
     * config is readable, it just says "show nothing", and that is honoured as-is.
     */
    fun parseExternalShelves(configJson: JsonObject?): List<ExternalShelfConfig>? {
        val raw = configJson?.get("externalShelves") as? JsonArray ?: return null
        return raw.mapIndexedNotNull { index, element -> parseExternalShelfEntry(element, index) }
            .sortedBy { it.order }
    }

    private fun parseExternalShelfEntry(element: JsonElement, index: Int): ExternalShelfConfig? {
        val obj = element as? JsonObject ?: return null
        val provider = (obj["provider"] as? JsonPrimitive)?.contentOrNull?.takeIf { it.isNotBlank() } ?: return null
        val shelf = (obj["shelf"] as? JsonPrimitive)?.contentOrNull?.takeIf { it.isNotBlank() } ?: return null
        val enabled = (obj["enabled"] as? JsonPrimitive)?.booleanOrNull ?: true
        val order = (obj["order"] as? JsonPrimitive)?.intOrNull ?: (index + 1)
        return ExternalShelfConfig(provider, shelf, enabled, order)
    }

    /**
     * The app's edits ([edited]) applied onto the server's current list ([server], re-read just
     * before saving): shelves deleted elsewhere since the screen opened stay deleted, and shelves
     * added elsewhere (e.g. on the web) are kept, after the app's ones, instead of being overwritten.
     */
    fun mergedForSave(server: List<ShelfConfigEntry>, edited: List<ShelfConfigEntry>): List<ShelfConfigEntry> {
        val serverIds = server.map { it.id }.toSet()
        val editedIds = edited.map { it.id }.toSet()
        val kept = ordered(edited).filter { it.id in serverIds }
        val added = ordered(server).filter { it.id !in editedIds }
        return (kept + added).mapIndexed { i, entry -> entry.copy(order = i + 1) }
    }

    /**
     * Merges a per-device local layout onto the current server list (requirement for "use this
     * device's layout"): shelves present in [local] keep their local `enabled`/`order`, but take
     * every other field (type, label, limit, smartScopeId, extra) from the current [server] entry,
     * so a label or smart-scope change made elsewhere still shows up. Shelves on [server] but not
     * in [local] (added elsewhere since the local layout was seeded) are appended at the end, in
     * server order, with the server's `enabled` value. Shelves in [local] but no longer on
     * [server] (deleted elsewhere) are dropped. Result is renumbered 1..n.
     */
    fun mergedWithLocalLayout(server: List<ShelfConfigEntry>, local: List<ShelfConfigEntry>): List<ShelfConfigEntry> {
        val serverById = server.associateBy { it.id }
        val localIds = local.map { it.id }.toSet()
        val kept = ordered(local).mapNotNull { localEntry ->
            serverById[localEntry.id]?.copy(enabled = localEntry.enabled, order = localEntry.order)
        }
        val added = ordered(server).filter { it.id !in localIds }
        return (kept + added).mapIndexed { i, entry -> entry.copy(order = i + 1) }
    }

    /**
     * Builds the `dashboardShelfConfig` JSON to send back via `PATCH /api/v1/users/me/settings`.
     * Preserves every field this app doesn't model: top-level keys of [originalConfig] other than
     * `scrollers` (e.g. `shelfLayout`, `syncAcrossSessions`) and each entry's [ShelfConfigEntry.extra].
     * Only `enabled` and `order` are ever app-edited - this app never creates or deletes a shelf, so
     * every entry it was given comes back out, just possibly reordered or toggled.
     *
     * This overload never touches `externalShelves` or `shelfOrderVersion` - kept for call sites
     * that genuinely edit nothing but scrollers. [com.bookorbit.feature.dashboard.DashboardShelfConfigRepository]'s
     * save path uses the [DashboardShelfRow] overload below, which keeps both arrays on one shared order.
     */
    fun buildConfigJson(originalConfig: JsonObject?, entries: List<ShelfConfigEntry>): JsonObject {
        val scrollers = ordered(entries).map { entry -> scrollerJson(entry) }
        return buildJsonObject {
            originalConfig?.forEach { (key, value) -> if (key != "scrollers") put(key, value) }
            put("scrollers", JsonArray(scrollers))
        }
    }

    private fun scrollerJson(entry: ShelfConfigEntry) = buildJsonObject {
        entry.extra.forEach { (key, value) -> put(key, value) }
        put("id", entry.id)
        put("type", entry.type)
        put("label", entry.label)
        put("enabled", entry.enabled)
        put("order", entry.order)
        put("limit", entry.limit)
        entry.smartScopeId?.let { put("smartScopeId", it) }
    }

    private fun externalShelfJson(entry: ExternalShelfConfig) = buildJsonObject {
        put("provider", entry.provider)
        put("shelf", entry.shelf)
        put("enabled", entry.enabled)
        put("order", entry.order)
    }

    // --- Unified shared-order model (shelfOrderVersion: 2) ---

    /** Display order: by `order`, ties broken by list position (stable sort). */
    fun orderedRows(rows: List<DashboardShelfRow>): List<DashboardShelfRow> = rows.sortedBy { it.order }

    /**
     * The single merged, contiguously-renumbered (1..N) list of every scroller and every
     * configured external shelf from [configJson], in their effective display order:
     *
     * - `shelfOrderVersion == 2`: both arrays already share one order sequence - sort the union by
     *   each row's own `order`.
     * - anything else (missing, or an older version): the legacy rule the web used before this
     *   field existed - every external shelf first (by its own `order`), then every scroller (by
     *   its own `order`).
     *
     * Always includes every scroller (even disabled ones, falling back to [DEFAULT_ENTRIES] same as
     * [parse]) and every *configured* external shelf - it does not add external shelves the user
     * has never seen; see [appendAvailable] for that.
     */
    fun mergedRows(configJson: JsonObject?): List<DashboardShelfRow> {
        val scrollers = parse(configJson).map { DashboardShelfRow.Scroller(it) }
        val externals = (parseExternalShelves(configJson) ?: emptyList()).map { DashboardShelfRow.External(it) }
        val version = (configJson?.get("shelfOrderVersion") as? JsonPrimitive)?.intOrNull
        val combined = if (version == SHELF_ORDER_VERSION) {
            (scrollers + externals).sortedBy { it.order }
        } else {
            externals.sortedBy { it.order } + scrollers.sortedBy { it.order }
        }
        return renumbered(combined)
    }

    /**
     * Appends one disabled [DashboardShelfRow.External] row, at the very end, for every shelf in
     * [available] (`GET /reading-services/shelves/available`) not already present in [rows] -
     * requirement: "a shelf not yet persisted starts disabled and is appended". A no-op (returns
     * [rows] unchanged, not merely re-sorted) when every available shelf is already present.
     */
    fun appendAvailable(rows: List<DashboardShelfRow>, available: List<ReadingServiceAvailableShelf>): List<DashboardShelfRow> {
        val existingKeys = rows.filterIsInstance<DashboardShelfRow.External>()
            .map { it.entry.provider to it.entry.shelf }.toSet()
        val appended = available.mapNotNull { shelf ->
            val provider = shelf.provider ?: return@mapNotNull null
            val shelfId = shelf.shelf ?: return@mapNotNull null
            if ((provider to shelfId) in existingKeys) null
            else DashboardShelfRow.External(ExternalShelfConfig(provider, shelfId, enabled = false, order = 0))
        }
        if (appended.isEmpty()) return rows
        return renumbered(rows + appended)
    }

    fun toggledRow(rows: List<DashboardShelfRow>, key: String): List<DashboardShelfRow> =
        rows.map { if (it.key == key) it.withEnabled(!it.enabled) else it }

    /** Swaps the row at [index] (in display order) with its neighbour [delta] places away, and
     * renumbers `order` to match. No-op if either index is out of range. */
    fun movedRow(rows: List<DashboardShelfRow>, index: Int, delta: Int): List<DashboardShelfRow> {
        val list = orderedRows(rows).toMutableList()
        val to = index + delta
        if (index !in list.indices || to !in list.indices) return rows
        list.add(to, list.removeAt(index))
        return renumbered(list)
    }

    /** Same contract as [mergedForSave], generalised over both row kinds via [DashboardShelfRow.key]. */
    fun mergedRowsForSave(server: List<DashboardShelfRow>, edited: List<DashboardShelfRow>): List<DashboardShelfRow> {
        val serverKeys = server.map { it.key }.toSet()
        val editedKeys = edited.map { it.key }.toSet()
        val kept = orderedRows(edited).filter { it.key in serverKeys }
        val added = orderedRows(server).filter { it.key !in editedKeys }
        return renumbered(kept + added)
    }

    /** Same contract as [mergedWithLocalLayout], generalised over both row kinds via [DashboardShelfRow.key]. */
    fun mergedRowsWithLocalLayout(server: List<DashboardShelfRow>, local: List<DashboardShelfRow>): List<DashboardShelfRow> {
        val serverByKey = server.associateBy { it.key }
        val localKeys = local.map { it.key }.toSet()
        val kept = orderedRows(local).mapNotNull { localRow ->
            serverByKey[localRow.key]?.withEnabled(localRow.enabled)?.withOrder(localRow.order)
        }
        val added = orderedRows(server).filter { it.key !in localKeys }
        return renumbered(kept + added)
    }

    private fun renumbered(rows: List<DashboardShelfRow>): List<DashboardShelfRow> =
        rows.mapIndexed { i, row -> row.withOrder(i + 1) }

    /**
     * Builds the `dashboardShelfConfig` JSON for the unified model: both `scrollers` and
     * `externalShelves` from [rows], `shelfOrderVersion: 2`, and every other top-level key of
     * [originalConfig] preserved verbatim (`shelfLayout`, `syncAcrossSessions`, anything this app
     * doesn't model). This is the only writer that sets `shelfOrderVersion`, so the first save
     * through this path upgrades a legacy config permanently.
     */
    fun buildConfigJsonForRows(originalConfig: JsonObject?, rows: List<DashboardShelfRow>): JsonObject {
        val ordered = orderedRows(rows)
        val scrollers = ordered.filterIsInstance<DashboardShelfRow.Scroller>().map { scrollerJson(it.entry) }
        val externals = ordered.filterIsInstance<DashboardShelfRow.External>().map { externalShelfJson(it.entry) }
        return buildJsonObject {
            originalConfig?.forEach { (key, value) ->
                if (key != "scrollers" && key != "externalShelves" && key != "shelfOrderVersion") put(key, value)
            }
            put("scrollers", JsonArray(scrollers))
            put("externalShelves", JsonArray(externals))
            put("shelfOrderVersion", SHELF_ORDER_VERSION)
        }
    }
}

/** Known-type display name, resolved by the caller (needs a [android.content.Context] /
 * `stringResource`); shelf types this app doesn't recognise fall back to their stored
 * [ShelfConfigEntry.label], or the raw type string if that's blank too. */
fun knownShelfLabelRes(type: String): Int? = when (type) {
    ScrollerType.CONTINUE_READING -> com.bookorbit.R.string.home_continue_reading
    ScrollerType.CONTINUE_LISTENING -> com.bookorbit.R.string.continue_listening
    ScrollerType.RECENTLY_ADDED -> com.bookorbit.R.string.recently_added
    ScrollerType.WANT_TO_READ -> com.bookorbit.R.string.want_to_read_shelf
    ScrollerType.UP_NEXT_IN_SERIES -> com.bookorbit.R.string.up_next_in_series
    ScrollerType.RANDOM -> com.bookorbit.R.string.dashboard_shelf_random
    else -> null
}
