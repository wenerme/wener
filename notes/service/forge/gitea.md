---
title: Gitea
---

# Gitea

- [go-gitea/gitea](https://github.com/go-gitea/gitea)

:::caution

- mirror
  - 只能 username+password
  - cron 默认 8h，至少 10m
  - webhook 触发 [#5342](https://github.com/go-gitea/gitea/issues/5342)
    - `curl -X POST https://gitea.com/api/v1/repos/{owner}/{repo}/mirror-sync?token={pta}`
- PTA 没有 scope Gitea 1.19 - https://github.com/go-gitea/gitea/commit/de484e86bc495a67d2f122ed438178d587a92526

:::

```bash
docker run -d --name=gitea -p 2222:22 -p 8080:3000 -v $PWD/gitea/data:/data gitea/gitea:latest
```

## 配置

- docker 环境变量配置 - `GITEA__{section}__{name}`
  - `GITEA__database__DB_TYPE`

```ini
APP_NAME=Gitea
RUN_USER=git
RUN_MODE=prod

[database]
DB_TYPE = postgres
HOST = RELEASE-NAME-postgresql.default.svc.cluster.local:5432
NAME = gitea
PASSWD = gitea
USER = gitea

SCHEMA= ; for postgres
SSL_MODE=disable ; disable, require, verify-full

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

- [#13539](https://github.com/go-gitea/gitea/issues/13539)
- [gitea/act_runner](https://gitea.com/gitea/act_runner)
  - 要求 docker
- https://blog.gitea.io/2022/12/feature-preview-gitea-actions/
- [nektos/act](https://github.com/nektos/act)

## Version

- 1.19
  - PTA scope
- 1.17
  - 支持 package - Composer, Conan, Generic, Helm, Maven, npm, NuGet, OCI Containers (Docker), PyPI and RubyGems
  - https://docs.gitea.io/en-us/packages/overview/
