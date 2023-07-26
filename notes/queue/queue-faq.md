---
title: Queue FAQ
tags:
  - FAQ
---

# Queue FAQ

## Event vs Message

- Event -> EventBus
  - 事件 - 强调发生了什么
  - 不包含业务属性，通用 - 无指向性
  - 通常 fire and forget
  - 用于 集成、解耦、触发交互
  - **多个** 外部/内部消费者
- Message -> Queue
  - 消息 - 强调需要被消费
  - 包含业务属性 - 有指向性
  - 通常需要 持久化、重试、幂等
  - 用于 业务流程、状态变更、事务
  - 通常一个业务会有 **一个/组** 消费者 - 相同消息不重复消费

## NATS vs NSQ

- [Nats](./nats/README.md)
  - 专注 Pub/Sub
  - 内存处理
  - 支持 JetStreaming
- NSQ
  - 默认情况下是不持久化的

## Kafka vs RocketMQ vs Pulsar

- [Kafka](./kafka/README.md)
  - by Confluent 2010
  - 开发更活跃
  - 社区活跃
  - 生态丰富
  - 部分 Scala - Java 越来越多
  - HA 依赖 Zookeeper
    - 目前正在移除 ZK 依赖
    - 内部提供 NameServer
  - 默认保留 7 天
  - 云服务商: 非常多 - 阿里云也有
  - 简单易用
- [RocketMQ](./rocketmq.md)
  - by 阿里 2011
  - 纯 Java - 早期相当于参考 Kafka 翻的 Java
  - 社区 - 中国、小众
  - 生态非常欠缺
  - HA 不依赖外部服务 - Master Slave/Dledger
    - 主从切换可能有点问题
  - 默认保留 72 小时 - 3 天
  - 云服务商: 阿里云
  - vs Kafka
    - 可以支持更多 Topic 数量 - 但是阿里云上限 150
    - 功能完善 - 复杂度更高
- [Pulsar](./pulsar.md)
  - by Streamlio 2012 - 201809 Apache 顶级项目
  - 默认一直保留 - 可手动删除
  - 存算分离
    - Bookkeeper 存储
    - Broker 无状态
  - 更新
  - 支持 多租户、强一致性、跨域部署
  - 云服务商: https://streamnative.cn/
    - 阿里云合作
  - **结构复杂** - 组件很多

---

- https://rocketmq.apache.org/docs/#rocketmq-vs-activemq-vs-kafka
