package com.bookorbit.core.model

import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Test

class DashboardShelfConfigExternalShelvesTest {

    private fun config(json: String): JsonObject = Json.parseToJsonElement(json) as JsonObject

    @Test
    fun `missing externalShelves key returns null, not an empty list`() {
        assertNull(DashboardShelfConfig.parseExternalShelves(config("""{"scrollers": []}""")))
    }

    @Test
    fun `null configJson returns null`() {
        assertNull(DashboardShelfConfig.parseExternalShelves(null))
    }

    @Test
    fun `an explicitly empty array is readable and returns an empty list`() {
        val result = DashboardShelfConfig.parseExternalShelves(config("""{"externalShelves": []}"""))
        assertEquals(emptyList<ExternalShelfConfig>(), result)
    }

    @Test
    fun `entries are parsed and sorted by order`() {
        val result = DashboardShelfConfig.parseExternalShelves(
            config(
                """
                {
                  "externalShelves": [
                    {"provider": "hardcover", "shelf": "trending", "enabled": true, "order": 2},
                    {"provider": "readwise", "shelf": "owned-elsewhere", "enabled": false, "order": 1}
                  ]
                }
                """.trimIndent(),
            ),
        )
        assertEquals(
            listOf(
                ExternalShelfConfig("readwise", "owned-elsewhere", false, 1),
                ExternalShelfConfig("hardcover", "trending", true, 2),
            ),
            result,
        )
    }

    @Test
    fun `an entry missing provider or shelf is dropped`() {
        val result = DashboardShelfConfig.parseExternalShelves(
            config(
                """
                {
                  "externalShelves": [
                    {"shelf": "trending", "enabled": true, "order": 1},
                    {"provider": "hardcover", "enabled": true, "order": 2},
                    {"provider": "readwise", "shelf": "owned-elsewhere", "enabled": true, "order": 3}
                  ]
                }
                """.trimIndent(),
            ),
        )
        assertEquals(listOf(ExternalShelfConfig("readwise", "owned-elsewhere", true, 3)), result)
    }

    @Test
    fun `missing enabled and order default to true and list position`() {
        val result = DashboardShelfConfig.parseExternalShelves(
            config("""{"externalShelves": [{"provider": "readwise", "shelf": "owned-elsewhere"}]}"""),
        )
        assertEquals(listOf(ExternalShelfConfig("readwise", "owned-elsewhere", true, 1)), result)
    }
}
