---
title: ScyllaDB
---

# ScyllaDB

:::tip When to use ScyllaDB

- 大多为 KV 访问方式
- 单行、cell 数据量不是特别大 - 默认 10MB 行、 1MB cell 会发出警告

:::

- [scylladb/scylladb](https://github.com/scylladb/scylladb)
  - AGPL, C++
  - 使用 C++ 实现的 Cassandra
  - 不依赖 Zookeeper
  - 轻量级事务 Lightweight Transactions / LWT
  - alternator - Amazon DynamoDB 兼容接口
  - 支持 CDC/Change Data Capture
  - 基于 [seastar](https://github.com/scylladb/seastar) 框架
- [Apache Cassandra Compatibility](https://docs.scylladb.com/using-scylla/cassandra-compatibility/)
  - Apache Cassandra 3.11
- [要求](https://docs.scylladb.com/getting-started/system-requirements)
  - 最小 4 核, 2G, SSD
  - 生产 20 核, 128G, RAID0 4 SSD 1-5TB
  - 分析 28 核, 256G, NVMe 10TB
- [Scylla Manager](https://manager.docs.scylladb.com/stable/)
  - scylladb 管理平台
  - 例如 备份、恢复、集群状态
  - 不超过 5 个节点免费
- [Scylla Monitor](https://monitoring.docs.scylladb.com/stable/)
  - scylladb 监控平台
  - Prometheus + Grafana
- [scylladb/scylla-operator](https://github.com/scylladb/scylla-operator)
- Why C++ https://news.ycombinator.com/item?id=28294546
- [scylladb/scylla-migrator](https://github.com/scylladb/scylla-migrator)

| port      | for            |
| --------- | -------------- |
| 7000-7001 | Inter-node RPC |
| 9042      | CQL            |
| 9160      | Thrift         |
| 9180      | metrics        |
| 10000     | REST API       |

```bash
mkdir -p data/{data,commitlog,hints,view_hints}
# https://hub.docker.com/r/scylladb/scylla/
# /etc/scylla/scylla.yaml
# 7199 JMX
# SCYLLA_JMX_ADDR=-ja 0.0.0.0 SCYLLA_JMX_REMOTE=-r
# Swagger http://localhost:10000/ui
# Metrics http://localhost:9180/metrics
# https://docs.scylladb.com/stable/operating-scylla/admin.html
# developer-mode=1 减少检测 - 例如 macOS 上挂载 volume 会失败
# 账号密码默认为 cassandra
# docker 内置 sshd, node_exporter, rsyslogd, scylla-jmx, scylla-housekeeping, supervisord
docker run --rm -it \
  -p 9042:9042 -p 19042:19042 -p 9160:9160 -p 10000:10000 -p 9180:9180 -p 8000:8000 \
  -v $PWD/data:/var/lib/scylla \
  --hostname scylla \
  --name scylla scylladb/scylla \
  --seeds=scylla --broadcast-address=172.17.0.2 --broadcast-rpc-address=172.17.0.2 \
  --cluster-name=scylla1 \
  --developer-mode=1 \
  --api-address=0.0.0.0 --listen-address=0.0.0.0 \
  --authenticator=PasswordAuthenticator \
  --alternator-port=8000 \
  --alternator-write-isolation=only_rmw_uses_lwt

docker exec -it scylla nodetool status
docker exec -it scylla cqlsh -u cassandra -p cassandra
```

:::tip

- 默认读超时 5s, 写超时 2s

:::

## Cluster

- cluster_name
- dc=datacenter1
- rack=
- seeds - 第一个节点的 IP
- auto_bootstrap=true
- snitch=GossipingPropertyFileSnitch
  - 支持 NetworkTopologyStrategy

```sql

```

```ini title="cassandra-rackdc.properties"
dc=datacenter1
rack=rack1
; prefer_local=<false | true>
; dc_suffix=<Data Center name suffix, used by EC2SnitchXXX snitches>
```

- https://docs.scylladb.com/stable/operating-scylla/procedures/cluster-management/index.html

## Auth

- authenticator
  - PasswordAuthenticator
  - ldap - 企业版
  - AllowAllAuthenticator
- authz
  - AllowAllAuthorizer
  - CassandraAuthorizer
  - ldap - 企业版

```sql
-- 如果用了 PasswordAuthenticator 注意增加副本数
ALTER KEYSPACE system_auth WITH REPLICATION = {'class' : 'NetworkTopologyStrategy', 'dc1' : 1};
-- 或
ALTER KEYSPACE system_auth WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 3 };


CREATE ROLE admin WITH PASSWORD = 'password' AND LOGIN = true AND SUPERUSER = true;

GRANT viewer TO wener;
-- LIST ROLES [ OF `role_name` ] [ NORECURSIVE ]
LIST ROLES;

-- GRANT permissions ON resource TO role_name
-- permissions - ALL [ PERMISSIONS ] | `permission` [ PERMISSION ]
-- permission - CREATE | ALTER | DROP | SELECT | MODIFY | AUTHORIZE | DESCRIBE
-- resource: ALL KEYSPACES | KEYSPACE name | [ TABLE ] name | ALL USERS | USER name

-- LIST `permissions` [ ON `resource` ] [ OF `user_name` [ NORECURSIVE ] ]
```

## Alternator

- alternator-write-isolation
  - 默认写隔离策略
  - RMW - ready-modify-write
  - 每个表可以设置默认 - system:write_isolation
  - a, always, always_use_lwt - 非常慢
  - f, forbid, forbid_rmw - 不允许 rmw 请求
  - o, only_rmw_uses_lwt - 只有 rmw 使用 lwt - **推荐**
  - u, unsafe, unsafe*rmw - 最快，不通过事务，而是一次 read 一次 write - *不推荐\_
- alternator_encryption_options
  - keyfile
  - certificate
- alternator_enforce_authorization=true
- LWT - lightweight transactions
- 直接走内部逻辑，而不是生产 CQL 作为 Adapter
- experimental
  - alternator-ttl
    - --alternator-ttl-period-in-seconds 默认 24h
      - expire 后的清理间隔
  - alternator-streams
- 不支持 - [compatibility](https://github.com/scylladb/scylladb/blob/master/docs/alternator/compatibility.md)
  - 细粒度 ACL - 无 IAM Policy 概念
- 参考
  - https://github.com/scylladb/scylladb/blob/master/docs/alternator/alternator.md
  - [DynamoDB API Reference](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/)
    - JSON over HTTP
  - [scylladb/alternator-load-balancing](https://github.com/scylladb/alternator-load-balancing)

## Tools

- https://docs.scylladb.com/stable/operating-scylla/nodetool.html

## 清除数据

```bash
sudo rm -rf /var/lib/scylla/data
sudo find /var/lib/scylla/commitlog -type f -delete
sudo find /var/lib/scylla/hints -type f -delete
sudo find /var/lib/scylla/view_hints -type f -delete
```

# FAQ

## std::runtime_error (sorted_tokens is empty in first_token_index!)

注意设置 broadcast-address

## Server timeout during write query at consistency LOCAL_ONE

- write_request_timeout_in_ms=2000
- 默认 2s 建议增大

## large data - row/cell

- compaction_large_row_warning_threshold_mb=10
- compaction_large_cell_warning_threshold_mb=1

```sql
SELECT * FROM system.large_rows;
SELECT * FROM system.large_cells;
```

```
large_data - Writing large cell
```

## Memory usage of unpaged query exceeds soft limit of 1048576

- max_memory_for_unlimited_query_soft_limit

```bash
curl 127.0.0.1:10000/v2/config/max_memory_for_unlimited_query_soft_limit
```

- https://github.com/scylladb/scylladb/issues/8035
