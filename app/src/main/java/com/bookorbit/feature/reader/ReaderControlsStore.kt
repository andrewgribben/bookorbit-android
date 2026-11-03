package com.bookorbit.feature.reader

import android.content.Context
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.preferencesDataStore
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.map
import kotlinx.serialization.json.Json
import javax.inject.Inject
import javax.inject.Singleton

private val Context.readerControlsDataStore by preferencesDataStore("reader_controls_settings")

/**
 * Persists [ReaderControlsSettings], device-only, with a single key - there is no Global/This-book
 * scope here (owner decision 5): controls apply to every book and comic on this device.
 */
@Singleton
class ReaderControlsStore @Inject constructor(
    @ApplicationContext private val context: Context,
) {
    private val key = stringPreferencesKey("settings")
    private val json = Json { ignoreUnknownKeys = true; encodeDefaults = true }

    val settings = context.readerControlsDataStore.data.map { prefs ->
        prefs[key]?.let { raw -> runCatching { json.decodeFromString(ReaderControlsSettings.serializer(), raw) }.getOrNull() }
            ?: ReaderControlsSettings()
    }

    suspend fun load(): ReaderControlsSettings =
        context.readerControlsDataStore.data.first()[key]
            ?.let { raw -> runCatching { json.decodeFromString(ReaderControlsSettings.serializer(), raw) }.getOrNull() }
            ?: ReaderControlsSettings()

    suspend fun save(settings: ReaderControlsSettings) {
        context.readerControlsDataStore.edit { it[key] = json.encodeToString(ReaderControlsSettings.serializer(), settings) }
    }
}
