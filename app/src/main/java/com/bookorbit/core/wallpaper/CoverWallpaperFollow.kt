package com.bookorbit.core.wallpaper

/**
 * Pure decision for the "follow current book" wallpaper setting: whether the
 * noted book should be (re-)applied as the wallpaper. Extracted so the rule
 * is unit-testable without Android, [AppSettingsStore][com.bookorbit.core.settings.AppSettingsStore]
 * or lifecycle plumbing.
 */
object CoverWallpaperFollow {
    /**
     * Only a change of noted book re-applies: a cover set by hand (or by an
     * earlier follow) stays until a different book is opened. Off, or no book
     * noted yet, never applies.
     */
    fun shouldApply(followEnabled: Boolean, notedBookId: Int?, lastFollowedBookId: Int?): Boolean =
        followEnabled && notedBookId != null && notedBookId != lastFollowedBookId
}
