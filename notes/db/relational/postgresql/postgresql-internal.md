---
title: PostgreSQL Internals & Planner
---

# PostgreSQL Internals & Planner

## Query Planner

### Statistics

- [CREATE STATISTICS](https://www.postgresql.org/docs/current/sql-createstatistics.html)
- [Planner Statistics](https://www.postgresql.org/docs/current/planner-stats.html)

### Join Methods

- **Nested Loop**: Fast for small data sets or when using indexes on the inner table.
- **Hash Join**: Most common for larger sets. Hash table built in memory.
- **Merge Join**: Efficient for large, pre-sorted data sets.

### Scan Methods

- **Seq Scan**: Sequential table scan.
- **Index Scan**: Lookup via B-Tree/Hash etc.
- **Bitmap Scan**: Combine index results (BitmapAnd/Or) before visiting heap.

## Resources

- [Explaining the Postgres Query Optimizer - Bruce Momjian (Video)](https://youtu.be/svqQzYFBPIo)
- [Bruce Momjian Presentations](https://momjian.us/main/presentations/)
- [Tuning Autovacuum](https://www.percona.com/blog/2018/08/10/tuning-autovacuum-in-postgresql-and-autovacuum-internals/)
