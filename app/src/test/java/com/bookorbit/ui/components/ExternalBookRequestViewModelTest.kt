package com.bookorbit.ui.components

import com.bookorbit.core.auth.SessionManager
import com.bookorbit.core.model.AuthUser
import com.bookorbit.core.model.BOOK_REQUEST_ACCESS_PERMISSION
import com.bookorbit.core.model.BookRequestAvailability
import com.bookorbit.core.model.BookRequestSubmitResult
import com.bookorbit.core.model.BookRequestSummaryRef
import com.bookorbit.core.model.ReadingServiceShelfItem
import com.bookorbit.core.network.BookRequestsRepository
import com.bookorbit.util.MainDispatcherRule
import io.mockk.coEvery
import io.mockk.every
import io.mockk.mockk
import kotlinx.coroutines.ExperimentalCoroutinesApi
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Rule
import org.junit.Test
import java.io.IOException

@OptIn(ExperimentalCoroutinesApi::class)
class ExternalBookRequestViewModelTest {
    @get:Rule
    val mainRule = MainDispatcherRule()

    private val card = ReadingServiceShelfItem(title = "Remote Title", provider = "readwise", externalUrl = "https://readwise.io/book/1")

    private fun session(allowed: Boolean): SessionManager {
        val session = mockk<SessionManager>()
        val user = if (allowed) {
            AuthUser(id = 1, username = "a", permissions = listOf(BOOK_REQUEST_ACCESS_PERMISSION))
        } else {
            AuthUser(id = 1, username = "a", permissions = emptyList())
        }
        every { session.currentUser } returns user
        return session
    }

    @Test
    fun `canRequestBooks is false without the permission or superuser`() {
        val vm = ExternalBookRequestViewModel(mockk(), session(allowed = false))
        assertFalse(vm.canRequestBooks)
    }

    @Test
    fun `canRequestBooks is true for a superuser regardless of permissions`() {
        val session = mockk<SessionManager>()
        every { session.currentUser } returns AuthUser(id = 1, username = "a", isSuperuser = true)
        val vm = ExternalBookRequestViewModel(mockk(), session)
        assertTrue(vm.canRequestBooks)
    }

    @Test
    fun `without permission the chooser opens straight to Ready with canRequest false`() {
        val repo = mockk<BookRequestsRepository>()
        val vm = ExternalBookRequestViewModel(repo, session(allowed = false))

        vm.openChooser(card, onOwned = { })

        val state = vm.chooser.value as ExternalBookRequestViewModel.ChooserState.Ready
        assertFalse(state.canRequest)
        assertFalse(state.alreadyRequested)
    }

    @Test
    fun `an owned book navigates instead of opening the chooser`() {
        val repo = mockk<BookRequestsRepository>()
        coEvery { repo.checkAvailability(card) } returns BookRequestAvailability(ownedBookId = 99)
        val vm = ExternalBookRequestViewModel(repo, session(allowed = true))
        var navigatedTo: Int? = null

        vm.openChooser(card, onOwned = { navigatedTo = it })

        assertEquals(99, navigatedTo)
        assertNull(vm.chooser.value)
    }

    @Test
    fun `an already-requested book opens Ready with alreadyRequested true`() {
        val repo = mockk<BookRequestsRepository>()
        coEvery { repo.checkAvailability(card) } returns BookRequestAvailability(existingRequestId = 5)
        val vm = ExternalBookRequestViewModel(repo, session(allowed = true))

        vm.openChooser(card, onOwned = { })

        val state = vm.chooser.value as ExternalBookRequestViewModel.ChooserState.Ready
        assertTrue(state.alreadyRequested)
        assertTrue(state.canRequest)
    }

    @Test
    fun `a neutral availability result opens a plain Ready chooser`() {
        val repo = mockk<BookRequestsRepository>()
        coEvery { repo.checkAvailability(card) } returns BookRequestAvailability()
        val vm = ExternalBookRequestViewModel(repo, session(allowed = true))

        vm.openChooser(card, onOwned = { })

        val state = vm.chooser.value as ExternalBookRequestViewModel.ChooserState.Ready
        assertFalse(state.alreadyRequested)
        assertNull(state.ownedBookId)
    }

    @Test
    fun `a failed availability check still opens a plain Ready chooser`() {
        val repo = mockk<BookRequestsRepository>()
        coEvery { repo.checkAvailability(card) } returns null
        val vm = ExternalBookRequestViewModel(repo, session(allowed = true))

        vm.openChooser(card, onOwned = { })

        assertTrue(vm.chooser.value is ExternalBookRequestViewModel.ChooserState.Ready)
    }

    @Test
    fun `addToRequests on success closes the chooser and sets a message`() {
        val repo = mockk<BookRequestsRepository>()
        coEvery { repo.checkAvailability(card) } returns BookRequestAvailability()
        coEvery { repo.submit(card) } returns Result.success(BookRequestSubmitResult(BookRequestSummaryRef(id = 1)))
        val vm = ExternalBookRequestViewModel(repo, session(allowed = true))
        vm.openChooser(card, onOwned = { })

        vm.addToRequests(card)

        assertNull(vm.chooser.value)
        assertFalse(vm.requesting.value)
        assertTrue(vm.message.value != null)
    }

    @Test
    fun `addToRequests on failure keeps the chooser open and sets a message`() {
        val repo = mockk<BookRequestsRepository>()
        coEvery { repo.checkAvailability(card) } returns BookRequestAvailability()
        coEvery { repo.submit(card) } returns Result.failure(IOException("offline"))
        val vm = ExternalBookRequestViewModel(repo, session(allowed = true))
        vm.openChooser(card, onOwned = { })

        vm.addToRequests(card)

        assertTrue(vm.chooser.value != null)
        assertFalse(vm.requesting.value)
        assertTrue(vm.message.value != null)
    }

    @Test
    fun `dismissChooser clears the open chooser`() {
        val vm = ExternalBookRequestViewModel(mockk(), session(allowed = false))
        vm.openChooser(card, onOwned = { })
        assertTrue(vm.chooser.value != null)

        vm.dismissChooser()

        assertNull(vm.chooser.value)
    }

    @Test
    fun `consumeMessage clears the message`() {
        val repo = mockk<BookRequestsRepository>()
        coEvery { repo.checkAvailability(card) } returns BookRequestAvailability()
        coEvery { repo.submit(card) } returns Result.success(BookRequestSubmitResult(BookRequestSummaryRef(id = 1)))
        val vm = ExternalBookRequestViewModel(repo, session(allowed = true))
        vm.openChooser(card, onOwned = { })
        vm.addToRequests(card)
        assertTrue(vm.message.value != null)

        vm.consumeMessage()

        assertNull(vm.message.value)
    }
}
