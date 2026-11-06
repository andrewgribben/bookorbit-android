package com.bookorbit.core.wallpaper

import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import androidx.core.graphics.drawable.toBitmap
import coil.ImageLoader
import coil.network.HttpException
import coil.request.CachePolicy
import coil.request.ErrorResult
import coil.request.ImageRequest
import coil.request.SuccessResult
import com.bookorbit.core.network.ImageUrls
import com.bookorbit.core.settings.AppSettingsStore
import com.bookorbit.feature.downloads.DownloadsRepository
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.withContext
import java.io.File
import javax.inject.Inject
import javax.inject.Singleton

/**
 * Sets a book's cover as the device wallpaper (sharp on lock, blurred on
 * home; see [CoverWallpaper]). The cover bitmap is sourced the same way the
 * rest of the app shows covers: the offline-downloaded file when there is
 * one, otherwise the authenticated Coil [ImageLoader] used everywhere else
 * (no separate HTTP path).
 */
@Singleton
class CoverWallpaperController @Inject constructor(
    @ApplicationContext private val context: Context,
    private val downloads: DownloadsRepository,
    private val imageUrls: ImageUrls,
    private val imageLoader: ImageLoader,
    private val appSettings: AppSettingsStore,
) {
    enum class Outcome { SET, NO_COVER, FAILED }

    private sealed interface Cover {
        data class Found(val bitmap: Bitmap) : Cover
        data object Missing : Cover
        data object Failed : Cover
    }

    suspend fun apply(bookId: Int): Outcome = withContext(Dispatchers.IO) {
        val bitmap = when (val cover = coverBitmap(bookId)) {
            is Cover.Found -> cover.bitmap
            Cover.Missing -> return@withContext Outcome.NO_COVER
            Cover.Failed -> return@withContext Outcome.FAILED
        }
        // WallpaperManager can throw (IOException, SecurityException) and a large cover can OOM;
        // callers launch this unguarded, so report a failure instead of crashing.
        try {
            // Before the wallpaper, and independent of it: on devices that refuse wallpaper changes
            // (or ignore the lock flag, like Boox) this file is the lock screen.
            val fileSaved = appSettings.coverSleepImageFile.first() && saveSleepImage(bitmap)
            val result = runCatching { CoverWallpaper.apply(context, bitmap, home = true, lock = true) }
                .getOrElse { if (fileSaved) CoverWallpaper.Result(false, false) else throw it }
            if (result.home || result.lock || fileSaved) {
                // Any successful set (by hand too) is what "follow current book" compares against,
                // so reopening the previously followed book re-applies it after a manual change.
                appSettings.setCoverWallpaperFollowedBookId(bookId)
                Outcome.SET
            } else {
                Outcome.FAILED
            }
        } catch (e: Exception) {
            Outcome.FAILED
        } catch (e: OutOfMemoryError) {
            Outcome.FAILED
        } finally {
            bitmap.recycle()
        }
    }

    private fun saveSleepImage(cover: Bitmap): Boolean {
        val image = CoverWallpaper.lockImage(cover)
        return try {
            SleepImageFile.save(context, image)
        } finally {
            if (image !== cover) image.recycle()
        }
    }

    private suspend fun coverBitmap(bookId: Int): Cover {
        downloads.coverPath(bookId)?.let { path ->
            val file = File(path)
            if (file.exists()) {
                BitmapFactory.decodeFile(file.absolutePath)?.let { return Cover.Found(it) }
            }
        }
        val request = ImageRequest.Builder(context)
            .data(imageUrls.cover(bookId))
            // A hardware bitmap can't be read back for the blur pass.
            .allowHardware(false)
            // The bitmap is recycled afterwards, so it must not be one Coil's memory cache shares.
            .memoryCachePolicy(CachePolicy.DISABLED)
            .build()
        return when (val result = imageLoader.execute(request)) {
            is SuccessResult -> runCatching { Cover.Found(result.drawable.toBitmap()) }.getOrElse { Cover.Failed }
            is ErrorResult -> {
                // Only a 404 means "no cover"; anything else is retried on the next follow.
                val notFound = (result.throwable as? HttpException)?.response?.code == 404
                if (notFound) Cover.Missing else Cover.Failed
            }
        }
    }
}
