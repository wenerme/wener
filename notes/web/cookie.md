---
title: Cookie
---

# Cookie

- [rfc6265](https://datatracker.ietf.org/doc/html/rfc6265)
  HTTP State Management Mechanism
  - [Set-Cookie Header](https://datatracker.ietf.org/doc/html/rfc6265#section-5.2)
- [Same-Site Cookies](https://datatracker.ietf.org/doc/html/draft-ietf-httpbis-cookie-same-site-00)
  - SameSite
    - 请求时只有 匹配站点的 cookie 会被发送
    - 默认不会随 top-level navigations 发送
  - SameSite=Strict
    - 与 same-site 请求一起发送
  - SameSite=Lax
    - same-site, cross-site
- Access-Control-Allow-Credentials: true
  - 服务端接受 cookie
- withCredentials: true
  - 客户端请求带上 cookie
