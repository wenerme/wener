---
title: Grafana 配置
tags:
  - Configuration
---

# Grafana 配置

- [Configuration](https://grafana.com/docs/grafana/latest/administration/configuration/)
- 所有的配置都可以通过环境变量配置
  - `GF_<SectionName>_<KeyName>`

```ini
[database]
# mysql, postgres, sqlite3
type=postgres
# SQLite3
path=
host=
name=
user=
password=
# mysql://user:secret@host:port/database
# mysql://user:secret@host:port/database
url=
# pg - disable, require, verify-full
# mysql - true, false, skip-verify
ssl_mode=

[remote_cache]
# redis, memcached, database
type=database
# database, redis, memcache
connstr=
database=
redis=addr=127.0.0.1:6379,pool_size=100,db=0,ssl=false
memcache=127.0.0.1:11211

[security]
disable_initial_admin_creation=false
admin_user=admin
admin_password=admin

disable_gravatar=false
```

## grafana-cli

- https://grafana.com/docs/grafana/latest/administration/cli/

```bash
# 查看安装的插件
grafana-cli plugins ls
# 重置密码
grafana-cli admin reset-admin-password <new password>
```

## grafana-image-renderer

- [grafana/grafana-image-renderer](https://github.com/grafana/grafana-image-renderer)
  - [plugin](https://grafana.com/grafana/plugins/grafana-image-renderer/)

```ini
[rendering]
server_url = http://localhost:8081/render
callback_url = http://localhost:3000/
```

```bash title="remote"
export GF_RENDERING_SERVER_URL=http://renderer:8081/render
export GF_RENDERING_CALLBACK_URL=http://grafana:3000/
export GF_LOG_FILTERS=rendering:debug
```
