---
title: Gitea
---

# Gitea

- [go-gitea/gitea](https://github.com/go-gitea/gitea)
  - MIT, Golang

:::caution

- 如果用户为公开，则所有 **镜像** 也是公开的
- mirror
  - 只能 username+password
  - cron 默认 8h，至少 10m
  - webhook 触发 [#5342](https://github.com/go-gitea/gitea/issues/5342)
    - `curl -X POST https://gitea.com/api/v1/repos/{owner}/{repo}/mirror-sync?token={pta}`
    - PTA 只需要 `repo` scope
- PTA 没有 scope Gitea 1.19 - https://github.com/go-gitea/gitea/commit/de484e86bc495a67d2f122ed438178d587a92526

:::

```bash
docker run -d --name=gitea -p 2222:22 -p 8080:3000 -v $PWD/gitea/data:/data gitea/gitea:latest
```

## API

- Auth 方式
  - Basic Auth
  - `?token=`
  - `?access_token=`
  - `Authorization: token TOKEN`
- https://docs.gitea.com/next/development/api-usage
