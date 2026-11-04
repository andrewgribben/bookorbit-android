package com.bookorbit.feature.reader.comic

import com.bookorbit.feature.reader.ReaderSettingsScope

/**
 * Global vs This-book scope for [ComicReaderSettings], mirroring
 * `com.bookorbit.feature.reader.ReaderSettingsScope`'s resolution rules for the ebook reader
 * (same semantics, kept as a parallel pure file rather than a shared generic so each reader's
 * settings type stays concrete and the ebook reader is never touched by comic changes).
 */
data class ComicBookSettingsState(
    val useGlobal: Boolean = true,
    val override: ComicReaderSettings? = null,
)

fun effectiveComicSettings(global: ComicReaderSettings, book: ComicBookSettingsState): ComicReaderSettings =
    if (!book.useGlobal && book.override != null) book.override else global

fun ComicBookSettingsState.withUseGlobal(useGlobal: Boolean, currentGlobal: ComicReaderSettings): ComicBookSettingsState =
    if (useGlobal) copy(useGlobal = true) else copy(useGlobal = false, override = override ?: currentGlobal)

fun resolvedComicSavedDefault(
    scope: ReaderSettingsScope,
    savedGlobalDefault: ComicReaderSettings?,
    savedBookDefault: ComicReaderSettings?,
): ComicReaderSettings = when (scope) {
    ReaderSettingsScope.GLOBAL -> savedGlobalDefault ?: ComicReaderSettings()
    ReaderSettingsScope.THIS_BOOK -> savedBookDefault ?: savedGlobalDefault ?: ComicReaderSettings()
}
