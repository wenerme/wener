---
title: Schema Ownership
tags:
  - Design
---

# Schema Ownership

Ownership 描述“资源归谁管理、谁可以默认访问、谁创建/修改/删除了资源”。它是资源权限、分享、孤儿对象处理、审计的基础。

## created_by vs owner

| column          | 语义                            | 是否用于权限  |
| --------------- | ------------------------------- | ------------- |
| `created_by_id` | 谁创建了资源                    |               |
| `updated_by_id` | 谁最后修改                      | 审计          |
| `deleted_by_id` | 谁删除                          | 审计          |
| `owner_id`      | 资源当前所有者                  | 可以用于权限  |
| `owner_type`    | owner 类型                      | 可以用于权限  |
| `owner_user_id` | owner 为 user 时的生成/冗余字段 | 方便查询/授权 |
| `owner_team_id` | owner 为 team 时的生成/冗余字段 | 方便查询/授权 |

:::warning

不要把 `created_by` 直接等同于 owner。资源可能由管理员代建、从外部导入、转移所有权，或者由系统创建。

:::

## owner 模型

### 单一用户 owner

简单系统可以只用：

```sql
owner_user_id text
```

适合：个人资源、个人 token、个人文档。

### 多态 owner

如果资源可能归属于用户、团队、组织、部门：

```sql
owner_type text,
owner_id text
```

可选 generated column：

```sql
owner_user_id text generated always as (
  case owner_type when 'User' then owner_id end
) stored,
owner_team_id text generated always as (
  case owner_type when 'Team' then owner_id end
) stored
```

PG 也可以用 expression index：

```sql
create index idx_resource_owner_user
  on resource ((case when owner_type = 'User' then owner_id end));
```

### 系统资源

系统内置资源可以使用：

```text
owner_type = 'System'
owner_id = 'system'
```

或 `owner_*` 为空，并通过：

```text
visibility = system
```

表达。

## visibility

常见可见性：

| value          | 说明                      |
| -------------- | ------------------------- |
| `private`      | owner 可见/可用           |
| `shared`       | 通过 grant/share 表授权   |
| `team`         | owner team 或当前团队可见 |
| `organization` | 组织内可见                |
| `global`       | 登录用户可见/可用         |
| `public`       | 匿名可见，谨慎使用        |
| `system`       | 系统内置，通常 admin 管理 |

建议字段：

```sql
visibility text not null default 'private'
```

如果可见性有原因或审批：

```sql
visibility_changed_at timestamptz,
visibility_changed_by_id text,
visibility_reason text
```

## 共享授权

owner/visibility 只能表达默认规则。复杂分享应使用 grant 表：

```sql
create table resource_grant (
  id text primary key,
  resource_type text not null,
  resource_id text not null,
  principal_type text not null, -- user | team | group | role | token
  principal_id text not null,
  action text not null,
  effect text not null default 'allow',
  created_by_id text,
  created_at timestamptz not null default now(),
  deleted_at timestamptz
);
```

如果系统已有通用 `auth_permission_grant`，优先使用通用表，避免每类资源都建一套 grant。

## 组织/租户

多租户系统通常需要：

```sql
tenant_id text not null
```

tenant 与 owner 不等价：

- `tenant_id`：数据隔离边界。
- `owner_*`：资源归属和默认授权。
- `created_by_*`：审计。

## 孤儿对象

用户/团队删除后，资源可能变成孤儿。常见策略：

- 转给系统 owner。
- 转给管理员或团队 owner。
- 标记 `state = 'orphaned'`。
- 保留 owner id 但 user 不存在，用于审计。

不要在无策略时随用户删除级联删除重要资源。

## 示例

```sql
create table resource (
  id text primary key,
  name text not null unique,
  title text,

  owner_type text,
  owner_id text,
  owner_user_id text generated always as (
    case owner_type when 'User' then owner_id end
  ) stored,
  owner_team_id text generated always as (
    case owner_type when 'Team' then owner_id end
  ) stored,
  visibility text not null default 'private',

  created_by_user_id text,
  updated_by_user_id text,
  deleted_by_user_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);
```

## 反例

- 只有 `created_by`，没有 `owner`，导致无法转移所有权。
- `owner_id` 没有 `owner_type`，未来无法支持团队/组织。
- `visibility = public` 但资源包含 secret 或敏感配置。
- 资源表和授权表分别在不同数据库，导致鉴权跨库。

## 既有表改造顺序

给已有资源表补 ownership/auditor 字段时，建议分阶段：

1. **先补审计字段**：`created_by_*`、`updated_by_*`、`deleted_by_*`。如果已有 `created_by` / `updated_by`，先明确语义，不必一次性改名。
2. **再补 owner 字段**：简单场景先加 `owner_user_id`；需要团队/组织时再用 `owner_type + owner_id`。
3. **补 visibility**：默认用 `private` / `global` / `system`，历史公共配置可回填为 `system` 或 `global`。
4. **补索引**：`owner_user_id`、`visibility`、`created_by_*`、`updated_by_*`、`deleted_at`。
5. **服务写入当前用户**：Create 写 `created_by`、`owner_user_id`；Update 写 `updated_by`；Delete 写 `deleted_by` 和 `deleted_at`。
6. **最后接授权逻辑**：list 过滤、get/use/manage 检查、grant/share。

历史数据回填建议：

```text
owner_user_id = null
visibility = system 或 global
created_by_user_id = null
```

不要为了回填而伪造创建人；未知就保持 null，并用 visibility 表达默认可见范围。

## 实践参考

`account`、`lead`、`file`、`flow`、`preference` 等表使用同一套 owner 模式：

```sql
owner_id text,
owner_type text,
owner_user_id text generated always as (
  case owner_type when 'User' then owner_id end
) stored,
owner_team_id text generated always as (
  case owner_type when 'Team' then owner_id end
) stored
```

并通过 generated column 对 `users` / `team` 建外键。详见 [Schema Wode Practice](./design-schema-wode.md)。

## 相关

- [Schema Design](./README.md)
- [Schema Auth](./design-schema-auth.md)
- [Schema Resource](./design-schema-resource.md)
- [Schema Wode Practice](./design-schema-wode.md)
