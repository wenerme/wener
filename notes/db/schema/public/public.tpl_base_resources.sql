set search_path = public;

create table if not exists public.tpl_base_resource
(
  id         text        not null default public.gen_ulid(),
  tid        bigint      not null default current_tenant_id(),
  uid        uuid        not null default gen_random_uuid(),
  sid        bigint      not null default public.next_sid(''),
  eid        text        null,
  created_at timestamptz not null default current_timestamp,
  updated_at timestamptz not null default current_timestamp,
  deleted_at timestamptz null,
  primary key (tid, id),
  unique (tid, uid),
  unique (tid, sid),
  unique (tid, eid),
  foreign key (tid) references public.system_tenant (tid) on delete cascade
);

comment on column tpl_base_resource.uid is 'Unique UUID';
comment on column tpl_base_resource.tid is 'Tenant ID';
comment on column tpl_base_resource.eid is 'External ID';

-- 默认命名格式
-- tpl_base_resource_pkey
-- tpl_base_resource_tid_uid_key
-- tpl_base_resource_created_at_idx

create index if not exists tpl_base_resource_created_at_idx on tpl_base_resource (tid, created_at);
create index if not exists tpl_base_resource_updated_at_idx on tpl_base_resource (tid, updated_at);
create index if not exists tpl_base_resource_deleted_at_idx on tpl_base_resource (tid, deleted_at);
