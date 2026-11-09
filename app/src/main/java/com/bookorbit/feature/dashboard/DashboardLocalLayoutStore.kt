package com.bookorbit.feature.dashboard

import android.content.Context
import androidx.datastore.preferences.core.booleanPreferencesKey
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import com.bookorbit.core.model.DashboardShelfConfig
import com.bookorbit.core.model.DashboardShelfRow
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.flow.first
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonObject
import java.security.MessageDigest
import javax.inject.Inject
import javax.inject.Singleton

private val Context.dashboardLocalLayoutDataStore by preferencesDataStore("dashboard_local_layout")

/**
 * Per-device home shelf layout ("use this device's layout"): an on/off flag plus the locally
 * stored shelf list - both scrollers and external shelves, on the same merged order as the
 * server copy (see [DashboardShelfConfig.mergedRows]) - keyed by signed-in user id + server, so
 * switching accounts or servers on the same install never mixes layouts. Stored independently of
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

    private suspend fun storedJson(userId: Int, serverUrl: String?): JsonObject? {
        val raw = context.dashboardLocalLayoutDataStore.data.first()[layoutKey(scope(userId, serverUrl))] ?: return null
        return runCatching { json.parseToJsonElement(raw) as? JsonObject }.getOrNull()
    }

    /** The stored local layout (scrollers and external shelves, merged order), or null when
     * nothing has been seeded yet for this user/server. */
    suspend fun loadRows(userId: Int, serverUrl: String?): List<DashboardShelfRow>? {
        val obj = storedJson(userId, serverUrl) ?: return null
        return DashboardShelfConfig.mergedRows(obj)
    }

    /** True when [loadRows] has an explicit (possibly empty) `externalShelves` array stored -
     * distinct from "never seeded", same nullable contract as [DashboardShelfConfig.parseExternalShelves]. */
    suspend fun hasExternalShelvesKey(userId: Int, serverUrl: String?): Boolean =
        storedJson(userId, serverUrl)?.get("externalShelves") is JsonArray

    suspend fun saveRows(userId: Int, serverUrl: String?, rows: List<DashboardShelfRow>) {
        val configJson = DashboardShelfConfig.buildConfigJsonForRows(null, rows)
        context.dashboardLocalLayoutDataStore.edit { it[layoutKey(scope(userId, serverUrl))] = configJson.toString() }
    }
}
