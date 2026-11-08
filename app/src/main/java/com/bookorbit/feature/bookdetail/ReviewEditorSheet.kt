package com.bookorbit.feature.bookdetail

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import com.bookorbit.R
import com.bookorbit.ui.components.StarRating

private const val REVIEW_MAX_LENGTH = 10_000

/**
 * The book review editor sheet, extending [ReadStatusSheet]'s Material 3 bottom-sheet pattern.
 * Carries the star rating alongside the review text, matching the approved mockup
 * (`book-review-editor.html`'s Android sheet frame): one sheet, two synced fields, a live
 * character counter that turns to the error colour near the 10,000-character server-side limit.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ReviewEditorSheet(
    rating: Double?,
    review: String?,
    canRate: Boolean,
    saving: Boolean,
    onRatingChange: (Int?) -> Unit,
    onSave: (String?) -> Unit,
    onDismiss: () -> Unit,
) {
    var text by rememberSaveable { mutableStateOf(review.orEmpty()) }

    ModalBottomSheet(onDismissRequest = onDismiss) {
        Column(modifier = Modifier.padding(horizontal = 20.dp, vertical = 8.dp)) {
            Text(stringResource(R.string.review_edit), style = MaterialTheme.typography.titleMedium)

            Row(modifier = Modifier.padding(top = 16.dp)) {
                StarRating(value = rating, onChange = if (canRate) onRatingChange else null, enabled = !saving)
            }

            OutlinedTextField(
                value = text,
                onValueChange = { if (it.length <= REVIEW_MAX_LENGTH) text = it },
                placeholder = { Text(stringResource(R.string.review_placeholder)) },
                enabled = !saving,
                minLines = 4,
                maxLines = 8,
                modifier = Modifier.fillMaxWidth().padding(top = 16.dp),
            )
            Text(
                stringResource(R.string.review_char_count, text.length, REVIEW_MAX_LENGTH),
                style = MaterialTheme.typography.labelSmall,
                color = if (text.length >= REVIEW_MAX_LENGTH * 98 / 100) {
                    MaterialTheme.colorScheme.error
                } else {
                    MaterialTheme.colorScheme.onSurfaceVariant
                },
                modifier = Modifier.padding(top = 4.dp),
            )
            Text(
                stringResource(R.string.review_synced_hint),
                style = MaterialTheme.typography.labelSmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                modifier = Modifier.padding(top = 8.dp),
            )

            Row(modifier = Modifier.fillMaxWidth().padding(top = 20.dp, bottom = 12.dp), horizontalArrangement = androidx.compose.foundation.layout.Arrangement.End) {
                Button(onClick = { onSave(text.ifBlank { null }) }, enabled = !saving) {
                    if (saving) {
                        CircularProgressIndicator(modifier = Modifier.height(18.dp).padding(end = 4.dp), strokeWidth = 2.dp)
                    }
                    Text(stringResource(R.string.review_save))
                }
            }
        }
    }
}
