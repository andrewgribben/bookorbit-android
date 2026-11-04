package com.bookorbit.feature.reader.comic

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.boolean
import kotlinx.serialization.json.int
import kotlinx.serialization.json.jsonPrimitive

/**
 * Comic/CBZ reader settings. Mirrors the web client's `CbxReaderSettings`
 * (`useCbzSettings.ts` / `CbzSettingsPanel.vue`) field-for-field for the ten settings that are
 * eligible to sync to the server, plus app-only extras that never leave the device (see
 * [SYNCED_KEYS] and [toSyncJson]/[fromSyncJson]).
 *
 * The server does have a sync endpoint: `reader-preferences.controller.ts`'s
 * `GET /api/v1/reader/defaults` and `PUT|DELETE /api/v1/reader/defaults/cbx` (format group
 * `cbx`, validated `.strict()` by `CBX_SETTINGS_SCHEMA` - only [SYNCED_KEYS] may be sent, see
 * [toSyncJson]). [ComicReaderPreferencesRepository] wires the actual network calls, gated by the
 * signed-in user's server-side `syncReaderPreferences` setting
 * ([com.bookorbit.core.model.syncReaderPreferences]) and Global scope - see
 * [shouldSyncToServer].
 */
enum class ComicFitMode(val wire: String) {
    FIT_PAGE("fit-page"),
    FIT_WIDTH("fit-width"),
    FIT_HEIGHT("fit-height"),
    ACTUAL("actual"),
}

enum class ComicViewMode(val wire: String) {
    SINGLE("single"),
    TWO_PAGE("two-page"),
}

enum class ComicScrollMode(val wire: String) {
    PAGINATED("paginated"),
    INFINITE("infinite"),
    LONG_STRIP("long-strip"),
}

enum class ComicDirection(val wire: String) {
    LTR("ltr"),
    RTL("rtl"),
}

enum class ComicSpreadAlignment(val wire: String) {
    NORMAL("normal"),
    SHIFTED("shifted"),
}

enum class ComicWidePageMode(val wire: String) {
    AUTO("auto"),
    DISABLE("disable"),
}

/** The web's three synced background values. [ComicReaderSettings.trueBlack] is a 4th,
 * app-only AMOLED option layered on top - it never changes [bgColor] itself. */
enum class ComicBgColor(val wire: String) {
    BLACK("black"),
    GRAY("gray"),
    WHITE("white"),
}

val SPREAD_GAP_RANGE = 0..24

fun clampSpreadGap(v: Int): Int = (v - (v % 2)).coerceIn(SPREAD_GAP_RANGE.first, SPREAD_GAP_RANGE.last)

@Serializable
data class ComicReaderSettings(
    val fitMode: ComicFitMode = ComicFitMode.FIT_PAGE,
    val viewMode: ComicViewMode = ComicViewMode.SINGLE,
    val scrollMode: ComicScrollMode = ComicScrollMode.PAGINATED,
    val direction: ComicDirection = ComicDirection.LTR,
    val spreadAlignment: ComicSpreadAlignment = ComicSpreadAlignment.NORMAL,
    val spreadGap: Int = 0,
    val forceTwoPage: Boolean = false,
    val widePageSingletonMode: ComicWidePageMode = ComicWidePageMode.AUTO,
    val bgColor: ComicBgColor = ComicBgColor.BLACK,
    val autoAdvance: Boolean = false,
    // App-only. Never part of [SYNCED_KEYS]; always device-local (see class doc).
    val trueBlack: Boolean = false,
    val keepScreenOn: Boolean = false,
)

/** The ten web-synced keys, using the web's own field names (`CbxReaderSettings`). */
val SYNCED_KEYS = listOf(
    "fitMode", "viewMode", "scrollMode", "direction", "spreadAlignment",
    "spreadGap", "forceTwoPage", "widePageSingletonMode", "bgColor", "autoAdvance",
)

/** Serializes only the fields the web client understands, using the web's exact wire values -
 * never [ComicReaderSettings.trueBlack] or [ComicReaderSettings.keepScreenOn]. */
fun ComicReaderSettings.toSyncJson(): Map<String, JsonElement> = mapOf(
    "fitMode" to JsonPrimitive(fitMode.wire),
    "viewMode" to JsonPrimitive(viewMode.wire),
    "scrollMode" to JsonPrimitive(scrollMode.wire),
    "direction" to JsonPrimitive(direction.wire),
    "spreadAlignment" to JsonPrimitive(spreadAlignment.wire),
    "spreadGap" to JsonPrimitive(spreadGap),
    "forceTwoPage" to JsonPrimitive(forceTwoPage),
    "widePageSingletonMode" to JsonPrimitive(widePageSingletonMode.wire),
    "bgColor" to JsonPrimitive(bgColor.wire),
    "autoAdvance" to JsonPrimitive(autoAdvance),
)

/** Applies only recognised, synced keys from a server payload on top of [base]; unknown keys
 * (including the app-only ones) and malformed values are ignored, never crash. */
fun fromSyncJson(base: ComicReaderSettings, json: Map<String, JsonElement>): ComicReaderSettings {
    fun str(key: String) = (json[key] as? JsonPrimitive)?.let { runCatching { it.jsonPrimitive.content }.getOrNull() }
    fun bool(key: String) = (json[key] as? JsonPrimitive)?.let { runCatching { it.boolean }.getOrNull() }
    fun int(key: String) = (json[key] as? JsonPrimitive)?.let { runCatching { it.int }.getOrNull() }

    return base.copy(
        fitMode = str("fitMode")?.let { w -> ComicFitMode.entries.find { it.wire == w } } ?: base.fitMode,
        viewMode = str("viewMode")?.let { w -> ComicViewMode.entries.find { it.wire == w } } ?: base.viewMode,
        scrollMode = str("scrollMode")?.let { w -> ComicScrollMode.entries.find { it.wire == w } } ?: base.scrollMode,
        direction = str("direction")?.let { w -> ComicDirection.entries.find { it.wire == w } } ?: base.direction,
        spreadAlignment = str("spreadAlignment")?.let { w -> ComicSpreadAlignment.entries.find { it.wire == w } }
            ?: base.spreadAlignment,
        spreadGap = int("spreadGap")?.let(::clampSpreadGap) ?: base.spreadGap,
        forceTwoPage = bool("forceTwoPage") ?: base.forceTwoPage,
        widePageSingletonMode = str("widePageSingletonMode")?.let { w -> ComicWidePageMode.entries.find { it.wire == w } }
            ?: base.widePageSingletonMode,
        bgColor = str("bgColor")?.let { w -> ComicBgColor.entries.find { it.wire == w } } ?: base.bgColor,
        autoAdvance = bool("autoAdvance") ?: base.autoAdvance,
    )
}

/** Only Global scope syncs, and only when the user has turned on "sync reader preferences"
 * server-side (owner decision 3, `user.settings.syncReaderPreferences`, matching the web's own
 * setting name - see [com.bookorbit.core.model.syncReaderPreferences]). This-book overrides and
 * all app-only fields never sync regardless of this flag. */
fun shouldSyncToServer(syncReaderPreferencesEnabled: Boolean, scope: com.bookorbit.feature.reader.ReaderSettingsScope): Boolean =
    syncReaderPreferencesEnabled && scope == com.bookorbit.feature.reader.ReaderSettingsScope.GLOBAL

internal val comicSettingsJson = Json {
    ignoreUnknownKeys = true
    encodeDefaults = true
}
