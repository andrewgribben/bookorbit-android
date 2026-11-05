package com.bookorbit.feature.library.filters

import android.content.Context
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.flow.first
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import javax.inject.Inject
import javax.inject.Singleton

private val Context.filterDataStore by preferencesDataStore("library_filters")

/**
 * Persists filter + sort selections per library in DataStore.
 */
@Singleton
class FilterPrefsStore @Inject constructor(
    @ApplicationContext private val context: Context,
    private val json: Json,
) {
    private fun key(libraryId: Int) = stringPreferencesKey("lib_$libraryId")

    suspend fun load(libraryId: Int): StoredFilterPrefs {
        val raw = context.filterDataStore.data.first()[key(libraryId)] ?: return StoredFilterPrefs()
        return runCatching { json.decodeFromString<StoredFilterPrefs>(raw) }.getOrDefault(StoredFilterPrefs())
    }

    suspend fun save(libraryId: Int, prefs: StoredFilterPrefs) {
        context.filterDataStore.edit { it[key(libraryId)] = json.encodeToString(prefs) }
    }

    private val seriesSortKey = stringPreferencesKey("series_sort")
    private val authorsSortKey = stringPreferencesKey("authors_sort")

    suspend fun loadSeriesSort(default: LibrarySort): LibrarySort {
        val raw = context.filterDataStore.data.first()[seriesSortKey] ?: return default
        return runCatching { json.decodeFromString<LibrarySort>(raw) }.getOrDefault(default)
    }

    suspend fun saveSeriesSort(sort: LibrarySort) {
        context.filterDataStore.edit { it[seriesSortKey] = json.encodeToString(sort) }
    }

    suspend fun loadAuthorsSort(default: LibrarySort): LibrarySort {
        val raw = context.filterDataStore.data.first()[authorsSortKey] ?: return default
        return runCatching { json.decodeFromString<LibrarySort>(raw) }.getOrDefault(default)
    }

    suspend fun saveAuthorsSort(sort: LibrarySort) {
        context.filterDataStore.edit { it[authorsSortKey] = json.encodeToString(sort) }
    }
}
