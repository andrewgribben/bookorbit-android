package com.bookorbit.feature.reader

import kotlinx.serialization.json.JsonArrayBuilder
import kotlinx.serialization.json.JsonObjectBuilder
import kotlinx.serialization.json.add
import kotlinx.serialization.json.booleanOrNull
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.contentOrNull
import kotlinx.serialization.json.doubleOrNull
import kotlinx.serialization.json.intOrNull
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import kotlinx.serialization.json.put
import kotlinx.serialization.json.putJsonArray
import kotlinx.serialization.json.putJsonObject

/**
 * Reactor protocol v2 (host <-> Reactor WebView shell chrome). Defined at
 * `reactor/src/protocol/v2/README.md`; golden fixtures live at
 * `reactor/src/protocol/fixtures/v2/{commands,intents}` (every JSON file in each), mirrored here under
 * `src/test/resources/reactor-fixtures/v2/`.
 *
 * Host -> Reactor: [ReactorV2Command]s, serialised with [ReactorV2.encode] and sent the same way
 * v1 commands are, through [ReaderBridge.jsCommand] / `window.__readerCommand`.
 * Reactor -> host: [ReactorV2Intent]s, parsed with [ReactorV2.parseIntent] from the same
 * `postMessage` string v1 events arrive on ([ReaderController.handleMessage]); an unrecognised
 * `type` (including every v1 event type) parses to `null` and must be ignored, mirroring v1's own
 * "unknown type, do nothing" parser contract.
 */

/** The book settings shape shared verbatim between v1's `applyStyles` and v2 settings commands/intents. */
typealias ReactorSettings = ReaderSettings

sealed interface ReactorV2Intent {
    data class AnnotationCreate(
        val cfi: String,
        val kind: String,
        val color: String?,
        val style: String?,
        val text: String?,
        val note: String?,
    ) : ReactorV2Intent

    data class AnnotationUpdate(
        val id: String,
        val color: String?,
        val style: String?,
        val note: String?,
    ) : ReactorV2Intent

    data class AnnotationDelete(val id: String) : ReactorV2Intent

    data class BookmarkToggle(val cfi: String) : ReactorV2Intent

    data class StarToggle(val bookId: String) : ReactorV2Intent

    data class SettingsChange(val scope: String, val settings: ReactorSettings) : ReactorV2Intent

    data class OpenRelated(val id: String) : ReactorV2Intent

    data class Playback(val action: String, val positionSec: Double?, val rate: Double?) : ReactorV2Intent

    data object Close : ReactorV2Intent

    data object Back : ReactorV2Intent

    data class ChromeState(val barsVisible: Boolean, val sidebar: String) : ReactorV2Intent

    data class NotesPageRequest(
        val offset: Int,
        val limit: Int,
        val filter: String?,
        val sort: String?,
        val query: String?,
    ) : ReactorV2Intent
}

/** A host -> Reactor `configure`/`set*` command, per the README's "Host -> Reactor" section. */
sealed interface ReactorV2Command {
    data class Configure(
        val chrome: String,
        val eink: Boolean,
        val insets: Insets,
        val capabilities: Capabilities,
        val locale: String,
    ) : ReactorV2Command {
        data class Insets(val top: Double, val right: Double, val bottom: Double, val left: Double)
        data class Capabilities(
            val starred: Boolean,
            val related: Boolean,
            val glossary: Boolean,
            val notes: Boolean,
            val bookmarks: Boolean,
            val playback: Boolean,
            val userGlossary: Boolean,
        )
    }

    data class SetBookmarks(val items: List<Item>) : ReactorV2Command {
        data class Item(val cfi: String, val label: String?, val createdAt: String)
    }

    data class SetStarred(val bookIds: List<String>) : ReactorV2Command

    data class SetRelated(val items: List<Item>) : ReactorV2Command {
        data class Item(val id: String, val title: String, val coverUrl: String?)
    }

    data class SetNotes(val total: Int, val offset: Int, val items: List<Item>) : ReactorV2Command {
        data class Item(
            val id: String,
            val cfi: String,
            val kind: String,
            val color: String?,
            val style: String?,
            val text: String?,
            val note: String?,
            val createdAt: String,
        )
    }

    data class SetPlaybackState(val playing: Boolean, val positionSec: Double, val rate: Double) : ReactorV2Command

    data class SetSettingsScope(val scope: String, val settings: ReactorSettings) : ReactorV2Command

    /** Closes Reactor's top-most open layer; when nothing is open Reactor answers with `back`. */
    data object Dismiss : ReactorV2Command
}

object ReactorV2 {
    private val json = ReaderBridge.json

