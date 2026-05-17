create table if not exists public.signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  plan text not null check (plan in ('Discovery', 'Connoisseur', 'Bean Hunter')),
  name text not null,
  email text not null,
  phone text,
  city text not null,
  brew_setup text
);

alter table public.signups enable row level security;

create policy "Anyone can create signup"
on public.signups
for insert
to anon
with check (true);
