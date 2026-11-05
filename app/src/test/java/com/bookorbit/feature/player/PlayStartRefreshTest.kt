package com.bookorbit.feature.player

import com.bookorbit.core.model.BookDetail
import com.bookorbit.core.model.ReadAloudProgressSync
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

/** Covers [PlayStartRefresh]'s decisions - whether playback starting should trigger a bounded
 * server check for a newer position, and whether an in-flight check's answer is still safe to
 * apply. [PlayerManager] itself isn't unit-testable (needs a real [androidx.media3.session.MediaController]),
 * so this pure logic is what's covered directly; see [PlayerManager.maybeRefreshOnPlayStart]. */
class PlayStartRefreshTest {

    private fun book(state: String?) = BookDetail(
        id = 1,
        libraryId = 1,
        libraryName = "lib",
        status = "unread",
        addedAt = "2024-01-01",
        readAloudSync = state?.let { ReadAloudProgressSync(state = it) },
    )

    @Test
    fun `refreshes when read-aloud sync is enabled and nothing resolved recently`() {
        assertTrue(
            PlayStartRefresh.shouldRefresh(
                book = book("enabled"),
                narrationActive = false,
                lastResolvedAtMs = 0L,
                nowMs = 100_000L,
            ),
        )
    }

    @Test
    fun `does not refresh when read-aloud sync is disabled`() {
        assertFalse(
            PlayStartRefresh.shouldRefresh(
                book = book("disabled"),
                narrationActive = false,
                lastResolvedAtMs = 0L,
                nowMs = 100_000L,
            ),
        )
    }

    @Test
    fun `does not refresh when read-aloud sync is unavailable`() {
        assertFalse(
            PlayStartRefresh.shouldRefresh(
                book = book("unavailable"),
                narrationActive = false,
                lastResolvedAtMs = 0L,
                nowMs = 100_000L,
            ),
        )
    }

    @Test
    fun `does not refresh when the book has no read-aloud sync info at all`() {
        assertFalse(
            PlayStartRefresh.shouldRefresh(
                book = book(null),
                narrationActive = false,
                lastResolvedAtMs = 0L,
                nowMs = 100_000L,
            ),
        )
    }

    @Test
    fun `does not refresh with no current book`() {
        assertFalse(
            PlayStartRefresh.shouldRefresh(
                book = null,
                narrationActive = false,
                lastResolvedAtMs = 0L,
                nowMs = 100_000L,
            ),
        )
    }

    @Test
    fun `does not refresh while narration is active`() {
        assertFalse(
            PlayStartRefresh.shouldRefresh(
                book = book("enabled"),
                narrationActive = true,
                lastResolvedAtMs = 0L,
                nowMs = 100_000L,
            ),
        )
    }

    @Test
    fun `does not refresh right after a load already resolved a fresh position`() {
        assertFalse(
            PlayStartRefresh.shouldRefresh(
                book = book("enabled"),
                narrationActive = false,
                lastResolvedAtMs = 95_000L,
                nowMs = 100_000L, // 5s ago, within the 10s window
            ),
        )
    }

    @Test
    fun `refreshes again once the recent-resolve window has passed`() {
        assertTrue(
            PlayStartRefresh.shouldRefresh(
                book = book("enabled"),
                narrationActive = false,
                lastResolvedAtMs = 80_000L,
                nowMs = 100_000L, // 20s ago, outside the 10s window
            ),
        )
    }

    @Test
    fun `an answer is still applicable when nothing moved since the refresh started`() {
        assertTrue(PlayStartRefresh.stillApplicable(1, 1, 2, 2))
    }

    @Test
    fun `an answer is dropped if the queue changed since the refresh started`() {
        assertFalse(PlayStartRefresh.stillApplicable(1, 2, 2, 2))
    }

    @Test
    fun `an answer is dropped if the user seeked since the refresh started`() {
        assertFalse(PlayStartRefresh.stillApplicable(1, 1, 2, 3))
    }
}
