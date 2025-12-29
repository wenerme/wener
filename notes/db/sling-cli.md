---
tags:
  - Command
---

# sling-cli

- [slingdata-io/sling-cli](https://github.com/slingdata-io/sling-cli)
  - GPLv3, Go
  - extracts data from a source storage/database and loads it in a target storage/database
  - 支持非常多的 数据库、文件系统、文件格式
- ~/.sling/env.yaml

```bash
curl -LO https://github.com/slingdata-io/sling-cli/releases/download/v1.4.6/sling_darwin_all.tar.gz
tar -xzf sling_darwin_all.tar.gz sling
cp sling ~/bin

sling conns list

# avoid MSSQL TLS 1.0 error
sling conns set MSSQL url='sqlserver://sa:sa@127.0.0.1:1433?database=master;encrypt=disabled'

sling conns set DUMP url='sqlite://./dump.db'

sling conns discover MSSQL
sling conns discover DUMP

sling run --src-conn MSSQL --src-stream 'dbo.Users' --tgt-conn DUMP
sling run --src-conn MSSQL --src-stream 'dbo.Users' --tgt-object file://$PWD/dump.json

sling run -r sling.dump.yaml

# 执行 SQL
sling sling run --src-conn INFRA --src-stream "SELECT schema_name FROM information_schema.schemata WHERE schema_name NOT IN ('pg_catalog', 'information_schema', 'pg_toast')" --stdout
```

```yaml title="replication.yaml"
source: MY_POSTGRES
target: MY_SNOWFLAKE

# default config options which apply to all streams
defaults:
  mode: full-refresh
  object: new_schema.{stream_schema}_{stream_table}

streams:
  my_schema.*:

env:
  SLING_THREADS: 3
```

## 配置 {#config}

- ~/.sling/env.yaml
  - https://docs.slingdata.io/sling-cli/environment
- ~/dbt/profiles.yml
- https://docs.slingdata.io/concepts/replication/structure
