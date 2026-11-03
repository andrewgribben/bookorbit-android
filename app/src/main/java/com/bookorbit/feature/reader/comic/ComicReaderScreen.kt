package com.bookorbit.feature.reader.comic

import com.bookorbit.ui.asString
import androidx.compose.ui.res.stringResource
import com.bookorbit.R
import androidx.compose.foundation.background
import androidx.compose.foundation.gestures.detectTapGestures
import androidx.compose.foundation.gestures.rememberTransformableState
import androidx.compose.foundation.gestures.transformable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.pager.HorizontalPager
import androidx.compose.foundation.pager.rememberPagerState
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.automirrored.filled.FormatTextdirectionLToR
import androidx.compose.material.icons.automirrored.filled.FormatTextdirectionRToL
import androidx.compose.material.icons.filled.Tune
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Slider
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableFloatStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberUpdatedState
import androidx.compose.runtime.setValue
import androidx.compose.runtime.snapshotFlow
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.layout.onSizeChanged
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.platform.LocalView
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import coil.compose.AsyncImage
import coil.request.ImageRequest
import com.bookorbit.ui.LocalImageUrls
import com.bookorbit.feature.reader.ReaderControlsSettings
import com.bookorbit.feature.reader.TapAction
import com.bookorbit.feature.reader.resolveTapAction
import kotlinx.coroutines.launch

private const val MAX_ZOOM = 4f

/**
 * Comic reader for CBZ, CBR and CB7: a pager/scroll strip over page images (from a downloaded CBZ,
 * or rendered by the server) driven by [ComicReaderSettings] (reading mode, page view, fit,
 * direction, spreads, background, keep screen on) - pinch-to-zoom, double-tap zoom and tap zones
 * to turn pages in Paged mode, a page slider, and the Configure sheet (Layout/Spreads/Theme).
 */
@Composable
fun ComicReaderScreen(
    onBack: () -> Unit,
    vm: ComicReaderViewModel = hiltViewModel(),
) {
    val ui by vm.ui.collectAsStateWithLifecycle()
    var chromeVisible by remember { mutableStateOf(true) }
    val settings = ui.effective

    val view = LocalView.current
    DisposableEffect(settings.keepScreenOn) {
        view.keepScreenOn = settings.keepScreenOn
        onDispose { view.keepScreenOn = false }
    }

    // Volume keys and hardware arrows turn pages while this screen is showing (task 2); the
    // actual handler is whatever the current scroll mode's composable below installs (pager vs.
    // scroll-by-one-screen), via this shared ref.
    val pageTurnHandler = remember { mutableStateOf<(com.bookorbit.feature.reader.PageTurnKey) -> Unit>({}) }
    DisposableEffect(Unit) {
        val onPageTurn: (com.bookorbit.feature.reader.PageTurnKey) -> Unit = { turn -> pageTurnHandler.value(turn) }
        com.bookorbit.feature.reader.ReaderKeyBindings.enter(onPageTurn)
        onDispose { com.bookorbit.feature.reader.ReaderKeyBindings.leave(onPageTurn) }
    }
    LaunchedEffect(ui.controlsSettings.volumeKeysTurnPages) {
        com.bookorbit.feature.reader.ReaderKeyBindings.setVolumeKeysEnabled(ui.controlsSettings.volumeKeysTurnPages)
    }

    val backgroundColor = comicBackgroundColor(settings)

    Box(Modifier.fillMaxSize().background(backgroundColor)) {
        when {
            ui.loading -> CircularProgressIndicator(Modifier.align(Alignment.Center))
            ui.error != null -> Column(Modifier.align(Alignment.Center).padding(32.dp), horizontalAlignment = Alignment.CenterHorizontally) {
                Text(ui.error?.asString().orEmpty(), color = Color.White)
                Row(Modifier.padding(top = 16.dp)) {
                    Button(onClick = vm::load) { Text(stringResource(R.string.retry)) }
                    Button(onClick = onBack, modifier = Modifier.padding(start = 12.dp)) { Text(stringResource(R.string.back)) }
                }
            }
            else -> ComicPages(ui, settings, vm, onToggleChrome = { chromeVisible = !chromeVisible }, pageTurnHandler = pageTurnHandler)
        }

        if (chromeVisible) {
            Row(
                Modifier
                    .fillMaxWidth()
                    .background(Color(0xCC0A0A0A))
                    .statusBarsPadding()
                    .padding(horizontal = 4.dp, vertical = 4.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                IconButton(onClick = onBack) { Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = stringResource(R.string.back), tint = Color.White) }
                Text(ui.title.orEmpty(), color = Color.White, maxLines = 1, overflow = TextOverflow.Ellipsis, modifier = Modifier.weight(1f))
                IconButton(onClick = vm::toggleDirection) {
                    Icon(
                        if (settings.direction == ComicDirection.RTL) Icons.AutoMirrored.Filled.FormatTextdirectionRToL else Icons.AutoMirrored.Filled.FormatTextdirectionLToR,
                        contentDescription = stringResource(if (settings.direction == ComicDirection.RTL) R.string.comic_dir_rtl else R.string.comic_dir_ltr),
                        tint = Color.White,
                    )
                }
                IconButton(onClick = vm::openConfigureSheet) {
                    Icon(Icons.Filled.Tune, contentDescription = stringResource(R.string.cr_configure), tint = Color.White)
                }
            }
        }
    }

    if (ui.showConfigureSheet) {
        ComicReaderSettingsSheet(
            scope = ui.scope,
            onScopeChange = vm::setScope,
            globalSettings = ui.globalSettings,
            bookState = ui.bookState,
            onUseGlobalChange = vm::setUseGlobal,
            onSettingsChange = { vm.updateSettings(ui.scope, it) },
            onSaveAsDefault = { vm.saveAsDefault(ui.scope) },
            onResetToSavedDefault = { vm.resetToSavedDefault(ui.scope) },
            onRestoreBuiltIn = { vm.restoreBuiltInDefaults(ui.scope) },
            controlsSettings = ui.controlsSettings,
            onControlsSettingsChange = vm::updateControlsSettings,
            onDismiss = vm::dismissConfigureSheet,
        )
    }
}

