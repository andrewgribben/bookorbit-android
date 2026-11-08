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
 * Reads, merges and writes the per-user dashboard shelf config that the server persists at
 * `user.settings.dashboardShelfConfig` (`packages/types/src/dashboard.ts:82-86`,
 * `PATCH /api/v1/users/me/settings` - `user.controller.ts:92-95`). The web only treats this as
 * authoritative when `syncAcrossSessions` is on (`useDashboardConfig.ts:175-232`) and otherwise
 * keeps its own copy in `localStorage`; this app has no per-device shelf store, so it always reads
 * and writes the server copy - the only persistence a BookOrbit account has for this setting.
 */
object DashboardShelfConfig {

    private val KNOWN_SCROLLER_KEYS = setOf("id", "type", "label", "enabled", "order", "limit", "smartScopeId")

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
     * Builds the `dashboardShelfConfig` JSON to send back via `PATCH /api/v1/users/me/settings`.
     * Preserves every field this app doesn't model: top-level keys of [originalConfig] other than
     * `scrollers` (e.g. `shelfLayout`, `syncAcrossSessions`) and each entry's [ShelfConfigEntry.extra].
     * Only `enabled` and `order` are ever app-edited - this app never creates or deletes a shelf, so
     * every entry it was given comes back out, just possibly reordered or toggled.
     */
    fun buildConfigJson(originalConfig: JsonObject?, entries: List<ShelfConfigEntry>): JsonObject {
        val scrollers = ordered(entries).map { entry ->
            buildJsonObject {
                entry.extra.forEach { (key, value) -> put(key, value) }
                put("id", entry.id)
                put("type", entry.type)
                put("label", entry.label)
                put("enabled", entry.enabled)
                put("order", entry.order)
                put("limit", entry.limit)
                entry.smartScopeId?.let { put("smartScopeId", it) }
            }
        }
        return buildJsonObject {
            originalConfig?.forEach { (key, value) -> if (key != "scrollers") put(key, value) }
            put("scrollers", JsonArray(scrollers))
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
