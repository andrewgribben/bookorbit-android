package com.bookorbit.feature.reader

import com.bookorbit.feature.reader.narration.NarrationItem
import com.bookorbit.feature.reader.narration.NarrationTimeline
import kotlinx.serialization.Serializable
import kotlinx.serialization.builtins.serializer
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.contentOrNull
import kotlinx.serialization.json.booleanOrNull
import kotlinx.serialization.json.doubleOrNull
import kotlinx.serialization.json.intOrNull
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

/**
 * Message protocol between the host and the in-WebView foliate bridge (assets/reader/bridge.js).
 *
 * Host -> WebView: JS strings run via WebView.evaluateJavascript invoking globals the bridge
 * installs (__readerBegin/__readerChunk/__readerCommit/__readerCommand). Arguments are double-encoded
 * (a JSON string passed as a JS string literal).
 * WebView -> host: JSON strings posted through window.ReactNativeWebView.postMessage (shimmed onto the
 * AndroidReaderBridge JS interface in index.html).
 */
@Serializable
data class TocItem(
    val label: String = "",
    val href: String? = null,
    val subitems: List<TocItem> = emptyList(),
)

/** A box in the WebView's own coordinate space; CSS px equal dp, so it can be used as dp directly. */
data class ViewportRect(val left: Double, val top: Double, val right: Double, val bottom: Double)

/** One in-book search match, with the text around it. */
data class SearchHit(val cfi: String, val pre: String, val match: String, val post: String)

sealed interface ReaderEvent {
    data object Ready : ReaderEvent
    data class Loaded(
        val toc: List<TocItem>,
        val title: String?,
        val hasMediaOverlay: Boolean = false,
        /** The book's own page-progression direction (foliate `view.book.dir === 'rtl'`), used to
         * mirror the Controls tap zones for manga/RTL content, not the device locale. */
        val isRtl: Boolean = false,
    ) : ReaderEvent
    data class Relocate(
        val cfi: String?,
        val fraction: Double?,
        val chapterTitle: String?,
        /** Foliate's own relocate `reason` (e.g. "navigation", "page", "selection", "anchor" -
         * the last one is a reflow re-landing on the same spot, not the user moving). */
        val reason: String? = null,
        /** True for the one relocate caused by navigating to the saved CFI/fraction while
         * opening the book (see bridge.js finishOpen) - not the user navigating either. */
        val restoring: Boolean = false,
    ) : ReaderEvent
    data class Error(val message: String) : ReaderEvent

    /** A tap on the page body (not on a link, selection or highlight). [x]/[y] are 0..1 across
     * the viewport, used to resolve the Controls tap zones ([hitZone]). */
    data class Tap(val x: Double, val y: Double) : ReaderEvent
    data class Selection(val text: String, val cfi: String?, val rect: ViewportRect?) : ReaderEvent
    data object SelectionCleared : ReaderEvent
    data class History(val canGoBack: Boolean, val canGoForward: Boolean) : ReaderEvent
    data class AnnotationTap(val cfi: String, val rect: ViewportRect?) : ReaderEvent

    /** A batch of matches from one section ([label] is its chapter). */
    data class SearchResults(val label: String, val hits: List<SearchHit>) : ReaderEvent
    data class SearchProgress(val progress: Double) : ReaderEvent
    data class SearchDone(val total: Int, val capped: Boolean) : ReaderEvent

    /** The parsed Media Overlay timeline, sent in response to a `narrationPrepare` command.
     * [generation] echoes the command's generation so a stale reply can be told apart. */
    data class NarrationReady(val timeline: NarrationTimeline, val generation: Int) : ReaderEvent
    data class NarrationFailed(val message: String, val generation: Int) : ReaderEvent
}

object ReaderBridge {
    // Send all fields (incl. nulls/defaults) so the bridge can build the full stylesheet.
    val json = Json {
        encodeDefaults = true
        explicitNulls = true
        ignoreUnknownKeys = true
    }

    private fun asJsLiteral(jsonString: String): String =
        json.encodeToString(String.serializer(), jsonString)

    fun jsBegin(metaJson: String): String =
        "window.__readerBegin && window.__readerBegin(${asJsLiteral(metaJson)});true;"

    fun jsChunk(base64: String): String =
        "window.__readerChunk && window.__readerChunk(\"$base64\");true;"

    fun jsCommit(): String = "window.__readerCommit && window.__readerCommit();true;"

    // Lazy local-zip path: the EPUB's entries are served by LocalEpubAssetHandler at a fixed
    // origin-relative base (no per-book token needed - one WebView opens one book at a time).
    fun jsOpenLocal(metaJson: String): String =
        "window.__readerOpenLocal && window.__readerOpenLocal(${asJsLiteral(metaJson)}, " +
            "${asJsLiteral("https://appassets.androidplatform.net${LocalEpubAssetHandler.PATH_PREFIX}")});true;"

    fun jsCommand(commandJson: String): String =
        "window.__readerCommand && window.__readerCommand(${asJsLiteral(commandJson)});true;"

    private fun parseRect(el: kotlinx.serialization.json.JsonElement?): ViewportRect? = runCatching {
        val o = el?.jsonObject ?: return null
        ViewportRect(
            o["left"]!!.jsonPrimitive.doubleOrNull!!,
            o["top"]!!.jsonPrimitive.doubleOrNull!!,
            o["right"]!!.jsonPrimitive.doubleOrNull!!,
            o["bottom"]!!.jsonPrimitive.doubleOrNull!!,
        )
    }.getOrNull()

