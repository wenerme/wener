---
tags:
  - FAQ
---

# IM FAQ

- https://docs.nats.io/nats-concepts/overview/compare-nats

## fan-in vs fan-out

- fan in
  - N Producer -> 1 Broker
  - 多个发送者向一个接收者发送消息
  - 对性能影响较小，但需要确保服务端能够有效处理并发连接和数据的汇总。
  - 确保服务器能够处理高并发请求并在出现故障时快速恢复
- fan out
  - 1 Broker -> N Consumer
  - 一个发送者向多个接收者发送消息
  - 大规模聊天应用中可能会遇到性能瓶颈，特别是在实时广播大量消息时。
  - 使用 消息队列、发布/订阅模式 来缓冲消息并异步分发
  - 需要设计高可用的消息分发系统，避免单点故障导致的消息丢失。
  - one-to-many
  - PubSub
  - PushPull
- fan out write
  - 1 Broker -> N Consumer
- fan out read
  - 1 Consumer -> N Broker

```mermaid
flowchart LR
    PA & PB & PC --> Subject
    Subject --> SA & SB & SC
    PA[Publisher]
    PB[Publisher]
    PC[Publisher]
    SA[Subscriber]
    SB[Subscriber]
    SC[Subscriber]
```

```mermaid
flowchart LR
    GA & CA & GB --> UA
    GA & CA & CB --> UB
    GA[Group]
    GB[Group]
    CA[Chat]
    CB[Chat]
    UA[User]
    UB[User]
```

- 一个会话一个队列 - 独立单一
- 多消费
- 订阅时合并 - 逻辑复杂
- 相对可控性高

```mermaid
flowchart LR
    GA & CA & GB --> QA[Queue] --> UA
    GA & CA & CB --> QB[Queue] --> UB
    GA[Group]
    GB[Group]
    CA[Chat]
    CB[Chat]
    UA[User]
    UB[User]
```

- 服务器多存、多处理
- 单一消费
- 权限好控制
- 变动小 - 可控性低

## Topic vs Thread

| 维度        | Thread / 回复线程    | Topic / 讨论话题             |
| ----------- | -------------------- | ---------------------------- |
| 核心含义    | 围绕一条消息展开讨论 | 在群组中划分独立讨论空间     |
| 创建方式    | 回复消息时形成       | 显式创建 Topic               |
| 根对象      | 一条普通消息         | Topic 创建服务消息           |
| 名称        | 通常没有独立名称     | 有名称、图标                 |
| 生命周期    | 依附于根消息         | 可以关闭、重命名、删除、置顶 |
| 典型场景    | 新闻评论、消息回复   | 公告、技术讨论、闲聊分区     |
| 独立 Chat？ | 否                   | 否                           |

- Thread 接近 IM
- Topic 接近 forum
