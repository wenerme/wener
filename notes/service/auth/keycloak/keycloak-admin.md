---
title: Keycloak Admin
---

# Keycloak Admin

## Identity Provider

- oidc v1 使用 Authorization Code Flow
- 导入配置 `<root>/auth/realms/{realm-name}/.well-known/openid-configuration`
- `?kc_idp_hint=github` 客户端 hint 使用的 provider
- 保存 Token 后获取方式 `/auth/realms/{realm}/broker/{provider_alias}/token`

```js
keycloak.createLoginUrl({
  idpHint: 'github',
});
```

| conf              | kc `<root>/auth/realms/<realm>`   |
| ----------------- | --------------------------------- |
| Authorization URL | /protocol/openid-connect/auth     |
| Token URL         | /protocol/openid-connect/token    |
| Logout URL        | /protocol/openid-connect/logout   |
| User Info URL     | /protocol/openid-connect/userinfo |
| Issuer            | .                                 |
| JWKS URL          | /protocol/openid-connect/certs    |
