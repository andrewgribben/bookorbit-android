package com.bookorbit.feature.dashboard

import com.bookorbit.core.model.DashboardShelfConfig
import com.bookorbit.core.model.DashboardShelfRow
import com.bookorbit.core.model.ExternalShelfConfig
import com.bookorbit.core.network.ReadingServicesRepository
import com.bookorbit.util.MainDispatcherRule
import io.mockk.coEvery
import io.mockk.mockk
import kotlinx.coroutines.ExperimentalCoroutinesApi
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertTrue
import org.junit.Rule
import org.junit.Test

@OptIn(ExperimentalCoroutinesApi::class)
class CustomizeDashboardViewModelTest {
    @get:Rule
    val mainRule = MainDispatcherRule()

    private fun repo(
        saveResult: Result<Unit> = Result.success(Unit),
        rows: List<DashboardShelfRow> = DashboardShelfConfig.DEFAULT_ENTRIES.map { DashboardShelfRow.Scroller(it) },
    ): DashboardShelfConfigRepository {
        val repo = mockk<DashboardShelfConfigRepository>()
        coEvery { repo.rowsForEditing() } returns rows
        coEvery { repo.useLocalLayout() } returns false
        coEvery { repo.setUseLocalLayout(any()) } returns Unit
        coEvery { repo.save(any()) } returns saveResult
        return repo
    }

    private fun readingServicesRepo(): ReadingServicesRepository {
        val repo = mockk<ReadingServicesRepository>()
        coEvery { repo.summaries() } returns emptyList()
        return repo
    }

    @Test
    fun `starts with the repositorys rows for editing`() {
        val vm = CustomizeDashboardViewModel(repo(), readingServicesRepo())
        assertEquals(DashboardShelfConfig.DEFAULT_ENTRIES.map { it.type }, vm.ui.value.rows.map { (it as DashboardShelfRow.Scroller).entry.type })
        assertTrue(!vm.ui.value.loading)
    }

    @Test
    fun `toggle flips the row and saves`() {
        val r = repo()
        val vm = CustomizeDashboardViewModel(r, readingServicesRepo())
        val target = vm.ui.value.rows.first()
        vm.toggle(target.key)
        assertEquals(!target.enabled, vm.ui.value.rows.first { it.key == target.key }.enabled)
    }

    @Test
    fun `move reorders a mixed list of scrollers and external shelves`() {
        val rows = listOf(
            DashboardShelfRow.Scroller(DashboardShelfConfig.DEFAULT_ENTRIES[0]),
            DashboardShelfRow.External(ExternalShelfConfig("readwise", "owned-elsewhere", true, 2)),
        )
        val vm = CustomizeDashboardViewModel(repo(rows = rows), readingServicesRepo())
        vm.move(0, 1)
        assertEquals(listOf("external:readwise:owned-elsewhere", "scroller:default-continue-reading"), vm.ui.value.rows.map { it.key })
    }

    @Test
    fun `resetToDefault restores the default scroller order but keeps external rows`() {
        val rows = listOf(
            DashboardShelfRow.Scroller(DashboardShelfConfig.DEFAULT_ENTRIES[1]),
            DashboardShelfRow.Scroller(DashboardShelfConfig.DEFAULT_ENTRIES[0]),
            DashboardShelfRow.External(ExternalShelfConfig("readwise", "owned-elsewhere", true, 3)),
        )
        val vm = CustomizeDashboardViewModel(repo(rows = rows), readingServicesRepo())
        vm.resetToDefault()
        val scrollers = vm.ui.value.rows.filterIsInstance<DashboardShelfRow.Scroller>()
        assertEquals(DashboardShelfConfig.DEFAULT_ENTRIES.map { it.type }, scrollers.map { it.entry.type })
        assertTrue(scrollers.all { it.enabled })
        assertTrue(vm.ui.value.rows.any { it.key == "external:readwise:owned-elsewhere" })
    }

    @Test
    fun `a failed save surfaces a message`() {
        val vm = CustomizeDashboardViewModel(repo(saveResult = Result.failure(java.io.IOException("offline"))), readingServicesRepo())
        vm.toggle(vm.ui.value.rows.first().key)
        assertNotNull(vm.message.value)
    }

    @Test
    fun `an external row for an unconnected provider is marked unconnected`() {
        val rows = listOf(DashboardShelfRow.External(ExternalShelfConfig("readwise", "owned-elsewhere", false, 1)))
        val vm = CustomizeDashboardViewModel(repo(rows = rows), readingServicesRepo())
        assertTrue(vm.ui.value.connectedProviders.isEmpty())
    }
}
