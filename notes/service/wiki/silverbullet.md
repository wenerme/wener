---
title: Silverbullet
---

# Silverbullet

- [silverbulletmd/silverbullet](https://github.com/silverbulletmd/silverbullet)
  - MIT, TS, Go, Lua
  - WPA Web 应用
  - 文件优先 - 直接编辑的文件

```bash
docker run --rm -it \
  -v ./space:/space \
  -p 3000:3000 \
  --name silverbullet ghcr.io/silverbulletmd/silverbullet
```

| env                | value        | description                                     |
| ------------------ | ------------ | ----------------------------------------------- |
| SB_INDEX_PAGE      | index        | 默认首页                                        |
| SB_SPACE_IGNORE    | `IgnoreMe/*` | 忽略指定路径，gitignore 格式                    |
| SB_HTTP_LOGGING    | 任意         | 启用 HTTP 日志                                  |
| SB_LOG_PUSH        | 任意         | 客户端日志推送到服务端                          |
| SB_HOSTNAME        | 127.0.0.1    | 绑定主机名，默认 127.0.0.1，Docker 默认 0.0.0.0 |
| SB_PORT            | 3000         | 服务端口，默认 3000                             |
| SB_URL_PREFIX      | /notes       | URL 前缀                                        |
| SB_USER            | pete:1234    | 单用户认证，格式为 用户:密码                    |
| SB_AUTH_TOKEN      | token123     | HTTP API 认证用 Token                           |
| SB_LOCKOUT_LIMIT   | 10           | 失败登录锁定次数，默认 10                       |
| SB_LOCKOUT_TIME    | 60           | 登录失败锁定秒数                                |
| SB_FOLDER          | /space       | 挂载存储目录，Docker 默认 /space                |
| SB_READ_ONLY       | true         | 只读模式，禁用编辑                              |
| SB_SHELL_BACKEND   | local/off    | 是否允许插件运行本地命令                        |
| SB_SHELL_WHITELIST | git pandoc   | 允许的命令白名单，空为全允许                    |
| PUID               | 1000         | Docker 指定 UID                                 |
| PGID               | 1000         | Docker 指定 GID                                 |
| SB_NAME            | 自定义       | WebApp 名称                                     |
| SB_DESCRIPTION     | 自定义       | WebApp 描述                                     |
