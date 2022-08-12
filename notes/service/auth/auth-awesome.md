---
title: Auth Awesome
tags:
  - Awesome
---

# Auth Awesome

|                ver | date       |
| -----------------: | ---------- |
|       Kerberos 4.0 | 1980s      |
|             LDAPv3 | 1997       |
|       Kerberos 5.0 | 1993       |
|           SAML 1.0 | 2002       |
|           SAML 1.1 | 2003       |
|           SAML 2.0 | 2005       |
|         OpenID 1.0 | 2006       |
|         OpenID 2.0 | 2007       |
|          OAuth 1.0 | 2010       |
|          OAuth 2.0 | 2012       |
| OpenID Connect 1.0 | 2014       |
|   WebAuthn Level 1 | 2019-03-04 |

- IAM - Identity and Access Management
- [kdeldycke/awesome-iam](https://github.com/kdeldycke/awesome-iam)
- [keepassxreboot/keepassxc](https://github.com/keepassxreboot/keepassxc)

## Authorization

- Google Cloud
  - [Policies](https://cloud.google.com/iam/docs/policies)
  - [IAM permissions reference](https://cloud.google.com/iam/docs/permissions-reference)
  - [资源名称](https://cloud.google.com/apis/design/resource_names)
    - `//{api}/{collection-id}/{resource-id}(/{collection-id}/{resource-id})*`
    - `//mail.googleapis.com/users/name@example.com/settings/customFrom`
    - 无传输协议

## Authorization

- [casbin](./authz/casbin.md)
- [ory/oathkeeper](https://github.com/ory/oathkeeper)
  - Identity & Access Proxy
- [osohq/oso](https://github.com/osohq/oso)
  - Apache-2.0, Rust+Python
  - 引擎开源/Policy - Rust 实现
    - 语言库: Node.js, Python, Go, Rust, Ruby, Java
  - 商业化服务平台
  - 参考
    - https://www.osohq.com/academy

**Zanzibar**

- [authzed/spicedb](./authz/spicedb.md)
  - Apache-2.0, Go
  - AuthZ as a Service
  - gRPC API+REST
  - 支持 pg, mysql, cockroachdb, [hashicorp/go-memdb](https://github.com/hashicorp/go-memdb)
  - [HN](https://news.ycombinator.com/item?id=28709886)
- [Permify/permify](https://github.com/Permify/permify)
  - Apache-2.0, Go
  - 通过 CDC 同步信息
  - [why-decouple-authorizations](https://www.permify.co/post/why-decouple-authorizations)
- [openfga/openfga](https://github.com/openfga/openfga)
  - Apache-2.0, Go
  - by Auth0 FGA
    - https://dashboard.fga.dev/
- [ory/keto](https://github.com/ory/keto)
  - Apache-2.0, Go
- [josephglanville/zanzibar-pg](https://github.com/josephglanville/zanzibar-pg)
- [authorizer-tech/access-controller](https://github.com/authorizer-tech/access-controller)
- 参考
  - RBAC - 角色固定
  - ReBAC - 基于关系
  - ABAC - 基于熟悉，任意属性
  - [What is Zanzibar?](https://authzed.com/blog/what-is-zanzibar/)
  - https://www.osohq.com/learn/google-zanzibar

## IAM

- [keycloak/keycloak](https://github.com/keycloak/keycloak)
  - Apache-2.0, Java
- [zitadel/zitadel](https://github.com/zitadel/zitadel)
  - Apache-2.0, Go
  - by CAOS from Switzerland
  - 提供 gRPC 接口
  - 依赖 CockroachDB
  - [zitadel vs keycloak](https://zitadel.ch/blog/zitadel-vs-keycloak)
  - https://zitadel.ch/v2 WIP
- [kanidm/kanidm](https://github.com/kanidm/kanidm)
  - MPL-2.0, Rust
  - SSH/PAM/RADIUS/Web OAuth
  - [oauth design](https://github.com/kanidm/kanidm/blob/master/designs/oauth.rst)
- [compare open-source-sso](https://gist.github.com/bmaupin/6878fae9abcb63ef43f8ac9b9de8fafd)
- OpenIAM
- Apache Syncope
- FreeIPA
  - Python
- WSO2
- [apereo/cas](https://github.com/apereo/cas) - Central Authentication Service
- Okta
- FusionAuth
- LDAP/GSSAPI
- Kerberos
  - not use public key crypto
- [supertokens/supertokens-core](https://github.com/supertokens/supertokens-core)
  - Apache-2.0, Java
- [goauthentik/authentik](https://github.com/goauthentik/authentik)
  - GPL-3.0, Python
- [ory/kratos](./kratos.md)

## Reference

- Google [Authentication/Authorization for Enterprise SPI Guide](https://support.google.com/gsa/answer/6329233)
- [How to Design a Permissions Framework](https://itnext.io/7c054a009c52)
