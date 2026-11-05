package com.bookorbit.core.di

import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import javax.inject.Qualifier
import javax.inject.Singleton

/**
 * A [CoroutineScope] that outlives any single screen's `viewModelScope`. `ViewModel.clear()`
 * cancels `viewModelScope` *before* calling `onCleared()` (lifecycle-viewmodel 2.8.7, same as
 * every earlier version), so a `viewModelScope.launch { ... }` started from `onCleared()` never
 * actually runs - its coroutine is born into an already-cancelled job. Readers/players use this
 * scope instead for the one write that absolutely must survive leaving the screen: the final,
 * not-yet-throttle-flushed reading/listening position.
 */
@Qualifier
@Retention(AnnotationRetention.RUNTIME)
annotation class ApplicationScope

@Module
@InstallIn(SingletonComponent::class)
object ApplicationScopeModule {
    @Provides
    @Singleton
    @ApplicationScope
    fun provideApplicationScope(): CoroutineScope = CoroutineScope(SupervisorJob() + Dispatchers.Default)
}
