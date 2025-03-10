---
title: Auth
---
# Auth


- Authorization
- WWW-Authenticate
- 认证方式 - Auth Schema
  - Basic
  - Digest
  - Bearer
  - NTLM
  - Negotiate
    - 客户端和服务器协商使用何种验证方式，通常支持 Kerberos 或 NTLM

```
WWW-Authenticate: <auth-scheme> [realm="<realm>"] [<auth-param>...]
WWW-Authenticate: Basic realm="My Server", charset="UTF-8"
WWW-Authenticate: Digest realm="My Server", nonce="随机生成的唯一字符串", opaque="可选的opaque值", algorithm=MD5, qop="auth"
WWW-Authenticate: Bearer realm="example"
```

# FAQ

## 什么是 HTTP Auth challenge

1. 客户端请求资源，不携带认证信息
2. 服务端返回 401 Unauthorized，携带 WWW-Authenticate 头
3. 客户端收到 401，弹出认证框，用户输入用户名密码
4. 客户端再次请求资源，携带认证信息
