package com.bookorbit.feature.player

import android.content.Context
import android.os.Bundle
import androidx.media3.common.util.UnstableApi
import androidx.media3.session.CommandButton
import androidx.media3.session.SessionCommand
import com.bookorbit.R

/** Car / notification / lock-screen button that steps playback speed through [SPEED_PRESETS]. */
@UnstableApi
object SpeedCommand {
    val command = SessionCommand("com.bookorbit.CYCLE_SPEED", Bundle.EMPTY)

    fun button(context: Context, speed: Float): CommandButton =
        CommandButton.Builder()
            .setSessionCommand(command)
            .setIconResId(R.drawable.ic_speed)
            .setDisplayName(context.getString(R.string.player_speed_button, speedLabel(speed)))
            .build()
}
