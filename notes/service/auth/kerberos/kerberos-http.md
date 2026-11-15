---
title: Kerberos HTTP Authentication
---

# Kerberos HTTP Authentication

Kerberos 是基于票据的身份认证协议。HTTP 客户端通常通过 `Negotiate` scheme 承载 GSSAPI / SPNEGO token，而不是直接使用一个名为 `Kerberos` 的常见 HTTP scheme。

## Negotiate

```http
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Negotiate
```

客户端随后发送：

```http
Authorization: Negotiate <base64-encoded-SPNEGO-token>
```

SPNEGO 负责在客户端和服务端之间协商机制，优先使用 Kerberos，也可能根据双方能力回退到 NTLM。相关概念：

| 名称 | 角色 |
| --- | --- |
| Kerberos | 基于票据的认证协议和身份基础设施 |
| SPNEGO | 协商 GSSAPI 认证机制的协议 |
| GSSAPI | 应用使用安全认证机制的通用编程接口 |
| Negotiate | HTTP 中承载 SPNEGO/GSSAPI token 的认证 scheme |

## HTTP Service Principal

使用 Kerberos 时，HTTP 服务通常需要注册 Service Principal Name（SPN）：

```text
HTTP/api.example.com@EXAMPLE.COM
```

关键条件包括：

- 客户端和服务端位于同一个 Kerberos realm，或 realm 之间配置了信任关系。
- 客户端已经取得 TGT，并能取得目标 HTTP 服务的 service ticket。
- DNS、主机名、SPN 和反向代理转发的 Host 名称一致。
- 服务端拥有对应 principal 的 keytab，并限制 keytab 权限。
- 客户端和 KDC 时间同步，时钟偏差不能超过 Kerberos 配置的允许范围。

## 反向代理

反向代理场景尤其要检查浏览器访问的 hostname 是否就是 SPN 中的 hostname。代理把请求转给后端时，后端通常仍根据外部 hostname 获取或校验服务票据。

还需要注意：

- 认证过程可能包含多轮 401 challenge，代理必须完整转发 `WWW-Authenticate` 和 `Authorization`。
- 负载均衡器应保持认证流程的连接或会话亲和性，具体取决于服务端实现。
- 代理修改 Host、scheme 或路径时，可能导致 SPN 或服务票据不匹配。

## 适用场景

Kerberos HTTP 常用于域环境内的 SSO，例如浏览器访问 IIS、HTTP API、Hadoop、JupyterHub 或内部管理平台。它通常部署在受控网络内；跨边界访问一般使用 HTTPS 加 VPN、SSO 网关或其他联邦身份协议。

## 关系

```text
HTTP Authentication scheme: Negotiate
            │
            └── SPNEGO negotiation
                    ├── Kerberos（通常优先）
                    └── NTLM（兼容性回退）
```

`WWW-Authenticate: Kerberos` 不是最常见的浏览器互操作形式；实际部署一般使用 `WWW-Authenticate: Negotiate`，让 SPNEGO 协商 Kerberos 或 NTLM。

