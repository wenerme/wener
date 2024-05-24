---
title: Apollo Federation
---

# Apollo Federation

- Apollo Federation 定义了如何联合多个 GraphQL 服务的规则
- 使用 Federation 需要 GraphQL 服务支持，还需要运行额外的 Gateway
- 参考
  - [支持的库](https://www.apollographql.com/docs/federation/other-servers/)

## Spec

- [Apollo Federation specification](https://www.apollographql.com/docs/federation/federation-spec/)

```gql
# 依赖的外部服务类型 - @external
scalar _Any
scalar _FieldSet

# 所有使用 @key 的类型集合
union _Entity

type _Service {
  # 服务对应的 schema
  sdl: String
}

extend type Query {
  # 基于外部类型创建扩展类型
  _entities(representations: [_Any!]!): [_Entity]!
  # 服务实现的 service
  _service: _Service!
}

directive @external on FIELD_DEFINITION
directive @requires(fields: _FieldSet!) on FIELD_DEFINITION
directive @provides(fields: _FieldSet!) on FIELD_DEFINITION
# 能够查询对象的唯一主键 - 支持多个组合
directive @key(fields: _FieldSet!) repeatable on OBJECT | INTERFACE

# 用于不支持 extend 的实现 - 例如 graphql-java
directive @extends on OBJECT | INTERFACE
```

## Subgraph

```graphql
type Query {
  me: User
}

type User @key(fields: "id") {
  id: ID!
  username: String

  # 当多个 subgraph 都可以解析部分字段时使用 @provides
  # @provides 的字段也都是 @external 的
  department: Department @provides(fields: "id name")
}

# 扩展外部 type
extend type Department @key(fields: "id") {
  id: ID! @external
  name: String! @external
  leaderUser: User

  parent: Department @external
  userCount: Int @external
  # 字段依赖关系
  userWithoutLeaderCount: Int @requires(fields: "userCount parent { userCount }")
}

# 规范要求
union _Entity = User
type Entity {
  findUserByID(id: ID!): User!
}

type _Service {
  sdl: String
}
extend type Query {
  _entities(representations: [_Any!]!): [_Entity]!
  _service: _Service!
}
```

## Rover

```bash
# npm install -g @apollo/rover
# macOS
brew install rover

rover subgraph introspect https://rover.apollo.dev/quickstart/products/graphql > products.graphql
rover subgraph introspect https://rover.apollo.dev/quickstart/reviews/graphql > reviews.graphql
```

```yaml title="supergraph-config.yaml"
subgraphs:
  products:
    routing_url: https://rover.apollo.dev/quickstart/products/graphql
    schema:
      file: ./products.graphql
  reviews:
    routing_url: https://rover.apollo.dev/quickstart/reviews/graphql
    schema:
      file: ./reviews.graphql
```

```bash
# 组合生成 supergraph
rover supergraph compose --config ./supergraph-config.yaml > supergraph.graphql
```

## Apollo Gateway

```js
const { ApolloServer } = require('apollo-server');
const { ApolloGateway } = require('@apollo/gateway');
const { readFileSync } = require('fs');

const supergraphSdl = readFileSync('./supergraph.graphql').toString();

const gateway = new ApolloGateway({
  // 本地 graphqls 方式
  supergraphSdl,
  // 外部服务方式
  serviceList: [
    // name 不重要，只作为日志输出相关
    { name: 'user', url: 'http://localhost:8081' },
    { name: 'produce', url: 'http://localhost:8080' },
  ],
});

const server = new ApolloServer({
  gateway,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
```

- 不建议使用 serviceList
  - 建议仅应用于开发阶段
  - 组合 graph 可能失败
  - 部署多个 gateway 时，可能不同实例获取到的 graph 不同
  - 该方式可能会被废弃
