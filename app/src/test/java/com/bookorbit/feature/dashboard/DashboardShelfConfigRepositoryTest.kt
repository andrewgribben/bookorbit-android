package com.bookorbit.feature.dashboard

import com.bookorbit.core.auth.SessionManager
import com.bookorbit.core.model.AuthUser
import com.bookorbit.core.model.DashboardShelfRow
import com.bookorbit.core.model.ExternalShelfConfig
import com.bookorbit.core.model.MeSettingsResponse
import com.bookorbit.core.model.ReadingServiceAvailableShelf
import com.bookorbit.core.model.ScrollerType
import com.bookorbit.core.model.ShelfConfigEntry
import com.bookorbit.core.network.ApiService
import com.bookorbit.core.network.ReadingServicesRepository
import io.mockk.coEvery
import io.mockk.coVerify
import io.mockk.every
import io.mockk.mockk
import io.mockk.slot
import io.mockk.verify
import kotlinx.coroutines.test.runTest
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

class DashboardShelfConfigRepositoryTest {

    private fun userWithConfig(config: JsonObject?): AuthUser {
        val settings = config?.let { buildJsonObject { put("dashboardShelfConfig", it) } }
        return AuthUser(id = 1, username = "a", settings = settings)
    }

    /** A disabled-by-default local layout store stub, so existing server-sync tests do not need
     * to know about the new per-device layout. */
    private fun localLayoutStoreStub(): DashboardLocalLayoutStore {
        val store = mockk<DashboardLocalLayoutStore>()
        coEvery { store.isEnabled(any(), any()) } returns false
        coEvery { store.loadRows(any(), any()) } returns null
        coEvery { store.hasExternalShelvesKey(any(), any()) } returns false
        coEvery { store.saveRows(any(), any(), any()) } returns Unit
        coEvery { store.setEnabled(any(), any(), any()) } returns Unit
        return store
    }

    private fun readingServicesRepoStub(available: List<ReadingServiceAvailableShelf> = emptyList()): ReadingServicesRepository {
        val repo = mockk<ReadingServicesRepository>()
        coEvery { repo.availableShelves() } returns available
        return repo
    }

    @Test
    fun `no signed-in user falls back to app defaults`() = runTest {
        val api = mockk<ApiService>()
        val session = mockk<SessionManager>()
        every { session.currentUser } returns null
        every { session.serverUrl } returns null
        val repo = DashboardShelfConfigRepository(api, session, localLayoutStoreStub(), readingServicesRepoStub())
        assertEquals(5, repo.shelves().size)
    }

    @Test
    fun `reads the signed-in users stored scrollers when the server cannot be reached`() = runTest {
        val config = buildJsonObject {
            put(
                "scrollers",
                JsonArray(
                    listOf(
                        buildJsonObject {
                            put("id", "1"); put("type", ScrollerType.RECENTLY_ADDED); put("label", "")
                            put("enabled", true); put("order", 1); put("limit", 20)
                        },
                    ),
                ),
            )
        }
        val api = mockk<ApiService>()
        coEvery { api.getMe() } throws RuntimeException("offline")
        val session = mockk<SessionManager>()
        every { session.currentUser } returns userWithConfig(config)
        every { session.serverUrl } returns null
        val repo = DashboardShelfConfigRepository(api, session, localLayoutStoreStub(), readingServicesRepoStub())
        assertEquals(listOf(ScrollerType.RECENTLY_ADDED), repo.shelves().map { it.type })
    }

    @Test
    fun `picks up shelves changed on the server since sign-in`() = runTest {
        fun config(type: String) = buildJsonObject {
            put("scrollers", JsonArray(listOf(buildJsonObject { put("id", "1"); put("type", type); put("enabled", true); put("order", 1) })))
        }
        val fresh = userWithConfig(config("smart-scope"))
        val api = mockk<ApiService>()
        coEvery { api.getMe() } returns fresh
        val session = mockk<SessionManager>(relaxed = true)
        every { session.currentUser } returnsMany listOf(userWithConfig(config(ScrollerType.RECENTLY_ADDED)), fresh)
        every { session.serverUrl } returns null
        val repo = DashboardShelfConfigRepository(api, session, localLayoutStoreStub(), readingServicesRepoStub())

        assertEquals(listOf("smart-scope"), repo.shelves().map { it.type })
        verify { session.updateCurrentUser(fresh) }
    }

