---
title: Dapr Version
tags:
- Version
---

# Dapr Version

**关注特性**

- [dapr/dapr#2988](https://github.com/dapr/dapr/issues/2988)
  dapr 支持配置接口
- [dapr/dapr#1339](https://github.com/dapr/dapr/issues/1339)
  状态查询
- [dapr/dapr#2836](https://github.com/dapr/dapr/issues/2836)
  Trace 支持 OpenTelemetry
- [dapr/go-sdk#21](https://github.com/dapr/go-sdk/issues/21)
  golang 支持 actor

:::caution

- 不支持基本的 Name resolve
  - 因此 不支持 VM 场景
- sidecar 和应用必须绑定运行 - [dapr/dapr#2864](https://github.com/dapr/dapr/issues/2864)

:::

| ver | release date |
| --- | ------------ |
| 1.4 | 2021-09-14   |
| 1.3 | 2021-07-27   |
| 1.2 | 2021-05-27   |
| 1.1 | 2021-04-02   |
| 1.0 | 2021-02-17   |

## 1.4

- Block cross Pods calls to Dapr sidecar
- state store 加密
- actor timers / reminder ttl

## 1.3

- state store ttl
- graphql binding
- preview
  - grpc proxying to enable bring-your-own-proto
  - actor reentrancy
  - actor reminder storage partitioning

## 1.2

- Pub/Sub without [CloudEvents](https://github.com/cloudevents/spec)
- Sidecar API ACL
- 允许开启预览特性
  - Actor Re-entrancy
    - 默认一个 Actor 同时只能处理一个请求 - Lock
    - 重入使得在处理请求时能再被同一个上下文请求
    - 请求头添加 `Dapr-Reentrancy-Id`
- Consul 作为 DNS 组件
- Name resolution components is first class component
- 新组件

  - 钉钉 Webhook 绑定
  - Zeebe 工作流引擎
  - 阿里 Sentinel 中间件
  - Consule name resolution 组件

  ## 1.1

  - Sidecar env var
  - Local storage 绑定

  ## 1.0
