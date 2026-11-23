-- Run once in the Supabase SQL editor if you see "permission denied for table ...".
-- Newer Supabase projects no longer grant table access to API roles automatically.
grant usage on schema public to anon, authenticated, service_role;
grant all on all tables in schema public to service_role;
grant select, insert, update, delete on public.knowledge_sources, public.tickets, public.notifications to authenticated;
grant select, update on public.profiles to authenticated;
grant select on public.ai_runs, public.payments to authenticated;
alter default privileges in schema public grant all on tables to service_role;
