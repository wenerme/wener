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
