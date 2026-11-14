package com.bookorbit.feature.reader

import com.bookorbit.feature.reader.narration.NarrationItem
import com.bookorbit.feature.reader.narration.NarrationTimeline
import java.io.File
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Test

/**
 * Golden v1 protocol fixtures from the Reactor repo (`src/protocol/fixtures/events/`), committed
 * here at `src/test/resources/reactor-fixtures/events/`. Each fixture is wire JSON Reactor could
 * legitimately post; this asserts `ReaderBridge.parseEvent` keeps producing the same `ReaderEvent`
 * for it as it does today, so swapping in the real Reactor bundle (R4) can't silently change what
 * the host sees. See `docs/SPEC.md` section 2 and `src/protocol/fixtures/events/expected.json`
 * in the Reactor repo for the human-readable mapping this table mirrors.
 *
 * `loaded-multilingual-title.json` is the one case where this test's expectation differs from
 * Reactor's `expected.json`: that file documents `ktType: null` (parseEvent used to throw on a
 * map title and drop the whole `loaded` event). That gap is fixed as part of this task (A1) -
 * see the dedicated test in [ReaderBridgeEventsTest] - so here it asserts the fixed behaviour.
 */
class ReactorFixturesTest {
    private val fixturesDir = File("src/test/resources/reactor-fixtures/events")

    private fun fixture(name: String): String = File(fixturesDir, name).readText()

    @Test
    fun `ready fixture parses`() {
        assertEquals(ReaderEvent.Ready, ReaderBridge.parseEvent(fixture("ready.json")))
    }

    @Test
    fun `loaded fixture parses with toc, title, media overlay and rtl`() {
        val e = ReaderBridge.parseEvent(fixture("loaded.json")) as ReaderEvent.Loaded
        assertEquals(
            listOf(
                TocItem("Chapter 1", "OPS/chapter_001.xhtml", emptyList()),
                TocItem(
                    "Chapter 2",
                    "OPS/chapter_002.xhtml",
                    listOf(TocItem("Chapter 2, part 1", "OPS/chapter_002.xhtml#p1", emptyList())),
                ),
            ),
            e.toc,
        )
        assertEquals("Moby-Dick", e.title)
        assertEquals(true, e.hasMediaOverlay)
        assertEquals(false, e.isRtl)
    }

    @Test
    fun `loaded-minimal fixture parses with nulls and defaults`() {
        val e = ReaderBridge.parseEvent(fixture("loaded-minimal.json")) as ReaderEvent.Loaded
        assertEquals(emptyList<TocItem>(), e.toc)
        assertNull(e.title)
        assertEquals(false, e.hasMediaOverlay)
        assertEquals(false, e.isRtl)
    }

    @Test
    fun `loaded-multilingual-title fixture now parses, picking the map's first title`() {
        val e = ReaderBridge.parseEvent(fixture("loaded-multilingual-title.json")) as ReaderEvent.Loaded
        assertEquals(
            listOf(TocItem("Couverture", "EPUB/Content/A_cover.xhtml", emptyList())),
            e.toc,
        )
        assertEquals("Le Vrai Régime anti-cancer", e.title)
        assertEquals(false, e.hasMediaOverlay)
        assertEquals(true, e.isRtl)
    }

    @Test
    fun `loaded-language-array fixture parses (language is dropped, not read by parseEvent)`() {
        val e = ReaderBridge.parseEvent(fixture("loaded-language-array.json")) as ReaderEvent.Loaded
        assertEquals(
            listOf(TocItem("The Yellow Wallpaper", "filepos:0000001644", emptyList())),
            e.toc,
        )
        assertEquals("The Yellow Wallpaper", e.title)
        assertEquals(false, e.hasMediaOverlay)
        assertEquals(false, e.isRtl)
    }

    @Test
    fun `relocate fixture parses every field (location is ignored, not in the wire shape)`() {
        val e = ReaderBridge.parseEvent(fixture("relocate.json")) as ReaderEvent.Relocate
        assertEquals(
            ReaderEvent.Relocate(
                cfi = "epubcfi(/6/4!/4/2/1:0)",
                fraction = 0.42,
                chapterTitle = "Chapter 1",
                reason = "page",
                restoring = false,
                narrationFragment = "OPS/chapter_001.xhtml#f1",
                narrationSectionIndex = 3,
            ),
            e,
        )
    }

    @Test
    fun `relocate-nulls fixture parses with every optional field null and restoring true`() {
        val e = ReaderBridge.parseEvent(fixture("relocate-nulls.json")) as ReaderEvent.Relocate
        assertEquals(
            ReaderEvent.Relocate(
                cfi = null,
                fraction = null,
                chapterTitle = null,
                reason = null,
                restoring = true,
                narrationFragment = null,
                narrationSectionIndex = null,
            ),
            e,
        )
    }

