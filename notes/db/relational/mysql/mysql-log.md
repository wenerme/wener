---
title: MySQL 日志
tags:
  - Debug
---

# MySQL Log

```sql
show variables like 'log_queries_not_using_indexes';


set global log_queries_not_using_indexes = 'ON'
```

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
```

- [Write logs into tables](https://mariadb.com/kb/en/mariadb/writing-logs-into-tables/)
- [TABLE mysql.slow_log](https://mariadb.com/kb/en/mariadb/mysqlslow_log-table/)
- [Slow Query Log Overview](https://mariadb.com/kb/en/mariadb/slow-query-log-overview/)
- http://dev.mysql.com/doc/refman/5.7/en/server-system-variables.html#sysvar_slow_query_log_file
- http://dev.mysql.com/doc/refman/5.7/en/slow-query-log.html
