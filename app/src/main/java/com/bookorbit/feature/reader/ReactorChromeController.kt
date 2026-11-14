package com.bookorbit.feature.reader

/**
 * Applies Reactor protocol v2 intents to the app's existing reader repositories/stores, and
 * builds the `set*` commands pushed back to Reactor. Depends only on small action interfaces
 * (not the concrete repositories) so it is unit-testable with fakes; see
 * `ReactorChromeIntegration.kt` for the adapters that wire it to the real
 * [ReaderAnnotationRepository] / [ReaderBookmarkRepository] / [ReaderSettingsStore] / narration
 * playback controller.
 *
 * Mapping table (intent -> app action):
 * - annotationCreate/Update/Delete -> [ReactorAnnotationActions]
 * - bookmarkToggle -> [ReactorBookmarkActions] (add if not bookmarked at that cfi, else remove)
 * - settingsChange{scope,settings} -> [ReactorSettingsActions] (Global/This book scope semantics
 *   already used by [ReaderSettingsScope])
 * - playback{action} -> [ReactorPlaybackActions]
 * - back -> the host's own back navigation (does not end the reader session)
 * - close -> leaving the reader (ends the session)
 * - notesPageRequest -> [ReactorNotesSource], bounded by the requested window, never "all of them"
 * - starToggle / openRelated -> ignored (the app has no starred/related data source yet; these
 *   intents can only arrive if `configure.capabilities.starred`/`related` was sent true, which
 *   [ReactorCapabilities.select] never does while that's the case)
 * - chromeState -> ignored; the host already manages system bars/back itself (see A3 BUILD section)
 */
class ReactorChromeController(
    private val annotations: ReactorAnnotationActions,
    private val bookmarks: ReactorBookmarkActions,
    private val settings: ReactorSettingsActions,
    private val playback: ReactorPlaybackActions,
    private val notes: ReactorNotesSource,
    private val onBack: () -> Unit,
    private val onClose: () -> Unit,
    private val sendCommand: suspend (ReactorV2Command) -> Unit,
) {
    private var lastPlaybackPushAtMs = 0L

    /** Applies one parsed intent. Unknown intents never reach here - [ReactorV2.parseIntent]
     * already returns null for them. */
    suspend fun handleIntent(intent: ReactorV2Intent) {
        when (intent) {
            is ReactorV2Intent.AnnotationCreate ->
                annotations.create(intent.cfi, intent.kind, intent.color, intent.style, intent.text, intent.note)
            is ReactorV2Intent.AnnotationUpdate ->
                annotations.update(intent.id, intent.color, intent.style, intent.note)
            is ReactorV2Intent.AnnotationDelete -> annotations.delete(intent.id)
            is ReactorV2Intent.BookmarkToggle -> bookmarks.toggle(intent.cfi)
            is ReactorV2Intent.StarToggle -> Unit
            is ReactorV2Intent.SettingsChange -> settings.change(intent.scope, intent.settings)
            is ReactorV2Intent.OpenRelated -> Unit
            is ReactorV2Intent.Playback -> applyPlayback(intent)
            ReactorV2Intent.Close -> onClose()
            ReactorV2Intent.Back -> onBack()
            is ReactorV2Intent.ChromeState -> Unit
            is ReactorV2Intent.NotesPageRequest ->
                sendCommand(notes.page(intent.offset, intent.limit, intent.filter, intent.sort, intent.query))
        }
    }

    private fun applyPlayback(intent: ReactorV2Intent.Playback) {
        when (intent.action) {
            "play" -> playback.play()
            "pause" -> playback.pause()
            "seek" -> intent.positionSec?.let(playback::seek)
            "rateChange" -> intent.rate?.let(playback::setRate)
        }
    }

    suspend fun pushBookmarks(items: List<ReactorV2Command.SetBookmarks.Item>) =
        sendCommand(ReactorV2Command.SetBookmarks(items))

    suspend fun pushSettingsScope(scope: String, settings: ReactorSettings) =
        sendCommand(ReactorV2Command.SetSettingsScope(scope, settings))

    /** Throttled: a narration position ticks far faster than Reactor's player bar needs updates. */
    suspend fun pushPlaybackState(
        playing: Boolean,
        positionSec: Double,
        rate: Double,
        nowMs: Long = System.currentTimeMillis(),
    ) {
        if (nowMs - lastPlaybackPushAtMs < PLAYBACK_PUSH_THROTTLE_MS) return
        lastPlaybackPushAtMs = nowMs
        sendCommand(ReactorV2Command.SetPlaybackState(playing, positionSec, rate))
    }

    companion object {
        const val PLAYBACK_PUSH_THROTTLE_MS = 500L
    }
}

