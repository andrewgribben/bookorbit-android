package com.bookorbit.feature.reader

import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.ui.platform.LocalView
import androidx.core.view.ViewCompat
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.WindowInsetsControllerCompat
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.LifecycleEventObserver
import androidx.lifecycle.compose.LocalLifecycleOwner

/**
 * Whether Android's system bars (status + navigation) should be visible, given the reader's
 * "fullscreen" setting and whether the in-reader chrome (top/bottom bars) is currently shown.
 *
 * The coherent rule (matching Readest-style readers, per the design brief): with fullscreen OFF,
 * system bars are always shown, independent of the chrome toggle. With fullscreen ON, system bars
 * follow the chrome: tapping the page centre hides/shows the reader's own bars and the system bars
 * together, so there's a single "immersive" state rather than two bar sets that can disagree.
 */
fun readerWantsSystemBarsVisible(fullscreen: Boolean, chromeVisible: Boolean): Boolean = !fullscreen || chromeVisible

/**
 * Which "is the reader's chrome visible" signal [readerWantsSystemBarsVisible] should use.
 *
 * While Reactor draws its own chrome (`useReactorChrome`), [chromeVisible] (the Compose-only
 * flag the legacy chrome's own tap handler flips - see ReaderScreen.kt's `onTap`) is not the
 * real answer: taps still reach this screen's `onTap` (ContentCore emits its v1 `tap` event to
 * the native bridge the same way regardless of which chrome is drawing), so `chromeVisible`
 * keeps toggling in parallel with, but never informed by, Reactor's own internal bars state.
 * Reactor starts with its bars hidden (src/shell/mount.ts's `barsVisible = false`) while
 * `chromeVisible` always starts `true`, so without this the two states are a toggle out of
 * phase from the very first frame onward - system bars end up permanently inverted relative to
 * the reader's own chrome (BO-53 #8). [reactorBarsVisible] is this screen's copy of Reactor's
 * explicit `chromeState{barsVisible}` intent (protocol v2) and is always the correct source once
 * Reactor chrome is in use.
 */
fun effectiveChromeVisible(useReactorChrome: Boolean, chromeVisible: Boolean, reactorBarsVisible: Boolean): Boolean =
    if (useReactorChrome) reactorBarsVisible else chromeVisible

/**
 * Drives Android's system bars to follow [chromeVisible] exactly as [readerWantsSystemBarsVisible]
 * decides, for as long as this is in composition, and restores whatever visibility the window had
 * before entering (mirrors the save/restore `DisposableEffect` in `ImmersiveReaderEffect`, which
 * this replaces for the native ebook screen — see `ReaderDestination.usingNativeEbookScreen`).
 */
@Composable
fun ReaderSystemBarsEffect(fullscreen: Boolean, chromeVisible: Boolean) {
    val view = LocalView.current
    val owner = LocalLifecycleOwner.current

    // Capture the pre-entry state once and restore it exactly once, on final dispose (i.e.
    // leaving the reader) — not on every chrome/fullscreen change, which LaunchedEffect below
    // handles instead.
    DisposableEffect(view, owner) {
        val window = view.context.findActivity()?.window
        val controller = window?.let { WindowCompat.getInsetsController(it, view) }
        val insets = ViewCompat.getRootWindowInsets(view)
        val statusVisible = insets?.isVisible(WindowInsetsCompat.Type.statusBars()) ?: true
        val navigationVisible = insets?.isVisible(WindowInsetsCompat.Type.navigationBars()) ?: true
        val oldBehavior = controller?.systemBarsBehavior
        controller?.systemBarsBehavior = WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
        onDispose {
            if (statusVisible) controller?.show(WindowInsetsCompat.Type.statusBars())
            if (navigationVisible) controller?.show(WindowInsetsCompat.Type.navigationBars())
            oldBehavior?.let { controller?.systemBarsBehavior = it }
        }
    }

    // System bars come back on their own after focus loss (shade, app switcher, calls), so re-apply
    // the wanted state on focus regain and resume, as ImmersiveReaderEffect does for other readers.
    DisposableEffect(fullscreen, chromeVisible, view, owner) {
        val window = view.context.findActivity()?.window
        val controller = window?.let { WindowCompat.getInsetsController(it, view) }
        fun apply() {
            if (readerWantsSystemBarsVisible(fullscreen, chromeVisible)) {
                controller?.show(WindowInsetsCompat.Type.systemBars())
            } else {
                controller?.hide(WindowInsetsCompat.Type.systemBars())
            }
        }
        val focusListener = android.view.ViewTreeObserver.OnWindowFocusChangeListener { if (it) apply() }
        val observer = LifecycleEventObserver { _, event -> if (event == Lifecycle.Event.ON_RESUME) apply() }
        apply()
        view.viewTreeObserver.addOnWindowFocusChangeListener(focusListener)
        owner.lifecycle.addObserver(observer)
        onDispose {
            owner.lifecycle.removeObserver(observer)
            if (view.viewTreeObserver.isAlive) view.viewTreeObserver.removeOnWindowFocusChangeListener(focusListener)
        }
    }
}