    /** Parses one `postMessage` JSON string from Reactor into a [ReactorV2Intent], or null for a
     * `type` this isn't (every v1 event, and anything else unrecognised) - never throws. */
    fun parseIntent(data: String): ReactorV2Intent? = runCatching {
        val obj = json.parseToJsonElement(data).jsonObject
        when (obj["type"]?.jsonPrimitive?.contentOrNull) {
            "annotationCreate" -> ReactorV2Intent.AnnotationCreate(
                cfi = obj["cfi"]!!.jsonPrimitive.contentOrNull!!,
                kind = obj["kind"]!!.jsonPrimitive.contentOrNull!!,
                color = obj["color"]?.jsonPrimitive?.contentOrNull,
                style = obj["style"]?.jsonPrimitive?.contentOrNull,
                text = obj["text"]?.jsonPrimitive?.contentOrNull,
                note = obj["note"]?.jsonPrimitive?.contentOrNull,
            )
            "annotationUpdate" -> ReactorV2Intent.AnnotationUpdate(
                id = obj["id"]!!.jsonPrimitive.contentOrNull!!,
                color = obj["color"]?.jsonPrimitive?.contentOrNull,
                style = obj["style"]?.jsonPrimitive?.contentOrNull,
                note = obj["note"]?.jsonPrimitive?.contentOrNull,
            )
            "annotationDelete" -> ReactorV2Intent.AnnotationDelete(obj["id"]!!.jsonPrimitive.contentOrNull!!)
            "bookmarkToggle" -> ReactorV2Intent.BookmarkToggle(obj["cfi"]!!.jsonPrimitive.contentOrNull!!)
            "starToggle" -> ReactorV2Intent.StarToggle(obj["bookId"]!!.jsonPrimitive.contentOrNull!!)
            "settingsChange" -> ReactorV2Intent.SettingsChange(
                scope = obj["scope"]!!.jsonPrimitive.contentOrNull!!,
                settings = json.decodeFromJsonElement(ReactorSettings.serializer(), obj["settings"]!!),
            )
            "openRelated" -> ReactorV2Intent.OpenRelated(obj["id"]!!.jsonPrimitive.contentOrNull!!)
            "playback" -> ReactorV2Intent.Playback(
                action = obj["action"]!!.jsonPrimitive.contentOrNull!!,
                positionSec = obj["positionSec"]?.jsonPrimitive?.doubleOrNull,
                rate = obj["rate"]?.jsonPrimitive?.doubleOrNull,
            )
            "close" -> ReactorV2Intent.Close
            "back" -> ReactorV2Intent.Back
            "chromeState" -> ReactorV2Intent.ChromeState(
                barsVisible = obj["barsVisible"]!!.jsonPrimitive.booleanOrNull!!,
                sidebar = obj["sidebar"]!!.jsonPrimitive.contentOrNull!!,
            )
            "notesPageRequest" -> ReactorV2Intent.NotesPageRequest(
                offset = obj["offset"]!!.jsonPrimitive.intOrNull!!,
                limit = obj["limit"]!!.jsonPrimitive.intOrNull!!,
                filter = obj["filter"]?.jsonPrimitive?.contentOrNull,
                sort = obj["sort"]?.jsonPrimitive?.contentOrNull,
                query = obj["query"]?.jsonPrimitive?.contentOrNull,
            )
            else -> null
        }
    }.getOrNull()

    /** Serialises a host -> Reactor command to the wire JSON string, sent through
     * [ReaderBridge.jsCommand] the same way v1 commands are. */
    fun encode(command: ReactorV2Command): String = when (command) {
        is ReactorV2Command.Configure -> buildJsonObject {
            put("type", "configure")
            put("chrome", command.chrome)
            put("eink", command.eink)
            putJsonObject("insets") {
                put("top", command.insets.top)
                put("right", command.insets.right)
                put("bottom", command.insets.bottom)
                put("left", command.insets.left)
            }
            putJsonObject("capabilities") {
                put("starred", command.capabilities.starred)
                put("related", command.capabilities.related)
                put("glossary", command.capabilities.glossary)
                put("notes", command.capabilities.notes)
                put("bookmarks", command.capabilities.bookmarks)
                put("playback", command.capabilities.playback)
                put("userGlossary", command.capabilities.userGlossary)
            }
            put("locale", command.locale)
        }
        is ReactorV2Command.SetBookmarks -> buildJsonObject {
            put("type", "setBookmarks")
            putJsonArray("items") {
                for (item in command.items) {
                    addJsonObject {
                        put("cfi", item.cfi)
                        put("label", item.label)
                        put("createdAt", item.createdAt)
                    }
                }
            }
        }
        is ReactorV2Command.SetStarred -> buildJsonObject {
            put("type", "setStarred")
            putJsonArray("bookIds") { command.bookIds.forEach { add(it) } }
        }
        is ReactorV2Command.SetRelated -> buildJsonObject {
            put("type", "setRelated")
            putJsonArray("items") {
                for (item in command.items) {
                    addJsonObject {
                        put("id", item.id)
                        put("title", item.title)
                        put("coverUrl", item.coverUrl)
                    }
                }
            }
        }
        is ReactorV2Command.SetNotes -> buildJsonObject {
            put("type", "setNotes")
            put("total", command.total)
            put("offset", command.offset)
            putJsonArray("items") {
                for (item in command.items) {
                    addJsonObject {
                        put("id", item.id)
                        put("cfi", item.cfi)
                        put("kind", item.kind)
                        put("color", item.color)
                        put("style", item.style)
                        put("text", item.text)
                        put("note", item.note)
                        put("createdAt", item.createdAt)
                    }
                }
            }
        }
        is ReactorV2Command.SetPlaybackState -> buildJsonObject {
            put("type", "setPlaybackState")
            put("playing", command.playing)
            put("positionSec", command.positionSec)
            put("rate", command.rate)
        }
        ReactorV2Command.Dismiss -> buildJsonObject { put("type", "dismiss") }
        is ReactorV2Command.SetSettingsScope -> buildJsonObject {
            put("type", "setSettingsScope")
            put("scope", command.scope)
            put("settings", json.encodeToJsonElement(ReactorSettings.serializer(), command.settings))
        }
    }.toString()
}

private inline fun JsonArrayBuilder.addJsonObject(
    builderAction: JsonObjectBuilder.() -> Unit,
) {
    add(buildJsonObject(builderAction))
}
