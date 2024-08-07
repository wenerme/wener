---
title: GraphQL
tags:
  - Awesome
---

# GraphQL

:::tip

- 主要让 consumer/client 方使用便捷
- 核心特性/卖点 - 推荐开启
  - GlobalID - ID 包含类型消息，能实现 ID -> `__typename`
  - Graph Cache - 以 `__typename` + id 来缓存 - 类似一个内存的 KV 数据库，可以直接查询
    - 配合自定义 resolver 将查询指向缓存 能大量减少查询
    - 需要暴露 `__typename`, 但是一般影响不大
  - Batch
  - Subscription - EventSource, WebSocket
  - 代码生成
- 推荐特性
  - partial query - 只返回需要的字段
  - Document Cache - 以查询维度来缓存
  - persisted query - 通过 hash 来缓存查询, 避免暴露整个查询内容
  - schema aware - 直接告诉查询引擎 schema 内容能让查询引擎更加智能
    - 例如 判断 nullable 可以先返回缓存数据再发起查询
  - federation - 多个 schema 合并
  - schema stitching - 多个 schema 合并

:::

- 特点
  - 面向终端
  - 接口数据格式由客户端定义
  - 强类型
- GraphQL 规范
  - [October2016](http://facebook.github.io/graphql/October2016/)
- Wikipedia [GraphQL](https://en.wikipedia.org/wiki/GraphQL)
- 实现
  - [graphql/graphql-js](https://github.com/graphql/graphql-js)
    - A reference implementation of GraphQL for JavaScript
  - [graphql-java/graphql-java](https://github.com/graphql-java/graphql-java)
    - GraphQL Java implementation
  - [neelance/graphql-go](https://github.com/neelance/graphql-go)
    - GraphQL server with a focus on ease of use
    - 强类型, 基于反射
    - 直接基于 schema 解析
  - [vektah/gqlgen](https://github.com/vektah/gqlgen)
    - go generate based graphql server library
    - [HN](https://news.ycombinator.com/item?id=16352611)
  - [graphql-go/graphql](https://github.com/graphql-go/graphql)
    - An implementation of GraphQL for Go / Golang
    - 弱类型, Resolver 返回 interface{}
    - 解析的 schema 不能转为代码中的对象
  - [graphql-python/graphene](https://github.com/graphql-python/graphene)
    - GraphQL framework for Python
    - [graphene-python.org](http://graphene-python.org)
  - [graphql-js/graphene](https://github.com/graphql-js/graphene)
    - [graphene-js.org](http://graphene-js.org)
- 工具
  - [postgraphql/postgraphql](https://github.com/postgraphql/postgraphql)
    - A GraphQL API created by reflection over a PostgreSQL schema.
  - [2fd/graphdoc](https://github.com/2fd/graphdoc)
  - [apollographql/graphql-syntax](https://github.com/apollographql/graphql-syntax)
    - A catalog of different packages and syntaxes to generate a GraphQL-JS schema
  - [graphql/graphiql](https://github.com/graphql/graphiql)
    - An in-browser IDE for exploring GraphQL
  - [google/rejoiner](https://github.com/google/rejoiner)
    - [HN](https://news.ycombinator.com/item?id=16193250)
- 接口参考
  - Facebook [Graph API](https://developers.facebook.com/docs/graph-api/)
  - GitHub[GraphQL API v4](https://developer.github.com/v4/)
    - 接口地址 https://api.github.com/graphql
    - [github](https://2fd.github.io/graphdoc/github) 文档
  - [shopify](https://2fd.github.io/graphdoc/shopify/) 文档
    - [explorer](https://help.shopify.com/api/storefront-api/graphql-explorer/graphiql)
  - https://graphcms.com/docs/api_simple/
- 参考
  - [Improve GraphQL Performance with Automatic Persisted Queries](https://dev-blog.apollodata.com/improve-graphql-performance-with-automatic-persisted-queries-c31d27b8e6ea)
    - 优化查询大小
    - 使用一个 Hash 值作为查询标识
  - [The future of state management](https://dev-blog.apollodata.com/the-future-of-state-management-dd410864cae2)
    - 使用 GraphQL 来管理应用状态
  - [GraphQL.g4](https://github.com/antlr/grammars-v4/blob/master/graphql/GraphQL.g4)
    - 语法参考
  - [Designing GraphQL Mutations](https://dev-blog.apollodata.com/designing-graphql-mutations-e09de826ed97)
    - 设计修改操作
  - [GraphQL schema stitching](https://dev-blog.apollodata.com/graphql-schema-stitching-8af23354ac37)
    - 合并多个 Schema
  - [A guide to authentication in GraphQL](https://dev-blog.apollodata.com/a-guide-to-authentication-in-graphql-e002a4039d1)
    - 认证
    - 识别用户身份
  - [Authorization in GraphQL](https://dev-blog.apollodata.com/auth-in-graphql-part-2-c6441bcc4302)
    - 鉴权
    - 判断用户是否进行相关操作
  - [Reusable GraphQL schema directives](https://dev-blog.apollodata.com/131fb3a177d1)
  - [Principled GraphQL](https://principledgraphql.com/)
- Relay
  - [facebook/relay](https://facebook.github.io/relay/)
  - [Learn Relay](https://www.learnrelay.org)
  - [What is a Query?](https://www.learnrelay.org/queries/what-is-a-query/)
    - The node and viewer fields
- [Pagination](http://graphql.org/learn/pagination/)
  - 直接返回数组
  - 返回数组接收翻页参数
  - 返回链接
    - `collections(first: Int!, after: String, reverse: Boolean): CollectionConnection!`
    - `followers(first: Int, after: String, last: Int, before: String): FollowerConnection!`
- 客户端
  - Apollo [React](https://www.apollographql.com/docs/react/)
  - [prisma-labs/graphql-request](https://github.com/prisma-labs/graphql-request)
    - 非常简单的客户端 - 配合 react-query 使用
    - [react-query vs apollo client](https://react-query.tanstack.com/comparison)

```bash
# 获取 Schema
npm install -g graphqurl
gq https://my-graphql-engine.com/v1/graphql --introspect > schema.graphql
gq https://my-graphql-engine.com/v1/graphql -H 'X-Hasura-Admin-Secret: adminsecretkey' --introspect > schema.graphql
gq https://my-graphql-engine.com/v1/graphql --introspect --format json > schema.json

# https://github.com/apollographql/apollo-tooling
# schema.json
npm install -g apollo
apollo schema:download --endpoint https://my-graphql-engine.com/v1/graphql
apollo schema:download --endpoint https://my-graphql-engine.com/v1/graphql --header 'X-Hasura-Admin-Secret: adminsecretkey'
```

## Apollo

- https://github.com/apollographql

## FAQ

### N + 1

- [Avoiding n+1 requests in GraphQL, including within subscriptions](https://medium.com/slite/avoiding-n-1-requests-in-graphql-including-within-subscriptions-f9d7867a257d)

### DateTime

- https://github.com/graphql/graphql-js/issues/550

### vs REST

- [You Might Not Need GraphQL](https://blog.runscope.com/posts/you-might-not-need-graphql)
- [GraphQL vs REST: Overview](https://philsturgeon.uk/api/2017/01/24/graphql-vs-rest-overview/)

### TBD

http://graphql.org/code/

https://github.com/skevy/graphiql-app
Light, Electron-based Wrapper around GraphiQL

https://github.com/apollographql/apollo-server

https://github.com/graphcool/graphql-playground
GraphQL IDE for better development workflows (GraphQL Subscriptions, interactive docs & collaboration)

docker run -p 5000:5000 postgraphql/postgraphql --connection postgres://POSTGRES_USER:POSTGRES_PASSWORD@POSTGRES_HOST:POSTGRES_PORT/POSTGRES_SCHEMA

https://github.com/chentsulin/awesome-graphql
Awesome list of GraphQL & Relay

https://www.graphql.com/
http://graphql.org/learn/best-practices/
GraphQL Best Practices

https://www.apollographql.com/
Apollo provides a universal GraphQL API on top of your existing services, so you can build new application features fast without waiting on backend changes.

https://github.com/facebook/dataloader
DataLoader is a generic utility to be used as part of your application's data fetching layer to provide a consistent API over various backends and reduce requests to those backends via batching and caching.

https://blog.datank.ai/graphql-grpc-part-1-54d92a109619
GraphQL & gRPC

# relay

- [GraphQL Cursor Connections Specification](https://relay.dev/graphql/connections.htm)
- [Pagination](https://graphql.org/learn/pagination/)

## global id

- https://docs.github.com/cn/graphql/guides/using-global-node-ids
  - github ID 格式 - `04:User583231`
  - [New global ID format coming to GraphQL](https://github.blog/2021-02-10-new-global-id-format-coming-to-graphql/)
- 支持用于接口处理 - `labelableId: ID! @possibleTypes(concreteTypes: ["Issue", "PullRequest"], abstractType: "Labelable")`
- [Global Object Identification](https://graphql.org/learn/global-object-identification/)
- [graphile/global-ids](https://github.com/graphile/global-ids)
