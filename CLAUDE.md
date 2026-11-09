# Agent notes

## Related Repository: Server and Web

- This app is the native client for the BookOrbit server, a separate repo: `andrewgribben/bookorbit` (integration branch `development`), checked out at `D:/Development/bookorbit` on the owner's PC. Its task worktrees go in `D:/Development/bookorbit-worktrees/<branch>`.
- The API contract (endpoints, DTOs, shared types in `packages/types/`) is defined there. Before changing a request or response model here, read the server side; if the server needs a change, make it there first in its own worktree.
- A feature that spans both repos gets one worktree per repo with matching branch names. Land and deploy the server side first, then build the app against it.
- Plans and handover docs for both repos live in the server repo (`docs/plans/`, `docs/AGENT_HANDOFF.md`). Read them with `git -C D:/Development/bookorbit show origin/development:<path>`.
- Conventions for server-side work are in that repo's `AGENTS.md`.

## This Repo

- Build and setup: see `README.md`. Checks: `./gradlew :app:testFullDebugUnitTest :app:lintFullDebug :app:assembleFullDebug`.
- Conventional commits. Never add a `Co-authored-by` trailer. No em dashes anywhere.
- Never open PRs or issues upstream; this fork's PRs target `main`.
