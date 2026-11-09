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
 * `user.settings.dashboardShelfConfig` (see [DashboardShelfConfig] for the exact contract).
 *
 * When the user turns on "use this device's layout" ([DashboardLocalLayoutStore]), this
 * repository stops reading/writing the server copy for enabled/order and instead keeps a
 * per-device list, merged against the current server list on every read so shelves added on
 * the server still show up and ones deleted there disappear (see
 * [DashboardShelfConfig.mergedWithLocalLayout]). External (reading-service) shelves aren't part
 * of the local layout - Customize Dashboard doesn't edit those, so they keep following the
 * server regardless of this toggle.
 */
@Singleton
class DashboardShelfConfigRepository @Inject constructor(
    private val api: ApiService,
    private val session: SessionManager,
    private val localLayoutStore: DashboardLocalLayoutStore,
) {
    private fun rawConfig(): JsonObject? = session.currentUser?.settings?.get("dashboardShelfConfig") as? JsonObject

    /** True when the signed-in user has turned on the per-device layout for the current server. */
    suspend fun useLocalLayout(): Boolean {
        val userId = session.currentUser?.id ?: return false
        return localLayoutStore.isEnabled(userId, session.serverUrl)
    }

    /**
     * Turns the per-device layout on or off. Turning it on seeds the local layout from the
     * current server list the first time (a later toggle-off then toggle-on restores whatever
     * was last saved locally, rather than reseeding). Turning it off only flips the flag - the
     * local copy is kept as-is so re-enabling restores it.
     */
    suspend fun setUseLocalLayout(enabled: Boolean) {
        val userId = session.currentUser?.id ?: return
        if (enabled && localLayoutStore.loadLayout(userId, session.serverUrl) == null) {
            refreshUser()
            val server = DashboardShelfConfig.ordered(DashboardShelfConfig.parse(rawConfig()))
            localLayoutStore.saveLayout(userId, session.serverUrl, server)
        }
        localLayoutStore.setEnabled(userId, session.serverUrl, enabled)
    }

    /** Ordered, enabled-filtered-by-caller shelf entries for the signed-in user (or the defaults
     * when signed out or the server has no config - see [DashboardShelfConfig.parse]). Re-reads the
     * user from the server first: the session copy is only fetched at sign-in, so shelves added or
     * reordered on the web would otherwise never appear (and a save would overwrite them). Falls
     * back to the cached copy offline. When the per-device layout is on, the server list is only
     * used to merge in new/removed shelves (see [DashboardShelfConfig.mergedWithLocalLayout]); the
     * merged result is written back locally so appended shelves keep a stable position. */
    suspend fun shelves(): List<ShelfConfigEntry> {
        refreshUser()
        val server = DashboardShelfConfig.ordered(DashboardShelfConfig.parse(rawConfig()))
        val userId = session.currentUser?.id
        if (userId == null || !localLayoutStore.isEnabled(userId, session.serverUrl)) {
            Log.i(TAG, "shelves from server: ${describe(server)}")
            return server
        }
        val local = localLayoutStore.loadLayout(userId, session.serverUrl) ?: server
        val merged = DashboardShelfConfig.ordered(DashboardShelfConfig.mergedWithLocalLayout(server, local))
        if (merged != local) localLayoutStore.saveLayout(userId, session.serverUrl, merged)
        Log.i(TAG, "shelves from local layout: ${describe(merged)}")
        return merged
    }

    /** The user's configured external (reading-service) shelves, enabled-filtered-by-caller, in
     * order - or `null` when the server has no `externalShelves` config at all (older server, or
     * never opened the web picker), so the caller can fall back to its own default. Re-reads the
     * user first, same rationale as [shelves]. Not affected by the per-device layout toggle:
     * Customize Dashboard doesn't edit external shelves, so they always follow the server. */
    suspend fun externalShelves(): List<com.bookorbit.core.model.ExternalShelfConfig>? {
        refreshUser()
        return DashboardShelfConfig.parseExternalShelves(rawConfig())
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
        val userId = session.currentUser?.id
        if (userId != null && localLayoutStore.isEnabled(userId, session.serverUrl)) {
            val ordered = DashboardShelfConfig.ordered(entries)
            Log.i(TAG, "saving shelves locally: ${describe(ordered)}")
            localLayoutStore.saveLayout(userId, session.serverUrl, ordered)
            _saved.tryEmit(Unit)
            return@runCatching
        }
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
