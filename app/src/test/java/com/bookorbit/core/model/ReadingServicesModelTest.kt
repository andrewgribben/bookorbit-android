package com.bookorbit.core.model

import kotlinx.serialization.json.Json
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * DTO mapping for the provider-parity fields (`displayName`, `description`, `iconUrl`,
 * `authMethods`, `needsReconnect`) added to `GET /reading-services`. Uses the same lenient [Json]
 * config as `NetworkModule.provideJson()` so these tests exercise the real decode behaviour.
 */
class ReadingServicesModelTest {
    private val json = Json {
        ignoreUnknownKeys = true
        explicitNulls = false
        coerceInputValues = true
    }

    @Test
    fun `a built-in provider summary with none of the new fields decodes with safe defaults`() {
        val body = """{"provider":"readwise","connected":true,"capabilities":{"status":"both"},"features":{}}"""
        val summary = json.decodeFromString<ReadingServiceSummary>(body)

        assertEquals("readwise", summary.provider)
        assertTrue(summary.connected)
        assertNull(summary.displayName)
        assertNull(summary.description)
        assertNull(summary.iconUrl)
        assertTrue(summary.authMethods.isEmpty())
        assertFalse(summary.needsReconnect)
        assertFalse(summary.hasInAppSignIn)
        assertEquals("Readwise", summary.resolvedDisplayName)
    }

    @Test
    fun `a private adapter summary decodes displayName, iconUrl and authMethods`() {
        val body = """
            {
              "provider": "readwise-social",
              "connected": false,
              "capabilities": {"friends_shelf": "read"},
              "features": {},
              "displayName": "Readwise Social",
              "description": "Friends activity",
              "iconUrl": "https://example.com/icon.png",
              "needsReconnect": true,
              "authMethods": [
                {"kind": "password", "label": "Sign in", "fields": {
                  "username": {"label": "Email"},
                  "password": {"label": "Password", "placeholder": "••••"}
                }},
                {"kind": "token", "label": "API token", "placeholder": "token..."},
                {"kind": "device_code", "label": "Device code"}
              ]
            }
        """.trimIndent()
        val summary = json.decodeFromString<ReadingServiceSummary>(body)

        assertEquals("Readwise Social", summary.displayName)
        assertEquals("Readwise Social", summary.resolvedDisplayName)
        assertEquals("Friends activity", summary.description)
        assertEquals("https://example.com/icon.png", summary.iconUrl)
        assertTrue(summary.needsReconnect)
        assertTrue(summary.hasInAppSignIn)
        assertEquals(3, summary.authMethods.size)

        val password = summary.authMethods[0]
        assertEquals(ReadingServiceAuthMethod.PASSWORD, password.kind)
        assertEquals("Email", password.fields?.username?.label)
        assertEquals("Password", password.fields?.password?.label)
        assertEquals("••••", password.fields?.password?.placeholder)

        val token = summary.authMethods[1]
        assertEquals(ReadingServiceAuthMethod.TOKEN, token.kind)
        assertEquals("token...", token.placeholder)
        assertNull(token.fields)

        assertEquals(ReadingServiceAuthMethod.DEVICE_CODE, summary.authMethods[2].kind)
    }

    @Test
    fun `device auth start and poll results decode with absent optional fields`() {
        val start = json.decodeFromString<ReadingServiceDeviceAuthStart>(
            """{"verificationUrl":"https://example.com/device","expiresAt":"2026-01-01T00:00:00Z"}""",
        )
        assertNull(start.userCode)
        assertEquals(5, start.pollIntervalSeconds)

        val pending = json.decodeFromString<ReadingServiceDeviceAuthPollResult>("""{"status":"pending"}""")
        assertEquals("pending", pending.status)
        assertNull(pending.accountLabel)
        assertNull(pending.message)

        val approved = json.decodeFromString<ReadingServiceDeviceAuthPollResult>(
            """{"status":"approved","accountLabel":"jane@example.com"}""",
        )
        assertEquals("jane@example.com", approved.accountLabel)
    }

    @Test
    fun `a rejected password login decodes ok false with a reason, never a credential`() {
        val rejected = json.decodeFromString<ReadingServicePasswordLoginResult>(
            """{"ok":false,"reason":"invalid","message":"Bad username or password"}""",
        )
        assertFalse(rejected.ok)
        assertEquals("invalid", rejected.reason)
        assertEquals("Bad username or password", rejected.message)
    }
}
