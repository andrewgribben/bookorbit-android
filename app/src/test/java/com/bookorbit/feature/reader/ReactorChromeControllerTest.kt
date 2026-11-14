package com.bookorbit.feature.reader

import kotlinx.coroutines.test.runTest
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

private class FakeAnnotationActions : ReactorAnnotationActions {
    data class Create(val cfi: String, val kind: String, val color: String?, val style: String?, val text: String?, val note: String?)
    data class Update(val id: String, val color: String?, val style: String?, val note: String?)

    var created: Create? = null
    var updated: Update? = null
    var deletedId: String? = null

    override suspend fun create(cfi: String, kind: String, color: String?, style: String?, text: String?, note: String?) {
        created = Create(cfi, kind, color, style, text, note)
    }

    override suspend fun update(id: String, color: String?, style: String?, note: String?) {
        updated = Update(id, color, style, note)
    }

    override suspend fun delete(id: String) {
        deletedId = id
    }
}

private class FakeBookmarkActions : ReactorBookmarkActions {
    var toggledCfi: String? = null
    override suspend fun toggle(cfi: String) {
        toggledCfi = cfi
    }
}

private class FakeSettingsActions : ReactorSettingsActions {
    var lastScope: String? = null
    var lastSettings: ReactorSettings? = null
    override suspend fun change(scope: String, settings: ReactorSettings) {
        lastScope = scope
        lastSettings = settings
    }
}

private class FakePlaybackActions : ReactorPlaybackActions {
    var played = false
    var paused = false
    var seekedTo: Double? = null
    var rate: Double? = null
    override fun play() { played = true }
    override fun pause() { paused = true }
    override fun seek(positionSec: Double) { seekedTo = positionSec }
    override fun setRate(rate: Double) { this.rate = rate }
}

private class FakeNotesSource(private val all: List<ReactorV2Command.SetNotes.Item>) : ReactorNotesSource {
    var lastRequest: Quad? = null
    data class Quad(val offset: Int, val limit: Int, val filter: String?, val sort: String?, val query: String?)

    override suspend fun page(offset: Int, limit: Int, filter: String?, sort: String?, query: String?): ReactorV2Command.SetNotes {
        lastRequest = Quad(offset, limit, filter, sort, query)
        val window = all.drop(offset).take(limit)
        return ReactorV2Command.SetNotes(total = all.size, offset = offset, items = window)
    }
}

class ReactorChromeControllerTest {
    private val annotations = FakeAnnotationActions()
    private val bookmarks = FakeBookmarkActions()
    private val settings = FakeSettingsActions()
    private val playback = FakePlaybackActions()
    private var backCalled = false
    private var closeCalled = false
    private val sentCommands = mutableListOf<ReactorV2Command>()

    private fun notesSource(items: List<ReactorV2Command.SetNotes.Item> = emptyList()) = FakeNotesSource(items)

    private fun controller(notes: ReactorNotesSource = notesSource()) = ReactorChromeController(
        annotations = annotations,
        bookmarks = bookmarks,
        settings = settings,
        playback = playback,
        notes = notes,
        onBack = { backCalled = true },
        onClose = { closeCalled = true },
        sendCommand = { sentCommands.add(it) },
    )

    @Test
    fun `annotationCreate maps onto the annotation repository`() = runTest {
        controller().handleIntent(
            ReactorV2Intent.AnnotationCreate("epubcfi(/6/4!/4/2/1:0)", "highlight", "#ffeb3b", "highlight", "text", null),
        )
        assertEquals(
            FakeAnnotationActions.Create("epubcfi(/6/4!/4/2/1:0)", "highlight", "#ffeb3b", "highlight", "text", null),
            annotations.created,
        )
    }

    @Test
    fun `annotationUpdate maps onto the annotation repository`() = runTest {
        controller().handleIntent(ReactorV2Intent.AnnotationUpdate("note-42", "#ff0000", "underline", "revisit"))
        assertEquals(FakeAnnotationActions.Update("note-42", "#ff0000", "underline", "revisit"), annotations.updated)
    }

