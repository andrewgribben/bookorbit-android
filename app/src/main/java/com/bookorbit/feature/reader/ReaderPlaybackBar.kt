package com.bookorbit.feature.reader

import com.bookorbit.R
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Bedtime
import androidx.compose.material.icons.filled.FastForward
import androidx.compose.material.icons.filled.Pause
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material.icons.filled.Replay
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.Slider
import androidx.compose.material3.SliderDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import com.bookorbit.feature.player.PlayerManager
import com.bookorbit.feature.player.speedLabel

/**
 * What the reader's bottom bar shows (stage 4). Narration on swaps the ordinary reading-progress
 * row for the narration player's transport controls; narration off leaves the progress row as it
 * was before this stage. Extracted as a pure decision so it is covered without Compose/Android -
 * see [ReaderBottomBarContentTest].
 */
enum class ReaderBottomBarContent { PROGRESS, NARRATION_PLAYER }

/** Narration off: chapter + percentage line and a scrubber that jumps on release (approved mockup). */
@Composable
fun ReadingProgressBar(chapterTitle: String?, percentage: Int, onSeek: (Float) -> Unit, modifier: Modifier = Modifier) {
    var dragging by remember { mutableStateOf<Float?>(null) }
    val shown = dragging ?: (percentage / 100f)
    val description = stringResource(R.string.reading_position)
    Column(modifier = modifier.fillMaxWidth().padding(horizontal = 16.dp)) {
        Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.fillMaxWidth()) {
            Text(
                chapterTitle.orEmpty(),
                color = Color.White.copy(alpha = 0.85f),
                maxLines = 1,
                overflow = TextOverflow.Ellipsis,
                modifier = Modifier.weight(1f),
            )
            Text("${(shown * 100).toInt()}%", color = Color.White.copy(alpha = 0.8f), modifier = Modifier.padding(start = 8.dp))
        }
        Slider(
            value = shown.coerceIn(0f, 1f),
            onValueChange = { dragging = it },
            onValueChangeFinished = { dragging?.let(onSeek); dragging = null },
            colors = SliderDefaults.colors(thumbColor = Color.White, activeTrackColor = Color.White, inactiveTrackColor = Color.White.copy(alpha = 0.3f)),
            modifier = Modifier.fillMaxWidth().semantics { contentDescription = description },
        )
    }
}

fun readerBottomBarContent(narrationOn: Boolean): ReaderBottomBarContent =
    if (narrationOn) ReaderBottomBarContent.NARRATION_PLAYER else ReaderBottomBarContent.PROGRESS

/**
 * The narration player's skip-back/forward amounts come from the audiobook player's own
 * configurable [PlayerManager.UiState] fields (backed by `AudioSettings.kt`, default 10s back /
 * 30s forward) - never a fixed 15/15. Kept as tiny pure accessors so that source is covered by a
 * unit test rather than only visible in a screenshot.
 */
fun narrationSkipBackSeconds(state: PlayerManager.UiState): Int = state.skipBackSeconds
fun narrationSkipForwardSeconds(state: PlayerManager.UiState): Int = state.skipForwardSeconds

/**
 * Narration player controls shown in the reader's bottom bar while narration is on (requirement
 * 1 of the stage-4 card): a compact chapter/time line, a thin progress line, then skip-back,
 * play/pause, skip-forward, speed and sleep-timer. All wired to the same shared [PlayerManager]
 * the standalone audiobook player uses (see [ReaderViewModel]'s thin passthrough methods), so
 * speed/sleep open the exact same [com.bookorbit.feature.player.SpeedSheet] and
 * [com.bookorbit.feature.player.SleepTimerSheet] the audiobook player does.
 *
 * [progressFraction] is the EPUB's own reading-position fraction (0..1): narration never loads a
 * server audiobook (see [PlayerManager.UiState.narrationActive]), so there is no aggregate
 * book/file duration to drive a real playback progress line from - this is a deliberate deviation
 * from the mockup's audiobook-style scrubber, recorded in design-notes.md (Owner decisions).
 */
