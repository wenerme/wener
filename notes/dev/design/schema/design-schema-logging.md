---
title: Schema Logging
tags:
  - Design
---

# Schema Logging

Logging 表用于记录请求、审计、事件、指标事实。日志类数据通常是 append-only：写入一次，之后主要用于查询、分析、审计、报表和排障。

## 日志类型

| 类型         | 说明                       | 示例                             |
| ------------ | -------------------------- | -------------------------------- |
| Request Log  | 每次 HTTP/RPC 请求完成记录 | `request_log`、`api_request_log` |
| Audit Log    | 业务行为审计               | `audit_log`                      |
| Event Log    | 领域事件/状态变更          | `resource_event`                 |
| Security Log | 登录、鉴权、权限拒绝       | `security_event`                 |
| Job Log      | 任务运行历史               | `job_run_log`                    |
| Usage Fact   | 计量/用量事实              | `usage_fact`                     |

:::tip

Request Log 说明“发生了一个请求”；Audit Log 说明“某个主体对某个业务资源做了什么”。两者可以关联，但不要混成一张语义不清的表。

:::

## 通用字段

日志表常见字段：

```sql
create table logging(
  id text primary key,
  created_at timestamptz not null default now(),
  trace_id text,
  span_id text,
  request_id text,
  session_id text,
  user_id text,
  actor_id text,
  operator_id text,
  tenant_id text,
  env text,
  service text,
  operation text,
  action text,
  target_type text,
  target_id text,
  target_name text,
  result text,
  status_code int,
  duration_ms bigint,
  error bool not null default false,
  error_code text,
  error_type text,
  error_message text,
  metadata jsonb
);
```

字段命名建议：

- 用 `created_at` 表示日志写入时间。
- 用 `event_time` / `occurred_at` 表示外部事件发生时间。
- 用 `trace_id`、`request_id` 关联请求链路。
- 用 `actor_id` 表示认证主体，用 `operator_id` 表示代操作人，用 `user_id` 表示业务目标用户或有效用户。

## Request Log

Request Log 面向 HTTP/RPC 层，推荐 OTel-like flat fields：

```sql
create table request_log (
  id text primary key,
  created_at timestamptz not null default now(),

  trace_id text,
  span_id text,
  request_id text,

  service text,
  deployment_environment text,

  http_request_method text,
  url_path text,
  url_query text,
  network_protocol_version text,
  user_agent_original text,
  client_ip text,

  rpc_system text,
  rpc_service text,
  rpc_method text,
  rpc_endpoint text,
  rpc_status_code int,

  auth_user_id text,

  http_response_status_code int,
  http_request_body_size bigint,
  http_response_body_size bigint,
  duration_ms bigint not null,

  error bool not null default false,
  error_code text,
  error_type text,
  error_message text,

  attributes jsonb
);
```

建议：

- 不记录完整 URL：拆成 `url_path` + redacted `url_query`。
- 不记录 Authorization、Cookie、Token。
- 非 RPC 请求不要填充 `rpc_*` 字段。
- 保持 flat 字段，便于日志系统和 SQL 查询。

## Audit Log

Audit Log 面向业务行为：

```sql
create table audit_log (
  id text primary key,
  created_at timestamptz not null default now(),

  trace_id text,
  request_id text,

  user_id text,
  actor_id text,
  operator_id text,
  tenant_id text,

  service text,
  operation text,
  action text not null,
  category text,

  target_type text,
  target_id text,
  target_name text,

  result text not null, -- success | error | denied
  status_code int,
  duration_ms bigint,

  error bool not null default false,
  error_code text,
  error_type text,
  error_message text,

  request_summary jsonb,
  response_summary jsonb,
  metadata jsonb
);
```

Audit Log 应记录：

```text
谁 在什么时候 通过什么服务 对什么资源 做了什么 结果如何
```

不要记录：

