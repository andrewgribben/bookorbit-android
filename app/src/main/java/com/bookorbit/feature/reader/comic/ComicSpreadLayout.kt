package com.bookorbit.feature.reader.comic

/**
 * Pure page-pairing logic for comic spreads. Ported directly from the web reader's
 * `lib/spread-layout.ts` (`createCbzSpreadLayout`), kept Kotlin-only and dependency-free so it is
 * easy to unit test and reuse from the comic reader's paging/zoom layer.
 *
 * Page indices are 0-based throughout, matching the web source.
 */
enum class ComicSpreadKind { SINGLE, SPREAD }

data class ComicSpread(
    val kind: ComicSpreadKind,
    val anchorPage: Int,
    val pages: List<Int>,
    val singlePage: Int?,
    val leftPage: Int?,
    val rightPage: Int?,
    val hasVirtualBlank: Boolean,
)

/** 1.2, matching the web's `DEFAULT_WIDE_PAGE_RATIO_THRESHOLD`: a page whose width/height ratio
 * is at least this is treated as "wide" (a double-page scan) for [ComicWidePageMode.AUTO]. */
const val DEFAULT_WIDE_PAGE_RATIO_THRESHOLD = 1.2

class ComicSpreadLayout(
    val spreads: List<ComicSpread>,
    private val pageCount: Int,
) {
    private val pageToSpreadIndex: IntArray = IntArray(maxOf(0, pageCount))
    private val anchorToSpreadIndex: Map<Int, Int>

    init {
        val anchorMap = HashMap<Int, Int>()
        spreads.forEachIndexed { spreadIndex, spread ->
            anchorMap[spread.anchorPage] = spreadIndex
            for (page in spread.pages) {
                if (page in pageToSpreadIndex.indices) pageToSpreadIndex[page] = spreadIndex
            }
        }
        anchorToSpreadIndex = anchorMap
    }

    private fun clampPage(pageIndex: Int): Int = when {
        pageCount <= 0 -> 0
        pageIndex < 0 -> 0
        pageIndex >= pageCount -> pageCount - 1
        else -> pageIndex
    }

    fun spreadIndexForPage(pageIndex: Int): Int {
        if (spreads.isEmpty() || pageToSpreadIndex.isEmpty()) return 0
        return pageToSpreadIndex.getOrElse(clampPage(pageIndex)) { 0 }
    }

    fun anchorForPage(pageIndex: Int): Int {
        if (spreads.isEmpty()) return 0
        return spreads.getOrNull(spreadIndexForPage(pageIndex))?.anchorPage ?: 0
    }

    fun spreadForPage(pageIndex: Int): ComicSpread? {
        if (spreads.isEmpty()) return null
        return spreads.getOrNull(spreadIndexForPage(pageIndex))
    }

    fun spreadForAnchor(anchorPage: Int): ComicSpread? {
        if (spreads.isEmpty()) return null
        val index = anchorToSpreadIndex[clampPage(anchorPage)] ?: return spreadForPage(anchorPage)
        return spreads.getOrNull(index)
    }

    fun nextAnchor(anchorPage: Int): Int {
        if (spreads.isEmpty()) return 0
        val spread = spreadForAnchor(anchorPage) ?: return 0
        val currentIndex = anchorToSpreadIndex[spread.anchorPage] ?: 0
        val next = spreads.getOrNull((currentIndex + 1).coerceAtMost(spreads.size - 1))
        return next?.anchorPage ?: spread.anchorPage
    }

    fun prevAnchor(anchorPage: Int): Int {
        if (spreads.isEmpty()) return 0
        val spread = spreadForAnchor(anchorPage) ?: return 0
        val currentIndex = anchorToSpreadIndex[spread.anchorPage] ?: 0
        val prev = spreads.getOrNull((currentIndex - 1).coerceAtLeast(0))
        return prev?.anchorPage ?: spread.anchorPage
    }
}

/**
 * [isTwoPageEffective]: owner decision / PLAN.md - two-page spreads apply only in Paged mode, and
 * default on for the Fold (unfolded) or landscape, via [effectiveTwoPage] below.
 */
