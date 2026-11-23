-- TicketTamer schema. Run in Supabase SQL editor.
create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  company text,
  plan text not null default 'free' check (plan in ('free','starter','growth','scale')),
  plan_status text not null default 'inactive',
  credits_used int not null default 0,
  period_start timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.knowledge_sources (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  kind text not null default 'article' check (kind in ('article','ticket','file')),
  content text not null,
  file_path text,
  created_at timestamptz not null default now()
);
create index if not exists ks_user on public.knowledge_sources(user_id);

create table if not exists public.tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  customer_email text,
  subject text not null,
  body text not null,
  status text not null default 'open' check (status in ('open','ai_resolved','needs_human','closed')),
  priority text not null default 'normal' check (priority in ('low','normal','high','urgent')),
  category text,
  sentiment text,
  ai_reply text,
  ai_confidence numeric,
  ai_sources jsonb,
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);
create index if not exists tickets_user on public.tickets(user_id, created_at desc);

create table if not exists public.ai_runs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  ticket_id uuid references public.tickets(id) on delete set null,
  input text not null,
  output jsonb,
  ok boolean not null default true,
  latency_ms int,
  created_at timestamptz not null default now()
);
create index if not exists runs_user on public.ai_runs(user_id, created_at desc);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  body text,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  email text,
  plan text not null,
  provider text not null default 'selar',
  reference text unique,
  status text not null default 'pending',
  raw jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.demo_requests (
  id uuid primary key default gen_random_uuid(),
  name text, company text, email text not null, volume text, message text,
  created_at timestamptz not null default now()
);

-- RLS
alter table public.profiles enable row level security;
alter table public.knowledge_sources enable row level security;
alter table public.tickets enable row level security;
alter table public.ai_runs enable row level security;
alter table public.notifications enable row level security;
alter table public.payments enable row level security;
alter table public.demo_requests enable row level security;

create policy "own profile read" on public.profiles for select using (auth.uid() = id);
create policy "own profile update" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "own sources" on public.knowledge_sources for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own tickets" on public.tickets for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own runs read" on public.ai_runs for select using (auth.uid() = user_id);
create policy "own notifications" on public.notifications for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own payments read" on public.payments for select using (auth.uid() = user_id);
-- demo_requests and payments writes happen only through the service role (no policies = denied for anon/authenticated).

-- Users may edit name/company only. Plan and usage are service-role only.
create or replace function public.guard_profile() returns trigger language plpgsql as $$
begin
  if coalesce(auth.role(), 'service_role') <> 'service_role' then
    new.plan := old.plan; new.plan_status := old.plan_status;
    new.credits_used := old.credits_used; new.period_start := old.period_start;
    new.email := old.email;
  end if;
  return new;
end $$;
drop trigger if exists guard_profile on public.profiles;
create trigger guard_profile before update on public.profiles for each row execute function public.guard_profile();

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name, company)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'company')
  on conflict (id) do nothing;
  insert into public.notifications (user_id, title, body) values (new.id, 'Welcome to TicketTamer', 'Add a knowledge source, then try the agent in the playground.');
  return new;
end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

-- Storage bucket for uploaded knowledge files (private, per-user folder)
insert into storage.buckets (id, name, public) values ('knowledge-files', 'knowledge-files', false) on conflict do nothing;
create policy "own files read" on storage.objects for select using (bucket_id = 'knowledge-files' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "own files insert" on storage.objects for insert with check (bucket_id = 'knowledge-files' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "own files delete" on storage.objects for delete using (bucket_id = 'knowledge-files' and (storage.foldername(name))[1] = auth.uid()::text);
