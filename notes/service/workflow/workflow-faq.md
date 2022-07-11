---
title: Workflow FAQ
tags:
  - FAQ
---

# Workflow FAQ

## Durable Functions - 持久化函数

- [Durable Functions](https://docs.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-overview)

## LCDP / Low-code development platform / 低代码开发平台

- https://en.wikipedia.org/wiki/Low-code_development_platform

## node-red vs n8n

- node-red
  - open source
  - has lower-level abstractions
- n8n
  - source avaliable
  - automating third-party SaaS
  - GUI workflow/BPM for SaaS

## temporal vs cadence

| -        | dsl    | rpc      | sdk               |
| -------- | ------ | -------- | ----------------- |
| cadence  | thrift | TChannel | java, go          |
| temporal | pb     | gRPC     | java, go, php, ts |

**名词区别**

| Cadence         | Temporal       |
| --------------- | -------------- |
| Decision        | Command        |
| DecisionTask    | WorkflowTask   |
| Decider         | Workflow       |
| Domain          | Namespace      |
| NamespaceStatus | NamespaceState |
| TaskList        | TaskQueue      |
| ArchivalStatus  | ArchivalState  |

- gRPC 优势
  - TLS
  - Auth
  - Header - Metadata
  - 统一的 Error Code
  - time, duration 序列化
  - 多语言
  - 更方便暴露、反向代理
- temporal
  - Simplified configuration - 集群服务配置更简单
  - 发布流程更完善 - cadence 更关注 uber 环境可用
  - Payload Metadata
  - Failure Propagation
  - PHP SDK/Typescript SDK
  - 不需要 Kafka 依赖
- cadence
  - 社区更大
  - 更成熟
    - Workflow Shadower - 验证 workflow
    - 多集群
  - 支持 NoSQL - MongoDB
  - 动态配置
  - Thrift/yarpc - 正在支持 gRPC
  - Kafka 集成

---

**参考**

- https://docs.temporal.io/docs/cadence-to-temporal/
- [Temporal vs Cadence](https://stackoverflow.com/questions/61157400)
