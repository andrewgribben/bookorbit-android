package com.bookorbit.feature.reader

import com.bookorbit.ui.asString
import androidx.compose.ui.res.stringResource
import com.bookorbit.R
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.displayCutout
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.navigationBarsIgnoringVisibility
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.statusBarsIgnoringVisibility
import androidx.compose.foundation.layout.union
import androidx.compose.foundation.layout.windowInsetsPadding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.automirrored.filled.List
import androidx.compose.material.icons.filled.ChevronLeft
import androidx.compose.material.icons.filled.ChevronRight
import androidx.compose.material.icons.filled.FormatQuote
import androidx.compose.material.icons.filled.Headphones
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.filled.TextFields
import androidx.compose.material.icons.filled.TouchApp
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Button
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import android.widget.Toast
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalView
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.LifecycleEventObserver
import androidx.lifecycle.compose.LocalLifecycleOwner
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun ReaderScreen(
    onBack: () -> Unit,
    fullscreen: Boolean = false,
    vm: ReaderViewModel = hiltViewModel(),
) {
    val ui by vm.ui.collectAsStateWithLifecycle()
    // Held as State: it ticks twice a second while narrating, so only the readers recompose, not this screen.
    val playerState = vm.playerState.collectAsStateWithLifecycle()
    val controller = remember { ReaderController() }
    var ready by remember { mutableStateOf(false) }
    var opened by remember { mutableStateOf(false) }
    var rendererFailed by remember { mutableStateOf(false) }
    var chromeVisible by rememberSaveable { mutableStateOf(true) }
    var tocVisible by remember { mutableStateOf(false) }
    var history by remember { mutableStateOf(ReaderEvent.History(canGoBack = false, canGoForward = false)) }
    var settingsVisible by remember { mutableStateOf(false) }
    var highlightsVisible by remember { mutableStateOf(false) }
    var searchVisible by remember { mutableStateOf(false) }
    var noteDialog by remember { mutableStateOf<String?>(null) }
    // Narration player controls (stage 4): speed/sleep open the same sheets the standalone
    // audiobook player uses, whether triggered from the bottom bar or the Playback settings tab.
    var showSpeedSheet by remember { mutableStateOf(false) }
    var showSleepTimerSheet by remember { mutableStateOf(false) }

    val context = LocalContext.current

    // Taps arrive from the page (so text selection keeps working): a plain tap that isn't on a
    // link or selection is resolved through the shared Controls zone model (preset, zone size,
    // per-zone action, mirrored for RTL using the book's own page-progression direction) - the
    // same pure function the comic reader uses. Any tap while the highlight toolbar is open just
    // dismisses it, taking priority over the zone action.
    val onTap = remember { mutableStateOf<(Double, Double) -> Unit>({ _, _ -> }) }
    onTap.value = { x, y ->
        if (ui.toolbar != null) {
            vm.dismissToolbar()
        } else {
            when (ui.controlsSettings.resolveTapAction(x.toFloat(), y.toFloat(), ui.isRtl)) {
                TapAction.NEXT -> controller.next()
                TapAction.PREVIOUS -> controller.prev()
                TapAction.MENU -> chromeVisible = !chromeVisible
                TapAction.NOTHING -> Unit
            }
        }
    }

    // Keep the screen on while reading.
    val view = LocalView.current
    DisposableEffect(Unit) {
        view.keepScreenOn = true
        onDispose { view.keepScreenOn = false }
    }

    // "Continue from another device?" (newer-position prompt): checked on ON_RESUME, but not the
    // very first one - that's just this screen appearing, and opening already resolved the newest
    // position (see ReaderViewModel.load/resolveInitial). Only later resumes (backgrounding this
    // app and coming back, e.g.) are a return worth asking about, same as web's visibilitychange/
    // focus listeners firing after the tab was actually hidden.
    val lifecycleOwner = LocalLifecycleOwner.current
    DisposableEffect(lifecycleOwner, vm) {
        var sawFirstResume = false
        val observer = LifecycleEventObserver { _, event ->
            if (event == Lifecycle.Event.ON_RESUME) {
                if (sawFirstResume) vm.onReaderResumed() else sawFirstResume = true
            }
        }
        lifecycleOwner.lifecycle.addObserver(observer)
        onDispose { lifecycleOwner.lifecycle.removeObserver(observer) }
    }

    // Volume keys and hardware arrows turn pages while this screen is showing (task 2): the
    // registry is consulted from MainActivity.dispatchKeyEvent, not Compose focus, so it works
    // regardless of whether the WebView currently holds focus.
    DisposableEffect(controller) {
        val onPageTurn: (PageTurnKey) -> Unit = { turn ->
            when (turn) {
                PageTurnKey.NEXT -> controller.next()
                PageTurnKey.PREVIOUS -> controller.prev()
            }
        }
        ReaderKeyBindings.enter(onPageTurn)
        onDispose { ReaderKeyBindings.leave(onPageTurn) }
    }
    LaunchedEffect(ui.controlsSettings.volumeKeysTurnPages) {
        ReaderKeyBindings.setVolumeKeysEnabled(ui.controlsSettings.volumeKeysTurnPages)
    }

    // Tapping the page centre toggles the reader's own chrome and Android's system bars together
    // (see readerWantsSystemBarsVisible for the exact rule), so there is one coherent immersive
    // state rather than two bar sets that can disagree. The WebView itself is never resized by
    // this (it already fills the whole Box below, with the bars drawn as floating overlays), so
    // page text never reflows when chrome/system bars toggle.
    ReaderSystemBarsEffect(fullscreen = fullscreen, chromeVisible = chromeVisible)

    LaunchedEffect(Unit) {
        controller.listener = { event ->
            when (event) {
                is ReaderEvent.Ready -> ready = true
                is ReaderEvent.Loaded -> vm.onLoaded(event.toc, event.title, event.hasMediaOverlay, event.isRtl)
                is ReaderEvent.Relocate -> vm.onRelocate(event.cfi, event.fraction, event.chapterTitle, event.reason, event.restoring)
                is ReaderEvent.History -> history = event
                is ReaderEvent.Error -> vm.onError(event.message)
                is ReaderEvent.Tap -> onTap.value(event.x, event.y)
                is ReaderEvent.SearchResults -> vm.onSearchResults(event.label, event.hits)
                is ReaderEvent.SearchProgress -> vm.onSearchProgress(event.progress)
                is ReaderEvent.SearchDone -> vm.onSearchDone(event.total, event.capped)
                is ReaderEvent.Selection -> vm.onSelection(event.text, event.cfi, event.rect)
                ReaderEvent.SelectionCleared -> vm.onSelectionCleared()
                is ReaderEvent.AnnotationTap -> vm.onAnnotationTap(event.cfi, event.rect)
                is ReaderEvent.NarrationReady -> vm.onNarrationReady(event.timeline, event.generation)
                is ReaderEvent.NarrationFailed -> vm.onNarrationFailed(event.message, event.generation)
            }
        }
    }

    // Narration's SMIL parsing and highlight drawing both live in the WebView; the ViewModel only
    // decides *what* to do and tells the screen to drive the controller.
    LaunchedEffect(Unit) {
        vm.commands.collect { cmd ->
            when (cmd) {
                is ReaderViewModel.ReaderCommand.NarrationPrepare -> controller.narrationPrepare(cmd.generation)
                ReaderViewModel.ReaderCommand.NarrationCancelPrepare -> controller.narrationCancelPrepare()
                is ReaderViewModel.ReaderCommand.NarrationHighlight -> controller.narrationHighlight(cmd.textHref)
                ReaderViewModel.ReaderCommand.NarrationUnhighlight -> controller.narrationUnhighlight()
                is ReaderViewModel.ReaderCommand.GoToNewerPosition -> {
                    val cfi = cmd.cfi
                    if (cfi != null) controller.goTo(cfi) else cmd.fraction?.let(controller::goToFraction)
                }
            }
        }
    }

    // Draw the book's highlights in the page whenever they (or the loaded page) change.
    LaunchedEffect(ui.annotations, ui.loaded) {
        if (ui.loaded) controller.setAnnotations(ui.annotations)
    }
    LaunchedEffect(ui.loaded, ui.controlsSettings.swipeEnabled) {
        if (ui.loaded) controller.setSwipeEnabled(ui.controlsSettings.swipeEnabled)
    }

    // Drop the page's text selection once the toolbar goes away (saved, dismissed or deleted).
    LaunchedEffect(ui.toolbar == null) {
        if (ui.toolbar == null && ui.loaded) controller.clearSelection()
    }

    ui.message?.let { msg ->
        LaunchedEffect(msg) {
            Toast.makeText(context, msg.resolve(context), Toast.LENGTH_SHORT).show()
            vm.consumeMessage()
        }
    }

    val resolved = ui.resolved
    LaunchedEffect(ready, resolved, rendererFailed) {
        if (ready && resolved != null && !opened && !rendererFailed) {
            opened = true
            withContext(Dispatchers.IO) {
                controller.open(openParamsFor(resolved.ref, resolved.format, resolved.initial, ui.effective), context)
            }
        }
    }

    // Re-apply live whenever the effective settings change for any reason - editing, switching
    // scope, flipping "Use global settings", save/reset/restore - not just the sheet's onChange.
    LaunchedEffect(ui.effective) {
        if (ui.loaded) controller.applyStyles(ui.effective)
    }

    val surface = themeBackgroundColor(ui.effective.themeName, ui.effective.isDark)
    val paginated = ui.effective.flow == "paginated"
    val showChrome = chromeVisible
    val onSurface = if (effectiveIsDark(ui.effective.themeName, ui.effective.isDark)) Color.White else Color.Black
    // Bars must clear both the status bar AND the display-cutout (camera punch-hole) — on a
    // Galaxy Z Fold's inner/outer screens in particular, statusBarsPadding() alone leaves the top
    // bar under the cutout whenever the status bar inset collapses to 0 (which happens while
    // system bars are hidden/transient, since that inset tracks *visibility*, not the cutout's
    // physical presence). "IgnoringVisibility" keeps the reserved space constant whether or not the
    // system bar is currently shown, and union(displayCutout) extends it to cover the punch-hole in
    // any orientation/fold state.
    val topBarInsets = WindowInsets.statusBarsIgnoringVisibility.union(WindowInsets.displayCutout)
    val bottomBarInsets = WindowInsets.navigationBarsIgnoringVisibility.union(WindowInsets.displayCutout)

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(surface),
    ) {
        if (!rendererFailed) {
            ReaderWebView(
                controller = controller,
                modifier = Modifier.fillMaxSize(),
                onRendererGone = remember(vm) {
                    {
                        rendererFailed = true
                        vm.onRendererGone()
                    }
                },
            )
        }

        if (showChrome) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(Color(0xCC0A0A0A))
                    .windowInsetsPadding(topBarInsets)
                    .padding(horizontal = 4.dp, vertical = 4.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                IconButton(onClick = onBack) {
                    Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = stringResource(R.string.back), tint = Color.White)
                }
                Text(
                    ui.chapterTitle ?: ui.title ?: "",
                    color = Color.White,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis,
                    modifier = Modifier.weight(1f),
                )
                IconButton(onClick = { searchVisible = true }) {
                    Icon(Icons.Filled.Search, contentDescription = stringResource(R.string.search_in_book), tint = Color.White)
                }
                IconButton(onClick = {
                    vm.loadBookmarks()
                    highlightsVisible = true
                }) {
                    Icon(Icons.Filled.FormatQuote, contentDescription = stringResource(R.string.highlights), tint = Color.White)
                }
                IconButton(onClick = { tocVisible = true }) {
                    Icon(Icons.AutoMirrored.Filled.List, contentDescription = stringResource(R.string.contents), tint = Color.White)
                }
                IconButton(onClick = { settingsVisible = true }) {
                    Icon(Icons.Filled.TextFields, contentDescription = stringResource(R.string.settings), tint = Color.White)
                }
                if (ui.hasMediaOverlay) {
                    IconButton(onClick = { vm.toggleNarration() }) {
                        val description = if (ui.narrationOn) stringResource(R.string.narration_stop_listening) else stringResource(R.string.narration_listen)
                        Icon(
                            Icons.Filled.Headphones,
                            contentDescription = description,
                            tint = if (ui.narrationOn) Color(0xFFFFCC00) else Color.White,
                        )
                    }
                }
            }

            Box(
                modifier = Modifier
                    .align(Alignment.BottomCenter)
                    .fillMaxWidth()
                    .background(Color(0xCC0A0A0A))
                    .windowInsetsPadding(bottomBarInsets)
                    .padding(vertical = 6.dp),
                contentAlignment = Alignment.Center,
            ) {
                // Narration on swaps the ordinary reading-progress row for the player's own
                // transport controls (requirement 1); audio keeps playing when chrome (and this
                // bar with it) is hidden - see readerBottomBarContent()/NarrationPlayerBar doc.
                when (readerBottomBarContent(ui.narrationOn)) {
                    ReaderBottomBarContent.NARRATION_PLAYER -> NarrationPlayerBar(
                        state = { playerState.value },
                        chapterTitle = ui.chapterTitle,
                        progressFraction = ui.percentage / 100f,
                        onTogglePlay = vm::togglePlayback,
                        onSkipBack = vm::playerSkipBack,
                        onSkipForward = vm::playerSkipForward,
                        onOpenSpeed = { showSpeedSheet = true },
                        onOpenSleepTimer = { showSleepTimerSheet = true },
                    )
                    ReaderBottomBarContent.PROGRESS -> ReadingProgressBar(
                        chapterTitle = ui.chapterTitle,
                        percentage = ui.percentage,
                        onSeek = { controller.goToFraction(it.toDouble()) },
                        canGoBack = history.canGoBack,
                        canGoForward = history.canGoForward,
                        onBack = controller::historyBack,
                        onForward = controller::historyForward,
                    )
                }
            }
        }

        ui.toolbar?.let { target ->
            val annotation = target.annotationId?.let { id -> ui.annotations.firstOrNull { it.id == id } }
            val screenWidth = LocalConfiguration.current.screenWidthDp
            val toolbarWidth = if (annotation != null) 340 else 290
            val rect = target.rect
            val centerX = rect?.let { (it.left + it.right) / 2 } ?: (screenWidth / 2.0)
            val x = (centerX - toolbarWidth / 2).coerceIn(8.0, (screenWidth - toolbarWidth - 8).coerceAtLeast(8).toDouble())
            // Above the selection when there's room, otherwise below it (clear of the selection handles).
            val y = when {
                rect == null -> 120.0
                rect.top > 150 -> rect.top - 60
                else -> rect.bottom + 36
            }
            HighlightToolbar(
                currentColor = annotation?.color,
                onColor = { vm.highlight(it) },
                onNote = { noteDialog = annotation?.note.orEmpty() },
                onDelete = annotation?.let { a -> { vm.deleteAnnotation(a.id) } },
                modifier = Modifier.offset(x = x.dp, y = y.dp),
            )
        }

        if ((!ui.loaded || !ready) && ui.error == null && !rendererFailed) {
            Box(modifier = Modifier.fillMaxSize().background(surface), contentAlignment = Alignment.Center) {
                CircularProgressIndicator()
            }
        }

        ui.error?.let { message ->
            Box(modifier = Modifier.fillMaxSize().background(surface), contentAlignment = Alignment.Center) {
                Column2(message = message.asString(), onBack = onBack, tint = onSurface)
            }
        }

        if (rendererFailed) {
            androidx.compose.foundation.layout.Column(
                modifier = Modifier.fillMaxSize().background(surface).padding(32.dp),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = androidx.compose.foundation.layout.Arrangement.Center,
            ) {
                Text(stringResource(R.string.reader_renderer_unavailable), color = onSurface)
                Button(onClick = {
                    ready = false
                    opened = false
                    rendererFailed = false
                }) { Text(stringResource(R.string.retry)) }
                Button(onClick = onBack) { Text(stringResource(R.string.back)) }
            }
        }

        // One-time coach overlay teaching the (invisible) paginated tap zones.
        if (!rendererFailed && paginated && ui.loaded && ui.showPagingHint) {
            PagingHintOverlay(onDismiss = { vm.dismissPagingHint() })
        }
    }

    if (tocVisible) {
        ReaderTocSheet(
            toc = ui.toc,
            onSelect = { href ->
                tocVisible = false
                controller.goTo(href)
            },
            onDismiss = { tocVisible = false },
        )
    }
    noteDialog?.let { initial ->
        NoteDialog(
            initial = initial,
            onSave = { note ->
                noteDialog = null
                vm.saveNote(note)
            },
            onDismiss = { noteDialog = null },
        )
    }
    if (searchVisible) {
        ReaderSearchSheet(
            state = ui.search,
            onSearch = { q ->
                vm.startSearch(q)
                controller.search(q)
            },
            onClear = {
                vm.clearSearch()
                controller.clearSearch()
            },
            onJump = { cfi ->
                searchVisible = false
                controller.goTo(cfi)
            },
            onDismiss = { searchVisible = false },
        )
    }
    if (highlightsVisible) {
        HighlightsSheet(
            annotations = ui.annotations,
            bookmarks = ui.bookmarks,
            onJumpBookmark = { b ->
                highlightsVisible = false
                b.cfi?.let(controller::goTo)
            },
            onAddBookmark = vm::addBookmark,
            onDeleteBookmark = { vm.deleteBookmark(it.id) },
            onJump = { a ->
                highlightsVisible = false
                a.cfi?.let(controller::goTo)
            },
            onDelete = { vm.deleteAnnotation(it.id) },
            onDismiss = { highlightsVisible = false },
        )
    }
    if (settingsVisible) {
        ReaderSettingsSheet(
            scope = ui.scope,
            onScopeChange = vm::setScope,
            globalSettings = ui.globalSettings,
            bookState = ui.bookState,
            onUseGlobalChange = vm::setUseGlobal,
            onSettingsChange = { updated -> vm.updateSettings(ui.scope, updated) },
            onSaveAsDefault = { vm.saveAsDefault(ui.scope) },
            onResetToSavedDefault = { vm.resetToSavedDefault(ui.scope) },
            onRestoreBuiltIn = { vm.restoreBuiltInDefaults(ui.scope) },
            playerState = playerState.value,
            onSkipBackChange = vm::setSkipBackSeconds,
            onSkipForwardChange = vm::setSkipForwardSeconds,
            onProgressBarModeChange = vm::setProgressBarMode,
            onOpenSpeedSheet = { settingsVisible = false; showSpeedSheet = true },
            onOpenSleepTimerSheet = { settingsVisible = false; showSleepTimerSheet = true },
            onOpenChapters = { settingsVisible = false; tocVisible = true },
            onOpenBookmarks = { settingsVisible = false; vm.loadBookmarks(); highlightsVisible = true },
            onSetWallpaper = {
                settingsVisible = false
                vm.setCoverAsWallpaper()
            },
            controlsSettings = ui.controlsSettings,
            onControlsSettingsChange = vm::updateControlsSettings,
            onDismiss = { settingsVisible = false },
        )
    }

    if (showSpeedSheet) {
        com.bookorbit.feature.player.SpeedSheet(
            speed = playerState.value.speed,
            perBook = playerState.value.speedIsPerBook,
            onChange = { speed, forThisBook -> vm.setPlaybackSpeed(speed, forThisBook) },
            onDismiss = { showSpeedSheet = false },
        )
    }

    if (showSleepTimerSheet) {
        com.bookorbit.feature.player.SleepTimerSheet(
            remainingSec = playerState.value.sleepTimerRemainingSec,
            endOfChapter = playerState.value.sleepTimerEndOfChapter,
            hasChapters = playerState.value.chapters.isNotEmpty(),
            onSetMinutes = { vm.setSleepTimer(it) },
            onSetEndOfChapter = { vm.setSleepTimerEndOfChapter() },
            onCancel = { vm.cancelSleepTimer() },
            onDismiss = { showSleepTimerSheet = false },
        )
    }

    ui.newerPosition?.let { offer ->
        NewerPositionDialog(
            remotePercentage = offer.remotePercentage,
            localPercentage = offer.localPercentage,
            onFollow = vm::followNewerPosition,
            onStay = vm::stayAtCurrentPosition,
        )
    }
}

