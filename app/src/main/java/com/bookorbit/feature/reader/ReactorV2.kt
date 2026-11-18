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

    /** BO-53 #10: asks the host to persist the Controls tab's swipe/volume-keys toggles, plus
     * the newly-selected tap-zone preset id when the host supplied a preset list in the first
     * place. Full current value set, not a delta - same shape as [SettingsChange]. */
    data class ControlsChange(
        val swipeEnabled: Boolean,
        val volumeKeysEnabled: Boolean,
        val tapZonePreset: String? = null,
    ) : ReactorV2Intent

    /** BO-53 #13: asks the host to run one of its own `configure.settingsActions` buttons,
     * carrying the opaque action id this app chose (see [ReactorSettingsActionIds]) and the
     * scope selected in the sheet at the moment of the click. Reactor shows no confirmation of
     * its own - see [ReactorChromeController]'s handling. */
    data class SettingsAction(val actionId: String, val scope: String) : ReactorV2Intent

    /** BO-53 #14: asks the host to flip the book-scope "follow Global" switch - the only way a
     * user can re-attach/detach a book under Reactor chrome; editing a book-scope control
     * never does either implicitly (those controls are disabled while the switch is on). */
    data class ScopeFollowChange(val follows: Boolean) : ReactorV2Intent

    /** BO-53 #14: asks the host to persist the Playback tab's skip-back/skip-forward durations.
     * Full current value set, not a delta - same shape as [ControlsChange]. */
    data class PlaybackSkipChange(val skipBackSec: Double, val skipForwardSec: Double) : ReactorV2Intent
}

/** A host -> Reactor `configure`/`set*` command, per the README's "Host -> Reactor" section. */
sealed interface ReactorV2Command {
    data class Configure(
        val chrome: String,
        val eink: Boolean,
        val insets: Insets,
        val capabilities: Capabilities,
        val locale: String,
        /** BO-53 #3: `null`/omitted defaults to `'shell'` on the Reactor side (protocol v2
         * README's "Narration follow ownership"). This app always sends `"host"`: its own
         * narration-position tracking (`NarrationLocator`/`watchNarrationPosition` in
         * [ReaderViewModel]) already drives the frozen v1 `narrationHighlight`/
         * `narrationUnhighlight` commands, so the shell must never run its own follow/prepare
         * too or the two can disagree about which textHref is current. */
        val narrationFollow: String? = null,
        /** BO-53 #10: `null`/omitted defaults to `'shell'` on the Reactor side (protocol v2
         * README's "Tap zone ownership"). This app always sends `"host"`: a tap already arrives
         * here as the existing v1 `ReaderEvent.Tap{x,y}` (see [ReaderScreen]'s `onTap`), and this
         * app's own saved [ReaderControlsSettings] preset decides what it does, exactly as it
         * already did before Reactor chrome existed - the shell must never also resolve the same
         * tap with its own fixed zone split or every tap would turn two pages. */
        val tapZonesOwner: String? = null,
        /** BO-53 #9: the Controls tab's current swipe/volume-keys values, pushed so the sheet
         * mirrors this app's own [ReaderControlsSettings] instead of its old hardcoded
         * defaults. Not frozen like [capabilities] - resent on every later `configure` (e.g.
         * alongside an insets change) with the latest value. */
        val controlsState: ControlsState? = null,
        /** BO-53 #13: the four legacy settings-sheet actions, made reachable again under
         * Reactor chrome via the host-neutral `settingsActions` mechanism (protocol v2
         * README's "Settings actions"). Not frozen like [capabilities] - resent with an
         * updated `enabled` per action id whenever this book's "follows Global" state
         * changes, same pattern as [controlsState]. */
        val settingsActions: List<SettingsAction>? = null,
        /** BO-53 #14: the book-scope "follow Global" switch (host-supplied label/banner,
         * ./README.md "Scope follow switch"). Optional and not frozen like [capabilities] -
         * absent means the switch row never renders under Reactor chrome. */
        val scopeFollowSwitch: ScopeFollowSwitch? = null,
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
            /** BO-53 #9: shows the settings sheet's volume-keys row. Omitted from the wire JSON
             * when null, same back-compat-defaulting pattern as every other optional v2 field. */
            val volumeKeys: Boolean? = null,
        )
        /** BO-53 #10: [tapZonePreset]/[tapZonePresets] let the Controls tab's tap-zone pills
         * reflect/change this app's own saved [ZoneLayoutPreset] instead of staying the old
         * inert Standard/Wide placeholder - see [ReactorCapabilities.tapZonePresets]. */
        data class ControlsState(
            val swipeEnabled: Boolean,
            val volumeKeysEnabled: Boolean,
            val tapZonePreset: String? = null,
            val tapZonePresets: List<TapZonePresetOption>? = null,
        )
        data class TapZonePresetOption(val id: String, val label: String)
        /** BO-53 #13: one action button, opaque to Reactor beyond [id]/[label]/[tabs]. [tabs]
         * absent means every tab; [enabled] defaults to `true`; [disabledScopes] (BO-53 review
         * fix 1) disables the button while Reactor's own scope toggle is on one of these scopes,
         * which this app uses instead of [enabled] for reset/restore since it can see the book's
         * follows-Global state but not which scope Reactor's own toggle is showing; [styleHint]
         * is only ever `"accent"` for this app (Set as wallpaper), matching a look Reactor's
         * sheet already uses elsewhere - see [ReactorSettingsActionIds]. */
        data class SettingsAction(
            val id: String,
            val label: String,
            val tabs: List<String>? = null,
            val enabled: Boolean? = null,
            val disabledScopes: List<String>? = null,
            val styleHint: String? = null,
        )
        /** BO-53 #14: label/banner strings for the book-scope "follow Global" switch, shown
         * verbatim by Reactor - it defines no label/banner wording of its own. */
        data class ScopeFollowSwitch(val label: String, val bannerText: String)
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

