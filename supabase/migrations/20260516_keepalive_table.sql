-- Heartbeat table for the GitHub Actions keepalive workflow.
--
-- The workflow inserts one row per scheduled run and deletes rows older
-- than 7 days. Two real write transactions per ping — heavier and harder
-- for Supabase's free-tier pause-scanner to dismiss as "not real activity"
-- than a bare SELECT against `leads`.
--
-- Naming: leading underscore + lowercase signals "internal / ops, not
-- product data" — matches the convention some teams use for system tables.

create table if not exists _keepalive (
  id  uuid primary key default gen_random_uuid(),
  ts  timestamptz not null default now()
);

create index if not exists keepalive_ts_idx on _keepalive (ts);

-- Service-role-only access. RLS is enabled with no public policies, so
-- anon and authenticated clients cannot touch the table — only the
-- GitHub Actions runner using the service key can.
alter table _keepalive enable row level security;
