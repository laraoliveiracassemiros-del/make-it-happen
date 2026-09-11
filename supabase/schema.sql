create extension if not exists pgcrypto;

create table if not exists public.missions (
  id uuid primary key default gen_random_uuid(),
  request text not null,
  customer_name text,
  customer_whatsapp text,
  region text,
  status text not null default 'triage',
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
  level text not null default 'Core',
  modal text not null default 'motorcycle',
  score int not null default 700,
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

alter table public.missions enable row level security;
alter table public.operators enable row level security;
alter table public.mission_events enable row level security;
alter table public.payments enable row level security;