    @Test
    fun `annotationDelete maps onto the annotation repository`() = runTest {
        controller().handleIntent(ReactorV2Intent.AnnotationDelete("note-42"))
        assertEquals("note-42", annotations.deletedId)
    }

    @Test
    fun `bookmarkToggle maps onto the bookmark repository`() = runTest {
        controller().handleIntent(ReactorV2Intent.BookmarkToggle("epubcfi(/6/4!/4/2/1:0)"))
        assertEquals("epubcfi(/6/4!/4/2/1:0)", bookmarks.toggledCfi)
    }

    @Test
    fun `settingsChange maps onto the settings store with scope`() = runTest {
        val s = ReactorSettings(fontSize = 20)
        controller().handleIntent(ReactorV2Intent.SettingsChange("book", s))
        assertEquals("book", settings.lastScope)
        assertEquals(s, settings.lastSettings)
    }

    @Test
    fun `playback play maps to play`() = runTest {
        controller().handleIntent(ReactorV2Intent.Playback("play", null, null))
        assertTrue(playback.played)
    }

    @Test
    fun `playback pause maps to pause`() = runTest {
        controller().handleIntent(ReactorV2Intent.Playback("pause", null, null))
        assertTrue(playback.paused)
    }

    @Test
    fun `playback seek maps to seek with the position`() = runTest {
        controller().handleIntent(ReactorV2Intent.Playback("seek", 184.5, null))
        assertEquals(184.5, playback.seekedTo)
    }

    @Test
    fun `playback rateChange maps to setRate`() = runTest {
        controller().handleIntent(ReactorV2Intent.Playback("rateChange", null, 1.5))
        assertEquals(1.5, playback.rate)
    }

    @Test
    fun `back calls the host's own back navigation, not close`() = runTest {
        controller().handleIntent(ReactorV2Intent.Back)
        assertTrue(backCalled)
        assertFalse(closeCalled)
    }

    @Test
    fun `close calls close, not back`() = runTest {
        controller().handleIntent(ReactorV2Intent.Close)
        assertTrue(closeCalled)
        assertFalse(backCalled)
    }

    @Test
    fun `starToggle and openRelated are ignored - no data source for them yet`() = runTest {
        controller().handleIntent(ReactorV2Intent.StarToggle("book-42"))
        controller().handleIntent(ReactorV2Intent.OpenRelated("book-7"))
        assertTrue(sentCommands.isEmpty())
    }

    @Test
    fun `chromeState is ignored - the host already owns system bars`() = runTest {
        controller().handleIntent(ReactorV2Intent.ChromeState(barsVisible = false, sidebar = "left"))
        assertTrue(sentCommands.isEmpty())
    }

    @Test
    fun `notesPageRequest with 5,000 annotations returns only the requested window`() = runTest {
        val all = (1..5000).map { i ->
            ReactorV2Command.SetNotes.Item(
                id = "note-$i",
                cfi = "epubcfi(/6/4!/4/2/1:$i)",
                kind = "highlight",
                color = null,
                style = null,
                text = "text $i",
                note = null,
                createdAt = "2026-11-03T10:00:00.000Z",
            )
        }
        val source = notesSource(all)
        controller(source).handleIntent(ReactorV2Intent.NotesPageRequest(offset = 40, limit = 20, filter = null, sort = null, query = null))

        assertEquals(FakeNotesSource.Quad(40, 20, null, null, null), source.lastRequest)
        val sent = sentCommands.single() as ReactorV2Command.SetNotes
        assertEquals(5000, sent.total)
        assertEquals(40, sent.offset)
        assertEquals(20, sent.items.size)
        assertEquals("note-41", sent.items.first().id)
        assertEquals("note-60", sent.items.last().id)
    }

    @Test
    fun `notesPageRequest near the end returns a short final window, not padded`() = runTest {
        val all = (1..50).map { i ->
            ReactorV2Command.SetNotes.Item("note-$i", "cfi-$i", "highlight", null, null, null, null, "2026-11-03T10:00:00.000Z")
        }
        val source = notesSource(all)
        controller(source).handleIntent(ReactorV2Intent.NotesPageRequest(offset = 45, limit = 20, filter = null, sort = null, query = null))
        val sent = sentCommands.single() as ReactorV2Command.SetNotes
        assertEquals(5, sent.items.size)
    }

