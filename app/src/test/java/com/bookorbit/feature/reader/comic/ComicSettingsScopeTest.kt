package com.bookorbit.feature.reader.comic

import com.bookorbit.feature.reader.ReaderSettingsScope
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

class ComicSettingsScopeTest {

    private val global = ComicReaderSettings(fitMode = ComicFitMode.FIT_PAGE)
    private val override = ComicReaderSettings(fitMode = ComicFitMode.ACTUAL)

    @Test
    fun `effectiveComicSettings follows global when useGlobal is true`() {
        val book = ComicBookSettingsState(useGlobal = true, override = override)
        assertEquals(global, effectiveComicSettings(global, book))
    }

    @Test
    fun `effectiveComicSettings uses the override when not following global`() {
        val book = ComicBookSettingsState(useGlobal = false, override = override)
        assertEquals(override, effectiveComicSettings(global, book))
    }

    @Test
    fun `effectiveComicSettings falls back to global when override is null even if not following it`() {
        val book = ComicBookSettingsState(useGlobal = false, override = null)
        assertEquals(global, effectiveComicSettings(global, book))
    }

    @Test
    fun `withUseGlobal true never clears an existing override`() {
        val book = ComicBookSettingsState(useGlobal = false, override = override)
        val result = book.withUseGlobal(true, global)
        assertTrue(result.useGlobal)
        assertEquals(override, result.override)
    }

    @Test
    fun `withUseGlobal false initialises the override from current global only the first time`() {
        val fresh = ComicBookSettingsState()
        val initialised = fresh.withUseGlobal(false, global)
        assertFalse(initialised.useGlobal)
        assertEquals(global, initialised.override)

        val customised = initialised.copy(override = override)
        val toggledOffThenOn = customised.withUseGlobal(true, global).withUseGlobal(false, global)
        assertEquals(override, toggledOffThenOn.override)
    }

    @Test
    fun `resolvedComicSavedDefault falls back book to global to built-in`() {
        assertEquals(
            ComicReaderSettings(),
            resolvedComicSavedDefault(ReaderSettingsScope.GLOBAL, savedGlobalDefault = null, savedBookDefault = null),
        )
        assertEquals(
            global,
            resolvedComicSavedDefault(ReaderSettingsScope.GLOBAL, savedGlobalDefault = global, savedBookDefault = override),
        )
        assertEquals(
            override,
            resolvedComicSavedDefault(ReaderSettingsScope.THIS_BOOK, savedGlobalDefault = global, savedBookDefault = override),
        )
        assertEquals(
            global,
            resolvedComicSavedDefault(ReaderSettingsScope.THIS_BOOK, savedGlobalDefault = global, savedBookDefault = null),
        )
    }
}
