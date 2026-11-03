package com.bookorbit.feature.reader.comic

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
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FilterChip
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Switch
import androidx.compose.material3.Tab
import androidx.compose.material3.TabRow
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
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import com.bookorbit.R
import com.bookorbit.feature.reader.LockedOrHintNote
import com.bookorbit.feature.reader.ReaderSettingsScope
import com.bookorbit.feature.reader.SectionLabel
import com.bookorbit.feature.reader.SettingsStepper

/** Opacity for a locked control group, matching [com.bookorbit.feature.reader.ReaderSettingsSheet]. */
private const val LOCKED_ALPHA = 0.45f

/**
 * Tabs in the comic reader's Configure sheet: Layout, Spreads, Controls, Theme. Controls
 * (owner decision 2) is the one tab shared with the ebook reader's own Configure sheet -
 * see [com.bookorbit.feature.reader.ReaderControlsTab].
 */
enum class ComicSettingsTab { LAYOUT, SPREADS, CONTROLS, THEME }

/**
 * Comic reader Configure sheet. Same component language as the ebook
 * [com.bookorbit.feature.reader.ReaderSettingsSheet] (owner decision 6): the Global/This-book
 * scope switch, underline tabs, uppercase section labels, round steppers, switches, filter chips
 * and the one-row Save/Reset/Restore footer - but its own tabs and content (Layout, Spreads,
 * Theme), since the comic and ebook readers deliberately do not share settings content.
 */
