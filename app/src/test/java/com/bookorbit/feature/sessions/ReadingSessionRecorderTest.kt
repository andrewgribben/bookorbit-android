package com.bookorbit.feature.sessions

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

class ReadingSessionRecorderTest {
    private val gap = 120_000L

    private fun recorder() = ReadingSessionRecorder(maxGapMs = gap)

    @Test
    fun `accrues time between progress events`() {
        val r = recorder()
        r.begin("read:1", 1, SessionType.READ, 10.0, nowMs = 0)
        r.progress(12.0, nowMs = 30_000)
        r.progress(15.0, nowMs = 90_000)
        val snap = r.end(nowMs = 90_000)!!
        assertEquals(90, snap.durationSeconds)
        assertEquals(5.0, snap.progressDelta!!, 1e-9)
        assertEquals(15.0, snap.endProgress!!, 1e-9)
    }

    @Test
    fun `a long gap is capped so idle time is not counted`() {
        val r = recorder()
        r.begin("read:1", 1, SessionType.READ, 0.0, nowMs = 0)
        r.progress(1.0, nowMs = 60 * 60_000L) // an hour with no page turn
        val snap = r.end(nowMs = 60 * 60_000L)!!
        assertEquals(120, snap.durationSeconds)
    }

    @Test
    fun `inactive time does not accrue`() {
        val r = recorder()
        r.begin("read:1", 1, SessionType.READ, 0.0, nowMs = 0)
        r.setActive(false, nowMs = 20_000) // backgrounded after 20s
        r.setActive(true, nowMs = 500_000) // back much later
        r.progress(5.0, nowMs = 510_000)
        val snap = r.end(nowMs = 510_000)!!
        assertEquals(30, snap.durationSeconds)
    }

    @Test
    fun `snapshot is repeatable and keeps the same session id`() {
        val r = recorder()
        r.begin("read:1", 1, SessionType.READ, 0.0, nowMs = 0, sessionId = "abc")
        val first = r.snapshot(nowMs = 40_000)!!
        r.progress(8.0, nowMs = 60_000)
        val second = r.snapshot(nowMs = 60_000)!!
        assertEquals("abc", first.sessionId)
        assertEquals("abc", second.sessionId)
        assertEquals(40, first.durationSeconds)
        assertEquals(60, second.durationSeconds)
        assertTrue(second.endedAtMs > first.endedAtMs)
    }

    @Test
    fun `end closes the session`() {
        val r = recorder()
        r.begin("listen:2", 9, SessionType.LISTEN, null, nowMs = 0)
        assertTrue(r.isOpen)
        assertNotNull(r.end(nowMs = 1_000))
        assertFalse(r.isOpen)
        assertNull(r.snapshot(nowMs = 2_000))
        assertNull(r.end(nowMs = 3_000))
    }

    @Test
    fun `progress delta is null when the start position is unknown`() {
        val r = recorder()
        r.begin("read:1", 1, SessionType.READ, null, nowMs = 0)
        r.progress(40.0, nowMs = 10_000)
        val snap = r.end(nowMs = 10_000)!!
        assertNull(snap.progressDelta)
        assertEquals(40.0, snap.endProgress!!, 1e-9)
    }

    @Test
    fun `progress is clamped to 0-100`() {
        val r = recorder()
        r.begin("read:1", 1, SessionType.READ, 99.0, nowMs = 0)
        r.progress(120.0, nowMs = 1_000)
        assertEquals(100.0, r.snapshot(1_000)!!.endProgress!!, 1e-9)
    }

    @Test
    fun `inactiveForMs reports time since pause and resets on resume`() {
        val r = recorder()
        r.begin("listen:2", 9, SessionType.LISTEN, 0.0, nowMs = 0)
        assertEquals(0, r.inactiveForMs(5_000))
        r.setActive(false, nowMs = 10_000)
        assertEquals(40_000, r.inactiveForMs(50_000))
        r.setActive(true, nowMs = 60_000)
        assertEquals(0, r.inactiveForMs(70_000))
    }

    // --- reading session-gap rule (readwise-session-timing plan, stage 4) ---

    private val readingIdleCloseMs = 10 * 60_000L
    private val readingIdlePauseMs = 5 * 60_000L

