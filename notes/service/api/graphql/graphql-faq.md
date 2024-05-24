---
title: GraphQL FAQ
tags:
  - FAQ
---

# GraphQL FAQ

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

- https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#embrace-fragment-masking-principles
- https://the-guild.dev/blog/unleash-the-power-of-fragments-with-graphql-codegen
