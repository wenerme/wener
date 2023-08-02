---
title: MySQL 配置
---

# MySQL Conf

```bash
mysqld --verbose --help
mysqld --no-defaults --verbose --help
```

```sql
SHOW VARIABLES;

select * from performance_schema.persisted_variables;
select * from performance_schema.global_variables;
```

**mysqld**

```
--character-set-server=utf8mb4
--collation-server=utf8mb4_unicode_ci
--max-connections=2000
```

- my.cnf
- `--defaults-extra-file`
- .mylogin.cnf
  - --no-defaults
- mysqld-auto.cnf
  - persisted_globals_load
  - `SET PERSIST`
- mysql_config_editor
- 参考
  - [MySQL Log](./mysql-log.md)
  - https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html
  - https://dev.mysql.com/doc/refman/8.0/en/option-files.html


## 配置方式

**启动参数配置**

```bash
mysqld --sort-buffer-size=256K --max-allowed-packet=1G
```

**my.cnf**

```ini
[mysqld]
sort_buffer_size=256K
max_allowed_packet=1G
```

**动态配置**

```sql
SET GLOBAL max_connections = 1000;
SET @@GLOBAL.max_connections = 1000;

-- mysqld-auto.cnf
SET PERSIST max_connections = 1000;
SET @@PERSIST.max_connections = 1000;

-- 不修改当前
SET PERSIST_ONLY back_log = 1000;
SET @@PERSIST_ONLY.back_log = 1000;

-- 会话维度
SET SESSION sql_mode = 'TRADITIONAL';
SET @@SESSION.sql_mode = 'TRADITIONAL';
SET @@sql_mode = 'TRADITIONAL';
```


## query_cache_size

- 8.0 移除
- 5.6 禁用
- https://dba.stackexchange.com/a/217578/234272