    @Test
    fun `pushBookmarks sends a setBookmarks command`() = runTest {
        val items = listOf(ReactorV2Command.SetBookmarks.Item("cfi", "label", "2026-11-01T00:00:00.000Z"))
        controller().pushBookmarks(items)
        assertEquals(ReactorV2Command.SetBookmarks(items), sentCommands.single())
    }

    @Test
    fun `pushSettingsScope sends a setSettingsScope command`() = runTest {
        val s = ReactorSettings()
        controller().pushSettingsScope("global", s)
        assertEquals(ReactorV2Command.SetSettingsScope("global", s), sentCommands.single())
    }

    @Test
    fun `pushPlaybackState throttles rapid pushes`() = runTest {
        val c = controller()
        c.pushPlaybackState(playing = true, positionSec = 1.0, rate = 1.0, nowMs = 1_000L)
        c.pushPlaybackState(playing = true, positionSec = 1.2, rate = 1.0, nowMs = 1_100L)
        assertEquals(1, sentCommands.size)
        c.pushPlaybackState(playing = true, positionSec = 2.0, rate = 1.0, nowMs = 1_000L + ReactorChromeController.PLAYBACK_PUSH_THROTTLE_MS + 1)
        assertEquals(2, sentCommands.size)
    }

    // --- capability selection ---

    @Test
    fun `capabilities select bookmarks and notes always on, playback gated by narration`() {
        val withNarration = ReactorCapabilities.select(hasNarration = true)
        assertTrue(withNarration.bookmarks)
        assertTrue(withNarration.notes)
        assertTrue(withNarration.playback)
        assertFalse(withNarration.starred)
        assertFalse(withNarration.related)
        assertFalse(withNarration.glossary)
        assertFalse(withNarration.userGlossary)

        val withoutNarration = ReactorCapabilities.select(hasNarration = false)
        assertTrue(withoutNarration.bookmarks)
        assertTrue(withoutNarration.notes)
        assertFalse(withoutNarration.playback)
    }

    // --- inset conversion ---

    @Test
    fun `inset px to css px divides by density and rounds`() {
        assertEquals(24.0, insetPxToCssPx(72, density = 3f), 0.0)
        assertEquals(0.0, insetPxToCssPx(0, density = 2f), 0.0)
    }

    @Test
    fun `inset px to css px is zero-safe for a zero density`() {
        assertEquals(0.0, insetPxToCssPx(100, density = 0f), 0.0)
    }

    // --- ReactorAnnotationStyle: kind/style mapping ---

    @Test
    fun `kindForStyle folds strikethrough onto highlight and squiggly onto underline`() {
        assertEquals("highlight", ReactorAnnotationStyle.kindForStyle("highlight"))
        assertEquals("highlight", ReactorAnnotationStyle.kindForStyle("strikethrough"))
        assertEquals("underline", ReactorAnnotationStyle.kindForStyle("underline"))
        assertEquals("underline", ReactorAnnotationStyle.kindForStyle("squiggly"))
    }

    @Test
    fun `styleForIntent prefers the intent's own style over the kind default`() {
        assertEquals("squiggly", ReactorAnnotationStyle.styleForIntent("underline", "squiggly"))
        assertEquals("strikethrough", ReactorAnnotationStyle.styleForIntent("highlight", "strikethrough"))
    }

    @Test
    fun `styleForIntent falls back to a kind default when style is null`() {
        assertEquals("underline", ReactorAnnotationStyle.styleForIntent("underline", null))
        assertEquals("highlight", ReactorAnnotationStyle.styleForIntent("highlight", null))
        assertEquals("highlight", ReactorAnnotationStyle.styleForIntent("note", null))
        assertEquals("highlight", ReactorAnnotationStyle.styleForIntent("bookmark", null))
    }

    @Test
    fun `kind-style mapping round trips through every supported style`() {
        for (style in listOf("highlight", "underline", "strikethrough", "squiggly")) {
            val kind = ReactorAnnotationStyle.kindForStyle(style)
            assertEquals(style, ReactorAnnotationStyle.styleForIntent(kind, style))
        }
    }
}