interface ReactorAnnotationActions {
    suspend fun create(cfi: String, kind: String, color: String?, style: String?, text: String?, note: String?)
    suspend fun update(id: String, color: String?, style: String?, note: String?)
    suspend fun delete(id: String)
}

interface ReactorBookmarkActions {
    suspend fun toggle(cfi: String)
}

interface ReactorSettingsActions {
    suspend fun change(scope: String, settings: ReactorSettings)
}

interface ReactorPlaybackActions {
    fun play()
    fun pause()
    fun seek(positionSec: Double)
    fun setRate(rate: Double)
}

interface ReactorNotesSource {
    /** Must return at most [limit] items starting at [offset] - never the whole collection,
     * however many rows the app actually has (WORKTREE_BRIEF.md rule 5 / scale conventions). */
    suspend fun page(offset: Int, limit: Int, filter: String?, sort: String?, query: String?): ReactorV2Command.SetNotes
}

/**
 * Decides `configure.capabilities` (README "Capability presence is decided once ... never from
 * whether a set* call has arrived yet"): bookmarks and notes are always-on app features;
 * playback only when this book actually has narration; starred/related stay off until the app
 * has a real data source for them (no star/related feature exists yet, so always false).
 */
object ReactorCapabilities {
    fun select(hasNarration: Boolean): ReactorV2Command.Configure.Capabilities =
        ReactorV2Command.Configure.Capabilities(
            starred = false,
            related = false,
            glossary = false,
            notes = true,
            bookmarks = true,
            playback = hasNarration,
            userGlossary = false,
        )
}

/** Converts WindowInsets (Android physical px) to CSS px (ReactorV2's `configure.insets` unit -
 * CSS px equal dp, see [ViewportRect]'s doc), rounding to the nearest whole px like other reader
 * geometry sent across the bridge. */
fun insetPxToCssPx(px: Int, density: Float): Double =
    if (density <= 0f) 0.0 else Math.round(px / density).toDouble()

/**
 * Maps between Reactor's text-mark `style` (the fine-grained visual style used by its own shell -
 * `highlight`/`underline`/`strikethrough`/`squiggly`, see `reactor/src/marks/draw.ts` and
 * `reactor/src/shell/annotations/mount.ts`) and protocol v2's coarser `kind`
 * (`highlight`/`underline`/`note`/`bookmark`). This app's own [BookAnnotation.style] /
 * [ReaderAnnotationRepository] use the same four style strings Reactor does - no server-side
 * translation needed - so only `kind` (which this app has no field for) needs deriving.
 *
 * `kindForStyle` mirrors Reactor's own `markKindForStyle`: strikethrough is drawn as a highlight
 * variant, squiggly as an underline variant, so both fold onto their coarser kind.
 */
object ReactorAnnotationStyle {
    private val UNDERLINE_STYLES = setOf("underline", "squiggly")

    fun kindForStyle(style: String): String = if (style in UNDERLINE_STYLES) "underline" else "highlight"

    /** The style to persist for an `annotationCreate` intent: Reactor's own `style` field wins
     * when present (it already carries the fine-grained value); otherwise fall back to a default
     * for the coarse `kind` (`note`/`bookmark` have no mark style, so they default to highlight
     * like every other kind-only intent). */
    fun styleForIntent(kind: String, style: String?): String =
        style ?: if (kind == "underline") "underline" else ReaderAnnotationRepository.DEFAULT_STYLE
}
