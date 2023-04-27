---
title: Hasura
---

# Hasura

- [hasura/graphql-engine](https://github.com/hasura/graphql-engine)
  - Apache-2.0, MIT, Haskell
- [Working with schemaless data using GraphQL on Postgres](https://blog.hasura.io/574a1ee2e87f)
- [配置](https://docs.hasura.io/1.0/graphql/manual/deployment/graphql-engine-flags/reference.html)
  - `--unauthorized-role`/`HASURA_GRAPHQL_UNAUTHORIZED_ROLE` - 匿名角色
    - 例如配置为 `anonymous`
  - `--admin-secret`/`HASURA_GRAPHQL_ADMIN_SECRET` - 管理员密钥
  - `--cors-domain <DOMAINS>`/`HASURA_GRAPHQL_CORS_DOMAIN` - CORS 域名
  - `--disable-cors`
  - `--enable-telemetry <true|false>`/`HASURA_GRAPHQL_ENABLE_TELEMETRY`
- [接口文档](https://docs.hasura.io/1.0/graphql/manual/api-reference/index.html)
  - `/v1/graphql` - 主要的 GraphQL 入口 - 生产可以只暴露这一个
- Hasura 的系统信息存储在 `hdb_catalog` 和 `hdb_view` 中
- HGE - Hasura GraphQL Engine

:::info

- 唯一索引 查询 [#519](https://github.com/hasura/graphql-engine/issues/519)
- 命名转换 [#3320](https://github.com/hasura/graphql-engine/issues/3320)
  - v2.8.0+ [Postgres: Naming Conventions](https://hasura.io/docs/latest/schema/postgres/naming-convention/)
  - 默认都是数据库命名方式, snake_case, 前端使用非常别扭
- 不支持 gql union type [#2311](https://github.com/hasura/graphql-engine/issues/2311)
- pg array 不是 array [#348](https://github.com/hasura/graphql-engine/issues/348)
- 不支持 rate limit [#2151](https://github.com/hasura/graphql-engine/issues/2151)
- remote schema 不支持 subscribe [#1599](https://github.com/hasura/graphql-engine/issues/1599)
- deprecate field [#2695](https://github.com/hasura/graphql-engine/issues/2695)
- persists query [#273](https://github.com/hasura/graphql-engine/issues/273)
- uuid -> ID [#3578](https://github.com/hasura/graphql-engine/issues/3578)

:::

```bash
# 创建一个数据库
USERNAME=hasura
PASSWORD=hasura
DATABASE=hasura
# 登陆 console 使用的 token
TOKEN=$(cat /dev/urandom | env LC_CTYPE=C tr -dc 'a-zA-Z0-9' | head -c 32 | tee -)

docker run -d \
  -e POSTGRES_USER=$USERNAME -e POSTGRES_PASSWORD=$PASSWORD -e POSTGRES_DB=$DATABASE \
  -v $PWD/postgres/data:/var/lib/postgresql/data -p 5432:5432 \
  --name postgres postgres:12-alpine

# 使用已有数据库
# 控制台 http://localhost:8080/console
# https://hub.docker.com/r/hasura/graphql-engine
docker run -it --rm -p 8080:8080 \
  --link postgres:db \
  -e HASURA_GRAPHQL_DATABASE_URL=postgres://$USERNAME:$PASSWORD@db:5432/$DATABASE \
  -e HASURA_GRAPHQL_ENABLE_CONSOLE=true \
  -e HASURA_GRAPHQL_ADMIN_SECRET=$TOKEN \
  -e HASURA_GRAPHQL_UNAUTHORIZED_ROLE=anonymous \
  -e HASURA_GRAPHQL_ENABLE_TELEMETRY=false \
  --name hasura hasura/graphql-engine:latest
```

```sql
-- Hasura 生成 UUID 需要 pgcrypto
CREATE EXTENSION IF NOT EXISTS pgcrypto;
```

## JWT 鉴权

- 通过 `--jwt-secret` 启用 - 需要配置 `HASURA_GRAPHQL_JWT_SECRET`
- 通过头传递 JWT 信息 `Authorization: Bearer <JWT>`
- `X-Hasura-Role` 当前角色

**HASURA_GRAPHQL_JWT_SECRET**

```json
{
  // 加密算法 - 例如 对称加密 HS* 或 非对称加密 RS*
  "type": "<standard-JWT-algorithms>",
  // 对称加密使用密码 - HMAC
  // 非对称则为公钥 - 可以使用 JWKs 而不配置
  "key": "<optional-key-as-string>",
  // well known 的 url - 包含公钥等信息
  "jwk_url": "<optional-url-to-refresh-jwks>",
  // 命名空间 - 默认 https://hasura.io/jwt/claims
  "claims_namespace": "https://hasura.io/jwt/claims",
  // jwt claims 中的格式 - JSON 对象或字符串编码的 JSON
  "claims_format": "json|stringified_json",
  // jwt 目标对象 - 例如指定 myapp-1 - 一般用于多租户或多应用
  "audience": "<optional-string-or-list-of-strings-to-verify-audience>",
  // 在校验时验证发送方
  "issuer": "<optional-string-to-verify-issuer>"
}
```

**JWT 内容**

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true,
  "iat": 1516239022,
  "https://hasura.io/jwt/claims": {
    "x-hasura-allowed-roles": ["user", "anonymous"],
    "x-hasura-default-role": "user",
    "x-hasura-user-id": "1234567890",
    "x-hasura-org-id": "123",
    "x-hasura-custom": "custom-value"
  }
}
```

- x-hasura-default-role
  - 默认角色 - 可以直接头部指定 x-hasura-role
  - 权限判断会使用该角色
- x-hasura-allowed-roles
  - 允许的角色 - 自定义 - 对应后台配置的权限
- https://hasura.io/jwt/claims
  - claims_namespace
  - claims_namespace_path

## 授权访问控制

- `X-Hasura-Admin-Secret` 头用于传递管理员密钥 - admin 角色
- `Authorization: Bearer <JWT>` JWT 鉴权
- 基于角色的权限控制 - 不支持级联角色 - 角色必须平坦
  - X-Hasura-Role
  - X-Hasura-Allowed-Roles
  - X-Hasura-Allowed-Ids
    - 支持数组
- 列控制
  - 可见性
- 行控制
  - 自定义表达式
    - `{"user_id":{"_eq":"X-Hasura-User-Id"}}` - 其中的 `X-Hasura-*` 会被替换
- 操作控制
  - CRUD
- 针对不同角色会生成不同 schema
- JWT
  - 必须包含字段 x-hasura-default-role, x-hasura-allowed-roles
  - 头里可指定 x-hasura-role 来选定角色
- x-hasura-use-backend-only-permissions: true
  - 针对 backend_only 角色

```json
{ "user_id": { "_eq": "X-Hasura-User-Id" } }
```

**中间关系**

```json
{
  "_or": [
    { "owners": { "user_id": { "_eq": "X-Hasura-User-Id" } } },
    { "editors": { "user_id": { "_eq": "X-Hasura-User-Id" } } },
    { "viewers": { "user_id": { "_eq": "X-Hasura-User-Id" } } }
  ]
}
```

**继承**

```json
{
  "_exists": {
    "_table": {
      "table": "flattened_user_roles",
      "schema": "public"
    },
    "_where": {
      "_and": [{ "user_id": { "_eq": "X-Hasura-User-Id" } }, { "role_id": { "_eq": "manager" } }]
    }
  }
}
```

- flattened_user_roles 为视图

```sql
CREATE OR REPLACE VIEW flattened_user_roles AS
WITH RECURSIVE sub_tree AS (
  SELECT
    roles.id AS role_id,
    user_roles.user_id AS user_id
  FROM
    user_roles,
    roles
  WHERE
    roles.id = user_roles.role_id
  UNION ALL
  SELECT
    r.id AS role_id,
    st.user_id AS user_id
  FROM
    roles r,
    sub_tree st
  WHERE
    r.parent_role_id = st.role_id
)
SELECT
  *
FROM
  sub_tree;
```

## Server

```ini
# 应用相关
HASURA_GRAPHQL_ADMIN_SECRET=$(uuidgen)
HASURA_GRAPHQL_JWT_SECRET='{"type": "HS256", "key": "$(uuidgen | tr -d -)","claims_namespace": "hasura"}'
# 数据库
HASURA_GRAPHQL_DATABASE_URL="postgres://hasura:hasura@postgres:5432/hasura?connect_timeout=10&application_name=hasura"
# 默认 HASURA_GRAPHQL_DATABASE_URL
HASURA_GRAPHQL_METADATA_DATABASE_URL="postgres://hasura:hasura@postgres:5432/hasura"
HASURA_GRAPHQL_CORS_DOMAIN="https://*.wener.me,http://localhost:9695"
# 可以在创建数据源时引用
APP_DATABASE_URL="postgres://hasura:hasura@postgres:5432/hasura?connect_timeout=10&application_name=hasura"

# 公共
HASURA_GRAPHQL_METADATA_DATABASE_EXTENSIONS_SCHEMA=hasura
HASURA_GRAPHQL_DEV_MODE=false
HASURA_GRAPHQL_ENABLE_MAINTENANCE_MODE=false
HASURA_GRAPHQL_ENABLE_METADATA_QUERY_LOGGING=false
HASURA_GRAPHQL_LOG_LEVEL=info
HASURA_GRAPHQL_ENABLE_REMOTE_SCHEMA_PERMISSIONS=true
HASURA_GRAPHQL_EXPERIMENTAL_FEATURES=naming_convention
HASURA_GRAPHQL_DEFAULT_NAMING_CONVENTION=graphql-default
HASURA_GRAPHQL_ENABLE_CONSOLE=true
HASURA_GRAPHQL_UNAUTHORIZED_ROLE=anonymous
HASURA_GRAPHQL_ENABLE_TELEMETRY=false

# 其他
HASURA_GRAPHQL_AUTH_HOOK=
HASURA_GRAPHQL_AUTH_HOOK_MODE=GET # POST
HASURA_GRAPHQL_AUTH_HOOK_SEND_REQUEST_BODY=true

HASURA_GRAPHQL_DISABLE_CORS=false
HASURA_GRAPHQL_ENABLE_ALLOWLIST=false # 预先配置的 Query/Mutation
HASURA_GRAPHQL_ENABLE_MAINTENANCE_MODE=false # 维护模式 - 不会更新 metadata
HASURA_GRAPHQL_ENABLE_METADATA_QUERY_LOGGING=false # 记录 metadata 查询


# 还支持 metrics
HASURA_GRAPHQL_ENABLED_APIS=metadata,graphql,pgdump,config
HASURA_GRAPHQL_ENABLED_LOG_TYPES=startup,http-log,webhook-log,websocket-log
HASURA_GRAPHQL_EVENTS_HTTP_POOL_SIZE=10
HASURA_GRAPHQL_EVENTS_FETCH_BATCH_SIZE=100
HASURA_GRAPHQL_EVENTS_FETCH_INTERVAL=

# inherited_roles, optimise_permission_filters, naming_convention, streaming_subscriptions, apollo_federation, hide_update_many_fields, bigquery_string_numeric_input, hide_aggregation_predicates, hide_stream_fields
HASURA_GRAPHQL_EXPERIMENTAL_FEATURES=
HASURA_GRAPHQL_GRACEFUL_SHUTDOWN_TIMEOUT=60
HASURA_GRAPHQL_LIVE_QUERIES_MULTIPLEXED_REFETCH_INTERVAL=1000
HASURA_GRAPHQL_LIVE_QUERIES_MULTIPLEXED_BATCH_SIZE=100

HASURA_GRAPHQL_INFER_FUNCTION_PERMISSIONS=true
HASURA_GRAPHQL_ENABLE_APOLLO_FEDERATION=false

HASURA_GRAPHQL_SCHEMA_SYNC_POLL_INTERVAL=1000
HASURA_GRAPHQL_SERVER_HOST=*
HASURA_GRAPHQL_SERVER_PORT=8080
HASURA_GRAPHQL_STREAMING_QUERIES_MULTIPLEXED_BATCH_SIZE=100
HASURA_GRAPHQL_STREAMING_QUERIES_MULTIPLEXED_REFETCH_INTERVAL=1000
HASURA_GRAPHQL_STRINGIFY_NUMERIC_TYPES=false
HASURA_GRAPHQL_CONNECTION_COMPRESSION=false
HASURA_GRAPHQL_WEBSOCKET_CONNECTION_INIT_TIMEOUT=3
HASURA_GRAPHQL_WEBSOCKET_KEEPALIVE=5
HASURA_GRAPHQL_WS_READ_COOKIE=false

HASURA_GRAPHQL_MAX_CACHE_SIZE=15 # MB - EE 版本
```

- https://hasura.io/docs/latest/deployment/graphql-engine-flags/reference/

## Hasura CLI

- .env
  - `--envfile`
  - https://hasura.io/docs/latest/hasura-cli/config-reference/#environment-variables

```bash
curl -Lo hasura https://github.com/hasura/graphql-engine/releases/download/v2.19.0/cli-hasura-$(go env GOOS)-$(go env GOARCH)
chmod +x hasura
mv hasura ~/bin

mkdir ~/.hasura
echo '{"enable_telemetry": false,"show_update_notification": false}' > ~/.hasura/config.json

hasura init --endpoint http://localhost:8080 --admin-secret $TOKEN hasura
cd hasura
# http://localhost:9695/console
hasura console
```

```ini title=".env"
HASURA_GRAPHQL_ENDPOINT=
HASURA_GRAPHQL_ADMIN_SECRET=

HASURA_GRAPHQL_METADATA_DIRECTORY=
HASURA_GRAPHQL_ACTIONS_HANDLER_WEBHOOK_BASEURL=
```

```txt
📂 metadata
├─ 📂 databases
│  ├─ 📂 default
│  │  └─ 📂 tables
│  │     ├─ 📄 <schema>_<table>.yaml
│  │     └─ 📄 tables.yaml
│  └── 📄 databases.yaml
├─ 📄 actions.graphql
├─ 📄 actions.yaml
├─ 📄 allow_list.yaml
├─ 📄 api_limits.yaml
├─ 📄 cron_triggers.yaml
├─ 📄 graphql_schema_introspection.yaml
├─ 📄 inherited_roles.yaml
├─ 📄 network.yaml
├─ 📄 query_collections.yaml
├─ 📄 remote_schemas.yaml
├─ 📄 rest_endpoints.yaml
└─ 📄 version.yaml
📂 migrations
└─ 📂 default
   └─ 📂 <timestamp>_<name>
      ├─ 📄 down.sql
      └─ 📄 up.sql
📂 seeds
📄 config.yaml
```

```bash
hasura migrate status

hasura migrate create "init" --from-server
hasura migrate apply --version 1550925483858 --type down --database-name <database-name>

hasura migrate squash --name AFTER --from FROM_VER --database-name DB

hasura migrate delete --all --server --database-name DB
```

- Metadata
  - https://hasura.io/docs/latest/migrations-metadata-seeds/metadata-format/

## Endpoints

| Endpoint            | API                 | Access           |
| ------------------- | ------------------- | ---------------- |
| /v1/version         | Version             | Public           |
| /healthz            | Health              | Public           |
| /v1/graphql         | GraphQL             | Permission rules |
| /v1beta1/relay      | Relay               | Permission rules |
| /v1alpha1/graphql   | **Legacy** GraphQL  | Permission rules |
| /api/rest           | Restified GQL       | GQL REST Routes  |
| /v2/query           | Schema - v2.0+      | Admin only       |
| /v1/metadata        | Metadata - v2.0+    | Admin only       |
| /v1/query           | ~~Schema/Metadata~~ | Admin only       |
| /v1alpha1/pg_dump   | PG Dump             | Admin only       |
| /v1alpha1/config    | Config              | Admin only       |
| /v1/graphql/explain | Explain             | Admin only       |

- https://hasura.io/docs/latest/api-reference/index/

## Auth

# Version

## Hasura v2

- 2021-02-23
- 多数据源 - 同时连多个数据库
  - 相同数据库类型 Remote Join
- 多数据库 - PG -> PG, MS SQL, MySQL
- 支持 REST
  - REST -> GraphQL Query
- 增强 AuthZ
- HA
- Metadata API

# FAQ

## "Query" has to be an object type

- https://github.com/hasura/graphql-engine/issues/9399
