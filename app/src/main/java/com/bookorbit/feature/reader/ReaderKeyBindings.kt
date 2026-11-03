package com.bookorbit.feature.reader

import android.view.KeyEvent

/** A hardware key resolved into a page turn, independent of which direction is "forward" on
 * screen - the caller (ebook/comic reader) decides what NEXT/PREVIOUS actually does. */
enum class PageTurnKey { NEXT, PREVIOUS }

/**
 * Maps a hardware key code to a page turn.
 *
 * Volume keys only turn pages when [volumeKeysEnabled] (the Controls tab setting) is on; they are
 * deliberately left unmirrored for RTL content - the approved plan only calls for mirroring the
 * tap zones, not the volume rocker, so VOLUME_UP is always "previous" and VOLUME_DOWN is always
 * "next" regardless of reading direction (deviation, noted for the owner).
 *
 * Hardware arrow keys and PageUp/PageDown always turn pages (not gated by the setting), matching
 * standard reader/e-reader conventions; they are likewise unmirrored for RTL for the same reason.
 */
fun resolveKeyPageTurn(keyCode: Int, volumeKeysEnabled: Boolean): PageTurnKey? = when (keyCode) {
    KeyEvent.KEYCODE_VOLUME_UP -> if (volumeKeysEnabled) PageTurnKey.PREVIOUS else null
    KeyEvent.KEYCODE_VOLUME_DOWN -> if (volumeKeysEnabled) PageTurnKey.NEXT else null
    KeyEvent.KEYCODE_DPAD_LEFT, KeyEvent.KEYCODE_PAGE_UP -> PageTurnKey.PREVIOUS
    KeyEvent.KEYCODE_DPAD_RIGHT, KeyEvent.KEYCODE_PAGE_DOWN -> PageTurnKey.NEXT
    else -> null
}

/** True for either volume key, regardless of the setting - used to decide whether an event this
 * app isn't turning pages with should still be swallowed (never: see [ReaderKeyBindings.dispatch]
 * - only the DOWN that actually turns a page is consumed; everything else is left for the OS). */
fun isVolumeKey(keyCode: Int): Boolean =
    keyCode == KeyEvent.KEYCODE_VOLUME_UP || keyCode == KeyEvent.KEYCODE_VOLUME_DOWN

/**
 * App-wide registry [MainActivity.dispatchKeyEvent] consults so volume keys and hardware
 * page-turn keys work only while a reader screen (ebook or comic) is actually on screen, and
 * without depending on which child view currently holds Compose focus (the ebook reader's
 * WebView, in particular, can grab focus on its own). The reader screen registers a handler for
 * as long as it's composed and keeps [volumeKeysEnabled] in sync with the live Controls setting.
 */
object ReaderKeyBindings {
    @Volatile
    private var handler: ((PageTurnKey) -> Unit)? = null

    @Volatile
    private var volumeKeysEnabled: Boolean = false

    /** Key codes whose DOWN we consumed, so the matching UP is swallowed too (otherwise the OS
     * can still react to a bare volume-key UP). Cleared as each UP is consumed. */
    private val suppressedUpKeys = java.util.concurrent.ConcurrentHashMap.newKeySet<Int>()

    fun setVolumeKeysEnabled(enabled: Boolean) {
        volumeKeysEnabled = enabled
    }

    fun enter(onPageTurn: (PageTurnKey) -> Unit) {
        handler = onPageTurn
    }

    /** No-ops if [onPageTurn] isn't the currently active handler (e.g. a screen beneath it in the
     * back stack already left and was replaced before this one's dispose runs). */
    fun leave(onPageTurn: (PageTurnKey) -> Unit) {
        if (handler === onPageTurn) handler = null
    }

    /** Called from [MainActivity.dispatchKeyEvent]; true if the event was consumed (so the OS
     * leaves the volume/focus chain alone). Takes the raw action/keyCode ints (rather than a
     * [KeyEvent]) so this is plain-JVM testable without Robolectric. */
    fun dispatch(action: Int, keyCode: Int): Boolean {
        val active = handler ?: return false
        if (action != KeyEvent.ACTION_DOWN) {
            return suppressedUpKeys.remove(keyCode)
        }
        val turn = resolveKeyPageTurn(keyCode, volumeKeysEnabled) ?: return false
        suppressedUpKeys.add(keyCode)
        active(turn)
        return true
    }

    fun dispatch(event: KeyEvent): Boolean = dispatch(event.action, event.keyCode)
}
