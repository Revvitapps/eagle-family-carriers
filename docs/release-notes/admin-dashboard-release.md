# Admin & driver dashboards release

**Date:** 2025-01-07  
**Scope:** Fuel guidance pilot owner dashboard, driver dashboard, Chrome capture helper, multi-admin / driver authentication, CSV + capture ingestion APIs.

## Highlights

- `/admin` now renders the owner dashboard (`src/app/admin/page.tsx`) with KPI tiles, login workflow, CSV/API upload stubs, watchlist alerts, and Chrome-capture counter (captures route through `/api/chrome-capture`).  
- A new `driver.eaglefamilycarriers.com` surface at `/driver` shows driver KPIs and the live capture feed, reusing the same `chrome-capture` API to keep both screens synchronized.  
- Authentication is powered by `src/lib/auth-users.ts` plus `bcryptjs`, allowing multiple admin/driver credentials defined via `ADMIN_USERS`/`DRIVER_USERS` (see `docs/auth-management.md`). Added `/api/admin/reset` for generating new hashes safely.  
- Chrome extension (`chrome-extension/`) is locked to `admin.eaglefamilycarriers.com`, posts capture events, and fires `efcAdminCapture` so dashboards can ingest metadata.
- Supporting docs (`docs/fuel-analysis/settlement-summary.md`) summarize the CSV/PDF fuel evidence you dropped so the dashboard storytelling stays aligned with the SOW.

## Env vars

Set the following (see full details in `docs/auth-management.md`):

1. `ADMIN_USERS` (JSON array of `{ username, passwordHash, roles }` for up to 3–5 admins). Use `npm run hash-admin-password <pass>` to generate `passwordHash`.
2. `DRIVER_USERS` (same format, automatically applied the `driver` role).
3. `ADMIN_RESET_SECRET` for hitting `/api/admin/reset` when you need new hashes.
4. `ADMIN_USERNAME`/`ADMIN_PASSWORD_HASH` (fallback legacy account; optional if `ADMIN_USERS` populated).
5. Any database/Neon connection strings remain unchanged for now.

## Deployment notes

- The repo already contains the release commit tagged `feat: add admin driver dashboards and auth` (`main` branch).  
- Vercel should auto-deploy on push; if you need a manual push use `npx vercel --prod` from the repo root and confirm the `ADMIN_*` env vars exist for that project.  
- After deployment, verify `/admin`, `/driver`, the Chrome extension capture flow, and `/api/admin/reset` (authenticated via `ADMIN_RESET_SECRET`) all respond correctly.

