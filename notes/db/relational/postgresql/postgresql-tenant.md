---
title: PostgreSQL Tenant
---

# PostgreSQL Tenant

- 方案
  - 分库
  - 分 Schema
  - 分 View - updateable view
  - 分片表
  - tenant_id 列划分
  - RLS 权限控制
  - set 上下文信息
- 扩容
  - 水平 - citus
  - 垂直
  - HA/AA
- [System Administration Functions](https://www.postgresql.org/docs/current/functions-admin.html)
- [geckoboard/pgulid](https://github.com/geckoboard/pgulid)
  - Pure pgsql ULID

## context variable

- set
  - session - 链接维度
  - local - tx 结束重置
- 自定义变量最好 前缀+.

```sql
-- name, value, local
-- local 如果为 true 则优先返回 tx 范围 - 不存在不会异常
-- local 如果为 false 则返回 session 范围 - 不存在会异常
select set_config('tenant.id', 1000, true);
set tenant.id = 1000;

-- name, optional
select current_setting('tenant.id',true);
show tenant.id;

reset tenant.id;

-- 特殊
select current_user;
```

## generate_res_id

针对租户+资源生成唯一 ID

```sql
-- TENANT-RES-ULID
create or replace function generate_res_id(name text) returns text
as
$$
begin
    return concat(current_setting('tenant.id'), '-', name, '-', generate_ulid());
end
$$
    language plpgsql
    volatile;

select generate_res_id('user');
```

## generate_res_sid

针对租户+资源生成唯一 序列 ID

- 如果直接预先插入记录，则可只用 update 会更好

```sql
-- track sequence
create table system_resource_sequences
(
    id        serial,
    tenant_id bigint,
    resource  text,
    value     bigint,
    unique (tenant_id, resource)
);

-- generate_res_sid - upsert version
create or replace function generate_res_sid(res text)
    returns bigint
as
$$
insert into system_resource_sequences(tenant_id, resource, value)
values (1000, res, 1)
on conflict(tenant_id,resource) do update set value=system_resource_sequences.value + 1
returning value
$$
    language sql
    volatile;

-- generate_res_sid - update and insert version
create or replace function generate_res_sid(res text)
    returns bigint
as
$$
declare
    id  system_resource_sequences.value%TYPE;
    tid system_resource_sequences.tenant_id%TYPE := current_setting('tenant.id')::bigint;
begin
    -- trigger less default computing
    update system_resource_sequences
    set value=value + 1
    where tenant_id = tid
      and resource = res
    returning value into id;
    if id is null
    then
        insert into system_resource_sequences(tenant_id, resource, value)
        values (tid, res, 1)
        on conflict(tenant_id,resource) do update set value=system_resource_sequences.value + 1
        returning value into id;
    end if;

    return id;
end;
$$
    language plpgsql
    volatile;
```

```sql
-- test insert
insert into system_resource_sequences(tenant_id, resource, value)
values (current_setting('tenant.id'), 'User', 1)
on conflict(tenant_id,resource) do update set value=system_resource_sequences.value + 1
returning value;

-- test function
select generate_res_sid('User');
```

## RLS

> 大大简化 SaaS 数据隔离

- 增删改查都会生效
- superuser 可以 BYPASSRLS
- table owner bypasses RLS
  - 除非 - FORCE ROW LEVEL SECURITY
- 每个租户用一个用户 - 扩容受限
- 通过 local/session 变量控制 - 需要额外设置
- SET role
- [Designing the most performant Row Level Security schema in Postgres](https://cazzer.medium.com/a06084f31945)
- [Multi-tenant data isolation with PostgreSQL Row Level Security](https://aws.amazon.com/cn/blogs/database/multi-tenant-data-isolation-with-postgresql-row-level-security/)

```sql
ALTER TABLE tenant ENABLE ROW LEVEL SECURITY;

-- 用户维度
CREATE POLICY tenant_isolation_policy ON tenant
USING (tenant_id::TEXT = current_user);

-- 上下文信息
CREATE POLICY tenant_isolation_policy ON tenant
USING (tenant_id = current_setting('app.current_tenant')::UUID);

-- 复杂 级联
CREATE POLICY my_fancy_policy
  ON t_company
  USING (manager IN ( WITH RECURSIVE t AS
                        (
                           SELECT current_user AS person, NULL::text AS manager
                           FROM t_manager
                           WHERE manager = CURRENT_USER
                           UNION ALL
                           SELECT m.person, m.manager
                           FROM t_manager m
                           INNER JOIN t ON t.person = m.manager
                        )
                        SELECT person FROM t
                    )
        )
;

-- ACL
create policy item_owner
on items
as permissive
for all
to application_user
using (
  items.acl_read && regexp_split_to_array(current_setting('jwt.claims.roles'), ',')::uuid[]
  or items.acl_write && regexp_split_to_array(current_setting('jwt.claims.roles'), ',')::uuid[]
)
with check (
  items.acl_write && regexp_split_to_array(current_setting('jwt.claims.roles'), ',')::uuid[]
);

create policy item_owner
on items
as permissive
for all
to application_user
using (
  items.public = true
  or exists(
    select item_id
    from permissions
    where (
      permissions.user_or_group_id =
        any(regexp_split_to_array(current_setting('jwt.claims.role'), ',')::uuid[])
      and permissions.item_id = items.id
    )
  )
)
with check (exists(
  select item_id
  from permissions
  where (
    permissions.user_or_group_id =
      any(regexp_split_to_array(current_setting('jwt.claims.role'), ',')::uuid[])
    and permissions.item_id = items.id
    and permissions.role = 'write'
  )
));
```

**查看 policy**

```sql
SELECT n.nspname                                   AS schemaname,
       c.relname                                   AS tablename,
       pol.polname                                 AS policyname,
       CASE
           WHEN pol.polpermissive THEN 'PERMISSIVE'::text
           ELSE 'RESTRICTIVE'::text
           END                                     AS permissive,
       CASE
           WHEN pol.polroles = '{0}'::oid[] THEN string_to_array('public'::text, ''::text)::name[]
           ELSE ARRAY(SELECT pg_authid.rolname
                      FROM pg_authid
                      WHERE pg_authid.oid = ANY (pol.polroles)
                      ORDER BY pg_authid.rolname)
           END                                     AS roles,
       CASE pol.polcmd
           WHEN 'r'::"char" THEN 'SELECT'::text
           WHEN 'a'::"char" THEN 'INSERT'::text
           WHEN 'w'::"char" THEN 'UPDATE'::text
           WHEN 'd'::"char" THEN 'DELETE'::text
           WHEN '*'::"char" THEN 'ALL'::text
           ELSE NULL::text
           END                                     AS cmd,
       pg_get_expr(pol.polqual, pol.polrelid)      AS qual,
       pg_get_expr(pol.polwithcheck, pol.polrelid) AS with_check
FROM pg_policy pol
         JOIN pg_class c ON c.oid = pol.polrelid
         LEFT JOIN pg_namespace n ON n.oid = c.relnamespace;
```
