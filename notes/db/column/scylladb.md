---
title: ScyllaDB
---

# ScyllaDB

- [scylladb/scylla](https://github.com/scylladb/scylladb)
  - AGPL, C++
  - 使用 C++ 实现的 Cassandra
  - 不依赖 Zookeeper
  - 轻量级事务 Lightweight Transactions / LWT
  - Amazon DynamoDB 兼容接口
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

| port      | for            |
| --------- | -------------- |
| 7000-7001 | Inter-node RPC |
| 9042      | CQL            |
| 9160      | Thrift         |
| 10000     | REST API       |

```bash
# https://hub.docker.com/r/scylladb/scylla/
# /etc/scylla/scylla.yaml
# 7199 JMX
# SCYLLA_JMX_ADDR=-ja 0.0.0.0 SCYLLA_JMX_REMOTE=-r
#  -v $PWD/data:/var/lib/scylla \
# Swagger http://localhost:10000/ui
# https://docs.scylladb.com/stable/operating-scylla/admin.html
docker run --rm -it \
  -p 9042:9042 -p 19042:19042 -p 9160:9160 -p 10000:10000 \
  --name scylla scylladb/scylla --smp 1 --api-address 0.0.0.0

docker exec -it scylla nodetool status
docker exec -it scylla cqlsh
```

## cqlsh

```sql
SHOW VERSION;
SHOW HOST;

SHOW SESSION $id;

SOURCE '/data/commands.cql'

CAPTURE;
CAPTURE OFF;
CAPTURE '/data/file';

TRACING ON;
TRACING OFF;

PAGING ON;
PAGING OFF;
PAGING $page_size_in_rows;

EXPAND ON;
EXPAND OFF;

-- LOGIN <username> [<password>]

CLEAR;
CLS;

-- DESCRIBE <>
DESCRIBE CLUSTER;
DESCRIBE SCHEMA;
DESCRIBE KEYSPACES;
DESCRIBE KEYSPACE keyspace_name;
DESCRIBE TABLES;
DESCRIBE TABLE table_name;
DESCRIBE MATERIALIZED VIEW view_name;
DESCRIBE TYPES;
DESCRIBE TYPE type_name;
DESCRIBE FUNCTIONS;
DESCRIBE FUNCTION function_name;
DESCRIBE AGGREGATES;
DESCRIBE AGGREGATE aggregate_function_name;

-- COPY <table name> [(<column>, ...)] TO <file name> WITH <copy option> [AND <copy option> ...]
-- MAXREQUESTS=6 PAGESIZE=1000 PAGETIMEOUT=10
-- BEGINTOKEN, ENDTOKEN
-- MAXOUTPUTSIZE=-1
-- ENCODING=utf8

-- COPY <table name> [(<column>, ...)] FROM <file name> WITH <copy option> [AND <copy option> ...]
-- INGESTRATE=100000 MAXROWS=-1 SKIPROWS=0 SKIPCOLS=0 MAXPARSEERRORS=-1 MAXINSERTERRORS=1000
-- ERRFILE=import_<ks>_<table>.err
-- MAXBATCHSIZE=20 MINBATCHSIZE=2
-- CHUNKSIZE=1000
COPY test FROM 'file.csv' WITH HEADER=true;

-- COPY
-- NULLVAL=null HEADER=false DECIMALSEP=.
-- THOUSANDSSEP
-- BOOLSTYlE True, False
-- NUMPROCESSES
-- MAXATTEMPTS=5
-- REPORTFREQUENCY=0.25
-- RATEFILE
```

## CQL

```sql
CREATE KEYSPACE catalog WITH REPLICATION = { 'class' : 'NetworkTopologyStrategy','DC1' : 3};
use catalog;
CREATE TABLE mutant_data (
   first_name text,
   last_name text,
   address text,
   picture_location text,
   PRIMARY KEY((first_name, last_name)));
```

## 配置

- https://docs.scylladb.com/stable/getting-started/system-configuration.html

## NodeJS

```bash
pnpm add cassandra-driver
pnpm add -D tsx typescript @types/node

docker exec -it scylla nodetool status
docker exec -it scylla cqlsh -e "CREATE KEYSPACE catalog WITH REPLICATION = { 'class' : 'NetworkTopologyStrategy','datacenter1':1 }"
docker exec -it scylla cqlsh -k catalog -e "CREATE TABLE users (name text, age int, PRIMARY KEY(name))"
```

```js title="test.ts"
import { Client } from 'cassandra-driver';

const client = new Client({
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1',
  keyspace: 'catalog',
});

await client.batch(
  [
    {
      query: 'insert into users (name, age) values (?,?)',
      params: ['test', 1],
    },
    {
      query: 'insert into users (name, age) values (?,?)',
      params: ['test2', 1],
    },
    { query: 'update users set age = ? where name = ?', params: [2, 'test2'] },
  ],
  { prepare: true },
);

console.log((await client.execute(`SELECT * FROM users WHERE name = ?`, ['test2'])).rows);

process.exit(0);
```

```bash
pnpm tsx test.ts
```
