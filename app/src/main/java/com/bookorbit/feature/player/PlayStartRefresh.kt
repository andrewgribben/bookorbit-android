package com.bookorbit.feature.player

import com.bookorbit.core.model.BookDetail

/**
 * Decides whether starting playback should trigger a bounded network check for a newer
 * server position (the EPUB reading-progress -> audiobook mapping can move the server's
 * position ahead of this device's in-memory one while paused - see [PlayerManager]'s
 * play-start listener, which runs for every play source: in-app, notification, lock screen,
 * Bluetooth and Android Auto). Extracted as a pure function so it's unit-testable without a
 * [androidx.media3.session.MediaController].
 */
object PlayStartRefresh {
    /** How long after a load/restore/adopt already resolved a fresh position to skip refreshing again. */
    const val RECENT_RESOLVE_WINDOW_MS = 10_000L

    fun shouldRefresh(
        book: BookDetail?,
        narrationActive: Boolean,
        lastResolvedAtMs: Long,
        nowMs: Long,
    ): Boolean {
        if (narrationActive || book == null) return false
        if (book.readAloudSync?.state != "enabled") return false
        if (nowMs - lastResolvedAtMs < RECENT_RESOLVE_WINDOW_MS) return false
        return true
    }

    /**
     * True when it's still safe to apply a refresh's seek once the network answer arrives:
     * the same book/queue is still loaded ([loadGeneration] unchanged) and the user hasn't
     * seeked since the refresh started ([seekGeneration] unchanged). Either moving on means the
     * user's or a newer load's intent should win over a stale network answer.
     */
    fun stillApplicable(
        loadGenerationAtStart: Int,
        loadGenerationNow: Int,
        seekGenerationAtStart: Int,
        seekGenerationNow: Int,
    ): Boolean = loadGenerationAtStart == loadGenerationNow && seekGenerationAtStart == seekGenerationNow
}
