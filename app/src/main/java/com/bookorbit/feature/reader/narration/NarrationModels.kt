package com.bookorbit.feature.reader.narration

/**
 * One EPUB 3 Media Overlay SMIL `<par>`: the text fragment that should be highlighted while
 * [audioIndex]'s file plays between [beginSec] and [endSec]. Mirrors the entries foliate's
 * `MediaOverlay#loadSMIL` (assets/reader/foliate/epub.js) builds for its own (unused here) HTML
 * Audio playback.
 */
data class NarrationItem(
    val sectionIndex: Int,
    /** The resolved href (+ optional `#fragment`) of the text this item highlights, as used by
     * `foliate-view`'s own navigation (dispatched back to it - see NarrationCommands). */
    val textHref: String,
    val beginSec: Double,
    val endSec: Double?,
    /** Index into the timeline's `audioSrcs` (one entry per unique audio file referenced). */
    val audioIndex: Int,
)

/**
 * A book's whole Media Overlay timeline, as parsed by the WebView bridge from every section's
 * SMIL file (see assets/reader/bridge.js `buildNarrationTimeline`). [items] is in natural reading
 * order (section, then within-section SMIL order); [NarrationLocator] re-sorts it for lookup.
 */
data class NarrationTimeline(
    /** EPUB-internal zip paths, one per unique audio file, in first-seen order. */
    val audioSrcs: List<String>,
    val items: List<NarrationItem>,
    /** `book.media.activeClass`, defaulting to the EPUB 3 spec fallback when unset. */
    val activeClass: String,
    /** `book.media.playbackActiveClass`, applied to the document root while any item is active. */
    val playbackActiveClass: String?,
    /** The first item on the page the user had open when narration was turned on, if found. */
    val startTextHref: String?,
) {
    companion object {
        const val DEFAULT_ACTIVE_CLASS = "-epub-media-overlay-active"
    }
}
