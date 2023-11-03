---
title: NATS FAQ
tags:
  - FAQ
---

# NATS FAQ

- Pub 不支持 wildcard

## Limits

- subject
  - 不建议超过 16 token
    - 也就是说 `.` 少于 15 个
  - 推荐 `[a-zA-Z0-9]`
  - 允许的一些特殊符号 `'!@#$%^&*()_;:\'\"?,<+-=~`,```
  - 推荐分隔符 `/#$-~`
- 消息
  - max_payload=1 MB
    - 最大 64 MB
    - 推荐不超过 8 MB
  - max_pending=64 MB
- subjects
  - 目前无数量限制
- max_connections=64K
  - 连接数量
- max_control_line=4KB
- https://docs.nats.io/running-a-nats-service/configuration

## Subjects

- `$SYS` - 系统功能
  - `$SYS.REQ.USER.AUTH` - auth callout
  - `$SYS.REQ.SERVER.{server-id}.RELOAD` - 重新加载配置
- `$JS`
- `$KV`
- `$G` - global account
- `_INBOX`
- `_R_`
  - leafnode

## delay

- Jetstream
  - NAK 返回带 delay 时间
    - Backoff

---

- Nats defered message [#3403](https://github.com/nats-io/nats-server/issues/3403)
  - PUBLISH 时指定
  - Nats-Before
  - Nats-Not-Before
- https://github.com/nats-io/nats-server/issues/2846
- Consumer Ack/Nak Backoffs ~~[#2812](https://github.com/nats-io/nats-server/pull/2812)~~

## Remaping

:::caution

- 不支持 `>` 通配符

:::

```bash
# 测试
nats server mapping "a.*.*" "b.{{wildcard(2)}}.{{wildcard(1)}}" a.x.y # b.y.x
nats server mapping "a.*" "b.{{wildcard(1)}}" a.x                     # b.x

nats server mapping "tenant.X.service.*" "service.{{wildcard(1)}}" tenant.X.service.a # service.a
```

- `wildcard(N)` - 2.8+ - 第 N 个通配
- `$N` -> `$1` 以前的逻辑，占位
- `split(wildcard index, delimter)`
- `splitfromleft(wildcard index, offset)`
- `splitfromright(wildcard index, offset)`
- `slicefromleft(wildcard index, number of characters)`
- `slicefromright(wildcard index, number of characters)`
- `partition(number of partitions, wildcard token positions...)`
- https://docs.nats.io/nats-concepts/subject_mapping

## Service Bus

- NATS
  - fire and forget - NATS JetStream
- Azure ServiceBus - https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messaging-overview
- https://github.com/nats-io/nats-server/issues/1288

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
