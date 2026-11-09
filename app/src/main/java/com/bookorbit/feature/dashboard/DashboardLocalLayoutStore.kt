package com.bookorbit.feature.dashboard

import android.content.Context
import androidx.datastore.preferences.core.booleanPreferencesKey
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import com.bookorbit.core.model.DashboardShelfConfig
import com.bookorbit.core.model.ShelfConfigEntry
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.flow.first
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import java.security.MessageDigest
import javax.inject.Inject
import javax.inject.Singleton

private val Context.dashboardLocalLayoutDataStore by preferencesDataStore("dashboard_local_layout")

/**
 * Per-device home shelf layout ("use this device's layout"): an on/off flag plus the locally
 * stored shelf list, both keyed by signed-in user id + server, so switching accounts or servers
 * on the same install never mixes layouts. Stored independently of
 * [com.bookorbit.core.model.DashboardShelfConfig]'s server copy - this is the only app setting
 * with a genuine per-device, non-synced persistence.
 */
@Singleton
class DashboardLocalLayoutStore @Inject constructor(
    @ApplicationContext private val context: Context,
    private val json: Json,
) {
    private fun scope(userId: Int, serverUrl: String?): String {
        val url = serverUrl?.trim()?.trimEnd('/')?.lowercase().orEmpty()
        return MessageDigest.getInstance("SHA-256").digest("$userId|$url".toByteArray())
            .joinToString("") { "%02x".format(it) }.take(16)
    }

    private fun enabledKey(scope: String) = booleanPreferencesKey("use_local_layout_$scope")
    private fun layoutKey(scope: String) = stringPreferencesKey("local_layout_$scope")

    suspend fun isEnabled(userId: Int, serverUrl: String?): Boolean =
        context.dashboardLocalLayoutDataStore.data.first()[enabledKey(scope(userId, serverUrl))] ?: false

    suspend fun setEnabled(userId: Int, serverUrl: String?, enabled: Boolean) {
        context.dashboardLocalLayoutDataStore.edit { it[enabledKey(scope(userId, serverUrl))] = enabled }
    }

    /** The stored local layout, or null when nothing has been seeded yet for this user/server. */
    suspend fun loadLayout(userId: Int, serverUrl: String?): List<ShelfConfigEntry>? {
        val raw = context.dashboardLocalLayoutDataStore.data.first()[layoutKey(scope(userId, serverUrl))] ?: return null
        val obj = runCatching { json.parseToJsonElement(raw) as? JsonObject }.getOrNull() ?: return null
        val scrollers = obj["scrollers"] ?: return null
        return DashboardShelfConfig.parse(JsonObject(mapOf("scrollers" to scrollers)))
    }

    suspend fun saveLayout(userId: Int, serverUrl: String?, entries: List<ShelfConfigEntry>) {
        val configJson = DashboardShelfConfig.buildConfigJson(null, entries)
        context.dashboardLocalLayoutDataStore.edit { it[layoutKey(scope(userId, serverUrl))] = configJson.toString() }
    }
}
