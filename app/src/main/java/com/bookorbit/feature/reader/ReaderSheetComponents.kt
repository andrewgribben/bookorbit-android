package com.bookorbit.feature.reader

import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Remove
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.bookorbit.R

/**
 * Small building blocks shared by every reader's Configure sheet (owner decision 6, stage 4 of
 * the comic-reader card): a section heading, a locked/explanatory tinted note, and the round
 * +/- stepper. Extracted verbatim from [ReaderSettingsSheet] so the ebook sheet's look is
 * unchanged, and reused as-is by the comic reader's own Configure sheet
 * (`ComicReaderSettingsSheet`) - same component language, each reader keeps its own tabs/content.
 */
@Composable
fun SectionLabel(text: String) {
    Text(text, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold)
}

@Composable
fun LockedOrHintNote(text: String) {
    Text(text, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
}

@Composable
fun SettingsStepper(label: String, value: String, enabled: Boolean = true, onDecrement: () -> Unit, onIncrement: () -> Unit) {
    Row(verticalAlignment = Alignment.CenterVertically) {
        Text(label, style = MaterialTheme.typography.bodyLarge, modifier = Modifier.weight(1f))
        IconButton(onClick = onDecrement, enabled = enabled) { Icon(Icons.Filled.Remove, contentDescription = stringResource(R.string.decrease_named, label)) }
        Text(value, style = MaterialTheme.typography.bodyLarge, modifier = Modifier.padding(horizontal = 8.dp))
        IconButton(onClick = onIncrement, enabled = enabled) { Icon(Icons.Filled.Add, contentDescription = stringResource(R.string.increase_named, label)) }
    }
}
