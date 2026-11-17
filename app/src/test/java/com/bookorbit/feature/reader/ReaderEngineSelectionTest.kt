package com.bookorbit.feature.reader

import com.bookorbit.core.settings.ReaderEngine
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

/** BO-53 item 7: the runtime reader-engine switch (Regular/Reactor), kept pure so it is
 * unit-testable without BuildConfig/DataStore - see resolveUseReactor/resolveUseReactorChrome
 * in ReaderWebView.kt and ReaderViewModel.readerEngine/useReactor/useReactorChrome. */
class ReaderEngineSelectionTest {
    @Test
    fun `regular engine never loads reactor, even when the build flag is on`() {
        assertFalse(resolveUseReactor(reactorAvailable = true, engine = ReaderEngine.REGULAR))
        assertFalse(resolveUseReactor(reactorAvailable = false, engine = ReaderEngine.REGULAR))
    }

    @Test
    fun `reactor engine only loads reactor when the build flag made it available`() {
        assertTrue(resolveUseReactor(reactorAvailable = true, engine = ReaderEngine.REACTOR))
        assertFalse(resolveUseReactor(reactorAvailable = false, engine = ReaderEngine.REACTOR))
    }

    @Test
    fun `reactor chrome requires both its own flag and reactor actually being the active engine`() {
        assertTrue(resolveUseReactorChrome(chromeAvailable = true, useReactor = true))
        assertFalse(resolveUseReactorChrome(chromeAvailable = true, useReactor = false))
        assertFalse(resolveUseReactorChrome(chromeAvailable = false, useReactor = true))
        assertFalse(resolveUseReactorChrome(chromeAvailable = false, useReactor = false))
    }

    @Test
    fun `reader engine setting defaults to regular`() {
        // Mirrors AppSettingsStore.readerEngine's own fallback (no persisted value yet).
        assertTrue(ReaderEngine.entries.first() == ReaderEngine.REGULAR)
    }
}
