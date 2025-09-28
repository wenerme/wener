---
tags:
  - RPC
---

# orpc

- [unnoq/orpc](https://github.com/unnoq/orpc)
  - MIT, TS

```bash
# Server
pnpm add @orpc/server @orpc/openapi @orpc/contract
# Client
pnpm add @orpc/client @orpc/react-query
# Common
pnpm add @orpc/contract
```

## Insight

- 支持的数据类型
  - string
  - number - 包括 `NaN`
  - boolean
  - null
  - undefined
  - Date - 包括无效日期
  - BigInt
  - RegExp
  - URL
  - Record (object)
  - Array
  - Set
  - Map
  - Blob
  - File
  - AsyncIteratorObject -  SSE
    - 不能返回 Blob, File
    - withEventMeta 返回元信息

## Protocol

- https://orpc.unnoq.com/docs/advanced/rpc-protocol

# FAQ

## orpc vs trpc

- trpc
  - 第一个流行的同类库
  - 历史包袱很重
  - v10 -> v11 版本难产
    - v10 2022-09 -> v11 2025-03
    - https://trpc.io/blog/announcing-trpc-v11
  - 区分 mutate 和 query - 个人认为不必要
- orpc
  - 新兴的同类库 - v1 2025-04
  - 设计更现代, 默认集成更多功能
  - 支持 SSE, WebSocket, HTTP
  - 支持 MessagePort
  - 支持多种 Validate 库 - 非绑定 zod
  - 类型安全 schema 可选
  - 设计更简洁，易于使用
  - 支持 contract - 不需要耦合 server 实现
