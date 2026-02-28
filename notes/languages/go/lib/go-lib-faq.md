---
title: Golang 库常见问题
tags:
  - FAQ
---

# Golang 库常见问题

## sjson vs map

临界点总结:

- ≤5 次操作: sjson 全面优于 map，耗时快 4-5x，内存相当甚至更少
- 10 次操作: sjson 仍快 2.5x，但内存多 70%（如 5MB JSON: 51MB vs 31MB）
- 15 次操作: sjson 快 1.6x，内存是 map 的 2.5 倍（如 10MB: 153MB vs 62MB）

与 JSON 大小的关系:

- 小 JSON (10KB-100KB): 即使 15 次操作也无所谓，sjson 全面碾压 map（58μs vs 80μs）
- 中 JSON (1-2MB): 5 次操作是分水岭，5 次以内 sjson 全优，超过则内存开始反超
- 大 JSON (5-10MB): 模式相同，但绝对差距更大（10MB+15ops: sjson 153MB vs map 62MB）

---

jsonv2

- Unmarshal 开销砍半
- 10-15 操作更推荐使用 json/v2 内存和时间都更优

---

- https://github.com/ohler55/ojg
- https://github.com/go-json-experiment/json
- https://github.com/go-json-experiment/jsonbench

## chi vs gorilla mux

- 提供 interface - 更易于模块化
- 方法更加直观清晰
- 开发更活跃
- 匹配逻辑性能更好

## graphql-go/graphql vs 99designs/gqlgen

- Code First vs Schema First
- Reflection vs Hard Code
  - 不透明代码 vs 透明逻辑
  - 统一逻辑 vs 独立逻辑
    - 统一逻辑可动态调整
    - 独立逻辑更易于做特殊 Case
  - 代码少 vs 代码多
    - 代码少 - 选择手写
    - 代码多 - 选择生成

如何选择和决定更多还要看数据层的实现逻辑。

如果数据层也有很好的元数据信息，那么 GraphQL Schema 也可以生成，处理的逻辑代码也可以生成，如何选择就会更加灵活。

- 例如 gorm 配合 graphql-go/graphql
  - 都基于反射
  - 运行时生成关系 - 动态
- 例如 ent 配合 99designs/gqlgen
  - 都基于生成
  - 提前生成 schema 和处理逻辑 - 静态

## urfave vs cobra

- urfave
  - 偏框架性质
  - opinionated
- cobra
  - 工具集 - 更加灵活
  - pflag 处理 flag, viper 处理配置

## go-micro vs micro

- 同一个作者
- 先有 go-micro 再有 micro

---

- [asim/go-micro](https://github.com/asim/go-micro)
  - Apache-2.0
  - library - 面向分布式微服务开发 - RPC, 事件驱动
  - 类似 Spring for Java 和 Rails for Ruby 角色
- [micro](https://github.com/micro/micro)
  - License 严格 -> Apache-2.0
  - CLI-based cloud native development framework - sane defaults with a pluggable architecture
  - 通过 CLI 快速提供 go-micro 所需的平台服务 - dashboard, API gateway
- 参考
  - [Asim Aslam on Microservices, go-micro, and PaaS 3.0](https://www.infoq.com/podcasts/microservices-go-micro-paas3/)

## go-micro vs go-kit vs gizmo

- go-micro
  - 微服务工具库
  - 思路一致
- go-kit
  - 微服务工具集
  - 感觉是很多离散抽象的集合
- gizmo
  - 不活跃不建议使用
- 参考
  - https://medium.com/cloud-native-the-gathering/5b396058c5b2

## yaml.v2 vs yaml.v3

- yaml.v2
  - yaml 1.1 spec
  - off/on/yes/no 都会解析成 bool
- yaml.v3 - 推荐
  - yaml 1.2 spec
    - anchors & aliases
    - 8 进制
  - 只有 true/false 解析成 bool
  - AST 包含 Comment
  - 自定义 indentation - 默认 4 space
  - time.Duration 拒绝纯 int
- 参考
  - https://ubuntu.com/blog/api-v3-of-the-yaml-package-for-go-is-available
  - https://github.com/spf13/viper/issues/942

## pq: unsupported sslmode "prefer"

```
pq: unsupported sslmode "prefer"; only "require" (default), "verify-full", "verify-ca", and "disable" supported
```

- 建议使用 [jackc/pgx](https://github.com/jackc/pgx) 不要使用 [lib/pq](https://github.com/lib/pq)
