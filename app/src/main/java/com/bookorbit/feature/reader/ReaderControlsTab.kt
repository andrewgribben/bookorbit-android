package com.bookorbit.feature.reader

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material3.FilterChip
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Switch
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import com.bookorbit.R

/**
 * The Controls tab (owner decisions 2 and 5): app-wide, device-only tap/gesture settings, built
 * once here and reused verbatim by both the comic ([com.bookorbit.feature.reader.comic.ComicReaderSettingsSheet])
 * and ebook ([ReaderSettingsSheet]) Configure sheets - it is the one tab whose *content*, not
 * just its style, is genuinely shared. The caller is responsible for: disabling the scope switch
 * and showing [R.string.rc_app_wide_note] instead of the usual scope note, and omitting the
 * Save/Reset/Restore footer on this tab (same pattern as the ebook sheet's Playback tab).
 *
 * [isComicContext] swaps the double-tap-zoom row for an explanatory note in the ebook context
 * (double-tap selects a word there instead), and the hint under "Volume keys" ("infinite modes"
 * vs "scrolled mode" wording), matching the approved mockup's storyboard 10b.
 */
@OptIn(ExperimentalLayoutApi::class)
@Composable
fun ReaderControlsTab(
    settings: ReaderControlsSettings,
    onChange: (ReaderControlsSettings) -> Unit,
    isComicContext: Boolean,
) {
    var selectedZone by remember(settings.layoutPreset) { mutableStateOf<TapZone?>(null) }

    Column(verticalArrangement = Arrangement.spacedBy(16.dp)) {
        SectionLabel(stringResource(R.string.rc_zone_layout))
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            FilterChip(
                selected = settings.layoutPreset == ZoneLayoutPreset.SIDES,
                onClick = { onChange(settings.copy(layoutPreset = ZoneLayoutPreset.SIDES)) },
                label = { Text(stringResource(R.string.rc_layout_sides)) },
            )
            FilterChip(
                selected = settings.layoutPreset == ZoneLayoutPreset.SIDES_AND_CORNERS,
                onClick = { onChange(settings.copy(layoutPreset = ZoneLayoutPreset.SIDES_AND_CORNERS)) },
                label = { Text(stringResource(R.string.rc_layout_sides_and_corners)) },
            )
        }
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            FilterChip(
                selected = settings.layoutPreset == ZoneLayoutPreset.EDGES,
                onClick = { onChange(settings.copy(layoutPreset = ZoneLayoutPreset.EDGES)) },
                label = { Text(stringResource(R.string.rc_layout_edges)) },
            )
            FilterChip(
                selected = settings.layoutPreset == ZoneLayoutPreset.CENTRE_ONLY,
                onClick = { onChange(settings.copy(layoutPreset = ZoneLayoutPreset.CENTRE_ONLY)) },
                label = { Text(stringResource(R.string.rc_layout_centre_only)) },
            )
        }

        SectionLabel(stringResource(R.string.rc_zones))
        ZoneDiagram(
            preset = settings.layoutPreset,
            zoneSize = settings.zoneSize,
            selectedZone = selectedZone,
            actionFor = settings::actionFor,
            onZoneTap = { selectedZone = it },
        )
        LockedOrHintNote(stringResource(R.string.rc_zone_action_hint))
        selectedZone?.let { zone ->
            FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                TapAction.entries.forEach { action ->
                    FilterChip(
                        selected = settings.actionFor(zone) == action,
                        onClick = { onChange(settings.withZoneAction(zone, action)) },
                        label = { Text(actionLabel(action)) },
                    )
                }
            }
        }

        SectionLabel(stringResource(R.string.rc_zone_size))
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            FilterChip(
                selected = settings.zoneSize == ZoneSize.NARROW,
                onClick = { onChange(settings.copy(zoneSize = ZoneSize.NARROW)) },
                label = { Text(stringResource(R.string.rc_zone_size_narrow)) },
            )
            FilterChip(
                selected = settings.zoneSize == ZoneSize.MEDIUM,
                onClick = { onChange(settings.copy(zoneSize = ZoneSize.MEDIUM)) },
                label = { Text(stringResource(R.string.rc_zone_size_medium)) },
            )
            FilterChip(
                selected = settings.zoneSize == ZoneSize.WIDE,
                onClick = { onChange(settings.copy(zoneSize = ZoneSize.WIDE)) },
                label = { Text(stringResource(R.string.rc_zone_size_wide)) },
            )
        }

        SwitchRow(stringResource(R.string.rc_mirror_rtl), settings.mirrorForRtl) { onChange(settings.copy(mirrorForRtl = it)) }
        SwitchRow(stringResource(R.string.rc_swipe_to_turn), settings.swipeEnabled) { onChange(settings.copy(swipeEnabled = it)) }

        if (isComicContext) {
            SwitchRow(stringResource(R.string.rc_double_tap_zoom), settings.doubleTapZoomEnabled) { onChange(settings.copy(doubleTapZoomEnabled = it)) }
        } else {
            LockedOrHintNote(stringResource(R.string.rc_double_tap_zoom_ebook_note))
        }

        SwitchRow(stringResource(R.string.rc_volume_keys), settings.volumeKeysTurnPages) { onChange(settings.copy(volumeKeysTurnPages = it)) }
        LockedOrHintNote(stringResource(if (isComicContext) R.string.rc_infinite_scroll_hint else R.string.rc_scrolled_hint))

        LockedOrHintNote(stringResource(R.string.rc_app_wide_note))
    }
}

