---
title: CQL
tags:
  - SQL
---

# CQL

- https://docs.datastax.com/en/cql-oss/3.3/
- [datastax/nodejs-driver](https://github.com/datastax/nodejs-driver)

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

- KEYSPACE - CREATE, DROP, DESCRIBE, ALTER
  - 数据库概念
  - durable_writes
  - replication
    - class
      - NetworkTopologyStrategy
        - `<datacenter>` - 给定 dc 的副本数
        - replication_factor - dc 默认副本数
      - SimpleStrategy
        - replication_factor
          - 全局副本数，不考虑 datacenter
- USE keyspace
- TABLE
  - column
    - STATIC - 相同分片值相同
  - PRIMARY KEY
    - 不指定则每行为一个 partition
    - 值不能为 null
    - 第一个列作为 partition key
    - `PRIMARY KEY ((a, b), c)` - 多个 partation key
      - c 为 clustering column
  - table_options
    - ~~COMPACT STORAGE~~
    - CLUSTERING ORDER
      - 默认基于 clustering column 排序
      - 可修改排序
    - comment
    - read_repair_chance=0
    - dclocal_read_repair_chance=0
    - speculative_retry=99PERCENTILE
    - gc_grace_seconds=864000
    - tombstone_gc
    - bloom_filter_fp_chance=0.01
    - default_time_to_live=0
    - cdc
      - enabled=false
      - preimage=false
      - ttl
    - compaction - 合并 SSTables
      - tombstone_threshold=0.2
      - tombstone_compaction_interval=86400s - 1day
      - SizeTieredCompactionStrategy - STCS - 默认
        - bucket_high=1.5, bucket_low=0.5
        - min_sstable_size=50
        - min_threshold=4, max_threshold=32
      - LeveledCompactionStrategy - LCS
        - sstable_size_in_mb=160
      - IncrementalCompactionStrategy - ICS - 企业版
      - DateTieredCompactionStrategy - TWCS
        - 1 sstable/time window
        - compaction_window_unit=DAYS, compaction_window_size=1
        - expired_sstable_check_frequency_seconds=600
        - min_threshold=4, max_threshold=32
    - compression
      - sstable_compression=LZ4Compressor
        - SnappyCompressor
        - DeflateCompressor
      - chunk_length_in_kb=4KB
    - scylla_encryption_options
    - `caching = {'enabled': 'true'}`
    - speculative_retry
    - cache
      - enabled=true
- INDEX - 二级索引
  - 本地 - 单分片
  - 全局
- TTL
  - 设置为列维度
  - 可以行维度
  - 表可以设置默认 default_time_to_live
- JSON
  - `SELECT JSON`
  - `INSERT JSON`
  - fromJson
  - toJson
- CREATE MATERIALIZED VIEW
  - SELECT 限制
    - 不可以 ALLOW FILTERING
    - 不允许 order
    - 不包含 limit
- ScyllaDB 扩展
  - SELECT BYPASS CACHE
  - CREATE TABLE WITH paxos_grace_seconds
  - SELECT/INSERT USING TIMEOUT
  - KEYSPACE options
  - PRUNE MATERIALIZED VIEW
  - CREATE MATERIALIZED VIEW WITH synchronous_updates
    - 同步更新
  - MV 二级索引 synchronous_updates
  - REDUCEFUNC for UDA
  - per_partition_rate_limit

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

- https://docs.scylladb.com/stable/cql/ddl.html
- https://docs.scylladb.com/stable/cql/types.html
- https://docs.scylladb.com/stable/cql/compaction.html
