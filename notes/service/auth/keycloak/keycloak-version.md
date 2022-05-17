---
title: Keycloak Version
tags:
  - Version
---

# Keycloak Version

| version       | date       |
| ------------- | ---------- |
| [Keycloak 18] | 2022-04-22 |
| [Keycloak 17] |            |
| [Keycloak 16] |            |
| [Keycloak 15] |            |
| [Keycloak 14] |            |
| [Keycloak 13] |            |
| [Keycloak 12] |            |
| [Keycloak 11] |            |
| [Keycloak 10] |            |

[keycloak 18]: #keycloak-18
[keycloak 17]: #keycloak-17
[keycloak 16]: #keycloak-16
[keycloak 15]: #keycloak-15
[keycloak 14]: #keycloak-14
[keycloak 13]: #keycloak-13
[keycloak 12]: #keycloak-12
[keycloak 11]: #keycloak-11
[keycloak 10]: #keycloak-10


- [Release Notes](https://www.keycloak.org/docs/latest/release_notes/)
- [keycloak/kc-sig-fapi](https://github.com/keycloak/kc-sig-fapi)


## Keycloak 18

- 新的 预览版 Operator - https://www.keycloak.org/operator/installation
  - v20 的时候停止支持旧的 Operator，切换为新的 Operator
  - [keycloak/keycloak-operator](https://github.com/keycloak/keycloak-operator)
- 新的 预览版 Admin Console - 19 变为默认
- preview
  - Client secret rotation
  - 2FA Recovery Codes
- 完整实现 OpenID Connect Logout
- WebAuthn id-less authentication
- Session limits
- https://www.keycloak.org/2022/04/keycloak-1800-released
- https://www.keycloak.org/guides

## Keycloak 17

- 正式支持 Quarkus
  - WildFly 支持到 2022-06
  - [Migrating to Quarkus distribution](https://www.keycloak.org/migration/migrating-to-quarkus)
    - 不能再动态加载 provider
- Quarkus 2.7.0

## Keycloak 16

- [Wildfly 25] - Elytron
  - 配置方式发生变化
- Quarkus 2.5.3

[wildfly 25]: https://www.wildfly.org/news/2021/10/05/WildFly25-Final-Released/

## Keycloak 15

- Financial-grade API/FAPI 增强, FAPI CIBA and Open Banking Brasil

**Keycloak 15.1**

- [OpenID Connect Front-Channel Logout 1.0](https://openid.net/specs/openid-connect-frontchannel-1_0.html)

## Keycloak 14

- Client Policies and Financial-grade API/FAPI

## Keycloak 13

- OAuth 2.0 Device Authorization Grant - RFC 8628
- OpenID Connect Client Initiated Backchannel Authentication - CIBA
- PKCE for identity brokering

## Keycloak 12

- Keycloak.X powered by Quarkus
- OpenID Connect Back-Channel Logout
- Gatekeeper EOL - louketo-proxy

## Keycloak 11

- LDAPv3 password modify operation
- Namespace support for LDAP group mapper

## Keycloak 10

- Identity Brokering Sync Mode
- Client Session Timeout for OpenID Connect / OAuth 2.0
- OAuth 2.0 Token Revocation - RFC 7009
