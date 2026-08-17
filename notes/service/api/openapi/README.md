---
title: OpenAPI
---

# OpenAPI

:::caution

- 不支持 path 包含 `/`
  - https://github.com/OAI/OpenAPI-Specification/issues/892

:::

- [OAI/OpenAPI-Specification](https://github.com/OAI/OpenAPI-Specification)
- [grpc-ecosystem/grpc-gateway#441](https://github.com/grpc-ecosystem/grpc-gateway/issues/441)
  - OpenAPIv3
- [google/gnostic](https://github.com/google/gnostic)
  - OpenAPI <-> gRPC
  - 支持 OpenAPIv3
- [rapi-doc/RapiDoc](https://github.com/rapi-doc/RapiDoc)
- [Redocly/redoc](https://github.com/Redocly/redoc)
- [fabien0102/openapi-codegen](https://github.com/fabien0102/openapi-codegen)
- [apioo/fusio](https://github.com/apioo/fusio)
- [Swagger2Markup/swagger2markup](https://github.com/Swagger2Markup/swagger2markup)
- [zalando/zally](https://github.com/zalando/zally)
  - linter

```bash
pnpm dlx @apidevtools/swagger-cli validate openapi.yaml
pnpm --package=@redocly/cli dlx redocly lint openapi.yaml
```

**Schema路径**

```
// 最通用
/openapi.json
/openapi.yaml
/openapi.yml

// Swagger 传统命名
/swagger.json
/swagger.yaml
/swagger.yml

// Springdoc
/v3/api-docs
/v3/api-docs.yaml

// 通用 api-docs 命名
/api-docs
/api-docs.json
/api-docs.yaml

// ASP.NET Core 常见默认值
/swagger/v1/swagger.json

// NestJS，假设 UI 挂载在 /api
/api-json
/api-yaml
```

**文档路径**

```
/docs
/swagger
/swagger-ui
/swagger-ui.html
/redoc
/reference
/scalar
/api
```

| 框架/组件            | Schema                     | UI            |
| -------------------- | ---------------------------------- | ---------------------- |
| FastAPI              | `/openapi.json`                    | `/docs`、`/redoc`      |
| Springdoc            | `/v3/api-docs`                     | `/swagger-ui.html`     |
| ASP.NET Core Swagger | `/swagger/v1/swagger.json`         | `/swagger`             |
| NestJS Swagger       | `${uiPath}-json`、`${uiPath}-yaml` | `/api`                 |
| Hono Zod OpenAPI     | `app.doc(path)`                    |                        |
| Swagger UI Express   |                                    | `/api-docs`            |
| Scalar               |                                    | `/scalar` `/reference` |

- Prefer
  - /openapi.json
  - /swagger.json
  - /v3/api-docs
  - /swagger/v1/swagger.json
  - /api-docs

## OpenAPI

- https://www.linode.com/docs/api/openapi.yaml
- https://github.com/AdguardTeam/AdGuardHome/blob/master/openapi/openapi.yaml
- https://api.twitter.com/2/openapi.json

## Schema

- ComponentType
  - Schema
  - Response
  - Parameter
  - Example
  - RequestBody
  - Header
  - SecurityScheme
  - Link
  - Callback

## Version

- OpenAPI v3.1 - 2020-06-18
  - 100% JSON Schema 支持
  - paths 必要 -> 可选
    - 更好描述 回掉、异步事件
  - 没有 null 类型，新增 nullable 属性
- OpenAPI v3.0 - 2017-07-26
  - v2 -> v2
    - securityDefinitions, definitions, parameters, responses -> components
    - body, formData -> requestBody
    - oauth2
      - application -> clientCredentials
      - accessCode -> authorizationCode
  - 更好的 JSON Schema 支持
    - oneOf
    - anyOf
    - allOf
  - http, basic
  - openIdConnect - oidc discovery
  - cookie
  - callbacks
  - link
- OpenAPI v2.0 - 2014-09-08

- https://www.openapis.org/news/blogs/2016/10/tdc-structural-improvements-explaining-30-spec-part-2
- https://blog.stoplight.io/difference-between-open-v2-v3-v31

# FAQ

## summary vs description

- summary - 简短描述
- description - 详细描述
