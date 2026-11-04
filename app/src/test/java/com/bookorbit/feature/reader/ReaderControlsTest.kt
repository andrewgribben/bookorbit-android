package com.bookorbit.feature.reader

import org.junit.Assert.assertEquals
import org.junit.Test

class ReaderControlsTest {

    @Test
    fun `sides preset hit-tests left, right and center bands`() {
        val size = ZoneSize.MEDIUM // 30%
        assertEquals(TapZone.LEFT, hitZone(ZoneLayoutPreset.SIDES, size, 0.1f, 0.5f))
        assertEquals(TapZone.RIGHT, hitZone(ZoneLayoutPreset.SIDES, size, 0.9f, 0.5f))
        assertEquals(TapZone.CENTER, hitZone(ZoneLayoutPreset.SIDES, size, 0.5f, 0.5f))
    }

    @Test
    fun `wide zone size claims more of the page than narrow`() {
        // x = 0.3 is inside the LEFT band only when zones are wide (40%), not narrow (25%) or medium (30%).
        assertEquals(TapZone.CENTER, hitZone(ZoneLayoutPreset.SIDES, ZoneSize.NARROW, 0.3f, 0.5f))
        assertEquals(TapZone.CENTER, hitZone(ZoneLayoutPreset.SIDES, ZoneSize.MEDIUM, 0.3f, 0.5f))
        assertEquals(TapZone.LEFT, hitZone(ZoneLayoutPreset.SIDES, ZoneSize.WIDE, 0.3f, 0.5f))
    }

    @Test
    fun `sides and corners adds a bottom band but no top band`() {
        val size = ZoneSize.MEDIUM
        assertEquals(TapZone.BOTTOM, hitZone(ZoneLayoutPreset.SIDES_AND_CORNERS, size, 0.5f, 0.95f))
        assertEquals(TapZone.CENTER, hitZone(ZoneLayoutPreset.SIDES_AND_CORNERS, size, 0.5f, 0.05f))
    }

    @Test
    fun `edges adds both top and bottom bands`() {
        val size = ZoneSize.MEDIUM
        assertEquals(TapZone.TOP, hitZone(ZoneLayoutPreset.EDGES, size, 0.5f, 0.05f))
        assertEquals(TapZone.BOTTOM, hitZone(ZoneLayoutPreset.EDGES, size, 0.5f, 0.95f))
    }

    @Test
    fun `centre only ignores position entirely`() {
        assertEquals(TapZone.CENTER, hitZone(ZoneLayoutPreset.CENTRE_ONLY, ZoneSize.WIDE, 0.0f, 0.0f))
        assertEquals(TapZone.CENTER, hitZone(ZoneLayoutPreset.CENTRE_ONLY, ZoneSize.WIDE, 1.0f, 1.0f))
    }

    @Test
    fun `default actions follow the sides preset's left-back right-forward convention`() {
        assertEquals(TapAction.PREVIOUS, defaultActionFor(ZoneLayoutPreset.SIDES, TapZone.LEFT))
        assertEquals(TapAction.NEXT, defaultActionFor(ZoneLayoutPreset.SIDES, TapZone.RIGHT))
        assertEquals(TapAction.MENU, defaultActionFor(ZoneLayoutPreset.SIDES, TapZone.CENTER))
    }

    @Test
    fun `centre only preset defaults every non-centre zone to nothing`() {
        assertEquals(TapAction.NOTHING, defaultActionFor(ZoneLayoutPreset.CENTRE_ONLY, TapZone.LEFT))
        assertEquals(TapAction.MENU, defaultActionFor(ZoneLayoutPreset.CENTRE_ONLY, TapZone.CENTER))
    }

    @Test
    fun `withZoneAction overrides only the chosen zone`() {
        val settings = ReaderControlsSettings().withZoneAction(TapZone.LEFT, TapAction.NOTHING)
        assertEquals(TapAction.NOTHING, settings.actionFor(TapZone.LEFT))
        assertEquals(TapAction.NEXT, settings.actionFor(TapZone.RIGHT)) // untouched, still the preset default
    }

    @Test
    fun `resolveTapAction mirrors next and previous for rtl content when mirroring is on`() {
        val settings = ReaderControlsSettings(mirrorForRtl = true)
        assertEquals(TapAction.PREVIOUS, settings.resolveTapAction(TapZone.RIGHT, isRtl = true))
        assertEquals(TapAction.NEXT, settings.resolveTapAction(TapZone.LEFT, isRtl = true))
        assertEquals(TapAction.NEXT, settings.resolveTapAction(TapZone.RIGHT, isRtl = false))
    }

    @Test
    fun `resolveTapAction leaves actions unmirrored when mirroring is off`() {
        val settings = ReaderControlsSettings(mirrorForRtl = false)
        assertEquals(TapAction.NEXT, settings.resolveTapAction(TapZone.RIGHT, isRtl = true))
    }

    @Test
    fun `resolveTapAction never mirrors Menu or Nothing`() {
        val settings = ReaderControlsSettings(mirrorForRtl = true).withZoneAction(TapZone.LEFT, TapAction.NOTHING)
        assertEquals(TapAction.NOTHING, settings.resolveTapAction(TapZone.LEFT, isRtl = true))
        assertEquals(TapAction.MENU, settings.resolveTapAction(TapZone.CENTER, isRtl = true))
    }

    @Test
    fun `resolveTapAction by position combines hit-testing and mirroring`() {
        val settings = ReaderControlsSettings(zoneSize = ZoneSize.MEDIUM, mirrorForRtl = true)
        assertEquals(TapAction.PREVIOUS, settings.resolveTapAction(0.9f, 0.5f, isRtl = true))
        assertEquals(TapAction.NEXT, settings.resolveTapAction(0.9f, 0.5f, isRtl = false))
    }
}
