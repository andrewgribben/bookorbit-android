package com.bookorbit.core.wallpaper

import android.os.Handler
import android.os.Looper
import androidx.lifecycle.DefaultLifecycleObserver
import androidx.lifecycle.LifecycleOwner
import androidx.lifecycle.ProcessLifecycleOwner
import com.bookorbit.core.settings.AppSettingsStore
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.launch
import javax.inject.Inject
import javax.inject.Singleton

/**
 * "Follow current book" for the cover wallpaper: the reader and player note
 * the book they have open; when the app goes to the background and the
 * setting is on, that book's cover is applied if it differs from the one
 * last followed. Applying only on background (not live, mid-read) means the
 * system's wallpaper-driven recolour never happens while the user is looking
 * at the screen.
 */
@Singleton
class CoverWallpaperFollowController @Inject constructor(
    private val appSettings: AppSettingsStore,
    private val wallpaper: CoverWallpaperController,
) {
    private val scope = CoroutineScope(SupervisorJob() + Dispatchers.Default)

    @Volatile
    private var notedBookId: Int? = null

    init {
        // ProcessLifecycleOwner must be touched on the main thread.
        Handler(Looper.getMainLooper()).post {
            ProcessLifecycleOwner.get().lifecycle.addObserver(object : DefaultLifecycleObserver {
                override fun onStop(owner: LifecycleOwner) = onBackground()
            })
        }
    }

    /** Called by the reader/player when a book is opened. */
    fun noteOpenBook(bookId: Int) {
        notedBookId = bookId
    }

    private fun onBackground() {
        val noted = notedBookId ?: return
        scope.launch {
            val enabled = appSettings.coverWallpaperFollow.first()
            val lastFollowed = appSettings.coverWallpaperFollowedBookId.first()
            if (!CoverWallpaperFollow.shouldApply(enabled, noted, lastFollowed)) return@launch
            val outcome = wallpaper.apply(noted)
            // A book without a cover counts as followed too: retrying it on every
            // background would never succeed. A transient failure does not, so it
            // can be retried the next time the app backgrounds.
            if (outcome != CoverWallpaperController.Outcome.FAILED) {
                appSettings.setCoverWallpaperFollowedBookId(noted)
            }
        }
    }
}
