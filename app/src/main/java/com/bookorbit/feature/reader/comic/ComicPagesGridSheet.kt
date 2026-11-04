package com.bookorbit.feature.reader.comic

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.lazy.grid.rememberLazyGridState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.Text
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import coil.request.ImageRequest
import coil.size.Size
import com.bookorbit.R
import com.bookorbit.ui.LocalImageUrls

private const val THUMB_MIN_SIZE_DP = 96
/** Coil decode size cap for a grid thumbnail (task 2's "downsampled with size limits"): a real
 * comic page is typically ~2000x3000px - decoding at this cap avoids holding a full-res bitmap
 * per visible cell. Matches a phone's thumbnail cell comfortably at any density. */
private const val THUMB_DECODE_WIDTH_PX = 240
private const val THUMB_DECODE_HEIGHT_PX = 340

/**
 * Task 2: the Pages grid. A [ModalBottomSheet] (tall, not full screen - the brief calls for
 * either) of page thumbnails, adaptive-columned, Coil-downsampled per [THUMB_DECODE_WIDTH_PX]/
 * [THUMB_DECODE_HEIGHT_PX], built from the same [comicPageModel] the pager and strip use so it
 * works for both [ComicPageSource.Server] and [ComicPageSource.Local]. The current page is
 * highlighted and scrolled into view on open; tapping a thumbnail jumps there and closes.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ComicPagesGridSheet(
    pageCount: Int,
    currentPage: Int,
    source: ComicPageSource?,
    onSelectPage: (Int) -> Unit,
    onDismiss: () -> Unit,
) {
    if (source == null || pageCount <= 0) {
        LaunchedEffect(Unit) { onDismiss() }
        return
    }
    val sheetState = rememberModalBottomSheetState(skipPartiallyExpanded = true)
    val gridState = rememberLazyGridState()
    LaunchedEffect(currentPage, pageCount) {
        gridState.scrollToItem(currentPage.coerceIn(0, pageCount - 1))
    }

    ModalBottomSheet(
        onDismissRequest = onDismiss,
        sheetState = sheetState,
        modifier = Modifier.heightIn(min = 320.dp),
    ) {
        Text(
            stringResource(R.string.cr_pages_grid_title),
            style = MaterialTheme.typography.titleMedium,
            modifier = Modifier.padding(start = 16.dp, end = 16.dp, bottom = 8.dp),
        )
        LazyVerticalGrid(
            columns = GridCells.Adaptive(minSize = THUMB_MIN_SIZE_DP.dp),
            state = gridState,
            contentPadding = PaddingValues(12.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp),
            modifier = Modifier.fillMaxSize(),
        ) {
            items(count = pageCount, key = { it }) { page ->
                ComicPageThumbnail(
                    source = source,
                    page = page,
                    selected = page == currentPage,
                    onClick = { onSelectPage(page) },
                )
            }
        }
    }
}

@Composable
private fun ComicPageThumbnail(
    source: ComicPageSource,
    page: Int,
    selected: Boolean,
    onClick: () -> Unit,
) {
    val imageUrls = LocalImageUrls.current
    val context = LocalContext.current
    val pageLabel = stringResource(R.string.page, page + 1)
    Column(
        modifier = Modifier
            // At least the Material 48dp minimum touch target even on the smallest adaptive cell.
            .heightIn(min = THUMB_MIN_SIZE_DP.dp)
            .clickable(onClick = onClick),
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .aspectRatio(0.72f)
                .clip(RoundedCornerShape(6.dp))
                .border(
                    width = if (selected) 2.dp else 1.dp,
                    color = if (selected) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.outlineVariant,
                    shape = RoundedCornerShape(6.dp),
                )
                .background(MaterialTheme.colorScheme.surfaceVariant),
        ) {
            AsyncImage(
                model = thumbnailModel(source, page, imageUrls, context),
                contentDescription = pageLabel,
                contentScale = ContentScale.Crop,
                modifier = Modifier.fillMaxSize(),
            )
        }
        Text(
            "${page + 1}",
            style = MaterialTheme.typography.labelSmall,
            color = if (selected) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.onSurfaceVariant,
            modifier = Modifier.padding(top = 2.dp, bottom = 4.dp),
        )
    }
}

/** [comicPageModel] wrapped with a decode-size cap for the grid's thumbnails (works for both
 * [ComicPageSource.Server], where Coil's own HTTP model takes a `.size()`, and
 * [ComicPageSource.Local], which already builds its own [ImageRequest]). */
private fun thumbnailModel(
    source: ComicPageSource,
    page: Int,
    imageUrls: com.bookorbit.core.network.ImageUrls,
    context: android.content.Context,
): Any {
    val size = Size(THUMB_DECODE_WIDTH_PX, THUMB_DECODE_HEIGHT_PX)
    return when (val model = comicPageModel(source, page, imageUrls, context)) {
        is ImageRequest -> model.newBuilder().size(size).build()
        else -> ImageRequest.Builder(context).data(model).size(size).build()
    }
}
