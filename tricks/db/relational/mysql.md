---
id: mysql
title: MySQL
---

# MySQL

## Tips
* [Common MySQL Queries](http://www.artfulsoftware.com/infotree/queries.php)

```sql
-- 设置 binlog 超时时间
SET GLOBAL expire_logs_days=7

-- 查看所有的 binlog
SHOW BINARY LOGS;
-- 清除一个 binlog 文件
PURGE BINARY LOGS TO 'mysql-bin.00123';
-- 清空所有 binlog
PURGE BINARY LOGS BEFORE NOW();

-- 查看用户
SELECT User,host FROM mysql.user;

-- 创建用户
CREATE USER 'wener'@'localhost' IDENTIFIED BY 'qaz';
GRANT ALL PRIVILEGES ON *.* TO 'wener'@'localhost' WITH GRANT OPTION;

-- 创建一个可以远程使用的账户
CREATE USER 'root'@'%' IDENTIFIED BY 'root';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';
GRANT ALL PRIVILEGES ON cbh.* TO 'root'@'%' identified by 'root' WITH GRANT OPTION;

-- 设置密码
SET PASSWORD FOR 'root'@'%' = PASSWORD('root');
-- 删除密码
SET PASSWORD FOR 'root'@'%' = PASSWORD('');

-- 使权限生效
FLUSH PRIVILEGES;

-- 创建结构相同的表
create table name like old_tab;
create table name select * from old_tab where 1=2;

-- MYSQL 获取数据库的大小
SELECT table_schema                                        "DB Name",
   Round(Sum(data_length + index_length) / 1024 / 1024, 2) "DB Size in MB"
FROM   information_schema.tables
GROUP  BY table_schema;

-- 可以使用环境变量来指定密码,避免命令行上的警告
-- MYSQL_PWD=$password

-- 查看当前连接数
SHOW STATUS WHERE `variable_name` = 'Threads_connected'
show processlist
```

### mysql cli
```sql
source myfile.sql

```

## FAQ
### [1071] - Specified key was too long; max key length is 767 bytes

* utf8 3*255 = 765 < 767
* utf8mb4 4*191 = 764 < 767
```
INNODB utf8 VARCHAR(255)
INNODB utf8mb4 VARCHAR(191)
```

### slow log
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

### Got a packet bigger than 'max_allowed_packet' bytes
* 在数据导入的时候可能会遇到

```sql
SET GLOBAL max_allowed_packet=1073741824;
```

或者修改配置文件

```ini
max_allowed_packet=500M
```

### 快速数据导入

* [MySQL any way to import a huge (32 GB) sql dump faster?](https://dba.stackexchange.com/q/83125)

* 启动时 `--innodb-doublewrite=0` 禁用 Double Write Buffer, 导入完成后恢复

```ini
innodb_buffer_pool_size = 4G
innodb_log_buffer_size = 256M
innodb_log_file_size = 1G
innodb_write_io_threads = 16
innodb_flush_log_at_trx_commit = 0
```

## Type

* [String type overview](http://dev.mysql.com/doc/refman/5.7/en/string-type-overview.html)

Type        | Maximum length
------------+-------------------------------------
TINYTEXT    |           255 (2 8−1) bytes
TEXT        |        65,535 (216−1) bytes = 64 KiB
MEDIUMTEXT  |    16,777,215 (224−1) bytes = 16 MiB
LONGTEXT    | 4,294,967,295 (232−1) bytes =  4 GiB
