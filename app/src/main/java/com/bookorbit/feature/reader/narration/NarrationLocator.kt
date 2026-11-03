package com.bookorbit.feature.reader.narration

/**
 * Pure position -> narration item lookup. Native playback position (which audio file is current,
 * and how far into it) drives the read-along highlight instead of foliate's own HTML Audio element,
 * so seeking, skipping and speed changes from the system transport controls just work: the highlight
 * is always re-derived from wherever Media3 actually is.
 */
object NarrationLocator {
    data class Position(val audioIndex: Int, val positionSec: Double)

    /** Sorts [items] by (audioIndex, beginSec), the order [locate] requires. */
    fun sortForLookup(items: List<NarrationItem>): List<NarrationItem> =
        items.sortedWith(compareBy({ it.audioIndex }, { it.beginSec }))

    /**
     * The item active at [position]: the last item in [sorted] (see [sortForLookup]) whose
     * (audioIndex, beginSec) is at or before [position] and which belongs to the same audio file.
     * Null before that file's first cue, or once [position] has moved to a file with no narration.
     * Binary search over [sorted], O(log n).
     */
    fun locate(sorted: List<NarrationItem>, position: Position): NarrationItem? {
        var lo = 0
        var hi = sorted.size - 1
        var result: NarrationItem? = null
        while (lo <= hi) {
            val mid = (lo + hi) / 2
            val item = sorted[mid]
            val atOrBefore = item.audioIndex < position.audioIndex ||
                (item.audioIndex == position.audioIndex && item.beginSec <= position.positionSec)
            if (atOrBefore) {
                result = item
                lo = mid + 1
            } else {
                hi = mid - 1
            }
        }
        return result?.takeIf { it.audioIndex == position.audioIndex }
    }
}
