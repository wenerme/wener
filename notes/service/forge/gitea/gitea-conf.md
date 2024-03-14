---
tags:
  - Configuration
---

# 配置

- docker 环境变量配置 - `GITEA__{section}__{name}`
  - `GITEA__database__DB_TYPE`

```ini
APP_NAME=Gitea
RUN_USER=git
RUN_MODE=prod

[database]
# PostgreSQL
DB_TYPE = postgres
HOST = RELEASE-NAME-postgresql.default.svc.cluster.local:5432
NAME = gitea
PASSWD = gitea
USER = gitea
SCHEMA =
SSL_MODE=disable ; disable, require, verify-full

# SQLite
DB_TYPE = sqlite3
PATH = data/gitea.db
SQLITE_TIMEOUT = 500
# https://www.sqlite.org/pragma.html#pragma_journal_mode
# DELETE | TRUNCATE | PERSIST | MEMORY | WAL | OFF
# 推荐 WAL
SQLITE_JOURNAL_MODE = DELETE

# 其他
ITERATE_BUFFER_SIZE = 50
LOG_SQL = false
DB_RETRIES = 10
DB_RETRY_BACKOFF = 3s
MAX_IDLE_CONNS = 2
CONN_MAX_LIFETIME = 3s
MAX_OPEN_CONNS = 0
AUTO_MIGRATION = true

[service]
# 新注册用户必须由管理员手动激活,启用此选项需取消
REGISTER_MANUAL_CONFIRM=false
# 禁用注册，启用后只能用管理员添加用户
DISABLE_REGISTRATION=false
# 是否所有页面都必须登录后才可访问。
REQUIRE_SIGNIN_VIEW=false
```

- GITEA_WORK_DIR
- 迁移数据库 `gitea migrate`, `gitea dump`
- [Configuration Cheat Sheet](https://docs.gitea.io/en-us/config-cheat-sheet/)
  - [中文](https://docs.gitea.io/zh-cn/config-cheat-sheet/)
- [app.example.ini](https://github.com/go-gitea/gitea/blob/main/custom/conf/app.example.ini)

## action

```ini
[action]
ENABLED=false
# github -> https://github.com
# self -> 当前 gitea - GITEA__server__ROOT_URL
DEFAULT_ACTIONS_URL=github
# minio, XYZ -> storage.XYZ
STORAGE_TYPE=local
MINIO_BASE_PATH=actions_log/
```

- DEFAULT_ACTIONS_URL
  - 不推荐 self
    - 需要 mirror 太多仓库
    - 需要 gitea 公开访问
  - 推荐 uses 写完整 url，例如: https://gitea.com/actions/checkout@v3


## indexer

```ini
[indexer]

ISSUE_INDEXER_TYPE = bleve
ISSUE_INDEXER_PATH = indexers/issues.bleve

ISSUE_INDEXER_CONN_STR =
ISSUE_INDEXER_NAME = gitea_issues

STARTUP_TIMEOUT = 30s

# Repo
# ==========
REPO_INDEXER_ENABLED = false

# sources,forks,mirrors,templates
REPO_INDEXER_REPO_TYPES = sources

# bleve, elasticsearch
REPO_INDEXER_TYPE = bleve
REPO_INDEXER_PATH = indexers/repos.bleve

# ES
# ----------
# http://elastic:changeme@localhost:9200
REPO_INDEXER_CONN_STR =
REPO_INDEXER_NAME = gitea_codes

REPO_INDEXER_INCLUDE =
REPO_INDEXER_EXCLUDE =
MAX_FILE_SIZE =
```
