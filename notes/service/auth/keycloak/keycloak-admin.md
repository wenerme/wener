---
title: Keycloak Admin
---

# Keycloak Admin

## Import & Export

- https://github.com/keycloak/keycloak-documentation/blob/master/server_admin/topics/export-import.adoc

:::tip

- 管理控制台不能导出 user 只能命令行导出
- 管理控制台导出数据包含无效的 secret - 导入需要注意 - 最好使用 keycloak-config-cli

:::

```bash
# 导出到目录
bin/standalone.sh -Dkeycloak.migration.action=export -Dkeycloak.migration.provider=dir -Dkeycloak.migration.file=export
# 导出到单文件
bin/standalone.sh -Dkeycloak.migration.action=export -Dkeycloak.migration.provider=singleFile -Dkeycloak.migration.file=export.json

# 导入
bin/standalone.sh -Dkeycloak.migration.action=import \
-Dkeycloak.migration.provider=singleFile -Dkeycloak.migration.file=export.json \
-Dkeycloak.migration.strategy=OVERWRITE_EXISTING
```

| prop                                   | desc                                                  |
| -------------------------------------- | ----------------------------------------------------- |
| keycloak.migration.action              | import,export                                         |
| keycloak.migration.realmName           |
| keycloak.migration.provider            | dir,singleFile                                        |
| keycloak.migration.file                |
| keycloak.migration.usersExportStrategy | DIFFERENT_FILES<br/>SKIP<br/>REALM_FILE<br/>SAME_FILE |
| keycloak.migration.usersPerFile        |50
| keycloak.migration.strategy            | IGNORE_EXISTING<br/>OVERWRITE_EXISTING                |
| keycloak.import                        | 直接导入，可逗号分隔多个，忽略 `keycloak.migration.*` |

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
