package com.bookorbit.feature.reader.narration

import androidx.media3.common.MediaItem
import androidx.media3.common.MediaMetadata
import androidx.media3.common.util.UnstableApi
import com.bookorbit.feature.player.audioMimeType

/** Builds the Media3 queue for a narration session: one [MediaItem] per EPUB audio entry, played
 * straight out of the EPUB (via [epubZipUri]/[EpubZipDataSource]) rather than an extracted copy. */
@UnstableApi
object NarrationMediaItems {
    fun build(bookTitle: String?, epubPath: String, entryNames: List<String>): List<MediaItem> =
        entryNames.mapIndexed { index, entryName ->
            MediaItem.Builder()
                .setMediaId("narration-$index")
                .setUri(epubZipUri(epubPath, entryName))
                // audioMimeType() sniffs off the entry's own extension (.mp4/.m4a/...); without an
                // explicit hint ExoPlayer can't sniff a container from this scheme's URI (the real
                // name is a query param, not the URI path), and the default extractor sweep doesn't
                // reliably land on MP4 for every file.
                .setMimeType(audioMimeType(format = null, filename = entryName) ?: DEFAULT_MIME_TYPE)
                .setMediaMetadata(MediaMetadata.Builder().setTitle(bookTitle).build())
                .build()
        }

    // Every Media Overlay audio entry observed so far is MP4/AAC; used only as a fallback if an
    // entry name has no extension audioMimeType() recognises.
    private const val DEFAULT_MIME_TYPE = "audio/mp4"
}
