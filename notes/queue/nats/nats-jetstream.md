---
title: NATS JetStream
---

# NATS JetStream

:::tip

- 持久化消息队列 - 对标 Kafka
- 替代 STAN

:::

- [nats-io/jetstream](https://github.com/nats-io/jetstream)
- 特性
  - At-least-once delivery; exactly once within a window
  - Store messages and replay by time or sequence
  - Wildcard support
  - Account aware
  - Data at rest encryption
  - Cleanse specific messages (GDPR)
  - Horizontal scalability
  - Persist Streams and replay via Consumers
  - WebSocket
- Replica
  - Source
    - 创建的 stream 指定 source 后会去消费，可多个 source
    - 可被视为副本 - 该 stream 多节点运行可实现多副本
    - 配置不同的持久化策略
  - Mirror
    - 镜像另外一个 stream
    - 只能消费
    - 例如 mirror 一个 副本 stream 提供近期查询和消费
- 集群
  - Raft 实现
  - 所有节点加入 Meta Group
  - 每个 stream 组成一个 Stream Group
  - 每个 consumer 组成一个 Consumer Group
  - 推荐混合 JetStream 和一般 Nats
    - 因为 JetStream 需要存储 - 配置后可针对节点使用 JetStream 优化存储
- nats://demo.nats.io:4222
- 参考
  - [nats-io/jsm.go](https://github.com/nats-io/jsm.go)
    - JetStream Management Library for Golang
  - [nats-io/nats-surveyor](https://github.com/nats-io/nats-surveyor)
    - metrics, dashboard
  - [nats-io/terraform-provider-jetstream](https://github.com/nats-io/terraform-provider-jetstream/)
    - Terraform 管理 JetStream
  - [nats-io/nack](https://github.com/nats-io/nack)
    - K8S Controller

:::info

- 存储尚不支持集群

:::

:::caution

- 建议名字少于 32 字符

:::

```bash
# 启动 jetstream
nats-server -js
# 配置启动
nats-server -c js.conf

# 容器启动
# 默认 scrach 镜像只包含 /nats-server
docker run --rm -it -p 4222:4222 --name js nats:alpine -js


# nats stream
# ==================
# 创建 Stream
nats str add ORDERS --subjects "ORDERS.*" --ack --max-msgs=-1 --max-bytes=-1 --max-age=1y --storage file --retention limits --max-msg-size=-1 --discard=old --replicas 3 --dupe-window=2m
# 输出 stream 配置
nats str info ORDERS -j | jq .config
# 通过配置创建
nats str add ORDERS --config orders.json

# 所有 stream
nats str ls
# stream 信息
nats str info ORDERS
# 复制 stream
nats str cp ORDERS ARCHIVE --subjects "ORDERS_ARCVHIVE.*" --max-age 2y
# 修改 stream 单项配置
nats str edit ORDERS --subjects "ORDERS.*"
# 配置覆盖
nats str edit ORDERS --config orders.json

# 发布消息
nats pub ORDERS.scratch hello
# 发布带 ACK - 确认收到持久化
nats req ORDERS.scratch hello
# 清除所有消息
nats str purge ORDERS -f
# 删除一条消息 - SEQ
nats str rmm ORDERS 1 -f

# 移除 steam
nats str rm ORDERS -f

# nats consumer
# ==================
# 所有 consumer
nats con ls ORDERS
nats con add ORDERS DISPATCH --filter ORDERS.processed --ack explicit --pull --deliver all --sample 100 --max-deliver 20 --replay instant --max-pending 0
nats con add ORDERS NEW --filter ORDERS.received --ack explicit --pull --deliver all --max-deliver=-1 --sample 100
# 配置
nats con info ORDERS DISPATCH -j | jq .config
# MONITOR push
nats con add ORDERS MONITOR --filter '' --ack none --target monitor.ORDERS --deliver last --replay instant

# consumer 状态
nats con info ORDERS DISPATCH

nats pub ORDERS.processed "order 1"
nats pub ORDERS.processed "order 2"
nats pub ORDERS.processed "order 3"

# Pull 消费 ACK 消息
# --no-ack 不 ACK 继续消费
# ACK 执行一次消费一条
nats con next ORDERS DISPATCH
nats req '$JS.API.CONSUMER.MSG.NEXT.ORDERS.DISPATCH' ''

nats con info ORDERS MONITOR
# push 消费 - 会一次性消费所有
nats sub monitor.ORDERS

# nats 监控
# ==========
nats event --js-advisory


# nats 其他
# ==========
# 报告统计
nats s report
# 发送多条消息
nats req ORDERS.new "ORDER {{Count}}" --count 100

# 输出副本关系为 dot 图
nats s report --dot replication.dot

# 创建模板 - 在 pub 的时候生成
# 删除 template 会删除 所有 stream
nats str template add CLIENTS --subjects "CLIENT.*" --ack --max-msgs=-1 --max-bytes=-1 --max-age=1y --storage file --retention limits --max-msg-size 2048 --max-streams 1024 --discard old
```

```conf
jetstream {
   store_dir=nats
}
```

**stream.json**

```json
{
  "name": "ORDERS",
  "subjects": ["ORDERS.*"],
  "retention": "limits",
  "max_consumers": -1,
  "max_msgs": -1,
  "max_bytes": -1,
  "max_age": 31536000000000000,
  "max_msg_size": -1,
  "storage": "file",
  "discard": "old",
  "num_replicas": 1,
  "duplicate_window": 120000000000
}
```

## Notes

**Stream 属性**

| attr         | default      | mean                                                   |
| ------------ | ------------ | ------------------------------------------------------ |
| Name         |              |
| Storage      |              |
| Subjects     |              | 消费的主题 - 支持通配符                                |
| Replicas     |              | 集群副本 - 最多 5                                      |
| MaxAge       |              | 消息留存时间                                           |
| MaxBytes     |              | 消息数据量                                             |
| MaxMsgs      |              | 消息数量                                               |
| MaxMsgSize   |              |
| MaxConsumers |              |
| NoAck        |              | 禁用 ACK                                               |
| Rentention   | LimitsPolicy | 留存策略 - LimitsPolicy,InterestPolicy,WorkQueuePolicy |
| Discard      | DiscardOld   | 丢弃策略 - DiscardNew,DiscardOld                       |
| Duplicates   |              | 去重时间窗口                                           |
| Sealed       |
| DenyDelete   |
| DenyPurge    |
| AllowRollup  |

- 去重
  - 基于 Nats-Msg-Id

## KV

- 基于 JetStream 的 KV 存储
- https://pkg.go.dev/github.com/nats-io/nats.go#KeyValue
- https://github.com/nats-io/nats-architecture-and-design/blob/main/adr/ADR-8.md
  - read in-memory cache
  - key `\A[-/_=\.a-zA-Z0-9]+\z` - 不能 `.` 开头或结尾
  - bucket `\A[a-zA-Z0-9_-]+\z`
  - bucket
    - main `KV_<Bucket Name>`
    - ingest subject `$KV.<Bucket Name>.>`
    - max_msgs_per_subject - 历史版本数 - 最大 64
    - rollup_hdrs - rollup 删除
    - max_age - TTL
    - max_msg_size - value size
    - max_bytes - bucket size
  - $KV.CONFIGURATION.auth.username
    - io.nats.jetstream.api.v1.stream_msg_get_request

```bash
nats kv
```
