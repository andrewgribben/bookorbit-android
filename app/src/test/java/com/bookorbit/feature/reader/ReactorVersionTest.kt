package com.bookorbit.feature.reader

import java.io.File
import org.junit.Assert.assertEquals
import org.junit.Assume.assumeTrue
import org.junit.Test

/**
 * Guards against bundle drift (see docs/SPEC.md "Risks"): the committed Reactor bundle's own
 * version stamp (`assets/reactor/reactor-version.json`) must match the pin `scripts/sync-reactor.sh`
 * wrote to `reactor.version` at the repo root. Skips cleanly - not a failure - until R4 lands a
 * real bundle and A1's sync script is run against it; there is no bundle checked in yet.
 */
class ReactorVersionTest {
    private val bundleVersionFile = File("src/main/assets/reactor/reactor-version.json")
    private val pinFile = File("../reactor.version")

    @Test
    fun `the committed reactor bundle's version matches the sync script's pin`() {
        assumeTrue(
            "No Reactor bundle checked in yet (R4 not landed) - skipping",
            bundleVersionFile.exists(),
        )
        check(pinFile.exists()) {
            "assets/reactor/reactor-version.json exists but reactor.version is missing at the " +
                "repo root; run scripts/sync-reactor.sh"
        }

        val bundleVersion = Regex(""""version"\s*:\s*"([^"]+)"""")
            .find(bundleVersionFile.readText())
            ?.groupValues?.get(1)
        checkNotNull(bundleVersion) { "assets/reactor/reactor-version.json has no \"version\" field" }

        val pinnedVersion = pinFile.readLines()
            .firstOrNull { it.startsWith("version=") }
            ?.removePrefix("version=")
            ?.trim()
        checkNotNull(pinnedVersion) { "reactor.version has no version= line" }

        assertEquals(pinnedVersion, bundleVersion)
    }
}
