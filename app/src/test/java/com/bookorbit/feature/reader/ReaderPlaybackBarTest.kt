package com.bookorbit.feature.reader

import com.bookorbit.feature.player.DEFAULT_SKIP_BACK
import com.bookorbit.feature.player.DEFAULT_SKIP_FORWARD
import com.bookorbit.feature.player.PlayerManager
import org.junit.Assert.assertEquals
import org.junit.Test

/**
 * Stage 4: the reader's bottom bar swaps between the ordinary progress row and the narration
 * player's transport controls, and that player's skip-back/forward amounts must come from the
 * audiobook player's own configurable settings - never a fixed 15/15 (see the stage-4 card and
 * `design-notes.md`'s "Open design questions" #1, resolved by the owner in favour of the real
 * 10s/30s defaults).
 */
class ReaderBottomBarContentTest {
    @Test
    fun `narration on shows the player controls`() {
        assertEquals(ReaderBottomBarContent.NARRATION_PLAYER, readerBottomBarContent(narrationOn = true))
    }

    @Test
    fun `narration off shows the ordinary progress row`() {
        assertEquals(ReaderBottomBarContent.PROGRESS, readerBottomBarContent(narrationOn = false))
    }
}

class NarrationSkipAmountSourceTest {
    @Test
    fun `defaults match the audiobook player's own 10s back, 30s forward - not 15,15`() {
        val state = PlayerManager.UiState()
        assertEquals(DEFAULT_SKIP_BACK, narrationSkipBackSeconds(state))
        assertEquals(DEFAULT_SKIP_FORWARD, narrationSkipForwardSeconds(state))
        assertEquals(10, narrationSkipBackSeconds(state))
        assertEquals(30, narrationSkipForwardSeconds(state))
    }

    @Test
    fun `the narration bar reads whatever the user has configured, not a fixed value`() {
        val state = PlayerManager.UiState(skipBackSeconds = 20, skipForwardSeconds = 45)
        assertEquals(20, narrationSkipBackSeconds(state))
        assertEquals(45, narrationSkipForwardSeconds(state))
    }
}

class FormatNarrationTimeTest {
    @Test
    fun `formats milliseconds as minutes colon seconds`() {
        assertEquals("0:00", formatNarrationTime(0))
        assertEquals("0:09", formatNarrationTime(9_000))
        assertEquals("1:05", formatNarrationTime(65_000))
        assertEquals("12:03", formatNarrationTime(12 * 60_000 + 3_000))
    }

    @Test
    fun `never goes negative`() {
        assertEquals("0:00", formatNarrationTime(-500))
    }
}