    @Test
    fun `history fixture parses`() {
        assertEquals(
            ReaderEvent.History(canGoBack = true, canGoForward = false),
            ReaderBridge.parseEvent(fixture("history.json")),
        )
    }

    @Test
    fun `error fixture parses`() {
        assertEquals(ReaderEvent.Error("Failed to open book"), ReaderBridge.parseEvent(fixture("error.json")))
    }

    @Test
    fun `tap fixture parses`() {
        assertEquals(ReaderEvent.Tap(0.82, 0.5), ReaderBridge.parseEvent(fixture("tap.json")))
    }

    @Test
    fun `selection fixture parses with text, cfi and rect`() {
        assertEquals(
            ReaderEvent.Selection(
                "the yellow wallpaper",
                "epubcfi(/6/4!/4/2/1:0,/4/2/1:21)",
                ViewportRect(12.5, 100.0, 200.0, 120.0),
            ),
            ReaderBridge.parseEvent(fixture("selection.json")),
        )
    }

    @Test
    fun `selection-null-cfi fixture parses with a null cfi`() {
        assertEquals(
            ReaderEvent.Selection("an unresolvable range", null, ViewportRect(0.0, 0.0, 50.0, 20.0)),
            ReaderBridge.parseEvent(fixture("selection-null-cfi.json")),
        )
    }

    @Test
    fun `selectionCleared fixture parses`() {
        assertEquals(ReaderEvent.SelectionCleared, ReaderBridge.parseEvent(fixture("selectionCleared.json")))
    }

    @Test
    fun `searchResults fixture parses its hits`() {
        assertEquals(
            ReaderEvent.SearchResults(
                "Chapter 1",
                listOf(
                    SearchHit("epubcfi(/6/4!/4/2/1:0)", "the ", "yellow", " wallpaper"),
                    SearchHit("epubcfi(/6/4!/4/4/1:0)", "a dull ", "yellow", " room"),
                ),
            ),
            ReaderBridge.parseEvent(fixture("searchResults.json")),
        )
    }

    @Test
    fun `searchResults-empty fixture parses with no hits`() {
        assertEquals(
            ReaderEvent.SearchResults("Chapter 2", emptyList()),
            ReaderBridge.parseEvent(fixture("searchResults-empty.json")),
        )
    }

    @Test
    fun `searchProgress fixture parses`() {
        assertEquals(ReaderEvent.SearchProgress(0.33), ReaderBridge.parseEvent(fixture("searchProgress.json")))
    }

    @Test
    fun `searchDone fixture parses`() {
        assertEquals(ReaderEvent.SearchDone(7, false), ReaderBridge.parseEvent(fixture("searchDone.json")))
    }

    @Test
    fun `searchDone-capped fixture parses`() {
        assertEquals(ReaderEvent.SearchDone(200, true), ReaderBridge.parseEvent(fixture("searchDone-capped.json")))
    }

    @Test
    fun `annotationTap fixture parses with its rect`() {
        assertEquals(
            ReaderEvent.AnnotationTap("epubcfi(/6/4!/4/2/1:0)", ViewportRect(12.5, 100.0, 200.0, 120.0)),
            ReaderBridge.parseEvent(fixture("annotationTap.json")),
        )
    }

    @Test
    fun `annotationTap-null fixture is dropped - known gap, AnnotationTap requires a non-null cfi`() {
        assertNull(ReaderBridge.parseEvent(fixture("annotationTap-null.json")))
    }

    @Test
    fun `narrationTimeline fixture parses its full timeline`() {
        val e = ReaderBridge.parseEvent(fixture("narrationTimeline.json")) as ReaderEvent.NarrationReady
        assertEquals(1, e.generation)
        assertEquals(
            NarrationTimeline(
                audioSrcs = listOf("OPS/audio/ch1.mp3"),
                items = listOf(
                    NarrationItem(3, "OPS/chapter_001.xhtml#f1", 0.0, 4.2, 0),
                    NarrationItem(3, "OPS/chapter_001.xhtml#f2", 4.2, null, 0),
                ),
                activeClass = "-epub-media-overlay-active",
                playbackActiveClass = null,
                startTextHref = "OPS/chapter_001.xhtml#f1",
            ),
            e.timeline,
        )
    }

    @Test
    fun `narrationTimelineError fixture parses`() {
        assertEquals(
            ReaderEvent.NarrationFailed("Couldn't read this book's narration", 1),
            ReaderBridge.parseEvent(fixture("narrationTimelineError.json")),
        )
    }
}
