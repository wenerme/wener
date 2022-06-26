---
title: PgBouncer
---

# PgBouncer

- [pgbouncer/pgbouncer](https://github.com/pgbouncer/pgbouncer)
  - [特性](https://www.pgbouncer.org/features.html)
  - Session pooling
    - 链接纬度
    - 支持所有特性
  - Transaction pooling
    - 会话纬度
    - 不支持特性
      - SET/RESET
      - LISTEN/NOTIFY
      - WITH HOLD CURSOR
      - Protocol-level prepared plans
      - PREPARE / DEALLOCATE
      - PRESERVE/DELETE ROWS temp tables
      - LOAD
  - Statement pooling
    - 语句纬度
    - 不支持事务
    - 强制 autocommit
  - 2 kB per connection by default
  - 多后端服务
  - 在线从新配置
  - 在线 restart/upgrade
- 管理
  - [kwent/pgbouncerhero](https://github.com/kwent/pgbouncerhero) - PgBouncer WebUI
    - MIG, RoR
    - 开发停滞

:::caution

- pgbouncer 的最大收益来自于 tx 模式 - 对应用有很多限制
- 不要依赖 session 变量 - 不要 `SET`, 只能 `SET LOCAL`
  - search_path - [#73](https://github.com/pgbouncer/pgbouncer/pull/73)
  - role
- prepared statements 只能在 session 模式下，且 `server_reset_query = DISCARD ALL;` 或 `DEALLOCATE ALL;`
- transaction 不支持 prepare - 可以在客户端禁用
  - JDBC - prepareThreshold=0
  - PHP/PDD
    - `new PDO("dsn", "user", "pass", array(PDO::ATTR_EMULATE_PREPARES => true));`
    - `$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, true);`

:::

## 配置

- [配置](http://www.pgbouncer.org/config.html)

```ini
# 引入其他配置
%include filename
```

### 基础配置

**/etc/pgbouncer/pgbouncer.ini**

```ini
[databases]
mydbuser = host=192.168.1.2 port=5433 user=mydb

[pgbouncer]
listen_addr = 0.0.0.0
# 不同端口
listen_port = 15432
unix_socket_dir =
user = postgres
auth_file = /etc/pgbouncer/userlist.txt
auth_type = md5
ignore_startup_parameters = extra_float_digits

admin_users = postgres
```

**/etc/pgbouncer/userlist.txt**

```ini
"mydbuser" "password"
```

## 管理

- 配置 admin_users
- 链接
  - 外部 `postgres://postgres@hostname-of-container/pgbouncer`
  - 内部 `postgres://127.0.0.1/pgbouncer`

```
# 自定义配置
SHOW STATS;
SHOW SERVERS;
SHOW CLIENTS;
SHOW POOLS;

# 可以零时断开后端链接，例如后端升级，前端链接不断
PAUSE;
RESUME;
```

## bitnami/pgbouncer

- /opt/bitnami/pgbouncer/bin/pgbouncer
- /opt/bitnami/pgbouncer/conf/pgbouncer.ini
- PGBOUNCER_IGNORE_STARTUP_PARAMETERS=extra_float_digits

## unsupported startup parameter: extra_float_digits

```ini
ignore_startup_parameters = extra_float_digits
```
