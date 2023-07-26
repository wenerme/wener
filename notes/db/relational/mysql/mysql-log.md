---
title: MySQL 日志
tags:
  - Debug
---

# MySQL Log

| conf                          | default               | for                                               |
| ----------------------------- | --------------------- | ------------------------------------------------- |
| log_output                    | FILE                  | TABLE,FILE,NONE                                   |
| slow_query_log                | OFF                   |                                                   |
| slow_query_log_file           | `<HOSTNAME>-slow.log` |                                                   |
| general_log                   | OFF                   |                                                   |
| general_log_file              | `<HOSTNAME>.log`      |                                                   |
| sql_log_off                   | OFF                   | 控制当前会话的 general log                        |
| long_query_time               | 10                    | 慢查询 阀值                                       |
| log_slow_admin_statements     | OFF                   |
| log_queries_not_using_indexes | OFF                   | e.g `[ALTER,ANALYZE,CHECK,OPTIMIZE,REPAIR] TABLE` |
| log_slow_extra                | OFF                   | 在 FILE 输出中包含额外信息                        |

```sql
select *
from performance_schema.global_variables
where VARIABLE_NAME in (
                        'log_output', 'slow_query_log', 'long_query_time', 'slow_query_log_file',
                        'log_queries_not_using_indexes', 'log_throttle_queries_not_using_indexes',
                        'general_log', 'general_log_file'
    )
order by VARIABLE_NAME;
```

- `mysql.slow_log` 表
  - 实际对应 csv - 查询很慢 - CSV storage engine
- 参考
  - https://dev.mysql.com/doc/refman/8.0/en/log-destinations.html

```sql
show variables like 'log_queries_not_using_indexes';


set global log_queries_not_using_indexes = 'ON'

--
set global general_log = 'ON';
select * from mysql.general_log
order by event_time desc;
```

```bash
head /var/lib/mysql/mysql/slow_log.CSV
wc -l /var/lib/mysql/mysql/slow_log.CSV

apk add mariadb-client
mysqldumpslow -t 10 slow.log

# percona-toolkit
curl -LO http://www.percona.com/get/pt-query-digest
chmod +x pt-query-digest
```

- https://docs.percona.com/percona-toolkit/pt-query-digest.html
  - Analyze MySQL queries from logs, processlist, and tcpdump

## general log

## slow log

| var                           | for  |
| ----------------------------- | ---- |
| log_slow_admin_statements     | OFF  |
| log_slow_extra                | OFF  |
| log_slow_replica_statements   | OFF  |
| log_slow_slave_statements     | OFF  |
| slow_launch_time              | 2    |
| slow_query_log                | ON   |
| slow_query_log_file           |      |
| long_query_time               | 10   |
| log_output                    | FILE |
| log_queries_not_using_indexes |

```sql
show variables like '%slow%';
show variables like 'long_query_time';-- 默认 10s
show variables like 'log_output';-- 默认 FILE
show variables like 'log_queries_not_using_indexes';
show variables like 'slow_query_log_file';

-- slow_query_log_file 控制文件路径
set global log_output = 'FILE,TABLE';
set global slow_query_log='ON';
set global log_queries_not_using_indexes = 'ON';

set global long_query_time=3;
set session long_query_time=3;

-- 测试
select sleep(5);
select * from mysql.slow_log limit 2;


-- 排查其他
show processlist;
show engine innodb status;

flush logs;
flush slow logs;
truncate mysql.slow_log;
```

- [Write logs into tables](https://mariadb.com/kb/en/mariadb/writing-logs-into-tables/)
- [TABLE mysql.slow_log](https://mariadb.com/kb/en/mariadb/mysqlslow_log-table/)
- [Slow Query Log Overview](https://mariadb.com/kb/en/mariadb/slow-query-log-overview/)
- http://dev.mysql.com/doc/refman/5.7/en/server-system-variables.html#sysvar_slow_query_log_file
- http://dev.mysql.com/doc/refman/5.7/en/slow-query-log.html

## maintain

- binlog_expire_logs_seconds 默认 30 天
- binlog_expire_logs_auto_purge=ON

```txt
PURGE { BINARY | MASTER } LOGS {
    TO 'log_name'
  | BEFORE datetime_expr
}
```

```sql
FLUSH LOGS ;
FLUSH BINARY LOGS;

SHOW BINARY LOGS;
SHOW MASTER LOGS;
PURGE BINARY LOGS BEFORE now();
```

```bash
mysqladmin flush-logs
```
