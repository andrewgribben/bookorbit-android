# Handover: read-aloud page → audiobook sync (first narrated sentence)

Date: 2026-11-05. Nothing in this stack is pushed. `main` = origin/main `b7ad909` (PR #9).

## Where things are

| Worktree (`C:/Users/grib/orca/workspaces/bookorbit-android/…`) | Branch | Tip | State |
|---|---|---|---|
| `readaloud-first-sentence` | `fix/readaloud-first-sentence` | from `device/integration-2` `50650f8` | **new, this task** |
| `integration2` | `device/integration-2` | `50650f8` | all branches below merged; 469 tests pass; installed on the Fold 13:05 |
| `readaloud-sync` | `fix/readaloud-position-sync` | `75a4fee` | read-aloud sync fixes + play-start refresh (all play sources) |
| `reader-newer-position` | `feat/reader-newer-position` | `d93c9db` | stacked on readaloud-sync; "Continue from another device?" prompt (EPUB) |
| `home-shelves` | `feat/home-shelves` | `1da6c01` | Want to read / Up next in series shelves |
| `reader-peek` | `feat/reader-peek` | `9f7d9b9` | Peek mode; single eye toggle in reader top bar |
| `library-search` | `feat/library-search-sort` | `7786874` | Library search + quick sort (Books/Series/Authors) |
| `wallpaper-fix` | `fix/wallpaper-manual-follow` | `594c960` | manual "set as wallpaper" updates the follow baseline |

All worktrees were clean when this was written. Build/test: `./gradlew :app:testFullDebugUnitTest :app:assembleFullDebug`
(APK `app/build/outputs/apk/full/debug/app-full-debug.apk`, package `com.bookorbit.debug`).

Device: Galaxy Fold (SM_F971B). Use the SDK adb (`$ANDROID_HOME/platform-tools/adb.exe`) and the serial
`adb-R3GL70730SP-8GcuvH._adb-tls-connect._tcp` (check `adb mdns services`). If adb hangs, `adb kill-server`
and retry. The `192.168.5.12x:5555 unauthorized` entry is a different device. Off-LAN, the user supplies a
Tailscale pairing `ip:port code` → `adb pair`, then use the `_adb-tls-connect` serial.

## The bug (confirmed with device logs + the book's own files)

Book: *Iron Gold* (book 72). Files: read-aloud EPUB 38143 (primary, has media overlays), plain EPUB 215,
m4b 23390 (84,205 s; the overlay total is 84,205.4 s, so no duration drift). `readAloudSync.state = enabled`.

User steps: at Chapter 16 (web and phone agree) → leave the book → Listen → audio starts at **Chapter 15**
→ reopen the EPUB → it is now at Chapter 15 too. No prompt.

Evidence:
- 13:13:22 the reader POSTed the Chapter 16 position (`books/files/38143/progress`, 201); within 0.1 s the
  server rewrote the audiobook state (playback-state `updatedAt` 1793884402626).
- 13:20 Listen resumed from that server state; after ~7 s of play the local audio row is 18,107 s.
- From the EPUB's OPF `media:duration` per overlay: Ch 15 (`c015`, Lysander) starts at 18,102.6 s; Ch 16
  (`c016`, Darrow) at 19,232.5 s. So the **server mapped the Chapter 16 page to the start of Chapter 15**.
- Play then reported Ch 15 with a fresh timestamp; the server mapped it back onto the EPUB; newest wins →
  reader opens at `epubcfi(/6/46!…[c015-s15]…)`.

Server cause (upstream BookOrbit, source cloned at `%LOCALAPPDATA%/Temp/bo-server`):
`server/src/modules/book/audiobook-ebook-progress-sync.service.ts` `syncFromEbookProgress` →
`resolveOverlaySecondsFromEbookPosition`. With only a CFI it guesses via `nearestNarratedFragment`
("last narrated sentence that starts at or before the position", with an adjacent-section fallback). A page
at the very top of a chapter evidently resolves one chapter back. **Unconfirmed which branch misfires**; a
middle-of-chapter test would tell (not done yet).

The server already accepts exact locators and uses them first (same function):
- `hasNarration && positionSeconds && (mediaOverlayFragment || mediaOverlaySectionIndex)` → uses `positionSeconds`.
- `hasNarration && mediaOverlayFragment` → `findItemStartByFragment(playlist, fragment, sectionIndex)`.

`SaveProgressDto` (`dto/save-progress.dto.ts`): `source?: 'text' | 'narration'`, `cfi`, `percentage`,
`positionSeconds`, `mediaOverlayFragment` (≤4096), `mediaOverlaySectionIndex`. In `book.service.ts` ~2505:
locators are dropped when `source === 'text'`; `advanceNarrationToText` runs when `source !== 'narration'`.
The app currently sends no `source` and no locators (`SaveFileProgress(cfi, percentage, pageNumber)` in
`app/src/main/java/com/bookorbit/core/model/Book.kt:169`).

## The task (approved by the user)

For read-aloud EPUBs only: every page-position save also sends the **first narrated sentence visible on the
page** (`mediaOverlayFragment` = its text fragment id, plus `mediaOverlaySectionIndex`), so the server maps
page → audio exactly instead of guessing. This is the user's own spec: "read-aloud starts at the first
sentence of the page, so we have the data to know where audio should start".

Pointers:
- `app/src/main/assets/reader/bridge.js` already has `firstVisibleTextHref(items, sectionIndex)` (used to
  start narration on the current page) and builds `items` from every section's SMIL in
  `buildNarrationTimeline`. The relocate listener is at ~line 703. Narration items are only built on
  `narrationPrepare`; page saves happen without narration running, so derive the fragment from the current
  section's SMIL on relocate (cache per section) rather than requiring the full timeline.
- Fragment id format the server expects: compare with `findItemStartByFragment`/`itemMatchesFragment` and
  the playlist builder (`textFragment`) server-side; check whether it wants `c016-s0` or the full href.
  `mediaOverlaySectionIndex` must use the **server playlist's** `sectionIndex` numbering — verify (spine
  index vs. overlay-only index) before sending; send fragment only if unsure.
