# The Red Dirt Run

Static GitHub Pages-ready PWA frontend in `docs/` and Google Apps Script backend in `apps-script/`.

Set `CONFIG.apiUrl` in `docs/assets/js/config.js` after deploying the Apps Script web app. Until then, the app deliberately uses an in-memory mock API and persistent IndexedDB cache/outbox.

Open `docs/` through a local HTTP server (not `file://`) for service worker and IndexedDB testing.
