-- ─────────────────────────────────────────────────────────────
-- Migration: strip personnummer from existing plans
-- Date: 2026-04-24
-- Run ONCE in the Supabase SQL editor, after applying the updated schema.sql.
-- Safe to re-run (idempotent — only touches rows that still contain the keys).
--
-- Background: earlier builds uploaded `state.personnr` and
-- `state.participantPersonnr` to plans.state_json. The updated
-- get_shared_plan RPC strips these from share-token reads, but the columns
-- themselves still contain the data. This migration rewrites each row so the
-- sensitive keys are gone at rest.
--
-- The script handles both the outer state_json object and the nested
-- `efterplan_state` JSON string (where personnummer actually live today).
-- Malformed rows are left unchanged unless the inner JSON is broken, in
-- which case the whole efterplan_state key is dropped as a safe fallback.
-- ─────────────────────────────────────────────────────────────

do $$
declare
  r         record;
  v_outer   jsonb;
  v_inner   jsonb;
  v_changed boolean;
  v_touched integer := 0;
begin
  for r in select id, state_json from public.plans loop
    v_changed := false;

    begin
      v_outer := r.state_json::jsonb;
    exception when others then
      -- non-JSON row → skip, never fail the migration
      continue;
    end;

    if v_outer ? 'personnr' or v_outer ? 'participantPersonnr' then
      v_outer   := v_outer - 'personnr' - 'participantPersonnr';
      v_changed := true;
    end if;

    if v_outer ? 'efterplan_state' then
      begin
        v_inner := (v_outer->>'efterplan_state')::jsonb;
        if v_inner ? 'personnr' or v_inner ? 'participantPersonnr' then
          v_inner   := v_inner - 'personnr' - 'participantPersonnr';
          v_outer   := v_outer || jsonb_build_object('efterplan_state', v_inner::text);
          v_changed := true;
        end if;
      exception when others then
        -- malformed inner JSON — drop whole key rather than leave stale data
        v_outer   := v_outer - 'efterplan_state';
        v_changed := true;
      end;
    end if;

    if v_changed then
      update public.plans
         set state_json = v_outer::text
       where id = r.id;
      v_touched := v_touched + 1;
    end if;
  end loop;

  raise notice 'strip-personnr migration: % row(s) updated', v_touched;
end;
$$;
