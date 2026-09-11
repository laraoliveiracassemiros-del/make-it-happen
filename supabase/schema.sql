create extension if not exists pgcrypto;

create table if not exists public.missions (
  id uuid primary key default gen_random_uuid(),
  request text not null,
  customer_name text,
  customer_whatsapp text,
  region text,
  status text not null default 'triage' check (status in ('draft', 'triage', 'quoted', 'paid', 'matching', 'assigned', 'in_progress', 'done', 'cancelled', 'rejected')),
  intent jsonb not null default '{}'::jsonb,
  quote jsonb not null default '{}'::jsonb,
  assigned_operator_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.operators (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text,
  city text not null default 'Brasília',
  level text not null default 'Core' check (level in ('Core', 'Pro', 'Elite', 'Signature')),
  modal text not null default 'motorcycle' check (modal in ('walk', 'bike', 'motorcycle', 'car', 'utility')),
  score int not null default 700 check (score between 0 and 1000),
  rating numeric(3,2) not null default 5.00,
  completed_missions int not null default 0,
  online boolean not null default false,
  skills text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.mission_events (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null references public.missions(id) on delete cascade,
  event_type text not null,
  label text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null references public.missions(id) on delete cascade,
  provider text not null,
  provider_payment_id text,
  amount_cents int not null,
  currency text not null default 'BRL',
  status text not null default 'created',
  created_at timestamptz not null default now()
);

create index if not exists missions_created_at_idx on public.missions(created_at desc);
create index if not exists missions_status_idx on public.missions(status);
create index if not exists mission_events_mission_id_idx on public.mission_events(mission_id);
create index if not exists operators_city_online_idx on public.operators(city, online);

alter table public.missions enable row level security;
alter table public.operators enable row level security;
alter table public.mission_events enable row level security;
alter table public.payments enable row level security;

-- V0 uses the service role key only inside server-side Next.js routes.
-- Do not expose SUPABASE_SERVICE_ROLE_KEY in client components.

insert into public.operators (full_name, city, level, modal, score, rating, completed_missions, online, skills)
values
  ('Rafael M.', 'Brasília', 'Elite', 'car', 984, 4.98, 1247, true, array['High-value handling', 'Multi-stop', 'Gift missions']),
  ('Camila R.', 'Brasília', 'Pro', 'motorcycle', 941, 4.94, 638, true, array['Fast pickup', 'Returns', 'Document-safe protocol']),
  ('Diego A.', 'Brasília', 'Core', 'bike', 876, 4.87, 214, true, array['Dense urban missions', 'Small parcels'])
on conflict do nothing;
