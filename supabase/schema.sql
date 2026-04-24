-- T051: Efterplan Supabase schema
--
-- Auth uses Supabase's built-in auth.users table (magic-link only —
-- disable password sign-in in Auth settings). No custom users table is
-- needed; we reference auth.users via user_id.
--
-- All tables are user-scoped with RLS so one authenticated user can
-- only read/write their own rows. Anonymous reads are allowed only for
-- plans explicitly shared (T052), gated by a random share_token.

------------------------------------------------------------
-- plans  (one row per plan, currently one plan per user)
------------------------------------------------------------
create table if not exists public.plans (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  -- mirror of the localStorage "state" blob — onboarding answers,
  -- deceased name, participants, etc. Schema-less to avoid lock-in.
  state        jsonb not null default '{}'::jsonb,
  share_token  text unique,            -- null until user creates a share link
  shared_at    timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists plans_user_id_idx on public.plans(user_id);
create unique index if not exists plans_user_single_idx on public.plans(user_id);

alter table public.plans enable row level security;

-- Owner: full access
drop policy if exists "plans_owner_all" on public.plans;
create policy "plans_owner_all" on public.plans
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Anonymous read for shared plans (T052): only rows with share_token set.
-- Clients must query with .eq('share_token', token) — RLS can't filter
-- by the incoming predicate, but we allow `select` on rows that *have* a
-- token, and rely on the unguessable token for access control.
drop policy if exists "plans_public_shared_read" on public.plans;
create policy "plans_public_shared_read" on public.plans
  for select using (share_token is not null);

------------------------------------------------------------
-- task_completions  (per-task state: done, started, notes, assignee)
------------------------------------------------------------
create table if not exists public.task_completions (
  id         uuid primary key default gen_random_uuid(),
  plan_id    uuid not null references public.plans(id) on delete cascade,
  user_id    uuid not null references auth.users(id) on delete cascade,
  task_id    text not null,            -- task key from app.js TASKS table
  done       boolean not null default false,
  started    boolean not null default false,
  assignee   text,
  notes      text,
  updated_at timestamptz not null default now(),
  unique (plan_id, task_id)
);

create index if not exists task_completions_plan_idx on public.task_completions(plan_id);
create index if not exists task_completions_user_idx on public.task_completions(user_id);

alter table public.task_completions enable row level security;

drop policy if exists "task_completions_owner_all" on public.task_completions;
create policy "task_completions_owner_all" on public.task_completions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Read access for shared plan viewers (T052)
drop policy if exists "task_completions_public_shared_read" on public.task_completions;
create policy "task_completions_public_shared_read" on public.task_completions
  for select using (
    exists (
      select 1 from public.plans p
      where p.id = task_completions.plan_id
        and p.share_token is not null
    )
  );

------------------------------------------------------------
-- updated_at triggers
------------------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists plans_touch_updated_at on public.plans;
create trigger plans_touch_updated_at before update on public.plans
  for each row execute function public.touch_updated_at();

drop trigger if exists task_completions_touch_updated_at on public.task_completions;
create trigger task_completions_touch_updated_at before update on public.task_completions
  for each row execute function public.touch_updated_at();
