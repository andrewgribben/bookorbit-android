package com.bookorbit.feature.reader.comic

import androidx.activity.compose.BackHandler
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.windowInsetsPadding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.MenuBook
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import com.bookorbit.R
import com.bookorbit.ui.LocalImageUrls

/**
 * The comic reader's end-of-issue card (task "Next in series"/auto-advance): shown once
 * [ComicReaderViewModel.onEndReached] fires, it carries the next book in the series through to
 * its "Open" action, plus a dismiss/back control. While the lookup is in flight it shows a small
 * spinner; when there is no next book it falls back to a short end state with just "Back to book".
 * Matches the approved mockups' bottom banner style (`comic-mockups.html`, "14. End of issue").
 */
@Composable
fun ComicNextInSeriesCard(
    loading: Boolean,
    nextBook: NextSeriesBook?,
    autoAdvanceSecondsLeft: Int?,
    insets: WindowInsets,
    onOpen: () -> Unit,
    onCancelAutoAdvance: () -> Unit,
    onDismiss: () -> Unit,
    modifier: Modifier = Modifier,
) {
    BackHandler(onBack = onDismiss)
    Surface(
        modifier = modifier
            .windowInsetsPadding(insets)
            .padding(bottom = 72.dp)
            .padding(horizontal = 12.dp)
            .fillMaxWidth(),
        shape = RoundedCornerShape(16.dp),
        color = Color(0xF50A0A0C),
        contentColor = Color.White,
    ) {
        when {
            loading -> Row(
                modifier = Modifier.padding(16.dp).fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.Center,
            ) {
                CircularProgressIndicator(modifier = Modifier.height(20.dp).width(20.dp), color = Color.White, strokeWidth = 2.dp)
            }
            nextBook == null -> Column(modifier = Modifier.padding(16.dp).fillMaxWidth()) {
                Text(stringResource(R.string.cr_next_end_title), style = MaterialTheme.typography.titleSmall, color = Color.White)
                TextButton(onClick = onDismiss, modifier = Modifier.padding(top = 4.dp)) {
                    Text(stringResource(R.string.cr_next_back_to_book), color = Color(0xFF8AB4FF))
                }
            }
            else -> Row(modifier = Modifier.padding(14.dp).fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
                if (nextBook.hasCover) {
                    val imageUrls = LocalImageUrls.current
                    AsyncImage(
                        model = imageUrls.cover(nextBook.id),
                        contentDescription = null,
                        contentScale = ContentScale.Crop,
                        modifier = Modifier.width(52.dp).height(72.dp).clip(RoundedCornerShape(6.dp)),
                    )
                } else {
                    Box(
                        modifier = Modifier.width(52.dp).height(72.dp).clip(RoundedCornerShape(6.dp)).background(Color(0xFF2B2E33)),
                        contentAlignment = Alignment.Center,
                    ) {
                        Icon(Icons.Filled.MenuBook, contentDescription = null, tint = Color.White.copy(alpha = 0.6f))
                    }
                }
                Column(modifier = Modifier.weight(1f).padding(start = 12.dp, end = 8.dp)) {
                    Text(
                        stringResource(R.string.cr_next_in_series),
                        style = MaterialTheme.typography.labelSmall,
                        color = Color.White.copy(alpha = 0.7f),
                    )
                    Text(
                        nextBookLabel(nextBook),
                        style = MaterialTheme.typography.bodyMedium,
                        fontWeight = androidx.compose.ui.text.font.FontWeight.Bold,
                        maxLines = 2,
                        overflow = TextOverflow.Ellipsis,
                        modifier = Modifier.padding(top = 2.dp, bottom = 8.dp),
                    )
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Button(onClick = onOpen) { Text(stringResource(R.string.cr_next_open)) }
                        TextButton(onClick = onDismiss, modifier = Modifier.padding(start = 4.dp)) {
                            Text(stringResource(R.string.cr_next_back_to_book), color = Color.White.copy(alpha = 0.8f))
                        }
                    }
                    if (autoAdvanceSecondsLeft != null) {
                        Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.padding(top = 6.dp)) {
                            Text(
                                stringResource(R.string.cr_next_auto_advance_countdown, autoAdvanceSecondsLeft),
                                style = MaterialTheme.typography.labelSmall,
                                color = Color.White.copy(alpha = 0.6f),
                            )
                            TextButton(onClick = onCancelAutoAdvance, modifier = Modifier.padding(start = 4.dp)) {
                                Text(stringResource(R.string.cancel), color = Color(0xFF8AB4FF))
                            }
                        }
                    }
                }
            }
        }
    }
}

/** "#N Title" when the next book has a series index, else just its title (or a placeholder for
 * an untitled book) - mirrors the web's `reader.cbz.nextIssue.numbered`/`untitled`. */
@Composable
private fun nextBookLabel(nextBook: NextSeriesBook): String {
    val title = nextBook.title ?: stringResource(R.string.cr_next_untitled)
    val index = nextBook.seriesIndex ?: return title
    val indexLabel = if (index == index.toLong().toDouble()) index.toLong().toString() else index.toString()
    return stringResource(R.string.cr_next_numbered, indexLabel, title)
}
