package com.bookorbit.feature.player

import android.os.Bundle
import androidx.media3.common.MediaItem
import androidx.media3.common.MediaMetadata
import androidx.media3.common.Player
import androidx.media3.common.Timeline
import androidx.media3.common.util.UnstableApi
import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import kotlinx.coroutines.flow.MutableStateFlow
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

@UnstableApi
class MediaButtonModeTest {

    /** One 100-minute file at 50 min, with chapters at 0/40/60 min. */
    private fun player(mode: MediaButtonMode): Pair<BookAggregatingPlayer, Player> {
        val extras = mockk<Bundle> {
            every { getDouble(BookAggregatingPlayer.EXTRA_DURATION_SEC) } returns 6000.0
            every { getDoubleArray(BookAggregatingPlayer.EXTRA_CHAPTER_STARTS_SEC) } returns doubleArrayOf(0.0, 2400.0, 3600.0)
            every { getStringArray(BookAggregatingPlayer.EXTRA_CHAPTER_TITLES) } returns arrayOf("A", "B", "C")
        }
        val item = MediaItem.Builder().setMediaId("f1").build().buildUpon()
            .setMediaMetadata(MediaMetadata.Builder().setExtras(extras).build()).build()
        val timeline = mockk<Timeline> {
            every { isEmpty } returns false
            every { windowCount } returns 1
            every { getWindow(0, any()) } answers { secondArg<Timeline.Window>().apply { mediaItem = item } }
        }
        val real = mockk<Player>(relaxed = true) {
            every { currentTimeline } returns timeline
            every { mediaItemCount } returns 1
            every { currentMediaItemIndex } returns 0
            every { currentMediaItem } returns item
            every { currentPosition } returns 3_000_000L
            every { availableCommands } returns Player.Commands.EMPTY
        }
        val settings = AudioSettings(skipBackSeconds = 10, skipForwardSeconds = 30, mediaButtonMode = mode)
        return BookAggregatingPlayer(real, MutableStateFlow(settings)) to real
    }

    @Test
    fun `skip mode turns next and previous into the configured skips`() {
        val (p, real) = player(MediaButtonMode.SKIP)
        p.seekToNext()
        verify { real.seekTo(0, 3_030_000L) }
        p.seekToPrevious()
        verify { real.seekTo(0, 2_990_000L) }
        // These gate COMMAND_SEEK_TO_NEXT/PREVIOUS (Player.Commands itself needs a real Android runtime).
        assertTrue(p.hasNextMediaItem())
        assertTrue(p.hasPreviousMediaItem())
    }

    @Test
    fun `chapter mode keeps next and previous on chapters`() {
        val (p, real) = player(MediaButtonMode.CHAPTER)
        p.seekToNext()
        verify { real.seekTo(0, 3_600_000L) }
        verify(exactly = 0) { real.seekTo(0, 3_030_000L) }
    }

    @Test
    fun `skip mode offers nothing for an empty queue`() {
        val (p, real) = player(MediaButtonMode.SKIP)
        every { real.mediaItemCount } returns 0
        every { real.currentTimeline } returns Timeline.EMPTY
        every { real.currentMediaItem } returns null
        assertFalse(p.hasNextMediaItem())
    }
}
