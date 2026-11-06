package com.bookorbit.core.wallpaper

import android.content.ContentResolver
import android.content.ContentValues
import android.content.Context
import android.graphics.Bitmap
import android.net.Uri
import android.os.Build
import android.os.Environment
import android.provider.MediaStore
import androidx.annotation.RequiresApi

/**
 * Writes the lock-screen cover to one fixed, user-visible file - `Pictures/sleep-image.png`.
 *
 * Some devices ignore [android.app.WallpaperManager.FLAG_LOCK] and show their own sleep/lock
 * screen picture instead (Boox e-readers: Settings points the lock screen at an image file). The
 * user points that setting at this file once; every later cover change overwrites the same file
 * in place, so the device picks the new cover up without being re-pointed.
 *
 * Written through MediaStore (no storage permission needed on Android 10+). The file row is
 * reused when it is this app's own; if a file with the name exists but belongs to another install
 * (e.g. after a reinstall, or the debug vs release build), this app can't see or overwrite it, so
 * the write reports failure rather than leaving a differently named copy the device never reads.
 */
object SleepImageFile {
    const val DISPLAY_NAME = "sleep-image.png"
    /** Directly in Pictures, not a subfolder: Boox's screensaver picker only lists images there. */
    val RELATIVE_DIR = "${Environment.DIRECTORY_PICTURES}/"

    /** Where the file shows up for the user (shared storage, relative to its root). */
    val displayPath: String get() = RELATIVE_DIR + DISPLAY_NAME

    /** MediaStore's RELATIVE_PATH needs Android 10; older versions would need a storage permission. */
    val isSupported: Boolean get() = Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q

    fun save(context: Context, image: Bitmap): Boolean {
        if (!isSupported) return false
        return runCatching { saveQ(context.contentResolver, image) }.getOrDefault(false)
    }

    @RequiresApi(Build.VERSION_CODES.Q)
    private fun saveQ(resolver: ContentResolver, image: Bitmap): Boolean {
        val collection = MediaStore.Images.Media.getContentUri(MediaStore.VOLUME_EXTERNAL_PRIMARY)
        val existing = findExisting(resolver, collection)
        if (existing != null) {
            // "wt" truncates, so a smaller image doesn't leave stale bytes at the end.
            val ok = resolver.openOutputStream(existing, "wt")?.use { image.compress(Bitmap.CompressFormat.PNG, 100, it) } ?: false
            if (ok) {
                // Refresh size/date so viewers and pickers see the new image.
                resolver.update(existing, ContentValues().apply { put(MediaStore.Images.Media.DATE_MODIFIED, System.currentTimeMillis() / 1000) }, null, null)
            }
            return ok
        }
        val values = ContentValues().apply {
            put(MediaStore.Images.Media.DISPLAY_NAME, DISPLAY_NAME)
            put(MediaStore.Images.Media.MIME_TYPE, "image/png")
            put(MediaStore.Images.Media.RELATIVE_PATH, RELATIVE_DIR)
            put(MediaStore.Images.Media.IS_PENDING, 1)
        }
        val uri = resolver.insert(collection, values) ?: return false
        // A same-named file this app can't see (left by another install) makes MediaStore rename
        // ours to "sleep-image (1).png"; the user's device setting would never see it, so fail.
        if (actualName(resolver, uri) != DISPLAY_NAME) {
            resolver.delete(uri, null, null)
            return false
        }
        val ok = runCatching {
            resolver.openOutputStream(uri, "w")?.use { image.compress(Bitmap.CompressFormat.PNG, 100, it) } ?: false
        }.getOrDefault(false)
        if (!ok) {
            resolver.delete(uri, null, null)
            return false
        }
        resolver.update(uri, ContentValues().apply { put(MediaStore.Images.Media.IS_PENDING, 0) }, null, null)
        return true
    }

    @RequiresApi(Build.VERSION_CODES.Q)
    private fun actualName(resolver: ContentResolver, uri: Uri): String? =
        resolver.query(uri, arrayOf(MediaStore.Images.Media.DISPLAY_NAME), null, null, null)?.use { c ->
            if (c.moveToFirst()) c.getString(0) else null
        }

    /** This app's own existing row for the file (other apps' rows aren't visible without permission). */
    @RequiresApi(Build.VERSION_CODES.Q)
    private fun findExisting(resolver: ContentResolver, collection: Uri): Uri? {
        resolver.query(
            collection,
            arrayOf(MediaStore.Images.Media._ID),
            "${MediaStore.Images.Media.RELATIVE_PATH} = ? AND ${MediaStore.Images.Media.DISPLAY_NAME} = ?",
            arrayOf(RELATIVE_DIR, DISPLAY_NAME),
            null,
        )?.use { c ->
            if (c.moveToFirst()) return android.content.ContentUris.withAppendedId(collection, c.getLong(0))
        }
        return null
    }
}
