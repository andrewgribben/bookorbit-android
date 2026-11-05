package com.bookorbit.feature.dashboard

import com.bookorbit.core.auth.SessionManager
import com.bookorbit.core.model.AuthUser
import com.bookorbit.core.model.MeSettingsResponse
import com.bookorbit.core.model.ScrollerType
import com.bookorbit.core.network.ApiService
import io.mockk.coEvery
import io.mockk.every
import io.mockk.mockk
import io.mockk.slot
import io.mockk.verify
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import kotlinx.coroutines.test.runTest
import org.junit.Test

class DashboardShelfConfigRepositoryTest {

    private fun userWithConfig(config: JsonObject?): AuthUser {
        val settings = config?.let { buildJsonObject { put("dashboardShelfConfig", it) } }
        return AuthUser(id = 1, username = "a", settings = settings)
    }

    @Test
    fun `no signed-in user falls back to app defaults`() = runTest {
        val api = mockk<ApiService>()
        val session = mockk<SessionManager>()
        every { session.currentUser } returns null
        val repo = DashboardShelfConfigRepository(api, session)
        assertEquals(5, repo.shelves().size)
    }

    @Test
    fun `reads the signed-in user's stored scrollers when the server can't be reached`() = runTest {
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
        val repo = DashboardShelfConfigRepository(api, session)
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
        val repo = DashboardShelfConfigRepository(api, session)

        assertEquals(listOf("smart-scope"), repo.shelves().map { it.type })
        verify { session.updateCurrentUser(fresh) }
    }

    @Test
    fun `save sends the merged settings and updates the session`() = kotlinx.coroutines.test.runTest {
        val api = mockk<ApiService>()
        val session = mockk<SessionManager>()
        val user = userWithConfig(null)
        every { session.currentUser } returns user
        val bodySlot = slot<com.bookorbit.core.model.UpdateMeSettingsRequest>()
        coEvery { api.updateMySettings(capture(bodySlot)) } returns MeSettingsResponse(id = 1, settings = buildJsonObject { put("dashboardShelfConfig", JsonPrimitive("merged-placeholder")) })
        every { session.updateCurrentUser(any()) } returns Unit

        val repo = DashboardShelfConfigRepository(api, session)
        val result = repo.save(DashboardShelfConfigFixtures.DEFAULT)

        assertTrue(result.isSuccess)
        assertTrue(bodySlot.captured.settings.containsKey("dashboardShelfConfig"))
        verify { session.updateCurrentUser(any()) }
    }

    @Test
    fun `save failure is reported as a Result, not thrown`() = kotlinx.coroutines.test.runTest {
        val api = mockk<ApiService>()
        val session = mockk<SessionManager>()
        every { session.currentUser } returns userWithConfig(null)
        coEvery { api.updateMySettings(any()) } throws java.io.IOException("offline")

        val repo = DashboardShelfConfigRepository(api, session)
        val result = repo.save(DashboardShelfConfigFixtures.DEFAULT)

        assertTrue(result.isFailure)
    }
}

/** Shared fixture so repository tests don't depend on [com.bookorbit.core.model.DashboardShelfConfig]'s
 * exact default content. */
private object DashboardShelfConfigFixtures {
    val DEFAULT = com.bookorbit.core.model.DashboardShelfConfig.DEFAULT_ENTRIES
}
