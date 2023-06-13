---
title: PostgreSQL Vacuum
---

# Vacuum

- 释放空间
- 维护统计信息
- 重新组织表
- 提速
  - 增加 maintenance_work_mem
  - parallel
  - analyze 慢但做额外统计
  - 考虑 pg_repack
  - 有大量删除考虑 vacuum full
- pg_stat_progress_analyze
- https://www.postgresql.org/docs/current/sql-vacuum.html

```sql
select * from pg_stat_progress_vacuum;
```

- phase
  - initializing
  - scanning heap - heap_blks_scanned
  - vacuuming indexes
  - vacuuming heap - heap_blks_vacuumed
  - cleaning up indexes
  - truncating heap
  - performing final cleanup

## When to vacuum

- 进行了大量的表修改
- 感觉查询有性能问题