@OptIn(ExperimentalMaterial3Api::class, ExperimentalLayoutApi::class)
@Composable
fun ComicReaderSettingsSheet(
    scope: ReaderSettingsScope,
    onScopeChange: (ReaderSettingsScope) -> Unit,
    globalSettings: ComicReaderSettings,
    bookState: ComicBookSettingsState,
    onUseGlobalChange: (Boolean) -> Unit,
    onSettingsChange: (ComicReaderSettings) -> Unit,
    onSaveAsDefault: () -> Unit,
    onResetToSavedDefault: () -> Unit,
    onRestoreBuiltIn: () -> Unit,
    controlsSettings: com.bookorbit.feature.reader.ReaderControlsSettings,
    onControlsSettingsChange: (com.bookorbit.feature.reader.ReaderControlsSettings) -> Unit,
    onDismiss: () -> Unit,
) {
    var showResetDialog by remember { mutableStateOf(false) }
    var showRestoreDialog by remember { mutableStateOf(false) }
    var tab by remember { mutableStateOf(ComicSettingsTab.LAYOUT) }

    val isControls = tab == ComicSettingsTab.CONTROLS
    val isThisBook = scope == ReaderSettingsScope.THIS_BOOK
    val settings = if (isThisBook) effectiveComicSettings(globalSettings, bookState) else globalSettings
    val scopeEditable = !isControls && (!isThisBook || !bookState.useGlobal)
    val scopeName = stringResource(if (isThisBook) R.string.rs_scope_name_this_book else R.string.rs_scope_name_global)

    fun onChange(updated: ComicReaderSettings) {
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
            Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.fillMaxWidth()) {
                Text(stringResource(R.string.cr_configure), style = MaterialTheme.typography.titleLarge, modifier = Modifier.weight(1f))
                Row(
                    horizontalArrangement = Arrangement.spacedBy(8.dp),
                    modifier = Modifier.alpha(if (isControls) LOCKED_ALPHA else 1f),
                ) {
                    FilterChip(selected = !isThisBook, enabled = !isControls, onClick = { onScopeChange(ReaderSettingsScope.GLOBAL) }, label = { Text(stringResource(R.string.rs_scope_global)) })
                    FilterChip(selected = isThisBook, enabled = !isControls, onClick = { onScopeChange(ReaderSettingsScope.THIS_BOOK) }, label = { Text(stringResource(R.string.rs_scope_this_book)) })
                }
            }

            if (isControls) {
                com.bookorbit.feature.reader.LockedOrHintNote(stringResource(R.string.rc_app_wide_note))
            } else if (isThisBook) {
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

            TabRow(selectedTabIndex = tab.ordinal) {
                Tab(selected = tab == ComicSettingsTab.LAYOUT, onClick = { tab = ComicSettingsTab.LAYOUT }, text = { Text(stringResource(R.string.cr_tab_layout)) })
                Tab(selected = tab == ComicSettingsTab.SPREADS, onClick = { tab = ComicSettingsTab.SPREADS }, text = { Text(stringResource(R.string.cr_tab_spreads)) })
                Tab(selected = tab == ComicSettingsTab.CONTROLS, onClick = { tab = ComicSettingsTab.CONTROLS }, text = { Text(stringResource(R.string.cr_tab_controls)) })
                Tab(selected = tab == ComicSettingsTab.THEME, onClick = { tab = ComicSettingsTab.THEME }, text = { Text(stringResource(R.string.cr_tab_theme)) })
            }

            when (tab) {
                ComicSettingsTab.LAYOUT -> ComicLayoutTab(settings, scopeEditable, ::onChange)
                ComicSettingsTab.SPREADS -> ComicSpreadsTab(settings, scopeEditable, ::onChange)
                ComicSettingsTab.CONTROLS -> com.bookorbit.feature.reader.ReaderControlsTab(
                    settings = controlsSettings,
                    onChange = onControlsSettingsChange,
                    isComicContext = true,
                )
                ComicSettingsTab.THEME -> ComicThemeTab(settings, scopeEditable, ::onChange)
            }

            if (!isControls) {
                Column(verticalArrangement = Arrangement.spacedBy(10.dp), modifier = Modifier.padding(top = 8.dp)) {
                    Button(onClick = onSaveAsDefault, modifier = Modifier.fillMaxWidth()) {
                        Text(stringResource(R.string.rs_save_as_default))
                    }
                    OutlinedButton(onClick = { showResetDialog = true }, enabled = scopeEditable, modifier = Modifier.fillMaxWidth()) {
                        Text(stringResource(R.string.rs_reset_to_default))
                    }
                    TextButton(onClick = { showRestoreDialog = true }, enabled = scopeEditable, modifier = Modifier.fillMaxWidth()) {
                        Text(stringResource(R.string.rs_restore_built_in))
                    }
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
                TextButton(onClick = { showResetDialog = false; onResetToSavedDefault() }) { Text(stringResource(R.string.reset)) }
            },
            dismissButton = { TextButton(onClick = { showResetDialog = false }) { Text(stringResource(R.string.cancel)) } },
        )
    }

    if (showRestoreDialog) {
        AlertDialog(
            onDismissRequest = { showRestoreDialog = false },
            title = { Text(stringResource(R.string.rs_restore_dialog_title, scopeName)) },
            text = { Text(stringResource(R.string.rs_restore_dialog_body, scopeName)) },
            confirmButton = {
                TextButton(onClick = { showRestoreDialog = false; onRestoreBuiltIn() }) { Text(stringResource(R.string.rs_restore_built_in)) }
            },
            dismissButton = { TextButton(onClick = { showRestoreDialog = false }) { Text(stringResource(R.string.cancel)) } },
        )
    }
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
private fun ComicLayoutTab(settings: ComicReaderSettings, enabled: Boolean, onChange: (ComicReaderSettings) -> Unit) {
    Column(modifier = Modifier.alpha(if (enabled) 1f else LOCKED_ALPHA), verticalArrangement = Arrangement.spacedBy(16.dp)) {
        SectionLabel(stringResource(R.string.cr_reading_mode))
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            FilterChip(selected = settings.scrollMode == ComicScrollMode.PAGINATED, enabled = enabled, onClick = { onChange(settings.copy(scrollMode = ComicScrollMode.PAGINATED)) }, label = { Text(stringResource(R.string.cr_mode_paged)) })
            FilterChip(selected = settings.scrollMode == ComicScrollMode.INFINITE, enabled = enabled, onClick = { onChange(settings.copy(scrollMode = ComicScrollMode.INFINITE)) }, label = { Text(stringResource(R.string.cr_mode_infinite)) })
            FilterChip(selected = settings.scrollMode == ComicScrollMode.LONG_STRIP, enabled = enabled, onClick = { onChange(settings.copy(scrollMode = ComicScrollMode.LONG_STRIP)) }, label = { Text(stringResource(R.string.cr_mode_no_gaps)) })
        }
        LockedOrHintNote(stringResource(R.string.cr_reading_mode_hint))

        SectionLabel(stringResource(R.string.cr_page_view))
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            FilterChip(selected = settings.viewMode == ComicViewMode.SINGLE, enabled = enabled, onClick = { onChange(settings.copy(viewMode = ComicViewMode.SINGLE)) }, label = { Text(stringResource(R.string.cr_page_view_single)) })
            FilterChip(selected = settings.viewMode == ComicViewMode.TWO_PAGE, enabled = enabled, onClick = { onChange(settings.copy(viewMode = ComicViewMode.TWO_PAGE)) }, label = { Text(stringResource(R.string.cr_page_view_two_page)) })
        }

        SectionLabel(stringResource(R.string.cr_fit_mode))
        FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            FilterChip(selected = settings.fitMode == ComicFitMode.FIT_PAGE, enabled = enabled, onClick = { onChange(settings.copy(fitMode = ComicFitMode.FIT_PAGE)) }, label = { Text(stringResource(R.string.cr_fit_page)) })
            FilterChip(selected = settings.fitMode == ComicFitMode.FIT_WIDTH, enabled = enabled, onClick = { onChange(settings.copy(fitMode = ComicFitMode.FIT_WIDTH)) }, label = { Text(stringResource(R.string.cr_fit_width)) })
            FilterChip(selected = settings.fitMode == ComicFitMode.FIT_HEIGHT, enabled = enabled, onClick = { onChange(settings.copy(fitMode = ComicFitMode.FIT_HEIGHT)) }, label = { Text(stringResource(R.string.cr_fit_height)) })
            FilterChip(selected = settings.fitMode == ComicFitMode.ACTUAL, enabled = enabled, onClick = { onChange(settings.copy(fitMode = ComicFitMode.ACTUAL)) }, label = { Text(stringResource(R.string.cr_fit_actual)) })
        }

        SectionLabel(stringResource(R.string.cr_direction))
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            FilterChip(selected = settings.direction == ComicDirection.LTR, enabled = enabled, onClick = { onChange(settings.copy(direction = ComicDirection.LTR)) }, label = { Text(stringResource(R.string.cr_direction_ltr)) })
            FilterChip(selected = settings.direction == ComicDirection.RTL, enabled = enabled, onClick = { onChange(settings.copy(direction = ComicDirection.RTL)) }, label = { Text(stringResource(R.string.cr_direction_rtl)) })
        }
    }
}

