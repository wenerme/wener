---
title: Redis FAQ
tags:
  - FAQ
---

# Redis FAQ

```
AOF base file appendonly.aof.1.base.rdb
AOF incr file appendonly.aof.1.incr.aof
```

## Replica vs Slave

- 含义完全相同
- slaveof = replicaof
- 是因为调整了名词 [redis#5335](https://github.com/redis/redis/issues/5335)

## Queue: List vs PubSub vs Stream vs ZSet {#queue}

> 都能实现消息队列能力，但场景不同

- List
  - 存储数据
  - 不能重复消费 - POP 后就不存在了
- Pub/Sub
  - 不存储数据 - 用于传递信息 - 实现异步/同步通讯
    - at-most-once, fire & forget, fan-out
  - 没有 Sub 时 Pub 是无意义的
  - 可用于订阅系统事件 - keyspace, keyevent - 需要调整配置 [键变化通知](./redis.md#键变化通知)
  - 支持 pattern - 例如 `system.events.*`
- Stream
  - 存储数据 - 有消费者、消费组概念
  - 能重复消费 - at-most-once 或 at-least-once
  - 有更多消息队列的概念 - 例如: 消息 ID、时间戳、 ACK
  - 能实现 List 和 Pub/Sub 的所有语义
  - 可以不阻塞
- ZSet
  - 有序集合
  - score 为 double
  - key 会去重
  - 可作为消息队列，基于 key/offset 消费

## MISCONF Redis is configured to save RDB snapshots

```
MISCONF Redis is configured to save RDB snapshots, but is currently not able to persist on disk. Commands that may modify the data set are disabled.
```

```bash
redis-cli
# config set stop-writes-on-bgsave-error no
```

- https://gist.github.com/kapkaev/4619127

## RESP3

- 目前的 RESP 是 QA 模式，性能和处理能力上有限
- 发送 HELLO 判断是否支持 RESP3

---

- https://gist.github.com/antirez/2bc68a9e9e45395e297d288453d5d54c

## ERR max number of clients reached

- client 默认 timeout 为 0，可尝试添加 timeout 在服务端关闭链接
- maxclients 默认 10,000

```bash
# 如果增加了 maxclients 也要增加系统限制
ulimit -Sn 100000
sysctl -w fs.file-max=100000
```
