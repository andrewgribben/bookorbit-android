package com.bookorbit.feature.reader.narration

import android.net.Uri
import androidx.media3.common.MediaItem
import androidx.media3.common.MediaMetadata
import androidx.media3.common.util.UnstableApi
import java.io.File

/** Builds the Media3 queue for a narration session: one [MediaItem] per unique extracted audio file. */
@UnstableApi
object NarrationMediaItems {
    fun build(bookTitle: String?, files: List<File>): List<MediaItem> = files.mapIndexed { index, file ->
        MediaItem.Builder()
            .setMediaId("narration-$index")
            .setUri(Uri.fromFile(file))
            .setMediaMetadata(MediaMetadata.Builder().setTitle(bookTitle).build())
            .build()
    }
}
