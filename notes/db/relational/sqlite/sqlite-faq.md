---
title: SQLite FAQ
tags:
  - FAQ
---

# SQLite FAQ

:::caution

- 不支持添加非常量默认值的列
  - Cannot add a column with non-constant default
  - 不可以 `alter table tab add column my_time timestamp default current_timestamp;`
- timestamp
  - current_timestamp 返回的是 text
  - `strftime('%s', current_timestamp)` 返回的是 integer
  - 可以使用 real 存储高精度 - 包含 ms/μs/ns

:::

```sql
pragma journal_mode;                -- 查看/设置日志模式（如 WAL, DELETE 等）
pragma synchronous;                 -- 事务同步级别，影响性能和稳定性（FULL/NORMAL/OFF）
pragma cache_size;                  -- 设置页缓存大小（单位页数，负值代表 KB）
pragma temp_store;                  -- 临时表/索引的存储方式（DEFAULT, MEMORY, FILE）
pragma foreign_keys;                -- 是否启用外键支持 (ON/OFF)
pragma mmap_size;                   -- 映射文件大小，提升查询性能
pragma busy_timeout = 5000;         -- 设置数据库被锁时时的等待时间（毫秒）
pragma optimize;                    -- 自动执行分析和优化命令
pragma page_size;                   -- 单页大小（默认 4096），一般无需修改
pragma wal_autocheckpoint = 1000;   -- WAL 日志自动 checkpoint 频率（单位页）
pragma auto_vacuum;                 -- 垃圾回收模式，节省磁盘空间

pragma journal_mode = WAL;
pragma synchronous = NORMAL;

-- 查看 PRAGMA 当前状态
pragma pragma_list;
```

```sql
select hex(randomblob(16));
select lower(hex(randomblob(16)));
-- 伪 UUIv4
select lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(2))) || '-4' || substr(lower(hex(randomblob(2))),2) || '-' || substr('89ab',abs(random()) % 4 + 1, 1) || substr(lower(hex(randomblob(2))),2) || '-' || lower(hex(randomblob(6)));
-- 伪 UUIv7
SELECT
  -- timestamp
  format('%08x', ((strftime('%s') * 1000) >> 16)) || '-' ||
  format('%04x', ((strftime('%s') * 1000) + ((strftime('%f') * 1000) % 1000)) & 0xffff) || '-' ||
  -- version
  format('%04x', 0x7000 + abs(random()) % 0x0fff) || '-' ||
  -- variant
  format('%04x', 0x8000 + abs(random()) % 0x3fff) || '-' ||
  -- randomness
  format('%012x', abs(random()) >> 16) AS uuid7;
```

```sql
create table if not exists message_log
(
  id            text        not null default (lower(hex(randomblob(16)))) primary key,
  uid           uuid        not null default (lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(2))) || '-4' || substr(lower(hex(randomblob(2))),2) || '-' || substr('89ab',abs(random()) % 4 + 1, 1) || substr(lower(hex(randomblob(2))),2) || '-' || lower(hex(randomblob(6)))),
  created_at    timestamptz not null default current_timestamp,
  updated_at    timestamptz not null default current_timestamp,
  deleted_at    timestamptz,
  tid           text        not null default 'org_00000000000000000000000000',
  eid           text,

  user_id       text,
  session_id    text,
  connection_id text,
  message_seq   bigint,
  url           text,
  port          integer,
  seq           bigint,
  type          bigint,
  name          text,
  direction     text,
  data          json,
  data_hash     text,
  remaining     int,
  key           text unique,
  size          integer,
  flags         json,
  metadata      json,
  payload       bytea,

  attributes    jsonb       not null default '{}',
  properties    jsonb       not null default '{}',
  extensions    jsonb       not null default '{}',
  unique (tid, eid)
);
```

## attempt to write a readonly database

可能是权限不足

## 删除不支持 WHERE 和 ORDER

- 需要从源码编译 [SQLITE_ENABLE_UPDATE_DELETE_LIMIT](https://www.sqlite.org/compile.html#enable_update_delete_limit)

## Golang database is locked (5) (SQLITE_BUSY)

```go
db.SetMaxOpenConns(1)
```

- 如果需要不同表并行操作，考虑使用多个 sqlite 文件
- https://github.com/mattn/go-sqlite3/issues/274#issuecomment-191597862

## sqlite 修复

```bash
echo ".dump" | sqlite old.db | sqlite new.db
```

## 35% faster than fs

- read
  - avg 10KB
- write
  - wal
  - synchronous=NORMAL
- https://www.sqlite.org/fasterthanfs.html

## BLOB or Hex TEXT

- BLOB - 存储更少内容
  - 使用调试不方便
- Hex TEXT - 存储更多内容
  - 更多 IO，更慢
  - 使用调试友好

## cannot drop UNIQUE column

SQLite 不支持 drop unique 列，只有尝试 rename 表，建立新表解决。

## count slow

```sql
-- 如果没进行过删除，那 max(rowid)=count
select max(rowid) from tab;
-- 避免 count(*) - expain 会发现执行逻辑不同
select count(rowid) from tab;
```
