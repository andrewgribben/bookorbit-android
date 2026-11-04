package com.bookorbit.feature.reader

import com.bookorbit.feature.reader.narration.NarrationItem
import com.bookorbit.feature.reader.narration.NarrationTimeline
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

class ReaderBridgeEventsTest {
    @Test
    fun `parses a tap`() {
        val e = ReaderBridge.parseEvent("""{"type":"tap","x":0.82}""")
        assertEquals(ReaderEvent.Tap(0.82), e)
    }

    @Test
    fun `parses a selection with its viewport rect`() {
        val e = ReaderBridge.parseEvent(
            """{"type":"selection","text":"undertaker","cfi":"epubcfi(/6/10!/4/2)","rect":{"left":1.5,"top":2.0,"right":30.0,"bottom":18.0}}""",
        ) as ReaderEvent.Selection
        assertEquals("undertaker", e.text)
        assertEquals("epubcfi(/6/10!/4/2)", e.cfi)
        assertEquals(ViewportRect(1.5, 2.0, 30.0, 18.0), e.rect)
    }

    @Test
    fun `selection without a cfi still parses so the host can ignore it`() {
        val e = ReaderBridge.parseEvent("""{"type":"selection","text":"x","cfi":null,"rect":null}""") as ReaderEvent.Selection
        assertNull(e.cfi)
        assertNull(e.rect)
    }

    @Test
    fun `parses history availability`() {
        assertEquals(ReaderEvent.History(canGoBack = true, canGoForward = false), ReaderBridge.parseEvent("""{"type":"history","canGoBack":true,"canGoForward":false}"""))
        assertEquals(ReaderEvent.History(canGoBack = false, canGoForward = false), ReaderBridge.parseEvent("""{"type":"history"}"""))
    }

    @Test
    fun `parses selection cleared and annotation tap`() {
        assertTrue(ReaderBridge.parseEvent("""{"type":"selectionCleared"}""") === ReaderEvent.SelectionCleared)
        val tap = ReaderBridge.parseEvent("""{"type":"annotationTap","cfi":"epubcfi(/6/2)","rect":null}""") as ReaderEvent.AnnotationTap
        assertEquals("epubcfi(/6/2)", tap.cfi)
        assertNull(tap.rect)
    }

    @Test
    fun `a malformed rect is dropped rather than failing the event`() {
        val e = ReaderBridge.parseEvent("""{"type":"selection","text":"x","cfi":"c","rect":{"left":1}}""") as ReaderEvent.Selection
        assertNull(e.rect)
    }

    @Test
    fun `parses a batch of search results`() {
        val e = ReaderBridge.parseEvent(
            """{"type":"searchResults","label":"Chapter 2","items":[{"cfi":"epubcfi(/6/4)","pre":"the ","match":"beadle","post":" said"},{"pre":"no cfi"}]}""",
        ) as ReaderEvent.SearchResults
        assertEquals("Chapter 2", e.label)
        // The item without a cfi can't be jumped to, so it is dropped.
        assertEquals(listOf(SearchHit("epubcfi(/6/4)", "the ", "beadle", " said")), e.hits)
    }

    @Test
    fun `parses search progress and completion`() {
        assertEquals(ReaderEvent.SearchProgress(0.5), ReaderBridge.parseEvent("""{"type":"searchProgress","progress":0.5}"""))
        assertEquals(ReaderEvent.SearchDone(3, true), ReaderBridge.parseEvent("""{"type":"searchDone","total":3,"capped":true}"""))
        assertEquals(ReaderEvent.SearchDone(0, false), ReaderBridge.parseEvent("""{"type":"searchDone"}"""))
    }

    @Test
    fun `loaded without hasMediaOverlay defaults to false`() {
        val e = ReaderBridge.parseEvent("""{"type":"loaded","toc":[],"metadata":{}}""") as ReaderEvent.Loaded
        assertEquals(false, e.hasMediaOverlay)
    }

    @Test
    fun `loaded reports hasMediaOverlay when the bridge detected one`() {
        val e = ReaderBridge.parseEvent("""{"type":"loaded","toc":[],"metadata":{},"hasMediaOverlay":true}""") as ReaderEvent.Loaded
        assertEquals(true, e.hasMediaOverlay)
    }

    @Test
    fun `parses a narration timeline`() {
        val json = """
            {
              "type": "narrationTimeline",
              "audioSrcs": ["audio/ch1.mp3", "audio/ch2.mp3"],
              "items": [
                {"sectionIndex": 0, "textHref": "ch1.xhtml#p1", "beginSec": 0.0, "endSec": 2.5, "audioIndex": 0},
                {"sectionIndex": 1, "textHref": "ch2.xhtml#p1", "beginSec": 0.0, "audioIndex": 1}
              ],
              "activeClass": "-epub-media-overlay-active",
              "playbackActiveClass": "media-overlay-playing",
              "startTextHref": "ch1.xhtml#p1"
            }
        """.trimIndent()
        val e = ReaderBridge.parseEvent(json) as ReaderEvent.NarrationReady
        assertEquals(listOf("audio/ch1.mp3", "audio/ch2.mp3"), e.timeline.audioSrcs)
        assertEquals(2, e.timeline.items.size)
        assertEquals(NarrationItem(0, "ch1.xhtml#p1", 0.0, 2.5, 0), e.timeline.items[0])
        assertEquals(NarrationItem(1, "ch2.xhtml#p1", 0.0, null, 1), e.timeline.items[1])
        assertEquals("media-overlay-playing", e.timeline.playbackActiveClass)
        assertEquals("ch1.xhtml#p1", e.timeline.startTextHref)
    }

    @Test
    fun `a narration timeline without an activeClass falls back to the EPUB 3 default`() {
        val json = """
            {"type":"narrationTimeline","audioSrcs":["a.mp3"],
             "items":[{"sectionIndex":0,"textHref":"c.xhtml","beginSec":0.0,"audioIndex":0}]}
        """.trimIndent()
        val e = ReaderBridge.parseEvent(json) as ReaderEvent.NarrationReady
        assertEquals(NarrationTimeline.DEFAULT_ACTIVE_CLASS, e.timeline.activeClass)
        assertNull(e.timeline.playbackActiveClass)
    }

    @Test
    fun `a narration timeline with no items fails instead of parsing empty`() {
        val e = ReaderBridge.parseEvent("""{"type":"narrationTimeline","audioSrcs":["a.mp3"],"items":[]}""")
        assertTrue(e is ReaderEvent.NarrationFailed)
    }

    @Test
    fun `parses an explicit narration timeline error`() {
        val e = ReaderBridge.parseEvent("""{"type":"narrationTimelineError","message":"boom"}""") as ReaderEvent.NarrationFailed
        assertEquals("boom", e.message)
    }
}
