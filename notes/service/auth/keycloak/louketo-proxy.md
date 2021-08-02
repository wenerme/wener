---
title: Louketo Proxy
---

# Louketo Proxy

- [louketo/louketo-proxy](https://github.com/louketo/louketo-proxy)
  - 原来的 keycloak gatekeeper
- [使用手册](https://github.com/louketo/louketo-proxy/blob/master/docs/user-guide.md)
- 两种工作模式
  - 反向代理 - 例如 Nginx
    - 请求上游携带授权信息
  - 前向代理 - HTTP_PROXY
    - 必须提供账号密码
    - 使用提供的账号密码进行 `client_credentials` 授权
    - 请求附加授权信息
    - 用于 **服务之间** 使用 Token 鉴权
- 权限管理
  - 白名单
  - 路径 + HTTP 方法 + 角色
- 暴露端口
  - `/oauth/logout?redirect=url` 退出登陆
  - `/oauth/callback` OpenID 回调
  - `/oauth/authorize` 鉴权，生成 OpenID 重定向到 provider
  - `/oauth/expired` 判断 Token 是否过期 - 返回 200 或 401
  - `/oauth/health` 检查健康状态，可通过头 获取版本
  - `/oauth/login` 中继账号密码登陆，使用 `grant_type=password`，通过 POST username 和 password
  - `/oauth/token` 返回当前 AccessToken
  - `/oauth/metrics` Prometheus 指标
- 注意
  - 无法配合 Traefik 的 ForwardAuth - [#672](https://github.com/louketo/louketo-proxy/issues/672) Support for Forward Auth/ External Auth
  - 无法配合 Nginx auth_request 使用 [#537](https://github.com/louketo/louketo-proxy/issues/537)
    - 因为 oidc 流程相对复杂，直接的 auth_request 难以实现
    - 可以使用 /expired

```bash
docker run -it --rm quay.io/louketo/louketo-proxy \
  --listen 127.0.0.1:8080 \
  --upstream-url http://127.0.0.1:80 \
  --discovery-url https://keycloak.example.com/auth/realms/<REALM_NAME> \
  --client-id <CLIENT_ID>
```

## FAQ

### oidc: JWT claims invalid: invalid claims, 'aud' claim and 'client_id' do not match, aud=account

- 依赖 OIDC 客户端问题 - 待升级
- 目前解决办法
  - 添加 mapper
  - mapper 类型 audience
  - 添加 客户端
- [#567](https://github.com/louketo/louketo-proxy/issues/567)

### no session found in request, redirecting for authorization

未获取到 token 信息

- 注意 `secure-cookie=false`
  - 如果没有设置，则默认是 true，导致 http 不会记录 cookie
- 通过排查前段是否有存储 cookie 来解决
