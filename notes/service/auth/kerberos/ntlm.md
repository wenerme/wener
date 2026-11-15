---
title: NTLM
---

# NTLM

NTLM 是 Microsoft 生态中的 challenge-response 认证协议，常见于需要兼容遗留 Windows 服务的 HTTP 场景。新系统通常优先使用 Kerberos、现代 SSO 或 OAuth/OIDC。

## HTTP 流程

HTTP 交互通常是多轮的：

```http
HTTP/1.1 401 Unauthorized
WWW-Authenticate: NTLM
```

客户端先发送 negotiate message，服务端返回 challenge，客户端再发送 authenticate message：

```http
Authorization: NTLM <base64-negotiate-or-authenticate-message>
```

`NTLM` Header 后面的内容不是用户名密码的 Base64，而是 NTLM 协议消息。

## 限制

NTLMv2 比旧版 NTLM 安全，但仍有协议层面的限制：

- 通常需要保持连接亲和性；负载均衡器不能随意把同一认证流程分发到不同后端。
- 代理需要正确处理 401 challenge 和多轮请求。
- 不能像 Bearer token 那样简单复制一个 Header 到另一个请求。
- 使用 HTTPS 保护传输，避免凭据交换和请求内容被窃听或篡改。
- 应避免把 NTLM 暴露到不受信任网络。

## 与 Kerberos 的关系

在 HTTP 中，客户端常通过 `Negotiate` 和 SPNEGO 协商底层机制：

```text
Negotiate
  └── SPNEGO
      ├── Kerberos（通常优先）
      └── NTLM（兼容性回退）
```

NTLM 和 Kerberos 是两种不同的认证协议。`Negotiate` 是 HTTP 层的承载和协商入口，不代表底层一定使用 Kerberos。

## 适用场景

NTLM 主要用于：

- 遗留 IIS 或 Windows HTTP 服务。
- 无法配置 Kerberos SPN 的内部系统。
- 需要与旧版 Windows 客户端兼容的场景。

如果客户端和服务端都在 Active Directory 域内，并且可以正确配置 SPN、keytab 或服务账号，通常应优先使用 Kerberos。

