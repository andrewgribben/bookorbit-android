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
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import javax.inject.Inject
import javax.inject.Singleton

/**
 * "Follow current book" for the cover wallpaper. With the setting on, a book's
 * cover is applied when it differs from the one last followed:
 * - ebook, PDF and comic readers apply it as soon as the book is opened for
 *   tracked reading ([openBookForReading]; never in peek mode);
 * - the audiobook player only notes the book ([noteOpenBook]) and it is applied
 *   when the app goes to the background, so a wallpaper change (and any
 *   system recolour it triggers) can't disturb playback.
 * Whatever was noted last is also (re-)tried on background, which retries a
 * failed apply.
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

    /** Serialises applies, so an open and a background for the same book can't both set it. */
    private val applyLock = Mutex()

    /** Called by the audiobook player when a book is loaded: applied when the app backgrounds,
     * never mid-session, so a wallpaper/recolour change can't disturb playback. */
    fun noteOpenBook(bookId: Int) {
        notedBookId = bookId
    }

    /** Called by the ebook, PDF and comic readers when a book is opened for tracked reading (never
     * in peek mode): applies the cover straight away rather than waiting for the app to background.
     * Still noted, so a failed apply is retried on the next background. */
    fun openBookForReading(bookId: Int) {
        notedBookId = bookId
        applyIfNeeded(bookId)
    }

    private fun onBackground() {
        applyIfNeeded(notedBookId ?: return)
    }

    private fun applyIfNeeded(bookId: Int) {
        scope.launch {
            applyLock.withLock {
                val enabled = appSettings.coverWallpaperFollow.first()
                val lastFollowed = appSettings.coverWallpaperFollowedBookId.first()
                if (!CoverWallpaperFollow.shouldApply(enabled, bookId, lastFollowed)) return@withLock
                val outcome = wallpaper.apply(bookId)
                // A book without a cover counts as followed too: retrying it on every
                // background would never succeed. A transient failure does not, so it
                // can be retried the next time the app backgrounds.
                if (outcome != CoverWallpaperController.Outcome.FAILED) {
                    appSettings.setCoverWallpaperFollowedBookId(bookId)
                }
            }
        }
    }
}
