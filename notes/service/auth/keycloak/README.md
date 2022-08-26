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
| KC_HTTP_PORT                | 8080     |
| KC_HTTP_RELATIVE_PATH       | /        |
| KC_HTTPS_PORT               | 8443     |
| KC_HTTPS_PROTOCOLS          | TLSv1.3  |
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
| dynamic-scopes           |
| map-storage              |

---

- https://www.keycloak.org/server/features
- https://www.keycloak.org/server/all-config
- https://www.keycloak.org/server/containers
- https://www.keycloak.org/server/all-provider-config
