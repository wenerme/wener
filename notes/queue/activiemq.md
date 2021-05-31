---
title: ActiveMQ
---

# ActiveMQ

- [apache/activemq](https://github.com/apache/activemq) 是什么？
  - 支持协议 OpenWire, STOMP 1.0/1.1/1.2, MQTT, AMQP 1.0, REST, WebSockets
  - 原生协议 Openwire 功能最为完善 - 端口 61616
  - WebUI 端口 8161
- 所有协议都可以在 61616
- 参考
  - [disaster37/activemq](https://github.com/disaster37/activemq)
    - 5.14.3

```bash
# STOMP 61613
docker run --rm -it \
  -p 8161:8161 -p 61613:61613 -p 61616:61616 \
  --name activemq webcenter/activemq
```

# FAQ

## Queue vs Topic

- Topic
  - 实现 Pub, Sub 语义
  - 先 Sub 后 Pub
  - Pub 时所有 Sub 都会接收消息
- Queue
  - 实现负载均衡语义 - fanout
  - 一个消息只能被消费一次
  - 被消费的消息没有被 Ack 会从新分发

- 参考
  - https://activemq.apache.org/how-does-a-queue-compare-to-a-topic.html
