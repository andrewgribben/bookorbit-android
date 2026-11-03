package com.bookorbit.feature.reader.comic

import com.bookorbit.core.auth.SessionManager
import com.bookorbit.core.model.AuthUser
import com.bookorbit.core.model.UpsertReaderSettings
import com.bookorbit.core.network.ApiService
import io.mockk.coEvery
import io.mockk.coVerify
import io.mockk.every
import io.mockk.mockk
import kotlinx.coroutines.test.runTest
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test

class ComicReaderPreferencesRepositoryTest {

    private lateinit var api: ApiService
    private lateinit var session: SessionManager
    private lateinit var store: ComicReaderSettingsStore
    private lateinit var repo: ComicReaderPreferencesRepository

    private fun userWithSync(enabled: Boolean) =
        AuthUser(1, "reader", settings = JsonObject(mapOf("syncReaderPreferences" to JsonPrimitive(enabled))))

    @Before
    fun setUp() {
        api = mockk()
        session = mockk()
        store = mockk(relaxed = true)
        repo = ComicReaderPreferencesRepository(api, session, store)
    }

    @Test
    fun `syncEnabled reads the signed-in user's server-side setting`() {
        every { session.currentUser } returns userWithSync(true)
        assertTrue(repo.syncEnabled())

        every { session.currentUser } returns userWithSync(false)
        assertFalse(repo.syncEnabled())

        every { session.currentUser } returns null
        assertFalse(repo.syncEnabled())
    }

    @Test
    fun `loadGlobalEffective returns the local copy untouched when sync is off`() = runTest {
        every { session.currentUser } returns userWithSync(false)
        coEvery { store.loadGlobal() } returns ComicReaderSettings(fitMode = ComicFitMode.FIT_WIDTH)

        val result = repo.loadGlobalEffective()

        assertEquals(ComicFitMode.FIT_WIDTH, result.fitMode)
        coVerify(exactly = 0) { api.getReaderDefaults() }
    }

    @Test
    fun `loadGlobalEffective merges the server's cbx default on top of local and saves it`() = runTest {
        every { session.currentUser } returns userWithSync(true)
        coEvery { store.loadGlobal() } returns ComicReaderSettings()
        coEvery { api.getReaderDefaults() } returns JsonObject(
            mapOf("cbx" to JsonObject(mapOf("fitMode" to JsonPrimitive("fit-height"), "bgColor" to JsonPrimitive("white")))),
        )

        val result = repo.loadGlobalEffective()

        assertEquals(ComicFitMode.FIT_HEIGHT, result.fitMode)
        assertEquals(ComicBgColor.WHITE, result.bgColor)
        coVerify { store.saveGlobal(result) }
    }

    @Test
    fun `loadGlobalEffective falls back to local when the server call fails`() = runTest {
        every { session.currentUser } returns userWithSync(true)
        val local = ComicReaderSettings(fitMode = ComicFitMode.ACTUAL)
        coEvery { store.loadGlobal() } returns local
        coEvery { api.getReaderDefaults() } throws RuntimeException("offline")

        assertEquals(local, repo.loadGlobalEffective())
    }

    @Test
    fun `saveGlobalDefault always saves locally and pushes to the server only when sync is on`() = runTest {
        every { session.currentUser } returns userWithSync(true)
        coEvery { api.putReaderDefault(any(), any()) } returns Unit
        val settings = ComicReaderSettings(bgColor = ComicBgColor.GRAY)

        repo.saveGlobalDefault(settings)

        coVerify { store.saveGlobal(settings) }
        coVerify { api.putReaderDefault("cbx", UpsertReaderSettings(JsonObject(settings.toSyncJson()))) }
    }

    @Test
    fun `saveGlobalDefault never calls the server when sync is off`() = runTest {
        every { session.currentUser } returns userWithSync(false)
        val settings = ComicReaderSettings()

        repo.saveGlobalDefault(settings)

        coVerify { store.saveGlobal(settings) }
        coVerify(exactly = 0) { api.putReaderDefault(any(), any()) }
    }

    @Test
    fun `saveGlobalDefault swallows a failed server push`() = runTest {
        every { session.currentUser } returns userWithSync(true)
        coEvery { api.putReaderDefault(any(), any()) } throws RuntimeException("offline")

        repo.saveGlobalDefault(ComicReaderSettings())

        coVerify { store.saveGlobal(any()) }
    }

    @Test
    fun `restoreGlobalBuiltIn always resets locally and clears the server default only when sync is on`() = runTest {
        every { session.currentUser } returns userWithSync(true)
        coEvery { api.deleteReaderDefault(any()) } returns Unit

        repo.restoreGlobalBuiltIn()

        coVerify { store.restoreGlobalBuiltIn() }
        coVerify { api.deleteReaderDefault("cbx") }
    }

    @Test
    fun `restoreGlobalBuiltIn never calls the server when sync is off`() = runTest {
        every { session.currentUser } returns userWithSync(false)

        repo.restoreGlobalBuiltIn()

        coVerify { store.restoreGlobalBuiltIn() }
        coVerify(exactly = 0) { api.deleteReaderDefault(any()) }
    }

    @Test
    fun `restoreGlobalBuiltIn swallows a failed server delete`() = runTest {
        every { session.currentUser } returns userWithSync(true)
        coEvery { api.deleteReaderDefault(any()) } throws RuntimeException("offline")

        repo.restoreGlobalBuiltIn()

        coVerify { store.restoreGlobalBuiltIn() }
    }
}