- Kotlin path: bridge `relocate` message → `ReaderViewModel.onRelocate` (~line 435) → `report()`/`flush()`
  → `ReaderProgressRepository.report` (+ `flushPending`, `syncBeforeWeb`, and the `onCleared` appScope
  write) → `SaveFileProgress`. Room `reader_progress` stores cfi/percentage/pageNumber only; offline-queued
  saves need the fragment too (add a nullable column + migration) or the fix silently disappears offline.
- Decide `source`: leave it unset (server treats it as text + locators). Do **not** send `'narration'` for a
  page turn (it skips `advanceNarrationToText`). Check with the server test
  `audiobook-ebook-progress-sync.service.test.ts` ("maps an EPUB position to revision-safe audiobook
  progress…", "follows the text position of a plain EPUB that sends back a narration marker…").
- Plain EPUB 215 has no overlays: send nothing extra there.

Test plan:
1. Unit-test the pure part (picking the first visible fragment / building the request) and the repository
   payload. 2. On the Fold with Iron Gold: open Ch 16 at the chapter top → leave → Listen → must start at
   Ch 16 s0 (≈19,232 s). Repeat mid-chapter. 3. Confirm the reverse (listen → open EPUB) still lands on the
   spoken sentence. Pull logs with `adb logcat -d --pid=$(adb shell pidof com.bookorbit.debug)`; tags
   `ReaderViewModel`, `ReaderProgressRepo`, `AudioProgressRepo`, okhttp.

## Other open items (not this task)

- **Wallpaper "follow current book" not changing.** App settings on device: follow = on,
  `cover_wallpaper_followed_book_id = 72`, so backgrounding after Iron Gold is skipped by design
  (`CoverWallpaperFollow.shouldApply`). Unknown why 72 was recorded while the user sees no Iron Gold
  wallpaper: either `CoverWallpaper.apply` set FLAG_SYSTEM|FLAG_LOCK on the inner display only (Fold cover
  screen has its own wallpaper), or `NO_COVER` was counted as followed. Asked the user which screen; no
  answer yet. Possible fix: clear the followed id when the setting is toggled; record only on `SET`.
- **No prompt on open when ebook and audio disagree.** The server merges positions before the app sees
  them, so the "Continue from another device?" prompt (resume-only, like web) can't fire on a fresh open.
  User asked for one; deferred until the first-sentence fix makes the positions agree.
- QA nits left: dialog blocks system Back (web parity); 300 ms debounce delays first library list load.
- Known limit: notification/Bluetooth scrubs during the play-start refresh don't cancel its seek.
