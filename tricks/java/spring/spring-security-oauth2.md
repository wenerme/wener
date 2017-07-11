# Spring Security OAuth2

## Tips
* [spring-projects/spring-security-oauth](https://github.com/spring-projects/spring-security-oauth)
* Access Token 默认失效时间为 12h
* Refresh Token 默认失效时间为 30d

## Notes
* OAuth2
  * `@EnableAuthorizationServer` / AS / 授权服务
    * `AuthorizationServerEndpointsConfiguration`
    * `AuthorizationServerSecurityConfiguration`
      * `ClientDetailsServiceConfiguration`
        * `ClientDetailsServiceConfigurer`
      * `AuthorizationServerConfigurer`
      * `AuthorizationServerSecurityConfigurer`
  * `@EnableOAuth2Client` / Client / 客户端
    * 主要用于简化发起 OAuth2 的请求
  * `@EnableResourceServer` / RS / 资源服务
    * `ResourceServerConfiguration`
      * `ResourceServerConfigurer`
* `DefaultTokenServices`
  * 实现了核心的几个接口
  * Token 存储交由 `TokenStore`
* `AuthorizationServerEndpointsConfigurer`
  * 核心配置对象, 所有的相关接口和配置
* `AuthorizationServerConfigurer`
  * OAUth2 Authorization Server 配置接口
* `ApprovalStore`
  * 存储用户批准的信息
  * 每个用户,每个客户端
* `OAuth2RequestFactory`
  * 管理 OAuth2 请求
* `ClientDetails`
  * OAuth2 的客户端信息
  * `ClientDetailsService`
    * 获取客户端信息
  * `ClientRegistrationService`
    * 添加修改和删除客户端信息
* `OAuth2SecurityExpressionMethods`
  * 表达式中的 `oauth2` 方法
* `OAuth2AccessToken`
  * `TokenEnhancer`
    * 对 Token 对象进行增强
    * 例如实现 JWT
  * `TokenStore`
    * 存储 OAuth2 Token
  * `ConsumerTokenServices`
    * 用于回收 Token
  * `TokenGranter`
    * 对应 OAuth2 中的不同授权类型
    * `AuthorizationCodeServices`
      * 生成和存储 authorization_code
    * 账号密码的授权会使用 Spring Security 中的 `AuthenticationManager` 来判断是否授权成功
