package com.bookorbit.feature.reader

import java.io.File
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonNull
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.doubleOrNull
import kotlinx.serialization.json.jsonObject
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * Golden Reactor protocol v2 fixtures (`reactor/src/protocol/fixtures/v2/`), committed here at
 * `src/test/resources/reactor-fixtures/v2/`. Intents are parsed and compared field-by-field;
 * commands are serialised with [ReactorV2.encode] and compared structurally (key order doesn't
 * matter) against the fixture JSON.
 */
class ReactorV2Test {
    private val intentsDir = File("src/test/resources/reactor-fixtures/v2/intents")
    private val commandsDir = File("src/test/resources/reactor-fixtures/v2/commands")
    private val json = Json

    private fun intentFixture(name: String): String = File(intentsDir, name).readText()
    private fun commandFixture(name: String): String = File(commandsDir, name).readText()

    private fun assertJsonEquals(expected: String, actual: String) {
        assertTrue(
            "expected $expected but was $actual",
            jsonElementsEqual(json.parseToJsonElement(expected), json.parseToJsonElement(actual)),
        )
    }

    /** Structural equality that treats numbers by value (24 == 24.0) rather than by their literal
     * text - [ReactorV2.encode] always writes `Double`s, but the fixtures use integer literals
     * for whole numbers. */
    private fun jsonElementsEqual(a: JsonElement, b: JsonElement): Boolean = when {
        a is JsonNull || b is JsonNull -> a is JsonNull && b is JsonNull
        a is JsonObject && b is JsonObject ->
            a.keys == b.keys && a.keys.all { jsonElementsEqual(a.getValue(it), b.getValue(it)) }
        a is JsonArray && b is JsonArray ->
            a.size == b.size && a.indices.all { jsonElementsEqual(a[it], b[it]) }
        a is JsonPrimitive && b is JsonPrimitive -> {
            val aNum = a.doubleOrNull
            val bNum = b.doubleOrNull
            if (aNum != null && bNum != null) aNum == bNum else a == b
        }
        else -> false
    }

    // --- intents (Reactor -> host) ---

    @Test
    fun `annotationCreate intent parses`() {
        assertEquals(
            ReactorV2Intent.AnnotationCreate(
                cfi = "epubcfi(/6/4!/4/2/1:0)",
                kind = "highlight",
                color = "#ffeb3b",
                style = "highlight",
                text = "the quick brown fox",
                note = null,
            ),
            ReactorV2.parseIntent(intentFixture("annotationCreate.json")),
        )
    }

    @Test
    fun `annotationUpdate intent parses`() {
        assertEquals(
            ReactorV2Intent.AnnotationUpdate(id = "note-42", color = "#ff0000", style = "underline", note = "revisit"),
            ReactorV2.parseIntent(intentFixture("annotationUpdate.json")),
        )
    }

    @Test
    fun `annotationDelete intent parses`() {
        assertEquals(
            ReactorV2Intent.AnnotationDelete("note-42"),
            ReactorV2.parseIntent(intentFixture("annotationDelete.json")),
        )
    }

    @Test
    fun `bookmarkToggle intent parses`() {
        assertEquals(
            ReactorV2Intent.BookmarkToggle("epubcfi(/6/4!/4/2/1:0)"),
            ReactorV2.parseIntent(intentFixture("bookmarkToggle.json")),
        )
    }

    @Test
    fun `starToggle intent parses`() {
        assertEquals(ReactorV2Intent.StarToggle("book-42"), ReactorV2.parseIntent(intentFixture("starToggle.json")))
    }

    @Test
    fun `settingsChange intent parses scope and settings`() {
        val intent = ReactorV2.parseIntent(intentFixture("settingsChange.json")) as ReactorV2Intent.SettingsChange
        assertEquals("global", intent.scope)
        assertEquals(18, intent.settings.fontSize)
        assertEquals(1.65, intent.settings.lineHeight, 0.0001)
        assertEquals("paginated", intent.settings.flow)
    }

