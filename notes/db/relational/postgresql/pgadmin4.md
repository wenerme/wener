---
title: pgadmin4
---

# pgadmin4

- [postgres/pgadmin4](https://github.com/postgres/pgadmin4) 是什么？
  - 基于 Web 的 PG 管理工具
  - Python+jQuery+Bootstrap
  - 支持桌面 - NWjs 封装

## Container

- [Container Deployment](https://www.pgadmin.org/docs/pgadmin4/latest/container_deployment.html)

```bash
# PG 工具目录
# /usr/local/pgsql-9.6
# /usr/local/pgsql-10
# /usr/local/pgsql-11
# /usr/local/pgsql-12
# /usr/local/pgsql-13
docker pull dpage/pgadmin4
```

- 配置加载顺序
  - /pgadmin4/config.py
  - /pgadmin4/config_distro.py
  - /pgadmin4/config_local.py
- 目录
  - /var/lib/pgadmin
    - 工作目录 - 所有操作，包括配置数据库（SQLite）
  - /pgadmin4/servers.json
    - PG 服务定义 - 第一次启动加载
  - /certs/server.cert
  - /certs/server.key

| env                      | default                | desc                       |
| ------------------------ | ---------------------- | -------------------------- |
| PGADMIN_DEFAULT_EMAIL    |
| PGADMIN_DEFAULT_PASSWORD |
| PGADMIN_DISABLE_POSTFIX  |
| PGADMIN_ENABLE_TLS       |
| PGADMIN_LISTEN_ADDRESS   | 0.0.0.0                |
| PGADMIN_LISTEN_PORT      | 80,443                 |
| PGADMIN_SERVER_JSON_FILE | /pgadmin4/servers.json |
| GUNICORN_ACCESS_LOGFILE  | -                      | stdout                     |
| GUNICORN_THREADS         | 25                     |
| `PGADMIN_CONFIG_<NAME>`  |                        | /pgadmin4/config_distro.py |
| SCRIPT_NAME              |                        | subpath                    |

| conf                                      | demo  |
| ----------------------------------------- | ----- |
| PGADMIN_CONFIG_ENHANCED_COOKIE_PROTECTION | True  |
| PGADMIN_CONFIG_LOGIN_BANNER               | My DB |
| PGADMIN_CONFIG_CONSOLE_LOG_LEVEL          | 10    |
