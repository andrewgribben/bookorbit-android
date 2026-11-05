package com.bookorbit.feature.reader

/**
 * Pure decision for the "Continue from another device?" prompt - ported from the web reader's
 * `useReaderProgress.checkForNewerPosition` (shared/composables/useReaderProgress.ts). Kept free
 * of any VM/network wiring so the branches are unit-testable directly.
 *
 * Mirrors web exactly:
 *  - a save that is still pending (or in flight) speaks for this reader's own position, so no
 *    check is made at all;
 *  - a server stamp no newer than what this reader already knows about is not "newer";
 *  - a newer stamp that landed on the *same* CFI this reader is already at is not offered either -
 *    it is simply this reader's own write (or another device agreeing with it) catching up, so the
 *    stamp is adopted as known without surfacing anything;
 *  - otherwise the server really did move since this reader last read or wrote the row, and the
 *    caller should offer it.
 */
sealed interface NewerPositionDecision {
    /** Nothing to do: either a save is pending, or the server has nothing newer than known. */
    data object NoOffer : NewerPositionDecision

    /** Same CFI as already known/current - adopt the stamp silently, do not show the dialog. */
    data class AdoptStampOnly(val stampMs: Long) : NewerPositionDecision

    /** The server moved to a different position since this reader last knew about it - offer it. */
    data class Offer(val cfi: String?, val fraction: Double?, val percentage: Double, val stampMs: Long) : NewerPositionDecision
}

/**
 * @param pendingSaveQueued true while this reader has an unsent (or in-flight) write of its own -
 *   it is about to speak for the position itself, so asking would be premature (and could race).
 * @param knownServerStampMs the newest server write (ms since epoch) this reader has read or made.
 * @param serverStampMs the just-fetched server row's write time (ms since epoch).
 * @param serverCfi / serverFraction / serverPercentage the just-fetched server row's position.
 * @param currentCfi where this reader is now.
 */
fun decideNewerPosition(
    pendingSaveQueued: Boolean,
    knownServerStampMs: Long,
    serverStampMs: Long,
    serverCfi: String?,
    serverFraction: Double?,
    serverPercentage: Double,
    currentCfi: String?,
): NewerPositionDecision {
    if (pendingSaveQueued) return NewerPositionDecision.NoOffer
    if (serverStampMs <= knownServerStampMs) return NewerPositionDecision.NoOffer
    if (serverCfi == currentCfi) return NewerPositionDecision.AdoptStampOnly(serverStampMs)
    return NewerPositionDecision.Offer(serverCfi, serverFraction, serverPercentage, serverStampMs)
}
