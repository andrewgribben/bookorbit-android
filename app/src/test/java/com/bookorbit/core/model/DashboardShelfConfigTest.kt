package com.bookorbit.core.model

import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

class DashboardShelfConfigTest {

    private fun scroller(
        type: String = ScrollerType.RECENTLY_ADDED,
        id: String = "1",
        enabled: Boolean = true,
        order: Int = 1,
        extraKey: String? = null,
        extraValue: String = "x",
    ) = buildJsonObject {
        put("id", id)
        put("type", type)
        put("label", "")
        put("enabled", enabled)
        put("order", order)
        put("limit", 20)
        if (extraKey != null) put(extraKey, extraValue)
    }

    @Test
    fun `missing config falls back to the app defaults, everything on`() {
        val entries = DashboardShelfConfig.parse(null)
        assertEquals(DashboardShelfConfig.DEFAULT_ENTRIES.map { it.type }, entries.map { it.type })
        assertTrue(entries.all { it.enabled })
    }

    @Test
    fun `an empty scrollers array also falls back to defaults`() {
        val config = buildJsonObject { put("scrollers", JsonArray(emptyList())) }
        val entries = DashboardShelfConfig.parse(config)
        assertEquals(DashboardShelfConfig.DEFAULT_ENTRIES.map { it.type }, entries.map { it.type })
    }

    @Test
    fun `server order and enabled flags are respected`() {
        val config = buildJsonObject {
            put(
                "scrollers",
                JsonArray(
                    listOf(
                        scroller(type = ScrollerType.WANT_TO_READ, id = "a", order = 2, enabled = false),
                        scroller(type = ScrollerType.RECENTLY_ADDED, id = "b", order = 1, enabled = true),
                    ),
                ),
            )
        }
        val entries = DashboardShelfConfig.ordered(DashboardShelfConfig.parse(config))
        assertEquals(listOf(ScrollerType.RECENTLY_ADDED, ScrollerType.WANT_TO_READ), entries.map { it.type })
        assertEquals(false, entries.last { it.type == ScrollerType.WANT_TO_READ }.enabled)
    }

    @Test
    fun `a shelf type the app doesn't know about is kept, not dropped`() {
        val config = buildJsonObject {
            put("scrollers", JsonArray(listOf(scroller(type = "future-type", id = "f", order = 1))))
        }
        val entries = DashboardShelfConfig.parse(config)
        assertEquals(1, entries.size)
        assertEquals("future-type", entries.single().type)
    }

    @Test
    fun `an entry with no type is dropped`() {
        val config = buildJsonObject {
            put(
                "scrollers",
                JsonArray(
                    listOf(
                        buildJsonObject { put("id", "no-type"); put("enabled", true); put("order", 1) },
                        scroller(type = ScrollerType.RECENTLY_ADDED, id = "ok", order = 2),
                    ),
                ),
            )
        }
        val entries = DashboardShelfConfig.parse(config)
        assertEquals(listOf(ScrollerType.RECENTLY_ADDED), entries.map { it.type })
    }

    @Test
    fun `toggled flips only the matching entry`() {
        val entries = DashboardShelfConfig.DEFAULT_ENTRIES
        val target = entries.first()
        val toggled = DashboardShelfConfig.toggled(entries, target.id)
        assertEquals(!target.enabled, toggled.first { it.id == target.id }.enabled)
        assertEquals(entries.drop(1).map { it.enabled }, toggled.drop(1).map { it.enabled })
    }

    @Test
    fun `moved swaps order with the neighbour and renumbers`() {
        val entries = DashboardShelfConfig.ordered(DashboardShelfConfig.DEFAULT_ENTRIES)
        val second = entries[1].type
        val moved = DashboardShelfConfig.moved(entries, 1, -1)
        assertEquals(second, moved.first().type)
        assertEquals((1..entries.size).toList(), moved.map { it.order })
    }

    @Test
    fun `moved out of range is a no-op`() {
        val entries = DashboardShelfConfig.DEFAULT_ENTRIES
        assertEquals(entries, DashboardShelfConfig.moved(entries, 0, -1))
        assertEquals(entries, DashboardShelfConfig.moved(entries, entries.lastIndex, 1))
    }

