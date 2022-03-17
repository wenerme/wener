---
title: NATS
---

# NATS

- [nats-io/nats-server](https://github.com/nats-io/nats-server) 是什么？
  - 偏向通讯协议，用作 消息队列
  - 默认没有持久化
  - 协议支持 MQTT, NATS, WebSocket
  - 集成 JetStream - 替代 STAN
    - 支持 KV、ObjectStore
    - 支持 持久化
- 端口
  - 4222 客户端
  - 8222 HTTP 管理和信息上报
  - 6222 集群路由
- 参考
  - [nats-io/natscli](https://github.com/nats-io/natscli)
    - 命令行工具
  - [nats-io/nsc](https://github.com/nats-io/nsc)
    - nats 账号管理功能
  - [compare-nats](https://docs.nats.io/compare-nats)
  - [Client Protocol](https://docs.nats.io/nats-protocol/nats-protocol)

```bash
# Docker
# 服务端 - 大约 10mb
docker run --rm -it --name nats -p 4222:4222 -p 6222:6222 -p 8222:8222 nats:alpine -js

# macOS
brew install nats-server
nats-server

# nats 工具需要额外 tap 或者直接下载 https://github.com/nats-io/natscli/releases
brew tap nats-io/nats-tools
brew install nats-io/nats-tools/nats
nats --help

nats account info
nats rtt
```


## Notes

- Subject-Based Messaging
  - Subject 名字 `[a-z0-9.]+`
  - 通过 `time.us` 方式实现级联
  - 单层匹配 `time.*.east`
  - 多层匹配 `time.us.>`
- Publish-Subscribe
- Request-Reply
- Queue Groups / Queue Subscribe / Consumer Group
  - Kafka Consumer Group 概念
  - 多个 consumer 共享消费位置
  - queue 表示这个 group - 有唯一的名字
  - 如果不设置 durable 则会在 consumer 关闭完时移除 queue 信息
  - durable 为一个 consumer 的名字
  - 当所有 consumer unsub 时，也会移除 queue 信息
- ACK
  - 响应一条消费的消息
  - 返回 `+ACK`
- Sequence Numbers
- Leaf Nodes
  - 路由消息到其他集群
- gateways
  - 连接多个集群组成 full mesh

## nats-top

- [nats-io/nats-top](https://github.com/nats-io/nats-top)
