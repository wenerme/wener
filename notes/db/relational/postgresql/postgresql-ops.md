---
title: PostgreSQL 运维
---

# PostgreSQL 运维

- [VACUUM](https://www.postgresql.org/docs/current/sql-vacuum.html)
- [ANALYZE](https://www.postgresql.org/docs/current/sql-analyze.html)

## vacuum

- 垃圾收集和分析
- VACUUM
  - 默认 并行
  - 不会锁表
  - 但空间不会马上返还到系统

```
-- 推荐语法 - 9.0+
VACUUM [ ( option [, ...] ) ] [ table_and_columns [, ...] ]
VACUUM [ FULL ] [ FREEZE ] [ VERBOSE ] [ ANALYZE ] [ table_and_columns [, ...] ]
```

- FULL
  - 重写表内容、重构索引
  - 锁表
  - 通常用于会回收非常多数据的情况
  - 隐含 REINDEX, FREEZE
- FREEZE
  - vacuum_freeze_min_age, vacuum_freeze_table_age = 0
- VERBOSE - 表详细信息
- ANALYZE - 同时执行 ANALYZE
- DISABLE_PAGE_SKIPPING
- SKIP_LOCKED
- INDEX_CLEANUP
  - 移除指向无效记录的索引
  - 默认开启 - vacuum_index_cleanup
  - 如果想快速 VACUUM 可关闭
- TRUNCATE
  - 默认开启 - vacuum_truncate
- PARALLEL

```sql
-- 常用
VACUUM (VERBOSE, ANALYZE) my_tab
```