    @Test
    fun `openRelated intent parses`() {
        assertEquals(ReactorV2Intent.OpenRelated("book-7"), ReactorV2.parseIntent(intentFixture("openRelated.json")))
    }

    @Test
    fun `playback intent parses seek action`() {
        assertEquals(
            ReactorV2Intent.Playback(action = "seek", positionSec = 184.5, rate = null),
            ReactorV2.parseIntent(intentFixture("playback.json")),
        )
    }

    @Test
    fun `playback intent parses stop action`() {
        assertEquals(
            ReactorV2Intent.Playback(action = "stop", positionSec = null, rate = null),
            ReactorV2.parseIntent(intentFixture("playback-stop.json")),
        )
    }

    @Test
    fun `playback intent parses sleepTimer action`() {
        assertEquals(
            ReactorV2Intent.Playback(action = "sleepTimer", positionSec = null, rate = null),
            ReactorV2.parseIntent(intentFixture("playback-sleepTimer.json")),
        )
    }

    @Test
    fun `close intent parses`() {
        assertEquals(ReactorV2Intent.Close, ReactorV2.parseIntent(intentFixture("close.json")))
    }

    @Test
    fun `back intent parses`() {
        assertEquals(ReactorV2Intent.Back, ReactorV2.parseIntent(intentFixture("back.json")))
    }

    @Test
    fun `chromeState intent parses`() {
        assertEquals(
            ReactorV2Intent.ChromeState(barsVisible = true, sidebar = "left"),
            ReactorV2.parseIntent(intentFixture("chromeState.json")),
        )
    }

    @Test
    fun `notesPageRequest intent parses`() {
        assertEquals(
            ReactorV2Intent.NotesPageRequest(offset = 40, limit = 20, filter = "highlight", sort = "position", query = null),
            ReactorV2.parseIntent(intentFixture("notesPageRequest.json")),
        )
    }

    @Test
    fun `controlsChange intent parses`() {
        assertEquals(
            ReactorV2Intent.ControlsChange(swipeEnabled = false, volumeKeysEnabled = true, tapZonePreset = null),
            ReactorV2.parseIntent(intentFixture("controlsChange.json")),
        )
    }

    @Test
    fun `controlsChange intent parses the optional tapZonePreset field`() {
        assertEquals(
            ReactorV2Intent.ControlsChange(swipeEnabled = true, volumeKeysEnabled = false, tapZonePreset = "edges"),
            ReactorV2.parseIntent(intentFixture("controlsChange-tap-zone-preset.json")),
        )
    }

    @Test
    fun `a v1 event type parses to null, not thrown`() {
        assertNull(ReactorV2.parseIntent("""{"type":"ready"}"""))
    }

    @Test
    fun `an unknown type parses to null`() {
        assertNull(ReactorV2.parseIntent("""{"type":"somethingElse"}"""))
    }

    @Test
    fun `malformed json parses to null, never throws`() {
        assertNull(ReactorV2.parseIntent("not json"))
    }

    // --- commands (host -> Reactor) ---

    @Test
    fun `configure command serialises to match the reactor-chrome fixture`() {
        val command = ReactorV2Command.Configure(
            chrome = "reactor",
            eink = false,
            insets = ReactorV2Command.Configure.Insets(top = 24.0, right = 0.0, bottom = 16.0, left = 0.0),
            capabilities = ReactorV2Command.Configure.Capabilities(
                starred = true,
                related = true,
                glossary = true,
                notes = true,
                bookmarks = true,
                playback = false,
                userGlossary = false,
            ),
            locale = "en-GB",
        )
        assertJsonEquals(commandFixture("configure.json"), ReactorV2.encode(command))
    }

    @Test
    fun `configure command serialises to match the host-chrome fixture`() {
        val command = ReactorV2Command.Configure(
            chrome = "host",
            eink = true,
            insets = ReactorV2Command.Configure.Insets(top = 48.0, right = 0.0, bottom = 32.0, left = 0.0),
            capabilities = ReactorV2Command.Configure.Capabilities(
                starred = false,
                related = false,
                glossary = false,
                notes = false,
                bookmarks = false,
                playback = false,
                userGlossary = false,
            ),
            locale = "en-US",
        )
        assertJsonEquals(commandFixture("configure-host-chrome.json"), ReactorV2.encode(command))
    }

