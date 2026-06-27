-- ===========================================================================
-- ViceCityHub — image storage
--
-- Creates a public "media" bucket and policies so the admin dashboard can
-- upload images directly from the browser:
--   read   — public (anyone can view image URLs)
--   write  — authenticated users only (your admins)
--
-- Safe to re-run.
-- ===========================================================================

-- Public bucket for uploaded media.
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = true;

-- Policies on storage.objects (RLS is already enabled by Supabase).
drop policy if exists "media public read"   on storage.objects;
drop policy if exists "media auth insert"   on storage.objects;
drop policy if exists "media auth update"   on storage.objects;
drop policy if exists "media auth delete"   on storage.objects;

create policy "media public read"
  on storage.objects for select
  using (bucket_id = 'media');

create policy "media auth insert"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'media');

create policy "media auth update"
  on storage.objects for update to authenticated
  using (bucket_id = 'media') with check (bucket_id = 'media');

create policy "media auth delete"
  on storage.objects for delete to authenticated
  using (bucket_id = 'media');
