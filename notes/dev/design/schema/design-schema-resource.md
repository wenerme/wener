---
title: Schema Resource
tags:
  - Design
---

# Schema Resource

资源表是系统里“可以被引用、展示、管理、授权、审计”的核心对象表，例如 user、team、datasource、mcp_server、order、document、workflow。

:::tip

资源表的重点不是“字段越全越好”，而是让对象具备稳定身份、可追踪来源、可扩展元数据、可软删除、可做权限和审计。

:::

## 命名

- 表名推荐单数：`account`、`document`、`datasource_def`。
- 部分保留词或约定俗成可用复数或前缀：`users`、`groups`、`app_user`。
- 字段尽量不用缩写：`created_at` 优于 `ctime`。
- 外部来源字段建议使用明确前缀：`source_type`、`source_id`、`external_id`。
- 面向用户的名字与系统名字分离：
  - `name`：稳定 key，可用于路径/引用。
  - `title`：展示名，可变。
  - `description`：描述。

## 基础字段

常见资源表字段：

| column              | 说明                                 |
| ------------------- | ------------------------------------ |
| `id`                | 主键，推荐 type-prefixed UUIDv7/ULID |
| `uid`               | UUID，适合跨系统关联或暴露           |
| `sid`               | 租户/业务维度自增编号，用户友好      |
| `tenant_id` / `tid` | 租户 ID，多租户系统需要              |
| `name`              | 稳定名称/唯一 key                    |
| `title`             | 展示名                               |
| `description`       | 描述                                 |
| `created_at`        | 创建时间                             |
| `updated_at`        | 更新时间                             |
| `deleted_at`        | 软删除时间                           |
| `version`           | 乐观锁/配置版本                      |

## 来源字段

用于导入、同步、对账、跨系统关联：

| column              | 说明                                          |
| ------------------- | --------------------------------------------- |
| `source_type`       | 来源系统，例如 `github`、`stripe`、`platform` |
| `source_id`         | 来源系统对象 ID                               |
| `source_name`       | 来源系统对象名称，可选                        |
| `source_updated_at` | 来源系统更新时间                              |
| `imported_at`       | 本系统导入/同步时间                           |
| `raw`               | 外部原始数据，通常 json/jsonb                 |

建议：

```sql
unique (source_type, source_id)
```

如果是多租户：

```sql
unique (tenant_id, source_type, source_id)
```

## 扩展字段

| column       | 读写方              | 用途                         |
| ------------ | ------------------- | ---------------------------- |
| `metadata`   | 服务端/客户端均可读 | 补充说明，不应成为强业务依赖 |
| `attributes` | 客户端可写          | 用户自定义属性               |
| `properties` | 服务端写、客户端读  | 服务端计算/托管属性          |
| `extensions` | 内部使用            | 不对外暴露的扩展数据         |
| `raw`        | 外部导入            | 原始外部数据                 |

:::warning

不要把关键业务状态藏在 `metadata`。如果需要查询、索引、授权或稳定约束，应提升为明确字段。

:::

## 示例

PostgreSQL：

```sql
create table datasource_def (
  id text primary key default ('dsd_' || replace(gen_random_uuid()::text, '-', '')),
  uid uuid not null default gen_random_uuid(),
  name text not null,
  title text,
  description text,

  source_type text,
  source_id text,
  source_updated_at timestamptz,
  imported_at timestamptz,

  metadata jsonb,
  attributes jsonb,
  properties jsonb,
  extensions jsonb,
  raw jsonb,

  version bigint not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,

  unique (name),
  unique (uid)
);
```

MySQL：

```sql
create table datasource_def (
  id varchar(64) not null primary key,
  name varchar(128) not null,
  title text,
  description text,
  metadata json,
  attributes json,
  properties json,
  version bigint not null default 1,
  created_at datetime(3) not null default current_timestamp(3),
  updated_at datetime(3) not null default current_timestamp(3) on update current_timestamp(3),
  deleted_at datetime(3) null,
  unique key uk_datasource_def_name (name),
  key idx_datasource_def_deleted_at (deleted_at)
);
```

## 索引建议

- 主键：`id`。
- 唯一业务键：`name`、`slug`、`source_type + source_id`。
- 常用过滤：`tenant_id`、`deleted_at`、`created_at`、`updated_at`。
- 标签/JSON：PG 可用 `jsonb` GIN 或 `text[]` GIN；MySQL JSON 查询要谨慎。
- 软删除唯一约束：PG 可用 partial unique index；MySQL 通常需要应用层约束或 generated column。

## 表分类

| 类型        | 示例                         | 常见字段                                 |
| ----------- | ---------------------------- | ---------------------------------------- |
| 主要资源表  | user、document、mcp_server   | id/name/title/owner/status/audit fields  |
| 关联表      | group_member、resource_label | 两端 ID、role、created_at                |
| 事件/日志表 | audit_log、request_log       | append-only、trace/request/action fields |
| 快照/读模型 | model_snapshot、pricing_view | source/imported_at/raw                   |
| 系统配置表  | setting、feature_flag        | key/value/version                        |

## Wode 实践参考

历史 Wode schema 大量使用统一资源字段：

```sql
id text not null default '<tag>_' || public.gen_ulid() primary key,
uid uuid not null default gen_random_uuid() unique,
tid text not null default public.current_tenant_id(),
eid text,
attributes jsonb not null default '{}',
properties jsonb not null default '{}',
extensions jsonb not null default '{}'
```

并按 `(tid, eid)` 做导入关联唯一约束。详见 [Schema Wode Practice](./design-schema-wode.md)。

## 相关

- [Schema Design](./README.md)
- [Schema State](./design-schema-state.md)
- [Schema Ownership](./design-schema-ownership.md)
- [Schema Wode Practice](./design-schema-wode.md)