    @Test
    fun `save sends the merged settings and updates the session`() = runTest {
        val api = mockk<ApiService>()
        val session = mockk<SessionManager>()
        val user = userWithConfig(null)
        every { session.currentUser } returns user
        every { session.serverUrl } returns null
        val bodySlot = slot<com.bookorbit.core.model.UpdateMeSettingsRequest>()
        coEvery { api.getMe() } returns user
        coEvery { api.updateMySettings(capture(bodySlot)) } returns MeSettingsResponse(id = 1, settings = buildJsonObject { put("dashboardShelfConfig", JsonPrimitive("merged-placeholder")) })
        every { session.updateCurrentUser(any()) } returns Unit

        val repo = DashboardShelfConfigRepository(api, session, localLayoutStoreStub(), readingServicesRepoStub())
        val rows = DashboardShelfConfigFixtures.DEFAULT.map { DashboardShelfRow.Scroller(it) }
        val result = repo.save(rows)

        assertTrue(result.isSuccess)
        assertTrue(bodySlot.captured.settings.containsKey("dashboardShelfConfig"))
        verify { session.updateCurrentUser(any()) }
    }

    @Test
    fun `save preserves unrelated dashboardShelfConfig keys`() = runTest {
        val config = buildJsonObject {
            put("syncAcrossSessions", true)
            put("shelfLayout", "two-columns")
            put("scrollers", JsonArray(emptyList()))
        }
        val api = mockk<ApiService>()
        val session = mockk<SessionManager>()
        val user = userWithConfig(config)
        every { session.currentUser } returns user
        every { session.serverUrl } returns null
        coEvery { api.getMe() } returns user
        val bodySlot = slot<com.bookorbit.core.model.UpdateMeSettingsRequest>()
        coEvery { api.updateMySettings(capture(bodySlot)) } returns MeSettingsResponse(id = 1, settings = null)
        every { session.updateCurrentUser(any()) } returns Unit

        val repo = DashboardShelfConfigRepository(api, session, localLayoutStoreStub(), readingServicesRepoStub())
        repo.save(DashboardShelfConfigFixtures.DEFAULT.map { DashboardShelfRow.Scroller(it) })

        val written = bodySlot.captured.settings["dashboardShelfConfig"] as JsonObject
        assertEquals(JsonPrimitive(true), written["syncAcrossSessions"])
        assertEquals(JsonPrimitive("two-columns"), written["shelfLayout"])
        assertEquals(JsonPrimitive(2), written["shelfOrderVersion"])
    }

    @Test
    fun `save renumbers scrollers and external shelves onto one shared sequence`() = runTest {
        val config = buildJsonObject {
            put(
                "scrollers",
                JsonArray(
                    listOf(
                        buildJsonObject { put("id", "1"); put("type", ScrollerType.RECENTLY_ADDED); put("enabled", true); put("order", 1) },
                    ),
                ),
            )
            put(
                "externalShelves",
                JsonArray(listOf(buildJsonObject { put("provider", "readwise"); put("shelf", "owned-elsewhere"); put("enabled", true); put("order", 2) })),
            )
        }
        val api = mockk<ApiService>()
        val session = mockk<SessionManager>()
        val user = userWithConfig(config)
        every { session.currentUser } returns user
        every { session.serverUrl } returns null
        coEvery { api.getMe() } returns user
        val bodySlot = slot<com.bookorbit.core.model.UpdateMeSettingsRequest>()
        coEvery { api.updateMySettings(capture(bodySlot)) } returns MeSettingsResponse(id = 1, settings = null)
        every { session.updateCurrentUser(any()) } returns Unit

        val repo = DashboardShelfConfigRepository(api, session, localLayoutStoreStub(), readingServicesRepoStub())
        val rows = listOf(
            DashboardShelfRow.External(ExternalShelfConfig("readwise", "owned-elsewhere", true, 1)),
            DashboardShelfRow.Scroller(ShelfConfigEntry("1", ScrollerType.RECENTLY_ADDED, "", true, 2)),
        )
        repo.save(rows)

        val written = bodySlot.captured.settings["dashboardShelfConfig"] as JsonObject
        val scrollers = (written["scrollers"] as JsonArray).map { it as JsonObject }
        val externals = (written["externalShelves"] as JsonArray).map { it as JsonObject }
        assertEquals(JsonPrimitive(2), scrollers.single()["order"])
        assertEquals(JsonPrimitive(1), externals.single()["order"])
    }

    @Test
    fun `save failure is reported as a Result, not thrown`() = runTest {
        val api = mockk<ApiService>()
        val session = mockk<SessionManager>()
        val user = userWithConfig(null)
        every { session.currentUser } returns user
        every { session.serverUrl } returns null
        coEvery { api.getMe() } returns user
        coEvery { api.updateMySettings(any()) } throws java.io.IOException("offline")

        val repo = DashboardShelfConfigRepository(api, session, localLayoutStoreStub(), readingServicesRepoStub())
        val result = repo.save(DashboardShelfConfigFixtures.DEFAULT.map { DashboardShelfRow.Scroller(it) })

        assertTrue(result.isFailure)
    }