fun buildComicSpreads(
    pageCount: Int,
    isTwoPageEffective: Boolean,
    direction: ComicDirection,
    spreadAlignment: ComicSpreadAlignment,
    widePageSingletonMode: ComicWidePageMode,
    isWidePage: (Int) -> Boolean = { false },
): List<ComicSpread> {
    if (pageCount <= 0) return emptyList()

    fun single(page: Int) = ComicSpread(
        kind = ComicSpreadKind.SINGLE,
        anchorPage = page,
        pages = listOf(page),
        singlePage = page,
        leftPage = null,
        rightPage = null,
        hasVirtualBlank = false,
    )

    fun spread(first: Int, second: Int?, hasVirtualBlank: Boolean) = ComicSpread(
        kind = ComicSpreadKind.SPREAD,
        anchorPage = first,
        pages = if (second == null) listOf(first) else listOf(first, second),
        singlePage = null,
        leftPage = if (direction == ComicDirection.LTR) first else second,
        rightPage = if (direction == ComicDirection.LTR) second else first,
        hasVirtualBlank = hasVirtualBlank,
    )

    if (!isTwoPageEffective) {
        return (0 until pageCount).map(::single)
    }

    val spreads = mutableListOf<ComicSpread>()
    // Cover is always shown alone.
    spreads += single(0)
    var cursor = 1

    // Shifted alignment inserts a singleton after the cover, then resumes pairing.
    if (spreadAlignment == ComicSpreadAlignment.SHIFTED && cursor < pageCount) {
        spreads += single(cursor)
        cursor += 1
    }

    while (cursor < pageCount) {
        val first = cursor
        val second = cursor + 1

        if (widePageSingletonMode == ComicWidePageMode.AUTO && isWidePage(first)) {
            spreads += single(first)
            cursor += 1
            continue
        }

        if (second >= pageCount) {
            spreads += spread(first, null, true)
            cursor += 1
            continue
        }

        if (widePageSingletonMode == ComicWidePageMode.AUTO && isWidePage(second)) {
            spreads += spread(first, null, true)
            cursor += 1
            continue
        }

        spreads += spread(first, second, false)
        cursor += 2
    }

    return spreads
}

fun comicSpreadLayout(
    pageCount: Int,
    isTwoPageEffective: Boolean,
    direction: ComicDirection,
    spreadAlignment: ComicSpreadAlignment,
    widePageSingletonMode: ComicWidePageMode,
    isWidePage: (Int) -> Boolean = { false },
): ComicSpreadLayout = ComicSpreadLayout(
    buildComicSpreads(pageCount, isTwoPageEffective, direction, spreadAlignment, widePageSingletonMode, isWidePage),
    pageCount,
)

/** The 900dp breakpoint from the web (`TWO_PAGE_BREAKPOINT`): true when the Fold is unfolded or
 * the device is in landscape at or above it. Only applies in Paged mode (PLAN.md, "Two-page
 * applies to paged mode only"); callers must additionally check [ComicReaderSettings.scrollMode]. */
const val TWO_PAGE_BREAKPOINT_DP = 900

fun effectiveTwoPage(
    settings: ComicReaderSettings,
    widthDp: Int,
): Boolean {
    if (settings.scrollMode != ComicScrollMode.PAGINATED) return false
    if (settings.forceTwoPage) return true
    if (settings.viewMode == ComicViewMode.TWO_PAGE) return true
    return widthDp >= TWO_PAGE_BREAKPOINT_DP
}

/** A page is "wide" (likely a double-page scan) when its aspect ratio is at least
 * [DEFAULT_WIDE_PAGE_RATIO_THRESHOLD], matching the web's heuristic. */
fun isWidePageAspect(widthPx: Int, heightPx: Int): Boolean {
    if (heightPx <= 0) return false
    return widthPx.toDouble() / heightPx.toDouble() >= DEFAULT_WIDE_PAGE_RATIO_THRESHOLD
}

/**
 * Chrome label formatting (task 1, PLAN.md "Chrome"): a 1-based page number, or a page RANGE
 * for a two-page spread (e.g. "12-13"), with no total attached - used for the top bar's
 * "Page 12 of 48" subtitle. [pages] is a spread's 0-based page list (1 or 2 entries); callers
 * pass a single-element list for infinite/no-gaps mode, where there is no spread.
 */
fun comicPageRangeLabel(pages: List<Int>): String {
    if (pages.isEmpty()) return "1"
    val lo = pages.min() + 1
    val hi = pages.max() + 1
    return if (lo == hi) "$lo" else "$lo-$hi"
}

/** The bottom bar's "12 / 48" (or "12-13 / 48" for a spread) counter text. */
fun comicPageCounterLabel(pages: List<Int>, pageCount: Int): String = "${comicPageRangeLabel(pages)} / $pageCount"
