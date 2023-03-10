---
title: bramble
---

# bramble

- [movio/bramble](https://github.com/movio/bramble)
  - MIT, Golang
  - GraphQL Gateway
  - 包含简单的 AdminUI

:::caution

- 暂不支持 subscription

:::

```graphql
type Service {
  name: String!
  version: String!
  schema: String!
}

type Query {
  # 返回 服务信息
  service: Service!
}

# 跨服务 类型 - 会合并类型
directive @boundary on OBJECT | FIELD_DEFINITION

# 多个服务可同时在相同 ns 下
directive @namespace on OBJECT
```

```graphql
type Gizmo @boundary {
  id: ID!
  size: Float!
}
type Query {
  gizmo(id: ID!): Gizmo @boundary
}

type MyNamespaceQuery @namespace {
  subnamespace: SubNamespaceQuery!
}
type SubNamespaceQuery @namespace {
  someField: String!
}
type Query {
  myNamespace: MyNamespaceQuery!
}
```
