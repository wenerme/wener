---
title: oidc-client
---

# oidc-client

- [authts/oidc-client-ts](https://github.com/authts/oidc-client-ts)
  - fork of [IdentityModel/oidc-client-js](https://github.com/IdentityModel/oidc-client-js)
  - react [authts/react-oidc-context](https://github.com/authts/react-oidc-context)
    - 核心组件 AuthProvider
    - 简单使用可以，复杂逻辑建议自己封装
- OidcClient
  - OIDC/OAuth2
  - StateStore 默认为 window.localStorage
- UserManager
  - 默认 Store - `new WebStorageStateStore({ store:window.sessionStorage, prefix: "oidc." })`
    - prefix - `oidc.`
    - user - `user:${this.settings.authority}:${this.settings.client_id}`
