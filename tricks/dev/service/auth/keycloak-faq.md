---
id: keycloak-faq
title: Keycloak 常见问题
---

# Keycloak FAQ
## 主域 Master Realm
* 主要用于超管进行系统管理
* 不要将 Master Realm 用于业务
* 可以在具体域下创建管理员，然后禁用 Master Realm
* 参考
  * [The Master Realm](https://www.keycloak.org/docs/latest/server_admin/#the-master-realm)

## login-status-iframe.html/init 异常
* https://stackoverflow.com/questions/55606931/keycloak-js-library-iframe-redirect-when-alreadylogged-in
* https://github.com/keycloak/keycloak/pull/6131

## invalid_grant: Code not valid

## invalid_client_credentials CODE_TO_TOKEN_ERROR
如果是纯前端，需要生成 Token

```bash
curl -L -X POST 'http://localhost:8080/auth/realms/whatever-realm/protocol/openid-connect/token' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'client_id=clientid-03' \
  --data-urlencode 'grant_type=password' \
  --data-urlencode 'client_secret=ec78c6bb-8339-4bed-9b1b-e973d27107dc' \
  --data-urlencode 'scope=openid' \
  --data-urlencode 'username=emuhamma' \
  --data-urlencode 'password=1'
```
