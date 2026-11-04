package com.bookorbit.feature.reader

import android.net.Uri
import android.os.ParcelFileDescriptor
import android.webkit.WebResourceResponse
import com.bookorbit.core.storage.LocalRef
import com.bookorbit.core.storage.openParcelFileDescriptor
import kotlinx.serialization.Serializable
import kotlinx.serialization.builtins.ListSerializer
import kotlinx.serialization.json.Json
import java.io.ByteArrayInputStream
import java.net.URLDecoder
import java.util.zip.ZipException

/** One entry as reported to the JS loader (mirrors [streaming-loader.js]'s manifest shape). */
@Serializable
private data class JsEntryInfo(val name: String, val size: Long)

/**
 * WebView-facing half of the local-EPUB lazy loader: serves `/local-epub/entries.json` (the
 * directory listing) and `/local-epub/entry/<name>` (one entry's bytes, honouring `Range`) for
 * whichever [LocalEpubZipReader] is currently [attach]ed. Mounted in [ReaderWebView]'s
 * `shouldInterceptRequest`, ahead of the generic [androidx.webkit.WebViewAssetLoader] path, since
 * that loader's `PathHandler` doesn't see request headers and so can't honour `Range`.
 *
 * Exactly one reader is attached at a time (one WebView opens one book at a time); [attach]
 * closes whatever was open before it, and [detach] runs when the WebView itself is torn down.
 */
class LocalEpubAssetHandler {
    @Volatile
    private var reader: LocalEpubZipReader? = null

    val isAttached: Boolean get() = reader != null

    fun attach(reader: LocalEpubZipReader) {
        this.reader?.close()
        this.reader = reader
    }

    fun detach() {
        reader?.close()
        reader = null
    }

    /** [path] is the request URL's path, e.g. `/local-epub/entries.json` or `/local-epub/entry/OEBPS%2Fch1.xhtml`. */
    fun handle(path: String, rangeHeader: String?): WebResourceResponse {
        val current = reader ?: return errorResponse(404, "No book attached")
        val rest = path.removePrefix(PATH_PREFIX)
        return when {
            rest == "entries.json" -> entriesResponse(current)
            rest.startsWith("entry/") -> entryResponse(current, rest.removePrefix("entry/"), rangeHeader)
            else -> errorResponse(404, "Unknown local-epub path: $path")
        }
    }

    private fun entriesResponse(reader: LocalEpubZipReader): WebResourceResponse {
        val entries = reader.listEntries().map { JsEntryInfo(it.name, it.size) }
        val body = JSON.encodeToString(ListSerializer(JsEntryInfo.serializer()), entries).toByteArray(Charsets.UTF_8)
        return WebResourceResponse("application/json", "utf-8", 200, "OK", mapOf("Cache-Control" to "no-store"), ByteArrayInputStream(body))
    }

    private fun entryResponse(reader: LocalEpubZipReader, encodedName: String, rangeHeader: String?): WebResourceResponse {
        // Each path segment was individually percent-encoded on the JS side (slashes preserved).
        val name = encodedName.split("/").joinToString("/") { runCatching { URLDecoder.decode(it, "UTF-8") }.getOrDefault(it) }
        return when (val result = reader.openEntry(name, rangeHeader)) {
            is LocalEpubZipReader.EntryResult.Ok -> WebResourceResponse(
                guessMimeType(name),
                null,
                if (result.partial) 206 else 200,
                if (result.partial) "Partial Content" else "OK",
                buildMap {
                    put("Accept-Ranges", "bytes")
                    put("Content-Length", result.rangeLength.toString())
                    if (result.partial) put("Content-Range", "bytes ${result.rangeStart}-${result.rangeStart + result.rangeLength - 1}/${result.totalLength}")
                },
                result.stream,
            )
            LocalEpubZipReader.EntryResult.NotFound -> errorResponse(404, "Entry not found: $name")
            LocalEpubZipReader.EntryResult.Rejected -> errorResponse(400, "Entry rejected: $name")
            is LocalEpubZipReader.EntryResult.RangeNotSatisfiable ->
                WebResourceResponse(
                    "text/plain",
                    "utf-8",
                    416,
                    "Range Not Satisfiable",
                    mapOf("Content-Range" to "bytes */${result.totalLength}"),
                    ByteArrayInputStream(ByteArray(0)),
                )
        }
    }

    private fun errorResponse(code: Int, message: String): WebResourceResponse =
        WebResourceResponse("text/plain", "utf-8", code, message, emptyMap(), ByteArrayInputStream(ByteArray(0)))

    private fun guessMimeType(name: String): String = when (name.substringAfterLast('.', "").lowercase()) {
        "xhtml", "html", "htm" -> "application/xhtml+xml"
        "xml", "opf", "ncx" -> "application/xml"
        "css" -> "text/css"
        "js" -> "text/javascript"
        "png" -> "image/png"
        "jpg", "jpeg" -> "image/jpeg"
        "gif" -> "image/gif"
        "svg" -> "image/svg+xml"
        "webp" -> "image/webp"
        "otf" -> "font/otf"
        "ttf" -> "font/ttf"
        "woff" -> "font/woff"
        "woff2" -> "font/woff2"
        "ncx+xml" -> "application/x-dtbncx+xml"
        else -> "application/octet-stream"
    }

    companion object {
        /** Path prefix (after the host) this handler owns; matched in [ReaderWebView]'s shouldInterceptRequest. */
        const val PATH_PREFIX = "/local-epub/"
        private val JSON = Json { ignoreUnknownKeys = true }

        fun matches(uri: Uri): Boolean =
            uri.host == "appassets.androidplatform.net" && uri.path.orEmpty().startsWith(PATH_PREFIX)
    }
}

/**
 * Tries to open [ref] as a zip-based EPUB for lazy serving. Returns `null` (never throws) if the
 * file isn't a readable zip, so callers fall back to the whole-file base64 path for anything
 * [java.util.zip.ZipFile] can't open (corrupt file, or a non-EPUB format that merely claims to be
 * one). A SAF [LocalRef.ContentDoc] is opened through `/proc/self/fd/<fd>`, same approach as the
 * narration feature's `NarrationAudioSource`; the [ParcelFileDescriptor] is closed when the
 * returned reader is closed.
 */
fun tryOpenLocalEpubZip(ref: LocalRef, context: android.content.Context): LocalEpubZipReader? = runCatching {
    when (ref) {
        is LocalRef.PlainFile -> LocalEpubZipReader.open(ref.file.absolutePath)
        is LocalRef.ContentDoc -> {
            val pfd: ParcelFileDescriptor = ref.openParcelFileDescriptor(context, "r")
            runCatching { LocalEpubZipReader.openFdPath("/proc/self/fd/${pfd.fd}", onClose = { pfd.close() }) }
                .getOrElse {
                    runCatching { pfd.close() }
                    throw it
                }
        }
    }
}.onFailure { e ->
    // ZipException (corrupt/not-a-zip) and plain IOException (can't open the fd/path) both mean
    // "fall back to the legacy path", not a crash.
    if (e !is ZipException && e !is java.io.IOException) throw e
}.getOrNull()
