---
title: PostgreSQL Tuning
---

# PostgreSQL Tuning

## Tools & Resources

- [Explain Analysis Visualization (PEV)](https://tatiyants.com/pev)
- [Explain Depesz](https://explain.depesz.com/)
- [PGTune](https://pgtune.leopard.in.ua/)
- [PostgreSQL High Performance Cookbook](https://github.com/PacktPublishing/PostgreSQL-High-Performance-Cookbook)
- [Debugging Performance the Hard Way](https://www.justwatch.com/blog/post/debugging-postgresql-performance-the-hard-way/)

## IO Benchmarking (fio)

```bash
# Sequential mixed read/write (50/50)
fio --ioengine=libaio --direct=1 --name=test_seq --filename=test_file --bs=8k --iodepth=32 --size=1G --readwrite=rw --rwmixread=50

# Random mixed read/write (50/50)
fio --ioengine=libaio --direct=1 --name=test_rand --filename=test_file --bs=8k --iodepth=32 --size=1G --readwrite=randrw --rwmixread=50
```

## Optimization Techniques

### UNLOGGED Tables

- **Effect**: No WAL logging, data lost on crash/unclean shutdown. Not replicated.
- **Use Case**: Bulk loading, temporary data, reproducible data.
- **Command**: `CREATE UNLOGGED TABLE ...` or `ALTER TABLE ... SET UNLOGGED` (locks table).

### WAL Configuration

- **`synchronous_commit`**:
  - `on` (default): Safe, wait for flush.
  - `off`: Async commit. Loss of recent transactions (default 3x `wal_writer_delay`) possible on crash. Integrity maintained. Good for analytics/bulk loading.
  - `local`, `remote_write`, `remote_apply`.

### Memory (`work_mem`)

- Default 4MB is per-operation (sort/hash).
- Monitor `log_temp_files` to see spills to disk.
- Increase for complex analytical queries, but watch out for `max_connections * work_mem * operations`.

### HyperLogLog (HLL)

- Efficient distinct counting for rollups.
- [citusdata/postgresql-hll](https://github.com/citusdata/postgresql-hll)