    @Test
    fun `write-back preserves unknown top-level and per-scroller fields`() {
        val original = buildJsonObject {
            put("syncAcrossSessions", true)
            put("shelfLayout", "two-columns")
            put("futureTopLevelField", "kept")
            put(
                "scrollers",
                JsonArray(
                    listOf(scroller(type = ScrollerType.RECENTLY_ADDED, id = "1", order = 1, extraKey = "color", extraValue = "teal")),
                ),
            )
        }
        val entries = DashboardShelfConfig.toggled(DashboardShelfConfig.parse(original), "1")
        val rebuilt = DashboardShelfConfig.buildConfigJson(original, entries)

        assertEquals(JsonPrimitive(true), rebuilt["syncAcrossSessions"])
        assertEquals(JsonPrimitive("two-columns"), rebuilt["shelfLayout"])
        assertEquals(JsonPrimitive("kept"), rebuilt["futureTopLevelField"])

        val rebuiltScroller = (rebuilt["scrollers"] as JsonArray).single().let { it as kotlinx.serialization.json.JsonObject }
        assertEquals(JsonPrimitive("teal"), rebuiltScroller["color"])
        assertEquals(JsonPrimitive(false), rebuiltScroller["enabled"]) // toggled from true
    }

    @Test
    fun `write-back with no original config still emits scrollers`() {
        val rebuilt = DashboardShelfConfig.buildConfigJson(null, DashboardShelfConfig.DEFAULT_ENTRIES)
        assertNull(rebuilt["syncAcrossSessions"])
        assertEquals(DashboardShelfConfig.DEFAULT_ENTRIES.size, (rebuilt["scrollers"] as JsonArray).size)
    }

    @Test
    fun `mergedForSave keeps shelves added elsewhere and drops ones deleted elsewhere`() {
        fun e(id: String, order: Int, enabled: Boolean = true) = ShelfConfigEntry(id, "t$id", "", enabled, order)
        val server = listOf(e("1", 1), e("2", 2), e("4", 3)) // 3 deleted on web, 4 added on web
        val edited = listOf(e("2", 1), e("1", 2, enabled = false), e("3", 3))

        val merged = DashboardShelfConfig.mergedForSave(server, edited)

        assertEquals(listOf("2", "1", "4"), merged.map { it.id })
        assertEquals(listOf(1, 2, 3), merged.map { it.order })
        assertEquals(false, merged[1].enabled)
    }

    @Test
    fun `mergedWithLocalLayout keeps local order and enabled for known shelves`() {
        fun e(id: String, order: Int, enabled: Boolean = true) = ShelfConfigEntry(id, "t$id", "", enabled, order)
        val server = listOf(e("1", 1), e("2", 2))
        val local = listOf(e("2", 1), e("1", 2, enabled = false))

        val merged = DashboardShelfConfig.mergedWithLocalLayout(server, local)

        assertEquals(listOf("2", "1"), merged.map { it.id })
        assertEquals(listOf(1, 2), merged.map { it.order })
        assertEquals(false, merged.single { it.id == "1" }.enabled)
    }

    @Test
    fun `mergedWithLocalLayout appends a new server shelf at the end with the server's enabled value`() {
        fun e(id: String, order: Int, enabled: Boolean = true) = ShelfConfigEntry(id, "t$id", "", enabled, order)
        val server = listOf(e("1", 1), e("2", 2, enabled = false))
        val local = listOf(e("1", 1))

        val merged = DashboardShelfConfig.mergedWithLocalLayout(server, local)

        assertEquals(listOf("1", "2"), merged.map { it.id })
        assertEquals(false, merged.single { it.id == "2" }.enabled)
    }

    @Test
    fun `mergedWithLocalLayout drops a shelf deleted on the server`() {
        fun e(id: String, order: Int, enabled: Boolean = true) = ShelfConfigEntry(id, "t$id", "", enabled, order)
        val server = listOf(e("1", 1))
        val local = listOf(e("1", 1), e("2", 2))

        val merged = DashboardShelfConfig.mergedWithLocalLayout(server, local)

        assertEquals(listOf("1"), merged.map { it.id })
    }
}
