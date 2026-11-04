package com.bookorbit.feature.reader

import kotlinx.serialization.Serializable

/**
 * Stage 5: app-wide tap/gesture controls, shared by the comic AND ebook readers (owner decision
 * 2). Device-only, no Global/This-book scope and no Save/Reset/Restore footer (owner decision 5,
 * same as the Playback tab) - see [ReaderControlsStore].
 */
enum class TapZone { LEFT, RIGHT, TOP, BOTTOM, CENTER, TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT, BOTTOM_RIGHT }

/** [MENU] shows or hides the reader's toolbars (and the system bars with them); the name is kept
 * because it is persisted in saved zone overrides. */
enum class TapAction { NEXT, PREVIOUS, MENU, NOTHING }

enum class ZoneLayoutPreset { SIDES, SIDES_AND_CORNERS, EDGES, CENTRE_ONLY }

enum class ZoneSize(val fraction: Float) {
    NARROW(0.25f),
    MEDIUM(0.30f),
    WIDE(0.40f),
}

/**
 * [zoneActionOverrides] holds only the zones the user has explicitly repointed away from the
 * preset's own default (keyed by [TapZone.name]); any zone missing from it falls back to
 * [defaultActionFor]. This mirrors the "tap a zone to change its action" mockup behaviour while
 * keeping a freshly-chosen preset's defaults intact until the user actually customises a zone.
 */
@Serializable
data class ReaderControlsSettings(
    val layoutPreset: ZoneLayoutPreset = ZoneLayoutPreset.SIDES,
    val zoneSize: ZoneSize = ZoneSize.MEDIUM,
    val zoneActionOverrides: Map<String, TapAction> = emptyMap(),
    val mirrorForRtl: Boolean = true,
    val swipeEnabled: Boolean = true,
    val doubleTapZoomEnabled: Boolean = true,
    val volumeKeysTurnPages: Boolean = false,
)

/** The zones a given [ZoneLayoutPreset] actually uses; zones not in this set never receive taps
 * (they fall inside whichever zone the preset does define for that area). */
fun zonesFor(preset: ZoneLayoutPreset): Set<TapZone> = when (preset) {
    ZoneLayoutPreset.SIDES -> setOf(TapZone.LEFT, TapZone.CENTER, TapZone.RIGHT)
    ZoneLayoutPreset.SIDES_AND_CORNERS -> setOf(
        TapZone.LEFT, TapZone.CENTER, TapZone.RIGHT, TapZone.BOTTOM,
    )
    ZoneLayoutPreset.EDGES -> setOf(
        TapZone.LEFT, TapZone.RIGHT, TapZone.TOP, TapZone.BOTTOM, TapZone.CENTER,
    )
    ZoneLayoutPreset.CENTRE_ONLY -> setOf(TapZone.CENTER)
}

/** The built-in default action for [zone] under [preset], before any user override. */
fun defaultActionFor(preset: ZoneLayoutPreset, zone: TapZone): TapAction = when (preset) {
    ZoneLayoutPreset.CENTRE_ONLY -> if (zone == TapZone.CENTER) TapAction.MENU else TapAction.NOTHING
    else -> when (zone) {
        TapZone.LEFT, TapZone.TOP_LEFT, TapZone.TOP -> TapAction.PREVIOUS
        TapZone.RIGHT, TapZone.BOTTOM_RIGHT, TapZone.BOTTOM -> TapAction.NEXT
        TapZone.CENTER -> TapAction.MENU
        TapZone.TOP_RIGHT, TapZone.BOTTOM_LEFT -> TapAction.NEXT
    }
}

fun ReaderControlsSettings.actionFor(zone: TapZone): TapAction =
    zoneActionOverrides[zone.name] ?: defaultActionFor(layoutPreset, zone)

fun ReaderControlsSettings.withZoneAction(zone: TapZone, action: TapAction): ReaderControlsSettings =
    copy(zoneActionOverrides = zoneActionOverrides + (zone.name to action))

/**
 * Classifies a tap at the given fractional position (0f..1f across the page) into a [TapZone]
 * for the given [preset] and [zoneSize]. Falls back to [TapZone.CENTER] for anything not covered
 * by the preset's own edge/corner bands.
 */
fun hitZone(preset: ZoneLayoutPreset, zoneSize: ZoneSize, xFraction: Float, yFraction: Float): TapZone {
    val x = xFraction.coerceIn(0f, 1f)
    val y = yFraction.coerceIn(0f, 1f)
    val band = zoneSize.fraction

    return when (preset) {
        ZoneLayoutPreset.CENTRE_ONLY -> TapZone.CENTER

        ZoneLayoutPreset.SIDES -> when {
            x < band -> TapZone.LEFT
            x > 1f - band -> TapZone.RIGHT
            else -> TapZone.CENTER
        }

        ZoneLayoutPreset.SIDES_AND_CORNERS -> when {
            x < band -> TapZone.LEFT
            x > 1f - band -> TapZone.RIGHT
            y > 1f - band -> TapZone.BOTTOM
            else -> TapZone.CENTER
        }

        ZoneLayoutPreset.EDGES -> when {
            x < band -> TapZone.LEFT
            x > 1f - band -> TapZone.RIGHT
            y < band -> TapZone.TOP
            y > 1f - band -> TapZone.BOTTOM
            else -> TapZone.CENTER
        }
    }
}

/**
 * Resolves the action for a tap, honouring [ReaderControlsSettings.mirrorForRtl]: when the
 * content reads right-to-left and mirroring is on, Next/Previous swap automatically (manga).
 * [isRtl] is the *content's* reading direction, not the device locale.
 */
fun ReaderControlsSettings.resolveTapAction(zone: TapZone, isRtl: Boolean): TapAction {
    val action = actionFor(zone)
    if (!isRtl || !mirrorForRtl) return action
    return when (action) {
        TapAction.NEXT -> TapAction.PREVIOUS
        TapAction.PREVIOUS -> TapAction.NEXT
        else -> action
    }
}

fun ReaderControlsSettings.resolveTapAction(xFraction: Float, yFraction: Float, isRtl: Boolean): TapAction =
    resolveTapAction(hitZone(layoutPreset, zoneSize, xFraction, yFraction), isRtl)
