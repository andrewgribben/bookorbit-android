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

/** Persists reader render settings in DataStore. */
@Singleton
class ReaderSettingsStore @Inject constructor(
    @ApplicationContext private val context: Context,
) {
    private val key = stringPreferencesKey("settings")
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

    // The stage-2 "use book layout" migration lives in migrateReaderSettings() (ReaderSettings.kt),
    // kept pure/testable: fresh installs default to useBookLayout = true, settings blobs written
    // before the field existed are migrated to useBookLayout = false so an already-customised
    // user's look does not change underneath them. See that function's doc for the full rule.
    suspend fun load(): ReaderSettings =
        migrateReaderSettings(context.readerDataStore.data.first()[key], json)

    suspend fun save(settings: ReaderSettings) {
        context.readerDataStore.edit { it[key] = json.encodeToString(ReaderSettings.serializer(), settings) }
    }

    /** Whether the one-time paginated tap-zones coach overlay has already been shown. */
    suspend fun hasSeenPagingHint(): Boolean =
        context.readerDataStore.data.first()[pagingHintSeenKey] ?: false

    suspend fun markPagingHintSeen() {
        context.readerDataStore.edit { it[pagingHintSeenKey] = true }
    }
}