    @Test
    fun `a short background gap resumes the same session without counting the gap`() {
        val r = recorder()
        r.begin("read:1", 1, SessionType.READ, 0.0, nowMs = 0, sessionId = "s1")
        r.progress(1.0, nowMs = 5_000) // 5s of real activity
        r.setActive(false, nowMs = 5_000) // backgrounded
        val resumeAt = 5_000 + 4 * 60_000L // 4 minutes later: under the 10-minute close threshold
        assertFalse(r.inactiveForMs(resumeAt) > readingIdleCloseMs)
        r.setActive(true, nowMs = resumeAt)
        r.progress(2.0, nowMs = resumeAt + 1_000)
        val snap = r.end(nowMs = resumeAt + 1_000)!!
        assertEquals("s1", snap.sessionId)
        assertEquals(6, snap.durationSeconds) // 5s + 1s; the 4-minute gap is not counted
    }

    @Test
    fun `a long gap closes the session at the last activity timestamp`() {
        val r = recorder()
        r.begin("read:1", 1, SessionType.READ, 0.0, nowMs = 0, sessionId = "s1")
        r.progress(1.0, nowMs = 10_000) // last real activity at 10s
        r.setActive(false, nowMs = 10_000) // backgrounded right after

        val resumeAt = 10_000 + 20 * 60_000L // 20 minutes later: over the 10-minute close threshold
        val gap = r.inactiveForMs(resumeAt)
        assertTrue(gap > readingIdleCloseMs)

        // Mirrors ReadingSessionTracker.endReadingLocked: end at the true last-activity moment,
        // not at the current wall clock, so the idle gap is never counted and endedAt is right.
        val endAt = resumeAt - gap
        assertEquals(10_000L, endAt)
        val snap = r.end(nowMs = endAt)!!
        assertEquals("s1", snap.sessionId)
        assertEquals(10, snap.durationSeconds)
        assertEquals(10_000L, snap.endedAtMs)

        // The next reading signal starts a brand-new session.
        r.begin("read:1", 1, SessionType.READ, 1.0, nowMs = resumeAt, sessionId = "s2")
        val next = r.snapshot(nowMs = resumeAt)!!
        assertEquals("s2", next.sessionId)
        assertEquals(resumeAt, next.startedAtMs)
    }

    @Test
    fun `5 minutes idle while foregrounded pauses without closing the session`() {
        val r = recorder()
        r.begin("read:1", 1, SessionType.READ, 0.0, nowMs = 0, sessionId = "s1")
        r.progress(1.0, nowMs = 10_000) // last page turn at 10s, still accrued=10s

        val idleCheckAt = 10_000 + 6 * 60_000L // 6 minutes with no page turn, still foregrounded
        val justPaused = r.pauseIfIdle(idleCheckAt, idleMs = readingIdlePauseMs)
        assertTrue(justPaused)
        assertEquals(6 * 60_000L, r.inactiveForMs(idleCheckAt))
        // Under the 10-minute close threshold, so the session stays open (not ended).
        assertFalse(r.inactiveForMs(idleCheckAt) > readingIdleCloseMs)

        // The next page turn resumes the same session without counting the idle gap, and
        // further activity after that accrues normally.
        r.progress(2.0, nowMs = idleCheckAt + 5_000)
        r.progress(3.0, nowMs = idleCheckAt + 10_000)
        val snap = r.end(nowMs = idleCheckAt + 10_000)!!
        assertEquals("s1", snap.sessionId)
        assertEquals(15, snap.durationSeconds) // 10s + 5s; the 6-minute idle gap is not counted
    }

    @Test
    fun `pauseIfIdle is a no-op when not idle long enough or already paused`() {
        val r = recorder()
        r.begin("read:1", 1, SessionType.READ, 0.0, nowMs = 0)
        r.progress(1.0, nowMs = 10_000)
        assertFalse(r.pauseIfIdle(nowMs = 10_000 + 60_000L, idleMs = readingIdlePauseMs))

        r.setActive(false, nowMs = 10_000)
        assertFalse(r.pauseIfIdle(nowMs = 10_000 + 60_000L, idleMs = readingIdlePauseMs))
    }
}
