---
title: Citus
---

# Citus

- [citusdata/citus](https://github.com/citusdata/citus)
  - AGPL-3.0
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

```bash
# macOS 上使用
brew install citus

echo "shared_preload_libraries = 'citus'" >> postgresql.conf
```

```sql
SELECT * FROM master_get_active_worker_nodes();
```

## Citus MX

- hash-distributed tables from any node
- direct reading and writing from worker nodes
- 不支持所有命令
  - DDL commands.
  - Citus Utility Functions that change Citus metadata.
  - Queries accessing append distributed tables.
- 不支持 FDW
- seerial 列必须为 bigserial
