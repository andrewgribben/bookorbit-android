package com.bookorbit.ui.components

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.bookorbit.R
import com.bookorbit.core.auth.SessionManager
import com.bookorbit.core.model.ReadingServiceShelfItem
import com.bookorbit.core.model.canRequestBooks
import com.bookorbit.core.network.BookRequestsRepository
import com.bookorbit.ui.UiText
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

/**
 * Backs the "View in Provider" / "Add to requests" chooser a tap on an unmatched (`bookId ==
 * null`) [ReadingServiceShelfItem] opens from [ExternalBookScroller]. One instance covers every
 * shelf/tile on the screen; [chooser] names which card (if any) is currently open.
 */
@HiltViewModel
class ExternalBookRequestViewModel @Inject constructor(
    private val repo: BookRequestsRepository,
    private val sessionManager: SessionManager,
) : ViewModel() {

    /** State of the chooser for whichever card is open; null when the chooser is closed. */
    sealed interface ChooserState {
        val card: ReadingServiceShelfItem

        /** Availability is still being checked ([canRequestBooks] was true when opened). */
        data class Loading(override val card: ReadingServiceShelfItem) : ChooserState

        data class Ready(
            override val card: ReadingServiceShelfItem,
            val ownedBookId: Int? = null,
            val alreadyRequested: Boolean = false,
            /** Whether "Add to requests" should show at all - false when the signed-in user
             * lacks [com.bookorbit.core.model.BOOK_REQUEST_ACCESS_PERMISSION]. */
            val canRequest: Boolean = false,
        ) : ChooserState
    }

    private val _chooser = MutableStateFlow<ChooserState?>(null)
    val chooser = _chooser.asStateFlow()

    private val _requesting = MutableStateFlow(false)
    val requesting = _requesting.asStateFlow()

    private val _message = MutableStateFlow<UiText?>(null)
    val message = _message.asStateFlow()

    /** Whether the signed-in user may use "Add to requests" at all - gates both the menu item
     * and the availability check (no point annotating a card the user can't act on). */
    val canRequestBooks: Boolean get() = sessionManager.currentUser?.canRequestBooks() == true

    /**
     * Opens the chooser for [card]. When the user can request books, checks availability first;
     * if the server already owns this title, [onOwned] fires instead and the chooser never
     * shows - the card is treated the same as a matched one from here on.
     */
    fun openChooser(card: ReadingServiceShelfItem, onOwned: (Int) -> Unit) {
        if (!canRequestBooks) {
            _chooser.value = ChooserState.Ready(card, canRequest = false)
            return
        }
        _chooser.value = ChooserState.Loading(card)
        viewModelScope.launch {
            val availability = repo.checkAvailability(card)
            if (availability?.ownedBookId != null) {
                _chooser.value = null
                onOwned(availability.ownedBookId)
            } else {
                _chooser.value = ChooserState.Ready(
                    card = card,
                    ownedBookId = null,
                    alreadyRequested = availability?.existingRequestId != null,
                    canRequest = true,
                )
            }
        }
    }

    fun dismissChooser() {
        _chooser.value = null
    }

    fun addToRequests(card: ReadingServiceShelfItem) {
        _requesting.value = true
        viewModelScope.launch {
            val result = repo.submit(card)
            _requesting.value = false
            result.fold(
                onSuccess = {
                    _chooser.value = null
                    _message.value = UiText.of(R.string.added_to_requests)
                },
                onFailure = {
                    _message.value = UiText.of(R.string.add_to_requests_failed)
                },
            )
        }
    }

    fun consumeMessage() {
        _message.value = null
    }
}
