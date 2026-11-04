package com.bookorbit.app

import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.dropUnlessResumed
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.bookorbit.core.model.AuthUser
import com.bookorbit.core.model.BookFiles
import com.bookorbit.feature.bookdetail.BookDetailScreen
import com.bookorbit.feature.main.MainShell
import com.bookorbit.feature.player.PlayerScreen
import com.bookorbit.feature.player.PlayerViewModel
import com.bookorbit.feature.reader.ReaderDestination
import com.bookorbit.feature.reader.ReaderKind

/**
 * App-level navigation host for the signed-in area. Holds full-screen destinations that sit OUTSIDE
 * the bottom-bar shell: book detail, the reader, and the audiobook player. The bottom-bar tabs are a
 * nested host inside [MainShell].
 *
 * Full-screen destinations pop themselves via [dropUnlessResumed]: while a popped screen is still
 * fading out it keeps receiving taps, and a second back (e.g. tapping the shell's menu button, which
 * sits where the player's minimize button was) would otherwise pop [AppRoutes.MAIN] too, leaving an
 * empty back stack and a blank screen.
 */
@Composable
fun AuthenticatedApp(user: AuthUser, onSignOut: () -> Unit) {
    val navController = rememberNavController()
    // Shared player VM at the app-nav scope so "Listen" can start playback before navigating.
    val playerVm: PlayerViewModel = hiltViewModel()
    // Reopen the last audiobook (paused) so the mini-player survives the app being closed. The
    // manager makes this a once-per-process no-op, so recompositions and recreations are harmless.
    LaunchedEffect(Unit) { playerVm.restoreLastBook() }

    // Opens the next book in a series (comic reader's end-of-issue card/auto-advance), REPLACING
    // the current reader in the back stack rather than pushing on top of it, so Back from the new
    // book goes straight past the one that was just finished.
    val openBookReplacingCurrentReader: (Int, BookFiles.ReadingTarget) -> Unit = { id, target ->
        val route = when (target) {
            is BookFiles.ReadingTarget.Comic -> AppRoutes.comic(id)
            is BookFiles.ReadingTarget.Foliate -> AppRoutes.reader(id)
            is BookFiles.ReadingTarget.Pdf -> AppRoutes.pdf(id)
            BookFiles.ReadingTarget.None -> AppRoutes.bookDetail(id)
        }
        navController.navigate(route) {
            popUpTo(AppRoutes.COMIC) { inclusive = true }
        }
    }

    NavHost(navController = navController, startDestination = AppRoutes.MAIN, enterTransition = navEnter, exitTransition = navExit) {
        composable(AppRoutes.MAIN) {
            // Book detail lives INSIDE the shell (so the bottom bar + mini-player persist); only the
            // immersive reader/player are full-screen app-level destinations.
            MainShell(
                user = user,
                onSignOut = onSignOut,
                onOpenReader = { id -> navController.navigate(AppRoutes.reader(id)) },
                onOpenPdf = { id -> navController.navigate(AppRoutes.pdf(id)) },
                onOpenComic = { id -> navController.navigate(AppRoutes.comic(id)) },
                onListen = { id ->
                    playerVm.loadAndPlay(id)
                    navController.navigate(AppRoutes.PLAYER)
                },
                onOpenPlayer = { navController.navigate(AppRoutes.PLAYER) },
            )
        }
        composable(
            route = AppRoutes.READER,
            arguments = listOf(navArgument("id") { type = NavType.IntType }),
        ) {
            ReaderDestination(ReaderKind.EBOOK, onBack = dropUnlessResumed { navController.popBackStack() })
        }
        composable(
            route = AppRoutes.PDF,
            arguments = listOf(navArgument("id") { type = NavType.IntType }),
        ) {
            ReaderDestination(ReaderKind.PDF, onBack = dropUnlessResumed { navController.popBackStack() })
        }
        composable(
            route = AppRoutes.COMIC,
            arguments = listOf(navArgument("id") { type = NavType.IntType }),
        ) {
            ReaderDestination(
                ReaderKind.COMIC,
                onBack = dropUnlessResumed { navController.popBackStack() },
                onOpenNextBook = openBookReplacingCurrentReader,
            )
        }
        composable(AppRoutes.PLAYER) {
            PlayerScreen(onBack = dropUnlessResumed { navController.popBackStack() })
        }
        composable(
            route = AppRoutes.BOOK_DETAIL,
            arguments = listOf(navArgument("id") { type = NavType.IntType }),
        ) {
            // Fallback destination for the comic reader's "next in series" card when the next
            // book isn't readable in any app-level reader (e.g. audiobook-only) - the full book
            // detail screen (with its own Read/Listen actions) lives inside MainShell's own nested
            // graph for normal browsing, so this is a standalone instance just for that case.
            // Author/series taps have no app-level route to land on here, so they're no-ops.
            BookDetailScreen(
                onBack = dropUnlessResumed { navController.popBackStack() },
                onRead = { id -> navController.navigate(AppRoutes.reader(id)) },
                onReadPdf = { id -> navController.navigate(AppRoutes.pdf(id)) },
                onReadComic = { id -> navController.navigate(AppRoutes.comic(id)) },
                onListen = { id ->
                    playerVm.loadAndPlay(id)
                    navController.navigate(AppRoutes.PLAYER)
                },
                onBookClick = { id -> navController.navigate(AppRoutes.bookDetail(id)) },
                onAuthorClick = { _, _ -> },
                onSeriesClick = { _, _ -> },
            )
        }
    }
}

object AppRoutes {
    const val MAIN = "main"
    const val READER = "reader/{id}"
    const val PDF = "pdf/{id}"
    const val COMIC = "comic/{id}"
    const val PLAYER = "player"
    const val BOOK_DETAIL = "book-detail/{id}"
    fun reader(id: Int) = "reader/$id"
    fun pdf(id: Int) = "pdf/$id"
    fun comic(id: Int) = "comic/$id"
    fun bookDetail(id: Int) = "book-detail/$id"
}
