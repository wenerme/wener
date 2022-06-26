---
title: Citus
---

# Citus

Citus is not PostgreSQL

- [citusdata/citus](https://github.com/citusdata/citus)
  - AGPL-3.0, C
  - 被 微软 收购
  - 目前 PG 唯一的水平扩容方案
- 参考
  - [When to use](https://docs.citusdata.com/en/stable/get_started/what_is_citus.html#when-to-use-citus)
    - When
      - Multi-Tenant Database
      - Real-Time Analytics
    - Inappropriate
      - Traditional data warehousing with long, free-form SQL
      - Many distributed transactions across multiple shards
      - Queries that return data-heavy ETL results rather than summaries
  - [Microsoft Acquires Citus Data](https://www.citusdata.com/blog/2019/01/24/microsoft-acquires-citus-data/)
    - [HN](https://news.ycombinator.com/item?id=18990469)
  - [Scaling out Postgres with the Citus open source shard rebalancer](https://www.citusdata.com/blog/2021/03/13/scaling-out-postgres-with-citus-open-source-shard-rebalancer)
  - [Sharding Postgres on a single Citus node, how why & when](https://www.citusdata.com/blog/2021/03/20/sharding-postgres-on-a-single-citus-node/)
    - scale-out-ready
    - query parallelization, multi-shard queries
    - smaller indexes to create/maintain
    - smaller tables to auto-vacuum (in parallel!), and
    - faster bulk data loads
  - [Choosing Distribution Column](https://docs.citusdata.com/en/stable/sharding/data_modeling.html#choosing-distribution-column)
  - pg_conftool https://github.com/credativ/postgresql-common/blob/master/pg_conftool
  - [Lessons learned from Postgres schema sharding](https://www.citusdata.com/blog/2016/12/18/schema-sharding-lessons/)
    - db/tenant
    - schema/tenant
    - tenant_id/tenant - Scale 唯一可行的方式

:::caution

- 不会传播 `SET`/`set_config`, 配置后可以传播 `SET LOCAL`, 注意 RLS 实现方式
  - 推荐使用常量值 - 可以优化
  - 通过 current_user 实现没问题 - 注意 authinfo 同步
  - 配置同步 [citus#1327](https://github.com/citusdata/citus/issues/1327)
  - session 信息同步 [citus#462](https://github.com/citusdata/citus/issues/462)
- 不会传播 `search_path`
- 数据副本问题需要自己处理
- 运行在默认数据库 - postgres - 每个数据库独立，新的数据库需要重新维护节点关系
- [#906](https://github.com/citusdata/citus/issues/906) 不支持 trigger
- [#3854](https://github.com/citusdata/citus/issues/3854) 不支持 ARM
- ~~开原版 rebalancer 会阻塞，商业版使用 逻辑服复制，不会锁~~
- 不支持功能
  - ALTER SEQUENCE
  - Correlated subqueries
  - Recursive CTEs
  - Table sample
  - SELECT … FOR UPDATE
  - Grouping sets
  - Window Functions
  - CTEs
  - Set operations
  - Transactional semantics for queries that span across multiple shards
  - 临时表
- Co-Location 支持的功能更多
- 不会 传播 的对象
  - CREATE DATABASE
  - ALTER … SET SCHEMA
  - ALTER TABLE ALL IN TABLESPACE
  - v11+ CREATE ROLE/USER, GRANT/REVOKE

:::

:::tip

- statement-based shard replication for scaling reads

:::

```bash
# macOS 上为 PostgresSQL 加 citus 扩展
# brew install citus
# echo "shared_preload_libraries = 'citus'" >> postgresql.conf

# Docker 单节点
docker run --rm -it \
  -p 5432:5432 \
  -e POSTGRES_PASSWORD=mypass \
  -v $PWD/data:/var/lib/postgresql/data \
  --name citus citusdata/citus:11-alpine
```

```sql
SELECT * FROM master_get_active_worker_nodes();

SELECT version();
SELECT citus_is_coordinator();

-- 分片表
SELECT create_distributed_table('orgs', 'id');
-- 在所有节点上都存在
SELECT create_reference_table('geo_ips');
-- 取消 colocated - 默认基于 分布列 的值进行 colocated
SELECT create_distributed_table('A', 'foo', colocate_with => 'none');
-- 取消
SELECT undistribute_table('table_name');
```

## Tenant Demo

```sql
create table orgs
(
    id   bigserial primary key,
    name text not null
);

create table users
(
    id     bigserial,
    org_id bigint references orgs (id),
    name   text not null,
    primary key (org_id, id)
);

create table notes
(
    id      bigserial,
    org_id  bigint,
    user_id bigint,
    title   text not null,
    content text not null,
    primary key (org_id, id),
    foreign key (org_id, user_id)
        references users (org_id, id)
);
SELECT create_distributed_table('orgs', 'id');
SELECT create_distributed_table('users', 'org_id');
SELECT create_distributed_table('notes', 'org_id');

-- 准备数据
insert into orgs(name)
select 'org-' || num
from generate_series(1, 100) num;

insert into users(org_id, name)
select coalesce(nullif(num % 100, 0), 10), 'user-' || num
from generate_series(1, 10000) num;

insert into notes(org_id, user_id, title, content)
select coalesce(nullif(num % 100, 0), 10), coalesce(nullif(num % 10000, 0), 100), 'note-' || num, 'content-' || num
from generate_series(1, 1000000) num;

-- 重新平衡分片
SELECT rebalance_table_shards('notes');
-- 隔离租户分片 - 输出新的分片 ID
SELECT isolate_tenant_to_new_shard('orgs', 5, 'CASCADE');

-- 查看分片所处位置
SELECT shardid, nodename, nodeport
FROM pg_dist_placement AS placement,
     pg_dist_node AS node
WHERE placement.groupid = node.groupid
  AND node.noderole = 'primary'
--   AND shardid = 102105
ORDER BY shardid
;

-- 移动分片位置
-- SELECT citus_move_shard_placement(
--                102240,
--                'source_host', source_port,
--                'dest_host', dest_port);

```

## Notes

- 表类型
  - 分布式表/分片表 - table -> table_1001
    - create_distributed_table
    - 每个节点存在部分数据
    - 指定分布列
    - Co-Location 尽量让 join 表在相同节点
      - `SELECT create_distributed_table('page', 'tenant_id', colocate_with => 'event');`
      - `colocate_with => 'none'` 取消
  - 引用表
    - create_reference_table
    - 所有节点数据相同 - 数据量少，用于 join
    - 使用 2PC
  - 本地表 - 不受 citus 管理的表

| table/view         | for                |
| ------------------ | ------------------ |
| pg_dist_shard      | 记录表分片         |
| pg_dist_placement  | 记录分片所处节点   |
| pg_dist_node       | 记录节点           |
| pg_dist_colocation |
| pg_dist_partition  |
| pg_dist_authinfo   | 多用户节点连接信息 |
| pg_dist_poolinfo   | 内部链接池         |

- 分片数量 - 推荐 32 - 128
  - < 100GB 推荐 32 即可
- 节点和元数据管理配置 - pg_dist_node
  - citus_add_node('name',5432,-1,'primary','default')
    - 节点名字，端口，groupid，primary/secondary，集群名字
    - 返回在 pg_dist_node 中的 ID
    - 添加到 pg_dist_node
  - citus_update_node(node_id, node_name, node_port)
  - citus_set_node_property(node_name, node_port, property, value)
    - property - 目前只有 shouldhaveshards
  - citus_add_inactive_node(node_name, node_port, group_id, node_role, node_cluster)
  - citus_activate_node(node_name, node_port)
  - citus_disable_node(node_name, node_port)
  - citus_add_secondary_node(node_name, node_port, primary_name, primary_port, node_cluster)
  - citus_remove_node(node_name, node_port)
  - citus_get_active_worker_nodes()
- citus_backend_gpid()
  - GPID - global process identifier
- citus_check_cluster_node_health()
- citus_set_coordinator_host(host,port=current_setting('port'),node_role='primary',node_cluster='default')
  - 设置为 localhost 则是单节点集群
  - 添加到 pg_dist_node
  - groupid=0,shouldhaveshards=false
- 分片信息
  - master_get_table_metadata(table_name)
  - get_shard_id_for_distribution_column(table_name,distribution_value)
  - column_to_column_name(table_name, column_var_text)
    - pg_dist_partition
  - citus_relation_size(logical_rel_id)
  - citus_table_size(logical_rel_id)
  - citus_total_relation_size(logical_rel_id)
  - citus_stat_statements_reset()
- 集群管理和修复
  - citus_move_shard_placement
  - rebalance_table_shards
  - get_rebalance_table_shards_plan
  - get_rebalance_progress
  - citus_add_rebalance_strategy
    - pg_dist_rebalance_strategy
  - citus_set_default_rebalance_strategy
  - citus_remote_connection_stats
  - citus_drain_node
  - isolate_tenant_to_new_shard
  - citus_create_restore_point
- 手动查询 - 只能处理返回单行,不保证事务和一致性
  - `run_command_on_workers($cmd$ show ssl $cmd$)`
  - `run_command_on_shards(table_name, $cmd$ $cmd$)`
  - `run_command_on_colocated_placements(var_a, var_b, $cmd$ $cmd$)`
  - run_command_on_coordinator
  - run_command_on_all_nodes
  - citus_is_coordinator
- pg_dist_authinfo
  - authinfo 只允许 password,sslcert,sslkey - [authinfo_valid](https://github.com/citusdata/citus/blob/57455dc64dba521514c3bd85b2aab7f3cb2eecf8/src/backend/distributed/metadata/metadata_cache.c#L5203-L5217)
  - nodeid=0 匹配所有
  - nodeid=-1 为 loopback
- pg_dist_poolinfo
  - poolinfo 只允许 dbname, hostm port

```sql
-- 分片数量
show citus.shard_count;

-- relation=table/index
-- main fork - https://www.postgresql.org/docs/current/static/storage-file-layout.html
select citus_relation_size('orgs');
-- citus_relation_size + free space map + visibility map
select citus_table_size('orgs');
-- citus_table_size + indices
select citus_total_relation_size('orgs');
```

## Cluster

- coordinator - 路由接收请求 - 单节点或多节点
- worker - 实际处理

```sql
-- coordinator
-- 设置 worker 应该怎么连接 coordinator
SELECT citus_set_coordinator_host('coord.example.com', 5432);

-- 单节点只需要设置为 localhost，不再需要 add_node
SELECT citus_set_coordinator_host('localhost', 5432);

-- 添加节点
SELECT * from citus_add_node('worker-101', 5432);
SELECT * from citus_add_node('worker-102', 5432);
-- 删除节点
SELECT * from citus_remove_node('worker-102', 5432);
-- 添加冗余节点
select * from citus_add_secondary_node('new-node', 12345, 'primary-node', 12345);
-- 添加不启用
select * from citus_add_inactive_node('new-node', 12345);
-- 激活
select * from citus_activate_node('new-node', 12345);

-- 清空节点 - 移除节点准备
SELECT * from citus_drain_node('10.0.0.1', 5432);
-- 设置节点无 分片
SELECT * FROM citus_set_node_property('localhost', 5433, 'shouldhaveshards', false);
-- 重新平衡
SELECT * FROM rebalance_table_shards(drain_only := true);

SELECT * FROM citus_get_active_worker_nodes();
-- 健康检查
SELECT * FROM citus_check_cluster_node_health();

-- 创建恢复点
select citus_create_restore_point('名字');
```

## 配置

```ini
; 基础配置
; ==========
citus.max_worker_nodes_tracked=2048
citus.cluster_name=
; always - 总是读 secondary_node
citus.use_secondary_nodes=never

citus.log_distributed_deadlock_detection=false
; -1 禁止
citus.distributed_deadlock_detection_factor=2

citus.node_connection_timeout=3000

; citus.node_conninfo
; 自己连自己时使用
; citus.local_hostname

citus.show_shards_for_app_name_prefixes=

; 查询统计
; ==========
; 单位 秒
citus.stat_statements_purge_interval=10
citus.stat_statements_max=50000
; none
citus.stat_statements_track=all

; Data Loading
; ============
; 1pc
citus.multi_shard_commit_protocol = 2pc
citus.shard_count = 32
citus.shard_max_size = 1GB

; 在节点激活时同步 reference 表
; 设置为 off 可增加 add_node 速度 - 在创建 shard 时同步
citus.replicate_reference_tables_on_activate = on

; Planner
; ============
citus.local_table_join_policy=auto
; 限制拉取行数
citus.limit_clause_row_fetch_count=-1
citus.count_distinct_error_rate=
; greedy, round-robin, first-replica
citus.task_assignment_policy=

; Intermediate Data Transfer
; ==========================
; pg >= 14 = true
citus.binary_worker_copy_format =
; 默认 1GB, 单位 KB, -1 不限制
citus.max_intermediate_result_size =

; DDL
; ==========================
citus.enable_ddl_propagation=true
; coordinator 必须通过 citus_add_node 注册自己
citus.enable_local_reference_table_foreign_keys=true

; 执行配置
; ==========================
citus.all_modifications_commutative=
; off,debug,log,notice,warning,error
citus.multi_task_query_log_level=
; local - 广播 SET LOCAL
citus.propagate_set_commands=none
; join 非分布列
citus.enable_repartition_joins=false
; INSERT INTO … SELECT
citus.enable_repartitioned_insert_select=
citus.enable_binary_protocol = true
; = max_connections
; -1 禁用
citus.max_shared_pool_size =
citus.max_adaptive_executor_pool_size = 16
; 单位 ms
citus.executor_slow_start_interval = 10
citus.max_cached_conns_per_worker = 1
citus.force_max_query_parallelization =
; Explain
; ==========================
citus.explain_all_tasks=false
; taskId
citus.explain_analyze_sort_method = execution-time
```

- https://docs.citusdata.com/en/v11.0/develop/api_guc.html

## 广播 set 信息

```sql
set local citus.propagate_set_commands = 'local';
set local app.tenant.id = 123;
```

## Docker

- [citusdata/docker](https://github.com/citusdata/docker)
- FROM postgres
  - 添加 citus 扩展
  - 添加 001-create-citus-extension.sql 到 /docker-entrypoint-initdb.d/
  - 添加 /pg_healthcheck
  - 入口同上游 [14/alpine/docker-entrypoint.sh](https://github.com/docker-library/postgres/blob/master/14/alpine/docker-entrypoint.sh)
    - 如果执行 postgres 则会启用很多预处理逻辑
- ⚠️ Alpine 版没有 wait-for-manager.sh

```sql title="001-create-citus-extension.sql"
BEGIN;
CREATE EXTENSION citus;
-- add Docker flag to node metadata
UPDATE pg_dist_node_metadata SET metadata=jsonb_insert(metadata, '{docker}', 'true');
COMMIT;
```

```sh title="wait-for-manager.sh"
#!/bin/bash
set -e

until test -f /healthcheck/manager-ready; do
  echo >&2 "Manager is not ready - sleeping"
  sleep 1
done

echo >&2 "Manager is up - starting worker"

# exec gosu postgres "/usr/local/bin/docker-entrypoint.sh" "postgres"

# AlpineLinux
su-exec postgres "/usr/local/bin/docker-entrypoint.sh" "postgres"
```

## Kuberetes

- [docteurklein/citus-test](https://github.com/docteurklein/citus-test)
  - 可以作为参考

## Citus MX

- hash-distributed tables from any node
- direct reading and writing from worker nodes
- 不支持所有命令
  - DDL commands.
  - Citus Utility Functions that change Citus metadata.
  - Queries accessing append distributed tables.
- 不支持 FDW
- seerial 列必须为 bigserial

# FAQ

## 选择分片数量

- 默认 32
- 多租户场景推荐 32 - 128
  - < 100GB 可以从 32 开始
- 实时分析场景
  - 取决于 worker 的核心数
  - 为保证完全并行，确保每个 worker 都有足够多的 shard
  - 2xCPU - 4xCPU - 添加新节点也能继续分散算力
  - 要注意: 每个查询的 每个 share 都会开启一个链接
    - 单个连接数: (max concurrent queries \* shard count)
    - 可能总数: (number of workers \* max_connections per worker)

## 多用户

- 需要在 pg_dist_authinfo 配置用户连接信息

```sql
create role test with login password 'test';
insert into pg_dist_authinfo(nodeid, rolename, authinfo)
values (0, 'test', 'password=test');
set role test;
select * from test;
```

## 多数据库

> citus 工作在默认数据库 postgres

```bash
SELECT run_command_on_workers($cmd$
 SELECT current_database() db;
$cmd$);
```

在 coordinator 上 create database 不会传播到 worker 节点

:::tip

- 每个新增的 数据库 都需要 `CREATE EXTENSION citus`
- 每个数据库还需要额外维护 节点

:::

```sql
-- 在所有 worker 节点执行
SELECT run_command_on_workers($cmd$
 create database test;
$cmd$);
```

## connection to the remote node failed with the following error: FATAL: "trust" authentication failed

## 设置运行超时时间

```sql
-- 默认 5 分钟
ALTER DATABASE citus
  SET statement_timeout TO 300000;
SELECT run_command_on_workers($cmd$
  ALTER DATABASE citus
    SET statement_timeout TO 300000;
$cmd$);


-- 单独事务修改
BEGIN;
SET LOCAL statement_timeout TO 300000;
-- ...
COMMIT;
```

## 诊断命令

```sql
-- 租户所处分片
SELECT shardid, shardstate, shardlength, nodename, nodeport, placementid
  FROM pg_dist_placement AS placement,
       pg_dist_node AS node
 WHERE placement.groupid = node.groupid
   AND node.noderole = 'primary'
   AND shardid = (
     SELECT get_shard_id_for_distribution_column('stores', 4)
   );

-- 表的分布列
SELECT column_to_column_name(logicalrelid, partkey) AS dist_col_name
FROM pg_dist_partition
WHERE logicalrelid='products'::regclass;

-- 检测 锁
SELECT * FROM citus_lock_waits;

-- 分片大小
SELECT shardid, table_name, shard_size
FROM citus_shards
WHERE table_name = 'my_table';

-- 所有分布式表的大小
SELECT table_name, table_size
FROM citus_tables;


-- 判断未使用的索引
SELECT *
FROM run_command_on_shards('my_distributed_table', $cmd$
  SELECT array_agg(a) as infos
  FROM (
    SELECT (
      schemaname || '.' || relname || '##' || indexrelname || '##'
                 || pg_size_pretty(pg_relation_size(i.indexrelid))::text
                 || '##' || idx_scan::text
    ) AS a
    FROM  pg_stat_user_indexes ui
    JOIN  pg_index i
    ON    ui.indexrelid = i.indexrelid
    WHERE NOT indisunique
    AND   idx_scan < 50
    AND   pg_relation_size(relid) > 5 * 8192
    AND   (schemaname || '.' || relname)::regclass = '%s'::regclass
    ORDER BY
      pg_relation_size(i.indexrelid) / NULLIF(idx_scan, 0) DESC nulls first,
      pg_relation_size(i.indexrelid) DESC
  ) sub
$cmd$);

-- 客户端连接数
SELECT state, count(*)
FROM pg_stat_activity
GROUP BY state;

-- 系统活跃查询
SELECT global_pid, query, state
FROM citus_stat_activity
WHERE state != 'idle';

-- 查询等待原因
SELECT wait_event || ':' || wait_event_type AS type, count(*) AS number_of_occurences
FROM pg_stat_activity
WHERE state != 'idle'
GROUP BY wait_event, wait_event_type
ORDER BY number_of_occurences DESC;

-- 索引命中率
-- on coordinator
SELECT 100 * (sum(idx_blks_hit) - sum(idx_blks_read)) / sum(idx_blks_hit) AS index_hit_rate
  FROM pg_statio_user_indexes;

-- on workers
SELECT nodename, result as index_hit_rate
FROM run_command_on_workers($cmd$
  SELECT 100 * (sum(idx_blks_hit) - sum(idx_blks_read)) / sum(idx_blks_hit) AS index_hit_rate
    FROM pg_statio_user_indexes;
$cmd$);


-- 缓存命中率
-- on coordinator
SELECT
  sum(heap_blks_read) AS heap_read,
  sum(heap_blks_hit)  AS heap_hit,
  100 * sum(heap_blks_hit) / (sum(heap_blks_hit) + sum(heap_blks_read)) AS cache_hit_rate
FROM
  pg_statio_user_tables;

-- on workers
SELECT nodename, result as cache_hit_rate
FROM run_command_on_workers($cmd$
  SELECT
    100 * sum(heap_blks_hit) / (sum(heap_blks_hit) + sum(heap_blks_read)) AS cache_hit_rate
  FROM
    pg_statio_user_tables;
$cmd$);
```
