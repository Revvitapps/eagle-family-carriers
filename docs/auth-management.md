# Admin auth & password reset guide

## Env vars you must set

1. `ADMIN_USERS` (required for multi-admin access): JSON array of objects with `username`, `passwordHash`, and optional `roles`. Example entry:
   ```json
   [
     {
       "username": "Admin1",
       "passwordHash": "$2b$10$...",
       "roles": ["admin"]
     },
     {
       "username": "Admin2",
       "passwordHash": "$2b$10$...",
       "roles": ["admin", "driver"]
     }
   ]
   ```
   Every object must include a bcrypt hash—use the `npm run hash-admin-password <plain>` helper to generate one each time you rotate a password.

2. `DRIVER_USERS` (optional): same format as `ADMIN_USERS`, but entries automatically receive the `driver` role. Use this when you want driver-specific logins for `driver.eaglefamilycarriers.com`.

3. `ADMIN_RESET_SECRET`: a random secret string that protects the `/api/admin/reset` endpoint. Without this value, resets are disabled.

4. `ADMIN_USERNAME` / `ADMIN_PASSWORD_HASH` (fallback): your legacy single-account values; they default to `ops@eaglefamilycarriers.com` / `fuelPilot!` if not provided. The password hash is already baked into the repo, but you can override it with a fresh bcrypt hash.

## Reset workflow

1. POST to `/api/admin/reset` with JSON `{ "username": "Admin3", "newPassword": "EagleFamily3!", "secret": "<ADMIN_RESET_SECRET value>" }`.
2. The response returns a `passwordHash` string—copy that hash into the appropriate entry inside `ADMIN_USERS` (or update `ADMIN_PASSWORD_HASH` for the fallback login).
3. Redeploy or restart your Next.js app so the new hash is loaded.

## Utilities

- `npm run hash-admin-password <password>` prints a bcrypt hash that you can paste into your env var list.
- Use the Chrome helper + driver dashboard to monitor logins; the same `verifyPassword` helper (in `src/lib/auth-users.ts`) will respect any `roles` you define.

