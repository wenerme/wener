set search_path = public;

create table if not exists public.tpl_primary_resources
(
  like tpl_base_resources including all,
  created_by_user_id text default current_user_id(),
  updated_by_user_id text default current_user_id(),
  deleted_by_user_id text,
  extensions         jsonb, -- 仅服务端可见
  properties         jsonb, -- 服务端 写，客户端 读
  attributes         jsonb, -- 客户端 读写
  foreign key (tid, created_by_user_id) references public.users (tid, id),
  foreign key (tid, updated_by_user_id) references public.users (tid, id),
  foreign key (tid, deleted_by_user_id) references public.users (tid, id)
);

create index if not exists tpl_primary_resources_tid_created_at_idx on tpl_primary_resources (tid, created_by_user_id);
create index if not exists tpl_primary_resources_tid_updated_at_idx on tpl_primary_resources (tid, updated_by_user_id);
create index if not exists tpl_primary_resources_tid_deleted_at_idx on tpl_primary_resources (tid, deleted_by_user_id);

comment on column tpl_primary_resources.created_by_user_id is 'Created By User ID';
comment on column tpl_primary_resources.updated_by_user_id is 'Updated By User ID';
comment on column tpl_primary_resources.deleted_by_user_id is 'Deleted By User ID';
comment on column tpl_primary_resources.extensions is 'Server Extensions';
comment on column tpl_primary_resources.properties is 'Extra Properties';
comment on column tpl_primary_resources.attributes is 'Entity Attributes';

create table if not exists public.tpl_ownable_resources
(
  like tpl_primary_resources,
  owner_id            text,
  owner_type          text,
  owner_uid           uuid,
  owner_user_id       text,
  owner_team_id       text,
  owner_department_id text,
  foreign key (tid, owner_user_id) references public.users (tid, id),
  foreign key (tid, owner_team_id) references public.teams (tid, id),
  foreign key (tid, owner_department_id) references public.departments (tid, id)
);

create index if not exists tpl_ownable_resources_tid_owner_id_idx on tpl_ownable_resources (tid, owner_id);
create index if not exists tpl_ownable_resources_tid_owner_uid_idx on tpl_ownable_resources (tid, owner_uid);
create index if not exists tpl_ownable_resources_tid_owner_user_id_idx on tpl_ownable_resources (tid, owner_user_id);
create index if not exists tpl_ownable_resources_tid_owner_team_id_idx on tpl_ownable_resources (tid, owner_team_id);
create index if not exists tpl_ownable_resources_tid_owner_department_id_idx on tpl_ownable_resources (tid, owner_department_id);

-----------------------
-- setup_resource_table
-----------------------
create or replace function public.setup_resource_table(in_table_name text, resource_name text,
                                                       in_schema_name text = current_schema)
  returns void
  language plpgsql
  volatile
as
$func$
BEGIN
  raise notice 'setup resource table %s.%s',in_schema_name,in_table_name;

  -- RLS
  execute format('alter table %s.%s enable row level security', in_schema_name, in_table_name);
  execute format('alter table %s.%s force row level security', in_schema_name, in_table_name);
  execute format($$alter table %s.%s alter column sid set default next_sid('%s')$$,
                 in_schema_name, in_table_name, resource_name);

  if exists(select *
            from pg_catalog.pg_policies
            where (schemaname, tablename, policyname) = (in_schema_name, in_table_name, 'tid'))
  then
    raise notice 'policy "tid" for table "%s.%s" already exists', in_schema_name, in_table_name;
  else
    begin
      execute format($$create policy tid on %s.%s using (tid = current_tenant_id())$$, in_schema_name, in_table_name);
    exception
      when duplicate_object then
        raise notice 'policy "tid" for table "%s.%s" already exists', in_schema_name, in_table_name;
    end;
  end if;

  -- fkey
  -- tid_fkey
  begin
    execute format(
      $$alter table %s.%s add constraint %s_tid_fkey foreign key (tid) references public.system_tenants(tid) on delete cascade$$,
      in_schema_name, in_table_name, in_table_name
      );
  exception
    when duplicate_object then
      raise notice 'fkey "%s_tid_fkey" already exists', in_table_name;
  end;
  -- primary resource
  if (SELECT EXISTS(SELECT 1
                    FROM information_schema.columns
                    WHERE table_schema = in_schema_name
                      AND table_name = in_table_name
                      AND column_name = 'created_by_user_id')) then
    begin
      execute format(
        $$alter table %s.%s add constraint %s_tid_created_by_user_id_fkey foreign key (tid,created_by_user_id) references public.users(tid,id) on delete cascade$$,
        in_schema_name, in_table_name, in_table_name
        );
      execute format(
        $$alter table %s.%s add constraint %s_tid_updated_by_user_id_fkey foreign key (tid,updated_by_user_id) references public.users(tid,id) on delete cascade$$,
        in_schema_name, in_table_name, in_table_name
        );
      execute format(
        $$alter table %s.%s add constraint %s_tid_deleted_by_user_id_fkey foreign key (tid,deleted_by_user_id) references public.users(tid,id) on delete cascade$$,
        in_schema_name, in_table_name, in_table_name
        );
    exception
      when duplicate_object then
        raise notice 'fkey for "%s" primary already exists', in_table_name;
    end;
  end if;
  -- owner resource
  if (SELECT EXISTS(SELECT 1
                    FROM information_schema.columns
                    WHERE table_schema = in_schema_name
                      AND table_name = in_table_name
                      AND column_name = 'owner_id')) then
    begin
      execute format(
        $$alter table %s.%s add constraint %s_tid_owner_user_id_fkey foreign key (tid,owner_user_id) references public.users(tid,id) on delete cascade$$,
        in_schema_name, in_table_name, in_table_name
        );
      execute format(
        $$alter table %s.%s add constraint %s_tid_owner_team_id_fkey foreign key (tid,owner_team_id) references public.teams(tid,id) on delete cascade$$,
        in_schema_name, in_table_name, in_table_name
        );
      execute format(
        $$alter table %s.%s add constraint %s_tid_owner_department_id_fkey foreign key (tid,owner_department_id) references public.departments(tid,id) on delete cascade$$,
        in_schema_name, in_table_name, in_table_name
        );
    exception
      when duplicate_object then
        raise notice 'fkey for "%s" ownable already exists', in_table_name;
    end;
  end if;
END
$func$;


-----------------------
-- setup
-----------------------
grant select on table tpl_base_resources,tpl_primary_resources,tpl_ownable_resources to public;
