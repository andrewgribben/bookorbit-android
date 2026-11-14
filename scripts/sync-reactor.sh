#!/usr/bin/env bash
# Syncs the Reactor WebView bundle (and its protocol fixtures) from a pinned ref of the Reactor
# repo into this repo, per docs' A1 task (reactor repo: docs/SPEC.md section 5, docs/PLAN.md Q3).
#
# Builds in a temporary git worktree so this repo never depends on the reactor checkout's working
# directory state (branch, dirty files, node_modules) staying put.
#
# Usage: scripts/sync-reactor.sh <git-tag-or-commit> [reactor-repo-path]
#   <git-tag-or-commit>   Required. A ref in the reactor repo to build and pin.
#   [reactor-repo-path]   Optional. Defaults to D:/Development/reactor.
#
# Writes:
#   app/src/main/assets/reactor/                 the built bundle (dist/android/)
#   app/src/test/resources/reactor-fixtures/events/  a copy of src/protocol/fixtures/events/
#   reactor.version                              "ref=<ref>\nversion=<bundle version>\n"
set -euo pipefail

usage() {
  echo "Usage: $0 <git-tag-or-commit> [reactor-repo-path]" >&2
  echo "  Builds the Reactor Android bundle from a pinned ref in a temporary git worktree" >&2
  echo "  of the reactor repo, and copies it into this repo's app/ module." >&2
  exit 1
}

if [ "$#" -lt 1 ] || [ "$#" -gt 2 ]; then
  usage
fi

REF="$1"
if [ -z "$REF" ]; then
  usage
fi
REACTOR_REPO="${2:-D:/Development/reactor}"

if ! git -C "$REACTOR_REPO" rev-parse --git-dir >/dev/null 2>&1; then
  echo "error: '$REACTOR_REPO' is not a git repository" >&2
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

WORKTREE_DIR="$(mktemp -d "${TMPDIR:-/tmp}/sync-reactor.XXXXXX")"
rmdir "$WORKTREE_DIR" # git worktree add requires the target not to exist yet
cleanup() {
  git -C "$REACTOR_REPO" worktree remove --force "$WORKTREE_DIR" >/dev/null 2>&1 || true
  rm -rf "$WORKTREE_DIR"
}
trap cleanup EXIT

echo "Adding a worktree of '$REACTOR_REPO' at '$REF'..."
git -C "$REACTOR_REPO" worktree add --detach "$WORKTREE_DIR" "$REF"

echo "Installing dependencies (pnpm install --frozen-lockfile)..."
(cd "$WORKTREE_DIR" && pnpm install --frozen-lockfile)

HAS_BUILD_ANDROID="$(cd "$WORKTREE_DIR" && node -e "
const pkg = require('./package.json');
process.stdout.write(pkg.scripts && pkg.scripts['build:android'] ? 'yes' : 'no');
")"
if [ "$HAS_BUILD_ANDROID" != "yes" ]; then
  echo "error: reactor's package.json at ref '$REF' has no 'build:android' script." >&2
  echo "       This task (A1) depends on R4 adding it; nothing was copied." >&2
  exit 1
fi

echo "Building the Android bundle (pnpm build:android)..."
(cd "$WORKTREE_DIR" && pnpm build:android)

DIST_DIR="$WORKTREE_DIR/dist/android"
if [ ! -d "$DIST_DIR" ]; then
  echo "error: expected '$DIST_DIR' after 'pnpm build:android' but it does not exist." >&2
  exit 1
fi

VERSION_FILE="$DIST_DIR/reactor-version.json"
if [ ! -f "$VERSION_FILE" ]; then
  echo "error: '$VERSION_FILE' is missing; the bundle has no version stamp." >&2
  exit 1
fi

BUNDLE_VERSION="$(node -e "
const fs = require('fs');
const v = JSON.parse(fs.readFileSync('$VERSION_FILE', 'utf8')).version;
process.stdout.write(v || '');
")"
if [ -z "$BUNDLE_VERSION" ]; then
  echo "error: '$VERSION_FILE' has no 'version' field." >&2
  exit 1
fi

ASSETS_DIR="$REPO_ROOT/app/src/main/assets/reactor"
FIXTURES_DIR="$REPO_ROOT/app/src/test/resources/reactor-fixtures/events"

echo "Copying the bundle into $ASSETS_DIR ..."
rm -rf "$ASSETS_DIR"
mkdir -p "$ASSETS_DIR"
cp -R "$DIST_DIR/." "$ASSETS_DIR/"

echo "Copying protocol fixtures into $FIXTURES_DIR ..."
rm -rf "$FIXTURES_DIR"
mkdir -p "$FIXTURES_DIR"
cp -R "$WORKTREE_DIR/src/protocol/fixtures/events/." "$FIXTURES_DIR/"

PIN_FILE="$REPO_ROOT/reactor.version"
{
  echo "ref=$REF"
  echo "version=$BUNDLE_VERSION"
} > "$PIN_FILE"

echo "Done. Pinned ref=$REF version=$BUNDLE_VERSION in $PIN_FILE"
