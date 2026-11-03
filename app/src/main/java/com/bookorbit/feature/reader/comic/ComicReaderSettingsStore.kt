package com.bookorbit.feature.reader.comic

import android.content.Context
import androidx.datastore.preferences.core.booleanPreferencesKey
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.flow.first
import javax.inject.Inject
import javax.inject.Singleton

private val Context.comicReaderDataStore by preferencesDataStore("comic_reader_settings")

/**
 * Persists [ComicReaderSettings] in DataStore, device-only, mirroring
 * `ReaderSettingsStore`'s Global / This-book / saved-default key layout.
 *
 * Server sync (owner decision 3): [ComicReaderPreferencesRepository] wraps this store to pull
 * Global's synced fields ([SYNCED_KEYS]) from `GET/PUT/DELETE /api/v1/reader/defaults/cbx` when
 * the signed-in user's `syncReaderPreferences` setting is on; this store itself only ever reads
 * and writes DataStore.
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
}
