---
title: Schema Auth
tags:
  - Design
---

# Schema Auth

Auth 通常分为：

- AuthN：Authentication，识别“你是谁”。
- AuthZ：Authorization，判断“你能做什么”。
- Token / Session：承载身份和访问上下文。

## Authentication

常见身份表：

```sql
create table app_user (
  id text primary key,
  username text not null unique,
  email text unique,
  phone text unique,
  password_hash text,
  role text not null default 'user',
  state text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);
```

注意：

- 不存明文密码。
- `password_hash` 不应返回给 API 客户端。
- `role` 可以作为简单系统的 base role。
- 多身份来源可拆 `identity` / `account` / `user_identity`。

## Access Token / Personal Access Token

Token 表建议只存 hash：

```sql
create table access_token (
  id text primary key,
  user_id text not null,
  name text not null,
  token_hash text not null unique,
  token_prefix text,
  token_type text not null default 'pat',
  scopes jsonb,
  expires_at timestamptz,
  last_used_at timestamptz,
  revoked_at timestamptz,
  disabled_at timestamptz,
  created_at timestamptz not null default now()
);
```

字段说明：

| column         | 说明                                        |
| -------------- | ------------------------------------------- |
| `token_hash`   | token hash，不保存明文                      |
| `token_prefix` | 便于 UI 展示/定位，例如 `pat_abc...` 的前缀 |
| `token_type`   | `pat`、`session`、`service_account` 等      |
| `scopes`       | 粗粒度 scope，可选                          |
| `expires_at`   | 过期时间                                    |
| `last_used_at` | 最近使用                                    |
| `revoked_at`   | 撤销时间                                    |
| `disabled_at`  | 禁用时间                                    |

:::warning

Token 明文只在创建时返回一次。日志、审计、错误信息中不要记录 token、Authorization header、cookie。

:::

## Authorization

### 简单 role 模型

小系统可以先用：

```text
user.role = super | admin | operator | user | guest
```

适合粗粒度控制：

```text
admin 可以管理配置
user 可以读取自己的资源
super 可以 impersonate
```

### 资源实例授权

当需要表达：

```text
用户 A 能 query datasource xyz
用户 B 能 use MCP server abc
某个 token 只能 call 某些 endpoint
```

应使用 grant 表，而不是只靠 role。

```sql
create table auth_permission_grant (
  id text primary key,

  principal_type text not null, -- user | role | token | group | service_account
  principal_id text not null,

  effect text not null default 'allow', -- allow | deny

  subject_type text not null, -- DataSource | McpServer | RpcEndpoint | ...
  subject_id text,
  subject_name text,

  action text not null, -- read | query | use | call | manage | view_sensitive

  conditions jsonb,
  fields jsonb,

  enabled bool not null default true,
  valid_from timestamptz,
  valid_until timestamptz,

  reason text,
  created_by_user_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);
```

建议一行一个 action，方便索引、排查、审计。

常用索引：

```sql
create index idx_auth_grant_principal
  on auth_permission_grant (principal_type, principal_id);
create index idx_auth_grant_subject
  on auth_permission_grant (subject_type, subject_id);
create index idx_auth_grant_subject_name
  on auth_permission_grant (subject_type, subject_name);
```

## RBAC 表何时需要

不要过早引入完整 RBAC 表族。只有当需要以下能力时再考虑：

- 一个用户多个角色；
- 自定义角色；
- 角色继承；
- 角色模板；
- UI 管理权限策略；
- group/team 统一授权。

可选表：

```text
auth_role
auth_role_binding 或 user_role
auth_policy
auth_policy_binding
auth_group
auth_group_member
```

第一阶段通常可以：

```text
user.role + auth_permission_grant
```

## AuthZ Action / Subject

推荐 action：

```text
call
read
query
use
execute
create
update
delete
manage
view_sensitive
```

推荐 subject：

```text
RpcEndpoint
DataSource
McpServer
McpTool
User
AuditLog
Secret
```

表达示例：

```ts
can('call', subject('RpcEndpoint', { endpoint: 'fusion.sidecar.ds.v1.SqlService.Query' }));
can('query', subject('DataSource', { name: 'fusion-pg-ro' }));
can('use', subject('McpServer', { name: 'grafana-prod' }));
```

## 落地顺序

资源权限不要一开始就做成完整 RBAC 平台，推荐顺序：

1. **Base role**：继续使用已有 `user.role` / token scopes 做粗粒度门槛。
2. **资源表补 owner/visibility**：让资源实例可以被判断归属和默认可见性。
3. **服务层检查**：先对 `get/use/query/manage` 这类关键路径加 `assertCan()`。
4. **List 过滤**：列表接口返回调用者可见资源，而不是返回全部后再报错。
5. **Permission grant**：新增 `auth_permission_grant`，支持 user/token/role/group 对资源实例授权。
6. **自定义角色**：只有需要多角色、角色模板、UI 管理策略时，再引入 `auth_role` / `auth_policy`。

对于已有系统，第一阶段通常是：

```text
user.role + resource.owner_user_id + resource.visibility + auth_permission_grant
```

## 数据库边界

资源表与授权表尽量同库，否则每次授权判断需要跨库。

例如：

```text
agent_mcp_server       在 MySQL
sidecar_datasource_def 在 MySQL
auth_permission_grant  也应在 MySQL
```

分析型 read model 可以在 PG，但 operational auth/control-plane 数据不一定要迁 PG。

## 安全日志

Auth 相关日志只能记录：

```text
user_id
token_id
token_type
request_id
trace_id
action
subject
result
reason_code
```

不要记录：

```text
password
token 明文
Authorization header
cookie
secret key
完整连接串
```

## 相关

- [Schema Ownership](./design-schema-ownership.md)
- [Schema Logging](./design-schema-logging.md)
- [Schema Resource](./design-schema-resource.md)
