# MySQL

## Type

* [String type overview](http://dev.mysql.com/doc/refman/5.7/en/string-type-overview.html)

Type        | Maximum length
------------+-------------------------------------
TINYTEXT    |           255 (2 8−1) bytes
TEXT        |        65,535 (216−1) bytes = 64 KiB
MEDIUMTEXT  |    16,777,215 (224−1) bytes = 16 MiB
LONGTEXT    | 4,294,967,295 (232−1) bytes =  4 GiB


```sql
-- 设置 binlog 超时时间
SET GLOBAL expire_logs_days=7

-- 查看所有的 binlog
SHOW BINARY LOGS;
-- 清除一个 binlog 文件
PURGE BINARY LOGS TO 'mysql-bin.00123';
-- 清空所有 binlog
PURGE BINARY LOGS BEFORE NOW();
```

## FAQ
### [1071] - Specified key was too long; max key length is 767 bytes

* utf8 3*255 = 765 < 767
* utf8mb4 4*191 = 764 < 767
```
INNODB utf8 VARCHAR(255)
INNODB utf8mb4 VARCHAR(191)
```

## slow log
* [Write logs into tables](https://mariadb.com/kb/en/mariadb/writing-logs-into-tables/)
* [TABLE mysql.slow_log](https://mariadb.com/kb/en/mariadb/mysqlslow_log-table/)
* [Slow Query Log Overview](https://mariadb.com/kb/en/mariadb/slow-query-log-overview/)
```sql
show variables like '%slow%';
-- slow_query_log 是否开启
-- slow_query_log_file 日志文件
select global slow_query_log;
-- 注意: 修改全局变量后需要退出重新登录
set global slow_query_log=1;

-- 查看满日志的记录时间 long_query_time, 单位为 s
show variables like '%long%';
-- 修改时间以便于测试
set global long_query_time=3;

-- 查看数据库日志的输出位置
show variables like 'log_output';
-- 如果同时输出到文件和表,则可以通过 mysql.slow_log 查看慢日志
SET GLOBAL log_output = 'FILE,TABLE';
select * from mysql.slow_log limit 2 \G
```
