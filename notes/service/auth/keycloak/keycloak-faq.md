---
id: keycloak-faq
title: Keycloak 常见问题
---

# Keycloak FAQ

## 默认 mapper 字段

| scope       | mapper                | field                              | to                              |
| ----------- | --------------------- | ---------------------------------- | ------------------------------- |
| roles       | realm roles           | realm_access.roles                 | User Realm Role                 |
| ^           | client roles          | resource_access.${client_id}.roles | User Client Role                |
| web-origins | allowed web origins   | allowed-origins                    | Allowed Web Origins             |
| phone       | phone number          | phone_number                       | Attribute - phoneNumber         |
| ^           | phone number verified | phone_number_verified              | Attribute - phoneNumberVerified |
| email       | email                 | email                              | Property - phoneNumber          |
| ^           | email verified        | email_verified                     | Property - emailVerified        |

## 服务账号 - Service Account

- 客户端直接申请获取 Token，然后使用申请到的 Token 访问服务
- 不涉及用户和浏览器交互
- 用于服务之间鉴权，例如 服务端 API 授权

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

## login-status-iframe.html/init 403 异常

- 确保开启 Implicit Flow Enabled
- 确保 client_id  正确
  - 如果 client_id 错了会 403，但没有任何地方提示 client_id 错误
  - 非常难排查

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

- 如果使用了 federation，修改密码可能被禁止

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

## Access to XMLHttpRequest at keycloak from origin 'http://127.0.0.1:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

- 逻辑上来说是需要配置 Client 的 Web Origins
- 配置后还是出现
- curl 测试正常
- 浏览器没有发起 OPTIONS 请求
- 如果只是前端使用，一定选择 **public**

```bash
# 直接测试有返回
curl \
--verbose \
--request OPTIONS \
https://keycloak \
--header 'Origin: http://127.0.0.1:3000' \
--header 'Access-Control-Request-Headers: Origin, Accept, Content-Type' \
--header 'Access-Control-Request-Method: POST'
```

```
date: Fri, 15 Jan 2021 15:41:37 GMT
content-length: 0
access-control-allow-headers: Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization
x-xss-protection: 1; mode=block
referrer-policy: no-referrer
access-control-allow-origin: http://127.0.0.1:3000
access-control-allow-credentials: true
strict-transport-security: max-age=15724800; includeSubDomains
x-content-type-options: nosniff
access-control-allow-methods: POST, OPTIONS
access-control-max-age: 3600
```

## JWKs 没有签名的公钥

- 不是所有算法都有
- 可以设置为有 Public key 的算法

## 域名映射域

没有很好的办法

- 参考
  - [One domain per realm, disabling unrelated keycloak pages](https://keycloak.discourse.group/t/1833)

## Unexpected error when authenticating with identity provider

可开启 login 日志排查具体错误

如果对方没出问题，检查配置。

发现 开启 back-channel logout 且设置为 basic auth 解决了问题。
