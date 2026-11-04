package com.bookorbit.feature.reader

import androidx.lifecycle.SavedStateHandle
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * [trackingEnabled] is the one gating decision shared by the EPUB, PDF and comic reader VMs
 * (ReaderViewModel/PdfReaderViewModel/ComicReaderViewModel each store its result as `tracking`,
 * then check it at the top of their own `report()`/`flush()` and resolveInitial call sites -- see
 * the class docs on [ReaderViewModel]). Covering it here pins down the contract without needing
 * to stand up a full reader VM (and its native EPUB/PDF/CBZ dependencies) per reader.
 */
class PeekModeTest {

    @Test
    fun `tracking is on by default when no peek arg is present`() {
        assertTrue(trackingEnabled(SavedStateHandle(mapOf("id" to 12))))
    }

    @Test
    fun `tracking is on when peek is explicitly false`() {
        assertTrue(trackingEnabled(SavedStateHandle(mapOf("id" to 12, "peek" to false))))
    }

    @Test
    fun `tracking is off only when peek is explicitly true`() {
        assertFalse(trackingEnabled(SavedStateHandle(mapOf("id" to 12, "peek" to true))))
    }
}