@Composable
private fun PagingHintOverlay(onDismiss: () -> Unit) {
    val interaction = remember { MutableInteractionSource() }
    Row(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xE60A0A0A))
            .clickable(interactionSource = interaction, indication = null, onClick = onDismiss),
    ) {
        HintZone(weight = 0.3f, icon = Icons.Filled.ChevronLeft, label = stringResource(R.string.previous_page))
        HintZone(weight = 0.4f, icon = Icons.Filled.TouchApp, label = stringResource(R.string.tap_for_menu))
        HintZone(weight = 0.3f, icon = Icons.Filled.ChevronRight, label = stringResource(R.string.next_page))
    }
}

@Composable
private fun androidx.compose.foundation.layout.RowScope.HintZone(
    weight: Float,
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    label: String,
) {
    androidx.compose.foundation.layout.Column(
        modifier = Modifier
            .weight(weight)
            .fillMaxHeight(),
        verticalArrangement = androidx.compose.foundation.layout.Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        Icon(icon, contentDescription = null, tint = Color.White, modifier = Modifier.size(40.dp))
        androidx.compose.foundation.layout.Spacer(Modifier.size(8.dp))
        Text(
            label,
            color = Color.White,
            style = androidx.compose.material3.MaterialTheme.typography.labelLarge,
            textAlign = androidx.compose.ui.text.style.TextAlign.Center,
            modifier = Modifier.padding(horizontal = 8.dp),
        )
    }
}

@Composable
private fun androidx.compose.foundation.layout.RowScope.TapZone(weight: Float, onTap: () -> Unit) {
    val interaction = remember { MutableInteractionSource() }
    Box(
        modifier = Modifier
            .weight(weight)
            .fillMaxHeight()
            .clickable(interactionSource = interaction, indication = null, onClick = onTap),
    )
}

@Composable
private fun Column2(message: String, onBack: () -> Unit, tint: Color) {
    androidx.compose.foundation.layout.Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        modifier = Modifier.padding(32.dp),
    ) {
        Text(message, color = tint)
        IconButton(onClick = onBack) {
            Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = stringResource(R.string.back), tint = tint)
        }
    }
}
