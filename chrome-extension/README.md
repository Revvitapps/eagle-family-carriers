# EFC Admin Chrome Extension

This minimal Chrome extension limits its scope to `https://admin.eaglefamilycarriers.com/*` and provides a small helper UI for capturing quick notes while browsing the admin dashboard.

## Structure

- `manifest.json`: Permissions, content scripts, and popup definition.
- `content-script.js`: Injects a floating indicator so you know the helper is active and listens for capture payloads.
- `popup.html` / `popup.js`: The action button sends a capture payload (URL + page title + timestamp) into the active tab via scripting.

## Next steps

1. Load the extension with `chrome://extensions` > "Load unpacked" and point to this directory.
2. Wire the capture payload (`efcAdminCapture` custom event) into your dashboard or backend logging pipeline.
3. Extend the extension to pull live Chrome plugin data (e.g., from the Motive load watcher) once the driver dashboard reaches feature parity.