@Composable
private fun ComicSpreadsTab(settings: ComicReaderSettings, enabled: Boolean, onChange: (ComicReaderSettings) -> Unit) {
    // Spreads only apply in Paged mode (ComicSpreadLayout/effectiveTwoPage) - matches the
    // ebook sheet's "Use book layout" lock pattern with a tinted note instead of hiding the tab.
    val spreadsApply = settings.scrollMode == ComicScrollMode.PAGINATED
    val groupEnabled = enabled && spreadsApply
    Column(verticalArrangement = Arrangement.spacedBy(16.dp)) {
        Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.fillMaxWidth()) {
            Text(stringResource(R.string.cr_force_two_page), style = MaterialTheme.typography.bodyLarge, modifier = Modifier.weight(1f))
            Switch(checked = settings.forceTwoPage, enabled = enabled, onCheckedChange = { onChange(settings.copy(forceTwoPage = it)) })
        }
        if (!spreadsApply) {
            LockedOrHintNote(stringResource(R.string.cr_spreads_locked_note))
        }
        Column(modifier = Modifier.alpha(if (groupEnabled) 1f else LOCKED_ALPHA), verticalArrangement = Arrangement.spacedBy(16.dp)) {
            SectionLabel(stringResource(R.string.cr_spread_alignment))
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                FilterChip(selected = settings.spreadAlignment == ComicSpreadAlignment.NORMAL, enabled = groupEnabled, onClick = { onChange(settings.copy(spreadAlignment = ComicSpreadAlignment.NORMAL)) }, label = { Text(stringResource(R.string.cr_alignment_normal)) })
                FilterChip(selected = settings.spreadAlignment == ComicSpreadAlignment.SHIFTED, enabled = groupEnabled, onClick = { onChange(settings.copy(spreadAlignment = ComicSpreadAlignment.SHIFTED)) }, label = { Text(stringResource(R.string.cr_alignment_shifted)) })
            }
            LockedOrHintNote(stringResource(R.string.cr_spread_alignment_hint))

            SectionLabel(stringResource(R.string.cr_wide_pages))
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                FilterChip(selected = settings.widePageSingletonMode == ComicWidePageMode.AUTO, enabled = groupEnabled, onClick = { onChange(settings.copy(widePageSingletonMode = ComicWidePageMode.AUTO)) }, label = { Text(stringResource(R.string.cr_wide_pages_auto)) })
                FilterChip(selected = settings.widePageSingletonMode == ComicWidePageMode.DISABLE, enabled = groupEnabled, onClick = { onChange(settings.copy(widePageSingletonMode = ComicWidePageMode.DISABLE)) }, label = { Text(stringResource(R.string.cr_wide_pages_in_spreads)) })
            }

            SettingsStepper(
                label = stringResource(R.string.cr_spread_gap),
                value = stringResource(R.string.cr_spread_gap_value, settings.spreadGap),
                enabled = groupEnabled,
                onDecrement = { onChange(settings.copy(spreadGap = clampSpreadGap(settings.spreadGap - 2))) },
                onIncrement = { onChange(settings.copy(spreadGap = clampSpreadGap(settings.spreadGap + 2))) },
            )
        }
    }
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
private fun ComicThemeTab(settings: ComicReaderSettings, enabled: Boolean, onChange: (ComicReaderSettings) -> Unit) {
    Column(verticalArrangement = Arrangement.spacedBy(16.dp)) {
        SectionLabel(stringResource(R.string.cr_background))
        FlowRow(horizontalArrangement = Arrangement.spacedBy(10.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
            BackgroundSwatch(stringResource(R.string.cr_bg_black), Color(0xFF17181C), settings.bgColor == ComicBgColor.BLACK && !settings.trueBlack, enabled) {
                onChange(settings.copy(bgColor = ComicBgColor.BLACK, trueBlack = false))
            }
            BackgroundSwatch(stringResource(R.string.cr_bg_gray), Color(0xFF6B6F76), settings.bgColor == ComicBgColor.GRAY, enabled) {
                onChange(settings.copy(bgColor = ComicBgColor.GRAY, trueBlack = false))
            }
            BackgroundSwatch(stringResource(R.string.cr_bg_white), Color(0xFFFFFFFF), settings.bgColor == ComicBgColor.WHITE, enabled) {
                onChange(settings.copy(bgColor = ComicBgColor.WHITE, trueBlack = false))
            }
            BackgroundSwatch(stringResource(R.string.cr_bg_true_black), Color(0xFF000000), settings.trueBlack, enabled) {
                onChange(settings.copy(bgColor = ComicBgColor.BLACK, trueBlack = true))
            }
        }

        Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.fillMaxWidth()) {
            Text(stringResource(R.string.cr_auto_advance), style = MaterialTheme.typography.bodyLarge, modifier = Modifier.weight(1f))
            Switch(checked = settings.autoAdvance, enabled = enabled, onCheckedChange = { onChange(settings.copy(autoAdvance = it)) })
        }
        Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.fillMaxWidth()) {
            Text(stringResource(R.string.cr_keep_screen_on), style = MaterialTheme.typography.bodyLarge, modifier = Modifier.weight(1f))
            Switch(checked = settings.keepScreenOn, enabled = enabled, onCheckedChange = { onChange(settings.copy(keepScreenOn = it)) })
        }
    }
}

@Composable
private fun BackgroundSwatch(label: String, color: Color, selected: Boolean, enabled: Boolean, onClick: () -> Unit) {
    Column(horizontalAlignment = Alignment.CenterHorizontally) {
        Box(
            modifier = Modifier
                .size(40.dp)
                .clip(CircleShape)
                .background(color)
                .border(
                    width = if (selected) 3.dp else 1.dp,
                    color = if (selected) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.outline,
                    shape = CircleShape,
                )
                .clickable(enabled = enabled, onClick = onClick),
        )
        Text(label, style = MaterialTheme.typography.bodySmall)
    }
}
