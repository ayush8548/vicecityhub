# Going live with Supabase

ViceCityHub runs in two modes:

| Mode | When | Behaviour |
|------|------|-----------|
| **Mock** | No env vars set | Pages render bundled sample data; admin uses a session-only demo. Zero setup. |
| **Live** | Supabase env vars set | Pages read from Postgres; admin signs in with Supabase Auth and writes persist. |

The data layer ([`src/lib/data.ts`](../src/lib/data.ts)) automatically falls back to mock data if Supabase is unreachable, so the site never hard-fails.

---

## 1. Create the project

1. Create a project at [supabase.com](https://supabase.com).
2. In **Settings → API**, copy the **Project URL** and the **anon public** key.
3. In the app root, copy `.env.example` → `.env.local` and paste them in:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```

## 2. Create the schema

In the Supabase dashboard, open **SQL Editor** and run, in order:

1. [`migrations/0001_init.sql`](migrations/0001_init.sql) — tables, the `verification_status` enum, `updated_at` triggers, indexes, and Row Level Security.
2. [`seed.sql`](seed.sql) — the current GTA 6 content (same data the site ships with offline).

> Prefer the CLI? With the [Supabase CLI](https://supabase.com/docs/guides/cli) linked to your project:
> ```bash
> supabase db push        # applies migrations/
> psql "$DATABASE_URL" -f supabase/seed.sql
> ```

The seed is **safe to re-run**: content tables upsert by `slug`, and the carousel is rebuilt each time.

## 3. Create an admin user

RLS lets **anyone read** but only **authenticated users write**. So every account you create is effectively an admin.

- Dashboard → **Authentication → Users → Add user** (set email + password, mark email confirmed).
- Visit `/admin`, sign in with those credentials, and you get full CRUD that persists to Postgres.

> Only create accounts for people you trust. To lock writes down to a specific
> allowlist, add an `admins(email)` table and change the write policies in
> `0001_init.sql` from `to authenticated` to a check against it.

## 4. Keeping the seed in sync

The seed is generated from [`src/lib/mock-data.ts`](../src/lib/mock-data.ts) — the single source of truth for offline content. After editing that file:

```bash
npm run gen-seed     # rewrites supabase/seed.sql
```

Day-to-day content updates after launch should go through the **`/admin` console** (writes straight to the DB); the mock data + seed are mainly for first-run and offline/dev.

---

## Deploying (Vercel)

1. Push the repo to GitHub and import it in Vercel.
2. Add the two `NEXT_PUBLIC_SUPABASE_*` env vars in the Vercel project settings.
3. Deploy. (Supabase already allows your anon key from any origin; no extra CORS setup needed for the public anon client.)

`/admin` is marked `noindex` and is force-dynamic, so it won't be cached or indexed.
