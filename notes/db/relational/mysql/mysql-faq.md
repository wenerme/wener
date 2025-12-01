---
tags:
  - FAQ
---

# MySQL FAQ

:::tips

- 列可以使用 after 指定位置
- `datetime(3) DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)`
  - MySQL 5.6.5

:::

```sql
select version(); -- 查看版本
SELECT USER(); -- 查看用户
SELECT DATABASE(); -- 查看数据库

SHOW STATUS;
SHOW GLOBAL VARIABLES;
SHOW SESSION VARIABLES;
SHOW VARIABLES LIKE 'max_connections';
SHOW PROCESSLIST; -- 查看当前连接
SHOW ENGINES;
SHOW ENGINE INNODB STATUS;
SHOW DATABASES; -- 显示数据库
SHOW TABLES; -- 显示表

SHOW GRANTS FOR CURRENT_USER; -- 查看当前用户权限
SHOW GRANTS FOR 'user'@'host'; -- 查看权限

use mysql; -- 切换数据库
describe users; -- 查看表结构

SELECT NOW();

SHOW SLAVE STATUS; -- 查看从库状态
SHOW MASTER STATUS; -- 查看主库状态

SELECT
    VERSION() AS 'MySQL版本',
    @@character_set_server AS 'Server字符集',
    @@collation_server AS 'Server排序规则',
    @@time_zone AS '系统时区',
    CONCAT(ROUND(@@innodb_buffer_pool_size / 1024 / 1024, 0), ' MB') AS 'InnoDB缓冲池大小',
    @@max_connections AS '最大连接数';
```

- db
  - sys
  - information_schema
  - performance_schema
  - mysql
- utf8mb4_0900_ai_ci
  - MySQL 8.0
  - ai - Accent Insensitive - `a 等于 á`
  - ci - Case Insensitive - `a 等于 A`
- utf8mb4_unicode_ci
  - MySQL 5.7
- utf8mb4_uca1400_ai_ci
  - MariaDB

| 类型定义               | 精度            | 格式示例                   | 常见用途                 |
| ---------------------- | --------------- | -------------------------- | ------------------------ |
| DATETIME / DATETIME(0) | 秒 (Standard)   | 2025-11-25 16:40:30        | 普通业务时间、创建时间   |
| DATETIME(3)            | 毫秒 (Millisec) | 2025-11-25 16:40:30.123    | 高并发日志、接口耗时统计 |
| DATETIME(6)            | 微秒 (Microsec) | 2025-11-25 16:40:30.123456 | 极高频交易、科学计算     |

```sql
-- is not allowed to connect to this MySQL server
-- /c/Program\ Files/MySQL/MySQL\ Server\ 8.0/bin/mysql -u root -p123456 app -h 127.0.0.1
-- 允许 root 远程登录
UPDATE mysql.user SET host='%' WHERE user='root' AND host='localhost';
FLUSH PRIVILEGES; -- 重载权限

-- 修改密码
ALTER USER 'root'@'%' IDENTIFIED BY '123456';
```

## 限制 {#limits}

- bind 参数 65535
- max_prepared_stmt_count=16382
  - 最大 prepare 数量
- 4096 列/表
- 65,535 byte/row
  - blob 和 text 占用 9-12 byte

| Type       | Maximum length                      |
| ---------- | ----------------------------------- |
| TINYTEXT   | 255 (2 8−1) bytes                   |
| TEXT       | 65,535 (216−1) bytes = 64 KiB       |
| MEDIUMTEXT | 16,777,215 (224−1) bytes = 16 MiB   |
| LONGTEXT   | 4,294,967,295 (232−1) bytes = 4 GiB |

- https://dev.mysql.com/doc/refman/8.0/en/column-count-limit.html
- https://dev.mysql.com/doc/refman/8.0/en/table-size-limit.html

```sql
ALTER TABLE tbl_name MAX_ROWS=1000000000 AVG_ROW_LENGTH=nnn;
SHOW TABLE STATUS FROM db_name LIKE 'tbl_name';
```

## debug connections

```sql
-- 默认 151 - 150 普通用户, 1 super
show variables like 'max_connections';
show status where variable_name = 'threads_connected';
show processlist;

select id,
       user,
       host,
       db,
       command,
       time,
       state,
       info
from information_schema.processlist
```

## 修改密码

```sql
select user,host from mysql.user;
select user,host,db from mysql.db;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

-- 允许 root 远程
-- root@localhost -> root@%
UPDATE mysql.user SET Host='%' WHERE Host='localhost' AND User='root';
FLUSH PRIVILEGES;

-- UPDATE mysql.db SET Host='%' WHERE Host='localhost' AND User='username';
-- GRANT ALL PRIVILEGES ON database_name.* TO 'username'@'localhost';
-- GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%';
```

## 估算表大小

```sql
-- 行数
select table_rows, TABLE_SCHEMA, TABLE_NAME
from information_schema.tables
order by TABLE_ROWS desc;

select (DATA_LENGTH / AVG_ROW_LENGTH) as total_rows, TABLE_NAME
from INFORMATION_SCHEMA.TABLES
order by total_rows desc;

-- 数据量
select sys.format_bytes(DATA_LENGTH), TABLE_NAME
from INFORMATION_SCHEMA.TABLES
order by DATA_LENGTH desc;

-- DB 大小
SELECT table_schema                                            "DB Name",
       ROUND(SUM(data_length + index_length) / 1024 / 1024, 1) "DB Size in MB"
FROM information_schema.tables
GROUP BY table_schema;
```

## Backup

- https://dba.stackexchange.com/a/91322/234272

## Expression of generated column 'status' contains a disallowed function: curdate.

MySQL virtual 列不能用 CONNECTION_ID(), CURRENT_USER(), NOW().

## 删除数据不会释放空间

- 除非使用 innodb_file_per_table
- optimize table 会减小 .idb, 但不会减小 ibdata1

## 1418

```txt
1418 - This function has none of DETERMINISTIC, NO SQL, or READS SQL DATA in its declaration and binary logging is enabled (you *might* want to use the less safe log_bin_trust_function_creators variable)
```

- https://dev.mysql.com/doc/refman/8.0/en/stored-programs-logging.html
- https://stackoverflow.com/a/26015334/1870054

## dump

```bash
mysqldump --single-transaction --routines --triggers --all-databases > MySQLData.sql
```

## Authentication plugin 'mysql_native_password' cannot be loaded

- mysql 9.0 移除

```bash
brew uninstall mysql
brew install mysql@8.4

ln -s /opt/homebrew/opt/mysql@8.4 /opt/homebrew/opt/mysql
```
