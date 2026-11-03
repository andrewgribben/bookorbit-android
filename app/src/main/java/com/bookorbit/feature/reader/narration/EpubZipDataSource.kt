package com.bookorbit.feature.reader.narration

import android.net.Uri
import androidx.media3.common.C
import androidx.media3.common.util.UnstableApi
import androidx.media3.datasource.BaseDataSource
import androidx.media3.datasource.DataSource
import androidx.media3.datasource.DataSpec
import java.io.IOException

/** URI scheme for playing a Media Overlay audio entry straight out of its EPUB - see [epubZipUri]
 * / [EpubZipDataSource]. [NarrationAudioSource] resolves the `epub`/`entry` query params it
 * carries. */
const val EPUB_ZIP_SCHEME = "epubzip"
private const val PARAM_EPUB = "epub"
private const val PARAM_ENTRY = "entry"

/** Builds an [EPUB_ZIP_SCHEME] URI for [entryName] (an exact zip entry name, as matched by
 * [NarrationAudioSource]) inside the EPUB at [epubPath] (as resolved by
 * [NarrationAudioSource.resolve]). Query params so an entry name containing `/` is encoded
 * correctly rather than colliding with URI path segments. */
fun epubZipUri(epubPath: String, entryName: String): Uri = Uri.Builder()
    .scheme(EPUB_ZIP_SCHEME)
    .appendQueryParameter(PARAM_EPUB, epubPath)
    .appendQueryParameter(PARAM_ENTRY, entryName)
    .build()

/**
 * Media3 [DataSource] for [EPUB_ZIP_SCHEME] URIs built by [epubZipUri]. Thin plumbing around
 * [EpubZipEntryReader], which does the actual zip/byte-range work and has no Android dependency of
 * its own precisely so it can be unit tested without this class (which does, via [DataSpec]'s
 * [Uri]) also needing to be.
 */
@UnstableApi
class EpubZipDataSource : BaseDataSource(/* isNetwork = */ false) {
    private var reader: EpubZipEntryReader? = null
    private var uri: Uri? = null

    override fun open(dataSpec: DataSpec): Long {
        uri = dataSpec.uri
        transferInitializing(dataSpec)
        val epubPath = dataSpec.uri.getQueryParameter(PARAM_EPUB)
        val entryName = dataSpec.uri.getQueryParameter(PARAM_ENTRY)
        if (epubPath == null || entryName == null) {
            throw IOException("Malformed $EPUB_ZIP_SCHEME uri: ${dataSpec.uri}")
        }
        val length = if (dataSpec.length != C.LENGTH_UNSET.toLong()) dataSpec.length else LENGTH_UNSET
        val bytesRemaining = EpubZipEntryReader(epubPath, entryName)
            .also { reader = it }
            .open(dataSpec.position, length)
        transferStarted(dataSpec)
        return if (bytesRemaining == LENGTH_UNSET) C.LENGTH_UNSET.toLong() else bytesRemaining
    }

    override fun read(buffer: ByteArray, offset: Int, length: Int): Int {
        val current = reader ?: return C.RESULT_END_OF_INPUT
        val read = current.read(buffer, offset, length)
        if (read > 0) bytesTransferred(read)
        return read
    }

    override fun getUri(): Uri? = uri

    override fun close() {
        try {
            reader?.close()
        } finally {
            reader = null
            transferEnded()
        }
    }

    class Factory : DataSource.Factory {
        override fun createDataSource(): DataSource = EpubZipDataSource()
    }
}
