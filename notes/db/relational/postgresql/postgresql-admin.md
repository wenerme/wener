---
title: PostgreSQL Admin
---

# PostgreSQL Admin

- https://www.postgresql.org/docs/current/functions-info.html
- https://www.postgresql.org/docs/current/routine-vacuuming.html
- https://postgresqlco.nf/doc/en/param/

## Info Schema

- https://www.postgresql.org/docs/current/information-schema.html

```sql
SELECT column_name,
       is_nullable,
       udt_name,
       character_maximum_length,
       numeric_precision,
       numeric_precision_radix,
       numeric_scale,
       datetime_precision,
       8 * typlen
FROM information_schema.columns AS cols
         JOIN pg_type AS pgt ON cols.udt_name = pgt.typname
WHERE table_catalog = 'db'
  AND table_schema = CURRENT_SCHEMA()
  AND table_name = 'users';
```

## Transaction ID Exhaustion/Wraparound

- [Managing Transaction ID Exhaustion (Wraparound) in PostgreSQL](https://blog.crunchydata.com/blog/managing-transaction-id-wraparound-in-postgresql)

```sql
-- https://stackoverflow.com/a/32644144/1870054
SELECT txid_current();
SELECT xmin FROM test;

SELECT datname
     , age(datfrozenxid)
     , current_setting('autovacuum_freeze_max_age')
FROM pg_database;

SELECT c.oid::regclass
     , age(c.relfrozenxid)
     , pg_size_pretty(pg_total_relation_size(c.oid)) as total_relation_size
FROM pg_class c
       JOIN pg_namespace n on c.relnamespace = n.oid
WHERE relkind IN ('r', 't', 'm')
  AND n.nspname NOT IN ('pg_toast')
ORDER BY 2 DESC
LIMIT 100;
```

```sql
WITH max_age AS (
  SELECT 2000000000 as max_old_xid
       , setting    AS autovacuum_freeze_max_age
  FROM pg_catalog.pg_settings
  WHERE name = 'autovacuum_freeze_max_age')
   , per_database_stats AS (
  SELECT datname
       , m.max_old_xid::int
       , m.autovacuum_freeze_max_age::int
       , age(d.datfrozenxid) AS oldest_current_xid
  FROM pg_catalog.pg_database d
         JOIN max_age m ON (true)
  WHERE d.datallowconn)
SELECT max(oldest_current_xid)                                                   AS oldest_current_xid
     , max(ROUND(100 * (oldest_current_xid / max_old_xid::float)))               AS percent_towards_wraparound
     , max(ROUND(100 * (oldest_current_xid / autovacuum_freeze_max_age::float))) AS percent_towards_emergency_autovac
FROM per_database_stats
```
