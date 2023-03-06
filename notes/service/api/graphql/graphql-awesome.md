---
title: GraphQL Awesome
tags:
  - Awesome
---

# GraphQL Awesome

## 学习

- https://spec.graphql.org/October2021/
- [TAO: The power of the graph](https://engineering.fb.com/2013/06/25/core-data/tao-the-power-of-the-graph/)
- [howtographql](https://github.com/howtographql/howtographql)

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

## Gateway

- apollo gateway
  - 配合 Apollo Studio 体验会很好 - 但是一般不会使用 Apollo Studio
  - federation 功能强
    - 但推荐使用预先生成的 schema
    - 逻辑相对复杂
- [movio/bramble](https://github.com/movio/bramble)
  - Golang
  - 比 apollo 简单但功能更弱
  - 基于 service 合成 - 支持部分简单 directive
  - 不支持 subscriptions
  - [Introducing Bramble: A Federated GraphQL Gateway Implemented In Go](https://movio.co/blog/building-a-new-api-platform-for-movio/)
- [nautilus/gateway](https://github.com/nautilus/gateway)
  - MIT, Golang
  - Introspect schema，自动合并 - 不需要 directive
  - 不支持 subscriptions
  - [A Guide to GraphQL Schema Federation, Part 1](https://itnext.io/a-guide-to-graphql-schema-federation-part-1-995b639ac035)

## Library

- [APIs-guru/graphql-faker](https://github.com/APIs-guru/graphql-faker)
  - mock graphql
- [graphql-go/graphql](https://github.com/graphql-go/graphql)
  - 类似 graphql-js 接口
- [99designs/gqlgen](https://github.com/99designs/gqlgen)
  - Golang, GraphQL Schema 生成 Resolver
- [graph-gophers/graphql-go](https://github.com/graph-gophers/graphql-go)
  - 基于反射自动绑定
  - [graph-gophers/dataloader](https://github.com/graph-gophers/dataloader)
- [Khan/genqlient](https://github.com/Khan/genqlient)
  - type-safe Go GraphQL client
- [MichalLytek/type-graphql](https://github.com/MichalLytek/type-graphql)
- [enisdenjo/graphql-ws](https://github.com/enisdenjo/graphql-ws)
  - [PROTOCOL](https://github.com/enisdenjo/graphql-ws/blob/master/PROTOCOL.md)
  - [99designs/gqlgen#1430](https://github.com/99designs/gqlgen/issues/1430) 不支持 graph-transport-ws
- [apollographql/subscriptions-transport-ws](https://github.com/apollographql/subscriptions-transport-ws)
  - ⚠️ 不活跃，没怎么维护
  - 推荐 graphql-ws
- [supabase/pg_graphql](https://github.com/supabase/pg_graphql)
- [dosco/graphjin](https://github.com/dosco/graphjin)
  - GraphQL to SQL compiler

## Server

> Server, Federation, Gateway, Adapter

- [movio/bramble](https://github.com/movio/bramble)
  - 受 nautilus 启发
- [nautilus/gateway](https://github.com/nautilus/gateway)
  - 开发不活跃
- [google/rejoiner](https://github.com/google/rejoiner)
  - Generates a unified GraphQL schema from gRPC microservices and other Protobuf sources
- [urigo/graphql-mesh](https://github.com/urigo/graphql-mesh)
  - GraphQL Adapter
  - 后端支持 GraphQL, JSON Schema, gRPC, Swagger, OpenAPI, SOAP, Postgres, Mongo, OData, Thrift, SQLite, MySQL, Neo4j
  - REST,DB,RPC 映射为 GraphQL
  - 收集 API 接口规范、生成 SDK、生成 GraphQL Schema、生成接口映射
- [ent/ent](https://github.com/ent/ent)
- [Apollo Federation specification](https://www.apollographql.com/docs/federation/federation-spec/)
- [graphile/postgraphile](https://github.com/graphile/postgraphile)
- [hasura/graphql-engine](https://github.com/hasura/graphql-engine)
- [parse-community/parse-server](https://github.com/parse-community/parse-server)
- [dgraph-io/dgraph](https://github.com/dgraph-io/dgraph)
- [directus/directus](https://github.com/directus/directus)
- [reactioncommerce/reaction](https://github.com/reactioncommerce/reaction)
- [spree/spree](https://github.com/spree/spree)
- [redwoodjs/redwood](https://github.com/redwoodjs/redwood)
- [VulcanJS/Vulcan](https://github.com/VulcanJS/Vulcan)
- [api-platform/api-platform](https://github.com/api-platform/api-platform)
- [semi-technologies/weaviate](https://github.com/semi-technologies/weaviate)
- [daptin/daptin](https://github.com/daptin/daptin)
  - Backend As A Service
- [dosco/graphjin](https://github.com/dosco/graphjin)
- [keystonejs/keystone](https://github.com/keystonejs/keystone)

## Tool

- [dotansimha/graphql-code-generator](https://github.com/dotansimha/graphql-code-generator)
  - 基于 GraphQL 生成各种客户端服务端代码
  - 对 TypeScript 支持非常好
- [jensneuse/graphql-go-tools](https://github.com/jensneuse/graphql-go-tools)
  - 实现了 federation
  - 可用于实现 graphql 服务应用
- [anvilco/spectaql](https://github.com/anvilco/spectaql)
  - 文档生成
- [APIs-guru/graphql-voyager](https://github.com/APIs-guru/graphql-voyager)
- [quicktype/quicktype](https://github.com/quicktype/quicktype)
- [graphql-editor/graphql-editor](https://github.com/graphql-editor/graphql-editor)
- [graphql-editor/graphql-zeus](https://github.com/graphql-editor/graphql-zeus)

## DevTools

- [graphql/graphiql](https://github.com/graphql/graphiql)
  - Explorer
  - [Demo](https://graphql.org/swapi-graphql)
  - adopted by
    - Hasura
    - [Gitlab GraphQL Explorer](https://gitlab.com/-/graphql-explorer)
    - [GitHub GraphQL Explorer](https://developer.github.com/v4/explorer)

```tsx
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { GraphiQL } from 'graphiql';
import React from 'react';
import ReactDOM from 'react-dom';

import 'graphiql/graphiql.css';

const fetcher = createGraphiQLFetcher({
  url: 'https://my.backend/graphql',
});

ReactDOM.render(<GraphiQL fetcher={fetcher} />, document.body);
```

- https://github.com/graphql/graphiql/blob/main/examples/graphiql-cdn/index.html
- https://graphiql-test.netlify.app/typedoc/modules/graphiql.html#graphiqlprops-1

## Client

- apollo
- urql
- [graphql-request](https://github.com/prisma-labs/graphql-request)
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
- [GitHub GraphQL Explorer](https://developer.github.com/v4/explorer)

## 参考

- [chentsulin/awesome-graphql](https://github.com/chentsulin/awesome-graphql)
- [APIs-guru/graphql-apis](https://github.com/APIs-guru/graphql-apis)
  - 公共 GraphQL API 列表
