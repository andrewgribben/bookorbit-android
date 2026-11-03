package com.bookorbit.feature.reader

import kotlinx.serialization.json.Json
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * Covers the stage-2 "use book layout" settings model: defaults, the migration rule in
 * [migrateReaderSettings], clamp helpers and the four-margin link behaviour.
 */
class ReaderSettingsTest {
    // Mirrors the persistence Json in ReaderSettingsStore (encodeDefaults = true is required so
    // "useBookLayout" is never silently omitted just because it equals the default - see that
    // file's comment on why this differs from NetworkModule.provideJson()).
    private val json = Json {
        ignoreUnknownKeys = true
        encodeDefaults = true
    }

    @Test
    fun `fresh install with no stored settings defaults to book layout on`() {
        val settings = migrateReaderSettings(raw = null, json = json)
        assertEquals(ReaderSettings(), settings)
        assertTrue(settings.useBookLayout)
    }

    @Test
    fun `pre-stage-2 settings blob without useBookLayout migrates to book layout off`() {
        // A settings blob written before this field existed - e.g. a user who bumped font size.
        val legacyRaw = """
            {"fontSize":20,"lineHeight":1.5,"fontFamily":null,"maxColumnCount":2,"gap":0.05,
             "maxInlineSize":720,"maxBlockSize":1440,"justify":true,"hyphenate":true,
             "isDark":true,"themeName":"default","flow":"paginated"}
        """.trimIndent()
        val settings = migrateReaderSettings(legacyRaw, json)
        assertFalse("existing customised user must not be switched to book layout", settings.useBookLayout)
        assertEquals(20, settings.fontSize)
    }

    @Test
    fun `settings blob already carrying useBookLayout is decoded as-is`() {
        val raw = json.encodeToString(ReaderSettings.serializer(), ReaderSettings(useBookLayout = true, fontSize = 22))
        val settings = migrateReaderSettings(raw, json)
        assertTrue(settings.useBookLayout)
        assertEquals(22, settings.fontSize)
    }

    @Test
    fun `settings blob explicitly opted out keeps book layout off`() {
        val raw = json.encodeToString(ReaderSettings.serializer(), ReaderSettings(useBookLayout = false))
        val settings = migrateReaderSettings(raw, json)
        assertFalse(settings.useBookLayout)
    }

    @Test
    fun `unparseable stored settings fall back to safe defaults`() {
        val settings = migrateReaderSettings("not json at all", json)
        assertEquals(ReaderSettings(), settings)
    }

    @Test
    fun `clamp helpers stay within range`() {
        assertEquals(FONT_SIZE_RANGE.first, clampFontSize(Int.MIN_VALUE))
        assertEquals(FONT_SIZE_RANGE.last, clampFontSize(Int.MAX_VALUE))
        assertEquals(LINE_HEIGHT_RANGE.start, clampLineHeight(-5.0), 0.0001)
        assertEquals(LINE_HEIGHT_RANGE.endInclusive, clampLineHeight(99.0), 0.0001)
        assertEquals(MARGIN_RANGE.first, clampMargin(-50))
        assertEquals(MARGIN_RANGE.last, clampMargin(9999))
        assertEquals(PARAGRAPH_SPACING_RANGE.start, clampParagraphSpacing(-9.0), 0.0001)
        assertEquals(PARAGRAPH_SPACING_RANGE.endInclusive, clampParagraphSpacing(99.0), 0.0001)
    }

    @Test
    fun `linked side margins mirror left and right but never top or bottom`() {
        val linked = ReaderSettings(linkSideMargins = true, marginTop = 40, marginBottom = 40, marginLeft = 40, marginRight = 40)
        val afterLeftEdit = linked.withLeftMargin(80)
        assertEquals(80, afterLeftEdit.marginLeft)
        assertEquals(80, afterLeftEdit.marginRight)
        assertEquals(40, afterLeftEdit.marginTop)
        assertEquals(40, afterLeftEdit.marginBottom)

        val afterRightEdit = linked.withRightMargin(12)
        assertEquals(12, afterRightEdit.marginLeft)
        assertEquals(12, afterRightEdit.marginRight)
    }

    @Test
    fun `unlinked side margins stay independent`() {
        val unlinked = ReaderSettings(linkSideMargins = false, marginLeft = 40, marginRight = 40)
        val afterLeftEdit = unlinked.withLeftMargin(100)
        assertEquals(100, afterLeftEdit.marginLeft)
        assertEquals(40, afterLeftEdit.marginRight)
    }

    @Test
    fun `font family options no longer offer a publisher or original chip`() {
        assertEquals(3, FONT_FAMILIES.size)
        assertTrue(FONT_FAMILIES.all { it.value != null })
    }
}
