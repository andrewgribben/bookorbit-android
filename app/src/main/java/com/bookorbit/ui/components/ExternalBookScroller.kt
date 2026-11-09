package com.bookorbit.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalUriHandler
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.runtime.LaunchedEffect
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import coil.compose.AsyncImage
import com.bookorbit.R
import com.bookorbit.core.model.ReadingServiceShelfItem
import com.bookorbit.core.model.externalShelfLabelRes

/**
 * A titled horizontal row of books that live on an external reading service (Readwise/Hardcover),
 * not necessarily the local library. Mirrors [HorizontalBookScroller]'s layout so it reads as a
 * sibling shelf, with one difference: a tap either opens the matched local book ([onBookClick])
 * when [ReadingServiceShelfItem.bookId] is set, or offers a choice ("View in <Provider>" / "Add
 * to requests") when it isn't - see [ExternalBookRequestViewModel].
 */
@Composable
fun ExternalBookScroller(
    shelfId: String,
    books: List<ReadingServiceShelfItem>,
    onBookClick: (Int) -> Unit,
    modifier: Modifier = Modifier,
    requestViewModel: ExternalBookRequestViewModel = hiltViewModel(),
) {
    val uriHandler = LocalUriHandler.current
    val context = LocalContext.current
    val chooser by requestViewModel.chooser.collectAsStateWithLifecycle()
    val requesting by requestViewModel.requesting.collectAsStateWithLifecycle()
    val message by requestViewModel.message.collectAsStateWithLifecycle()

    LaunchedEffect(message) {
        message?.let {
            android.widget.Toast.makeText(context, it.resolve(context), android.widget.Toast.LENGTH_SHORT).show()
            requestViewModel.consumeMessage()
        }
    }

    Column(modifier = modifier.padding(top = 12.dp)) {
        Text(
            stringResource(externalShelfLabelRes(shelfId)),
            style = MaterialTheme.typography.titleMedium,
            fontWeight = FontWeight.SemiBold,
            modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp),
        )
        LazyRow(contentPadding = PaddingValues(horizontal = 12.dp)) {
            items(books, key = { it.externalId ?: it.externalUrl ?: it.title.orEmpty() }) { card ->
                val state = chooser?.takeIf { it.card === card }
                ExternalBookTile(
                    card = card,
                    chooserState = state,
                    requesting = requesting && state is ExternalBookRequestViewModel.ChooserState.Ready,
                    onClick = {
                        val bookId = card.bookId
                        if (bookId != null) {
                            onBookClick(bookId)
                        } else {
                            requestViewModel.openChooser(card, onOwned = onBookClick)
                        }
                    },
                    onDismissChooser = requestViewModel::dismissChooser,
                    onViewExternal = {
                        requestViewModel.dismissChooser()
                        card.externalUrl?.let { runCatching { uriHandler.openUri(it) } }
                    },
                    onAddToRequests = { requestViewModel.addToRequests(card) },
                    modifier = Modifier.width(120.dp).padding(horizontal = 4.dp),
                )
            }
        }
    }
}

/**
 * One external-book tile. The cover-missing fallback uses the same fixed 2:3 aspect ratio as a
 * real cover (per the approved mockup's visual-review note), so title/author below always sit at
 * the same baseline across a mixed row of real and fallback cards. [chooserState] non-null opens
 * the "View in <Provider>" / "Add to requests" menu anchored to this tile.
 */
@Composable
private fun ExternalBookTile(
    card: ReadingServiceShelfItem,
    chooserState: ExternalBookRequestViewModel.ChooserState?,
    requesting: Boolean,
    onClick: () -> Unit,
    onDismissChooser: () -> Unit,
    onViewExternal: () -> Unit,
    onAddToRequests: () -> Unit,
    modifier: Modifier = Modifier,
) {
    Box(modifier = modifier) {
        Column(
            modifier = Modifier
                .clip(RoundedCornerShape(8.dp))
                .background(MaterialTheme.colorScheme.surface)
                .clickable(onClick = onClick),
        ) {
            Box(modifier = Modifier.fillMaxWidth().aspectRatio(2f / 3f)) {
                if (card.coverUrl != null) {
                    AsyncImage(
                        model = card.coverUrl,
                        contentDescription = card.title,
                        contentScale = ContentScale.Crop,
                        modifier = Modifier.fillMaxSize(),
                    )
                } else {
                    Box(
                        modifier = Modifier
                            .fillMaxSize()
                            .background(MaterialTheme.colorScheme.surfaceVariant)
                            .padding(8.dp),
                        contentAlignment = Alignment.Center,
                    ) {
                        Text(
                            card.title ?: stringResource(R.string.card_unknown),
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant,
                            maxLines = 3,
                            overflow = TextOverflow.Ellipsis,
                        )
                    }
                }
            }
            Column(modifier = Modifier.padding(6.dp)) {
                Text(
                    card.title ?: stringResource(R.string.card_unknown_title),
                    style = MaterialTheme.typography.labelMedium,
                    fontWeight = FontWeight.SemiBold,
                    maxLines = 2,
                    overflow = TextOverflow.Ellipsis,
                )
                card.authorText?.let {
                    Text(
                        it,
                        style = MaterialTheme.typography.labelSmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                        maxLines = 1,
                        overflow = TextOverflow.Ellipsis,
                    )
                }
            }
        }

        DropdownMenu(expanded = chooserState != null, onDismissRequest = onDismissChooser) {
            when (chooserState) {
                null -> Unit
                is ExternalBookRequestViewModel.ChooserState.Loading -> {
                    Box(modifier = Modifier.padding(16.dp), contentAlignment = Alignment.Center) {
                        CircularProgressIndicator(modifier = Modifier.width(24.dp))
                    }
                }
                is ExternalBookRequestViewModel.ChooserState.Ready -> {
                    if (card.externalUrl != null) {
                        DropdownMenuItem(
                            text = {
                                Text(
                                    stringResource(
                                        R.string.external_book_view_in_provider,
                                        card.provider.orEmpty().replaceFirstChar(Char::uppercase),
                                    ),
                                )
                            },
                            onClick = onViewExternal,
                        )
                    }
                    if (chooserState.canRequest) {
                        if (chooserState.alreadyRequested) {
                            DropdownMenuItem(
                                text = { Text(stringResource(R.string.external_book_already_requested)) },
                                onClick = {},
                                enabled = false,
                            )
                        } else {
                            DropdownMenuItem(
                                text = { Text(stringResource(R.string.external_book_add_to_requests)) },
                                onClick = onAddToRequests,
                                enabled = !requesting,
                            )
                        }
                    }
                }
            }
        }
    }
}
