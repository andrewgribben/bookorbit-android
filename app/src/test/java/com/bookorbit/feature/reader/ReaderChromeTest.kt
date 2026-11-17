package com.bookorbit.feature.reader

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * Pure decision for whether Android's system bars should be visible, extracted from
 * ReaderChrome.ReaderSystemBarsEffect so the fullscreen/chrome-toggle coherence rule (see
 * ReaderDestination.kt and ReaderScreen.kt's stage-1 immersive work) is covered without a device.
 */
class ReaderSystemBarsVisibilityTest {
    @Test
    fun `fullscreen off keeps system bars shown regardless of chrome`() {
        assertTrue(readerWantsSystemBarsVisible(fullscreen = false, chromeVisible = true))
        assertTrue(readerWantsSystemBarsVisible(fullscreen = false, chromeVisible = false))
    }

    @Test
    fun `fullscreen on follows the chrome toggle`() {
        assertTrue(readerWantsSystemBarsVisible(fullscreen = true, chromeVisible = true))
        assertFalse(readerWantsSystemBarsVisible(fullscreen = true, chromeVisible = false))
    }
}

/**
 * BO-53 #8: with Reactor chrome in use, system bars must follow Reactor's own reported
 * `chromeState{barsVisible}`, never the legacy Compose chrome-tap flag - that flag keeps
 * toggling (the native `tap` event still reaches it) but was never informed by Reactor's own
 * internal bars state, which starts hidden while the legacy flag starts visible.
 */
class EffectiveChromeVisibleTest {
    @Test
    fun `legacy chrome uses the compose tap-toggle flag`() {
        assertTrue(effectiveChromeVisible(useReactorChrome = false, chromeVisible = true, reactorBarsVisible = false))
        assertFalse(effectiveChromeVisible(useReactorChrome = false, chromeVisible = false, reactorBarsVisible = true))
    }

    @Test
    fun `reactor chrome uses Reactor's own reported bars state, not the stale compose flag`() {
        assertFalse(effectiveChromeVisible(useReactorChrome = true, chromeVisible = true, reactorBarsVisible = false))
        assertTrue(effectiveChromeVisible(useReactorChrome = true, chromeVisible = false, reactorBarsVisible = true))
    }
}

/** Pure AMOLED-is-always-dark decision, mirrored in bridge.js's generateCSS (see that file). */
class ReaderThemeEffectiveDarkTest {
    @Test
    fun `amoled is always dark even if isDark is off`() {
        assertTrue(effectiveIsDark("amoled", isDark = false))
        assertTrue(effectiveIsDark("amoled", isDark = true))
    }

    @Test
    fun `other themes follow the isDark flag`() {
        assertFalse(effectiveIsDark("default", isDark = false))
        assertTrue(effectiveIsDark("default", isDark = true))
        assertFalse(effectiveIsDark("sepia", isDark = false))
    }

    @Test
    fun `amoled background is true black and true white foreground regardless of mode`() {
        val darkBg = themeBackgroundColor("amoled", isDark = false)
        assertEquals(themeBackgroundColor("amoled", isDark = true), darkBg)
    }
}
