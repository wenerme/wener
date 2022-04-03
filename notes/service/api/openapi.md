---
title: OpenAPI
---

# OpenAPI

- [OAI/OpenAPI-Specification](https://github.com/OAI/OpenAPI-Specification)

:::tip

- [grpc-ecosystem/grpc-gateway#441](https://github.com/grpc-ecosystem/grpc-gateway/issues/441)
  - OpenAPIv3
- [google/gnostic](https://github.com/google/gnostic)
  - OpenAPI <-> gRPC
  - 支持 OpenAPIv3

:::

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