    fun parseEvent(data: String): ReaderEvent? = runCatching {
        val obj = json.parseToJsonElement(data).jsonObject
        when (obj["type"]?.jsonPrimitive?.contentOrNull) {
            "ready" -> ReaderEvent.Ready
            "loaded" -> {
                val toc = obj["toc"]?.let {
                    runCatching { json.decodeFromJsonElement(kotlinx.serialization.builtins.ListSerializer(TocItem.serializer()), it) }
                        .getOrDefault(emptyList())
                } ?: emptyList()
                val title = obj["metadata"]?.jsonObject?.get("title")?.jsonPrimitive?.contentOrNull
                val hasMediaOverlay = obj["hasMediaOverlay"]?.jsonPrimitive?.booleanOrNull ?: false
                val isRtl = obj["isRtl"]?.jsonPrimitive?.booleanOrNull ?: false
                ReaderEvent.Loaded(toc, title, hasMediaOverlay, isRtl)
            }
            "relocate" -> ReaderEvent.Relocate(
                cfi = obj["cfi"]?.jsonPrimitive?.contentOrNull,
                fraction = obj["fraction"]?.jsonPrimitive?.doubleOrNull,
                chapterTitle = obj["chapterTitle"]?.jsonPrimitive?.contentOrNull,
                reason = obj["reason"]?.jsonPrimitive?.contentOrNull,
                restoring = obj["restoring"]?.jsonPrimitive?.booleanOrNull ?: false,
            )
            "history" -> ReaderEvent.History(
                canGoBack = obj["canGoBack"]?.jsonPrimitive?.booleanOrNull ?: false,
                canGoForward = obj["canGoForward"]?.jsonPrimitive?.booleanOrNull ?: false,
            )
            "error" -> ReaderEvent.Error(obj["message"]?.jsonPrimitive?.contentOrNull ?: "Reader error")
            "tap" -> {
                val x = obj["x"]?.jsonPrimitive?.doubleOrNull
                val y = obj["y"]?.jsonPrimitive?.doubleOrNull
                if (x != null && y != null) ReaderEvent.Tap(x, y) else null
            }
            "selection" -> obj["text"]?.jsonPrimitive?.contentOrNull?.let {
                ReaderEvent.Selection(it, obj["cfi"]?.jsonPrimitive?.contentOrNull, parseRect(obj["rect"]))
            }
            "selectionCleared" -> ReaderEvent.SelectionCleared
            "searchResults" -> {
                val hits = obj["items"]?.jsonArray?.mapNotNull { el ->
                    val o = el.jsonObject
                    val cfi = o["cfi"]?.jsonPrimitive?.contentOrNull ?: return@mapNotNull null
                    SearchHit(
                        cfi = cfi,
                        pre = o["pre"]?.jsonPrimitive?.contentOrNull.orEmpty(),
                        match = o["match"]?.jsonPrimitive?.contentOrNull.orEmpty(),
                        post = o["post"]?.jsonPrimitive?.contentOrNull.orEmpty(),
                    )
                }.orEmpty()
                ReaderEvent.SearchResults(obj["label"]?.jsonPrimitive?.contentOrNull.orEmpty(), hits)
            }
            "searchProgress" -> obj["progress"]?.jsonPrimitive?.doubleOrNull?.let { ReaderEvent.SearchProgress(it) }
            "searchDone" -> ReaderEvent.SearchDone(
                total = obj["total"]?.jsonPrimitive?.intOrNull ?: 0,
                capped = obj["capped"]?.jsonPrimitive?.booleanOrNull ?: false,
            )
            "annotationTap" -> obj["cfi"]?.jsonPrimitive?.contentOrNull?.let {
                ReaderEvent.AnnotationTap(it, parseRect(obj["rect"]))
            }
            "narrationTimeline" -> {
                val generation = obj["generation"]?.jsonPrimitive?.intOrNull ?: 0
                parseNarrationTimeline(obj)?.let { ReaderEvent.NarrationReady(it, generation) }
                    ?: ReaderEvent.NarrationFailed("Couldn't read this book's narration", generation)
            }
            "narrationTimelineError" -> ReaderEvent.NarrationFailed(
                obj["message"]?.jsonPrimitive?.contentOrNull ?: "Couldn't read this book's narration",
                obj["generation"]?.jsonPrimitive?.intOrNull ?: 0,
            )
            else -> null
        }
    }.getOrNull()

    private fun parseNarrationTimeline(obj: kotlinx.serialization.json.JsonObject): NarrationTimeline? = runCatching {
        val audioSrcs = obj["audioSrcs"]?.jsonArray?.mapNotNull { it.jsonPrimitive.contentOrNull } ?: emptyList()
        val items = obj["items"]?.jsonArray?.mapNotNull { el ->
            val o = el.jsonObject
            val sectionIndex = o["sectionIndex"]?.jsonPrimitive?.intOrNull ?: return@mapNotNull null
            val textHref = o["textHref"]?.jsonPrimitive?.contentOrNull ?: return@mapNotNull null
            val begin = o["beginSec"]?.jsonPrimitive?.doubleOrNull ?: 0.0
            val end = o["endSec"]?.jsonPrimitive?.doubleOrNull
            val audioIndex = o["audioIndex"]?.jsonPrimitive?.intOrNull ?: return@mapNotNull null
            NarrationItem(sectionIndex, textHref, begin, end, audioIndex)
        } ?: emptyList()
        if (audioSrcs.isEmpty() || items.isEmpty()) return null
        NarrationTimeline(
            audioSrcs = audioSrcs,
            items = items,
            activeClass = obj["activeClass"]?.jsonPrimitive?.contentOrNull ?: NarrationTimeline.DEFAULT_ACTIVE_CLASS,
            playbackActiveClass = obj["playbackActiveClass"]?.jsonPrimitive?.contentOrNull,
            startTextHref = obj["startTextHref"]?.jsonPrimitive?.contentOrNull,
        )
    }.getOrNull()
}
