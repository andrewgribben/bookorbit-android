package com.bookorbit.feature.reader

import org.junit.Assert.assertEquals
import org.junit.Test

class NewerPositionCheckTest {

    @Test
    fun `no offer while a save is pending, even with a newer server stamp`() {
        val decision = decideNewerPosition(
            pendingSaveQueued = true,
            knownServerStampMs = 100L,
            serverStampMs = 200L,
            serverCfi = "epubcfi(other)",
            serverFraction = 0.5,
            serverPercentage = 50.0,
            currentCfi = "epubcfi(mine)",
        )
        assertEquals(NewerPositionDecision.NoOffer, decision)
    }

    @Test
    fun `no offer when the server stamp is not newer than known`() {
        val decision = decideNewerPosition(
            pendingSaveQueued = false,
            knownServerStampMs = 200L,
            serverStampMs = 200L,
            serverCfi = "epubcfi(other)",
            serverFraction = 0.5,
            serverPercentage = 50.0,
            currentCfi = "epubcfi(mine)",
        )
        assertEquals(NewerPositionDecision.NoOffer, decision)
    }

    @Test
    fun `no offer when the server stamp is older than known`() {
        val decision = decideNewerPosition(
            pendingSaveQueued = false,
            knownServerStampMs = 500L,
            serverStampMs = 200L,
            serverCfi = "epubcfi(other)",
            serverFraction = 0.5,
            serverPercentage = 50.0,
            currentCfi = "epubcfi(mine)",
        )
        assertEquals(NewerPositionDecision.NoOffer, decision)
    }

    @Test
    fun `same cfi adopts the stamp silently instead of offering`() {
        val decision = decideNewerPosition(
            pendingSaveQueued = false,
            knownServerStampMs = 100L,
            serverStampMs = 250L,
            serverCfi = "epubcfi(mine)",
            serverFraction = 0.5,
            serverPercentage = 50.0,
            currentCfi = "epubcfi(mine)",
        )
        assertEquals(NewerPositionDecision.AdoptStampOnly(250L), decision)
    }

    @Test
    fun `same null cfi (fraction-only book) also adopts silently`() {
        val decision = decideNewerPosition(
            pendingSaveQueued = false,
            knownServerStampMs = 100L,
            serverStampMs = 250L,
            serverCfi = null,
            serverFraction = 0.5,
            serverPercentage = 50.0,
            currentCfi = null,
        )
        assertEquals(NewerPositionDecision.AdoptStampOnly(250L), decision)
    }

    @Test
    fun `a genuinely different position is offered`() {
        val decision = decideNewerPosition(
            pendingSaveQueued = false,
            knownServerStampMs = 100L,
            serverStampMs = 250L,
            serverCfi = "epubcfi(other)",
            serverFraction = 0.75,
            serverPercentage = 75.0,
            currentCfi = "epubcfi(mine)",
        )
        assertEquals(NewerPositionDecision.Offer("epubcfi(other)", 0.75, 75.0, 250L), decision)
    }

    @Test
    fun `an exactly-equal stamp is not offered (strictly newer required)`() {
        val decision = decideNewerPosition(
            pendingSaveQueued = false,
            knownServerStampMs = 250L,
            serverStampMs = 250L,
            serverCfi = "epubcfi(other)",
            serverFraction = 0.75,
            serverPercentage = 75.0,
            currentCfi = "epubcfi(mine)",
        )
        assertEquals(NewerPositionDecision.NoOffer, decision)
    }
}
