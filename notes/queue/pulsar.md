---
title: Pulsar
---

# Pulsar

- [apache/pulsar](https://github.com/apache/pulsar)
  - Apache-2.0, Java
  - 存算分离
    - 存储 [apache/bookkeeper](https://github.com/apache/bookkeeper)
    - Broker 无状态

```bash
# standalone 模式
docker run --rm -it \
  -p 6650:6650 -p 8080:8080 \
  -v $PWD/data:/pulsar/data \
  -v $PWD/conf:/pulsar/conf \
  --name pulsar apachepulsar/pulsar:3.0.0 bin/pulsar standalone

# 管理接口
# https://pulsar.apache.org/docs/3.0.x/admin-api-overview/
curl http://localhost:8080/admin/v2/persistent/public/default/my-topic/stats
```

## Kubernetes

- [apache/pulsar-helm-chart](https://github.com/apache/pulsar-helm-chart)
- 组件
  - zookeeper
  - bookkeeper
  - autorecovery - for bookkeeper
  - broker
  - functions
  - proxy
  - toolset
  - pulsar_manager
- 镜像 `apachepulsar/pulsar-all`
