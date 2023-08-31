---
title: NATS FAQ
tags:
  - FAQ
---

# NATS FAQ

## NATS vs NATS Streaming vs NATS JetStream

- NATS
  - PubSub
  - most once - "send-and-pray" - 类似 UDP
- NATS Streaming - STAN
  - least once - 类似 TCP
  - request-reply over nats core - protobuf
  - Streaming Module is a client to a NATS Server
  - 消息存储、消息 ACK
  - 独立服务、协议不同
  - 限制
    - 不能移除已经 ACK 消息
    - 不能 NAck
    - 不能 Pull
    - 与 NATS 2.0 账号安全集成较差
    - 不能 限制客户端订阅
    - 不能 水平扩容
- NATS JetStream - 取代 NATS Streaming
  - nats 内置
  - STAN 所有能力+新的功能
- 参考
  - [Comparing NATS, NATS Streaming and NATS JetStream](https://gcoolinfo.medium.com/ec2d9f426dc8)

## cannot create a queue subscription for a consumer without a deliver group

- 2.4+ nats 修复
