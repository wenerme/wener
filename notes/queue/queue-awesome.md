---
title: Queue Awesome
---

# Queue Awesome

## Protocol

- STOMP - Simple Text Oriented Message Protocol
  - 类 HTTP
  - 基于文本 frame 通讯
  - Client: SEND, SUBSCRIBE/UNSCRIBE, ACK/NACK
  - Server: MESSAGE, RECEIPT, ERROR
- MQTT - Message Queue Telemetry Transport
  - 由 IBM 为嵌入式设备 Telemetry 设计
  - 适用于 Low Bandwid、High Latency、Data Limit、Fragile Connection 场景
  - 二进制格式 - 2 byte 头
  - Pub/Sub
  - 可靠 - QOS
  - 安全 - Auth、TLS/SSL
  - 简单
  - Connect/Disconnect + Publish + Subscribe/Unscribe
- AMQP - Advanced Message Queue Protocol
  - 2006 JP Morgan
  - 作为中间件 - 解决业务耦合问题
  - 设计为可替代的消息中间件 - 很多实现

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
- RabbitMQ
  - AMQP, MQTT, STOMP, HTTP
- [nats-io/nats-server](https://github.com/nats-io/nats-server)
  - [liftbridge-io/liftbridge](https://github.com/liftbridge-io/liftbridge)
  - [nats-io/nats-streaming-server](https://github.com/nats-io/nats-streaming-server)
    - 已废弃 - 使用 jetstream - nats 启动添加 -js
    - Protocol Buffer 编码
    - 持久化
    - QoS
    - 流控
- [nsqio/nsq](https://github.com/nsqio/nsq)
  - 开发相对没有那么活跃
