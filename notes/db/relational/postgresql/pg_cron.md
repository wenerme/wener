---
title: pg_cron
---

# pg_cron

- [citusdata/pg_cron](https://github.com/citusdata/pg_cron)

:::tip

- 默认元数据表位于 postgres 库 - 只有在给定库才可以 CREATE EXTENSION
  - schema 为 cron

:::

```ini
shared_preload_libraries = 'pg_cron'
cron.database_name = 'postgres'
```

```sql
SELECT cron.schedule('nightly-vacuum', '0 3 * * *', 'VACUUM');
SELECT cron.unschedule('nightly-vacuum' );

-- 直接跨库操作
INSERT INTO cron.job (schedule, command, nodename, nodeport, database, username)
VALUES ('*/1 * * * *', '
DO $$
BEGIN
    delete from table_one;
    delete from table_two;
    delete from table_three;
END;
$$;',
        '/run/postgresql', 5432, 'my_dataabse', 'postgres');
```
