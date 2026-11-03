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
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.FilterChip
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Switch
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.material3.Button
import androidx.compose.material3.ExperimentalMaterial3Api

/** Opacity for Typography/Layout controls while locked by [ReaderSettings.useBookLayout], or
 * while a book is following Global ("Use global settings" on). Values underneath are not
 * cleared when locked - toggling off reveals whatever was last set. */
private const val LOCKED_ALPHA = 0.45f

/**
 * Reader settings sheet (stage 3): a Global/This-book scope selector, the per-book "Use global
 * settings" master switch, every style control from stage 1/2, and the Save/Reset/Restore
 * footer actions (requirement 4/5 - style settings only, never playback).
 *
 * [globalSettings] and [bookState] are the two raw sources of truth; which one is shown/edited is
 * driven entirely by [scope] and [bookState.useGlobal] - see [ReaderViewModel] for how edits are
 * routed so Global is never written to from book scope.
 */
@OptIn(ExperimentalMaterial3Api::class, ExperimentalLayoutApi::class)
@Composable
fun ReaderSettingsSheet(
    scope: ReaderSettingsScope,
    onScopeChange: (ReaderSettingsScope) -> Unit,
    globalSettings: ReaderSettings,
    bookState: BookSettingsState,
    onUseGlobalChange: (Boolean) -> Unit,
    onSettingsChange: (ReaderSettings) -> Unit,
    onSaveAsDefault: () -> Unit,
    onResetToSavedDefault: () -> Unit,
    onRestoreBuiltIn: () -> Unit,
    onDismiss: () -> Unit,
) {
    var showResetDialog by remember { mutableStateOf(false) }
    var showRestoreDialog by remember { mutableStateOf(false) }

    val isThisBook = scope == ReaderSettingsScope.THIS_BOOK
    // What's shown: Global's own settings in Global scope, else what's effectively applied to
    // the book (its own override if it has stopped following Global, else Global's values shown
    // through but locked).
    val settings = if (isThisBook) effectiveSettings(globalSettings, bookState) else globalSettings
    // Scope-level editability: locked entirely while a book is following Global. Independent of
    // (and layered on top of) the existing "Use book layout" lock further below.
    val scopeEditable = !isThisBook || !bookState.useGlobal
    val scopeName = stringResource(if (isThisBook) R.string.rs_scope_name_this_book else R.string.rs_scope_name_global)

    fun onChange(updated: ReaderSettings) {
        if (scopeEditable) onSettingsChange(updated)
    }

    ModalBottomSheet(onDismissRequest = onDismiss) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .verticalScroll(rememberScrollState())
                .padding(horizontal = 20.dp)
                .padding(bottom = 24.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp),
        ) {
            // --- Scope selector (requirement 1): available on every device, phone/Fold/tablet. ---
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                FilterChip(
                    selected = !isThisBook,
                    onClick = { onScopeChange(ReaderSettingsScope.GLOBAL) },
                    label = { Text(stringResource(R.string.rs_scope_global)) },
                )
                FilterChip(
                    selected = isThisBook,
                    onClick = { onScopeChange(ReaderSettingsScope.THIS_BOOK) },
                    label = { Text(stringResource(R.string.rs_scope_this_book)) },
                )
            }

            if (isThisBook) {
                Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.fillMaxWidth()) {
                    Text(stringResource(R.string.rs_use_global_settings), style = MaterialTheme.typography.bodyLarge, modifier = Modifier.weight(1f))
                    Switch(checked = bookState.useGlobal, onCheckedChange = onUseGlobalChange)
                }
                if (bookState.useGlobal) {
                    Text(
                        stringResource(R.string.rs_use_global_banner),
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                    )
                }
            }

            val useBookLayout = settings.useBookLayout
            val overridesEnabled = scopeEditable && !useBookLayout

            Label(stringResource(R.string.rs_label_theme))
            Column(modifier = Modifier.alpha(if (scopeEditable) 1f else LOCKED_ALPHA)) {
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
                                // AMOLED renders dark via effectiveIsDark at draw time; keep the stored
                                // isDark untouched so leaving AMOLED restores the user's own mode.
                                .clickable(enabled = scopeEditable) { onChange(settings.copy(themeName = theme.name)) },
                            contentAlignment = Alignment.Center,
                        ) {
                            Text(stringResource(R.string.a), color = fg, fontWeight = FontWeight.Bold)
                        }
                    }
                }
            }

            Label(stringResource(R.string.rs_label_mode))
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                val amoled = settings.themeName == "amoled"
                FilterChip(
                    selected = !effectiveIsDark(settings.themeName, settings.isDark),
                    enabled = scopeEditable && !amoled,
                    onClick = { onChange(settings.copy(isDark = false)) },
                    label = { Text(stringResource(R.string.light)) },
                )
                FilterChip(
                    selected = effectiveIsDark(settings.themeName, settings.isDark),
                    enabled = scopeEditable,
                    onClick = { onChange(settings.copy(isDark = true)) },
                    label = { Text(stringResource(R.string.dark)) },
                )
            }

            // Theme/mode above are never gated by "Use book layout" - they're a reader
            // preference, not a publisher-authored layout property (see ReaderSettings doc).
            Label(stringResource(R.string.rs_label_book_layout))
            Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.fillMaxWidth()) {
                Text(stringResource(R.string.use_book_layout), style = MaterialTheme.typography.bodyLarge, modifier = Modifier.weight(1f))
                Switch(checked = useBookLayout, enabled = scopeEditable, onCheckedChange = { onChange(settings.copy(useBookLayout = it)) })
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

                // Four independent page margins (requirement 4 of stage 2): a user layout
                // setting, so it is gated by "Use book layout" like the rest of this tab.
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

            // --- Save / Reset / Restore (requirement 4/5): footer, not the reading bar. Style
            // settings only - never playback. ---
            Column(verticalArrangement = Arrangement.spacedBy(10.dp), modifier = Modifier.padding(top = 8.dp)) {
                Button(onClick = onSaveAsDefault, modifier = Modifier.fillMaxWidth()) {
                    Text(stringResource(R.string.rs_save_as_default))
                }
                // A book following Global has nothing of its own to reset; resetting must not detach it.
                OutlinedButton(onClick = { showResetDialog = true }, enabled = scopeEditable, modifier = Modifier.fillMaxWidth()) {
                    Text(stringResource(R.string.rs_reset_to_default))
                }
                TextButton(onClick = { showRestoreDialog = true }, enabled = scopeEditable, modifier = Modifier.fillMaxWidth()) {
                    Text(stringResource(R.string.rs_restore_built_in))
                }
            }
        }
    }

    if (showResetDialog) {
        AlertDialog(
            onDismissRequest = { showResetDialog = false },
            title = { Text(stringResource(R.string.rs_reset_dialog_title, scopeName)) },
            text = { Text(stringResource(R.string.rs_reset_dialog_body, scopeName)) },
            confirmButton = {
                TextButton(onClick = {
                    showResetDialog = false
                    onResetToSavedDefault()
                }) { Text(stringResource(R.string.reset)) }
            },
            dismissButton = {
                TextButton(onClick = { showResetDialog = false }) { Text(stringResource(R.string.cancel)) }
            },
        )
    }

    if (showRestoreDialog) {
        AlertDialog(
            onDismissRequest = { showRestoreDialog = false },
            title = { Text(stringResource(R.string.rs_restore_dialog_title, scopeName)) },
            text = { Text(stringResource(R.string.rs_restore_dialog_body, scopeName)) },
            confirmButton = {
                TextButton(onClick = {
                    showRestoreDialog = false
                    onRestoreBuiltIn()
                }) { Text(stringResource(R.string.rs_restore_built_in)) }
            },
            dismissButton = {
                TextButton(onClick = { showRestoreDialog = false }) { Text(stringResource(R.string.cancel)) }
            },
        )
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
        IconButton(onClick = onDecrement, enabled = enabled) { Icon(Icons.Filled.Remove, contentDescription = stringResource(R.string.decrease_named, label)) }
        Text(value, style = MaterialTheme.typography.bodyLarge, modifier = Modifier.padding(horizontal = 8.dp))
        IconButton(onClick = onIncrement, enabled = enabled) { Icon(Icons.Filled.Add, contentDescription = stringResource(R.string.increase_named, label)) }
    }
}
