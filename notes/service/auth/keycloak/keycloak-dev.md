---
title: Keycloak 开发
tags:
  - Devlopment
---

# Keycloak 开发

- 参考
  - 短信
    - [gwallet/keycloak-sms-authenticator](https://github.com/gwallet/keycloak-sms-authenticator)
    - https://github.com/search?q=keycloak+sms
- https://github.com/keycloak/keycloak/blob/master/services/src/main/java/org/keycloak/authentication/authenticators/resetcred/ResetCredentialChooseUser.java
  - 微信
    - [jyqq163/keycloak-services-social-weixin](https://github.com/jyqq163/keycloak-services-social-weixin)
      - 最新 fork [zmlgit/keycloak-services-social-weixin](https://github.com/zmlgit/keycloak-services-social-weixin)
  - 企业微信
    - [kkzxak47/keycloak-services-social-wechatwork](https://github.com/kkzxak47/keycloak-services-social-wechatwork)
      - [使用企业微信登录 keycloak](https://www.kkzxak47.com/2019/07/30/使用企业微信登录keycloak)
  - 钉钉
- 注意
  - 获取到的 attributes 是 `Map<String, List<String>> attributes;`
    - user 会处理对象转数组
    - group 不会处理，需要提前处理好
- realm endpoints
  - /protocol/openid-connect/auth
  - /protocol/openid-connect/token
  - /protocol/openid-connect/logout
  - /protocol/openid-connect/login-status-iframe.html
  - /protocol/openid-connect/3p-cookies/step1.html
  - /protocol/openid-connect/registrations
  - /protocol/openid-connect/userinfo
  - /protocol/openid-connect/certs - JWK
- kc_idp_hint - 提示使用的 provider, 直接跳转

```bash
# 启动开发实例
# =========
# 由于启动脚本的 --debug 不支持 java 11 所以 debug 参数自行添加
docker run --rm -it \
  -p 8080:8080 -p 8097:8097 \
  -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin \
  -e JAVA_OPTS="-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=0.0.0.0:8097 -Xms64m -Xmx512m -XX:MetaspaceSize=96M -XX:MaxMetaspaceSize=256m -Djava.net.preferIPv4Stack=true -Djboss.modules.system.pkgs=org.jboss.byteman -Djava.awt.headless=true" \
  -v $PWD/deployments:/opt/jboss/keycloak/standalone/deployments \
  -v $PWD/themes/dev:/opt/jboss/keycloak/standalone/themes/dev \
  --name keycloak jboss/keycloak

# 自定义 identity 时添加自定义资源
docker cp templates/realm-identity-provider-wechat.html keycloak:/opt/jboss/keycloak/themes/base/admin/resources/partials
docker cp templates/realm-identity-provider-wechat-ext.html keycloak:/opt/jboss/keycloak/themes/base/admin/resources/partials

# 启动开发实例 - 主题开发
# =========
# 为了方便开发 - 可以映射整个 themes 目录
# 默认不能整个映射 themes 目录 - 因为目录下是有内容的 - 除非先拷贝出来

docker run --rm -it --name temp jboss/keycloak
docker cp temp:/opt/jboss/keycloak/themes .
docker rm -f temp

docker run --rm -it \
  -p 8080:8080 -p 8097:8097 \
  -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin \
  -e JAVA_OPTS="-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=0.0.0.0:8097 -Xms64m -Xmx512m -XX:MetaspaceSize=96M -XX:MaxMetaspaceSize=256m -Djava.net.preferIPv4Stack=true -Djboss.modules.system.pkgs=org.jboss.byteman -Djava.awt.headless=true" \
  -v $PWD/deployments:/opt/jboss/keycloak/standalone/deployments \
  -v $PWD/themes:/opt/jboss/keycloak/themes \
  --name keycloak jboss/keycloak
```

## token

- id_token
  - openid scope
  - identity information about the user is encoded right into the token and
  - the token can be definitively verified to prove that it hasn’t been tampered with.
  - auth_time - 实际授权时间
  - 用于获取用户 profile
  - 不会用于 API 请求
- access_token
  - bearer token

```json
{
  "access_token": "",
  "expires_in": 300,
  "refresh_expires_in": 1800,
  "refresh_token": "",
  "token_type": "Bearer",
  "id_token": "",
  "not-before-policy": 1623227705,
  "session_state": "UUID",
  "scope": "openid email profile"
}
```

## keycloak-services-social-wechatwork

- [kkzxak47/keycloak-services-social-wechatwork](https://github.com/kkzxak47/keycloak-services-social-wechatwork)
- 支持 qr 扫码登陆
- 支持 企业微信环境 直接跳转 - ua 包含 wxwork
- 默认添加 attributes
  - gender,mobile,status,enable,userid
- firstName 为邮箱前面部分
- lastName 为 name
- username 和 brokerUserId 均为 userid

## 服务端开发

- [开发文档](https://www.keycloak.org/docs/latest/server_development/)

## 客户端

- Java keycloak-admin-client

```java
Keycloak keycloak = Keycloak.getInstance(
    "http://localhost:8080/auth",
    "master",
    "admin",
    "password",
    "admin-cli");
RealmRepresentation realm = keycloak.realm("master").toRepresentation();
```

## 主题

- [主题开发](https://www.keycloak.org/docs/latest/server_development/#_themes)
- 主题类型
  - Account - 账号管理
  - Admin - 管理控制台
  - Email
  - Login - 登陆表单
  - Welcome - 欢迎页
- 主题包含
  - HTML 模板 - Freemaker
  - 图片
  - Message bundles - 翻译/I18N
  - CSS
  - 脚本
  - 主题属性
- 主题部署方式
  - 直接复制到 themes 目录
  - 通过打包为 jar 进行部署 - 推荐
- 主题包
  - `META-INF/keycloak-themes.json` - 包换主题列表和类型
  - 可以包含多个主题
  - 将主题包放到 `standalone/deployments/` 目录会自动加载

例如包内容

```
META-INF/keycloak-themes.json
theme/mytheme/login/theme.properties
theme/mytheme/login/login.ftl
theme/mytheme/login/resources/css/styles.css
theme/mytheme/login/resources/img/image.png
theme/mytheme/login/messages/messages_en.properties
theme/mytheme/email/messages/messages_en.properties
```

则属性为

```json
{
  "themes": [
    {
      "name": "mytheme",
      "types": ["login", "email"]
    }
  ]
}
```

## SPI

- 可以将 jar 放到 `standalone/deployments/` 进行热部署

### JavaScript Providers

- 用于管理员自定义特殊功能
- 支持的功能
  - OpenID Connect Script Protocol Mapper
  - OpenID Connect Script Authenticator
  - JavaScript Policy
- `-Dkeycloak.profile.feature.upload_scripts=enable` 开启控制台脚本上传

**文件结构**

```
META-INF/keycloak-scripts.json

my-script-authenticator.js
my-script-policy.js
my-script-mapper.js
```

**配置内容**

```json
{
  "authenticators": [
    {
      "name": "My Authenticator",
      "fileName": "my-authenticator.js",
      "description": "My Authenticator from a JS file"
    }
  ],
  "policies": [
    {
      "name": "My Policy",
      "fileName": "my-policy.js",
      "description": "My Policy from a JS file"
    }
  ],
  "mappers": [
    {
      "name": "My Mapper",
      "fileName": "my-mapper.js",
      "description": "My Mapper from a JS file"
    }
  ]
}
```

## Authentication SPI

- 鉴权

## Event Listener SPI

- 事件监听
- `org.keycloak.events.EventListenerProvider`

## User Storage SPI

- 用户数据库和授权信息
- 内建 LDAP 和 AD

## Vault SPI

- [Secure Credentials Store - Vault SPI](https://github.com/keycloak/keycloak-community/blob/master/design/secure-credentials-store.md)
  - 关于集成外部 Vault 的讨论
- 通过实现 `org.keycloak.vault.VaultProvider` SPI 可以做到和外部系统集成
- 用于隔离一些敏感信息

## Provider

- SPI
  - org.keycloak.broker.provider.IdentityProviderMapper - Provider 用户属性映射
    - preprocessFederatedIdentity
    - importNewUser - 导入用户回调
    - updateBrokeredUser - 更新用户回调
  - org.keycloak.broker.social.SocialIdentityProviderFactory
- AbstractOAuth2IdentityProvider
  - performLogin
    - createAuthorizationUrl - 创建授权跳转 URL
  - callback - 返回回调 Endpoint 处理 - 处理 GET 请求
    - 处理回调回来的 code, error, state 等
    - 返回 error, cancelled, authenticated
  - generateTokenRequest - 通过 code 生成第三方 token 的请求
  - getFederatedIdentity - 第三方换取 token 生成 context
    - BrokeredIdentityContext - 包含泛化后的身份信息
  - supportsExternalExchange - 默认 false，通过对外授权的设置为 true
  - exchangeExternal
    - extractIdentityFromProfile
      - 提取第三方返回的结果，生成 context
