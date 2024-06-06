---
title: Queue
---

# 队列

- Dump pipe, Smart endpoint.
- 常见协议
  - AMQP - v1.0 2011
    - Apache Qpid
    - Apache ActiveMQ
    - RabbitMQ
  - MQTT - v5.0 2019
    - Mosquitto
    - [emqx/emqx](https://github.com/emqx/emqx)
      - 国产、erlang
    - [hivemq/hivemq-community-edition](https://github.com/hivemq/hivemq-community-edition)
  - XMPP
    - Openfire
    - ejabberd
- 常见 IM 协议
  - IRC
  - Matrix
  - MTProto - Telegram
  - SIP/SIMPLE
  - XMPP
- [Benchmarking Message Queue Latency](https://bravenewgeek.com/benchmarking-message-queue-latency/)

## Notes

- 选择消息队列的考虑因素/纬度非常多
- 队列只是一种数据访问形式
- 根据场景和目的不同，会选择完全不同的实现
- 常见场景
  - 服务总线 - 基于 Queue 进行通讯
  - 事件编程 - Pub/Sub/Trigger
  - 存储 - 先存再处理，fan in/fan out
  - 任务队列 - 支持任务调度的特性
  - 实时通讯
- 不同场景对对队列又有不同的性质要求
- 常见特性
  - 分组、单独消费
  - 可重复消费
  - 消息优先级
  - 消息消费的事务性质 - 至少一次、至多一次、准确一次
  - 队列服务 HA 特性
  - 支持协议类型

## Cherami

- [uber/cherami-server](https://github.com/uber/cherami-server) - Distributed, scalable, durable, and highly available message queue system.
  - 已废弃，选择了 Kafka
- [Cherami: Uber Engineering’s Durable and Scalable Task Queue in Go](https://eng.uber.com/cherami/)
- 基本要求
  - 持久化,不丢失,允许硬件错误
  - 在出现网络异常时可以很灵活的在 AP 和 CP 之间调整
  - 可以能够对每个队列进行扩缩容
  - 支持竞争消费的消费模型
  - 语言无关
- 设计理念
  - 选择最终一致. 这样保证了高可用和持久化, 但牺牲了顺序性.不过这样保证了即使在硬件或网络异常时也能处理请求.
  - 不支持 partitioned consumer pattern, 不将分片暴露给用户.简化了消费者管理,简化配置使得消费者和生产者可以独立扩容.
