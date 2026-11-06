package com.bookorbit.core.wallpaper

import android.app.WallpaperManager
import android.content.Context
import android.graphics.Bitmap
import kotlin.math.max
import kotlin.math.min
import kotlin.math.roundToInt

/**
 * Sets a book cover as the device wallpaper: sharp on the lock screen, blurred
 * on the home screen.
 *
 * The bitmaps keep the cover's own aspect ratio and no crop hint is passed, so
 * the system centre-crops each one to fill whichever screen shows it. On a
 * foldable that is done per display, which a crop computed here could not do.
 *
 * Ported from Readest's native_bridge CoverWallpaper (Tauri plugin); the
 * blur/box-blur math is unchanged, only the source moved from a file path to
 * an already-decoded [Bitmap] since BookOrbit's cover can come from either an
 * offline download or the authenticated Coil image loader.
 */
object CoverWallpaper {
    /** Covers smaller than this (long side) are scaled up so the wallpaper isn't soft. */
    private const val MIN_LONG_SIDE = 1600

    /** Larger covers are scaled down: a full-size blur of a huge scan would risk OOM. */
    private const val MAX_LONG_SIDE = 2560

    /** The blur runs on a copy this size (long side): cheap, and still smooth once scaled up. */
    private const val BLUR_WORK_LONG_SIDE = 480

    /** Box radius at the working size; three passes give a Gaussian of sigma ~= radius. */
    private const val BLUR_RADIUS = 14

    data class Result(val home: Boolean, val lock: Boolean, val error: String? = null)

    /** The sharp lock-screen image for [source]: the cover at its own aspect, scaled into range. */
    fun lockImage(source: Bitmap): Bitmap = scaleLongSide(source, max(source.width, source.height).coerceIn(MIN_LONG_SIDE, MAX_LONG_SIDE))

    fun apply(context: Context, source: Bitmap, home: Boolean, lock: Boolean): Result {
        val cover = lockImage(source)
        val manager = WallpaperManager.getInstance(context)
        if (!manager.isWallpaperSupported || !manager.isSetWallpaperAllowed) {
            return Result(false, false, "Wallpaper changes are not allowed on this device")
        }
        // Home first: while the lock screen still follows the home wallpaper,
        // setting home alone would change both. Setting lock afterwards splits them.
        var homeOk = false
        var lockOk = false
        if (home) {
            val blurred = blur(cover)
            homeOk = manager.setBitmap(blurred, null, true, WallpaperManager.FLAG_SYSTEM) != 0
            blurred.recycle()
        }
        if (lock) {
            lockOk = manager.setBitmap(cover, null, true, WallpaperManager.FLAG_LOCK) != 0
        }
        if (cover !== source) cover.recycle()
        return Result(homeOk, lockOk)
    }

    private fun scaleLongSide(src: Bitmap, longSide: Int): Bitmap {
        val current = max(src.width, src.height)
        if (current == longSide) return src
        val scale = longSide.toFloat() / current
        return Bitmap.createScaledBitmap(
            src,
            max(1, (src.width * scale).roundToInt()),
            max(1, (src.height * scale).roundToInt()),
            true,
        )
    }

    /**
     * A smooth Gaussian-like blur at the bitmap's own size. Blurs a reduced
     * copy (the result has no detail left to lose), then scales it back up
     * with filtering, which on an already-smooth image adds no blockiness.
     */
    fun blur(src: Bitmap): Bitmap {
        val work = scaleLongSide(src, min(BLUR_WORK_LONG_SIDE, max(src.width, src.height)))
        val w = work.width
        val h = work.height
        val pixels = IntArray(w * h)
        work.getPixels(pixels, 0, w, 0, 0, w, h)
        val blurredPixels = gaussianBlur(pixels, w, h, BLUR_RADIUS)
        val blurred = Bitmap.createBitmap(w, h, Bitmap.Config.ARGB_8888)
        blurred.setPixels(blurredPixels, 0, w, 0, 0, w, h)
        if (work !== src) work.recycle()
        val out = Bitmap.createScaledBitmap(blurred, src.width, src.height, true)
        if (out !== blurred) blurred.recycle()
        return out
    }

    /**
     * Approximates a Gaussian with three passes of a separable box blur
     * (sigma ~= radius). Edges clamp, so the borders don't darken.
     * Pure function on ARGB pixels, so it runs in host JVM tests.
     */
    fun gaussianBlur(pixels: IntArray, width: Int, height: Int, radius: Int): IntArray {
        if (radius < 1 || width < 1 || height < 1) return pixels.copyOf()
        val a = pixels.copyOf()
        val b = IntArray(a.size)
        repeat(3) {
            boxBlurLine(a, b, width, height, radius, horizontal = true)
            boxBlurLine(b, a, width, height, radius, horizontal = false)
        }
        return a
    }

    private fun boxBlurLine(
        src: IntArray,
        dst: IntArray,
        width: Int,
        height: Int,
        radius: Int,
        horizontal: Boolean,
    ) {
        val lines = if (horizontal) height else width
        val length = if (horizontal) width else height
        val step = if (horizontal) 1 else width
        val window = 2 * radius + 1
        for (line in 0 until lines) {
            val start = if (horizontal) line * width else line
            var sa = 0
            var sr = 0
            var sg = 0
            var sb = 0
            for (k in -radius..radius) {
                val p = src[start + k.coerceIn(0, length - 1) * step]
                sa += p ushr 24
                sr += (p shr 16) and 0xFF
                sg += (p shr 8) and 0xFF
                sb += p and 0xFF
            }
            for (i in 0 until length) {
                dst[start + i * step] = ((sa / window) shl 24) or
                    ((sr / window) shl 16) or
                    ((sg / window) shl 8) or
                    (sb / window)
                val out = src[start + (i - radius).coerceIn(0, length - 1) * step]
                val inn = src[start + (i + radius + 1).coerceIn(0, length - 1) * step]
                sa += (inn ushr 24) - (out ushr 24)
                sr += ((inn shr 16) and 0xFF) - ((out shr 16) and 0xFF)
                sg += ((inn shr 8) and 0xFF) - ((out shr 8) and 0xFF)
                sb += (inn and 0xFF) - (out and 0xFF)
            }
        }
    }
}
