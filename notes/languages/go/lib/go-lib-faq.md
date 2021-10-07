---
title: Golang 库常见问题
tags:
  - FAQ
---

# Golang 库常见问题

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
  - License 严格
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
