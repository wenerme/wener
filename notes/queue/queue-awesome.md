---
title: Queue Awesome
tags:
  - Awesome
---

# Queue Awesome

:::tip 考虑维度

- 持久化
- 顺序性
- 消息交付保证
- 语言支持
- 维护难易度
  - 单机
  - 集群
- 功能
  - 延迟队列
  - 请求 & 响应
  - Dedup
  - 优先级队列
  - 死信队列
  - 重试队列
  - 消费模式 - 推拉
  - 广播消费
  - 消息回溯 - 是否持久化
  - 消费堆积
  - 持久化
  - 消息追踪
  - 消息过滤
  - 多租户
  - 协议 - STOMP, MQTT, AMQP, Websocket
  - 流量控制
  - 消费顺序性
  - 安全机制
  - 幂等
  - 事务
- 规模
  - 万/s
  - 百万/s
  - 更高

:::

:::tip 推荐

- 优先考虑: Redis, Nats, 关系型数据库

:::

:::tip 区别

- 存储
  - 短期
    - 消费后即删除
    - 正常的 MQ
  - 长期
    - 基于 Offset 消费，设置保留时间
    - 兼任半个 DB 的能力 - Kafka、Nats JetStream、RocketMQ

:::

- Apache Pulsar
  - by Yahoo 2016
  - 计算和存储分离
  - BookKeeper
- Apache Kafka
  - by Linkedin 2010
- RocketMQ
  - by Alibaba
  - fork Kafka
- RabbitMQ
  - AMQP, MQTT, STOMP, HTTP
- ActiveMQ
- HiveMQ
- Redis
- [nats-io/nats-server](./nats/README.md)
  - [liftbridge-io/liftbridge](https://github.com/liftbridge-io/liftbridge)
    - ⚠️ 不维护
    - 概念接近 Kafka
    - https://liftbridge.io/docs/feature-comparison.html
    - [vs. NATS Streaming](https://liftbridge.io/docs/feature-comparison.html)
  - [nats-io/nats-streaming-server](https://github.com/nats-io/nats-streaming-server)
    - ⚠️ 已废弃 - 使用 jetstream - nats 启动添加 -js
    - Protocol Buffer 编码
    - 持久化
    - QoS
    - 流控
- [bloomberg/blazingmq](https://github.com/bloomberg/blazingmq)
  - Apache-2.0, C++
  - 不做长期存储
- [redpanda-data/redpanda](https://github.com/redpanda-data/redpanda)
  - BSL, C++,Go
  - 兼容 Kafka 协议
  - No Zookeeper
- [confluentinc/ksql](https://github.com/confluentinc/ksql)
  - Confluent Community License, Java
- [cashapp/pranadb](https://github.com/cashapp/pranadb)
  - Apache-2.0, Go
- [nsqio/nsq](https://github.com/nsqio/nsq)
  - 开发相对没有那么活跃
- ZeroMQ
  - IPC
- TaskQueue/任务队列 - 通常在 Queue 上抽象服务功能，通常支持 cron
  - celery
    - Python
  - bull
    - Node.js
- Streaming Processing
  - Hazelcast Jet
  - Apache Kafka Streams
  - Apache Flink
  - Apache Spark
  - Apache Storm
  - Apache Samza
  - Apache Beam

## Protocol

- STOMP - Simple Text Oriented Message Protocol
  - 端口 61613
  - 类 HTTP
  - 基于文本 frame 通讯
  - Client: SEND, SUBSCRIBE/UNSCRIBE, ACK/NACK
  - Server: MESSAGE, RECEIPT, ERROR
  - 1.1 - 支持心跳, NACK, Virtual Host
  - 1.2 - 2012-10-22
    - 支持 `\r\n` 而不只是 `\n`， ACK 头
    - 支持重复 Frame 头, content-length & content-type 头
    - 要求服务端支持 STOMP frame
    - 链接驻留
    - 订阅和事务的 Scope 和唯一标识
    - RECEIPT
- [MQTT](./mqtt.md) - Message Queue Telemetry Transport
  - 端口 1883
  - 由 IBM 为嵌入式设备 Telemetry 设计
  - 适用于 Low Bandwid、High Latency、Data Limit、Fragile Connection 场景
  - 二进制格式 - 2 byte 头
  - Pub/Sub
  - 可靠 - QOS
  - 安全 - Auth、TLS/SSL
  - 简单
  - Connect/Disconnect + Publish + Subscribe/Unscribe
- AMQP - Advanced Message Queue Protocol
  - 端口 5672
  - 2006 JP Morgan
  - 作为中间件 - 解决业务耦合问题
  - 设计为可替代的消息中间件 - 很多实现
  - 0.9.1 和 1.0 不兼容 - RabbitMQ 为 0.9.1, ActiveMQ 为 1.0
- Openwire
  - 端口 61616

## Server

- 考虑选择的标准
  - 队列特性
    - 分发保证
      - At Least Once
      - At Most Once
      - Exactly Once
    - 模式
      - Pull
      - Push
      - Request/Replay
      - Consumer Group/负载均衡
    - 优先级
    - 消息保留和持久化
      - 介质 - 文件、内存、分片、副本、DB
      - TTL - Rentention
      - 长短期存储 - 归档
    - Filter
    - Dedup
    - Message Size
    - Flow control - rate matching/limiting
    - 多租户 - 分片/Topic/Subject
  - 场景
    - 事务
    - 嵌入式
    - RPC
    - Event
    - IPC
  - 集成能力
    - AMQP, MQTT, STOMP, HTTP, WebSocket, Kafka
  - 集群容错
  - 路由分发能力
  - 部署模式
  - 服务特性
    - 安全
    - AuthN
    - AuthZ

## Delayed Message

1. RabbitMQ：支持使用 TTL（Time To Live）和死信队列来实现延时队列。
2. RocketMQ：支持通过设置消息的延时等级来实现延时队列。
3. ~~Kafka~~
4. ActiveMQ：支持使用 Scheduled Message 和 Redelivery Policy 来实现延时队列。
5. Redis：通过使用 zset 有序集合来实现延时队列。
6. ZeroMQ：支持使用定时器来实现延时队列。
7. NSQ：支持通过设置消息的 TTL 来实现延时队列。
8. Beanstalkd：支持使用 Delay Job 来实现延时队列。
9. Pulsar
