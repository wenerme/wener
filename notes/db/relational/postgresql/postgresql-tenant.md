---
title: PostgreSQL Tenant
---

# PostgreSQL Tenant

- [System Administration Functions](https://www.postgresql.org/docs/current/functions-admin.html)
- [geckoboard/pgulid](https://github.com/geckoboard/pgulid)
  - Pure pgsql ULID

```sql
-- name, value, local
select set_config('tenant.id', 1000, true);
set tenant.id = 1000;

-- name, optional
select current_setting('tenant.id',true);
show tenant.id;
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

-- generate_res_sid
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