    @Test
    fun `configure command serialises narrationFollow host to match the fixture`() {
        val command = ReactorV2Command.Configure(
            chrome = "reactor",
            eink = false,
            insets = ReactorV2Command.Configure.Insets(top = 24.0, right = 0.0, bottom = 16.0, left = 0.0),
            capabilities = ReactorV2Command.Configure.Capabilities(
                starred = true,
                related = true,
                glossary = true,
                notes = true,
                bookmarks = true,
                playback = true,
                userGlossary = false,
            ),
            locale = "en-GB",
            narrationFollow = "host",
        )
        assertJsonEquals(commandFixture("configure-narration-follow-host.json"), ReactorV2.encode(command))
    }

    @Test
    fun `configure command serialises volumeKeys capability and controlsState to match the fixture`() {
        val command = ReactorV2Command.Configure(
            chrome = "reactor",
            eink = false,
            insets = ReactorV2Command.Configure.Insets(top = 24.0, right = 0.0, bottom = 16.0, left = 0.0),
            capabilities = ReactorV2Command.Configure.Capabilities(
                starred = false,
                related = false,
                glossary = false,
                notes = true,
                bookmarks = true,
                playback = false,
                userGlossary = false,
                volumeKeys = true,
            ),
            locale = "en-GB",
            controlsState = ReactorV2Command.Configure.ControlsState(swipeEnabled = false, volumeKeysEnabled = true),
        )
        assertJsonEquals(commandFixture("configure-controls-state.json"), ReactorV2.encode(command))
    }

    @Test
    fun `configure command serialises tapZonesOwner and tapZonePresets to match the fixture`() {
        val command = ReactorV2Command.Configure(
            chrome = "reactor",
            eink = false,
            insets = ReactorV2Command.Configure.Insets(top = 24.0, right = 0.0, bottom = 16.0, left = 0.0),
            capabilities = ReactorV2Command.Configure.Capabilities(
                starred = false,
                related = false,
                glossary = false,
                notes = true,
                bookmarks = true,
                playback = false,
                userGlossary = false,
                volumeKeys = true,
            ),
            locale = "en-GB",
            tapZonesOwner = "host",
            controlsState = ReactorV2Command.Configure.ControlsState(
                swipeEnabled = true,
                volumeKeysEnabled = false,
                tapZonePreset = "sides",
                tapZonePresets = listOf(
                    ReactorV2Command.Configure.TapZonePresetOption("sides", "Sides"),
                    ReactorV2Command.Configure.TapZonePresetOption("sidesAndCorners", "Sides and corners"),
                    ReactorV2Command.Configure.TapZonePresetOption("edges", "Edges"),
                    ReactorV2Command.Configure.TapZonePresetOption("centreOnly", "Centre only"),
                ),
            ),
        )
        assertJsonEquals(commandFixture("configure-tap-zones-host.json"), ReactorV2.encode(command))
    }

    @Test
    fun `configure omits tapZonesOwner key when null, never writes a literal JSON null`() {
        val command = ReactorV2Command.Configure(
            chrome = "reactor",
            eink = false,
            insets = ReactorV2Command.Configure.Insets(top = 0.0, right = 0.0, bottom = 0.0, left = 0.0),
            capabilities = ReactorV2Command.Configure.Capabilities(
                starred = false,
                related = false,
                glossary = false,
                notes = false,
                bookmarks = false,
                playback = false,
                userGlossary = false,
            ),
            locale = "en-GB",
        )
        val encoded = json.parseToJsonElement(ReactorV2.encode(command)).jsonObject
        assertFalse(encoded.containsKey("tapZonesOwner"))
    }

