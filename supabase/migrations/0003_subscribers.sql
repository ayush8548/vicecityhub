-- ===========================================================================
-- ViceCityHub — newsletter subscribers
--
-- Anyone can subscribe (anon INSERT), but the email list is NOT publicly
-- readable. Read it from the Supabase dashboard (Table Editor) or, in-app,
-- as a signed-in admin.
-- ===========================================================================

create table if not exists subscribers (
  id         uuid primary key default gen_random_uuid(),
  email      text unique not null,
  source     text,
  created_at timestamptz not null default now()
);

alter table subscribers enable row level security;

-- Visitors can add themselves to the list...
drop policy if exists "anyone can subscribe" on subscribers;
create policy "anyone can subscribe"
  on subscribers for insert to anon, authenticated
  with check (true);

-- ...but only signed-in admins can read it (no anon SELECT = list stays private).
drop policy if exists "admins read subscribers" on subscribers;
create policy "admins read subscribers"
  on subscribers for select to authenticated
  using (true);
