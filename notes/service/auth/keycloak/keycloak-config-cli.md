---
title: keycloak-config-cli
---

# keycloak-config-cli

- [adorsys/keycloak-config-cli](https://github.com/adorsys/keycloak-config-cli) 是什么？
  - Keycloak 命令行配置导入
  - Apache-2.0, Java
- 参考
  - 参考 [import-files](https://github.com/adorsys/keycloak-config-cli/tree/main/src/test/resources/import-files)

:::tip

- 因为 Keycloak 可以管理账户，但账户通常会允许修改，一次不适合使用类似 terraform 之类的管理。
- 导入功能非常适合 realm 初始化 或 一次性导入
- docker 镜像提供匹配 kc 的版本 - 例如 v4.2.0-15.0.1 或者 latest-15.0.1

:::

```bash
docker run \
  -e KEYCLOAK_AVAILABILITYCHECK_ENABLED=true \
  -e KEYCLOAK_AVAILABILITYCHECK_TIMEOUT=120s \
  -e IMPORT_PATH=/config \
  -e IMPORT_FORCE=false \
  --env-file kc.env \
  -v $PWD/keycloak-conf:/config \
  adorsys/keycloak-config-cli:latest
```

**kc.env**

```ini
KEYCLOAK_URL=https://kc.example.com/auth
KEYCLOAK_USER=admin
KEYCLOAK_PASSWORD=password
```

```yaml
#
enabled: true

# 域基本信息
realm: demo

displayName: Demo
displayNameHtml: "<h2>DemoSSO</h2>"

sslRequired: "external"
loginWithEmailAllowed: true

internationalizationEnabled: true
supportedLocales:
- zh-CN
- en
defaultLocale: zh-CN


# 角色
roles:
  # 域角色
  realm:
    - name: admin
      description: 管理
      attributes:
        'example.com/admin':
          - true

# 用户
users:
  - username: wener
    firstName: Chen
    lastName: Wener
    email: example@example.com
    enabled: true
    emailVerified: true
    attributes:
      jobNumber: 1000
    credentials:
      - type: password
        value: 123456
        temporary: true
        # 支持设置初始密码
        userLabel: initial
    # 角色
    realmRoles:
      - admin

clientScopes:

clients:
- clientId: demo-web

defaultDefaultClientScopes:
- role_list
- profile
- email
- roles
- web-origins


```
