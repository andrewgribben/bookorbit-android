package com.bookorbit.feature.reader.comic

import android.content.Context
import android.os.ParcelFileDescriptor
import android.util.Log
import coil.ImageLoader
import coil.decode.DataSource
import coil.decode.ImageSource
import coil.fetch.FetchResult
import coil.fetch.Fetcher
import coil.fetch.SourceResult
import coil.request.Options
import com.bookorbit.core.storage.LocalRef
import com.bookorbit.core.storage.openParcelFileDescriptor
import okio.Buffer

/** Where the comic reader's page images come from. */
sealed interface ComicPageSource {
    /** Pages rendered by the server at `/cbz/files/{fileId}/pages/{n}` (any comic format, online). */
    data class Server(val fileId: Int) : ComicPageSource

    /** Pages read from a downloaded CBZ on the device (works offline). */
    data class Local(val archive: LocalComicArchive) : ComicPageSource
}

/** Coil model for one page of a [LocalComicArchive]. */
data class LocalComicPage(val archive: LocalComicArchive, val index: Int) {
    val cacheKey: String get() = "comic-local:${archive.key}:$index"
}

/** Lets Coil load [LocalComicPage]s: reads the entry from the zip on Coil's background dispatcher. */
class LocalComicPageFetcher(private val page: LocalComicPage, private val options: Options) : Fetcher {
    override suspend fun fetch(): FetchResult {
        val bytes = page.archive.readPage(page.index)
        return SourceResult(
            source = ImageSource(Buffer().write(bytes), options.context),
            mimeType = null,
            dataSource = DataSource.DISK,
        )
    }

    object Factory : Fetcher.Factory<LocalComicPage> {
        override fun create(data: LocalComicPage, options: Options, imageLoader: ImageLoader): Fetcher =
            LocalComicPageFetcher(data, options)
    }
}

private const val TAG = "LocalComicArchive"

/**
 * Opens a downloaded CBZ for the comic reader, or returns null when it can't be read as a zip (the
 * reader then falls back to server-rendered pages). A file in a user-chosen download folder
 * ([LocalRef.ContentDoc]) is opened through `/proc/self/fd/N`, like the EPUB reader does.
 */
fun tryOpenLocalComic(ref: LocalRef, context: Context): LocalComicArchive? = runCatching {
    when (ref) {
        is LocalRef.PlainFile -> LocalComicArchive.open(ref.file.absolutePath)
        is LocalRef.ContentDoc -> {
            val pfd: ParcelFileDescriptor = ref.openParcelFileDescriptor(context, "r")
            runCatching {
                LocalComicArchive.openFdPath("/proc/self/fd/${pfd.fd}", key = ref.uri.toString(), onClose = { pfd.close() })
            }.getOrElse {
                runCatching { pfd.close() }
                throw it
            }
        }
    }
}.onFailure { e -> Log.w(TAG, "Couldn't open the downloaded comic; using server pages", e) }.getOrNull()
