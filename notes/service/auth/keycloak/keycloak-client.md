---
title: Client
---

# Keycloak Client

- Initial Access Token
  - 用于创建 client
  - `POST /realms/<realm>/clients-registrations/default`

## Client Glossary

- Client authentication
  - ON - confidential access type - 有 Secret
  - OFF - public access type
- Authorization - 细粒度 authz

**Authentication flow**

| term                                 | for                                                                     |
| ------------------------------------ | ----------------------------------------------------------------------- |
| Standard flow                        | Authorization Code Flow, redirect **with** authorization code, 基于跳转 |
| Direct access grants                 | Resource Owner Password Credentials Grant, 允许使用账号密码登录         |
| Implicit flow                        | redirect **without** authorization code                                 |
| OAuth 2.0 Device Authorization Grant | client 能力有限，不能打开浏览器                                         |
| OIDC CIBA Grant                      | via external authentication device                                      |

## Resource

- Type
  - 可以考虑使用 urn
    - `urn:<NID>:<NSS>`
- Decision strategy 是指在进行权限决策时采用的策略
  - Affirmative：只要有一个授权策略允许访问，就允许访问。这是默认的策略，也是最常用的策略。
  - Unanimous：需要所有的授权策略都允许访问，才允许访问。
  - Consensus：需要大多数的授权策略都允许访问，才允许访问。这个策略比较适用于多个授权策略之间存在互斥的情况下。
- grant_type `urn:ietf:params:oauth:grant-type:uma-ticket`
- UMA - User-Managed Access

## token/introspect

```http
POST https://keycloak/realms/wener/protocol/openid-connect/token/introspect
Content-Type: application/x-www-form-urlencoded

client_id=wener&client_secret=&token=
```

```json
{
  "active": false
}
```

- Introspecting a Requesting Party Token

## service account

- 映射为用户 `service-account-<client_id>`
