---
title: relay
---

# relay

- [GraphQL Server Specification](https://relay.dev/docs/guides/graphql-server-specification/)
- [graphql/graphql-relay-js](https://github.com/graphql/graphql-relay-js)

```gql
interface Node {
  id: ID!
}

# Node 具体实现
type User implements Node {
  id: ID!
  name: String
}

type UserConnection {
  edges: [UserEdge]
  pageInfo: PageInfo!
}

type UserEdge {
  cursor: String!
  node: Ship
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

# 修改参数都在一个 input 里
type CreateUserInput {
  # input 需要有 clientMutationId
  clientMutationId: String
}

# 返回内容都为 Payload
type CreateUserPayload {
  user: User
  # 返回的 clientMutationId
  clientMutationId: String
}

type Query {
  findUserConnection: UserConnection

  # 必须
  node(id: ID!): Node
}

type Mutation {
  createUser(input: CreateUserInput!): CreateUserPayload!
}
```
