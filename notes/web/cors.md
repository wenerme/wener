---
title: CORS
---

# CORS

- fetch cookie 跨域需要请求时设置 credentials: include
  - 要求服务端返回 `Access-Control-Allow-Credentials: true`
  - 否则不会 set-cookie
- 参考
  - mdn [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- `Allow-Credentials: true`
  - 会传递 Cookie, 会接受 Set-Cookie
  - 注意 CSRF
  - 不支持返回 `Allow-Origin: *`
  - 必须列举所有 origin
- `Access-Control-Allow-Origin: string`
  - 指定允许访问资源的外部域名（Origin）。不能为 `*` 时允许携带 Cookie，需明确指定域名。
- `Access-Control-Allow-Methods: string[]`
  - 指定允许的 HTTP 方法 - `['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH']`
- `Access-Control-Allow-Headers: string[]`
  - 指定允许的自定义请求头字段。
- `Access-Control-Max-Age: number`
  - 预检请求（Preflight）结果的缓存时间（秒），减少重复预检。
- `Access-Control-Allow-Credentials: boolean`
  - 是否允许携带 Cookie 等凭证信息。
  - 为 `true` 时，`Allow-Origin` 不能为 `*`。
- `Access-Control-Expose-Headers: string[]`
  - 指定哪些响应头可以暴露给前端 JavaScript 代码访问。
- 默认允许头
  - Cache-Control
  - Content-Language
  - Content-Type
  - Expires
  - Last-Modified
  - Pragma

```yaml
# 请求
Access-Control-Request-Headers: authorization
Access-Control-Request-Method: GET

# 响应
Access-Control-Allow-Headers: authorization
Access-Control-Allow-Methods: POST,GET
Access-Control-Allow-Origin: http://127.0.0.1:3000
# 默认 5s、最大 86400=24h
Access-Control-Max-Age: 86400
```

- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Max-Age

**Preflight 请求**

```
Origin:
Access-Control-Request-Method:
Access-Control-Request-Headers: POST
```

**Preflight 响应**

```http
Vary: Origin
Vary: Access-Control-Request-Method
Vary: Access-Control-Request-Headers
Access-Control-Allow-Origin: http://127.0.0.1:3000
Access-Control-Allow-Methods: POST
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 300
Access-Control-Expose-Headers: X-Page,X-Page-Size,X-Total,X-Total-Pages
```
