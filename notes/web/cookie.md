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
- `__Host-`
  - 必须 Secure 属性 - 必须 HTTPS
  - 没有 Domain - 不允许跨域
  - 路径必须为 `/`
- `__Secure-`
  - 必须 Secure 属性 - 必须 HTTPS
  - 可以有 Domain - 允许跨域
  - 没有路径限制
- `Partitioned`
  - 必须 Secure
  - 必须 SameSite=None
  - 相同的 Cookie 在不同的站点上下文中不会互相影响
  - 用于第三方环境中，防止跟踪和跨站点攻击
  - 作用和优势
    - 防止跨站点跟踪
    - 增强安全性
    - 限制第三方 Cookie 的影响

```
Set-Cookie: my_cookie=value; SameSite=None; Secure; Partitioned
```

| 属性名      | 描述                                              | 示例值                                  | 备注                                                        |
| ----------- | ------------------------------------------------- | --------------------------------------- | ----------------------------------------------------------- |
| Name        | 名称                                              | session_id                              | 必须                                                        |
| Value       | 值                                                | abc123                                  | 必须                                                        |
| Expires     | 过期时间                                          | Tue, 19 Jan 2038 03:14:07 GMT           | 不设置则为会话 Cookie                                       |
| Max-Age     | 有效期（秒）                                      | 3600                                    | 与 Expires 互斥，优先级高于 Expires                         |
| Domain      | 适用的域名                                        | example.com                             | 默认为创建该 Cookie 的域名                                  |
| Path        | 适用的路径                                        | /                                       | 默认为创建该 Cookie 的路径                                  |
| Secure      | 仅通过 HTTPS 传输                                 | Secure                                  | 只在 HTTPS 上有效                                           |
| HttpOnly    | 不能通过 JavaScript 访问                          | HttpOnly                                | 提升安全性，防止 XSS 攻击                                   |
| SameSite    | 限制跨站点请求时发送 Cookie 的方式                | Lax, Strict, None                       | Lax 和 Strict 提升安全性，None 需要配合 Secure 属性         |
| `__Host-`   | 前缀, 强制 Secure 属性, 路径为 `/`, 且没有 Domain | \_\_Host-session=abc123; Secure; Path=/ | 提高安全性，确保 Cookie 在主域及其所有路径上有效            |
| `__Secure-` | 前缀, 强制 Secure 属性                            | \_\_Secure-session=abc123; Secure       | 提高安全性，允许跨子域使用                                  |
| Partitioned | 指定 Cookie 在不同的上下文中隔离                  | Partitioned                             | 必须配合 SameSite=None 和 Secure 属性使用，提升隐私和安全性 |
