package com.bookorbit.feature.player

import org.junit.Assert.assertEquals
import org.junit.Test

class AudioSettingsTest {
    @Test
    fun `parse maps stored names and defaults to BOOK`() {
        assertEquals(ProgressBarMode.BOOK, ProgressBarMode.parse("BOOK"))
        assertEquals(ProgressBarMode.CHAPTER, ProgressBarMode.parse("CHAPTER"))
        assertEquals(ProgressBarMode.BOOK, ProgressBarMode.parse(null))
        assertEquals(ProgressBarMode.BOOK, ProgressBarMode.parse("garbage"))
    }

    @Test
    fun `media buttons default to chapters and parse stored names`() {
        assertEquals(MediaButtonMode.CHAPTER, AudioSettings().mediaButtonMode)
        assertEquals(MediaButtonMode.SKIP, MediaButtonMode.parse("SKIP"))
        assertEquals(MediaButtonMode.CHAPTER, MediaButtonMode.parse(null))
        assertEquals(MediaButtonMode.CHAPTER, MediaButtonMode.parse("garbage"))
    }

    @Test
    fun `AudioSettings defaults to whole-book progress`() {
        assertEquals(ProgressBarMode.BOOK, AudioSettings().progressBarMode)
    }
}
