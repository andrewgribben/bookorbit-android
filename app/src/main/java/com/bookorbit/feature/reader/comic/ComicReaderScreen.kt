package com.bookorbit.feature.reader.comic

import com.bookorbit.ui.asString
import androidx.compose.ui.res.stringResource
import com.bookorbit.R
import com.bookorbit.feature.reader.PeekToggle
import androidx.compose.foundation.background
import androidx.compose.foundation.gestures.animateScrollBy
import androidx.compose.foundation.gestures.detectTapGestures
import androidx.compose.foundation.gestures.rememberTransformableState
import androidx.compose.foundation.gestures.transformable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.displayCutout
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.navigationBarsIgnoringVisibility
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.statusBarsIgnoringVisibility
import androidx.compose.foundation.layout.union
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.widthIn
import androidx.compose.foundation.layout.windowInsetsPadding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.pager.HorizontalPager
import androidx.compose.foundation.pager.rememberPagerState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.automirrored.filled.FormatTextdirectionLToR
import androidx.compose.material.icons.automirrored.filled.FormatTextdirectionRToL
import androidx.compose.material.icons.automirrored.filled.KeyboardArrowLeft
import androidx.compose.material.icons.automirrored.filled.KeyboardArrowRight
import androidx.compose.material.icons.filled.GridView
import androidx.compose.material.icons.filled.SkipNext
import androidx.compose.material.icons.filled.SkipPrevious
import androidx.compose.material.icons.filled.Tune
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Slider
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableFloatStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberUpdatedState
import androidx.compose.runtime.saveable.rememberSaveable
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
import com.bookorbit.feature.reader.ReaderSystemBarsEffect
import com.bookorbit.feature.reader.TapAction
import com.bookorbit.feature.reader.resolveTapAction
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

private const val MAX_ZOOM = 4f
private const val MIN_TAP_TARGET_DP = 48
private const val RESUME_NOTE_AUTO_DISMISS_MS = 5_000L

/**
 * Current navigation position for the comic reader's bottom bar: both the slider's own index
 * space (spread index in Paged mode, item index in the infinite modes - see [onSeek]) and the
 * page-counter label text, published by whichever page composable ([ComicPagedPages] or
 * [ComicScrollStrip]) is active, mirroring the [androidx.compose.runtime.MutableState]-ref
 * pattern already used for [com.bookorbit.feature.reader.PageTurnKey] below.
 */
private data class ComicNavState(
    val position: Float = 0f,
    val maxPosition: Float = 0f,
    val label: String = "",
    val onSeek: (Int) -> Unit = {},
)

/**
 * Comic reader for CBZ, CBR and CB7: a pager/scroll strip over page images (from a downloaded CBZ,
 * or rendered by the server) driven by [ComicReaderSettings] (reading mode, page view, fit,
 * direction, spreads, background, keep screen on) - pinch-to-zoom, double-tap zoom and tap zones
 * to turn pages in Paged mode, a page slider, and the Configure sheet (Layout/Spreads/Theme).
 *
 * Chrome (task 1): a top bar (back, title + "Page N of M" subtitle, direction toggle, Pages grid,
 * Configure) and a bottom bar (first/previous/slider/next/last + "N / M"), both insets-aware for
 * display cutouts (e.g. the Fold's inner-screen punch-hole). The "Show menu" tap action toggles
 * both bars AND the system bars immersively, via the same [ReaderSystemBarsEffect] the ebook
 * reader uses. Task 2 adds the Pages thumbnail grid ([ComicPagesGridSheet]) and the transient
 * "Resumed at page N" note with a Start over action.
 */
