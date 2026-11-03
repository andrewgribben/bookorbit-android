package com.bookorbit.core.wallpaper

import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

/** The "follow current book" decision: whether the noted book should be (re-)applied. */
class CoverWallpaperFollowTest {
    @Test
    fun `off never applies`() {
        assertFalse(CoverWallpaperFollow.shouldApply(followEnabled = false, notedBookId = 1, lastFollowedBookId = null))
        assertFalse(CoverWallpaperFollow.shouldApply(followEnabled = false, notedBookId = 1, lastFollowedBookId = 2))
    }

    @Test
    fun `no noted book never applies`() {
        assertFalse(CoverWallpaperFollow.shouldApply(followEnabled = true, notedBookId = null, lastFollowedBookId = null))
    }

    @Test
    fun `first noted book applies when nothing followed yet`() {
        assertTrue(CoverWallpaperFollow.shouldApply(followEnabled = true, notedBookId = 1, lastFollowedBookId = null))
    }

    @Test
    fun `a different book than last followed applies`() {
        assertTrue(CoverWallpaperFollow.shouldApply(followEnabled = true, notedBookId = 2, lastFollowedBookId = 1))
    }

    @Test
    fun `the same book as last followed does not re-apply`() {
        // A cover set by hand (or by an earlier follow) stays until a different book is opened.
        assertFalse(CoverWallpaperFollow.shouldApply(followEnabled = true, notedBookId = 1, lastFollowedBookId = 1))
    }
}
