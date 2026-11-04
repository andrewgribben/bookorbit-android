package com.bookorbit.feature.reader

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material3.FilledIconToggleButton
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButtonDefaults
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.stringResource
import com.bookorbit.R

/** Shown only while peeking, toggled on; turning it off switches the reader to normal tracked
 * reading, after which the caller stops showing it. Shared by the EPUB, PDF and comic top bars. */
@Composable
fun PeekToggle(onTurnOff: () -> Unit) {
    FilledIconToggleButton(
        checked = true,
        onCheckedChange = { checked -> if (!checked) onTurnOff() },
        colors = IconButtonDefaults.filledIconToggleButtonColors(
            checkedContainerColor = Color(0x33FFFFFF),
            checkedContentColor = Color.White,
        ),
    ) {
        Icon(Icons.Filled.Visibility, contentDescription = stringResource(R.string.peek))
    }
}
