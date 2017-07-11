# Pac4J

## Tips
* [pac4j/pac4j](https://github.com/pac4j/pac4j)
  * is an easy and powerful security engine for Java to authenticate users, get their profiles and manage authorizations in order to secure web applications.
* 认证机制/Authentication
  * OAuth (Facebook, Twitter, Google...), SAML, CAS, OpenID Connect, HTTP, OpenID, Google App Engine,Kerberos (SPNEGO/Negotiate)
  * LDAP, SQL, JWT, MongoDB, CouchDB, IP address, REST API
* 授权机制/Authorization
  * Roles/permissions, Anonymous/remember-me/(fully) authenticated, Profile type or attribute
  * CORS - CSRF - Security headers - IP address, HTTP method


## Notes
* `Client`
  * 用于验证用户凭证
  * 分为直接的和间接的
  * `OAuth20Client`
    * `OAuth20Configuration`
      * 配置
    * `OAuthProfileDefinition`
      * 定义
* `Credentials`
  * 基础凭证
* `UserProfile`
  * 用户信息
* `WebContext`
  * HTTP 上下文
* `CredentialsExtractor`
  * 从 WebContext 中取出 Credentials
* `InitializableWebObject`
  * 可以使用 `WebContext` 初始化的对象
* 引擎核心
  * `CallbackLogic`
    * 回调处理逻辑
  * `SecurityLogic`
    * 保护一个 URL 的安全处理逻辑
  * `LogoutLogic`
    * 退出登录逻辑
* `Authenticator`
  * 用于验证凭证是否合法
* `ProfileService`
  * 用于对 `Profile` 进行持久化和管理
  * 往往和 `Authenticator` 一起实现
  * 主要实现包括
    * ldap, sql, mongo, couch, ip, rest, jwt
  * 持久化的验证都主要是针对 `UsernamePasswordCredentials`
  * 密码验证时会使用 `PasswordEncoder` 对密码进行验证
