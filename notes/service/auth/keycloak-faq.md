---
id: keycloak-faq
title: Keycloak 常见问题
---

# Keycloak FAQ

## 服务账号 - Service Account
* 客户端直接申请获取 Token，然后使用申请到的 Token 访问服务
* 不涉及用户和浏览器交互
* 用于服务之间鉴权，例如 服务端 API 授权

https://medium.com/@mihirrajdixit/getting-started-with-service-accounts-in-keycloak-c8f6798a0675
great for administrative tasks executed on behalf of a service instead of individual user.

https://planet.jboss.org/post/service_accounts_support_in_keycloak
allows to authenticate the client application with Keycloak server and retrieve the access token dedicated to this application.

https://www.keycloak.org/docs/latest/server_admin/index.html#_service_accounts


## 主域 - Master Realm

- 主要用于超管进行系统管理
- 不要将 Master Realm 用于业务
- 可以在具体域下创建管理员，然后禁用 Master Realm
- 参考
  - [The Master Realm](https://www.keycloak.org/docs/latest/server_admin/#the-master-realm)

## login-status-iframe.html/init 异常

- https://stackoverflow.com/questions/55606931/keycloak-js-library-iframe-redirect-when-alreadylogged-in
- https://github.com/keycloak/keycloak/pull/6131

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

## Could not modify attribute for DN
* 如果使用了 federation，修改密码可能被禁止

## Found an Attribute element with duplicated Name

- 使用 SAML 的时候 Nextcloud 要设置角色列表返回单个角色
- (Realm) -> Client Scopes -> role_list (saml) -> Mappers tab -> role list -> 'Single Role Attribute'.

## IDP parameter for the UID (username) not found. Possible parameters are: ["Role"]

- Nextcloud + SAML 出现
- 在 Keycloak Client Mappers 添加 Mapper

| Option                    | Value         |
| ------------------------- | ------------- |
| Name                      | username      |
| Mapper Type               | User Property |
| Property                  | username      |
| Friendly Name             |
| SAML Attribute Name       | username      |
| SAML Attribute NameFormat | Basic         |
