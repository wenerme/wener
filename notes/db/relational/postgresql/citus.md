---
title: Citus
---

# Citus

- [citusdata/citus](https://github.com/citusdata/citus)
  - AGPL-3.0
  - 被 微软 收购
  - 目前 PG 唯一的水平扩容方案
- 跨节点不支持
  - Window Functions
  - CTEs
  - Set operations
  - Transactional semantics for queries that span across multiple shards
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

:::caution

- 数据副本问题需要自己处理
- [#906](https://github.com/citusdata/citus/issues/906) 不支持 trigger
- [#3854](https://github.com/citusdata/citus/issues/3854) 不支持 ARM
- ~~开原版 rebalancer 会阻塞，商业版使用 逻辑服复制，不会锁~~
- 不支持 - Co-Location 支持的更多
  - ALTER SEQUENCE
  - Correlated subqueries
  - Recursive CTEs
  - Table sample
  - SELECT … FOR UPDATE
  - Grouping sets

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
-- 取消
SELECT undistribute_table('table_name');
```

## Tenant Demo

```sql
create table orgs
(
    id         bigserial primary key,
    name       text        not null,
    created_at timestamptz not null,
    updated_at timestamptz not null
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
from generate_series(1, 10) num;

insert into users(org_id, name)
select coalesce(nullif(num % 10, 0), 10), 'user-' || num
from generate_series(1, 100) num;

insert into notes(org_id, user_id, title, content)
select coalesce(nullif(num % 10, 0), 10), coalesce(nullif(num % 100, 0), 100), 'note-' || num, 'content-' || num
from generate_series(1, 1000) num;


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

| table/view         | for              |
| ------------------ | ---------------- |
| pg_dist_shard      | 记录表分片       |
| pg_dist_placement  | 记录分片所处节点 |
| pg_dist_node       | 记录节点         |
| pg_dist_colocation |
| pg_dist_partition  |

- 分片数量 - 推荐 32 - 128
  - < 100GB 推荐 32 即可

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

; 单位 秒
citus.stat_statements_purge_interval=10
citus.stat_statements_max=50000
; none
citus.stat_statements_track=all

citus.enable_ddl_propagation=true
; coordinator 必须通过 citus_add_node 注册自己
citus.enable_local_reference_table_foreign_keys=true
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