/** Background colours matching the web's `bgColor`, plus the app-only AMOLED True black. */
private fun comicBackgroundColor(settings: ComicReaderSettings): Color = when {
    settings.trueBlack -> Color(0xFF000000)
    settings.bgColor == ComicBgColor.GRAY -> Color(0xFF6B6F76)
    settings.bgColor == ComicBgColor.WHITE -> Color(0xFFFFFFFF)
    else -> Color(0xFF17181C)
}

private fun ComicFitMode.toContentScale(): ContentScale = when (this) {
    ComicFitMode.FIT_PAGE -> ContentScale.Fit
    ComicFitMode.FIT_WIDTH -> ContentScale.FillWidth
    ComicFitMode.FIT_HEIGHT -> ContentScale.FillHeight
    ComicFitMode.ACTUAL -> ContentScale.None
}

@Composable
private fun androidx.compose.foundation.layout.BoxScope.ComicPages(
    ui: ComicReaderViewModel.UiState,
    settings: ComicReaderSettings,
    vm: ComicReaderViewModel,
    onToggleChrome: () -> Unit,
    pageTurnHandler: androidx.compose.runtime.MutableState<(com.bookorbit.feature.reader.PageTurnKey) -> Unit>,
) {
    when (settings.scrollMode) {
        ComicScrollMode.PAGINATED -> ComicPagedPages(ui, settings, vm, onToggleChrome, pageTurnHandler)
        ComicScrollMode.INFINITE -> ComicScrollStrip(ui, settings, vm, gap = 16.dp, pageTurnHandler = pageTurnHandler)
        ComicScrollMode.LONG_STRIP -> ComicScrollStrip(ui, settings, vm, gap = 0.dp, pageTurnHandler = pageTurnHandler)
    }
}

/** Paged mode: a [HorizontalPager] over spread units (single or two-page), mirroring the web's
 * paginated CBZ reader. Two-page defaults on for the Fold/landscape via [effectiveTwoPage]. */
