---
title: Gitea
---

# Gitea

:::caution

- 不支持环境变量配置 - [#350](https://github.com/go-gitea/gitea/issues/350)
  - secret 需要在 config file - GitOps 部署配置麻烦

:::

```bash
docker run -d --name=gitea -p 10022:22 -p 10080:3000 -v /var/lib/gitea:/data gitea/gitea:latest
```

## 配置

- [配置](https://docs.gitea.io/zh-cn/config-cheat-sheet/)

```ini
[database]
DB_TYPE = postgres
HOST = RELEASE-NAME-postgresql.default.svc.cluster.local:5432
NAME = gitea
PASSWD = gitea
USER = gitea

[service]
# 新注册用户必须由管理员手动激活,启用此选项需取消
REGISTER_MANUAL_CONFIRM=false
# 禁用注册，启用后只能用管理员添加用户
DISABLE_REGISTRATION=false
# 是否所有页面都必须登录后才可访问。
REQUIRE_SIGNIN_VIEW=false
```
