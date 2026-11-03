package com.bookorbit.core.wallpaper

import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import androidx.core.graphics.drawable.toBitmap
import coil.ImageLoader
import coil.request.ImageRequest
import coil.request.SuccessResult
import com.bookorbit.core.network.ImageUrls
import com.bookorbit.feature.downloads.DownloadsRepository
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.Dispatchers
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
) {
    enum class Outcome { SET, NO_COVER, FAILED }

    suspend fun apply(bookId: Int): Outcome {
        val bitmap = coverBitmap(bookId) ?: return Outcome.NO_COVER
        val result = withContext(Dispatchers.Default) {
            try {
                CoverWallpaper.apply(context, bitmap, home = true, lock = true)
            } finally {
                bitmap.recycle()
            }
        }
        return if (result.home || result.lock) Outcome.SET else Outcome.FAILED
    }

    private suspend fun coverBitmap(bookId: Int): Bitmap? {
        downloads.coverPath(bookId)?.let { path ->
            val file = File(path)
            if (file.exists()) {
                BitmapFactory.decodeFile(file.absolutePath)?.let { return it }
            }
        }
        return withContext(Dispatchers.IO) {
            runCatching {
                val request = ImageRequest.Builder(context)
                    .data(imageUrls.cover(bookId))
                    // A hardware bitmap can't be read back for the blur pass.
                    .allowHardware(false)
                    .build()
                (imageLoader.execute(request) as? SuccessResult)?.drawable?.toBitmap()
            }.getOrNull()
        }
    }
}
