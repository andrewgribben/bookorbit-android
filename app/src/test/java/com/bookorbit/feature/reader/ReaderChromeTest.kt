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
