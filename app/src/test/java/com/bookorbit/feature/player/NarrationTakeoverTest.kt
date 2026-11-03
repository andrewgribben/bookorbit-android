package com.bookorbit.feature.player

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Test

/** Covers the narration-clearing decision in [withNarrationCleared], used by [PlayerManager]
 * wherever a real or externally-adopted queue takes over the shared player (see QA finding:
 * a real audiobook after narration must always report server progress and listening sessions). */
class NarrationTakeoverTest {

    @Test
    fun `clears narration flags and position`() {
        val state = PlayerManager.UiState(
            narrationActive = true,
            narrationMediaIndex = 3,
            narrationPositionMs = 42_000L,
        )
        val cleared = state.withNarrationCleared()
        assertFalse(cleared.narrationActive)
        assertEquals(0, cleared.narrationMediaIndex)
        assertEquals(0L, cleared.narrationPositionMs)
    }

    @Test
    fun `is a no-op when narration was already off`() {
        val state = PlayerManager.UiState(narrationActive = false, narrationMediaIndex = 0, narrationPositionMs = 0L)
        assertEquals(state, state.withNarrationCleared())
    }

    @Test
    fun `leaves unrelated fields untouched`() {
        val state = PlayerManager.UiState(
            isPlaying = true,
            speed = 1.5f,
            narrationActive = true,
            narrationMediaIndex = 5,
            narrationPositionMs = 9_999L,
        )
        val cleared = state.withNarrationCleared()
        assertEquals(true, cleared.isPlaying)
        assertEquals(1.5f, cleared.speed)
    }
}
