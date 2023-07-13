---
title: Queue FAQ
tags:
  - FAQ
---

# Queue FAQ


## Event vs Message

- Event
  - 事件
  - 不包含业务属性，通用
  - 通常 fire and forget
  - 用于 集成、解耦、触发交互
- Message
  - 消息
  - 包含业务属性
  - 通常需要 持久化、重试、幂等
  - 用于 业务流程、状态变更、事务

## NATS vs NSQ

- [Nats](./nats/README.md)
  - 专注 Pub/Sub
  - 内存处理
  - 支持 JetStreaming
- NSQ
  - 默认情况下是不持久化的
