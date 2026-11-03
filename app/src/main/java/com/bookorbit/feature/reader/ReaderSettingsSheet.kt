package com.bookorbit.feature.reader

import androidx.compose.ui.res.stringResource
import com.bookorbit.R
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Remove
import androidx.compose.material3.FilterChip
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.Switch
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.material3.ExperimentalMaterial3Api

/** Opacity for Typography/Layout controls while locked by [ReaderSettings.useBookLayout]. Values
 * underneath are not cleared when locked - toggling off reveals whatever was last set. */
private const val LOCKED_ALPHA = 0.45f

@OptIn(ExperimentalMaterial3Api::class, ExperimentalLayoutApi::class)
@Composable
fun ReaderSettingsSheet(
    settings: ReaderSettings,
    onChange: (ReaderSettings) -> Unit,
    onDismiss: () -> Unit,
) {
    ModalBottomSheet(onDismissRequest = onDismiss) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .verticalScroll(rememberScrollState())
                .padding(horizontal = 20.dp)
                .padding(bottom = 24.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp),
        ) {
            val useBookLayout = settings.useBookLayout
            val overridesEnabled = !useBookLayout

            Label(stringResource(R.string.rs_label_theme))
            FlowRow(horizontalArrangement = Arrangement.spacedBy(10.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                READER_THEMES.forEach { theme ->
                    val themeIsDark = effectiveIsDark(theme.name, settings.isDark)
                    val bg = Color(if (themeIsDark) theme.darkBg else theme.lightBg)
                    val fg = Color(if (themeIsDark) theme.darkFg else theme.lightFg)
                    val selected = settings.themeName == theme.name
                    Box(
                        modifier = Modifier
                            .size(40.dp)
                            .clip(CircleShape)
                            .background(bg)
                            .border(
                                width = if (selected) 3.dp else 1.dp,
                                color = if (selected) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.outline,
                                shape = CircleShape,
                            )
                            // AMOLED is a dark-only theme (see ReaderThemes.effectiveIsDark), so
                            // selecting it also forces isDark on, keeping the mode chips below in
                            // sync with what's actually rendered rather than leaving the Light
                            // chip selectable while the page renders dark regardless.
                            .clickable {
                                onChange(settings.copy(themeName = theme.name, isDark = effectiveIsDark(theme.name, settings.isDark)))
                            },
                        contentAlignment = Alignment.Center,
                    ) {
                        Text(stringResource(R.string.a), color = fg, fontWeight = FontWeight.Bold)
                    }
                }
            }

            Label(stringResource(R.string.rs_label_mode))
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                val amoled = settings.themeName == "amoled"
                FilterChip(
                    selected = !settings.isDark,
                    enabled = !amoled,
                    onClick = { onChange(settings.copy(isDark = false)) },
                    label = { Text(stringResource(R.string.light)) },
                )
                FilterChip(selected = settings.isDark, onClick = { onChange(settings.copy(isDark = true)) }, label = { Text(stringResource(R.string.dark)) })
            }

            // Theme/mode above are never gated by "Use book layout" - they're a reader
            // preference, not a publisher-authored layout property (see ReaderSettings doc).
            Label(stringResource(R.string.rs_label_book_layout))
            Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.fillMaxWidth()) {
                Text(stringResource(R.string.use_book_layout), style = MaterialTheme.typography.bodyLarge, modifier = Modifier.weight(1f))
                Switch(checked = useBookLayout, onCheckedChange = { onChange(settings.copy(useBookLayout = it)) })
            }
            if (useBookLayout) {
                Text(
                    stringResource(R.string.use_book_layout_banner),
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
            }

            Label(stringResource(R.string.rs_label_layout))
            if (useBookLayout) {
                LockedNote(stringResource(R.string.locked_layout_note))
            }
            Column(modifier = Modifier.alpha(if (overridesEnabled) 1f else LOCKED_ALPHA), verticalArrangement = Arrangement.spacedBy(16.dp)) {
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    FilterChip(
                        selected = settings.flow == "paginated",
                        enabled = overridesEnabled,
                        onClick = { onChange(settings.copy(flow = "paginated")) },
                        label = { Text(stringResource(R.string.paginated)) },
                    )
                    FilterChip(
                        selected = settings.flow == "scrolled",
                        enabled = overridesEnabled,
                        onClick = { onChange(settings.copy(flow = "scrolled")) },
                        label = { Text(stringResource(R.string.scrolled)) },
                    )
                }

                Stepper(
                    label = stringResource(R.string.rs_label_columns),
                    value = "${settings.maxColumnCount}",
                    enabled = overridesEnabled,
                    onDecrement = { onChange(settings.copy(maxColumnCount = (settings.maxColumnCount - 1).coerceIn(1, 2))) },
                    onIncrement = { onChange(settings.copy(maxColumnCount = (settings.maxColumnCount + 1).coerceIn(1, 2))) },
                )

                // Four independent page margins (requirement 4): a user layout setting, so it is
                // gated by "Use book layout" like the rest of this tab - decided and documented in
                // the stage-2 commit (matches the approved mockup, which lists "margins" among the
                // Layout controls dimmed while book layout is on).
                Text(stringResource(R.string.rs_label_margins), style = MaterialTheme.typography.bodyLarge)
                Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.fillMaxWidth()) {
                    Text(stringResource(R.string.link_side_margins), style = MaterialTheme.typography.bodyMedium, modifier = Modifier.weight(1f))
                    Switch(
                        checked = settings.linkSideMargins,
                        enabled = overridesEnabled,
                        onCheckedChange = { onChange(settings.copy(linkSideMargins = it)) },
                    )
                }
                Stepper(
                    label = stringResource(R.string.margin_top),
                    value = "${settings.marginTop}",
                    enabled = overridesEnabled,
                    onDecrement = { onChange(settings.copy(marginTop = clampMargin(settings.marginTop - 4))) },
                    onIncrement = { onChange(settings.copy(marginTop = clampMargin(settings.marginTop + 4))) },
                )
                Stepper(
                    label = stringResource(R.string.margin_bottom),
                    value = "${settings.marginBottom}",
                    enabled = overridesEnabled,
                    onDecrement = { onChange(settings.copy(marginBottom = clampMargin(settings.marginBottom - 4))) },
                    onIncrement = { onChange(settings.copy(marginBottom = clampMargin(settings.marginBottom + 4))) },
                )
                Stepper(
                    label = stringResource(R.string.margin_left),
                    value = "${settings.marginLeft}",
                    enabled = overridesEnabled,
                    onDecrement = { onChange(settings.withLeftMargin(settings.marginLeft - 4)) },
                    onIncrement = { onChange(settings.withLeftMargin(settings.marginLeft + 4)) },
                )
                Stepper(
                    label = stringResource(R.string.margin_right),
                    value = "${settings.marginRight}",
                    enabled = overridesEnabled,
                    onDecrement = { onChange(settings.withRightMargin(settings.marginRight - 4)) },
                    onIncrement = { onChange(settings.withRightMargin(settings.marginRight + 4)) },
                )
            }

            Label(stringResource(R.string.rs_label_typography))
            if (useBookLayout) {
                LockedNote(stringResource(R.string.locked_typography_note))
            }
            Column(modifier = Modifier.alpha(if (overridesEnabled) 1f else LOCKED_ALPHA), verticalArrangement = Arrangement.spacedBy(16.dp)) {
                Stepper(
                    label = stringResource(R.string.font_size),
                    value = "${settings.fontSize}",
                    enabled = overridesEnabled,
                    onDecrement = { onChange(settings.copy(fontSize = clampFontSize(settings.fontSize - 1))) },
                    onIncrement = { onChange(settings.copy(fontSize = clampFontSize(settings.fontSize + 1))) },
                )
                Stepper(
                    label = stringResource(R.string.line_height),
                    value = String.format("%.1f", settings.lineHeight),
                    enabled = overridesEnabled,
                    onDecrement = { onChange(settings.copy(lineHeight = clampLineHeight(settings.lineHeight - 0.1))) },
                    onIncrement = { onChange(settings.copy(lineHeight = clampLineHeight(settings.lineHeight + 0.1))) },
                )
                Stepper(
                    label = stringResource(R.string.paragraph_spacing),
                    value = String.format("%.1f", settings.paragraphSpacing),
                    enabled = overridesEnabled,
                    onDecrement = { onChange(settings.copy(paragraphSpacing = clampParagraphSpacing(settings.paragraphSpacing - 0.1))) },
                    onIncrement = { onChange(settings.copy(paragraphSpacing = clampParagraphSpacing(settings.paragraphSpacing + 0.1))) },
                )

                Text(stringResource(R.string.rs_label_font), style = MaterialTheme.typography.bodyLarge)
                FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    FONT_FAMILIES.forEach { font ->
                        FilterChip(
                            selected = settings.fontFamily == font.value,
                            enabled = overridesEnabled,
                            onClick = { onChange(settings.copy(fontFamily = font.value)) },
                            label = { Text(stringResource(font.label)) },
                        )
                    }
                }

                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    FilterChip(
                        selected = settings.justify,
                        enabled = overridesEnabled,
                        onClick = { onChange(settings.copy(justify = true)) },
                        label = { Text(stringResource(R.string.justify_on)) },
                    )
                    FilterChip(
                        selected = !settings.justify,
                        enabled = overridesEnabled,
                        onClick = { onChange(settings.copy(justify = false)) },
                        label = { Text(stringResource(R.string.justify_off)) },
                    )
                }
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    FilterChip(
                        selected = settings.hyphenate,
                        enabled = overridesEnabled,
                        onClick = { onChange(settings.copy(hyphenate = true)) },
                        label = { Text(stringResource(R.string.hyphenate_on)) },
                    )
                    FilterChip(
                        selected = !settings.hyphenate,
                        enabled = overridesEnabled,
                        onClick = { onChange(settings.copy(hyphenate = false)) },
                        label = { Text(stringResource(R.string.hyphenate_off)) },
                    )
                }
            }
        }
    }
}

@Composable
private fun Label(text: String) {
    Text(text, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold)
}

@Composable
private fun LockedNote(text: String) {
    Text(text, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
}

@Composable
private fun Stepper(label: String, value: String, enabled: Boolean = true, onDecrement: () -> Unit, onIncrement: () -> Unit) {
    Row(verticalAlignment = Alignment.CenterVertically) {
        Text(label, style = MaterialTheme.typography.bodyLarge, modifier = Modifier.weight(1f))
        IconButton(onClick = onDecrement, enabled = enabled) { Icon(Icons.Filled.Remove, contentDescription = stringResource(R.string.decrease)) }
        Text(value, style = MaterialTheme.typography.bodyLarge, modifier = Modifier.padding(horizontal = 8.dp))
        IconButton(onClick = onIncrement, enabled = enabled) { Icon(Icons.Filled.Add, contentDescription = stringResource(R.string.increase)) }
    }
}
