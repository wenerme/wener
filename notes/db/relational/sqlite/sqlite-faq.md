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
  - `datetime('now')` 返回  `YYYY-MM-DD HH:mm:ss`

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

## DSN

**modernc.org/sqlite**

| param                  | value                                    | desc                                                                                                                                                                                                       |
| ---------------------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `vfs`                  | VFS 模块名称                             | 指定要使用的 Virtual File System (VFS) 模块名称。如果未指定，使用默认 VFS。如果指定多个 `vfs` 参数且值不同，会返回错误。                                                                                   |
| `_mode`                | `ro` 或 `readonly`                       | 以只读模式打开数据库 (SQLITE_OPEN_READONLY)                                                                                                                                                                |
| `_mode`                | `rw` 或 `readwrite`                      | 以读写模式打开数据库 (SQLITE_OPEN_READWRITE)                                                                                                                                                               |
| `_mode`                | `rwc`                                    | 以读写模式打开数据库，如果不存在则创建 (SQLITE_OPEN_READWRITE \| SQLITE_OPEN_CREATE)                                                                                                                       |
| `_mode`                | `memory`                                 | 打开内存数据库 (SQLITE_OPEN_MEMORY \| SQLITE_OPEN_READWRITE \| SQLITE_OPEN_CREATE)                                                                                                                         |
| `_mode`                | `shared`                                 | 启用共享缓存模式 (SQLITE_OPEN_SHAREDCACHE)，可与基础模式组合使用，如 `rwc+shared`                                                                                                                          |
| `_mode`                | `private`                                | 启用私有缓存模式 (SQLITE_OPEN_PRIVATECACHE)，可与基础模式组合使用，如 `memory+private`                                                                                                                     |
| `_mode`                | `nomutex`                                | 禁用互斥锁 (SQLITE_OPEN_NOMUTEX)，可与基础模式组合使用                                                                                                                                                     |
| `_mode`                | `fullmutex`                              | 启用完整互斥锁模式 (SQLITE_OPEN_FULLMUTEX)，可与基础模式组合使用                                                                                                                                           |
| `_mode`                | `wal`                                    | 启用 WAL 模式 (SQLITE_OPEN_WAL)，可与基础模式组合使用                                                                                                                                                      |
| `_pragma`              | PRAGMA 语句                              | 执行 PRAGMA 语句来配置数据库行为。可以指定多次，每个值都会作为 `PRAGMA ...` 语句执行。多个 `_pragma` 参数会被排序执行，`busy_timeout` 相关的 PRAGMA 会优先执行，其他 PRAGMA 按字典序执行（不区分大小写）。 |
| `_time_format`         | `sqlite`                                 | 使用 SQLite 格式（格式 7）写入时间值，包含时区信息。格式：`2006-01-02 15:04:05.999999999-07:00`。如果未指定，使用 Go 的 `time.Time.String()` 格式。                                                        |
| `_time_integer_format` | `unix`                                   | 将时间值存储为 Unix 时间戳（秒）。如果设置了此参数，时间将存储为整数而不是字符串。如果同时设置了 `_time_format` 和 `_time_integer_format`，优先使用整数格式。                                              |
| `_time_integer_format` | `unix_milli`                             | 将时间值存储为 Unix 时间戳（毫秒）                                                                                                                                                                         |
| `_time_integer_format` | `unix_micro`                             | 将时间值存储为 Unix 时间戳（微秒）                                                                                                                                                                         |
| `_time_integer_format` | `unix_nano`                              | 将时间值存储为 Unix 时间戳（纳秒）                                                                                                                                                                         |
| `_inttotime`           | `1`, `t`, `T`, `TRUE`, `true`, `True`    | 启用将整数列（DATE, DATETIME, TIMESTAMP）从整数转换为时间的功能。当启用时，如果字段包含整数（int64），会自动转换为 `time.Time`。用于兼容性场景，将整数时间戳读取为时间类型。                               |
| `_inttotime`           | `0`, `f`, `F`, `FALSE`, `false`, `False` | 禁用整数转时间功能                                                                                                                                                                                         |
| `_txlock`              | `deferred`                               | 延迟锁定（默认值）。值不区分大小写。参考：https://www.sqlite.org/lang_transaction.html#deferred_immediate_and_exclusive_transactions                                                                       |
| `_txlock`              | `immediate`                              | 立即锁定。值不区分大小写。                                                                                                                                                                                 |
| `_txlock`              | `exclusive`                              | 独占锁定。值不区分大小写。                                                                                                                                                                                 |

- https://www.sqlite.org/pragma.html
- https://www.sqlite.org/lang_datefunc.html#time_values

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
