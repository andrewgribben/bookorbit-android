package com.bookorbit.feature.reader.narration

import android.net.Uri
import androidx.media3.common.util.UnstableApi
import androidx.media3.datasource.DataSource
import androidx.media3.datasource.DataSpec
import androidx.media3.datasource.TransferListener

/**
 * [DataSource] that routes [EPUB_ZIP_SCHEME] URIs to an [epubZipFactory]-built [EpubZipDataSource]
 * and everything else (server HTTP streams, local file/content downloads) to [fallback] unchanged.
 * Wired in as the player's single [DataSource.Factory] (see
 * [com.bookorbit.core.di.PlayerModule.provideMediaSourceFactory]) so narration playback shares the
 * existing [androidx.media3.exoplayer.source.MediaSource.Factory]/[ExoPlayer][androidx.media3.exoplayer.ExoPlayer]
 * instead of needing a second one.
 */
@UnstableApi
class NarrationAwareDataSource private constructor(
    private val fallback: DataSource,
    private val epubZipFactory: DataSource.Factory,
) : DataSource {
    // DataSource.Factory.createDataSource() is normally called once per DataSource lifetime, but
    // open() can be called more than once on the *same* instance across different URIs/schemes
    // (ExoPlayer reuses a DataSource across a MediaPeriod's lifetime), so listeners registered
    // before the first open() must be replayed onto whichever delegate a later open() switches to.
    private val listeners = mutableListOf<TransferListener>()
    private var active: DataSource = fallback

    override fun addTransferListener(transferListener: TransferListener) {
        listeners += transferListener
        fallback.addTransferListener(transferListener)
    }

    override fun open(dataSpec: DataSpec): Long {
        active = if (dataSpec.uri.scheme == EPUB_ZIP_SCHEME) {
            epubZipFactory.createDataSource().also { ds -> listeners.forEach(ds::addTransferListener) }
        } else {
            fallback
        }
        return active.open(dataSpec)
    }

    override fun read(buffer: ByteArray, offset: Int, length: Int): Int = active.read(buffer, offset, length)

    override fun getUri(): Uri? = active.uri

    override fun getResponseHeaders(): Map<String, List<String>> = active.responseHeaders

    override fun close() = active.close()

    class Factory(
        private val fallbackFactory: DataSource.Factory,
        private val epubZipFactory: DataSource.Factory,
    ) : DataSource.Factory {
        override fun createDataSource(): DataSource =
            NarrationAwareDataSource(fallbackFactory.createDataSource(), epubZipFactory)
    }
}
