---
title: SQLite FAQ
tags:
  - FAQ
---

# SQLite FAQ

```sql
select hex(randomblob(16));
select lower(hex(randomblob(16)));
-- 伪 UUIv4
select lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(2))) || '-4' || substr(lower(hex(randomblob(2))),2) || '-' || substr('89ab',abs(random()) % 4 + 1, 1) || substr(lower(hex(randomblob(2))),2) || '-' || lower(hex(randomblob(6)));
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
