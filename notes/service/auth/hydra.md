---
title: Hydra
---

# Hydra
* 是什么？
  * OIDC, OAuth2 Provider - IdP
* [ory/hydra](https://github.com/ory/hydra)
* OAuth 服务端 - 纯接口服务，无前端
  * 不负责登陆登出，用户信息管理
* 场景
  * 允许第三方访问 API
  * 作为 IdP
  * 允许 浏览器、移动端等其他设备访问 API - Service Account/Token
  * 限制后端服务索取的信息

```bash
go get -d github.com/ory/hydra
docker-compose -f quickstart.yml \
  -f quickstart-postgres.yml \
  up --build
```
