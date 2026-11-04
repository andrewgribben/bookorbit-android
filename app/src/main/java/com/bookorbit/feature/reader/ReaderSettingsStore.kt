package com.bookorbit.feature.reader

import android.content.Context
import androidx.datastore.preferences.core.booleanPreferencesKey
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.flow.first
import kotlinx.serialization.json.Json
import javax.inject.Inject
import javax.inject.Singleton

private val Context.readerDataStore by preferencesDataStore("reader_settings")

/**
 * Persists reader render settings in DataStore.
 *
 * Stage 3 storage design (device only - none of this is synced to the server, per the approved
 * design's "This book settings live on the device only" decision):
 * - Global current settings: existing "settings" key, unchanged (see [loadGlobal]/[saveGlobal]).
 * - Global saved default (requirement 4, "Save as default"): "saved_default_global".
 * - Per book, keyed by book id: "book_<id>_use_global" (the single master inheritance switch),
 *   "book_<id>_override" (the book's own complete [ReaderSettings] snapshot, present only once
 *   the book has had its own settings at least once) and "book_<id>_saved_default" (that book's
 *   own saved default, independent of Global's).
 */
@Singleton
class ReaderSettingsStore @Inject constructor(
    @ApplicationContext private val context: Context,
) {
    private val globalKey = stringPreferencesKey("settings")
    private val globalSavedDefaultKey = stringPreferencesKey("saved_default_global")
    private val pagingHintSeenKey = booleanPreferencesKey("paging_hint_seen")

    // Deliberately NOT the app-wide injected Json (NetworkModule.provideJson, encodeDefaults =
    // false): the stage-2 migration in migrateReaderSettings() tells "pre-stage-2 blob" apart
    // from "current blob with useBookLayout" by checking whether the "useBookLayout" key is
    // present. With encodeDefaults = false, a value equal to the default (useBookLayout = true,
    // the common case) would be silently omitted on save, making every subsequent load() treat
    // it as a legacy blob and flip it back to false. encodeDefaults = true here guarantees every
    // field this store writes is always present on the next read, keeping that check reliable.
    private val json = Json {
        ignoreUnknownKeys = true
        encodeDefaults = true
    }

    private fun bookUseGlobalKey(bookId: Int) = booleanPreferencesKey("book_${bookId}_use_global")
    private fun bookOverrideKey(bookId: Int) = stringPreferencesKey("book_${bookId}_override")
    private fun bookSavedDefaultKey(bookId: Int) = stringPreferencesKey("book_${bookId}_saved_default")

    private fun encode(settings: ReaderSettings): String = json.encodeToString(ReaderSettings.serializer(), settings)

    private fun decodeOrNull(raw: String?): ReaderSettings? =
        raw?.let { runCatching { json.decodeFromString(ReaderSettings.serializer(), it) }.getOrNull() }

    // The stage-2 "use book layout" migration lives in migrateReaderSettings() (ReaderSettings.kt),
    // kept pure/testable: fresh installs default to useBookLayout = true, settings blobs written
    // before the field existed are migrated to useBookLayout = false so an already-customised
    // user's look does not change underneath them. See that function's doc for the full rule.
    suspend fun loadGlobal(): ReaderSettings =
        migrateReaderSettings(context.readerDataStore.data.first()[globalKey], json)

    suspend fun saveGlobal(settings: ReaderSettings) {
        context.readerDataStore.edit { it[globalKey] = encode(settings) }
    }

    /** Resets Global's *current* settings to the built-in defaults, leaving its saved default untouched. */
    suspend fun restoreGlobalBuiltIn() = saveGlobal(ReaderSettings())

    suspend fun loadGlobalSavedDefault(): ReaderSettings? =
        decodeOrNull(context.readerDataStore.data.first()[globalSavedDefaultKey])

    suspend fun saveGlobalSavedDefault(settings: ReaderSettings) {
        context.readerDataStore.edit { it[globalSavedDefaultKey] = encode(settings) }
    }

    /** Loads a book's inheritance switch + its own override snapshot (if it has ever had one). */
    suspend fun loadBookState(bookId: Int): BookSettingsState {
        val prefs = context.readerDataStore.data.first()
        return BookSettingsState(
            useGlobal = prefs[bookUseGlobalKey(bookId)] ?: true,
            override = decodeOrNull(prefs[bookOverrideKey(bookId)]),
        )
    }

    suspend fun saveBookState(bookId: Int, state: BookSettingsState) {
        context.readerDataStore.edit { prefs ->
            prefs[bookUseGlobalKey(bookId)] = state.useGlobal
            if (state.override != null) {
                prefs[bookOverrideKey(bookId)] = encode(state.override)
            } else {
                prefs.remove(bookOverrideKey(bookId))
            }
        }
    }

    suspend fun loadBookSavedDefault(bookId: Int): ReaderSettings? =
        decodeOrNull(context.readerDataStore.data.first()[bookSavedDefaultKey(bookId)])

    suspend fun saveBookSavedDefault(bookId: Int, settings: ReaderSettings) {
        context.readerDataStore.edit { it[bookSavedDefaultKey(bookId)] = encode(settings) }
    }

    /** Whether the one-time paginated tap-zones coach overlay has already been shown. */
    suspend fun hasSeenPagingHint(): Boolean =
        context.readerDataStore.data.first()[pagingHintSeenKey] ?: false

    suspend fun markPagingHintSeen() {
        context.readerDataStore.edit { it[pagingHintSeenKey] = true }
    }
}