    @Test
    fun `save while the local layout is on only writes locally, no API call`() = runTest {
        val api = mockk<ApiService>()
        val session = mockk<SessionManager>()
        every { session.currentUser } returns userWithConfig(null)
        every { session.serverUrl } returns "https://example.com"
        val localStore = mockk<DashboardLocalLayoutStore>()
        coEvery { localStore.isEnabled(1, "https://example.com") } returns true
        coEvery { localStore.saveRows(1, "https://example.com", any()) } returns Unit

        val repo = DashboardShelfConfigRepository(api, session, localStore, readingServicesRepoStub())
        val result = repo.save(DashboardShelfConfigFixtures.DEFAULT.map { DashboardShelfRow.Scroller(it) })

        assertTrue(result.isSuccess)
        coVerify(exactly = 0) { api.updateMySettings(any()) }
        coVerify { localStore.saveRows(1, "https://example.com", any()) }
    }

    @Test
    fun `turning the local layout off falls back to reading the server list`() = runTest {
        val config = buildJsonObject {
            put("scrollers", JsonArray(listOf(buildJsonObject { put("id", "1"); put("type", ScrollerType.RECENTLY_ADDED); put("enabled", true); put("order", 1) })))
        }
        val api = mockk<ApiService>()
        val user = userWithConfig(config)
        coEvery { api.getMe() } throws RuntimeException("offline")
        val session = mockk<SessionManager>()
        every { session.currentUser } returns user
        every { session.serverUrl } returns "https://example.com"
        val localStore = mockk<DashboardLocalLayoutStore>()
        coEvery { localStore.isEnabled(1, "https://example.com") } returns false

        val repo = DashboardShelfConfigRepository(api, session, localStore, readingServicesRepoStub())
        assertEquals(listOf(ScrollerType.RECENTLY_ADDED), repo.shelves().map { it.type })
    }

    @Test
    fun `rowsForEditing appends available shelves not yet persisted, disabled`() = runTest {
        val config = buildJsonObject { put("scrollers", JsonArray(emptyList())) }
        val api = mockk<ApiService>()
        val user = userWithConfig(config)
        coEvery { api.getMe() } returns user
        val session = mockk<SessionManager>()
        every { session.currentUser } returns user
        every { session.serverUrl } returns null
        every { session.updateCurrentUser(any()) } returns Unit
        val available = listOf(ReadingServiceAvailableShelf(provider = "readwise", shelf = "owned-elsewhere", connected = true))

        val repo = DashboardShelfConfigRepository(api, session, localLayoutStoreStub(), readingServicesRepoStub(available))
        val rows = repo.rowsForEditing()

        val external = rows.filterIsInstance<DashboardShelfRow.External>().single()
        assertEquals("readwise", external.entry.provider)
        assertEquals(false, external.enabled)
    }

    @Test
    fun `rowsForEditing in local mode merges local rows and appends available shelves`() = runTest {
        val config = buildJsonObject { put("scrollers", JsonArray(emptyList())) }
        val api = mockk<ApiService>()
        val user = userWithConfig(config)
        coEvery { api.getMe() } returns user
        val session = mockk<SessionManager>()
        every { session.currentUser } returns user
        every { session.serverUrl } returns "https://example.com"
        every { session.updateCurrentUser(any()) } returns Unit
        val localStore = mockk<DashboardLocalLayoutStore>()
        coEvery { localStore.isEnabled(1, "https://example.com") } returns true
        val localRows = listOf(DashboardShelfRow.External(ExternalShelfConfig("readwise", "owned-elsewhere", true, 1)))
        coEvery { localStore.loadRows(1, "https://example.com") } returns localRows
        coEvery { localStore.saveRows(any(), any(), any()) } returns Unit
        val available = listOf(
            ReadingServiceAvailableShelf(provider = "readwise", shelf = "owned-elsewhere", connected = true),
            ReadingServiceAvailableShelf(provider = "hardcover", shelf = "trending", connected = true),
        )

        val repo = DashboardShelfConfigRepository(api, session, localStore, readingServicesRepoStub(available))
        val rows = repo.rowsForEditing()

        assertEquals(2, rows.filterIsInstance<DashboardShelfRow.External>().size)
        assertTrue(rows.any { it.key == "external:hardcover:trending" && !it.enabled })
    }
}

/** Shared fixture so repository tests do not depend on [com.bookorbit.core.model.DashboardShelfConfig]s
 * exact default content. */
private object DashboardShelfConfigFixtures {
    val DEFAULT = com.bookorbit.core.model.DashboardShelfConfig.DEFAULT_ENTRIES
}
