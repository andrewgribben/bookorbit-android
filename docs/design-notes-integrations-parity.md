# Design note: Integrations parity (private adapter sign-in)

Card: Android parity for reading-services provider parity. Follows `design-taste-frontend`'s
native-mobile guidance (platform conventions, existing Material 3 components, no web-page rules
applied to native screens).

## What this adds

1. **Settings > Integrations** becomes a full list (`IntegrationsListScreen`) instead of a single
   "Manage on the web" row. It renders every provider from `GET /reading-services`, built-in
   (Readwise, Hardcover) and private adapters alike, by `resolvedDisplayName` (falls back to the
   provider id when the server sends no `displayName`), with a status line and a "Needs
   reconnect" indicator. This reuses the existing `ListItem`/`SettingsRow` grammar already in
   `SettingsScreen.kt` - no new visual language, no icon-topped cards, no gradients.
2. Tapping a provider row opens `ProviderDetailScreen`:
   - **Built-ins with no `authMethods`** (today: Readwise, Hardcover) keep exactly today's
     behaviour - a "Manage on the web" row that opens the existing web settings URL. Feature
     toggles stay read-only on Android, unchanged, per the card.
   - **A private adapter with `authMethods`** gets an in-app sign-in section:
     - Not connected: a method picker (segmented, Material 3 `SegmentedButton`, same component
       `SettingsScreen.kt` already uses for theme/reader-interface) when more than one method is
       offered, in the server's own `authMethods` order. Below it, the form for the selected
       method:
       - `password`: two `OutlinedTextField`s with `Modifier.semantics` autofill hints
         (`ContentType.Username` / `ContentType.Password`), a trailing visibility-toggle icon on
         the password field, submit button. The password is cleared from `ViewModel` state
         immediately after the submit call resolves (success or failure) - it is never logged,
         never retained.
       - `token`: one masked `OutlinedTextField` with a reveal toggle, submit button.
       - `device_code`: a large, centred, selectable `userCode`, a "Copy code" action
         (`ClipboardManager`), a "Continue in browser" action that opens `verificationUrl` in a
         Custom Tab (`androidx.browser`, newly added dependency), and a live status line
         (waiting/approved/expired/denied/error) driven by polling the server every
         `pollIntervalSeconds`. Polling is scoped to the `ViewModel` and explicitly cancelled when
         the screen is left (`DisposableEffect` -> `onScreenLeft()`), never leaking past the
         composable's lifecycle.
     - Connected: account label (when known for this session - the server's summary endpoint does
       not currently return one, only the connect/poll responses do; see Assumptions below),
       "Switch account" (disconnect then return to the method picker) and "Disconnect" behind a
       confirmation `AlertDialog`, matching the existing `confirmClearDownloads` pattern in
       `SettingsScreen.kt`.
3. Provider icon: `iconUrl` renders through Coil's `AsyncImage` when it is an `http(s)://` URL. A
   `data:image/svg+xml` URL is detected and **not** passed to Coil (this app has no SVG decoder
   registered - adding `coil-svg` was out of scope for this card); the row falls back to the name
   only, matching the card's "no crash" requirement. Any other scheme (unexpected) also falls back
   to name-only.

## Assumptions / gaps carried over from the server stage

- `GET /reading-services` has no `accountLabel` field today. "Connected as X" is only shown for
  the current app session, right after a successful connect/poll/switch-account call returns one;
  reopening the app (or the screen, after process death) shows a generic "Connected" line instead
  of a remembered label. Flagging this rather than inventing a field that does not exist.
- There is no dedicated "disconnect" affordance for the two built-in providers through this API
  (`DELETE /reading-services/:provider/auth` exists for any adapter including built-ins per the
  controller code, but the "Manage on the web" built-in path is left exactly as it was - out of
  scope for this card, which is about *private adapter* parity).
