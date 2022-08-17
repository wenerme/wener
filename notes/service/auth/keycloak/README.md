---
title: Keycloak
---

# Keycloak

- [keycloak/keycloak](https://github.com/keycloak/keycloak)
  - Apache-2.0, Java, Quarkus
  - 通过 jgroups 实现集群
- 参考
  - [Use mobile numbers for user authentication in Keycloak](https://developers.redhat.com/blog/2020/10/23/use-mobile-numbers-for-user-authentication-in-keycloak)
  - [mrparkers/terraform-provider-keycloak](https://github.com/mrparkers/terraform-provider-keycloak)
    Terraform 管理 Keycloak
  - [adorsys/keycloak-config-cli](https://github.com/adorsys/keycloak-config-cli)
    命令行配置导入
- Endpoints - Keycloak 17+ 无 `/auth` 前缀
  - /
  - /console
  - `/realms/{REALM}/protocol/openid-connect/auth`
  - `/admin/{REALM}/console`
  - `/realms/{REALM}/.well-known/openid-configuration`

```bash
docker run --rm -it \
  -p 8080:8080 \
  -e KEYCLOAK_ADMIN=admin \
  -e KEYCLOAK_ADMIN_PASSWORD=admin \
  quay.io/keycloak/keycloak:19.0.1 start-dev
```

| env                         | default  |
| --------------------------- | -------- | ---------------------------------------- |
| KC_DB                       | dev-file |
| KC_DB_URL                   |
| KC_DB_USERNAME              |
| KC_DB_PASSWORD              |
| KC_FEATURES                 |
| KC_FEATURES_DISABLED        |
| KC_HOSTNAME                 |
| KC_HEALTH_ENABLED           | false    |
| KC_METRICS_ENABLED          | false    |
| KC_HTTPS_KEY_STORE_PASSWORD | password |
| KC_HTTPS_KEY_STORE_FILE     |
| KC_HOSTNAME_ADMIN           |
| KC_HTTP_ENABLED             | false    | 0.0.0.0:8080                             |
| KC_HTTP_RELATIVE_PATH       | /        |
| KC_HTTPS_PORT               | 8443     |
| KC_PROXY                    | none     | none, edge, reencrypt, passthrough       |
| KC_VAULT                    |          | file, hashicorp                          |
| KC_VAULT_DIR                |
| KC_LOG_LEVEL                | info     |
| KC_CACHE                    |          | ispn                                     |
| KC_CACHE_STACK              | udp      | tcp, udp, kubernetes, ec2, azure, google |
| KC_CACHE_CONFIG_FILE        |          | cache-ispn.xml                           |

```bash
bin/kc.sh start-dev

# 可在 build 镜像时执行 - 大概几秒 - start 和 start-dev 都会执行
bin/kc.sh build

# --optimized 告诉 kc 已经 build
# 要求所有配置相同
# 默认情况会先 build
bin/kc.sh start --optimized
```

- KC_DB_URL_HOST -> --db-url-host -> db-url-host
  - 环境变量 - flag - 配置项
- 配置文件同 flag 无 `--` - `--config-file,-cf`
  - conf/keycloak.conf
  - 配置可引用环境变量 `db-url-host=${MY_DB_HOST:mydb}`
- KC_METRICS_ENABLED
  - /health
  - /health/ready
  - /health/live
- KC_METRICS_ENABLED
  - /metrics
- KC_FEATURES - authorization, account2, account-api, admin-fine-grained-authz, admin2, docker, impersonation, openshift-integration, scripts, token-exchange, web-authn, client-policies, ciba, map-storage, par, declarative-user-profile, dynamic-scopes, client-secret-rotation, step-up-authentication, recovery-codes, update-email, preview
- KC_DB - dev-file, dev-mem, mariadb, mssql, mysql, oracle, postgres

| feature                | note                                                              |
| ---------------------- | ----------------------------------------------------------------- |
| account-api            | Account Management REST API                                       |
| account2               | New Account Management Console                                    |
| admin2                 | New Admin Console                                                 |
| authorization          | Authorization Service                                             |
| ciba                   | OpenID Connect Client Initiated Backchannel Authentication (CIBA) |
| client-policies        | Client configuration policies                                     |
| impersonation          | Ability for admins to impersonate users                           |
| par                    | OAuth 2.0 Pushed Authorization Requests (PAR)                     |
| step-up-authentication | Step-up Authentication                                            |
| web-authn              | W3C Web Authentication (WebAuthn)                                 |
| docker                 | Docker Registry protocol                                          |

- 默认关闭
  - docker

| preview                  | note                                              |
| ------------------------ | ------------------------------------------------- |
| admin-fine-grained-authz | Fine-Grained Admin Permissions                    |
| client-secret-rotation   | Client Secret Rotation                            |
| declarative-user-profile | Configure user profiles using a declarative style |
| openshift-integration    | Extension to enable securing OpenShift            |
| recovery-codes           | Recovery codes                                    |
| scripts                  | Write custom authenticators using JavaScript      |
| token-exchange           | Token Exchange Service                            |
| update-email             | Update Email Action                               |

---

- https://www.keycloak.org/server/features
- https://www.keycloak.org/server/all-config
- https://www.keycloak.org/server/containers
- https://www.keycloak.org/server/all-provider-config

## LDAP

### group-ldap-mapper

- 分组映射
- 注意
  - 不能有同名组，会导致无法同步回 Keycloak
  - LDAP 无法识别同名组

| 选项                                 | 翻译                  | 说明                                                                      |
| ------------------------------------ | --------------------- | ------------------------------------------------------------------------- |
| LDAP Groups DN                       | 分组 DN               | 例如 `ou=groups,dc=wener,dc=me`                                           |
| Group Name LDAP Attribute            | LDAP 属性 -> 分组名字 |
| Group Object Classes                 | 对象类                | `groupOfNames` `groups`                                                   |
| Preserve Group Inheritance           | 保留层级              | 如果不保留，则同步后都是顶级<br/>如果保留，存在相同名字分组会导致同步异常 |
| Ignore Missing Groups                | 忽略缺少分组          |
| Membership LDAP Attribute            | 表示成员的 LDAP 属性  | 例如 `member`                                                             |
| Membership Attribute Type            | 成员属性类型          | DN UID                                                                    |
| Membership User LDAP Attribute       | 成员用户 LDAP 属性    | UID 模式则使用该字段表示，一般为 `uid`                                    |
| LDAP Filter                          | 过滤条件              |
| Mode                                 | 模式                  | LDAP_ONLY,IMPORT,READ_ONLY                                                |
| User Groups Retrieve Strategy        | 查询策略              |
| Member-Of LDAP Attribute             | memberOf 属性         |
| Mapped Group Attributes              | 映射属性              | 例如 `description,ou,o`                                                   |
| Drop non-existing groups during sync | 同步删除不存在分组    | LDAP 到 Keycloak 时候                                                     |
