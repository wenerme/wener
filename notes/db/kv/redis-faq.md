---
title: Redis FAQ
tags:
  - FAQ
---

# Redis FAQ

## Replica vs Slave

- 含义完全相同
- slaveof = replicaof
- 是因为调整了名词 [redis#5335](https://github.com/redis/redis/issues/5335)

## List vs PubSub vs Stream

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
