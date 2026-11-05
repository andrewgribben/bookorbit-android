package com.bookorbit.feature.dashboard

import com.bookorbit.core.auth.SessionManager
import com.bookorbit.core.model.DashboardShelfConfig
import com.bookorbit.core.model.ShelfConfigEntry
import com.bookorbit.core.model.UpdateMeSettingsRequest
import com.bookorbit.core.network.ApiService
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
        if (session.currentUser != null) {
            runCatching { api.getMe() }.getOrNull()?.let(session::updateCurrentUser)
        }
        return DashboardShelfConfig.ordered(DashboardShelfConfig.parse(rawConfig()))
    }

    /**
     * Writes [entries] back to the server, preserving every field this app doesn't model (see
     * [DashboardShelfConfig.buildConfigJson]), then updates the in-memory/persisted user so the
     * next read sees it without another network call. Never throws - callers get a [Result].
     */
    suspend fun save(entries: List<ShelfConfigEntry>): Result<Unit> = runCatching {
        val configJson = DashboardShelfConfig.buildConfigJson(rawConfig(), entries)
        val request = UpdateMeSettingsRequest(buildJsonObject { put("dashboardShelfConfig", configJson) })
        val response = api.updateMySettings(request)
        val currentUser = session.currentUser
        if (currentUser != null && response.settings != null) {
            session.updateCurrentUser(currentUser.copy(settings = response.settings))
        }
    }
}
