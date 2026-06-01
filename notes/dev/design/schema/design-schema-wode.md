---
title: Schema Wode Practice
tags:
  - Design
---

# Schema Wode Practice

```sql
create table res(
  id          text        not null default '<tag>_' || public.gen_ulid() primary key,
  uid         uuid        not null default gen_random_uuid() unique,
  created_at  timestamptz not null default current_timestamp,
  updated_at  timestamptz not null default current_timestamp,
  deleted_at  timestamptz,
  tid         text        not null default public.current_tenant_id() references public.tenant (tid),
  eid         text,

  attributes  jsonb       not null default '{}',
  properties  jsonb       not null default '{}',
  extensions  jsonb       not null default '{}',
  unique (tid, eid)
);
```

实践特征：

- type-prefixed ID：`usr_`、`team_`、`lead_`、`file_`。
- `uid uuid` 作为额外全局 UUID。
- `tid` 作为租户隔离字段，默认来自 `current_tenant_id()`。
- `eid` 作为外部/导入关联 ID。
- `created_at/updated_at/deleted_at` 作为基础审计时间。
- `attributes/properties/extensions` 三层扩展字段大量使用。

## Resource 相关实践

示例：`users.sql`、`account.sql`、`lead.sql`、`file.sql`。

资源表通常包含：

```text
id / uid / tid / eid
created_at / updated_at / deleted_at
业务唯一字段：code、name、login_name、email 等
state / status
owner_id / owner_type
created_by_id / updated_by_id / deleted_by_id
attributes / properties / extensions
```

```sql
sid bigint not null default public.next_entity_sid('Lead')
```

作为面向用户/业务的序列号。

## Ownership 相关实践

典型模式：

```sql
create table has_owner(
  owner_id      text,
  owner_type    text,
  owner_user_id text generated always as (
    case owner_type when 'User' then owner_id end
  ) stored,
  owner_team_id text generated always as (
    case owner_type when 'Team' then owner_id end
  ) stored,

  created_by_id text default public.current_user_id() references users (id),
  updated_by_id text default public.current_user_id() references users (id),
  deleted_by_id text references users (id)
);
```

- `owner_type + owner_id` 支持多态 owner。
- `owner_user_id / owner_team_id` generated column 让外键和索引可落地。
- auditor 字段与 owner 字段分离。

## Status

```sql
create table if not exists lead(
  -- System State
  state                text not null default 'Open' references lead_state_type (value),
  -- Bussiness Status
  status               text not null default 'New',
  --
  status_reason        text,
  status_updated_at    timestamptz,
  status_updated_by_id text references users (id) on update cascade on delete set null,
  -- usesing fk as constraint
  foreign key (tid, status) references lead_status_type (tid, value)
);
```

- `state` 更偏系统/全局枚举。
- `status` 更偏租户可配置业务阶段。
- `status_reason/status_updated_at/status_updated_by_id` 用于解释业务状态变化。
- 状态类型表可拆成系统字典和租户字典。

## Dictionary / Enum 实践

```sql
create table if not exists tpl_sys_dict (
  value text not null primary key,
  label text,
  display_order bigint default nextval('seq_display_order'),
  attributes jsonb not null default '{}'::jsonb,
  properties jsonb not null default '{}'::jsonb,
  extensions jsonb not null default '{}'::jsonb
);
```

```sql
create table if not exists tpl_dict_type (
  id text not null default 'dictv_' || public.gen_ulid() primary key,
  uid uuid not null default gen_random_uuid() unique,
  tid text not null default public.current_tenant_id() references public.tenant (tid),
  value text not null,
  label text not null,
  display_order bigint not null default nextval('seq_display_order'),
  active bool not null default true,
  metadata jsonb not null default '{}',
  unique (tid, value)
);
```

实践要点：

- 系统枚举：不带租户，主键 `value`。
- 租户字典：带 `tid`，`unique(tid, value)`。
- `extensions` 可承载映射，例如 status -> state。

## 多态关联实践

### entity_label

```sql
entity_id   text not null,
entity_type text,
account_id  text generated always as (
  case when entity_type = 'Account' then entity_id end
) stored,
foreign key (account_id) references account (id) on delete cascade
```

### entity_connection

表达两个任意实体的连接：

```sql
entity1_id      text not null,
entity1_type    text not null,
entity1_role    text,
entity2_id      text not null,
entity2_type    text not null,
entity2_role    text,
connection_type text not null default 'Connection'
```

并通过：

```sql
create unique index ... on entity_connection (
  tid,
  least(entity1_id, entity2_id),
  greatest(entity1_id, entity2_id)
) where connection_type = 'Connection';
```

避免无向连接重复。

## 文件/对象实践

```text
filename / ext / mime_type
tags text[]
md5 / sha256 / size
hash generated as coalesce(sha256, md5)
data / text / markdown
width / height / length / duration
origin_url / object_url / ref_url
entity_type / entity_id
```

实践要点：

- 文件内容、对象元数据、业务附件可以拆表。
- hash 可用于去重。
- `entity_type/entity_id` 支持附件绑定任意业务对象。

## Logging 实践

`http_request_log.sql` 历史设计包含：

```sql
create table http_request_log(
  method text not null,
  origin text not null,
  pathname text not null,
  url text not null,
  query jsonb default '{}',
  request_headers jsonb default '{}',
  request_payload jsonb,
  request_body bytea,
  response_headers jsonb default '{}',
  response_payload jsonb,
  response_body bytea,
  content_type text,
  content_length int,
  ok boolean,
  status_code int,
  status_text text,
  duration int,
  hit int not null default 0
);
```

- request/response summary 分离。
- `duration`、`status_code`、`pathname` 建索引。
- 默认不应保存完整 header/body，容易泄露 token/secret。
- 新设计应使用 redacted flat fields，例如 `url_path`、`url_query`、`duration_ms`。
- request log 与 audit log 应分离。

## 可反哺到新 schema 文档的要点

1. type-prefixed ID + `uid` + `tid` + `eid` 的资源表模式。
2. `attributes/properties/extensions` 三层扩展语义。
3. `owner_type/owner_id` + generated `owner_user_id/owner_team_id` 模式。
4. `created_by_id/updated_by_id/deleted_by_id` auditor 字段。
5. `state/status/status_reason/status_updated_at/status_updated_by_id` 模式，并推荐新命名 `status_changed_at`。
6. 系统字典 vs 租户字典两类模板。
7. 多态关联 generated column + FK 的技巧。
8. logging 模式，避免完整 header/body 和 secret 泄露。
