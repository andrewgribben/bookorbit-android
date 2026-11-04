package com.bookorbit.app

import android.os.Bundle
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.ui.platform.LocalView
import androidx.core.view.WindowCompat
import androidx.fragment.app.FragmentActivity
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.bookorbit.core.settings.ThemeMode
import com.bookorbit.ui.theme.BookOrbitTheme
import dagger.hilt.android.AndroidEntryPoint

/**
 * FragmentActivity (not the plainer ComponentActivity) because androidx.mediarouter's
 * MediaRouteButton.showDialog() (used by CastButton.kt) hard-requires a FragmentActivity to host its
 * device-picker dialog fragment via getSupportFragmentManager() - on a bare ComponentActivity it
 * throws IllegalStateException on tap, uncaught by CastButton's own setup-time try/catch since that
 * only wraps construction, not the click listener the library installs internally.
 */
@AndroidEntryPoint
class MainActivity : FragmentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        enableEdgeToEdge()
        super.onCreate(savedInstanceState)

        // Volume keys and hardware arrows turn pages while a reader screen is showing (see
        // ReaderKeyBindings). Wrapping the Window.Callback (rather than overriding
        // ComponentActivity.dispatchKeyEvent, which androidx.lint flags as a restricted API not
        // meant to be overridden/called outside the androidx library group) intercepts the event
        // before the usual focus-based dispatch, so it works even if a child view (the ebook
        // reader's WebView, in particular) currently holds focus.
        val originalCallback = window.callback
        window.callback = object : android.view.Window.Callback by originalCallback {
            override fun dispatchKeyEvent(event: android.view.KeyEvent): Boolean {
                if (com.bookorbit.feature.reader.ReaderKeyBindings.dispatch(event)) return true
                return originalCallback.dispatchKeyEvent(event)
            }
        }

        setContent {
            val themeVm: ThemeViewModel = hiltViewModel()
            val mode by themeVm.themeMode.collectAsStateWithLifecycle()
            val dynamicColor by themeVm.dynamicColor.collectAsStateWithLifecycle()
            val darkTheme = when (mode) {
                ThemeMode.SYSTEM -> isSystemInDarkTheme()
                ThemeMode.LIGHT -> false
                ThemeMode.DARK -> true
            }
            // The app's own theme mode can diverge from the system's, so re-derive the status/nav
            // bar icon contrast here rather than relying on enableEdgeToEdge()'s one-time
            // system-driven default. This flips icon appearance only, via WindowInsetsController -
            // it must not re-call enableEdgeToEdge() with an explicit SystemBarStyle, since a
            // transparent (alpha 0) scrim there crashes androidx.mediarouter's MediaRouteButton (the
            // audiobook player's Cast button): MediaRouterThemeHelper contrasts its icon against the
            // window background via ColorUtils.calculateContrast(), which requires alpha == 255.
            val view = LocalView.current
            LaunchedEffect(darkTheme) {
                WindowCompat.getInsetsController(window, view).apply {
                    isAppearanceLightStatusBars = !darkTheme
                    isAppearanceLightNavigationBars = !darkTheme
                }
            }
            BookOrbitTheme(darkTheme = darkTheme, dynamicColor = dynamicColor) {
                BookOrbitApp()
            }
        }
    }
}
