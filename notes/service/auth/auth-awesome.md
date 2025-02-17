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
- [babelouest/glewlwyd](https://github.com/babelouest/glewlwyd)
- [longguikeji/arkid](https://github.com/longguikeji/arkid)
  - AGPLv3, Python
- [bullteam/zeus-admin](https://github.com/bullteam/zeus-admin)
  - Apache-2.0, Go+Vue
- [OpenIdentityPlatform/OpenAM](https://github.com/OpenIdentityPlatform/OpenAM)
  - Java
- [kanidm/kanidm](https://github.com/kanidm/kanidm)
  - MPL-2.0, Rust
- [authelia/authelia](https://github.com/authelia/authelia)
  - Apache-2.0, Go
  - SSO Multi-Factor portal for web apps
- OpenID Provider (OP), Identity Provider (IDP)
  - 实现了 OpenID Connect 和 OAuth 2.0
- Relying Party (RP)
  - 应用或网站
  - 将用户授权转交给 IdP
- [logto-io/logto](https://github.com/logto-io/logto)
  - MPLv2, TS
  - open-source alternative to Auth0
- [eicrud/eicrud](https://github.com/eicrud/eicrud)
  - MIT, TS
  - CRUD/Authorization framework based on NestJS
- Service

## Client

> Client/Web/Library/SDK/Integration

- Framework
  - [nextauthjs/next-auth](https://github.com/nextauthjs/next-auth)
    - ISC, TS
    - Authentication for the Web
- [auth0/node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
  - MIT, JS
  - jsonwebtoken
- [panva/jose](https://github.com/panva/jose)
  - MIT, TS, JS
  - JWA, JWS, JWE, JWT, JWK, JWKS
- passport
- [authts/oidc-client-ts](https://github.com/authts/oidc-client-ts)
  - Apache-2.0, TS
- [panva/node-openid-client](https://github.com/panva/node-openid-client)
  - OpenID Certified™ Relying Party

## Design

- Google Cloud
  - [Policies](https://cloud.google.com/iam/docs/policies)
  - [IAM permissions reference](https://cloud.google.com/iam/docs/permissions-reference)
  - [资源名称](https://cloud.google.com/apis/design/resource_names)
    - `//{api}/{collection-id}/{resource-id}(/{collection-id}/{resource-id})*`
    - `//mail.googleapis.com/users/name@example.com/settings/customFrom`
    - 无传输协议

## Authentication

> AuthN/Authentication/OAuth2 Server/IdP/IAM

- https://oauth.net/code/
- [zitadel/zitadel](https://github.com/zitadel/zitadel)
  - Apache-2.0, Go, TS
  - by CAOS from Switzerland
  - 提供 gRPC 接口
  - CockroachDB/PostgreSQL
  - [zitadel vs keycloak](https://zitadel.ch/blog/zitadel-vs-keycloak)
- [goauthentik/authentik](https://github.com/goauthentik/authentik)
  - GPL-3.0, Python, TS
- [node-oauth/node-oauth2-server](https://github.com/node-oauth/node-oauth2-server)
  - MIT, JS
  - npm:@node-oauth/oauth2-server
  - successor to ~~[oauthjs/node-oauth2-server](https://github.com/oauthjs/node-oauth2-server)~~
- [boxyhq/jackson](https://github.com/boxyhq/jackson)
  - Apache-2.0, Typescript
  - supporting SAML and OpenID Connect
  - Directory Sync via the SCIM 2.0 protocol
- [panva/node-oidc-provider](https://github.com/panva/node-oidc-provider)
  - MIT, NodeJS, JS
  - [panva/oauth4webapi](https://github.com/panva/oauth4webapi)
    - MIT, TS
    - OAuth 2 / OpenID Connect
- [dexidp/dex](https://github.com/dexidp/dex)
  - Apache-2.0, Go
  - OpenID Connect Identity (OIDC) and OAuth 2.0 Provider with Pluggable Connectors
- [ory/hydra](https://github.com/ory/hydra)

  - Apache-2.0, Go
  - OAuth2 Server and OpenID Certified™ OpenID Connect Provider written in Go

- [keycloak/keycloak](https://github.com/keycloak/keycloak)
  - Apache-2.0, Java
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
- [ory/kratos](./kratos.md)

## Authorization

> AuthZ/Authorization/Policy/ACL/RBAC/ABAC

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
- [stalniy/casl](https://github.com/stalniy/casl)
  - Isomorphic Authorization JavaScript library
  - @casl/ability - 20.5kB/7kB - @ucast/core, @ucast/js, @ucast/mongo
    - @ucast - 条件转换
  - @casl/react - 2kB/1kB

**Zanzibar**

- [authzed/spicedb](./authz/spicedb.md)
  - Apache-2.0, Go
  - AuthZ as a Service
  - gRPC API+REST
  - 支持 pg, mysql, cockroachdb, [hashicorp/go-memdb](https://github.com/hashicorp/go-memdb)
  - [HN](https://news.ycombinator.com/item?id=28709886)
- [aserto-dev/topaz](https://github.com/aserto-dev/topaz)
  - Apache-2.0, Go
  - Open Policy Agent
  - BoltDB
- [Permify/permify](https://github.com/Permify/permify)
  - Apache-2.0, Go
  - 通过 CDC 同步信息
  - [why-decouple-authorizations](https://www.permify.co/post/why-decouple-authorizations)
- [openfga/openfga](https://github.com/openfga/openfga)
  - Apache-2.0, Go
  - by Auth0 FGA
    - https://dashboard.fga.dev/
  - PostgreSQL 14, MySQL 8, SQLite
- [ory/keto](https://github.com/ory/keto)
  - Apache-2.0, Go
- [josephglanville/zanzibar-pg](https://github.com/josephglanville/zanzibar-pg)
- [authorizer-tech/access-controller](https://github.com/authorizer-tech/access-controller)
- 参考
  - RBAC - 角色固定
  - ReBAC - 基于关系
  - ABAC - 基于属性，任意属性
  - HBAC - Host Based Access Control
  - [What is Zanzibar?](https://authzed.com/blog/what-is-zanzibar/)
  - https://www.osohq.com/learn/google-zanzibar

## Proxy

> API 网关通常支持 auth、authz

- ForwardAuth
  - [oauth2-proxy/oauth2-proxy](https://github.com/oauth2-proxy/oauth2-proxy)
    - 也支持作为反向代理
  - [vouch/vouch-proxy](https://github.com/vouch/vouch-proxy)
- [pomerium/pomerium](https://github.com/pomerium/pomerium)
  - Apache-2.0, Go
  - Pomerium is an identity-aware access proxy.
  - Enterprise
    - 管理界面
    - API
    - Session

## Reference

- Google [Authentication/Authorization for Enterprise SPI Guide](https://support.google.com/gsa/answer/6329233)
- [How to Design a Permissions Framework](https://itnext.io/7c054a009c52)