```text
完整请求体
完整响应体
secret/token/password
Authorization header
完整数据库连接串
大体积 payload
```

如果为了查询方便，可以把常用 summary 字段平铺：

```text
request_names_count
request_include_secrets
response_rows_count
payload_id
payload_name
payload_type
```

## 安全与脱敏

日志写入前必须脱敏：

| 数据                              | 处理                                      |
| --------------------------------- | ----------------------------------------- |
| password/passwd/pwd               | `<redacted>`                              |
| token/access_token/api_key/secret | `<redacted>`                              |
| Authorization/Cookie              | 不记录或 `<redacted>`                     |
| URL userinfo                      | 移除或 `<redacted>`                       |
| DB URL                            | 只记录 host/db/type，不记录 user/password |
| 请求/响应 body                    | 默认不记录，只记录 bounded summary        |

建议有统一 redactor：

```text
redactText()
redactUrl()
redactHeaders()
redactObject()
```

## 分区与保留

日志表通常增长快，建议：

- 按时间分区：day/month。
- 设置 retention：例如 30/90/180 天。
- 热数据在 OLTP/日志系统，冷数据归档到对象存储。
- 高写入日志可先进入队列/日志系统，再异步落库。

PG 示例：

```sql
create table audit_log (
  id text not null,
  created_at timestamptz not null default now(),
  action text not null,
  result text not null,
  metadata jsonb,
  primary key (created_at, id)
) partition by range (created_at);
```

## 索引建议

Request Log：

```sql
create index idx_request_log_created_at on request_log (created_at desc);
create index idx_request_log_trace_id on request_log (trace_id);
create index idx_request_log_request_id on request_log (request_id);
create index idx_request_log_rpc on request_log (rpc_service, rpc_method, created_at desc);
create index idx_request_log_http_status on request_log (http_response_status_code, created_at desc);
```

Audit Log：

```sql
create index idx_audit_log_created_at on audit_log (created_at desc);
create index idx_audit_log_user on audit_log (user_id, created_at desc);
create index idx_audit_log_action on audit_log (action, created_at desc);
create index idx_audit_log_target on audit_log (target_type, target_id, created_at desc);
create index idx_audit_log_trace on audit_log (trace_id);
```

## 数据库边界

日志类数据适合分析库/PG/ClickHouse/日志系统，因为它们通常是：

- append-only；
- 单次写入；
- 查询分析多于事务修改；
- 可按时间分区和归档。

但 operational control-plane 数据，例如用户、token、权限 grant、业务配置，不应仅因为“也会被查询”就放进日志/分析库。

一个实用划分：

```text
云托管 MySQL / OLTP:
  可修改控制面、用户、token、配置、权限 grant

自维护 PG / 分析面:
  snapshot、recon、catalog read model、append-only audit/request logs
```

AuditLog / RequestLog 未来适合进入分析面，因为它们通常是单次写入、append-only、按时间查询和审计分析；但用户、token、权限 grant 这类可变控制面仍应留在 OLTP/control-plane DB。

## 反例

- AuditLog 中保存完整 request/response。
- RequestLog 记录完整 URL 和 Authorization header。
- 日志表没有时间字段或时间索引。
- 把可变业务状态塞进 append-only log 表后再当真源使用。
- 错误消息未脱敏，泄露 token 或连接串。

## Wode 实践参考

历史 Wode `http_request_log` 保存了 `method/origin/pathname/url/query/request_headers/request_payload/response_payload/status_code/duration` 等字段，适合作为 request log 早期形态参考。

新设计需要保留它的请求/响应分离思想，但默认避免保存完整 headers/body，尤其是 Authorization、Cookie、token、secret、连接串。详见 [Schema Wode Practice](./design-schema-wode.md)。

## 相关

- [Schema Auth](./design-schema-auth.md)
- [Schema State](./design-schema-state.md)
- [Schema Resource](./design-schema-resource.md)
- [Schema Wode Practice](./design-schema-wode.md)