@Composable
@OptIn(androidx.compose.foundation.layout.ExperimentalLayoutApi::class)
fun ComicReaderScreen(
    onBack: () -> Unit,
    fullscreen: Boolean = false,
    onOpenNextBook: (bookId: Int, target: com.bookorbit.core.model.BookFiles.ReadingTarget) -> Unit = { _, _ -> },
    vm: ComicReaderViewModel = hiltViewModel(),
) {
    val ui by vm.ui.collectAsStateWithLifecycle()
    LaunchedEffect(ui.openNextBookRequest) {
        val request = ui.openNextBookRequest ?: return@LaunchedEffect
        onOpenNextBook(request.bookId, request.target)
        vm.consumeOpenNextBookRequest()
    }
    var chromeVisible by remember { mutableStateOf(true) }
    val settings = ui.effective

    val view = LocalView.current
    DisposableEffect(settings.keepScreenOn) {
        view.keepScreenOn = settings.keepScreenOn
        onDispose { view.keepScreenOn = false }
    }

    // The "Show/hide toolbars" tap action toggles the reader's own chrome and Android's system bars together,
    // exactly like the ebook reader (ReaderScreen.kt) - see readerWantsSystemBarsVisible for the
    // precise rule. ReaderDestination no longer applies its own screen-agnostic immersive effect
    // for the comic reader now that this screen owns it directly.
    ReaderSystemBarsEffect(fullscreen = fullscreen, chromeVisible = chromeVisible)

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

    // First/last (task 1) and the Pages grid + resume note's "jump to page N" (task 2) all share
    // this one 0-based page request, consumed by whichever page composable is active below.
    val jumpToPage = remember { mutableStateOf<Int?>(null) }
    val nav = remember { mutableStateOf(ComicNavState()) }

    // Pressing Pages (task 1's top bar) opens the grid, wired to ComicPagesGridSheet below.
    var showPagesGrid by remember { mutableStateOf(false) }
    // The resume note only ever makes sense for the page the book actually opened on - keyed on
    // the loaded fileId so a different book opened in the same screen instance gets its own note.
    var resumeNoteDismissed by rememberSaveable(ui.fileId) { mutableStateOf(false) }
    val showResumeNote = !ui.loading && ui.error == null && ui.initialPage > 0 && !resumeNoteDismissed

    val backgroundColor = comicBackgroundColor(settings)

    // Bars must clear both the status/navigation bars AND the display cutout (camera punch-hole)
    // - see ReaderScreen.kt's identical comment for why plain statusBarsPadding() isn't enough on
    // the Fold's inner screen.
    val topBarInsets = WindowInsets.statusBarsIgnoringVisibility.union(WindowInsets.displayCutout)
    val bottomBarInsets = WindowInsets.navigationBarsIgnoringVisibility.union(WindowInsets.displayCutout)

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
            else -> ComicPages(
                ui = ui,
                settings = settings,
                vm = vm,
                onToggleChrome = { chromeVisible = !chromeVisible },
                pageTurnHandler = pageTurnHandler,
                jumpToPage = jumpToPage,
                nav = nav,
            )
        }

        if (chromeVisible && ui.error == null) {
            ComicTopBar(
                title = ui.title.orEmpty(),
                pageSubtitle = stringResource(R.string.cr_page_of, comicPageRangeLabel(listOf(ui.currentPage)), ui.pageCount.coerceAtLeast(1)),
                direction = settings.direction,
                insets = topBarInsets,
                onBack = onBack,
                onToggleDirection = vm::toggleDirection,
                onOpenPagesGrid = { showPagesGrid = true },
                onOpenConfigure = vm::openConfigureSheet,
                peek = ui.peek,
                onStartReading = vm::startReading,
            )

            ComicBottomBar(
                nav = nav.value,
                rtl = settings.direction == ComicDirection.RTL,
                insets = bottomBarInsets,
                onFirst = { jumpToPage.value = 0 },
                onPrevious = { pageTurnHandler.value(com.bookorbit.feature.reader.PageTurnKey.PREVIOUS) },
                onNext = { pageTurnHandler.value(com.bookorbit.feature.reader.PageTurnKey.NEXT) },
                onLast = { jumpToPage.value = (ui.pageCount - 1).coerceAtLeast(0) },
                modifier = Modifier.align(Alignment.BottomCenter),
            )
        }

        if (showResumeNote) {
            ResumeNote(
                page = ui.initialPage + 1,
                insets = bottomBarInsets,
                onStartOver = {
                    jumpToPage.value = 0
                    resumeNoteDismissed = true
                },
                onDismiss = { resumeNoteDismissed = true },
                modifier = Modifier.align(Alignment.BottomCenter),
            )
        }

        if (ui.nextBookCardVisible) {
            ComicNextInSeriesCard(
                loading = ui.nextBookLoading,
                nextBook = ui.nextBook,
                autoAdvanceSecondsLeft = ui.autoAdvanceSecondsLeft,
                insets = bottomBarInsets,
                onOpen = vm::openNextBook,
                onCancelAutoAdvance = vm::cancelAutoAdvance,
                onDismiss = vm::dismissNextBookCard,
                modifier = Modifier.align(Alignment.BottomCenter),
            )
        }
    }

    if (showPagesGrid) {
        ComicPagesGridSheet(
            pageCount = ui.pageCount,
            currentPage = ui.currentPage,
            source = ui.source,
            onSelectPage = { page ->
                jumpToPage.value = page
                showPagesGrid = false
            },
            onDismiss = { showPagesGrid = false },
        )
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

/** Top bar: Back, title + "Page N of M" subtitle, direction toggle, Pages grid, Configure. */
@Composable
private fun ComicTopBar(
    title: String,
    pageSubtitle: String,
    direction: ComicDirection,
    insets: WindowInsets,
    onBack: () -> Unit,
    onToggleDirection: () -> Unit,
    onOpenPagesGrid: () -> Unit,
    onOpenConfigure: () -> Unit,
    peek: Boolean = false,
    onStartReading: () -> Unit = {},
) {
    Row(
        Modifier
            .fillMaxWidth()
            .background(Color(0xCC0A0A0A))
            .windowInsetsPadding(insets)
            .padding(horizontal = 4.dp, vertical = 4.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        IconButton(onClick = onBack, modifier = Modifier.minTapTarget()) {
            Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = stringResource(R.string.back), tint = Color.White)
        }
        Column(Modifier.weight(1f).padding(horizontal = 4.dp)) {
            Text(title, color = Color.White, maxLines = 1, overflow = TextOverflow.Ellipsis)
            Text(
                pageSubtitle,
                color = Color.White.copy(alpha = 0.75f),
                maxLines = 1,
                overflow = TextOverflow.Ellipsis,
                style = MaterialTheme.typography.labelSmall,
            )
        }
        if (peek) PeekToggle(onTurnOff = onStartReading)
        IconButton(onClick = onToggleDirection, modifier = Modifier.minTapTarget()) {
            Icon(
                if (direction == ComicDirection.RTL) Icons.AutoMirrored.Filled.FormatTextdirectionRToL else Icons.AutoMirrored.Filled.FormatTextdirectionLToR,
                contentDescription = stringResource(if (direction == ComicDirection.RTL) R.string.comic_dir_rtl else R.string.comic_dir_ltr),
                tint = Color.White,
            )
        }
        IconButton(onClick = onOpenPagesGrid, modifier = Modifier.minTapTarget()) {
            Icon(Icons.Filled.GridView, contentDescription = stringResource(R.string.cr_pages), tint = Color.White)
        }
        IconButton(onClick = onOpenConfigure, modifier = Modifier.minTapTarget()) {
            Icon(Icons.Filled.Tune, contentDescription = stringResource(R.string.cr_configure), tint = Color.White)
        }
    }
}

/** Bottom bar: first, previous, slider (mirrored for RTL), next, last, "N / M". Shared by Paged
 * and both infinite modes via [ComicNavState], published by whichever is active. */
@Composable
private fun ComicBottomBar(
    nav: ComicNavState,
    rtl: Boolean,
    insets: WindowInsets,
    onFirst: () -> Unit,
    onPrevious: () -> Unit,
    onNext: () -> Unit,
    onLast: () -> Unit,
    modifier: Modifier = Modifier,
) {
    Column(
        modifier
            .fillMaxWidth()
            .background(Color(0xCC0A0A0A))
            .windowInsetsPadding(insets)
            .padding(horizontal = 8.dp, vertical = 4.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.fillMaxWidth()) {
            IconButton(onClick = onFirst, modifier = Modifier.minTapTarget()) {
                Icon(Icons.Filled.SkipPrevious, contentDescription = stringResource(R.string.cr_first_page), tint = Color.White)
            }
            IconButton(onClick = onPrevious, modifier = Modifier.minTapTarget()) {
                Icon(Icons.AutoMirrored.Filled.KeyboardArrowLeft, contentDescription = stringResource(R.string.cr_previous_page), tint = Color.White)
            }
            var dragging by remember { mutableFloatStateOf(-1f) }
            val shown = if (dragging >= 0) dragging else nav.position
            Slider(
                value = shown.coerceIn(0f, nav.maxPosition.coerceAtLeast(0f)),
                onValueChange = { dragging = it },
                onValueChangeFinished = {
                    nav.onSeek(dragging.toInt())
                    dragging = -1f
                },
                valueRange = 0f..nav.maxPosition.coerceAtLeast(0f),
                enabled = nav.maxPosition > 0f,
                modifier = Modifier
                    .weight(1f)
                    .heightIn(min = MIN_TAP_TARGET_DP.dp)
                    .graphicsLayer { scaleX = if (rtl) -1f else 1f },
            )
            IconButton(onClick = onNext, modifier = Modifier.minTapTarget()) {
                Icon(Icons.AutoMirrored.Filled.KeyboardArrowRight, contentDescription = stringResource(R.string.cr_next_page), tint = Color.White)
            }
            IconButton(onClick = onLast, modifier = Modifier.minTapTarget()) {
                Icon(Icons.Filled.SkipNext, contentDescription = stringResource(R.string.cr_last_page), tint = Color.White)
            }
        }
        Text(nav.label, color = Color.White.copy(alpha = 0.85f))
    }
}

/** Transient "Resumed at page N" pill with a Start over action (task 2); auto-dismisses after
 * [RESUME_NOTE_AUTO_DISMISS_MS]. Sits above the bottom bar so the two never overlap. */
@Composable
private fun ResumeNote(
    page: Int,
    insets: WindowInsets,
    onStartOver: () -> Unit,
    onDismiss: () -> Unit,
    modifier: Modifier = Modifier,
) {
    LaunchedEffect(page) {
        delay(RESUME_NOTE_AUTO_DISMISS_MS)
        onDismiss()
    }
    Surface(
        modifier = modifier
            .windowInsetsPadding(insets)
            .padding(bottom = 72.dp)
            .padding(horizontal = 16.dp),
        shape = RoundedCornerShape(24.dp),
        color = Color(0xFF2B2E33),
        contentColor = Color.White,
    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier.padding(start = 16.dp, end = 4.dp, top = 4.dp, bottom = 4.dp),
        ) {
            Text(stringResource(R.string.cr_resumed_at_page, page), modifier = Modifier.padding(end = 4.dp))
            TextButton(onClick = onStartOver) { Text(stringResource(R.string.cr_start_over), color = Color(0xFF8AB4FF)) }
        }
    }
}

