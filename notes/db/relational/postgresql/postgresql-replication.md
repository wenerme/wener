---
title: PostgreSQL Replicate
---

# PostgreSQL Replication

- [PostgreSQL Replication and Automatic Failover Tutorial](https://www.enterprisedb.com/postgres-tutorials/postgresql-replication-and-automatic-failover-tutorial)

## Logical Replication

- 逻辑复制 - v10+
- SQL 语句维度
- PUBLICATION/SUBSCRIPTION
- 简单易用、内置
- 参考
  - [Logical Decoding](https://www.postgresql.org/docs/current/logicaldecoding.html)
    - 实现的内部逻辑
    - 可自行对接协议，然后实现修改 SQL 的能力

:::caution 限制

- 不能复制 DDL - schema 修改
- sequences 不会被复制
- 要求唯一主键 - 复制主键 - 没有则使用整行对比（不建议） - REPLICA IDENTITY
- 不能修改复制内容路径
  - Schema 名字、列名 必须一致
  - 分片表名字必须一致
- 不支持 Large Object

:::

```bash
ALTER SUBSCRIPTION mysub DISABLE;
ALTER SUBSCRIPTION mysub ENABLE;
```

## Streaming Replication

- 物理复制 / WAL 复制，复制的是 PostgreSQL 集群的物理变更
- Standby 默认只读
  - `pg_is_in_recovery() = true`
  - 普通 DML/DDL 会报错，避免误写
  - `SELECT`/只读分析可用
- 会同步 DDL
  - `CREATE/ALTER/DROP TABLE/INDEX/SCHEMA/EXTENSION`
  - 表结构、索引、权限、sequence、catalog 变更都会通过 WAL 同步
  - 注意 Standby 的镜像/系统也要有对应 extension 文件和 `.so`
- 适合
  - 整库/整实例副本
  - 异机保留一份数据
  - 只读查询副本
- 不适合
  - 只复制部分表/部分 schema
  - 主从不同大版本
  - standby 上直接写入
- 参考
  - https://www.postgresql.org/docs/current/warm-standby.html#STREAMING-REPLICATION
  - https://www.postgresql.org/docs/current/app-pgbasebackup.html

### 初始化 Physical Standby

主库需要允许 replication 连接：

```sql
CREATE ROLE replica_user WITH REPLICATION LOGIN PASSWORD '...';
-- pg_hba.conf 精确放行 standby IP
-- host replication replica_user 10.0.0.2/32 scram-sha-256
```

Standby 初始化常用 `pg_basebackup`：

```bash
PGPASSWORD=... pg_basebackup \
  --host PRIMARY_IP \
  --port 5432 \
  --username replica_user \
  --pgdata "$PGDATA" \
  --write-recovery-conf \
  --wal-method=stream \
  --checkpoint=fast \
  --progress
```

生成/确认 standby 配置：

```conf
primary_conninfo = 'host=PRIMARY_IP port=5432 user=replica_user passfile=/var/lib/postgresql/.pgpass application_name=standby-1 sslmode=disable'
primary_slot_name = 'standby_1'
```

```bash
touch "$PGDATA/standby.signal"
```

:::tip `--wal-method=stream`

初始同步慢时优先使用 `--wal-method=stream`，避免 `--wal-method=fetch` 在备份结束前需要的 WAL 已被主库回收，出现：

```text
requested WAL segment ... has already been removed
```

:::

### Replication Slot 与 WAL 保留

- physical slot 会防止主库删除 standby 尚未消费的 WAL
- standby 掉线或初始同步太慢时，`pg_wal` 可能快速增长
- 临时 basebackup slot 通常叫 `pg_basebackup_<pid>`
- 持久 slot 适合 standby 长期复制，例如 `standby_1`
- 不要提前创建长期 inactive slot，否则可能无限保留 WAL
- standby 真正启动后再创建/确认持久 slot 更安全

常用检查：

```sql
-- standby
SELECT pg_is_in_recovery();
SELECT status, slot_name, sender_host, latest_end_lsn, latest_end_time
FROM pg_stat_wal_receiver;
SELECT pg_last_wal_receive_lsn(), pg_last_wal_replay_lsn();

-- primary
SELECT application_name, client_addr, state, sent_lsn, write_lsn, flush_lsn, replay_lsn
FROM pg_stat_replication;

SELECT slot_name, active, restart_lsn, wal_status
FROM pg_replication_slots;

SELECT pg_size_pretty(sum(size)) AS pg_wal_size
FROM pg_ls_waldir();
```

### 减少 WAL 压力

- 暂停高写入任务再做初始 basebackup
- 开启 WAL 压缩

```sql
ALTER SYSTEM SET wal_compression = 'on';
SELECT pg_reload_conf();
```

- 避免无变化 upsert 也触发 update

```sql
ON CONFLICT (...) DO UPDATE
SET value = EXCLUDED.value
WHERE target.value IS DISTINCT FROM EXCLUDED.value;
```

- 大 DDL / 大批量 update 会产生大量 WAL，可能导致 standby lag 和主库 `pg_wal` 增长
- `UNLOGGED` 表不通过 WAL 复制，不适合需要 standby 保留的数据

## SQL Cheatsheet

### 角色判断

```sql
-- true = standby / replica, false = primary
SELECT pg_is_in_recovery();

-- standby 当前恢复到哪里
SELECT pg_last_wal_receive_lsn(), pg_last_wal_replay_lsn();

-- primary 当前 WAL 位置
SELECT pg_current_wal_lsn();
```

### Primary: 复制连接

```sql
SELECT
  pid,
  usename,
  application_name,
  client_addr,
  state,
  sync_state,
  sent_lsn,
  write_lsn,
  flush_lsn,
  replay_lsn,
  pg_size_pretty(pg_wal_lsn_diff(pg_current_wal_lsn(), replay_lsn)) AS replay_lag_bytes,
  write_lag,
  flush_lag,
  replay_lag
FROM pg_stat_replication
ORDER BY application_name, client_addr;
```

常见 `state`：

| state | 说明 |
| --- | --- |
| `backup` | `pg_basebackup` 正在复制 base backup |
| `catchup` | standby 正在追 WAL |
| `streaming` | 正常流复制 |

### Standby: WAL Receiver

```sql
SELECT
  status,
  slot_name,
  sender_host,
  sender_port,
  latest_end_lsn,
  latest_end_time
FROM pg_stat_wal_receiver;
```

```sql
SELECT
  pg_last_wal_receive_lsn(),
  pg_last_wal_replay_lsn(),
  pg_wal_lsn_diff(pg_last_wal_receive_lsn(), pg_last_wal_replay_lsn()) AS receive_replay_lag_bytes,
  now() - pg_last_xact_replay_timestamp() AS replay_time_lag;
```

:::note

`replay_time_lag` 在主库长时间没有新事务时会变大，不一定表示 WAL 落后；优先看 LSN 是否一致。

:::

### Replication Slot

```sql
SELECT
  slot_name,
  slot_type,
  temporary,
  active,
  active_pid,
  restart_lsn,
  confirmed_flush_lsn,
  wal_status,
  safe_wal_size,
  CASE
    WHEN restart_lsn IS NULL THEN NULL
    ELSE pg_size_pretty(pg_wal_lsn_diff(pg_current_wal_lsn(), restart_lsn))
  END AS retained
FROM pg_replication_slots
ORDER BY slot_name;
```

创建 physical slot：

```sql
SELECT pg_create_physical_replication_slot('standby_1');
```

删除 slot：

```sql
-- 必须确认 standby 不再使用该 slot，否则会中断复制
SELECT pg_drop_replication_slot('standby_1');
```

### WAL 大小与生成情况

```sql
SELECT pg_size_pretty(sum(size)) AS pg_wal_size, count(*) AS wal_files
FROM pg_ls_waldir();
```

```sql
SELECT
  wal_records,
  wal_fpi,
  pg_size_pretty(wal_bytes) AS wal_bytes,
  wal_buffers_full,
  stats_reset
FROM pg_stat_wal;
```

手动 checkpoint：

```sql
CHECKPOINT;
```

:::caution

`CHECKPOINT` 可能带来 IO 峰值。只有在确认 slot 不再保留旧 WAL、希望尽快回收 `pg_wal` 时再手动执行。

:::

### 数据库与表大小

```sql
SELECT datname, pg_size_pretty(pg_database_size(datname)) AS size
FROM pg_database
WHERE datallowconn
ORDER BY pg_database_size(datname) DESC;
```

```sql
SELECT
  schemaname,
  relname,
  pg_size_pretty(pg_total_relation_size(format('%I.%I', schemaname, relname)::regclass)) AS total,
  pg_size_pretty(pg_relation_size(format('%I.%I', schemaname, relname)::regclass)) AS heap,
  pg_size_pretty(pg_indexes_size(format('%I.%I', schemaname, relname)::regclass)) AS indexes,
  n_live_tup,
  n_dead_tup,
  n_tup_ins,
  n_tup_upd,
  n_tup_del
FROM pg_stat_user_tables
ORDER BY pg_total_relation_size(format('%I.%I', schemaname, relname)::regclass) DESC
LIMIT 20;
```

### Promote Standby

SQL 方式：

```sql
-- 在 standby 上执行
SELECT pg_promote(wait => true, wait_seconds => 60);
```

CLI 方式：

```bash
pg_ctl promote -D "$PGDATA" -w
```

Promote 后检查：

```sql
SELECT pg_is_in_recovery(); -- false 表示已成为 primary
SELECT pg_current_wal_lsn();
```

:::caution Promote 是故障切换操作

- Promote 后 standby 会脱离原主库，变成可写 primary
- 原 primary 如果还活着，不能继续同时写，否则 split-brain
- 需要重新规划其它 standby 的 `primary_conninfo` / slot
- 应用连接、DNS、代理、VIP 需要切到新 primary
- 原 primary 恢复后通常需要重新作为 standby 加入，不能直接继续当主库

:::

### 暂停与恢复 WAL Replay

```sql
-- 在 standby 上暂停 replay，适合临时保留某个时间点做排查
SELECT pg_wal_replay_pause();

SELECT pg_get_wal_replay_pause_state();

SELECT pg_wal_replay_resume();
```

:::caution

暂停 replay 会让 standby 落后，并可能让 primary 的 slot 保留更多 WAL。

:::

### 只读连接建议

```sql
-- 确认当前连接是否只读
SHOW transaction_read_only;

-- 防止误连 primary 做写入
SET default_transaction_read_only = on;
```

连接参数可用 `target_session_attrs=read-only` 优先选择只读节点。

## FAQ

### Physical Streaming Replication vs Logical Replication

| 对比 | Physical Streaming Replication | Logical Replication |
| --- | --- | --- |
| 复制粒度 | 整个 PG cluster / database files 的 WAL 物理变化 | 表级别的逻辑变更 |
| Standby 是否可写 | 不可写，standby 强制只读 | Subscriber 通常是普通可写库，但被复制表会被 apply worker 写入 |
| DDL | 会同步 DDL/catalog 变更 | 不同步 DDL，需要手动保持 schema 一致 |
| Sequence | 会同步 | 不会自动同步 sequence 当前值 |
| 部分表复制 | 不适合 | 适合，publication 可选表 |
| 主从版本 | 通常要求主从 PostgreSQL 主版本一致 | 可跨版本，适合升级/迁移 |
| 查询副本 | 支持 hot standby 只读查询 | Subscriber 可查询，也可有额外本地表 |
| 冲突处理 | 物理复制通常无行级冲突，standby 只读 | 可能有主键/唯一约束冲突、apply 冲突 |
| WAL/Slot 风险 | slot 会保留 WAL，standby 慢会撑大 `pg_wal` | logical slot 也会保留 WAL，subscriber 慢同样会撑大 `pg_wal` |
| 典型用途 | HA standby、异机整库备份、只读副本 | 部分表同步、跨版本迁移、数据分发/ETL |

### 什么时候选 Physical Streaming Replication？

- 想要完整副本，包含 DDL、索引、权限、sequence、extension catalog
- 希望副本只读，避免误写
- 主从 PostgreSQL 主版本一致
- 用作灾备、异机保留、只读查询副本
- 不需要筛选表或改写 schema

### 什么时候选 Logical Replication？

- 只想复制部分表
- 想跨大版本迁移或做在线升级
- 想把数据同步到另一个可写库
- 想在 subscriber 上保留额外本地表/索引/逻辑
- 可以接受手动维护 DDL/schema 和 sequence 同步

### Physical Standby 会不会被误写？

默认不会。只要 standby 仍在 recovery：

```sql
SELECT pg_is_in_recovery(); -- true
```

PG 会拒绝写入和 DDL，例如 `INSERT`、`UPDATE`、`CREATE TABLE`、`CREATE INDEX`。只有显式 promote 后 standby 才会脱离复制并变成可写主库。

### Physical Replication 会同步 DDL 吗？

会。Physical replication 复制 WAL 中的物理变化，所以常规 DDL 会同步，例如：

- `CREATE/ALTER/DROP TABLE`
- `CREATE/ALTER/DROP INDEX`
- `CREATE/ALTER/DROP SCHEMA`
- `CREATE EXTENSION`

但 standby 所在环境也要有相同 extension 二进制文件，否则恢复/使用 extension 时可能出问题。

### 为什么数据库不大但 `pg_wal` 很大？

`pg_wal` 是变更日志，不是数据文件大小。大量 update/upsert、索引维护、full-page writes、长时间 basebackup 或 replication slot 落后，都会让 WAL 生成或保留很多。

检查：

```sql
SELECT slot_name, active, restart_lsn, wal_status
FROM pg_replication_slots;

SELECT pg_size_pretty(sum(size)) AS pg_wal_size
FROM pg_ls_waldir();
```

处理思路：暂停高写入任务、确认 standby/slot 是否追上、启用 `wal_compression`、避免无变化 update。

## Backup

- https://www.postgresql.org/docs/current/backup.html
