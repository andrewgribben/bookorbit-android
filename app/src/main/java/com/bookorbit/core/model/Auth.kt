package com.bookorbit.core.model

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.booleanOrNull

/** The authenticated user as returned by the server. */
@Serializable
data class AuthUser(
    val id: Int,
    val username: String,
    val name: String? = null,
    val email: String? = null,
    val active: Boolean = true,
    val isSuperuser: Boolean = false,
    val isDefaultPassword: Boolean = false,
    val avatarUrl: String? = null,
    val provisioningMethod: String = "local",
    val permissions: List<String> = emptyList(),
    /** Server-side arbitrary user settings (`AuthService.buildUserResponse`'s `settings`). Only a
     * few keys are read on the app side so far - see [syncReaderPreferences]. */
    val settings: JsonObject? = null,
)

/** The web's "sync reader preferences" user setting (`user.settings.syncReaderPreferences`,
 * toggled server-side by `PATCH /api/v1/users/me/reader-storage-mode`). Off/missing = device-only. */
val AuthUser.syncReaderPreferences: Boolean
    get() = (settings?.get("syncReaderPreferences") as? JsonPrimitive)?.booleanOrNull ?: false

/** Body of `PATCH /api/v1/users/me/settings` (`user.controller.ts:92-95`, `update-me-settings.dto.ts`):
 * merges [settings] into the user's server-side settings jsonb. Only the keys present here change -
 * every other settings key the app doesn't send is left untouched server-side. */
@Serializable
data class UpdateMeSettingsRequest(val settings: JsonObject)

/** Response of `PATCH /api/v1/users/me/settings` (`user.service.ts:231-246`): the merged settings,
 * not a full user - other [AuthUser] fields aren't returned, so this isn't decoded as one. */
@Serializable
data class MeSettingsResponse(val id: Int, val settings: JsonObject? = null)

@Serializable
data class LoginRequest(val username: String, val password: String)

@Serializable
data class LoginResponse(val accessToken: String, val user: AuthUser)

/** `POST /auth/refresh` response. The refresh token itself rides as an HTTP-only cookie. */
@Serializable
data class RefreshResponse(val accessToken: String)

@Serializable
data class SetupStatus(val needsSetup: Boolean)

@Serializable
data class OidcProviderPublic(
    val slug: String,
    val displayName: String,
    val enabled: Boolean,
    val iconUrl: String? = null,
    val clientId: String,
    val scopes: String,
)

@Serializable
data class OidcStateResponse(
    val state: String,
    val authorizationEndpoint: String,
)

@Serializable
data class OidcCallbackRequest(
    val code: String,
    val codeVerifier: String,
    val redirectUri: String,
    val nonce: String,
    val state: String,
)

@Serializable
data class OidcCallbackResponse(
    val mode: String = "login",
    val accessToken: String,
    val user: AuthUser,
)