@Composable
fun NarrationPlayerBar(
    state: () -> PlayerManager.UiState,
    chapterTitle: String?,
    progressFraction: Float,
    onTogglePlay: () -> Unit,
    onSkipBack: () -> Unit,
    onSkipForward: () -> Unit,
    onOpenSpeed: () -> Unit,
    onOpenSleepTimer: () -> Unit,
    modifier: Modifier = Modifier,
) {
    val state = state()
    val skipBack = narrationSkipBackSeconds(state)
    val skipForward = narrationSkipForwardSeconds(state)
    val timerActive = state.sleepTimerRemainingSec != null

    Column(modifier = modifier.fillMaxWidth().padding(horizontal = 12.dp, vertical = 4.dp)) {
        Text(
            chapterTitle?.let { stringResource(R.string.narration_player_position, it, formatNarrationTime(state.narrationPositionMs)) }
                ?: formatNarrationTime(state.narrationPositionMs),
            color = Color.White.copy(alpha = 0.85f),
            maxLines = 1,
            overflow = TextOverflow.Ellipsis,
            modifier = Modifier.fillMaxWidth(),
        )
        LinearProgressIndicator(
            progress = { progressFraction.coerceIn(0f, 1f) },
            modifier = Modifier
                .fillMaxWidth()
                .padding(top = 6.dp, bottom = 2.dp)
                .height(3.dp)
                .clip(RoundedCornerShape(2.dp)),
        )
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceEvenly,
            verticalAlignment = Alignment.CenterVertically,
        ) {
            SkipButton(
                icon = Icons.Filled.Replay,
                seconds = skipBack,
                contentDescription = stringResource(R.string.narration_player_skip_back, skipBack),
                onClick = onSkipBack,
            )
            Box(
                modifier = Modifier
                    .size(48.dp)
                    .clip(RoundedCornerShape(24.dp))
                    .background(Color.White.copy(alpha = 0.15f)),
                contentAlignment = Alignment.Center,
            ) {
                if (state.buffering) {
                    CircularProgressIndicator(color = Color.White, modifier = Modifier.size(20.dp))
                } else {
                    IconButton(onClick = onTogglePlay) {
                        Icon(
                            if (state.isPlaying) Icons.Filled.Pause else Icons.Filled.PlayArrow,
                            contentDescription = stringResource(if (state.isPlaying) R.string.player_pause else R.string.player_play),
                            tint = Color.White,
                        )
                    }
                }
            }
            SkipButton(
                icon = Icons.Filled.FastForward,
                seconds = skipForward,
                contentDescription = stringResource(R.string.narration_player_skip_forward, skipForward),
                onClick = onSkipForward,
            )
            IconButton(onClick = onOpenSpeed, modifier = Modifier.size(48.dp)) {
                Text(speedLabel(state.speed), color = Color.White)
            }
            IconButton(onClick = onOpenSleepTimer, modifier = Modifier.size(48.dp)) {
                Icon(
                    Icons.Filled.Bedtime,
                    contentDescription = stringResource(if (timerActive) R.string.player_sleep_timer_active else R.string.sleep_timer),
                    tint = if (timerActive) Color(0xFFFFCC00) else Color.White,
                )
            }
        }
    }
}

@Composable
private fun SkipButton(icon: androidx.compose.ui.graphics.vector.ImageVector, seconds: Int, contentDescription: String, onClick: () -> Unit) {
    IconButton(onClick = onClick, modifier = Modifier.size(48.dp)) {
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Icon(icon, contentDescription = contentDescription, tint = Color.White, modifier = Modifier.size(20.dp))
            Text(stringResource(R.string.rs_seconds_value, seconds), color = Color.White, style = androidx.compose.material3.MaterialTheme.typography.labelSmall)
        }
    }
}

/** mm:ss for the current narration audio file position - there is no aggregate book duration to
 * show a "/ total" suffix for (see [NarrationPlayerBar] doc). */
internal fun formatNarrationTime(positionMs: Long): String {
    val totalSec = (positionMs / 1000).coerceAtLeast(0)
    val m = totalSec / 60
    val s = totalSec % 60
    return "%d:%02d".format(m, s)
}