/** Ensures a touch target is at least the Material 48dp minimum. */
private fun Modifier.minTapTarget(): Modifier = this.then(Modifier.heightIn(min = MIN_TAP_TARGET_DP.dp).widthIn(min = MIN_TAP_TARGET_DP.dp))

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
    jumpToPage: androidx.compose.runtime.MutableState<Int?>,
    nav: androidx.compose.runtime.MutableState<ComicNavState>,
) {
    when (settings.scrollMode) {
        ComicScrollMode.PAGINATED -> ComicPagedPages(ui, settings, vm, onToggleChrome, pageTurnHandler, jumpToPage, nav)
        ComicScrollMode.INFINITE -> ComicScrollStrip(ui, settings, vm, gap = 16.dp, onToggleChrome = onToggleChrome, pageTurnHandler = pageTurnHandler, jumpToPage = jumpToPage, nav = nav)
        ComicScrollMode.LONG_STRIP -> ComicScrollStrip(ui, settings, vm, gap = 0.dp, onToggleChrome = onToggleChrome, pageTurnHandler = pageTurnHandler, jumpToPage = jumpToPage, nav = nav)
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
    jumpToPage: androidx.compose.runtime.MutableState<Int?>,
    nav: androidx.compose.runtime.MutableState<ComicNavState>,
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
                    nav.value = ComicNavState(
                        position = index.toFloat(),
                        maxPosition = (spreads.size - 1).coerceAtLeast(0).toFloat(),
                        label = comicPageCounterLabel(it.pages, ui.pageCount),
                        onSeek = { target -> scope.launch { pagerState.scrollToPage(target) } },
                    )
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
                            if (pagerState.currentPage < spreads.size - 1) pagerState.animateScrollToPage(pagerState.currentPage + 1) else vm.onEndReached()
                        com.bookorbit.feature.reader.PageTurnKey.PREVIOUS ->
                            if (pagerState.currentPage > 0) pagerState.animateScrollToPage(pagerState.currentPage - 1)
                    }
                }
            }
        }

        // First/last (task 1) and the Pages grid + resume note's Start over (task 2): jump to a
        // 0-based PAGE, resolved to its containing spread.
        LaunchedEffect(jumpToPage.value, layout) {
            val target = jumpToPage.value ?: return@LaunchedEffect
            val targetIndex = layout.spreadIndexForPage(target).coerceIn(0, (spreads.size - 1).coerceAtLeast(0))
            pagerState.scrollToPage(targetIndex)
            jumpToPage.value = null
        }

        HorizontalPager(
            state = pagerState,
            modifier = Modifier.fillMaxSize(),
            reverseLayout = rtl,
            // Swipe to turn pages is a Controls setting; a zoomed page always keeps the drag for panning.
            userScrollEnabled = !zoomed && ui.controlsSettings.swipeEnabled,
            beyondViewportPageCount = 1,
            key = { it },
        ) { spreadIndex ->
            val spread = spreads.getOrNull(spreadIndex)
            if (spread == null) return@HorizontalPager
            val onSpreadTap: (Float, Float) -> Unit = { xFraction, yFraction ->
                handleTap(ui.controlsSettings, xFraction, yFraction, rtl, scope, pagerState, spreads.size, onToggleChrome, vm::onEndReached)
            }
            if (spread.kind == ComicSpreadKind.SINGLE || spread.pages.size == 1) {
                ZoomablePage(
                    source = checkNotNull(ui.source),
                    page = spread.pages.first(),
                    fitMode = settings.fitMode,
                    active = spreadIndex == pagerState.currentPage,
                    onZoomChanged = { if (spreadIndex == pagerState.currentPage) zoomed = it },
                    onTap = onSpreadTap,
                    onImageSize = { w, h -> vm.markPageDimensions(spread.pages.first(), w, h) },
                    doubleTapZoomEnabled = ui.controlsSettings.doubleTapZoomEnabled,
                )
            } else {
                // A two-page spread has no zoom, so a plain tap goes straight to the tap zones,
                // measured across the whole spread (the zones are screen zones, not page zones).
                val currentOnSpreadTap by rememberUpdatedState(onSpreadTap)
                var spreadSize by remember { mutableStateOf(androidx.compose.ui.unit.IntSize.Zero) }
                Row(
                    Modifier
                        .fillMaxSize()
                        .onSizeChanged { spreadSize = it }
                        .pointerInput(Unit) {
                            detectTapGestures(onTap = { pos ->
                                currentOnSpreadTap(pos.x / spreadSize.width.coerceAtLeast(1), pos.y / spreadSize.height.coerceAtLeast(1))
                            })
                        },
                ) {
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
    onEndReached: () -> Unit,
) {
    when (controls.resolveTapAction(xFraction, yFraction, rtl)) {
        TapAction.NEXT -> scope.launch { if (pagerState.currentPage < pageCount - 1) pagerState.animateScrollToPage(pagerState.currentPage + 1) else onEndReached() }
        TapAction.PREVIOUS -> scope.launch { if (pagerState.currentPage > 0) pagerState.animateScrollToPage(pagerState.currentPage - 1) }
        TapAction.MENU -> onToggleChrome()
        TapAction.NOTHING -> Unit
    }
}

/** Fraction of the viewport a tap-zone Next/Previous scrolls in the infinite modes: one screen,
 * less a little overlap so the reader keeps their place. */
private const val STRIP_TAP_SCROLL_FRACTION = 0.9f

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
    onToggleChrome: () -> Unit,
    pageTurnHandler: androidx.compose.runtime.MutableState<(com.bookorbit.feature.reader.PageTurnKey) -> Unit>,
    jumpToPage: androidx.compose.runtime.MutableState<Int?>,
    nav: androidx.compose.runtime.MutableState<ComicNavState>,
) {
    val listState = rememberLazyListState(initialFirstVisibleItemIndex = ui.initialPage)
    val scrollScope = androidx.compose.runtime.rememberCoroutineScope()
    LaunchedEffect(listState, ui.pageCount) {
        snapshotFlow { listState.firstVisibleItemIndex }.collect { page ->
            vm.onPageChanged(page)
            nav.value = ComicNavState(
                position = page.toFloat(),
                maxPosition = (ui.pageCount - 1).coerceAtLeast(0).toFloat(),
                label = comicPageCounterLabel(listOf(page), ui.pageCount),
                onSeek = { target -> scrollScope.launch { listState.scrollToItem(target.coerceIn(0, (ui.pageCount - 1).coerceAtLeast(0))) } },
            )
            // "Reaching the end in the infinite modes" (task: auto-advance/next-in-series):
            // the strip scrolled all the way to its last item on its own, no extra action needed.
            if (ui.pageCount > 0 && page >= ui.pageCount - 1) vm.onEndReached()
        }
    }
    // Volume keys / hardware arrows (task 2): "next/previous scrolls by one screen" in the
    // infinite modes - each item fills the viewport width end-to-end, so one item is one screen.
    LaunchedEffect(listState, ui.pageCount) {
        pageTurnHandler.value = { turn ->
            scrollScope.launch {
                when (turn) {
                    com.bookorbit.feature.reader.PageTurnKey.NEXT ->
                        if (listState.firstVisibleItemIndex < ui.pageCount - 1) {
                            listState.animateScrollToItem((listState.firstVisibleItemIndex + 1).coerceAtMost((ui.pageCount - 1).coerceAtLeast(0)))
                        } else {
                            vm.onEndReached()
                        }
                    com.bookorbit.feature.reader.PageTurnKey.PREVIOUS ->
                        listState.animateScrollToItem((listState.firstVisibleItemIndex - 1).coerceAtLeast(0))
                }
            }
        }
    }

    // First/last (task 1) and the Pages grid + resume note's Start over (task 2): scroll straight
    // to the requested item - there's no spread indirection in the infinite modes.
    LaunchedEffect(jumpToPage.value, ui.pageCount) {
        val target = jumpToPage.value ?: return@LaunchedEffect
        listState.scrollToItem(target.coerceIn(0, (ui.pageCount - 1).coerceAtLeast(0)))
        jumpToPage.value = null
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

    // Taps go through the shared Controls zones. The strip scrolls vertically, so Next/Previous
    // scroll by one screen and the zones are never mirrored for right-to-left here.
    val currentControls by rememberUpdatedState(ui.controlsSettings)
    val currentOnToggleChrome by rememberUpdatedState(onToggleChrome)
    val currentPageCount by rememberUpdatedState(ui.pageCount)
    val currentOnEndReached by rememberUpdatedState(vm::onEndReached)
    val doubleTapZoom = ui.controlsSettings.doubleTapZoomEnabled
    Box(
        Modifier
            .fillMaxSize()
            .onSizeChanged { size = it }
            .pointerInput(doubleTapZoom) {
                detectTapGestures(
                    onTap = { pos ->
                        val x = pos.x / size.width.coerceAtLeast(1)
                        val y = pos.y / size.height.coerceAtLeast(1)
                        val screen = size.height * STRIP_TAP_SCROLL_FRACTION
                        when (currentControls.resolveTapAction(x, y, isRtl = false)) {
                            TapAction.NEXT -> if (listState.firstVisibleItemIndex < currentPageCount - 1) {
                                scrollScope.launch { listState.animateScrollBy(screen) }
                            } else {
                                currentOnEndReached()
                            }
                            TapAction.PREVIOUS -> scrollScope.launch { listState.animateScrollBy(-screen) }
                            TapAction.MENU -> currentOnToggleChrome()
                            TapAction.NOTHING -> Unit
                        }
                    },
                    // Without a double-tap handler a single tap fires straight away instead of
                    // waiting to see whether a second tap follows.
                    onDoubleTap = if (!doubleTapZoom) null else { pos ->
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

internal fun comicPageModel(source: ComicPageSource, page: Int, imageUrls: com.bookorbit.core.network.ImageUrls, context: android.content.Context): Any =
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
            // Restarts when double-tap zoom is switched, so a single tap fires immediately when
            // there is no double tap to wait for.
            .pointerInput(currentDoubleTapZoomEnabled) {
                detectTapGestures(
                    onTap = { pos -> currentOnTap(pos.x / size.width.coerceAtLeast(1), pos.y / size.height.coerceAtLeast(1)) },
                    onDoubleTap = if (!currentDoubleTapZoomEnabled) null else { pos ->
                        if (scale > 1.02f) {
                            scale = 1f
                            offset = Offset.Zero
                        } else {
                            scale = 2.5f
                            // Zoom toward the tapped point.
                            offset = clamp(Offset((size.width / 2f - pos.x) * 1.5f, (size.height / 2f - pos.y) * 1.5f), scale)
                        }
                        currentOnZoomChanged(scale > 1.02f)
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
