---
title: Sidecar
tags:
  - Pattern
---

# Sidecar

- 好处
  - 跨语言
  - 基础设施级别 - 独立于项目
  - 中间件 -> 公共服务组件
  - 可以实现非常复杂的事情 - mTLS, 跨集群, Gateway, 提供应用额外功能
  - DP, CP 分离
- 坏处
  - 额外的性能开销
    - 每个容器都会部署一个 Sidecar
    - 解析流量
  - 内部流量路径复杂
  - DP+CP - 结构复杂
  - 无法管理生命周期

> **Note** Sidecar 应用
>
> - 可观察性 - thanos
> - 数据同步 - litestream, wall-e
> - 微服务/网络/Mesh - linkerd, consul-connect, envoy
> - 微服务/应用 - dapr

---

- 控制已有程序的配置、环境
- 通过接口的方式暴露已有程序的控制能力
- 主要用于互联
- 一般与目标是一对一关系 - 如果一对多则是类似服务概念
- 有些是将被控制应用一起打包的，这样的不算 sidecar
  - 例如 kong
- 常见
  - 配置文件 - 生成配置、程序重启、配置下发
  - 反向代理 - 穿透、加密、熔断
  - 环境信息 - 注册、监控
  - 日志上报
- 示例
  - [haproxytech/dataplaneapi](https://github.com/haproxytech/dataplaneapi)
    - 给 haproxy 添加配置接口能力
  - [hashicorp/consul-template](https://github.com/hashicorp/consul-template)
    - 基于结构性数据生成配置文件
    - 触发引用重启或重载
  - prometheus 的 exporter
    - 暴露应用监控信息
  - consul 的 connect 代理
    - 网络穿透、加密、反向代理
