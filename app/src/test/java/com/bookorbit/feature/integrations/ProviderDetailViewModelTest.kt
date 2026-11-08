package com.bookorbit.feature.integrations

import com.bookorbit.core.auth.SessionManager
import com.bookorbit.core.model.ReadingServiceAuthMethod
import com.bookorbit.core.model.ReadingServiceAuthResult
import com.bookorbit.core.model.ReadingServiceDeviceAuthPollResult
import com.bookorbit.core.model.ReadingServiceDeviceAuthStart
import com.bookorbit.core.model.ReadingServicePasswordLoginResult
import com.bookorbit.core.model.ReadingServiceSummary
import com.bookorbit.core.network.ReadingServicesRepository
import io.mockk.coEvery
import io.mockk.coVerify
import io.mockk.every
import io.mockk.mockk
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.StandardTestDispatcher
import kotlinx.coroutines.test.advanceTimeBy
import kotlinx.coroutines.test.advanceUntilIdle
import kotlinx.coroutines.test.resetMain
import kotlinx.coroutines.test.runCurrent
import kotlinx.coroutines.test.runTest
import kotlinx.coroutines.test.setMain
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

private const val PROVIDER = "readwise-social"

@OptIn(ExperimentalCoroutinesApi::class)
class ProviderDetailViewModelTest {

    private val session = mockk<SessionManager> { every { serverUrl } returns "https://library.example" }

    @After
    fun tearDown() {
        Dispatchers.resetMain()
    }

    private fun summary(authMethods: List<ReadingServiceAuthMethod>, connected: Boolean = false) =
        ReadingServiceSummary(provider = PROVIDER, connected = connected, authMethods = authMethods, displayName = "Readwise Social")

    private fun repo(summaries: List<ReadingServiceSummary>): ReadingServicesRepository {
        val repo = mockk<ReadingServicesRepository>()
        coEvery { repo.summaries() } returns summaries
        return repo
    }

    @Test
    fun `load finds the matching provider and selects its first auth method`() = runTest {
        Dispatchers.setMain(StandardTestDispatcher(testScheduler))
        val methods = listOf(ReadingServiceAuthMethod(kind = "password", label = "Sign in"), ReadingServiceAuthMethod(kind = "token", label = "Token"))
        val vm = ProviderDetailViewModel(repo(listOf(summary(methods))), session)

        vm.load(PROVIDER)
        advanceUntilIdle()

        assertEquals(PROVIDER, vm.uiState.value.summary?.provider)
        assertEquals("password", vm.uiState.value.selectedMethod?.kind)
        assertTrue(!vm.uiState.value.loading)
    }

    @Test
    fun `a successful password sign-in connects and clears the password from state`() = runTest {
        Dispatchers.setMain(StandardTestDispatcher(testScheduler))
        val repository = repo(listOf(summary(listOf(ReadingServiceAuthMethod(kind = "password", label = "Sign in")))))
        coEvery { repository.connectWithPassword(PROVIDER, "jane", "secret") } returns
            Result.success(ReadingServicePasswordLoginResult(ok = true, accountLabel = "jane@example.com"))
        val vm = ProviderDetailViewModel(repository, session)
        vm.load(PROVIDER)
        advanceUntilIdle()

        vm.updateUsername("jane")
        vm.updatePassword("secret")
        vm.submitPassword()
        advanceUntilIdle()

        assertEquals("", vm.uiState.value.password)
        assertTrue(vm.uiState.value.connected)
        assertEquals("jane@example.com", vm.uiState.value.connectedAccountLabel)
    }

    @Test
    fun `a rejected password sign-in clears the password and surfaces the reason`() = runTest {
        Dispatchers.setMain(StandardTestDispatcher(testScheduler))
        val repository = repo(listOf(summary(listOf(ReadingServiceAuthMethod(kind = "password", label = "Sign in")))))
        coEvery { repository.connectWithPassword(PROVIDER, "jane", "wrong") } returns
            Result.success(ReadingServicePasswordLoginResult(ok = false, reason = "invalid", message = "Bad credentials"))
        val vm = ProviderDetailViewModel(repository, session)
        vm.load(PROVIDER)
        advanceUntilIdle()

        vm.updateUsername("jane")
        vm.updatePassword("wrong")
        vm.submitPassword()
        advanceUntilIdle()

        assertEquals("", vm.uiState.value.password)
        assertTrue(!vm.uiState.value.connected)
        assertEquals("Bad credentials", vm.uiState.value.errorMessage)
    }