    data class SetPlaybackState(
        val playing: Boolean,
        val positionSec: Double,
        val rate: Double,
        /** BO-53 #3: whether narration is turned on at all, distinct from [playing] (paused
         * while on vs fully off). Optional, defaults to `true` on the Reactor side when the key
         * is absent (protocol v2 README's "Narration on/off") - this app only ever sets it
         * explicitly `false` on the one-off push when narration stops, see [ReaderScreen]'s
         * playback-state `LaunchedEffect`. */
        val active: Boolean? = null,
        /** BO-53 #5: whether this host currently has a sleep timer running. Optional, defaults
         * to `false` on the Reactor side when the key is absent (protocol v2 README's "Sleep
         * timer"). Omitted from the wire JSON when null, same pattern as [active]. */
        val sleepTimerActive: Boolean? = null,
        /** BO-53 #6: seconds the transport row's skip-back button seeks by. Optional, defaults
         * to Reactor's own pre-existing fixed offset when absent (protocol v2 README's
         * "Transport skip seconds") - this app always sends its own configured value (the same
         * one ReaderSettingsSheet's Controls tab edits, PlayerManager.UiState.skipBackSeconds),
         * so the shell's transport buttons match the app's native reader exactly. */
        val skipBackSec: Double? = null,
        /** BO-53 #6: same shape as [skipBackSec], for the skip-forward button. */
        val skipForwardSec: Double? = null,
    ) : ReactorV2Command

    data class SetSettingsScope(val scope: String, val settings: ReactorSettings, val followsGlobal: Boolean? = null) : ReactorV2Command

    /** Closes Reactor's top-most open layer; when nothing is open Reactor answers with `back`. */
    data object Dismiss : ReactorV2Command

