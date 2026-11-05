package com.bookorbit.feature.dashboard

import com.bookorbit.core.model.DashboardShelfConfig
import com.bookorbit.util.MainDispatcherRule
import io.mockk.coEvery
import io.mockk.every
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

    private fun repo(saveResult: Result<Unit> = Result.success(Unit)): DashboardShelfConfigRepository {
        val repo = mockk<DashboardShelfConfigRepository>()
        coEvery { repo.shelves() } returns DashboardShelfConfig.ordered(DashboardShelfConfig.DEFAULT_ENTRIES)
        coEvery { repo.save(any()) } returns saveResult
        return repo
    }

    @Test
    fun `starts with the repository's ordered shelves`() {
        val vm = CustomizeDashboardViewModel(repo())
        assertEquals(DashboardShelfConfig.DEFAULT_ENTRIES.map { it.type }, vm.ui.value.entries.map { it.type })
        assertTrue(!vm.ui.value.loading)
    }

    @Test
    fun `toggle flips the entry and saves`() {
        val r = repo()
        val vm = CustomizeDashboardViewModel(r)
        val target = vm.ui.value.entries.first()
        vm.toggle(target.id)
        assertEquals(!target.enabled, vm.ui.value.entries.first { it.id == target.id }.enabled)
    }

    @Test
    fun `move reorders the list`() {
        val vm = CustomizeDashboardViewModel(repo())
        val second = vm.ui.value.entries[1].type
        vm.move(1, -1)
        assertEquals(second, vm.ui.value.entries.first().type)
    }

    @Test
    fun `resetToDefault restores the default order and enables everything`() {
        val vm = CustomizeDashboardViewModel(repo())
        vm.toggle(vm.ui.value.entries.first().id)
        vm.move(1, -1)
        vm.resetToDefault()
        assertEquals(DashboardShelfConfig.DEFAULT_ENTRIES.map { it.type }, vm.ui.value.entries.map { it.type })
        assertTrue(vm.ui.value.entries.all { it.enabled })
    }

    @Test
    fun `a failed save surfaces a message`() {
        val vm = CustomizeDashboardViewModel(repo(saveResult = Result.failure(java.io.IOException("offline"))))
        vm.toggle(vm.ui.value.entries.first().id)
        assertNotNull(vm.message.value)
    }
}
