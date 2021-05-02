---
title: GraphQL Awesome
---

# GraphQL Awesome

## 设计

- [GraphQL 最佳实践](https://graphql.org/learn/best-practices)
  1. 通过 HTTP 提供服务
  2. JSON+Gzip 返回
  3. 对接口进行版本控制 - 利用 deprecated 和 额外字段能
  4. 字段默认 null - 利用 非 null 设计更好的接口
  5. 分页使用 Connection - 通过 first, last, before, after 实现基于 cursor 分页
  6. 服务端批处理和缓存 - 避免 N+1 问题 - 利用 [graphql/dataloader](https://github.com/graphql/dataloader) 处理
- [Principled GraphQL](https://principledgraphql.com)
  1. One Graph
  2. Federated Implementation
  3. Track the Schema in a Registry
  4. Abstract, Demand-Oriented Schema
  5. Use an Agile Approach to Schema Development
  6. Iteratively Improve Performance
  7. Use Graph Metadata to Empower Developers
  8. Access and Demand Control
  9. Structured Logging
  10. Separate the GraphQL Layer from the Service Layer
- [Gitlab GraphQL API 规范文档](https://docs.gitlab.com/ee/development/api_graphql_styleguide.html)

## Service

- [urigo/graphql-mesh](https://github.com/urigo/graphql-mesh)
  - GraphQL Adapter
  - 后端支持 GraphQL, JSON Schema, gRPC, Swagger, OpenAPI, SOAP, Postgres, Mongo, OData, Thrift, SQLite, MySQL, Neo4j

## Tool

- [dotansimha/graphql-code-generator](https://github.com/dotansimha/graphql-code-generator)
  - 基于 GraphQL 生成各种客户端服务端代码
  - 对 TypeScript 支持非常好
- [jensneuse/graphql-go-tools](https://github.com/jensneuse/graphql-go-tools)
  - 实现了 federation
  - 可用于实现 graphql 服务应用
- [anvilco/spectaql](https://github.com/anvilco/spectaql)
  - 文档生成

## Server
- [Apollo Federation specification](https://www.apollographql.com/docs/federation/federation-spec/)
- [Urigo/graphql-mesh](https://github.com/Urigo/graphql-mesh)
  - REST,DB,RPC 映射为 GraphQL
  - 收集 API 接口规范、生成 SDK、生成 GraphQL Schema、生成接口映射

## Client

- apollo
- urql
- graphql-request
  - fetch + gql
- react-query+graphql-request

## Public GraphQL

### GitLab

- [GraphQL Explorer](https://gitlab.com/-/graphql-explorer)
- [文档](https://docs.gitlab.com/ee/api/graphql)
- [GraphQL API 规范文档](https://docs.gitlab.com/ee/development/api_graphql_styleguide.html)
- 全局 ID 格式 `gid://gitlab/MyObject/123`
- [前端 GraphQL 开发文档](https://docs.gitlab.com/ee/development/fe_guide/graphql.html)

```bash
# 生成 schema
bundle exec rake gitlab:graphql:schema:dump
```

### Github

- [schema.docs.graphql](https://docs.github.com/public/schema.docs.graphql)
- [GraphQL Explorer](https://developer.github.com/v4/explorer)

## 参考

- [chentsulin/awesome-graphql](https://github.com/chentsulin/awesome-graphql)
- [APIs-guru/graphql-apis](https://github.com/APIs-guru/graphql-apis)
  - 公共 GraphQL API 列表
