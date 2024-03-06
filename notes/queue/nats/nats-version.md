---
title: Nats Version
tags:
  - Version
---

# Nats Version

:::caution

- nats.go 最好匹配服务端版本

:::

| ver                    | date       | nats.go |
| ---------------------- | ---------- | ------- |
| [Nats 2.11](#nats-211) |            |
| [Nats 2.10](#nats-210) | 2023-09-20 |
| [Nats 2.9](#nats-29)   | 2022-09-09 |
| [Nats 2.8](#nats-28)   | 2022-04-19 |         |
| [Nats 2.7](#nats-27)   | 2022-01-04 |         |
| [Nats 2.6](#nats-26)   | 2021-09-22 | v1.13   |
| [Nats 2.5](#nats-25)   | 2021-09-10 | v1.12.1 |
| [Nats 2.4](#nats-24)   | 2021-08-27 | v1.12.0 |
| [Nats 2.3](#nats-23)   | 2021-06-24 | v1.11.0 |
| [Nats 2.2](#nats-22)   | 2021-03-15 | v1.10.0 |
| [Nats 2.1](#nats-21)   | 2019-09-21 |         |
| [Nats 2.0](#nats-20)   | 2019-05-05 |         |

:::tip

- JetStream based Key-Value Stores - [ADR-8](https://github.com/nats-io/nats-architecture-and-design/blob/main/adr/ADR-8.md)
  - KV: 支持历史记录，支持限定大小，Watch
  - Object Store: 支持 Chunks，Watch
- Service API [ADR-32](https://github.com/nats-io/nats-architecture-and-design/blob/main/adr/ADR-32.md)

:::

- https://github.com/nats-io/nats-server/releases
- https://github.com/nats-io/nats-architecture-and-design/tree/main/adr

## Nats 2.11

- pub/sub message tracing - OpenTelemetry
  - [ADR#41](https://github.com/nats-io/nats-architecture-and-design/blob/main/adr/ADR-41.md) NATS Message Path Tracing
- JetStream
  - [ADR#31](https://github.com/nats-io/nats-architecture-and-design/blob/main/adr/ADR-31.md#batched-requests) batched requests
    - batched direct-gets
    - batched direct multi-get requests
  - pausing/resuming consumers

## Nats 2.10

- 确保先升级到了 2.9.22+ 再升级 2.10
- `$SYS.REQ.USER.INFO`
  - userinfo
- `$SYS.REQ.SERVER.{server-id}.RELOAD`
  - 重新加载配置
- S2 压缩
  - cluster
  - leafnode
  - jetstream 存储
- Auth Callout - external auth providers
- JetStream
  - subject transforms
    - InputSubjectTransform
    - 语法同核心的 transform
  - metadata 配置信息
  - consumers filtering on multiple subjects
  - 允许 republish
  - re-encrypt
- 监控
  - $SYS.REQ.SERVER.PING.IDZ
  - `$SYS.REQ.SERVER.<id>.PROFILEZ`
- MQTT
  - QoS2 exactly-once delivery
- Subject Mapping
  - 支持指定 cluster 过滤
- `$SYS.REQ.SERVER.<id>.KICK` - disconnect client by id/name
- `$SYS.REQ.SERVER.<id>.LDM` - send lame duck mode

## Nats 2.9

- https://nats.io/blog/nats-server-29-release/

## Nats 2.8

## Nats 2.7

- JetStream
  - 新增配置 max_file_store, max_memory_store
  - 支持客户端 临时 Pull 消费
- MQTT
  - 支持 WebSocket - /mqtt
- 新增配置: max_connections, max_subscriptions, max_payload, max_leafnodes

:::note

- JetStream LeafNode domains [#2693](https://github.com/nats-io/nats-server/pull/2693#issuecomment-996212582)

:::

## Nats 2.6

- JetStream's reserved memory and memory used
  - /jsz, /varz

## Nats 2.5

- MQTT/Monitoring
  - /connz

## Nats 2.4

- JetStream
  - Push Consumer 行为发生变化 - **客户端和服务端都需要升级**
    - 避免相同 durable consumer 重复 sub
    - 避免相同 durable consumer 创建多个 queue group
    - queue sub 时，如果没有 consumer 和 durable 则创建临时 js consumer
  - ConsumerConfig.DeliverGroup consumer 关联 queue
  - ConsumerInfo.PushBound 表示已经绑定 push 关系
- [v2.4.0](https://github.com/nats-io/nats-server/releases/tag/v2.4.0)

## Nats 2.3

- OCSP - Online Certificate Status Protocol
- JetStream
  - stream purge by subject
  - per-subject message limit
  - encryption data at rest

```ini
[ ext_ca ]
authorityInfoAccess = OCSP;URI:http://ocsp.example.net:80
tlsfeature = status_request
```

```
# ocsp: true

ocsp {
  # auto, must, always, never
  mode: must
  url: "http://ocsp.example.net"
}
```

## Nats 2.2

- 新增 JetStream
- 支持 MQTT 3.1.1
- 支持 WebSocket 链接
- Message Header
- Security & Account
  - CIDR Block
  - Time-Based Account Restrictions
  - Default User Permissions
- Monitoring
  - jsz
  - /accountz
  - /varz
  - /leafz
- JWT

## Nats 2.1

- add rtt /routez
- /leafz

## Nats 2.0

- NKey
- Accounts
- JWT
- Gateway
- Lean Nodes
- System events
- new route protocol