@Composable
private fun SwitchRow(label: String, checked: Boolean, onCheckedChange: (Boolean) -> Unit) {
    Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.fillMaxWidth()) {
        Text(label, style = MaterialTheme.typography.bodyLarge, modifier = Modifier.weight(1f))
        Switch(checked = checked, onCheckedChange = onCheckedChange)
    }
}

@Composable
private fun actionLabel(action: TapAction): String = stringResource(
    when (action) {
        TapAction.NEXT -> R.string.rc_action_next
        TapAction.PREVIOUS -> R.string.rc_action_previous
        TapAction.MENU -> R.string.rc_action_menu
        TapAction.NOTHING -> R.string.rc_action_nothing
    },
)

/**
 * A compact page-shaped diagram showing the zones [preset]/[zoneSize] actually define, each
 * tinted by its current action and tappable to select it (the action is then changed via the
 * chip row the caller renders below). Built from plain `Box`es sized by fraction, not a Canvas,
 * so each zone is a real clickable target with its own content description.
 */
@Composable
private fun ZoneDiagram(
    preset: ZoneLayoutPreset,
    zoneSize: ZoneSize,
    selectedZone: TapZone?,
    actionFor: (TapZone) -> TapAction,
    onZoneTap: (TapZone) -> Unit,
) {
    val zones = zonesFor(preset)
    val band = zoneSize.fraction
    Box(
        modifier = Modifier
            .size(168.dp, 208.dp)
            .border(1.dp, MaterialTheme.colorScheme.outline),
    ) {
        when (preset) {
            ZoneLayoutPreset.CENTRE_ONLY -> {
                ZoneCell(TapZone.CENTER, selectedZone, actionFor, onZoneTap, Modifier.fillMaxWidth().fillMaxHeight())
            }
            ZoneLayoutPreset.SIDES -> {
                Row(Modifier.fillMaxWidth().fillMaxHeight()) {
                    ZoneCell(TapZone.LEFT, selectedZone, actionFor, onZoneTap, Modifier.fillMaxHeight().weight(band))
                    ZoneCell(TapZone.CENTER, selectedZone, actionFor, onZoneTap, Modifier.fillMaxHeight().weight(1f - 2 * band))
                    ZoneCell(TapZone.RIGHT, selectedZone, actionFor, onZoneTap, Modifier.fillMaxHeight().weight(band))
                }
            }
            ZoneLayoutPreset.SIDES_AND_CORNERS -> {
                Column(Modifier.fillMaxWidth().fillMaxHeight()) {
                    Row(Modifier.fillMaxWidth().weight(1f - band)) {
                        ZoneCell(TapZone.LEFT, selectedZone, actionFor, onZoneTap, Modifier.fillMaxHeight().weight(band))
                        ZoneCell(TapZone.CENTER, selectedZone, actionFor, onZoneTap, Modifier.fillMaxHeight().weight(1f - 2 * band))
                        ZoneCell(TapZone.RIGHT, selectedZone, actionFor, onZoneTap, Modifier.fillMaxHeight().weight(band))
                    }
                    ZoneCell(TapZone.BOTTOM, selectedZone, actionFor, onZoneTap, Modifier.fillMaxWidth().weight(band))
                }
            }
            ZoneLayoutPreset.EDGES -> {
                Column(Modifier.fillMaxWidth().fillMaxHeight()) {
                    ZoneCell(TapZone.TOP, selectedZone, actionFor, onZoneTap, Modifier.fillMaxWidth().weight(band))
                    Row(Modifier.fillMaxWidth().weight(1f - 2 * band)) {
                        ZoneCell(TapZone.LEFT, selectedZone, actionFor, onZoneTap, Modifier.fillMaxHeight().weight(band))
                        ZoneCell(TapZone.CENTER, selectedZone, actionFor, onZoneTap, Modifier.fillMaxHeight().weight(1f - 2 * band))
                        ZoneCell(TapZone.RIGHT, selectedZone, actionFor, onZoneTap, Modifier.fillMaxHeight().weight(band))
                    }
                    ZoneCell(TapZone.BOTTOM, selectedZone, actionFor, onZoneTap, Modifier.fillMaxWidth().weight(band))
                }
            }
        }
    }
}

@Composable
private fun ZoneCell(
    zone: TapZone,
    selectedZone: TapZone?,
    actionFor: (TapZone) -> TapAction,
    onZoneTap: (TapZone) -> Unit,
    modifier: Modifier,
) {
    val action = actionFor(zone)
    val tint = when (action) {
        TapAction.NEXT -> MaterialTheme.colorScheme.primary.copy(alpha = 0.35f)
        TapAction.PREVIOUS -> MaterialTheme.colorScheme.secondary.copy(alpha = 0.35f)
        TapAction.MENU -> MaterialTheme.colorScheme.outline.copy(alpha = 0.35f)
        TapAction.NOTHING -> MaterialTheme.colorScheme.surface.copy(alpha = 0.1f)
    }
    Box(
        modifier = modifier
            .border(1.dp, if (selectedZone == zone) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.outline.copy(alpha = 0.4f))
            .background(tint)
            .clickable { onZoneTap(zone) },
        contentAlignment = Alignment.Center,
    ) {
        Text(shortActionLabel(action), style = MaterialTheme.typography.labelSmall)
    }
}

@Composable
private fun shortActionLabel(action: TapAction): String = when (action) {
    TapAction.NEXT -> stringResource(R.string.rc_action_next_short)
    TapAction.PREVIOUS -> stringResource(R.string.rc_action_previous_short)
    TapAction.MENU -> stringResource(R.string.rc_action_menu_short)
    TapAction.NOTHING -> "–"
}
