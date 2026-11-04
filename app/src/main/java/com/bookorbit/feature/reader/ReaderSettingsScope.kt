package com.bookorbit.feature.reader

/**
 * Stage 3: Global vs This-book settings scope, per-book inheritance and the saved/built-in
 * default tiers. Kept pure and separate from [ReaderSettings]/[ReaderSettingsStore] so the
 * resolution rules can be unit tested without DataStore or Android.
 *
 * Storage (device only, not synced to the server - see ReaderSettingsStore):
 * - Global current settings and Global saved default live under existing/new DataStore keys.
 * - Per book: [BookSettingsState] (the "Use global settings" master switch + the book's own
 *   override snapshot, which is NOT cleared when the switch is turned back on) and a separate
 *   per-book saved default.
 *
 * Save/Reset/Restore (owner decision) cover style settings only - the whole [ReaderSettings]
 * object - never [ReaderSettings]-unrelated playback/audio settings, which live elsewhere.
 */
enum class ReaderSettingsScope {
    GLOBAL,
    THIS_BOOK,
}

/**
 * A book's own inheritance state. [useGlobal] is the single master switch from the approved
 * design (no per-field granularity): true means the book silently follows Global, false means it
 * has its own complete [ReaderSettings] snapshot in [override].
 *
 * [override] can be non-null even while [useGlobal] is true: turning the switch back on does not
 * delete the book's own snapshot, so turning it off again later restores the book's previous
 * customisation instead of re-initialising from Global every time.
 */
data class BookSettingsState(
    val useGlobal: Boolean = true,
    val override: ReaderSettings? = null,
)

/**
 * Effective settings actually applied to the reader (styles, theme background, chrome colours):
 * the book's own snapshot if it has one and isn't following Global, otherwise Global.
 */
fun effectiveSettings(global: ReaderSettings, book: BookSettingsState): ReaderSettings =
    if (!book.useGlobal && book.override != null) book.override else global

/**
 * Applies a "Use global settings" toggle. Turning it off initialises the book's own snapshot from
 * [currentGlobal] only the first time (i.e. only when the book has never had an override before);
 * an existing override is preserved so flipping the switch off/on/off again does not discard
 * customisation. Turning it on never clears [BookSettingsState.override].
 */
fun BookSettingsState.withUseGlobal(useGlobal: Boolean, currentGlobal: ReaderSettings): BookSettingsState =
    if (useGlobal) copy(useGlobal = true) else copy(useGlobal = false, override = override ?: currentGlobal)

/**
 * Reset-to-saved-default fallback chain (requirement 4): a book with no saved default of its own
 * falls back to the saved Global default, and if neither exists, to the built-in default
 * ([ReaderSettings]'s own defaults).
 */
fun resolvedSavedDefault(
    scope: ReaderSettingsScope,
    savedGlobalDefault: ReaderSettings?,
    savedBookDefault: ReaderSettings?,
): ReaderSettings = when (scope) {
    ReaderSettingsScope.GLOBAL -> savedGlobalDefault ?: ReaderSettings()
    ReaderSettingsScope.THIS_BOOK -> savedBookDefault ?: savedGlobalDefault ?: ReaderSettings()
}
