---
title: RocketMQ
---

# RocketMQ

- [apache/rocketmq](https://github.com/apache/rocketmq)
  - 早期参考 Kafka 设计, Scala -> Java
  - vs Kafka
    - 功能更多 - 更复杂
    - 社区不活跃
    - 开发活跃度耕地
    - 服务商更少
    - 不依赖 ZK - 有 NamerServer 组件 ~= ZK
- 参考
  - [apache/rocketmq-docker](https://github.com/apache/rocketmq-docker)
  - [apache/rocketmq-operator](https://github.com/apache/rocketmq-operator)
    - 非常旧，不活跃
  - Helm https://github.com/apache/rocketmq-docker/tree/master/rocketmq-k8s-helm

```bash
docker run -it --net=host apache/rocketmq ./mqnamesrv
docker run -it --net=host -v $PWD/data:/home/rocketmq/store apache/rocketmq ./mqbroker -n localhost:9876
```

- 组件
  - broker
  - nameserver
  - proxy
    - RocketMQ 5.0 新增
    - 协议适配
    - 权限管理
    - 消息管理
    - 客户端不再需要 Broker 地址
    - 支持 gRPC 协议, 兼容 4.x Remoting 协议
      - remotingAccessAddr
- 参考
  - https://www.haxi.cc/archives/rocketmq5-x.html
  - https://help.aliyun.com/zh/apsaramq-for-rocketmq
    - Topic 150
    - Consumer Group 1500
