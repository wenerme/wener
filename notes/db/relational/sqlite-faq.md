---
title: SQLite FAQ
tags:
  - FAQ
---

# SQLite FAQ

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
