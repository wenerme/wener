---
title: Schema State
tags:
  - Design
---

# Schema State

状态字段用于描述资源当前处于什么阶段、是否可用、为什么变成这样，以及状态变化发生在什么时候。

## state vs status

推荐区分：

| column             | 语义         | 特点                                                   |
| ------------------ | ------------ | ------------------------------------------------------ |
| `state`            | 系统状态     | 少量固定值，系统内部控制，不鼓励用户自定义             |
| `status`           | 业务状态     | 面向业务流程，可扩展，可展示给用户                     |
| `lifecycle_status` | 生命周期状态 | 更明确表达生命周期阶段，适合 catalog/imported resource |
| `health_status`    | 健康状态     | 适合服务、连接、探针                                   |
| `sync_status`      | 同步状态     | 适合同步/导入任务                                      |

示例：

```text
state: active | disabled | deleted | archived
status: pending_review | approved | rejected | suspended
health_status: healthy | degraded | unhealthy | unknown
sync_status: pending | running | success | failed
```

:::tip

如果只有一个字段，优先使用语义最明确的名字。不要所有东西都叫 `status`。

:::

## 状态原因和时间

常见字段：

| column              | 说明                |
| ------------------- | ------------------- |
| `state`             | 系统状态            |
| `state_changed_at`  | state 最近变化时间  |
| `state_reason`      | state 变化原因代码  |
| `state_message`     | state 变化说明      |
| `status`            | 业务状态            |
| `status_changed_at` | status 最近变化时间 |
| `status_reason`     | status 原因代码     |
| `status_message`    | status 说明         |

命名建议：

- 机器可判断原因：`*_reason`，使用稳定 code，例如 `quota_exceeded`。
- 人类可读说明：`*_message`，可以变化，不作为逻辑依赖。
- 变化时间：`*_changed_at`。
- 不建议用 `*_time` 表示系统字段；系统时间统一 `*_at`。

## enabled / disabled

简单开关可以用：

```sql
enabled bool not null default true
```

如果需要知道为什么禁用、谁禁用、什么时候禁用，则使用：

```sql
disabled_at timestamptz,
disabled_by_id text,
disabled_reason text,
disabled_message text
```

不要同时维护多个互相冲突的字段，例如：

```text
enabled=false
state=active
status=enabled
```

如果需要保留 `enabled` 作为查询优化，可以让它由 `state` 推导，或在应用层统一维护。

## 软删除

通用字段：

```sql
deleted_at timestamptz,
deleted_by_id text,
deleted_reason text
```

建议：

- 业务查询默认过滤 `deleted_at is null`。
- 强审计场景不要物理删除。
- 唯一约束要考虑软删除后的重名策略。

PG partial unique 示例：

```sql
create unique index uk_resource_name_active
  on resource (tenant_id, name)
  where deleted_at is null;
```

## 状态流转记录

如果状态变化需要审计、回溯、触发通知，建议单独记录事件表：

```sql
create table resource_state_event (
  id text primary key,
  resource_id text not null,
  from_state text,
  to_state text not null,
  reason text,
  message text,
  actor_id text,
  request_id text,
  trace_id text,
  created_at timestamptz not null default now()
);
```

主表保存当前状态，事件表保存历史。

## 任务状态

任务/工作流通常需要更细：

```text
pending
queued
running
succeeded
failed
canceled
timeout
skipped
```

常用字段：

```sql
state text not null default 'pending',
started_at timestamptz,
finished_at timestamptz,
failed_at timestamptz,
error_code text,
error_message text,
retry_count bigint not null default 0
```

## 外部资源生命周期

同步外部系统时，建议区分：

```text
lifecycle_status  -- 外部资源生命周期
sync_status       -- 本地同步状态
imported_at       -- 本地导入时间
source_updated_at -- 外部更新时间
```

例如：

```sql
lifecycle_status text,
sync_status text,
source_updated_at timestamptz,
imported_at timestamptz not null default now()
```

## 反例

- 用 `status` 同时表达健康、生命周期、审批、同步结果。
- 只记录 `disabled = true`，没有原因和时间。
- 错误信息直接写入 `status`，导致状态值不可枚举。
- 在 `metadata.status` 中藏业务状态。

## Wode 实践参考

历史 Wode schema 中，`lead` 使用了较完整的状态模式：

```sql
state text not null default 'Open' references lead_state_type (value),
status text not null default 'New',
status_reason text,
status_updated_at timestamptz,
status_updated_by_id text references users (id),
foreign key (tid, status) references lead_status_type (tid, value)
```

其中 `state` 是系统枚举，`status` 是租户字典。新设计中建议把 `status_updated_at` 命名为 `status_changed_at`，语义更通用。详见 [Schema Wode Practice](./design-schema-wode.md)。

## 相关

- [Schema Design](./README.md)
- [Schema Resource](./design-schema-resource.md)
- [Schema Logging](./design-schema-logging.md)
- [Schema Wode Practice](./design-schema-wode.md)
