package com.bookorbit.feature.reader

import org.junit.Assert.assertEquals
import org.junit.Test

/** The Reactor-vs-legacy `loadUrl` switch (A1), kept pure so it is unit-testable without a WebView. */
class ReaderIndexUrlTest {
    @Test
    fun `defaults to the legacy bundle when the flag is off`() {
        assertEquals(
            "https://appassets.androidplatform.net/assets/reader/index.html",
            readerIndexUrl(useReactor = false),
        )
    }

    @Test
    fun `loads the reactor bundle when the flag is on`() {
        assertEquals(
            "https://appassets.androidplatform.net/assets/reactor/index.html",
            readerIndexUrl(useReactor = true),
        )
    }
}