    @Test
    fun `a successful token sign-in connects`() = runTest {
        Dispatchers.setMain(StandardTestDispatcher(testScheduler))
        val repository = repo(listOf(summary(listOf(ReadingServiceAuthMethod(kind = "token", label = "Token")))))
        coEvery { repository.connectWithToken(PROVIDER, "tok_123") } returns
            Result.success(ReadingServiceAuthResult(ok = true, accountLabel = "jane"))
        val vm = ProviderDetailViewModel(repository, session)
        vm.load(PROVIDER)
        advanceUntilIdle()

        vm.updateToken("tok_123")
        vm.submitToken()
        advanceUntilIdle()

        assertTrue(vm.uiState.value.connected)
        assertEquals("jane", vm.uiState.value.connectedAccountLabel)
    }

    @Test
    fun `device-code sign-in reaches approved once the poll reports it`() = runTest {
        Dispatchers.setMain(StandardTestDispatcher(testScheduler))
        val repository = repo(listOf(summary(listOf(ReadingServiceAuthMethod(kind = "device_code", label = "Device code")))))
        coEvery { repository.startDeviceAuth(PROVIDER) } returns
            Result.success(ReadingServiceDeviceAuthStart(verificationUrl = "https://x", userCode = "ABCD", expiresAt = "2026-01-01", pollIntervalSeconds = 1))
        coEvery { repository.pollDeviceAuth(PROVIDER) } returns
            Result.success(ReadingServiceDeviceAuthPollResult(status = "approved", accountLabel = "jane"))
        val vm = ProviderDetailViewModel(repository, session)
        vm.load(PROVIDER)
        advanceUntilIdle()

        vm.startDeviceAuth()
        // `runCurrent()`, not `advanceUntilIdle()`: the poll loop's own `delay()` reschedules
        // itself, so draining "until idle" here would run forever if the mocked status were ever
        // non-terminal. `runCurrent()` only runs what's already due, which is enough for the
        // non-suspending `startDeviceAuth` call to complete and the loop to reach its first delay.
        runCurrent()
        assertEquals(DevicePollState.WAITING, vm.uiState.value.devicePollState)

        // The mocked poll always reports "approved", so this one bounded advance is enough to
        // reach a terminal status and let the loop's job complete naturally.
        advanceTimeBy(1_500)
        runCurrent()

        assertEquals(DevicePollState.APPROVED, vm.uiState.value.devicePollState)
        assertTrue(vm.uiState.value.connected)
        assertEquals("jane", vm.uiState.value.connectedAccountLabel)
    }

    @Test
    fun `leaving the screen stops device-code polling`() = runTest {
        Dispatchers.setMain(StandardTestDispatcher(testScheduler))
        val repository = repo(listOf(summary(listOf(ReadingServiceAuthMethod(kind = "device_code", label = "Device code")))))
        coEvery { repository.startDeviceAuth(PROVIDER) } returns
            Result.success(ReadingServiceDeviceAuthStart(verificationUrl = "https://x", userCode = "ABCD", expiresAt = "2026-01-01", pollIntervalSeconds = 1))
        coEvery { repository.pollDeviceAuth(PROVIDER) } returns Result.success(ReadingServiceDeviceAuthPollResult(status = "pending"))
        val vm = ProviderDetailViewModel(repository, session)
        vm.load(PROVIDER)
        advanceUntilIdle()

        vm.startDeviceAuth()
        // Never `advanceUntilIdle()` below: the mocked status stays "pending" forever, so the
        // poll loop never reaches a terminal status and keeps rescheduling its own delay - an
        // "until idle" drain against that would never finish. Bounded `advanceTimeBy` only runs
        // what falls due within that window.
        runCurrent()
        advanceTimeBy(1_500)
        coVerify(exactly = 1) { repository.pollDeviceAuth(PROVIDER) }

        vm.onScreenLeft()
        advanceTimeBy(10_000)

        // Still only the one poll from before leaving - the loop was cancelled, not merely slowed.
        coVerify(exactly = 1) { repository.pollDeviceAuth(PROVIDER) }
    }

    @Test
    fun `switching account disconnects and returns to the sign-in form`() = runTest {
        Dispatchers.setMain(StandardTestDispatcher(testScheduler))
        val repository = repo(listOf(summary(listOf(ReadingServiceAuthMethod(kind = "token", label = "Token")), connected = true)))
        coEvery { repository.disconnect(PROVIDER) } returns Result.success(true)
        val vm = ProviderDetailViewModel(repository, session)
        vm.load(PROVIDER)
        advanceUntilIdle()
        assertTrue(vm.uiState.value.connected)

        vm.switchAccount()
        advanceUntilIdle()

        assertTrue(!vm.uiState.value.connected)
        assertNull(vm.uiState.value.connectedAccountLabel)
        coVerify(exactly = 1) { repository.disconnect(PROVIDER) }
    }
}
