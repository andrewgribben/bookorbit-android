package com.bookorbit.feature.reader

import android.view.KeyEvent
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Test

class ReaderKeyBindingsTest {
    @Test
    fun `volume keys turn pages only when the setting is on`() {
        assertNull(resolveKeyPageTurn(KeyEvent.KEYCODE_VOLUME_UP, volumeKeysEnabled = false))
        assertNull(resolveKeyPageTurn(KeyEvent.KEYCODE_VOLUME_DOWN, volumeKeysEnabled = false))
        assertEquals(PageTurnKey.PREVIOUS, resolveKeyPageTurn(KeyEvent.KEYCODE_VOLUME_UP, volumeKeysEnabled = true))
        assertEquals(PageTurnKey.NEXT, resolveKeyPageTurn(KeyEvent.KEYCODE_VOLUME_DOWN, volumeKeysEnabled = true))
    }

    @Test
    fun `arrows and page keys always turn pages regardless of the setting`() {
        assertEquals(PageTurnKey.PREVIOUS, resolveKeyPageTurn(KeyEvent.KEYCODE_DPAD_LEFT, volumeKeysEnabled = false))
        assertEquals(PageTurnKey.NEXT, resolveKeyPageTurn(KeyEvent.KEYCODE_DPAD_RIGHT, volumeKeysEnabled = false))
        assertEquals(PageTurnKey.PREVIOUS, resolveKeyPageTurn(KeyEvent.KEYCODE_PAGE_UP, volumeKeysEnabled = false))
        assertEquals(PageTurnKey.NEXT, resolveKeyPageTurn(KeyEvent.KEYCODE_PAGE_DOWN, volumeKeysEnabled = false))
    }

    @Test
    fun `unrelated keys resolve to nothing`() {
        assertNull(resolveKeyPageTurn(KeyEvent.KEYCODE_A, volumeKeysEnabled = true))
    }

    @Test
    fun `isVolumeKey identifies only the two volume keys`() {
        assertEquals(true, isVolumeKey(KeyEvent.KEYCODE_VOLUME_UP))
        assertEquals(true, isVolumeKey(KeyEvent.KEYCODE_VOLUME_DOWN))
        assertEquals(false, isVolumeKey(KeyEvent.KEYCODE_DPAD_LEFT))
    }

    // dispatch() is exercised via the raw action/keyCode overload - a real android.view.KeyEvent
    // isn't constructible in a plain JVM unit test (the android.jar stub throws).
    @Test
    fun `dispatch does nothing when no reader screen is registered`() {
        assertEquals(false, ReaderKeyBindings.dispatch(KeyEvent.ACTION_DOWN, KeyEvent.KEYCODE_VOLUME_DOWN))
    }

    @Test
    fun `dispatch consumes a page-turning key down and its matching up while registered`() {
        var turns = 0
        val handler: (PageTurnKey) -> Unit = { turns++ }
        ReaderKeyBindings.setVolumeKeysEnabled(true)
        ReaderKeyBindings.enter(handler)

        assertEquals(true, ReaderKeyBindings.dispatch(KeyEvent.ACTION_DOWN, KeyEvent.KEYCODE_VOLUME_DOWN))
        assertEquals(1, turns)
        assertEquals(true, ReaderKeyBindings.dispatch(KeyEvent.ACTION_UP, KeyEvent.KEYCODE_VOLUME_DOWN))

        ReaderKeyBindings.leave(handler)
        assertEquals(false, ReaderKeyBindings.dispatch(KeyEvent.ACTION_DOWN, KeyEvent.KEYCODE_VOLUME_DOWN))
        ReaderKeyBindings.setVolumeKeysEnabled(false)
    }

    @Test
    fun `leave is a no-op when a different handler is active`() {
        val first: (PageTurnKey) -> Unit = {}
        val second: (PageTurnKey) -> Unit = {}
        ReaderKeyBindings.enter(first)
        ReaderKeyBindings.leave(second)
        // first is still active: an unconditional arrow key is still consumed.
        assertEquals(true, ReaderKeyBindings.dispatch(KeyEvent.ACTION_DOWN, KeyEvent.KEYCODE_DPAD_RIGHT))
        ReaderKeyBindings.leave(first)
    }
}
