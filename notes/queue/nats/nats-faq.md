---
title: NATS FAQ
tags:
  - FAQ
  - Limits
---

# NATS FAQ

:::caution

- NATS 的功能目前铺的太多了，很多功能都是实验性的，不稳定不完善，虽然看起来很美好，但是实际使用中可能会遇到很多问题
- KeyValue
  - TTL 是 bucket 维度的，不支持 单个 KV 维度 - 因此不能作为 Redis KV 替代
    - [#3251](https://github.com/nats-io/nats-server/issues/3251)
  - 目前无法监听 KV 失效事件 - 类似 redis 的 keyevent
    - [#3268](https://github.com/nats-io/nats-server/issues/3268)
  - 目前无法重置 KV 的 TTL
    - [#3073](https://github.com/nats-io/nats-server/issues/3073)
  - 没有内置基础的 incr 和 decr - 原子递增
    - [#2656](https://github.com/nats-io/nats-server/issues/2656)
- MQTT 目前支持到 3.1.1 (2014)， 不支持 MQTTv5 (2018)
  - [#3369](https://github.com/nats-io/nats-server/issues/3369)
- Pub 不支持 wildcard, 不支持多个 subject
  - 需要发送多个的时候需要多次上传发送
  - [#1306](https://github.com/nats-io/nats-server/issues/1306)
  - JetStream Batch Publish support [#3971](https://github.com/nats-io/nats-server/issues/3971)

:::

## Limits

- subject
  - 不建议超过 16 token
    - 也就是说 `.` 少于 15 个
  - 推荐 `[a-zA-Z0-9]`
  - 允许的一些特殊符号 `'!@#$%^&*()_;:\'\"?,<+-=~`,```
  - 推荐分隔符 `/#$-~`
- KV - `$KV.<bucket>.<key>`
  - KV-Operation
  - bucket - 名字 `/^[-\w]+$/`
  - search key - `/^[-/=.>*\w]+$/`
  - key - `/^[-/=.\w]+$/`
- ObjectStore
- 消息
  - max_payload=1 MB
    - 最大 64 MB
    - 推荐不超过 8 MB
      - Base64 编码后 6 MB
    - 如果想要支持 10MB Base64 则需要 13MB, 可以考虑设置为 15MB
  - max_pending=64 MB
- subjects
  - 目前无数量限制
- max_connections=64K
  - 连接数量
- max_control_line=4KB
- https://docs.nats.io/running-a-nats-service/configuration

## MAX_PAYLOAD_EXCEEDED

- max_payload 默认 1 MB

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

## queue group

- 用于实现负载均衡和消息分发
- 同一个队列组内的成员之间会以负载均衡的方式共享消息
  - 一个消息只会被队列组内的一个成员消费
- https://docs.nats.io/nats-concepts/core-nats/queue

## cannot create a queue subscription for a consumer without a deliver group

- 2.4+ nats 修复

## 503 status from $SYS.REQ.SERVER.PING, ensure a system account is used with appropriate permissions

不要用 `server info`, 用 `account info`

- server 命令需要更高的权限 ` $SYS.REQ.SERVER.>`
- https://docs.nats.io/running-a-nats-service/configuration/sys_accounts

## JetStream Not Extended, adding deny

- Lead 重启后无法再次使用
- https://docs.nats.io/running-a-nats-service/configuration/leafnodes/jetstream_leafnodes
- https://github.com/nats-io/nats-server/issues/3024

```
nats Adding deny [$JS.API.> $KV.> $OBJ.>] for account
```
