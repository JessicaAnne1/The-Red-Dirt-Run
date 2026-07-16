# The Red Dirt Run — build status

## Current sprint

Sprint 4 — ready for GitHub Pages publishing.

## Completed work

- Created the locked frontend and Apps Script directory structure.
- Implemented a mobile-first PWA shell, identity gate, routed four-tab UI, drill-ins and bottom sheets.
- Added official 2026 packing seeds, group suggestions, crews, people, tasks and trip placeholders.
- Implemented IndexedDB cache/outbox, a mock adapter, optimistic local operations and reconnect sync.
- Implemented Apps Script workbook bootstrap, API, locking, version conflict handling, idempotent operations and smoke tests.
- Added shared Spotify playlist links with an oEmbed thumbnail preview and offline-safe saved link records.
- Connected the frontend to the live Apps Script deployment and verified its bootstrap response.
- Added editable/completeable Tasks and editable Trip legs for venues, fuel, stays, pubs and rendezvous points.

## Verification

- `npm test` passed: 66 seeded items with required stable fields; five crews; nine people.
- Mock sync test passed: three replays return one stored result, two crew contributions succeed, stale version returns a conflict.
- Frontend JavaScript syntax checks passed for all modules.
- The service worker caches the shell and uses network-first fallback; IndexedDB retains the bootstrap cache and queued operations.
- Live bootstrap verified: two seeded tasks, three seeded trip legs, playlist link collection and Curt’s stable crew ID are present.

## Assumptions / defaults

- `Bisho` remains the editable display name.
- Google Maps links are editable placeholders; no address is stored.
- Apps Script web-app URL remains blank until Jessica deploys it.
- Loaded state is enabled by default.

## Genuine blockers

- GitHub repository/Pages publishing permission is required for the installable public app URL and final release testing.
