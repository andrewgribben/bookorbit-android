package com.bookorbit.feature.player

/**
 * Narration state a real audiobook queue ([PlayerManager.applyQueue], reached from both
 * [PlayerManager.loadAndPlay] and [PlayerManager.restoreLastBook]) or an externally-adopted queue
 * ([PlayerManager.adoptExternalQueue], Android Auto) must leave behind when it takes over the
 * shared player. Without this, a real audiobook started right after narration would keep
 * [PlayerManager.UiState.narrationActive] set, and [PlayerManager.report] / the playing-state
 * listener would keep treating playback as narration (no server progress, no listening session)
 * even though a real audiobook is now loaded. Extracted as a pure function - [PlayerManager]
 * itself needs a real Android context and Media3 controller to construct, so this is what QA can
 * unit test directly.
 */
fun PlayerManager.UiState.withNarrationCleared(): PlayerManager.UiState =
    copy(narrationActive = false, narrationMediaIndex = 0, narrationPositionMs = 0L)
