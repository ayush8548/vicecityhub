-- ===========================================================================
-- ViceCityHub — initial schema
--
-- Column names are snake_case; the app's data layer maps them to camelCase
-- (see src/lib/data.ts mapRow + src/components/admin/EntityManager.tsx toSnake).
--
-- Verification status mirrors src/lib/types.ts:
--   'confirmed' | 'trailer_inferred' | 'speculation'
-- ===========================================================================

-- Status enum (kept as a CHECK so the values match the TS union exactly).
create type verification_status as enum ('confirmed', 'trailer_inferred', 'speculation');

-- Auto-touch updated_at on every UPDATE.
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- --------------------------------------------------------------------------
-- NEWS
-- --------------------------------------------------------------------------
create table news (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  title        text not null,
  description  text,
  body         text,
  excerpt      text,
  category     text,
  author       text,
  images       text[] not null default '{}',
  read_minutes integer not null default 3,
  trending     boolean not null default false,
  status       verification_status not null default 'speculation',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- --------------------------------------------------------------------------
-- GUIDES
-- --------------------------------------------------------------------------
create table guides (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  description text,
  body        text,
  category    text,
  difficulty  text not null default 'Beginner',
  featured    boolean not null default false,
  images      text[] not null default '{}',
  status      verification_status not null default 'speculation',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- --------------------------------------------------------------------------
-- VEHICLES
-- --------------------------------------------------------------------------
create table vehicles (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  title        text not null,
  description  text,
  body         text,
  class        text,
  manufacturer text,
  top_speed    integer not null default 0,
  images       text[] not null default '{}',
  status       verification_status not null default 'speculation',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- --------------------------------------------------------------------------
-- CHARACTERS
-- --------------------------------------------------------------------------
create table characters (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  description text,
  body        text,
  role        text,
  affiliation text,
  voice_actor text,
  images      text[] not null default '{}',
  status      verification_status not null default 'speculation',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- --------------------------------------------------------------------------
-- LOCATIONS
-- --------------------------------------------------------------------------
create table locations (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  description text,
  body        text,
  region      text,
  type        text,
  coordinates jsonb,            -- { "x": number, "y": number } (0-100)
  images      text[] not null default '{}',
  status      verification_status not null default 'speculation',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- --------------------------------------------------------------------------
-- CAROUSEL ITEMS (homepage banner)
-- --------------------------------------------------------------------------
create table carousel_items (
  id       uuid primary key default gen_random_uuid(),
  title    text not null,
  category text,
  image    text,
  href     text,
  date     timestamptz not null default now(),
  "order"  integer not null default 0,
  active   boolean not null default true,
  status   verification_status not null default 'confirmed'
);

-- updated_at triggers (carousel has no updated_at column)
create trigger trg_news_updated       before update on news       for each row execute function set_updated_at();
create trigger trg_guides_updated     before update on guides     for each row execute function set_updated_at();
create trigger trg_vehicles_updated   before update on vehicles   for each row execute function set_updated_at();
create trigger trg_characters_updated before update on characters for each row execute function set_updated_at();
create trigger trg_locations_updated  before update on locations  for each row execute function set_updated_at();

-- helpful indexes for the most common queries
create index idx_news_created   on news (created_at desc);
create index idx_news_trending  on news (trending) where trending;
create index idx_guides_created on guides (created_at desc);
create index idx_carousel_order on carousel_items ("order") where active;

-- ===========================================================================
-- Row Level Security
--
-- Read: public (anon + authenticated) can read everything — it's a public hub.
-- Write: only authenticated users (your admins) can insert/update/delete.
--
-- NOTE: any account that can sign in is treated as an admin. Control who is an
-- admin by controlling who you create in Supabase Auth. To restrict further,
-- replace `to authenticated` with a check against an `admins` allowlist table.
-- ===========================================================================
do $$
declare t text;
begin
  foreach t in array array['news','guides','vehicles','characters','locations','carousel_items']
  loop
    execute format('alter table %I enable row level security;', t);

    execute format(
      'create policy "public_read_%1$s" on %1$I for select using (true);', t);

    execute format(
      'create policy "auth_write_%1$s" on %1$I for all to authenticated using (true) with check (true);', t);
  end loop;
end $$;
