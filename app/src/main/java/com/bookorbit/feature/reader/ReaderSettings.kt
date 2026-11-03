package com.bookorbit.feature.reader

import androidx.annotation.StringRes
import com.bookorbit.R
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.decodeFromJsonElement
import kotlinx.serialization.json.jsonObject

/**
 * Render settings for the foliate reader. Field names MUST match what the WebView bridge
 * (assets/reader/bridge.js) reads, since this is serialized straight into the begin/applyStyles
 * payloads. Mirrors the web client's ReaderState.
 *
 * [useBookLayout] (stage 2): ON means the reader honours the publisher's own embedded fonts,
 * CSS, line heights, margins and alignment ("see the book as originally published"); the theme
 * colors (light/sepia/dark/amoled bg+fg) still apply on top so dark mode stays readable. OFF
 * applies every override field below instead. Theme/mode are never gated by this flag - they are
 * a reader preference, not a publisher-authored layout property.
 *
 * Migration (existing installs): see [ReaderSettingsStore.load] - users who already had a stored
 * settings blob before this field existed are treated as "already customised" and get
 * [useBookLayout] = false, so their current look does not change; fresh installs default to true.
 */
@Serializable
data class ReaderSettings(
    val fontSize: Int = 16,
    val lineHeight: Double = 1.5,
    val fontFamily: String? = FONT_SERIF,
    val paragraphSpacing: Double = 0.0, // em, additional space below p/li/blockquote/dd
    val maxColumnCount: Int = 2,
    val gap: Double = 0.05,
    val maxInlineSize: Int = 720,
    val maxBlockSize: Int = 1440,
    val justify: Boolean = true,
    val hyphenate: Boolean = true,
    val isDark: Boolean = true,
    val themeName: String = "default",
    val flow: String = "paginated", // "paginated" | "scrolled"
    val useBookLayout: Boolean = true,
    val marginTop: Int = 40,
    val marginBottom: Int = 40,
    val marginLeft: Int = 40,
    val marginRight: Int = 40,
    val linkSideMargins: Boolean = false,
)

val FONT_SIZE_RANGE = 10..32
val LINE_HEIGHT_RANGE = 0.8..3.0
val PARAGRAPH_SPACING_RANGE = 0.0..2.0
val MARGIN_RANGE = 0..120

/** Only override faces - no "Publisher"/"Original" chip. [ReaderSettings.useBookLayout] is the
 * only way to get the publisher's own embedded fonts (see class doc above). */
const val FONT_SERIF = "Georgia, \"Times New Roman\", serif"
const val FONT_SANS = "-apple-system, \"Helvetica Neue\", Arial, sans-serif"
const val FONT_MONOSPACE = "Menlo, Consolas, monospace"

data class FontFamilyOption(@StringRes val label: Int, val value: String?)

val FONT_FAMILIES = listOf(
    FontFamilyOption(R.string.font_serif, FONT_SERIF),
    FontFamilyOption(R.string.font_sans, FONT_SANS),
    FontFamilyOption(R.string.font_monospace, FONT_MONOSPACE),
)

fun clampFontSize(v: Int): Int = v.coerceIn(FONT_SIZE_RANGE.first, FONT_SIZE_RANGE.last)

fun clampLineHeight(v: Double): Double =
    (Math.round(v * 10) / 10.0).coerceIn(LINE_HEIGHT_RANGE.start, LINE_HEIGHT_RANGE.endInclusive)

fun clampParagraphSpacing(v: Double): Double =
    (Math.round(v * 10) / 10.0).coerceIn(PARAGRAPH_SPACING_RANGE.start, PARAGRAPH_SPACING_RANGE.endInclusive)

fun clampMargin(v: Int): Int = v.coerceIn(MARGIN_RANGE.first, MARGIN_RANGE.last)

/**
 * Applies a margin edit to [settings], honoring [ReaderSettings.linkSideMargins]: editing left or
 * right while linked mirrors the value onto the other side. Top/bottom are never linked to each
 * other or to left/right - publisher margins are rarely symmetric.
 */
fun ReaderSettings.withLeftMargin(value: Int): ReaderSettings {
    val clamped = clampMargin(value)
    return if (linkSideMargins) copy(marginLeft = clamped, marginRight = clamped) else copy(marginLeft = clamped)
}

fun ReaderSettings.withRightMargin(value: Int): ReaderSettings {
    val clamped = clampMargin(value)
    return if (linkSideMargins) copy(marginLeft = clamped, marginRight = clamped) else copy(marginRight = clamped)
}

/**
 * Pure migration logic for [ReaderSettingsStore.load] - kept outside the DataStore-backed class
 * so it can be unit tested without an Android context.
 *
 * - [raw] is `null` (nothing ever stored, fresh install) -> defaults, `useBookLayout = true`.
 * - [raw] decodes but predates the "useBookLayout" field (an existing install that had already
 *   written a settings blob before this field existed) -> migrated to `useBookLayout = false`, so
 *   an existing, already-customised user's look does not silently change underneath them.
 * - [raw] already has "useBookLayout" -> decoded as-is.
 * - [raw] is present but fails to decode at all -> safe fallback to defaults.
 */
fun migrateReaderSettings(raw: String?, json: Json): ReaderSettings {
    if (raw == null) return ReaderSettings()
    return runCatching {
        val element = json.parseToJsonElement(raw).jsonObject
        val decoded = json.decodeFromJsonElement(ReaderSettings.serializer(), element)
        if (element.containsKey("useBookLayout")) decoded else decoded.copy(useBookLayout = false)
    }.getOrDefault(ReaderSettings())
}
