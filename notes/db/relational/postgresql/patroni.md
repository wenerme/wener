---
title: patroni
---

# patroni

- [zalando/patroni](https://github.com/zalando/patroni) - template for PostgreSQL High Availability with Etcd, Consul, ZooKeeper, or Kubernetes
- 支持分布式配置
  - Zookeeper
  - etcd
  - consul
  - Kubernetes
  - 内建 RAFT - BETA
- [复制模式](https://github.com/zalando/patroni/blob/master/docs/replication_modes.rst)
  - 默认使用异步 stream 复制 - maximum_lag_on_failover 控制从节点失败延迟
    - 异常时可能丢失一部分提交事务
    - 重新选举时不会考虑副本时间线 - `check_timeline`
  - 同步
    - synchronous_commit: "on"
    - synchronous_standby_names: "\*"
    - 同步复制依然可能丢数据，例如三个节点，同时两个失败
    - 开启 synchronous_mode 会让所有节点都复制后才返回，保证不丢失事务
      - 可用性更低

:::tip

- 应用不要使用 superuer
- citus 是 sharding 模式， patroni 是 副本模式 - 当 DB 占用内存大于单个节点时考虑 sharding
- 没有 mysql_fdw 扩展

:::

## spilo

- [zalando/spilo](https://github.com/zalando/spilo)
  HA PostgreSQL cluster using Docker
- 环境变量 [ENVIRONMENT](https://github.com/zalando/spilo/blob/master/ENVIRONMENT.rst)
- patronictl
- /scripts

```bash
patronictl list
patronictl show-config
```
