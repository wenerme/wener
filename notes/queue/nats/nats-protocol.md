---
tags:
  - Protocol
---

# NATS Protocol

- [Client Protocol](https://docs.nats.io/reference/reference-protocols/nats-protocol)

## Request-Reply

- Service API [ADR-32](https://github.com/nats-io/nats-architecture-and-design/blob/main/adr/ADR-32.md)
- https://docs.nats.io/nats-concepts/core-nats/reqreply
  - Reply subjects are called "inbox".
  - drain before exiting - 应用退出前会处理所有消息
  - 没有消费者返回 no_responders

# FAQ

## RPC vs Request-Reply

- Request-Reply
  - 只是一种消息传递 pattern
  - 对请求内容无定义
- RPC
  - 是一种 Request-Reply
  - 对请求内容有定义
  - 有 服务、方法、参数、返回值 等概念
  - 需要考虑跨语言 序列化

---

- [nats-rpc/nrpc](https://github.com/nats-rpc/nrpc)
