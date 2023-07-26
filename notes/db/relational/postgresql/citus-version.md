---
tags:
  - Version
---

# Citus Version

| version                 | date       |
| ----------------------- | ---------- |
| [Citus v11](#citus-v11) | 2022-06-15 |
| [Citus v10](#citus-v10) | 2021-02-16 |

- https://www.citusdata.com/updates/

## Citus v12

- schema-based sharding
  - schema=shard
  - https://www.citusdata.com/blog/2023/07/18/citus-12-schema-based-sharding-for-postgres/

```sql
set citus.enable_schema_based_sharding to on;
```

## Citus v11

- 开源所有企业版功能
  - Citus v10 开源了分片平衡
  - Citus v11 开源了所有剩下的企业版功能
- 使用逻辑复制的 Rebalance - 不阻塞写
- 更完善的元数据同步 - 多用户、RLS - 集群角色、授权
  - 因此可以直接连任意节点，不再需要连 coordinator
    - 默认隐藏分片表 - 避免看起来很乱
      - 可针对关闭 `SET citus.show_shards_for_app_name_prefixes TO 'psql';`
      - 全部关闭 `SET citus.override_table_visibility TO off;`
- 租户隔离
  - 针对租户的 citus_stat_statements
- 细粒度控制节点间授权
  - pg_dist_authinfo
  - citus.node_conninfo 支持 sslkey,sslcert
- 内部链接走内部链接池路由
  - pg_dist_poolinfo
- COPY 避免校验 JSON/JSONB - 提高数据加载性能 - 之前会导致两次校验
  - 可关闭 `SET citus.skip_jsonb_validation_in_copy TO off;`
- 集群信息
  - citus_check_cluster_node_health()
  - citus_backend_gpid() - gpid -> global_pid - 全局识别每个会话
  - citus_stat_activity
  - citus_dist_stat_activity
  - citus_lock_waits
  - pg_cancel_backend() 和 pg_terminate_backend() 支持 gpid
- 新增 helper
  - run_command_on_coordinator
  - run_command_on_all_nodes
  - citus_is_coordinator
- Preview
  - Triggers on distributed tables
    - `SET citus.enable_unsafe_triggers TO on;`

```sql
-- 升级
ALTER EXTENSION citus
UPDATE
;

CALL citus_finish_citus_upgrade();

-- 多用户
-- =======
-- ALTER|CREATE|DROP ROLE 会 同步/广播 到其他节点
-- GRANT/REVOKE 也会 同步 到其他节点
-- 配置 citus.enable_alter_database_owner 同步修改 db owner - ALTER DATABASE … OWNER TO
CREATE ROLE create_role_test CREATEDB CREATEROLE LOGIN REPLICATION CONNECTION
LIMIT
  105 PASSWORD 'type_your_passwd' VALID UNTIL '2045-05-05 00:00:00.00+00';

-- 因为用户和权限都同步了，所以 RLS 也能生效
CREATE POLICY user_mod ON events FOR
SELECT
  TO rls_tenant_1 USING (current_user = 'rls_tenant_' | | tenant_id:: text);

-- 重新平衡
-- =======
SELECT
  rebalance_table_shards();

-- 单个表
SELECT
  rebalance_table_shards('users');

-- 没有 pk 或 replica identity,
-- 适用于没有更新和删除的表 - 迁移完成后恢复
SELECT
  rebalance_table_shards(
    'test_table',
    shard_transfer_mode = > 'force_logical'
  );

-- 租户隔离
-- =======
SELECT
  isolate_tenant_to_new_shard('table_name', tenant_id);

SELECT
  isolate_tenant_to_new_shard('orders', 135);

-- CASCADE 同时限定 co-located 表
SELECT
  isolate_tenant_to_new_shard('orders', 135, 'CASCADE');

-- 集群信息
-- =======
select
  key,
  citus_backend_gpid()
FROM
  distributed_table;

SELECT
  global_pid,
  query,
  state
FROM
  citus_stat_activity
WHERE
  query ilike 'INSER%'
  and global_pid != citus_backend_gpid();

-- 类似 citus_stat_activity，但不包含内部后端
SELECT
  global_pid,
  query,
  state
FROM
  citus_dist_stat_activity
WHERE
  query ilike 'INSER%'
  and global_pid != citus_backend_gpid();

SELECT
  *
FROM
  citus_lock_waits;
```

- ⚠️ 废弃
  - Shard placement invalidation
  - Append-distributed tables - 推荐使用 hash-distributed tables
  - 分布式 cstore_fdw 表 - v10 内置列存储
- 参考
  - https://www.citusdata.com/updates/v11-0/

## Citus v10

- Shard rebalance - 会阻塞读
- 内置列存储 - columner
