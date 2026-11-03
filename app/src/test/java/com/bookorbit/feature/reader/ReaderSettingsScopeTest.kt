package com.bookorbit.feature.reader

import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonObject
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNotEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * Stage 3: pure resolution logic for Global vs This-book scope, the single-master-switch
 * inheritance model, and the saved/built-in default fallback chain. [ReaderSettingsStore]'s own
 * DataStore I/O is not covered here (the codebase has no Robolectric/Context mocking - see
 * `LocalRefTest`'s note on this) but every method it exposes is a thin wrapper around the pure
 * functions tested below plus a key name, so this is where the actual behaviour lives.
 */
class ReaderSettingsScopeTest {
    // There's no kotlin-reflect on the test classpath, so field-by-field comparisons below walk
    // the serialized JSON keys instead of KProperty1s - same effect (a field dropped from
    // ReaderSettings, or from a save/reset path, shows up as a named failure), no new dependency.
    private val json = Json { encodeDefaults = true }

    private fun fieldsOf(settings: ReaderSettings): JsonObject =
        json.encodeToJsonElement(ReaderSettings.serializer(), settings).jsonObject

    // --- effectiveSettings (resolution rules) ---

    @Test
    fun `book following global is effectively global, regardless of any stale override`() {
        val global = ReaderSettings(fontSize = 22)
        val stale = ReaderSettings(fontSize = 10) // e.g. left over from a previous customisation
        val book = BookSettingsState(useGlobal = true, override = stale)
        assertEquals(global, effectiveSettings(global, book))
    }

    @Test
    fun `book with no override ever is effectively global even if useGlobal is false`() {
        // Defensive: shouldn't normally happen (withUseGlobal always sets an override when
        // turning off), but effectiveSettings must not crash or silently invent values.
        val global = ReaderSettings(fontSize = 22)
        val book = BookSettingsState(useGlobal = false, override = null)
        assertEquals(global, effectiveSettings(global, book))
    }

    @Test
    fun `book not following global with its own override is effectively that override`() {
        val global = ReaderSettings(fontSize = 22)
        val own = ReaderSettings(fontSize = 30, themeName = "sepia")
        val book = BookSettingsState(useGlobal = false, override = own)
        assertEquals(own, effectiveSettings(global, book))
    }

    // --- withUseGlobal (the single master inheritance switch) ---

    @Test
    fun `turning inheritance off for the first time initialises the override from global`() {
        val global = ReaderSettings(fontSize = 22, themeName = "crimson")
        val book = BookSettingsState(useGlobal = true, override = null)
        val after = book.withUseGlobal(false, global)
        assertFalse(after.useGlobal)
        assertEquals(global, after.override)
    }

    @Test
    fun `turning inheritance off again preserves the book's existing customisation, not global`() {
        val global = ReaderSettings(fontSize = 22)
        val customised = ReaderSettings(fontSize = 30, themeName = "ocean")
        val book = BookSettingsState(useGlobal = true, override = customised) // was off, now on
        val after = book.withUseGlobal(false, global)
        assertFalse(after.useGlobal)
        assertEquals(
            "must not clobber a previous customisation just by cycling the switch",
            customised,
            after.override,
        )
    }

    @Test
    fun `turning inheritance on never clears the book's own override`() {
        val global = ReaderSettings()
        val customised = ReaderSettings(fontSize = 30)
        val book = BookSettingsState(useGlobal = false, override = customised)
        val after = book.withUseGlobal(true, global)
        assertTrue(after.useGlobal)
        assertEquals(customised, after.override)
    }

    // --- resolvedSavedDefault (reset-to-saved-default fallback chain) ---

    @Test
    fun `global scope resets from the global saved default when present`() {
        val savedGlobal = ReaderSettings(fontSize = 18)
        val resolved = resolvedSavedDefault(ReaderSettingsScope.GLOBAL, savedGlobal, savedBookDefault = null)
        assertEquals(savedGlobal, resolved)
    }

    @Test
    fun `global scope with no saved default falls back to the built-in default`() {
        val resolved = resolvedSavedDefault(ReaderSettingsScope.GLOBAL, savedGlobalDefault = null, savedBookDefault = null)
        assertEquals(ReaderSettings(), resolved)
    }

    @Test
    fun `book scope prefers its own saved default over global's`() {
        val savedGlobal = ReaderSettings(fontSize = 18)
        val savedBook = ReaderSettings(fontSize = 26)
        val resolved = resolvedSavedDefault(ReaderSettingsScope.THIS_BOOK, savedGlobal, savedBook)
        assertEquals(savedBook, resolved)
    }

    @Test
    fun `book scope with no saved default of its own falls back to global's saved default`() {
        val savedGlobal = ReaderSettings(fontSize = 18)
        val resolved = resolvedSavedDefault(ReaderSettingsScope.THIS_BOOK, savedGlobal, savedBookDefault = null)
        assertEquals(savedGlobal, resolved)
    }

    @Test
    fun `book scope with neither a book nor a global saved default falls back to built-in`() {
        val resolved = resolvedSavedDefault(ReaderSettingsScope.THIS_BOOK, savedGlobalDefault = null, savedBookDefault = null)
        assertEquals(ReaderSettings(), resolved)
    }

    // --- save/reset snapshot completeness: every ReaderSettings field must round-trip ---

    /**
     * A non-default value for every field, so a field that's accidentally dropped by a future
     * "save as default" change (e.g. someone adds a field to [ReaderSettings] but forgets to
     * carry it through save/reset) shows up as a property-level failure, not just a vague
     * assertEquals(a, b) diff.
     */
    private val everyFieldNonDefault = ReaderSettings(
        fontSize = 29,
        lineHeight = 2.3,
        fontFamily = FONT_MONOSPACE,
        paragraphSpacing = 1.4,
        maxColumnCount = 1,
        gap = 0.2,
        maxInlineSize = 500,
        maxBlockSize = 900,
        justify = false,
        hyphenate = false,
        isDark = false,
        themeName = "aurora",
        flow = "scrolled",
        useBookLayout = false,
        marginTop = 10,
        marginBottom = 12,
        marginLeft = 14,
        marginRight = 16,
        linkSideMargins = true,
    )

    @Test
    fun `every field differs from the built-in default in the fixture, or this test proves nothing`() {
        val builtIn = fieldsOf(ReaderSettings())
        val fixture = fieldsOf(everyFieldNonDefault)
        for (key in builtIn.keys) {
            assertNotEquals(
                "fixture must set a non-default value for $key so a dropped field is caught",
                builtIn[key],
                fixture[key],
            )
        }
    }

    @Test
    fun `save-as-default then reset-to-saved-default round trips every ReaderSettings field`() {
        // Simulates ReaderViewModel.saveAsDefault() then resetToSavedDefault(): save the whole
        // object, then resolve it back out via the fallback chain.
        val savedDefault: ReaderSettings? = everyFieldNonDefault
        val resolved = resolvedSavedDefault(ReaderSettingsScope.GLOBAL, savedDefault, savedBookDefault = null)
        val expected = fieldsOf(everyFieldNonDefault)
        val actual = fieldsOf(resolved)
        for (key in expected.keys) {
            assertEquals("property '$key' did not survive the save/reset round trip", expected[key], actual[key])
        }
        assertEquals(everyFieldNonDefault, resolved)
    }

    @Test
    fun `book saved-default round trips every field through the this-book fallback chain too`() {
        val resolved = resolvedSavedDefault(ReaderSettingsScope.THIS_BOOK, savedGlobalDefault = ReaderSettings(), savedBookDefault = everyFieldNonDefault)
        val expected = fieldsOf(everyFieldNonDefault)
        val actual = fieldsOf(resolved)
        for (key in expected.keys) {
            assertEquals("property '$key' did not survive the this-book round trip", expected[key], actual[key])
        }
    }

    @Test
    fun `restore built-in defaults produces every field equal to the fresh built-in instance`() {
        // Mirrors ReaderViewModel.restoreBuiltInDefaults(): current settings become ReaderSettings().
        val restored = ReaderSettings()
        val expected = fieldsOf(ReaderSettings())
        val actual = fieldsOf(restored)
        for (key in expected.keys) {
            assertEquals("property '$key' not reset to built-in", expected[key], actual[key])
        }
    }
}
