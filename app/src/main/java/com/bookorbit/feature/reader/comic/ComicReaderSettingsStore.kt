package com.bookorbit.feature.reader.comic

import android.content.Context
import androidx.datastore.preferences.core.booleanPreferencesKey
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import com.bookorbit.feature.reader.ReaderSettingsScope
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.flow.first
import javax.inject.Inject
import javax.inject.Singleton

private val Context.comicReaderDataStore by preferencesDataStore("comic_reader_settings")

/**
 * Persists [ComicReaderSettings] in DataStore, device-only, mirroring
 * `ReaderSettingsStore`'s Global / This-book / saved-default key layout.
 *
 * Server sync (owner decision 3): Global's *synced* fields ([SYNCED_KEYS]) are meant to sync via
 * the server when `syncReaderPreferences` is on, but no such endpoint exists yet in the server
 * reference (`useCbzSettings.ts` itself has no persistence call - see [ComicReaderSettings]'s
 * class doc). This store therefore only persists locally; [shouldSyncToServer] is exposed so a
 * real network call can be wired in later without reworking this store or inventing an endpoint
 * now.
 */
@Singleton
class ComicReaderSettingsStore @Inject constructor(
    @ApplicationContext private val context: Context,
) {
    private val globalKey = stringPreferencesKey("settings")
    private val globalSavedDefaultKey = stringPreferencesKey("saved_default_global")

    private fun bookUseGlobalKey(bookId: Int) = booleanPreferencesKey("book_${bookId}_use_global")
    private fun bookOverrideKey(bookId: Int) = stringPreferencesKey("book_${bookId}_override")
    private fun bookSavedDefaultKey(bookId: Int) = stringPreferencesKey("book_${bookId}_saved_default")

    private fun encode(settings: ComicReaderSettings): String =
        comicSettingsJson.encodeToString(ComicReaderSettings.serializer(), settings)

    private fun decodeOrNull(raw: String?): ComicReaderSettings? =
        raw?.let { runCatching { comicSettingsJson.decodeFromString(ComicReaderSettings.serializer(), it) }.getOrNull() }

    suspend fun loadGlobal(): ComicReaderSettings =
        decodeOrNull(context.comicReaderDataStore.data.first()[globalKey]) ?: ComicReaderSettings()

    suspend fun saveGlobal(settings: ComicReaderSettings) {
        context.comicReaderDataStore.edit { it[globalKey] = encode(settings) }
    }

    suspend fun restoreGlobalBuiltIn() = saveGlobal(ComicReaderSettings())

    suspend fun loadGlobalSavedDefault(): ComicReaderSettings? =
        decodeOrNull(context.comicReaderDataStore.data.first()[globalSavedDefaultKey])

    suspend fun saveGlobalSavedDefault(settings: ComicReaderSettings) {
        context.comicReaderDataStore.edit { it[globalSavedDefaultKey] = encode(settings) }
    }

    suspend fun loadBookState(bookId: Int): ComicBookSettingsState {
        val prefs = context.comicReaderDataStore.data.first()
        return ComicBookSettingsState(
            useGlobal = prefs[bookUseGlobalKey(bookId)] ?: true,
            override = decodeOrNull(prefs[bookOverrideKey(bookId)]),
        )
    }

    suspend fun saveBookState(bookId: Int, state: ComicBookSettingsState) {
        context.comicReaderDataStore.edit { prefs ->
            prefs[bookUseGlobalKey(bookId)] = state.useGlobal
            if (state.override != null) {
                prefs[bookOverrideKey(bookId)] = encode(state.override)
            } else {
                prefs.remove(bookOverrideKey(bookId))
            }
        }
    }

    suspend fun loadBookSavedDefault(bookId: Int): ComicReaderSettings? =
        decodeOrNull(context.comicReaderDataStore.data.first()[bookSavedDefaultKey(bookId)])

    suspend fun saveBookSavedDefault(bookId: Int, settings: ComicReaderSettings) {
        context.comicReaderDataStore.edit { it[bookSavedDefaultKey(bookId)] = encode(settings) }
    }

    /** See [shouldSyncToServer]'s doc: always false today, exposed so callers can branch without
     * depending on a future implementation detail of how syncing eventually gets wired in. */
    fun canSyncNow(syncReaderPreferencesEnabled: Boolean, scope: ReaderSettingsScope): Boolean =
        shouldSyncToServer(syncReaderPreferencesEnabled, scope)
}
