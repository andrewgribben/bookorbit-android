package com.bookorbit.feature.reader.comic

import com.bookorbit.core.auth.SessionManager
import com.bookorbit.core.model.UpsertReaderSettings
import com.bookorbit.core.model.syncReaderPreferences
import com.bookorbit.core.network.ApiService
import kotlinx.serialization.json.JsonObject
import javax.inject.Inject
import javax.inject.Singleton

/** The server's format-group key for comic settings (`ReaderFormatGroup` "cbx" on the server -
 * not "cbz": the server groups CBZ/CBR/CB7 under one `cbx` settings bucket). */
private const val CBX_FORMAT_GROUP = "cbx"

/**
 * Syncs the comic reader's *Global* settings with the server's
 * `GET/PUT/DELETE /api/v1/reader/defaults(/cbx)`, mirroring the web's `useReaderDefaultSettings`
 * (`useReaderSettings.ts`): pull on open when the user's server-side `syncReaderPreferences`
 * setting is on, push on Save as default, clear on Restore built-in - every call swallows
 * failures (offline-friendly, matching the web's `.catch(() => {})`), and the local
 * [ComicReaderSettingsStore] copy is always written regardless of sync.
 *
 * Only Global syncs (owner decision 3). This-book overrides and app-only fields
 * ([ComicReaderSettings.trueBlack], [ComicReaderSettings.keepScreenOn]) never leave the device.
 */
@Singleton
class ComicReaderPreferencesRepository @Inject constructor(
    private val api: ApiService,
    private val session: SessionManager,
    private val store: ComicReaderSettingsStore,
) {
    /** Whether the signed-in user has turned on "sync reader preferences" server-side. */
    fun syncEnabled(): Boolean = session.currentUser?.syncReaderPreferences ?: false

    /**
     * On opening the comic reader (or the settings sheet) in Global scope: if sync is on, pull the
     * server's `cbx` default and apply it on top of the local Global settings, persisting the
     * merged result locally; otherwise just return what's stored locally. Never throws.
     */
    suspend fun loadGlobalEffective(): ComicReaderSettings {
        val local = store.loadGlobal()
        if (!syncEnabled()) return local
        val serverCbx = fetchServerCbxDefaults() ?: return local
        val merged = fromSyncJson(local, serverCbx)
        store.saveGlobal(merged)
        return merged
    }

    /** Raw `cbx` key of `GET /reader/defaults`, or null on any failure/absence. */
    private suspend fun fetchServerCbxDefaults(): Map<String, kotlinx.serialization.json.JsonElement>? =
        runCatching { api.getReaderDefaults() }.getOrNull()?.get(CBX_FORMAT_GROUP)
            ?.let { it as? JsonObject }

    /** "Save as default" in Global scope: always saves locally; pushes to the server when sync is on. */
    suspend fun saveGlobalDefault(settings: ComicReaderSettings) {
        store.saveGlobal(settings)
        if (!syncEnabled()) return
        runCatching { api.putReaderDefault(CBX_FORMAT_GROUP, UpsertReaderSettings(JsonObject(settings.toSyncJson()))) }
    }

    /** "Restore built-in" in Global scope: always resets locally; clears the server default when sync is on. */
    suspend fun restoreGlobalBuiltIn() {
        store.restoreGlobalBuiltIn()
        if (!syncEnabled()) return
        runCatching { api.deleteReaderDefault(CBX_FORMAT_GROUP) }
    }
}