    @Test
    fun `toggleBars command serialises to match the fixture`() {
        assertJsonEquals(commandFixture("toggleBars.json"), ReactorV2.encode(ReactorV2Command.ToggleBars))
    }

    @Test
    fun `configure omits volumeKeys and controlsState keys when null`() {
        val command = ReactorV2Command.Configure(
            chrome = "reactor",
            eink = false,
            insets = ReactorV2Command.Configure.Insets(top = 0.0, right = 0.0, bottom = 0.0, left = 0.0),
            capabilities = ReactorV2Command.Configure.Capabilities(
                starred = false,
                related = false,
                glossary = false,
                notes = false,
                bookmarks = false,
                playback = false,
                userGlossary = false,
            ),
            locale = "en-GB",
        )
        val encoded = json.parseToJsonElement(ReactorV2.encode(command)).jsonObject
        assertFalse((encoded["capabilities"] as JsonObject).containsKey("volumeKeys"))
        assertFalse(encoded.containsKey("controlsState"))
    }

    @Test
    fun `setBookmarks command serialises to match the fixture`() {
        val command = ReactorV2Command.SetBookmarks(
            listOf(
                ReactorV2Command.SetBookmarks.Item("epubcfi(/6/4!/4/2/1:0)", "Chapter 1", "2026-11-01T12:00:00.000Z"),
                ReactorV2Command.SetBookmarks.Item("epubcfi(/6/8!/4/2/1:0)", null, "2026-11-02T09:30:00.000Z"),
            ),
        )
        assertJsonEquals(commandFixture("setBookmarks.json"), ReactorV2.encode(command))
    }

    @Test
    fun `setBookmarks-empty command serialises to match the fixture`() {
        assertJsonEquals(commandFixture("setBookmarks-empty.json"), ReactorV2.encode(ReactorV2Command.SetBookmarks(emptyList())))
    }

    @Test
    fun `setStarred command serialises to match the fixture`() {
        assertJsonEquals(
            commandFixture("setStarred.json"),
            ReactorV2.encode(ReactorV2Command.SetStarred(listOf("book-1", "book-42"))),
        )
    }

    @Test
    fun `setRelated command serialises to match the fixture`() {
        val command = ReactorV2Command.SetRelated(
            listOf(
                ReactorV2Command.SetRelated.Item("book-7", "Moby Dick", "https://example.com/covers/book-7.jpg"),
                ReactorV2Command.SetRelated.Item("book-8", "The Yellow Wallpaper", null),
            ),
        )
        assertJsonEquals(commandFixture("setRelated.json"), ReactorV2.encode(command))
    }

    @Test
    fun `setNotes command serialises to match the fixture`() {
        val command = ReactorV2Command.SetNotes(
            total = 5000,
            offset = 40,
            items = listOf(
                ReactorV2Command.SetNotes.Item(
                    id = "note-41",
                    cfi = "epubcfi(/6/4!/4/2/1:0)",
                    kind = "highlight",
                    color = "#ffeb3b",
                    style = "highlight",
                    text = "the quick brown fox",
                    note = null,
                    createdAt = "2026-11-03T10:00:00.000Z",
                ),
                ReactorV2Command.SetNotes.Item(
                    id = "note-42",
                    cfi = "epubcfi(/6/4!/4/4/1:0)",
                    kind = "note",
                    color = null,
                    style = null,
                    text = "jumps over the lazy dog",
                    note = "check this reference",
                    createdAt = "2026-11-03T10:05:00.000Z",
                ),
            ),
        )
        assertJsonEquals(commandFixture("setNotes.json"), ReactorV2.encode(command))
    }

    @Test
    fun `setPlaybackState command serialises to match the fixture`() {
        val command = ReactorV2Command.SetPlaybackState(playing = true, positionSec = 184.5, rate = 1.25)
        assertJsonEquals(commandFixture("setPlaybackState.json"), ReactorV2.encode(command))
    }

