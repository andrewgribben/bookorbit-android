package com.bookorbit.feature.dashboard

import android.util.Log
import com.bookorbit.core.auth.SessionManager
import com.bookorbit.core.model.DashboardShelfConfig
import com.bookorbit.core.model.ShelfConfigEntry
import com.bookorbit.core.model.UpdateMeSettingsRequest
import com.bookorbit.core.network.ApiService
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.SharedFlow
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.buildJsonObject
import javax.inject.Inject
import javax.inject.Singleton

/**
 * Reads and writes the signed-in user's dashboard shelf config, stored server-side at
 * `user.settings.dashboardShelfConfig` (see [DashboardShelfConfig] for the exact contract). There
 * is no app-local copy: a server round trip is the only persistence this setting has, matching
 * requirement that app and web stay in sync through the same server value.
 */
@Singleton
class DashboardShelfConfigRepository @Inject constructor(
    private val api: ApiService,
    private val session: SessionManager,
) {
    private fun rawConfig(): JsonObject? = session.currentUser?.settings?.get("dashboardShelfConfig") as? JsonObject

    /** Ordered, enabled-filtered-by-caller shelf entries for the signed-in user (or the defaults
     * when signed out or the server has no config - see [DashboardShelfConfig.parse]). Re-reads the
     * user from the server first: the session copy is only fetched at sign-in, so shelves added or
     * reordered on the web would otherwise never appear (and a save would overwrite them). Falls
     * back to the cached copy offline. */
    suspend fun shelves(): List<ShelfConfigEntry> {
        refreshUser()
        return DashboardShelfConfig.ordered(DashboardShelfConfig.parse(rawConfig()))
            .also { Log.i(TAG, "shelves from server: ${describe(it)}") }
    }

    private val _saved = MutableSharedFlow<Unit>(extraBufferCapacity = 1)

    /** Emits after each successful [save], so Home can reload its shelves. */
    val saved: SharedFlow<Unit> = _saved

    private suspend fun refreshUser() {
        if (session.currentUser != null) {
            runCatching { api.getMe() }.getOrNull()?.let(session::updateCurrentUser)
        }
    }

    /**
     * Writes [entries] back to the server, preserving every field this app doesn't model (see
     * [DashboardShelfConfig.buildConfigJson]), then updates the in-memory/persisted user so the
     * next read sees it without another network call. Never throws - callers get a [Result].
     */
    suspend fun save(entries: List<ShelfConfigEntry>): Result<Unit> = runCatching {
        refreshUser()
        val merged = DashboardShelfConfig.mergedForSave(DashboardShelfConfig.parse(rawConfig()), entries)
        Log.i(TAG, "saving shelves: ${describe(merged)}")
        val configJson = DashboardShelfConfig.buildConfigJson(rawConfig(), merged)
        val request = UpdateMeSettingsRequest(buildJsonObject { put("dashboardShelfConfig", configJson) })
        val response = api.updateMySettings(request)
        val currentUser = session.currentUser
        if (currentUser != null && response.settings != null) {
            session.updateCurrentUser(currentUser.copy(settings = response.settings))
        }
        _saved.tryEmit(Unit)
    }

    private fun describe(entries: List<ShelfConfigEntry>) =
        entries.joinToString { "${it.type}#${it.id}${if (it.enabled) "" else "(off)"}" } +
            " sync=" + (rawConfig()?.get("syncAcrossSessions") ?: "unset")

    private companion object {
        const val TAG = "DashboardShelves"
    }
}
