---
title: GraphQL FAQ
tags:
  - FAQ
---

# GraphQL FAQ

- 高级特性
  - @defer & @stream
  - @skip & @include
  - 批量查询
  - 使用 SSE 作为 Subscription - 避免 Websocket
  - [Fragment Masking](#fragment-masking)
  - Client-side schema - Apollo
  - `@client` Local only fields - Apollo
  - `@export` - Apollo
  - Local Resolver - URQL
  - Schema Awareness
  - Local Directive - URQL
    - @_optional
    - @_required
    - 自定义
  - Normalized Caching
  - Document Caching
  - Persisted Queries
  - File Uploads

```bash
# 服务端 常用依赖
pnpm add graphql graphql-scalars @graphql-tools/utils @graphql-tools/schema
```

## Apollo vs Relay vs URQL

- [URQL](https://github.com/FormidableLabs/urql)
  - ~15kB
  - ✅
    - 支持离线 - 本地 resolve、本地数据缓存
    - Focus Refetching
    - @urql/exchange-multipart-fetch 支持文件上传
  - 🔶
    - 使用人数少 - 社区小
    - suspense **全局 opt-in**
  - 🟡
    - 使用 wonka 做流处理 - 内部异常调试很麻烦
  - 🛑
    - 不能在 cacheExchange 之外操作缓存
    - 不支持本地状态管理
    - 不支持 Batched Queries
- [Relay](https://github.com/facebook/relay)
  - ~35kB
  - 对 Schema 有要求
  - ✅
    - Schema 规范
    - 支持分页
    - Defer & Stream
    - Live Queries
  - 🛑
    - 不能本地 Resolve
    - 不支持返回部分结果
- [Apollo](https://github.com/apollographql/apollo-client)
  - ~60kB
  - ✅
    - 支持 batch
- 参考
  - urql [vs Apollo vs Relay](https://formidable.com/open-source/urql/docs/comparison/)
  - [Why I (finally) switched to urql from Apollo Client](https://blog.logrocket.com/why-i-finally-switched-to-urql-from-apollo-client/)

| Symbol | Desc            |
| ------ | --------------- |
| ✅     | Good at         |
| 🔶     | Not Good Enough |
| 🟡     | Bad at          |
| 🛑     | Sorry for       |

## Fragment Masking

- 关键点
  - 通过GraphQL片段描述组件数据需求
  - 使用片段限制数据访问
  - 为UI组件组合片段
  - 为您的顶级路由或视图组合片段组件
  - 将所有查询片段组合成单个查询操作
- 实践
  - 结构/Fragment 和 操作/Query/Mutation 在一起 - 更易于维护
  - 避免全局单一 Fragment - 不同场景需要的内容不一样，利用 GraphQL 的选择特性
- 注意
  - RFC: Fragment Suspense boundaries in React bindings [#1408](https://github.com/urql-graphql/urql/issues/1408)
    - URQL 不支持 Suspense Fragment - 自动提供返回未查询的字段
- 参考
  - https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#embrace-fragment-masking-principles
  - https://the-guild.dev/blog/unleash-the-power-of-fragments-with-graphql-codegen