@Composable
private fun androidx.compose.foundation.layout.BoxScope.ComicPagedPages(
    ui: ComicReaderViewModel.UiState,
    settings: ComicReaderSettings,
    vm: ComicReaderViewModel,
    onToggleChrome: () -> Unit,
    pageTurnHandler: androidx.compose.runtime.MutableState<(com.bookorbit.feature.reader.PageTurnKey) -> Unit>,
) {
    val rtl = settings.direction == ComicDirection.RTL
    BoxWithConstraints(Modifier.fillMaxSize()) {
        val widthDp = with(LocalDensity.current) { constraints.maxWidth.toDp().value.toInt() }
        val isTwoPage = effectiveTwoPage(settings, widthDp)
        // Wide-page auto-detection (from each page's loaded image size, see
        // ComicReaderViewModel.markPageDimensions): recomputes pairing as pages are discovered to
        // be wide, keeping the anchor page that was on screen in view (no jump) - see the
        // pagerState sync LaunchedEffect below.
        val isWidePage: (Int) -> Boolean = remember(ui.widePages) { { page -> page in ui.widePages } }
        val layout = remember(ui.pageCount, isTwoPage, settings.direction, settings.spreadAlignment, settings.widePageSingletonMode, ui.widePages) {
            comicSpreadLayout(ui.pageCount, isTwoPage, settings.direction, settings.spreadAlignment, settings.widePageSingletonMode, isWidePage)
        }
        val spreads = layout.spreads
        val initialSpreadIndex = layout.spreadIndexForPage(ui.initialPage).coerceIn(0, (spreads.size - 1).coerceAtLeast(0))
        val pagerState = rememberPagerState(initialPage = initialSpreadIndex, pageCount = { spreads.size })
        val scope = androidx.compose.runtime.rememberCoroutineScope()
        var zoomed by remember { mutableStateOf(false) }
        // Keep the same anchor page in view when a wide-page discovery reshuffles spreads/indices.
        var lastAnchor by remember { mutableStateOf(ui.initialPage) }
        LaunchedEffect(layout) {
            val targetIndex = layout.spreadIndexForPage(lastAnchor).coerceIn(0, (spreads.size - 1).coerceAtLeast(0))
            if (targetIndex != pagerState.currentPage) pagerState.scrollToPage(targetIndex)
        }

        LaunchedEffect(pagerState, spreads) {
            snapshotFlow { pagerState.currentPage }.collect { index ->
                spreads.getOrNull(index)?.let {
                    lastAnchor = it.anchorPage
                    vm.onPageChanged(it.anchorPage)
                }
            }
        }
        LaunchedEffect(pagerState.currentPage) { zoomed = false }

        // Volume keys / hardware arrows (task 2): NEXT/PREVIOUS always move by one spread,
        // unmirrored for RTL (same rule as [resolveKeyPageTurn]'s doc comment).
        LaunchedEffect(pagerState, spreads.size) {
            pageTurnHandler.value = { turn ->
                scope.launch {
                    when (turn) {
                        com.bookorbit.feature.reader.PageTurnKey.NEXT ->
                            if (pagerState.currentPage < spreads.size - 1) pagerState.animateScrollToPage(pagerState.currentPage + 1)
                        com.bookorbit.feature.reader.PageTurnKey.PREVIOUS ->
                            if (pagerState.currentPage > 0) pagerState.animateScrollToPage(pagerState.currentPage - 1)
                    }
                }
            }
        }

        HorizontalPager(
            state = pagerState,
            modifier = Modifier.fillMaxSize(),
            reverseLayout = rtl,
            userScrollEnabled = !zoomed,
            beyondViewportPageCount = 1,
            key = { it },
        ) { spreadIndex ->
            val spread = spreads.getOrNull(spreadIndex)
            if (spread == null) return@HorizontalPager
            if (spread.kind == ComicSpreadKind.SINGLE || spread.pages.size == 1) {
                ZoomablePage(
                    source = checkNotNull(ui.source),
                    page = spread.pages.first(),
                    fitMode = settings.fitMode,
                    active = spreadIndex == pagerState.currentPage,
                    onZoomChanged = { if (spreadIndex == pagerState.currentPage) zoomed = it },
                    onTap = { xFraction, yFraction ->
                        handleTap(ui.controlsSettings, xFraction, yFraction, rtl, scope, pagerState, spreads.size, onToggleChrome)
                    },
                    onImageSize = { w, h -> vm.markPageDimensions(spread.pages.first(), w, h) },
                    doubleTapZoomEnabled = ui.controlsSettings.doubleTapZoomEnabled,
                )
            } else {
                Row(Modifier.fillMaxSize()) {
                    val ordered = if (rtl) spread.pages.reversed() else spread.pages
                    ordered.forEachIndexed { i, page ->
                        Box(Modifier.weight(1f).fillMaxHeight()) {
                            SpreadPageImage(
                                source = checkNotNull(ui.source),
                                page = page,
                                fitMode = settings.fitMode,
                                onImageSize = { w, h -> vm.markPageDimensions(page, w, h) },
                            )
                        }
                        if (i != ordered.lastIndex && settings.spreadGap > 0) {
                            Box(Modifier.width(settings.spreadGap.dp).fillMaxHeight())
                        }
                    }
                }
            }
        }

        Column(
            Modifier
                .align(Alignment.BottomCenter)
                .fillMaxWidth()
                .background(Color(0xCC0A0A0A))
                .navigationBarsPadding()
                .padding(horizontal = 16.dp, vertical = 6.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
        ) {
            if (spreads.size > 1) {
                var dragging by remember { mutableFloatStateOf(-1f) }
                val shown = if (dragging >= 0) dragging else pagerState.currentPage.toFloat()
                Slider(
                    value = shown,
                    onValueChange = { dragging = it },
                    onValueChangeFinished = {
                        val target = dragging.toInt()
                        dragging = -1f
                        scope.launch { pagerState.scrollToPage(target) }
                    },
                    valueRange = 0f..(spreads.size - 1).toFloat(),
                    modifier = Modifier.graphicsLayer { scaleX = if (rtl) -1f else 1f },
                )
            }
            val shownPage = (spreads.getOrNull(pagerState.currentPage)?.anchorPage ?: 0) + 1
            Text("$shownPage / ${ui.pageCount}", color = Color.White.copy(alpha = 0.85f))
        }
    }
}

/**
 * Resolves and applies a tap using the app-wide Controls settings (owner decisions 2/5),
 * replacing the reader's old hard-coded 30% left/right/centre zones: [controls] supplies the
 * zone layout preset, zone size, per-zone action overrides and the RTL-mirror rule - see
 * [com.bookorbit.feature.reader.resolveTapAction].
 */
private fun handleTap(
    controls: ReaderControlsSettings,
    xFraction: Float,
    yFraction: Float,
    rtl: Boolean,
    scope: kotlinx.coroutines.CoroutineScope,
    pagerState: androidx.compose.foundation.pager.PagerState,
    pageCount: Int,
    onToggleChrome: () -> Unit,
) {
    when (controls.resolveTapAction(xFraction, yFraction, rtl)) {
        TapAction.NEXT -> scope.launch { if (pagerState.currentPage < pageCount - 1) pagerState.animateScrollToPage(pagerState.currentPage + 1) }
        TapAction.PREVIOUS -> scope.launch { if (pagerState.currentPage > 0) pagerState.animateScrollToPage(pagerState.currentPage - 1) }
        TapAction.MENU -> onToggleChrome()
        TapAction.NOTHING -> Unit
    }
}

/** Infinite/No-gaps mode: a vertical strip of pages, [gap] apart, with pinch and double-tap zoom
 * over the whole strip (not per-page): both gestures scale/translate the list as a unit via
 * [graphicsLayer], and list scrolling is suspended while zoomed so a pan drag doesn't fight the
 * [LazyColumn]'s own scroll. The current page for progress is the topmost mostly-visible item. */
@OptIn(androidx.compose.foundation.ExperimentalFoundationApi::class)
@Composable
private fun androidx.compose.foundation.layout.BoxScope.ComicScrollStrip(
    ui: ComicReaderViewModel.UiState,
    settings: ComicReaderSettings,
    vm: ComicReaderViewModel,
    gap: androidx.compose.ui.unit.Dp,
    pageTurnHandler: androidx.compose.runtime.MutableState<(com.bookorbit.feature.reader.PageTurnKey) -> Unit>,
) {
    val listState = rememberLazyListState(initialFirstVisibleItemIndex = ui.initialPage)
    LaunchedEffect(listState) {
        snapshotFlow { listState.firstVisibleItemIndex }.collect { vm.onPageChanged(it) }
    }
    val scrollScope = androidx.compose.runtime.rememberCoroutineScope()
    // Volume keys / hardware arrows (task 2): "next/previous scrolls by one screen" in the
    // infinite modes - each item fills the viewport width end-to-end, so one item is one screen.
    LaunchedEffect(listState, ui.pageCount) {
        pageTurnHandler.value = { turn ->
            scrollScope.launch {
                when (turn) {
                    com.bookorbit.feature.reader.PageTurnKey.NEXT ->
                        listState.animateScrollToItem((listState.firstVisibleItemIndex + 1).coerceAtMost((ui.pageCount - 1).coerceAtLeast(0)))
                    com.bookorbit.feature.reader.PageTurnKey.PREVIOUS ->
                        listState.animateScrollToItem((listState.firstVisibleItemIndex - 1).coerceAtLeast(0))
                }
            }
        }
    }

    var scale by remember { mutableFloatStateOf(1f) }
    var offset by remember { mutableStateOf(Offset.Zero) }
    var size by remember { mutableStateOf(androidx.compose.ui.unit.IntSize.Zero) }

    fun clamp(o: Offset, s: Float): Offset {
        val maxX = (size.width * (s - 1f)) / 2f
        val maxY = (size.height * (s - 1f)) / 2f
        return Offset(o.x.coerceIn(-maxX, maxX), o.y.coerceIn(-maxY, maxY))
    }

    val transform = rememberTransformableState { zoomChange, panChange, _ ->
        scale = (scale * zoomChange).coerceIn(1f, MAX_ZOOM)
        offset = clamp(offset + panChange * scale, scale)
    }

    Box(
        Modifier
            .fillMaxSize()
            .onSizeChanged { size = it }
            .pointerInput(Unit) {
                detectTapGestures(
                    onDoubleTap = { pos ->
                        if (scale > 1.02f) {
                            scale = 1f
                            offset = Offset.Zero
                        } else {
                            scale = 2.5f
                            offset = clamp(Offset((size.width / 2f - pos.x) * 1.5f, (size.height / 2f - pos.y) * 1.5f), scale)
                        }
                    },
                )
            }
            .transformable(state = transform, canPan = { scale > 1.02f }),
    ) {
        LazyColumn(
            state = listState,
            userScrollEnabled = scale <= 1.02f,
            modifier = Modifier
                .fillMaxSize()
                .graphicsLayer {
                    scaleX = scale
                    scaleY = scale
                    translationX = offset.x
                    translationY = offset.y
                },
            verticalArrangement = Arrangement.spacedBy(gap),
        ) {
            items(count = ui.pageCount, key = { it }) { page ->
                StripPageImage(source = checkNotNull(ui.source), page = page, fitMode = settings.fitMode)
            }
        }
    }
}

@Composable
private fun StripPageImage(source: ComicPageSource, page: Int, fitMode: ComicFitMode) {
    val imageUrls = LocalImageUrls.current
    val context = LocalContext.current
    val model: Any = remember(source, page) { comicPageModel(source, page, imageUrls, context) }
    AsyncImage(
        model = model,
        contentDescription = stringResource(R.string.page, page + 1),
        contentScale = fitMode.toContentScale(),
        modifier = Modifier.fillMaxWidth(),
    )
}

@Composable
private fun SpreadPageImage(source: ComicPageSource, page: Int, fitMode: ComicFitMode, onImageSize: (Int, Int) -> Unit = { _, _ -> }) {
    val imageUrls = LocalImageUrls.current
    val context = LocalContext.current
    val model: Any = remember(source, page) { comicPageModel(source, page, imageUrls, context) }
    AsyncImage(
        model = model,
        contentDescription = stringResource(R.string.page, page + 1),
        contentScale = fitMode.toContentScale(),
        onSuccess = { state ->
            val drawable = state.result.drawable
            onImageSize(drawable.intrinsicWidth, drawable.intrinsicHeight)
        },
        modifier = Modifier.fillMaxSize(),
    )
}

private fun comicPageModel(source: ComicPageSource, page: Int, imageUrls: com.bookorbit.core.network.ImageUrls, context: android.content.Context): Any =
    when (source) {
        is ComicPageSource.Server -> imageUrls.comicPage(source.fileId, page)
        is ComicPageSource.Local -> LocalComicPage(source.archive, page).let { local ->
            ImageRequest.Builder(context)
                .data(local)
                .fetcherFactory(LocalComicPageFetcher.Factory)
                .memoryCacheKey(local.cacheKey)
                .build()
        }
    }

/** One page: fit-to-screen by [fitMode] by default, pinch or double-tap to zoom, drag to pan while zoomed. */
@OptIn(androidx.compose.foundation.ExperimentalFoundationApi::class)
@Composable
private fun ZoomablePage(
    source: ComicPageSource,
    page: Int,
    fitMode: ComicFitMode,
    active: Boolean,
    onZoomChanged: (Boolean) -> Unit,
    onTap: (Float, Float) -> Unit,
    onImageSize: (Int, Int) -> Unit = { _, _ -> },
    doubleTapZoomEnabled: Boolean = true,
) {
    val imageUrls = LocalImageUrls.current
    val context = LocalContext.current
    val model: Any = remember(source, page) { comicPageModel(source, page, imageUrls, context) }
    // The gesture block below is keyed on Unit and never restarts, so read these through State to
    // always see the latest lambdas (e.g. after the reading direction flips).
    val currentOnTap by rememberUpdatedState(onTap)
    val currentOnZoomChanged by rememberUpdatedState(onZoomChanged)
    val currentDoubleTapZoomEnabled by rememberUpdatedState(doubleTapZoomEnabled)
    var scale by remember { mutableFloatStateOf(1f) }
    var offset by remember { mutableStateOf(Offset.Zero) }
    var size by remember { mutableStateOf(androidx.compose.ui.unit.IntSize.Zero) }

    fun clamp(o: Offset, s: Float): Offset {
        val maxX = (size.width * (s - 1f)) / 2f
        val maxY = (size.height * (s - 1f)) / 2f
        return Offset(o.x.coerceIn(-maxX, maxX), o.y.coerceIn(-maxY, maxY))
    }

    val transform = rememberTransformableState { zoomChange, panChange, _ ->
        scale = (scale * zoomChange).coerceIn(1f, MAX_ZOOM)
        offset = clamp(offset + panChange * scale, scale)
        currentOnZoomChanged(scale > 1.02f)
    }
    // Leaving the page resets it, so coming back doesn't show a stale zoom.
    LaunchedEffect(active) {
        if (!active) {
            scale = 1f
            offset = Offset.Zero
        }
    }

    Box(
        Modifier
            .fillMaxSize()
            .pointerInput(Unit) {
                detectTapGestures(
                    onTap = { pos -> currentOnTap(pos.x / size.width.coerceAtLeast(1), pos.y / size.height.coerceAtLeast(1)) },
                    onDoubleTap = { pos ->
                        if (currentDoubleTapZoomEnabled) {
                            if (scale > 1.02f) {
                                scale = 1f
                                offset = Offset.Zero
                            } else {
                                scale = 2.5f
                                // Zoom toward the tapped point.
                                offset = clamp(Offset((size.width / 2f - pos.x) * 1.5f, (size.height / 2f - pos.y) * 1.5f), scale)
                            }
                            currentOnZoomChanged(scale > 1.02f)
                        }
                    },
                )
            }
            // Only claim drags while zoomed, so an un-zoomed swipe still reaches the pager.
            .transformable(state = transform, canPan = { scale > 1.02f }),
        contentAlignment = Alignment.Center,
    ) {
        AsyncImage(
            model = model,
            contentDescription = stringResource(R.string.page, page + 1),
            contentScale = fitMode.toContentScale(),
            onSuccess = { state ->
                val drawable = state.result.drawable
                onImageSize(drawable.intrinsicWidth, drawable.intrinsicHeight)
            },
            modifier = Modifier
                .fillMaxSize()
                .onSizeChanged { size = it }
                .graphicsLayer {
                    scaleX = scale
                    scaleY = scale
                    translationX = offset.x
                    translationY = offset.y
                },
        )
    }
}
