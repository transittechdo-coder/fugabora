-- FugaBora schema (matches the live Supabase project "fugabora").

-- Anonymous symptom reports for outbreak tracking. No names or phone numbers.
create table if not exists public.symptom_reports (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  animal text not null check (char_length(animal) <= 32),
  symptoms text[] not null default '{}' check (cardinality(symptoms) <= 40),
  top_disease text check (char_length(top_disease) <= 64),
  region text check (char_length(region) <= 64),
  urgent boolean not null default false,
  many_sick boolean not null default false
);
create index if not exists symptom_reports_animal_created_idx on public.symptom_reports (animal, created_at desc);
alter table public.symptom_reports enable row level security;
-- Anyone may submit; nobody can read rows through the public API.
create policy "anyone can submit a report" on public.symptom_reports
  for insert to anon, authenticated with check (true);

-- Farmer animal records (for signed-in sync, version 2). Owners see only their own rows.
create table if not exists public.animals (
  id uuid primary key default gen_random_uuid(),
  owner uuid not null default auth.uid() references auth.users(id) on delete cascade,
  name text not null check (char_length(name) <= 80),
  species text not null check (char_length(species) <= 32),
  birth date,
  count integer not null default 1 check (count > 0),
  created_at timestamptz not null default now()
);
alter table public.animals enable row level security;
create policy "owners read own animals" on public.animals for select to authenticated using ((select auth.uid()) = owner);
create policy "owners add own animals" on public.animals for insert to authenticated with check ((select auth.uid()) = owner);
create policy "owners update own animals" on public.animals for update to authenticated using ((select auth.uid()) = owner) with check ((select auth.uid()) = owner);
create policy "owners delete own animals" on public.animals for delete to authenticated using ((select auth.uid()) = owner);