    /** BO-53 #10: toggles the shell's own bars - the host's way to drive the shell's MENU zone
     * action when it has declared [Configure.tapZonesOwner] `"host"`, since the shell (not the
     * host) still owns its own bars visibility under Reactor chrome. No fields. */
    data object ToggleBars : ReactorV2Command
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
            "controlsChange" -> ReactorV2Intent.ControlsChange(
                swipeEnabled = obj["swipeEnabled"]!!.jsonPrimitive.booleanOrNull!!,
                volumeKeysEnabled = obj["volumeKeysEnabled"]!!.jsonPrimitive.booleanOrNull!!,
                tapZonePreset = obj["tapZonePreset"]?.jsonPrimitive?.contentOrNull,
            )
            "settingsAction" -> ReactorV2Intent.SettingsAction(
                actionId = obj["actionId"]!!.jsonPrimitive.contentOrNull!!,
                scope = obj["scope"]!!.jsonPrimitive.contentOrNull!!,
            )
            "scopeFollowChange" -> ReactorV2Intent.ScopeFollowChange(
                follows = obj["follows"]!!.jsonPrimitive.booleanOrNull!!,
            )
            "playbackSkipChange" -> ReactorV2Intent.PlaybackSkipChange(
                skipBackSec = obj["skipBackSec"]!!.jsonPrimitive.doubleOrNull!!,
                skipForwardSec = obj["skipForwardSec"]!!.jsonPrimitive.doubleOrNull!!,
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
                command.capabilities.volumeKeys?.let { put("volumeKeys", it) }
            }
            put("locale", command.locale)
            // BO-53 #3 review fix: `put("narrationFollow", null)` writes a JSON `null`, which
            // the Reactor validator rejects outright (it only accepts the key being absent or
            // "host"/"shell", never a literal null) - omit the key entirely when unset instead,
            // same as every other optional field here.
            command.narrationFollow?.let { put("narrationFollow", it) }
            command.tapZonesOwner?.let { put("tapZonesOwner", it) }
            command.controlsState?.let { state ->
                putJsonObject("controlsState") {
                    put("swipeEnabled", state.swipeEnabled)
                    put("volumeKeysEnabled", state.volumeKeysEnabled)
                    state.tapZonePreset?.let { put("tapZonePreset", it) }
                    state.tapZonePresets?.let { presets ->
                        putJsonArray("tapZonePresets") {
                            for (preset in presets) {
                                addJsonObject {
                                    put("id", preset.id)
                                    put("label", preset.label)
                                }
                            }
                        }
                    }
                }
            }
            command.settingsActions?.let { actions ->
                putJsonArray("settingsActions") {
                    for (action in actions) {
                        addJsonObject {
                            put("id", action.id)
                            put("label", action.label)
                            action.tabs?.let { tabs -> putJsonArray("tabs") { tabs.forEach { add(it) } } }
                            action.enabled?.let { put("enabled", it) }
                            action.disabledScopes?.let { scopes -> putJsonArray("disabledScopes") { scopes.forEach { add(it) } } }
                            action.styleHint?.let { put("styleHint", it) }
                        }
                    }
                }
            }
            command.scopeFollowSwitch?.let { switch ->
                putJsonObject("scopeFollowSwitch") {
                    put("label", switch.label)
                    put("bannerText", switch.bannerText)
                }
            }
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
            command.active?.let { put("active", it) }
            command.sleepTimerActive?.let { put("sleepTimerActive", it) }
            command.skipBackSec?.let { put("skipBackSec", it) }
            command.skipForwardSec?.let { put("skipForwardSec", it) }
        }
        ReactorV2Command.Dismiss -> buildJsonObject { put("type", "dismiss") }
        ReactorV2Command.ToggleBars -> buildJsonObject { put("type", "toggleBars") }
        is ReactorV2Command.SetSettingsScope -> buildJsonObject {
            put("type", "setSettingsScope")
            put("scope", command.scope)
            put("settings", json.encodeToJsonElement(ReactorSettings.serializer(), command.settings))
            command.followsGlobal?.let { put("followsGlobal", it) }
        }
    }.toString()
}

private inline fun JsonArrayBuilder.addJsonObject(
    builderAction: JsonObjectBuilder.() -> Unit,
) {
    add(buildJsonObject(builderAction))
}
