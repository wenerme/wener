---
id: hasura
title: Hasura
---

# Hasura

## Tips
* [hasura/graphql-engine](https://github.com/hasura/graphql-engine)
  * Haskell
* [Working with schemaless data using GraphQL on Postgres](https://blog.hasura.io/574a1ee2e87f)
* [配置](https://docs.hasura.io/1.0/graphql/manual/deployment/graphql-engine-flags/reference.html)
  * `--unauthorized-role`/`HASURA_GRAPHQL_UNAUTHORIZED_ROLE` - 匿名角色
    * 例如配置为 `anonymous`
  * `--admin-secret`/`HASURA_GRAPHQL_ADMIN_SECRET` - 管理员密钥
  * `--cors-domain <DOMAINS>`/`HASURA_GRAPHQL_CORS_DOMAIN` - CORS 域名
  * `--disable-cors`
  * `--enable-telemetry <true|false>`/`HASURA_GRAPHQL_ENABLE_TELEMETRY`
* [接口文档](https://docs.hasura.io/1.0/graphql/manual/api-reference/index.html)
  * `/v1/graphql` - 主要的 GraphQL 入口 - 生产可以只暴露这一个
* Hasura 的系统信息存储在 `hdb_catalog` 和 `hdb_view` 中

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
docker run -it --rm -p 8080:8080 \
  --link postgres:db \
  -e HASURA_GRAPHQL_DATABASE_URL=postgres://$USERNAME:$PASSWORD@db:5432/$DATABASE \
  -e HASURA_GRAPHQL_ENABLE_CONSOLE=true \
  -e HASURA_GRAPHQL_ADMIN_SECRET=$TOKEN \
  hasura/graphql-engine:latest
```
## JWT 鉴权
* 通过 `--jwt-secret` 启用 - 需要配置 `HASURA_GRAPHQL_JWT_SECRET`
* 通过头传递 JWT 信息 `Authorization: Bearer <JWT>`
* `X-Hasura-Role` 当前角色


__HASURA_GRAPHQL_JWT_SECRET__

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
  "claims_namespace": "<optional-key-name-in-claims>",
  // jwt claims 中的格式 - JSON 对象或字符串编码的 JSON
  "claims_format": "json|stringified_json",
  // jwt 目标对象 - 例如指定 myapp-1 - 一般用于多租户或多应用
  "audience": "<optional-string-or-list-of-strings-to-verify-audience>",
  // 在校验时验证发送方
  "issuer": "<optional-string-to-verify-issuer>"
}
```

__JWT内容__

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true,
  "iat": 1516239022,
  "https://hasura.io/jwt/claims": {
    // 允许的角色 - 自定义 - 对应后台配置的权限
    "x-hasura-allowed-roles": ["editor","user", "mod"],
    // 默认角色 - 可以直接头部指定 x-hasura-role
    "x-hasura-default-role": "user",
    "x-hasura-user-id": "1234567890",
    "x-hasura-org-id": "123",
    "x-hasura-custom": "custom-value"
  }
}
```

## 授权访问控制
* `X-Hasura-Admin-Secret` 头用于传递管理员密钥 - admin 角色
* 基于角色的权限控制 - 不支持级联角色 - 角色必须平坦
  * X-Hasura-Role
  * X-Hasura-Allowed-Roles
* 列控制
  * 可见性
* 行控制
  * 自定义表达式
    * `{"user_id":{"_eq":"X-Hasura-User-Id"}}` - 其中的 `X-Hasura-*` 会被替换
* 操作控制
  * CRUD
* 针对不同角色会生成不同 schema