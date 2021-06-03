---
title: Wiki.js
---

# Wiki.js

- [Requarks/wiki](https://github.com/Requarks/wiki) 是什么？
  - AGPL-3.0
  - 支持 Markdown 的 Wiki
  - 类似于语雀但是支持 Markdown
  - 支持文件，支持图片，支持 Git 后端，支持搜索
  - Nodejs 10.12+
  - 支持 MySQL, MariaDB, PostgreSQL, MSSQL or SQLite3
    - 推荐使用 PostgreSQL
    - 多副本只支持 PostgreSQL
- 要求
  - 2 CPU 1G 内存
- [授权](https://docs.requarks.io/auth)
  - CAS、LDAP/AD、SAML 2.0、Local

```bash
# Docker 安装
# https://docs.requarks.io/install/docker
# SQLite 启动
docker run --rm -it \
  -p 8080:3000 \
  -v $PWD/wiki:/data \
  -e "DB_TYPE=sqlite" \
  -e "DB_FILEPATH=/data/wiki.sqlite" \
  --name wiki requarks/wiki:2

# PG 启动
docker run -d --restart unless-stopped \
  -p 8080:3000 \
  -e "DB_TYPE=postgres"
  -e "DB_HOST=db"
  -e "DB_PORT=5432"
  -e "DB_USER=wikijs"
  -e "DB_PASS=wikijsrocks"
  -e "DB_NAME=wiki" \
  --name wiki requarks/wiki:2
```

## 配置

- [Configuration](https://docs.requarks.io/install/config)
- [config.sample.yml](https://github.com/Requarks/wiki/blob/dev/config.sample.yml)

```yaml
bindIP: 0.0.0.0
port: 3000
# error, warn, info, verbose, debug, silly
logLevel: info
uploads:
  # 默认 5 MB
  maxFileSize: 5242880
  maxFiles: 10

# 离线模式 - 避免下载更新
offline: true

# HA 模式 - 需要 PostgreSQL
ha: true

# 临时数据目录
dataPath: ./data
---
db:
  type: postgres
  host: localhost
  port: 5432
  user: wikijs
  pass: wikijsrocks
  db: wiki
  # SQLite
  # type: sqlite
  # storage: db.sqlite
# DB 连接池
pool:
  min: 2
  max: 10

---
ssl:
  enabled: true
  port: 3443
  provider: custom

  format: pem
  key: path/to/key.pem
  cert: path/to/cert.pem
  passphrase: null
  dhparam: null

  # format: pfx
  # pfx: path/to/cert.pfx
---
# ACME
ssl:
  enabled: true
  port: 3443
  provider: letsencrypt

  domain: wiki.yourdomain.com
  subscriberEmail: admin@example.com
```

## Kubernetes

- [dev/helm](https://github.com/Requarks/wiki/tree/dev/dev/helm)

**values.yaml**

```yaml
image:
  # 默认是 latest
  tag: latest
postgresql:
  # 使用已有的
  enabled: false
  postgresqlHost:
  postgresqlPort: 5432
  postgresqlDatabase: wiki
  postgresqlUser: postgres
  postgresqlPassword:
  # 存储 Password 的 secret
  existingSecret:
  secretKey: postgresql-password
```
