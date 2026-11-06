package com.bookorbit.core.settings

import android.content.Context
import androidx.datastore.preferences.core.booleanPreferencesKey
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.intPreferencesKey
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.flow.map
import javax.inject.Inject
import javax.inject.Singleton

enum class ThemeMode { SYSTEM, LIGHT, DARK }

enum class SeriesViewMode { LIST, GRID }

enum class ReaderInterface { APP, SERVER_WEB }

private val Context.appSettingsDataStore by preferencesDataStore("app_settings")

/**
 * App-level preferences (as opposed to the per-feature stores like ReaderSettingsStore /
 * AudioSettingsStore): appearance and download behavior configured from the Settings screen.
 * Exposed as Flows (rather than one-shot load()) since the Settings screen and theme root need to
 * react live as the user changes them.
 */
@Singleton
class AppSettingsStore @Inject constructor(
    @ApplicationContext private val context: Context,
) {
    private val themeModeKey = stringPreferencesKey("theme_mode")
    private val wifiOnlyDownloadsKey = booleanPreferencesKey("wifi_only_downloads")
    private val dynamicColorKey = booleanPreferencesKey("dynamic_color")
    private val comicRtlKey = booleanPreferencesKey("comic_rtl")
    private val seriesViewModeKey = stringPreferencesKey("series_view_mode")
    private val navItemsKey = stringPreferencesKey("nav_items")
    private val readerInterfaceKey = stringPreferencesKey("reader_interface")
    private val readingFullscreenKey = booleanPreferencesKey("reading_fullscreen")
    private val coverWallpaperFollowKey = booleanPreferencesKey("cover_wallpaper_follow")
    private val coverWallpaperFollowedBookIdKey = intPreferencesKey("cover_wallpaper_followed_book_id")
    private val coverSleepImageFileKey = booleanPreferencesKey("cover_sleep_image_file")

    val readerInterface = context.appSettingsDataStore.data.map { prefs ->
        prefs[readerInterfaceKey]?.let { runCatching { ReaderInterface.valueOf(it) }.getOrNull() }
            ?: ReaderInterface.APP
    }

    val readingFullscreen = context.appSettingsDataStore.data.map { it[readingFullscreenKey] ?: true }

    suspend fun setReaderInterface(value: ReaderInterface) {
        context.appSettingsDataStore.edit { it[readerInterfaceKey] = value.name }
    }

    suspend fun setReadingFullscreen(enabled: Boolean) {
        context.appSettingsDataStore.edit { it[readingFullscreenKey] = enabled }
    }

    val themeMode = context.appSettingsDataStore.data.map { prefs ->
        prefs[themeModeKey]?.let { raw -> runCatching { ThemeMode.valueOf(raw) }.getOrNull() } ?: ThemeMode.SYSTEM
    }

    suspend fun setThemeMode(mode: ThemeMode) {
        context.appSettingsDataStore.edit { it[themeModeKey] = mode.name }
    }

    /** Comic reading direction: true pages right-to-left (manga). */
    val comicRtl = context.appSettingsDataStore.data.map { it[comicRtlKey] ?: false }

    suspend fun setComicRtl(enabled: Boolean) {
        context.appSettingsDataStore.edit { it[comicRtlKey] = enabled }
    }

    /** Use the wallpaper-derived Material You palette (Android 12+). Off by default: BookOrbit blue. */
    val dynamicColor = context.appSettingsDataStore.data.map { it[dynamicColorKey] ?: false }

    suspend fun setDynamicColor(enabled: Boolean) {
        context.appSettingsDataStore.edit { it[dynamicColorKey] = enabled }
    }

    val wifiOnlyDownloads = context.appSettingsDataStore.data.map { it[wifiOnlyDownloadsKey] ?: false }

    suspend fun setWifiOnlyDownloads(enabled: Boolean) {
        context.appSettingsDataStore.edit { it[wifiOnlyDownloadsKey] = enabled }
    }

    val seriesViewMode = context.appSettingsDataStore.data.map { prefs ->
        prefs[seriesViewModeKey]?.let { raw -> runCatching { SeriesViewMode.valueOf(raw) }.getOrNull() } ?: SeriesViewMode.LIST
    }

    /** Bottom-bar buttons as saved ids in order; null until stored (callers fall back to the default). */
    val navItems = context.appSettingsDataStore.data.map { it[navItemsKey] }

    suspend fun setNavItems(serialized: String) {
        context.appSettingsDataStore.edit { it[navItemsKey] = serialized }
    }

    suspend fun setSeriesViewMode(mode: SeriesViewMode) {
        context.appSettingsDataStore.edit { it[seriesViewModeKey] = mode.name }
    }

    /** Automatically set the current book's cover as the wallpaper when the app backgrounds. Off by default. */
    val coverWallpaperFollow = context.appSettingsDataStore.data.map { it[coverWallpaperFollowKey] ?: false }

    suspend fun setCoverWallpaperFollow(enabled: Boolean) {
        context.appSettingsDataStore.edit { it[coverWallpaperFollowKey] = enabled }
    }

    /** The book id last applied by "follow current book", so a hand-set cover isn't immediately overwritten. */
    val coverWallpaperFollowedBookId = context.appSettingsDataStore.data.map { it[coverWallpaperFollowedBookIdKey] }

    suspend fun setCoverWallpaperFollowedBookId(bookId: Int) {
        context.appSettingsDataStore.edit { it[coverWallpaperFollowedBookIdKey] = bookId }
    }

    /** Also write the lock-screen cover to a fixed file (see SleepImageFile) whenever the cover
     * wallpaper is set - for devices like Boox that read their lock screen from a file. Off by default. */
    val coverSleepImageFile = context.appSettingsDataStore.data.map { it[coverSleepImageFileKey] ?: false }

    suspend fun setCoverSleepImageFile(enabled: Boolean) {
        context.appSettingsDataStore.edit { it[coverSleepImageFileKey] = enabled }
    }
}