    @Test
    fun `setPlaybackState omits the active key when null (no default narration state override)`() {
        val command = ReactorV2Command.SetPlaybackState(playing = true, positionSec = 184.5, rate = 1.25, active = null)
        val encoded = json.parseToJsonElement(ReactorV2.encode(command)).jsonObject
        assertFalse(encoded.containsKey("active"))
    }

    @Test
    fun `setPlaybackState command serialises active false to match the fixture`() {
        val command = ReactorV2Command.SetPlaybackState(playing = false, positionSec = 0.0, rate = 1.0, active = false)
        assertJsonEquals(commandFixture("setPlaybackState-narration-off.json"), ReactorV2.encode(command))
    }

    @Test
    fun `setPlaybackState command serialises sleepTimerActive to match the fixture`() {
        val command = ReactorV2Command.SetPlaybackState(playing = true, positionSec = 10.0, rate = 1.0, sleepTimerActive = true)
        assertJsonEquals(commandFixture("setPlaybackState-sleep-timer-active.json"), ReactorV2.encode(command))
    }

    @Test
    fun `setPlaybackState omits the sleepTimerActive key when null`() {
        val command = ReactorV2Command.SetPlaybackState(playing = true, positionSec = 184.5, rate = 1.25, sleepTimerActive = null)
        val encoded = json.parseToJsonElement(ReactorV2.encode(command)).jsonObject
        assertFalse(encoded.containsKey("sleepTimerActive"))
    }

    @Test
    fun `setPlaybackState command serialises skipBackSec and skipForwardSec to match the fixture`() {
        val command = ReactorV2Command.SetPlaybackState(playing = true, positionSec = 30.0, rate = 1.0, skipBackSec = 10.0, skipForwardSec = 45.0)
        assertJsonEquals(commandFixture("setPlaybackState-skip-seconds.json"), ReactorV2.encode(command))
    }

    @Test
    fun `setPlaybackState omits skipBackSec and skipForwardSec keys when null`() {
        val command = ReactorV2Command.SetPlaybackState(playing = true, positionSec = 184.5, rate = 1.25)
        val encoded = json.parseToJsonElement(ReactorV2.encode(command)).jsonObject
        assertFalse(encoded.containsKey("skipBackSec"))
        assertFalse(encoded.containsKey("skipForwardSec"))
    }

    @Test
    fun `configure omits the narrationFollow key when null, never writes a literal JSON null`() {
        val command = ReactorV2Command.Configure(
            chrome = "reactor",
            eink = false,
            insets = ReactorV2Command.Configure.Insets(top = 24.0, right = 0.0, bottom = 16.0, left = 0.0),
            capabilities = ReactorV2Command.Configure.Capabilities(
                starred = true,
                related = true,
                glossary = true,
                notes = true,
                bookmarks = true,
                playback = false,
                userGlossary = false,
            ),
            locale = "en-GB",
        )
        val encoded = json.parseToJsonElement(ReactorV2.encode(command)).jsonObject
        assertFalse(encoded.containsKey("narrationFollow"))
    }

    @Test
    fun `dismiss command serialises to match the fixture`() {
        assertJsonEquals(commandFixture("dismiss.json"), ReactorV2.encode(ReactorV2Command.Dismiss))
    }

    @Test
    fun `setSettingsScope command serialises to match the fixture`() {
        val settings = ReactorSettings(
            fontSize = 16,
            lineHeight = 1.5,
            fontFamily = null,
            paragraphSpacing = 0.0,
            maxColumnCount = 2,
            gap = 0.05,
            maxInlineSize = 720,
            maxBlockSize = 1440,
            justify = true,
            hyphenate = true,
            isDark = false,
            themeName = "default",
            flow = "paginated",
            useBookLayout = true,
            marginTop = 40,
            marginBottom = 40,
            marginLeft = 40,
            marginRight = 40,
            linkSideMargins = true,
        )
        val command = ReactorV2Command.SetSettingsScope(scope = "book", settings = settings)
        assertJsonEquals(commandFixture("setSettingsScope.json"), ReactorV2.encode(command))
    }
}
