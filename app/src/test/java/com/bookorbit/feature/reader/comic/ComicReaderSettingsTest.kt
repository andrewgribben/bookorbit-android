package com.bookorbit.feature.reader.comic

import com.bookorbit.feature.reader.ReaderSettingsScope
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

class ComicReaderSettingsTest {

    @Test
    fun `clampSpreadGap rounds down to an even number within range`() {
        assertEquals(0, clampSpreadGap(-4))
        assertEquals(0, clampSpreadGap(1))
        assertEquals(2, clampSpreadGap(3))
        assertEquals(24, clampSpreadGap(30))
    }

    @Test
    fun `toSyncJson only contains the ten web fields`() {
        val settings = ComicReaderSettings(trueBlack = true, keepScreenOn = true)
        val json = settings.toSyncJson()
        assertEquals(SYNCED_KEYS.toSet(), json.keys)
        assertFalse(json.containsKey("trueBlack"))
        assertFalse(json.containsKey("keepScreenOn"))
    }

    @Test
    fun `toSyncJson uses the web's exact wire values`() {
        val settings = ComicReaderSettings(
            fitMode = ComicFitMode.FIT_WIDTH,
            viewMode = ComicViewMode.TWO_PAGE,
            scrollMode = ComicScrollMode.LONG_STRIP,
            direction = ComicDirection.RTL,
            spreadAlignment = ComicSpreadAlignment.SHIFTED,
            widePageSingletonMode = ComicWidePageMode.DISABLE,
            bgColor = ComicBgColor.GRAY,
        )
        val json = settings.toSyncJson()
        assertEquals("fit-width", (json["fitMode"] as kotlinx.serialization.json.JsonPrimitive).content)
        assertEquals("two-page", (json["viewMode"] as kotlinx.serialization.json.JsonPrimitive).content)
        assertEquals("long-strip", (json["scrollMode"] as kotlinx.serialization.json.JsonPrimitive).content)
        assertEquals("rtl", (json["direction"] as kotlinx.serialization.json.JsonPrimitive).content)
        assertEquals("shifted", (json["spreadAlignment"] as kotlinx.serialization.json.JsonPrimitive).content)
        assertEquals("disable", (json["widePageSingletonMode"] as kotlinx.serialization.json.JsonPrimitive).content)
        assertEquals("gray", (json["bgColor"] as kotlinx.serialization.json.JsonPrimitive).content)
    }

    @Test
    fun `fromSyncJson round-trips through toSyncJson`() {
        val original = ComicReaderSettings(
            fitMode = ComicFitMode.ACTUAL,
            viewMode = ComicViewMode.TWO_PAGE,
            scrollMode = ComicScrollMode.INFINITE,
            direction = ComicDirection.RTL,
            spreadAlignment = ComicSpreadAlignment.SHIFTED,
            spreadGap = 8,
            forceTwoPage = true,
            widePageSingletonMode = ComicWidePageMode.DISABLE,
            bgColor = ComicBgColor.WHITE,
            autoAdvance = true,
            trueBlack = true,
            keepScreenOn = true,
        )
        val restored = fromSyncJson(ComicReaderSettings(), original.toSyncJson())
        // App-only fields never round-trip through the sync payload - they stay at base's values.
        assertEquals(original.copy(trueBlack = false, keepScreenOn = false), restored)
    }

    @Test
    fun `fromSyncJson ignores unknown and malformed keys without crashing`() {
        val base = ComicReaderSettings()
        val restored = fromSyncJson(
            base,
            mapOf(
                "fitMode" to kotlinx.serialization.json.JsonPrimitive("not-a-real-value"),
                "someAppOnlyKeyFromTheFuture" to kotlinx.serialization.json.JsonPrimitive("x"),
                "spreadGap" to kotlinx.serialization.json.JsonPrimitive("not-a-number"),
            ),
        )
        assertEquals(base, restored)
    }

    @Test
    fun `shouldSyncToServer requires both the flag on and Global scope`() {
        assertTrue(shouldSyncToServer(syncReaderPreferencesEnabled = true, scope = ReaderSettingsScope.GLOBAL))
        assertFalse(shouldSyncToServer(syncReaderPreferencesEnabled = false, scope = ReaderSettingsScope.GLOBAL))
        assertFalse(shouldSyncToServer(syncReaderPreferencesEnabled = true, scope = ReaderSettingsScope.THIS_BOOK))
        assertFalse(shouldSyncToServer(syncReaderPreferencesEnabled = false, scope = ReaderSettingsScope.THIS_BOOK))
    }
}
