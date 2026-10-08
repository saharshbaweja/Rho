create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  job_role text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  operator_type text not null default 'part_135',
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.organization_members (
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'member',
  created_at timestamptz not null default now(),
  primary key (organization_id,user_id)
);

create table if not exists public.subscriptions (
  organization_id uuid primary key references public.organizations(id) on delete cascade,
  plan text not null default 'trial',
  status text not null default 'trialing',
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  trial_ends_at timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.operator_documents (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  title text not null,
  document_type text not null,
  revision text,
  effective_date date,
  storage_path text,
  source_url text,
  status text not null default 'uploaded',
  metadata jsonb not null default '{}'::jsonb,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.operator_rules (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  source_document_id uuid references public.operator_documents(id) on delete set null,
  code text not null,
  category text not null,
  title text not null,
  rule_json jsonb not null,
  source_excerpt text,
  source_locator text,
  validation_status text not null default 'draft',
  validated_by uuid references auth.users(id) on delete set null,
  validated_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id,code)
);

create table if not exists public.missions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  external_id text,
  origin text not null,
  destination text not null,
  departure_at timestamptz,
  aircraft_tail text,
  aircraft_type text,
  status text not null default 'planning',
  state jsonb not null default '{}'::jsonb,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.mission_evaluations (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  mission_id uuid not null references public.missions(id) on delete cascade,
  engine_version text not null default '0.1',
  verdict text not null,
  findings jsonb not null default '[]'::jsonb,
  options jsonb not null default '[]'::jsonb,
  source_state jsonb not null default '{}'::jsonb,
  reviewed_by uuid references auth.users(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.intelligence_usage (
  id bigint generated always as identity primary key,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  model text not null,
  purpose text not null,
  input_tokens bigint,
  output_tokens bigint,
  cost_usd numeric(12,6),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_events (
  id bigint generated always as identity primary key,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  mission_id uuid references public.missions(id) on delete set null,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists missions_org_created_idx on public.missions(organization_id,created_at desc);
create index if not exists evaluations_mission_created_idx on public.mission_evaluations(mission_id,created_at desc);
create index if not exists intelligence_usage_org_created_idx on public.intelligence_usage(organization_id,created_at desc);
create index if not exists operator_rules_org_category_idx on public.operator_rules(organization_id,category);

create or replace function public.is_org_member(org_id uuid)
returns boolean
language sql
stable
security definer
set search_path=public
as $$
  select exists(
    select 1 from public.organization_members
    where organization_id=org_id and user_id=auth.uid()
  );
$$;

alter table public.profiles enable row level security;
alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.subscriptions enable row level security;
alter table public.operator_documents enable row level security;
alter table public.operator_rules enable row level security;
alter table public.missions enable row level security;
alter table public.mission_evaluations enable row level security;
alter table public.intelligence_usage enable row level security;
alter table public.audit_events enable row level security;

create policy "profiles read own" on public.profiles for select using (id=auth.uid());
create policy "profiles update own" on public.profiles for update using (id=auth.uid()) with check (id=auth.uid());
create policy "organizations read members" on public.organizations for select using (public.is_org_member(id));
create policy "members read organization" on public.organization_members for select using (public.is_org_member(organization_id));
create policy "subscriptions read organization" on public.subscriptions for select using (public.is_org_member(organization_id));

create policy "documents read organization" on public.operator_documents for select using (public.is_org_member(organization_id));
create policy "documents insert organization" on public.operator_documents for insert with check (public.is_org_member(organization_id) and created_by=auth.uid());
create policy "documents update organization" on public.operator_documents for update using (public.is_org_member(organization_id)) with check (public.is_org_member(organization_id));
create policy "documents delete organization" on public.operator_documents for delete using (public.is_org_member(organization_id));

create policy "rules read organization" on public.operator_rules for select using (public.is_org_member(organization_id));
create policy "rules insert organization" on public.operator_rules for insert with check (public.is_org_member(organization_id));
create policy "rules update organization" on public.operator_rules for update using (public.is_org_member(organization_id)) with check (public.is_org_member(organization_id));
create policy "rules delete organization" on public.operator_rules for delete using (public.is_org_member(organization_id));

create policy "missions read organization" on public.missions for select using (public.is_org_member(organization_id));
create policy "missions insert organization" on public.missions for insert with check (public.is_org_member(organization_id) and created_by=auth.uid());
create policy "missions update organization" on public.missions for update using (public.is_org_member(organization_id)) with check (public.is_org_member(organization_id));
create policy "missions delete organization" on public.missions for delete using (public.is_org_member(organization_id));

create policy "evaluations read organization" on public.mission_evaluations for select using (public.is_org_member(organization_id));
create policy "evaluations insert organization" on public.mission_evaluations for insert with check (public.is_org_member(organization_id));
create policy "usage read organization" on public.intelligence_usage for select using (public.is_org_member(organization_id));
create policy "audit read organization" on public.audit_events for select using (public.is_org_member(organization_id));

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path=public
as $$
declare
  org_id uuid:=gen_random_uuid();
  org_name text:=coalesce(nullif(new.raw_user_meta_data->>'organization_name',''), split_part(new.email,'@',2), 'Aeros Workspace');
  org_slug text;
begin
  org_slug:=lower(trim(both '-' from regexp_replace(org_name,'[^a-zA-Z0-9]+','-','g')))||'-'||substring(new.id::text from 1 for 8);
  insert into public.profiles(id,full_name,job_role)
  values(new.id,new.raw_user_meta_data->>'full_name',new.raw_user_meta_data->>'role')
  on conflict(id) do nothing;

  insert into public.organizations(id,name,slug,operator_type,created_by)
  values(org_id,org_name,org_slug,coalesce(nullif(new.raw_user_meta_data->>'operator_type',''),'part_135'),new.id);

  insert into public.organization_members(organization_id,user_id,role)
  values(org_id,new.id,'owner');

  insert into public.subscriptions(organization_id,plan,status,trial_ends_at)
  values(org_id,'trial','trialing',now()+interval '14 days');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
