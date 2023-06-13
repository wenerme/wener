---
tags:
  - Diagnosis
  - Troubleshooting
  - Debug
---

# PostgreSQL Troubleshooting

```sql
-- 总连接数，已使用，super 预留，普通用户可用
select max_conn, used, res_for_super, max_conn - used - res_for_super res_for_normal
from (select count(*) used from pg_stat_activity) t1,
     (select setting::int res_for_super from pg_settings where name = $$superuser_reserved_connections$$) t2,
     (select setting::int max_conn from pg_settings where name = $$max_connections$$) t3

-- 查看当前的最大连接数
show max_connections;
select current_setting('max_connections');
select *
from pg_settings
where name = 'max_connections';

show shared_buffers;

-- 查看连接数主要谁占用
-- idle 多还是 active 多
select state, usename, application_name, datname, count(*)
from pg_stat_activity
group by state, usename, application_name, datname
order by 1, 2, 3;

-- 排查 active 连接
select *
from pg_stat_activity
where state = 'active';

ALTER SYSTEM SET max_connections TO '150';
ALTER SYSTEM SET shared_buffers TO '256MB';

show idle_in_transaction_session_timeout;

-- 单个用户
alter user username SET idle_in_transaction_session_timeout to 60000;
-- 系统
ALTER SYSTEM SET idle_in_transaction_session_timeout to 60000; -- 1minute

-- pg_terminate_backend(pid)
SELECT *
FROM pg_stat_activity
WHERE datname = 'centralauth'
  AND pid <> pg_backend_pid()
  AND state in ('idle', 'idle in transaction', 'idle in transaction (aborted)', 'disabled')
  AND state_change < current_timestamp - INTERVAL '15' MINUTE;

-- WAL
select name, setting, unit
from pg_settings
where name in (
               'effective_cache_size',
               'shared_buffers',
               'work_mem',
               'maintenance_work_mem',
               'wal_buffers'
    );
```
