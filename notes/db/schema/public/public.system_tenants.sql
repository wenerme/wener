------------------------
-- public.system_tenants
------------------------
CREATE TABLE IF NOT EXISTS public.system_tenant
(
  id  text NOT NULL DEFAULT public.gen_ulid(),
  tid bigint,
  PRIMARY KEY (tid, id),
  UNIQUE (tid)
);

DO
$$
  BEGIN
    CREATE POLICY tid ON system_tenant USING (tid = current_tenant_id());
  EXCEPTION
    WHEN duplicate_object THEN
      RAISE NOTICE 'policy "tid" for system_tenants already exists';
  END;
$$;
ALTER TABLE system_tenant
  ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_tenant
  FORCE ROW LEVEL SECURITY;

------------------------
-- public.system_sequences
------------------------
create table if not exists public.system_sequence
(
  id         text        not null default public.gen_ulid(),
  tid        bigint      not null default current_tenant_id(),
  uid        uuid        not null default gen_random_uuid(),
  name       text        not null,
  seq        bigint      not null default 0,
  created_at timestamptz not null default current_timestamp,
  updated_at timestamptz not null default current_timestamp,
  deleted_at timestamptz,
  primary key (tid, id),
  unique (tid, uid),
  unique (tid, name),
  foreign key (tid) references system_tenant (tid) on delete cascade
);

CREATE POLICY tid ON system_sequence USING (tid = current_tenant_id());
ALTER TABLE system_sequence
  ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_sequence
  FORCE ROW LEVEL SECURITY;

------------------------
-- public.next_sid - generate serial id
------------------------
create or replace function public.next_sid(seq_name text, tenant_id system_sequence.tid%TYPE = current_tenant_id())
  returns bigint
  language plpgsql
  volatile
as
$$
declare
  id system_sequence.seq%TYPE;
begin
  if seq_name is null then
    raise exception 'Empty sequence'
      using hint = 'check you table definition';
  end if;
  -- trigger less default computing
  update system_sequence
  set seq=seq + 1
  where tid = tenant_id
    and name = seq_name
  returning seq into id;
  if id is null
  then
    insert into system_sequence(tid, name, seq, uid, created_at, updated_at)
    values (tenant_id, seq_name, 1, gen_random_uuid(), now(), now())
    on conflict(tid,name) do update set (seq, updated_at)= (system_sequence.seq + 1, excluded.updated_at)
    returning seq into id;
  end if;

  return id;
end;
$$;

-- generate resource id: <tid>-<res>-<id>
-- create or replace function public.gen_res_id(res text, tid bigint = current_tenant_id(), id text = gen_ulid()) returns text
-- as
-- $$
-- select concat(tid, '-', res, '-', id);
-- $$
--   language sql
--   volatile;
