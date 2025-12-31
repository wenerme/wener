---
title: PostgreSQL High Performance Insert
---

# PostgreSQL High Performance Insert

Strategies to maximize insertion performance:

1.  **Use `COPY`**: `COPY FROM STDIN` is significantly faster than `INSERT`.
2.  **Unlogged Tables**: `CREATE UNLOGGED TABLE` avoids WAL writes (data lost on crash, useful for staging).
3.  **Disable Autovacuum**: TEMPORARILY set `WITH (autovacuum_enabled=false)` for bulk loads.
4.  **Minimal Indexes**: Drop indexes before bulk load, recreate after. Keep only essential ones (e.g., PK if needed, though dropping PK validates consistency later).
5.  **Synchronous Commit**: `SET synchronous_commit = off` (risk of data loss on recent commits, but faster).
6.  **Partitioning**: Use inheritance/partitioning for easy bulk deletion (`DROP TABLE`).

## References

- [Performance Benchmarks (Gist)](https://gist.github.com/valyala/ae3cbfa4104f1a022a2af9b8656b1131)
- [Mailing List Discussion](https://www.postgresql.org/message-id/CAKhTGFX-ChBSjqENrAv8uqUR_H5PTvf14jG0cOAq6c-ami_7sQ%40mail.gmail.com)
