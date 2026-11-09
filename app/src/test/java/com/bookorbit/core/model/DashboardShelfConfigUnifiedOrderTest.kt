package com.bookorbit.core.model

import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

class DashboardShelfConfigUnifiedOrderTest {

    private fun scroller(id: String, order: Int, enabled: Boolean = true, type: String = ScrollerType.RECENTLY_ADDED) =
        buildJsonObject {
            put("id", id)
            put("type", type)
            put("label", "")
            put("enabled", enabled)
            put("order", order)
            put("limit", 20)
        }

    private fun external(provider: String, shelf: String, order: Int, enabled: Boolean = true) = buildJsonObject {
        put("provider", provider)
        put("shelf", shelf)
        put("enabled", enabled)
        put("order", order)
    }

    private fun availableShelf(provider: String, shelf: String) =
        ReadingServiceAvailableShelf(provider = provider, shelf = shelf, connected = true)

    @Test
    fun `legacy config with no shelfOrderVersion orders external shelves before scrollers`() {
        val config = buildJsonObject {
            put("scrollers", JsonArray(listOf(scroller("s1", order = 1), scroller("s2", order = 2))))
            put("externalShelves", JsonArray(listOf(external("readwise", "owned-elsewhere", order = 1))))
        }

        val rows = DashboardShelfConfig.mergedRows(config)

        assertEquals(
            listOf("external:readwise:owned-elsewhere", "scroller:s1", "scroller:s2"),
            rows.map { it.key },
        )
        assertEquals((1..3).toList(), rows.map { it.order })
    }

    @Test
    fun `shelfOrderVersion 2 config honours the one shared order across both arrays`() {
        val config = buildJsonObject {
            put("shelfOrderVersion", 2)
            put("scrollers", JsonArray(listOf(scroller("s1", order = 1), scroller("s2", order = 3))))
            put("externalShelves", JsonArray(listOf(external("readwise", "owned-elsewhere", order = 2))))
        }

        val rows = DashboardShelfConfig.mergedRows(config)

        assertEquals(
            listOf("scroller:s1", "external:readwise:owned-elsewhere", "scroller:s2"),
            rows.map { it.key },
        )
        assertEquals((1..3).toList(), rows.map { it.order })
    }

    @Test
    fun `appendAvailable appends a disabled row for a shelf not yet configured`() {
        val rows = listOf(DashboardShelfRow.Scroller(ShelfConfigEntry("s1", ScrollerType.RECENTLY_ADDED, "", true, 1)))
        val available = listOf(availableShelf("readwise", "owned-elsewhere"), availableShelf("hardcover", "trending"))

        val result = DashboardShelfConfig.appendAvailable(rows, available)

        assertEquals(3, result.size)
        val appended = result.filterIsInstance<DashboardShelfRow.External>()
        assertEquals(2, appended.size)
        assertTrue(appended.all { !it.enabled })
        assertEquals((1..3).toList(), result.map { it.order })
    }

    @Test
    fun `appendAvailable is a no-op when every available shelf is already present`() {
        val rows = listOf(
            DashboardShelfRow.External(ExternalShelfConfig("readwise", "owned-elsewhere", enabled = true, order = 1)),
        )
        val result = DashboardShelfConfig.appendAvailable(rows, listOf(availableShelf("readwise", "owned-elsewhere")))

        assertEquals(rows, result)
    }

    @Test
    fun `movedRow swaps a scroller and an external shelf across the shared order`() {
        val rows = listOf(
            DashboardShelfRow.Scroller(ShelfConfigEntry("s1", ScrollerType.RECENTLY_ADDED, "", true, 1)),
            DashboardShelfRow.External(ExternalShelfConfig("readwise", "owned-elsewhere", true, 2)),
        )

        val moved = DashboardShelfConfig.movedRow(rows, 0, 1)

        assertEquals(listOf("external:readwise:owned-elsewhere", "scroller:s1"), moved.map { it.key })
        assertEquals(listOf(1, 2), moved.map { it.order })
    }

    @Test
    fun `mergedRowsForSave keeps rows added elsewhere and drops rows deleted elsewhere`() {
        val server = listOf(
            DashboardShelfRow.Scroller(ShelfConfigEntry("1", "t1", "", true, 1)),
            DashboardShelfRow.External(ExternalShelfConfig("readwise", "owned-elsewhere", true, 2)),
        )
        val edited = listOf(
            DashboardShelfRow.External(ExternalShelfConfig("readwise", "owned-elsewhere", false, 1)),
        )

        val merged = DashboardShelfConfig.mergedRowsForSave(server, edited)

        assertEquals(listOf("external:readwise:owned-elsewhere", "scroller:1"), merged.map { it.key })
        assertEquals((1..2).toList(), merged.map { it.order })
        assertEquals(false, merged.first().enabled)
    }

    @Test
    fun `mergedRowsWithLocalLayout merges local enabled and order onto server rows`() {
        val server = listOf(
            DashboardShelfRow.Scroller(ShelfConfigEntry("1", "t1", "", true, 1)),
            DashboardShelfRow.External(ExternalShelfConfig("readwise", "owned-elsewhere", true, 2)),
        )
        val local = listOf(
            DashboardShelfRow.External(ExternalShelfConfig("readwise", "owned-elsewhere", false, 1)),
            DashboardShelfRow.Scroller(ShelfConfigEntry("1", "t1", "", true, 2)),
        )

        val merged = DashboardShelfConfig.mergedRowsWithLocalLayout(server, local)

        assertEquals(listOf("external:readwise:owned-elsewhere", "scroller:1"), merged.map { it.key })
        assertEquals(false, merged.first().enabled)
    }

    @Test
    fun `buildConfigJson writes shelfOrderVersion 2 and preserves unrelated keys`() {
        val original = buildJsonObject {
            put("syncAcrossSessions", true)
            put("shelfLayout", "two-columns")
            put("scrollers", JsonArray(listOf(scroller("1", order = 1))))
            put("externalShelves", JsonArray(listOf(external("readwise", "owned-elsewhere", order = 2))))
        }
        val rows = DashboardShelfConfig.mergedRows(original)

        val rebuilt = DashboardShelfConfig.buildConfigJsonForRows(original, rows)

        assertEquals(JsonPrimitive(2), rebuilt["shelfOrderVersion"])
        assertEquals(JsonPrimitive(true), rebuilt["syncAcrossSessions"])
        assertEquals(JsonPrimitive("two-columns"), rebuilt["shelfLayout"])
        assertEquals(1, (rebuilt["scrollers"] as JsonArray).size)
        assertEquals(1, (rebuilt["externalShelves"] as JsonArray).size)
    }

    @Test
    fun `mergedRows with no externalShelves key omits external rows`() {
        val config = buildJsonObject {
            put("scrollers", JsonArray(listOf(scroller("1", order = 1))))
        }
        val rows = DashboardShelfConfig.mergedRows(config)
        assertTrue(rows.none { it is DashboardShelfRow.External })
    }
}
