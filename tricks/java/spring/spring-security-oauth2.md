---
id: security-oauth2
title: Spring Security OAuth2
---

# Spring Security OAuth2

## Tips
* OAuth2 [rfc6749](https://tools.ietf.org/html/rfc6749)
* [Spring Cloud: Feign SPDY/HTTP2](https://jmnarloch.wordpress.com/2015/10/07/spring-cloud-feign-spdyhttp2/)
* [Spring Cloud: Feign OAuth2 authentication](https://jmnarloch.wordpress.com/2015/10/14/spring-cloud-feign-oauth2-authentication/)
* Spring [OAuth 2 Developers Guide](http://projects.spring.io/spring-security-oauth/docs/oauth2.html)
* [spring-security-oauth-jwt](http://www.baeldung.com/spring-security-oauth-jwt)
* [spring-projects/spring-security-oauth](https://github.com/spring-projects/spring-security-oauth)
* [Using JWT with Spring Security OAuth](http://www.baeldung.com/spring-security-oauth-jwt)
  * AS 颁发 JWT
  * RS 接收 JWT
* [Requiring User Login](https://www.oauth.com/oauth2-servers/authorization/requiring-user-login)
* Access Token 默认失效时间为 12h
* Refresh Token 默认失效时间为 30d


```bash
curl acme:acmesecret@localhost:8080/oauth/token -d grant_type=client_credentials
curl acme:acmesecret@localhost:8080/oauth/token -d grant_type=password -d username=user -d password=...

http://localhost:8080/oauth/authorize?response_type=code&client_id=cli&scope=read&state=yes&redirect_uri=http://localhost:8080/cb
http://localhost:8080/oauth/authorize?response_type=token&client_id=cli&scope=read&state=yes&redirect_uri=http://localhost:8080/cb
```

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
  * 实现了核心的几个接口 `AuthorizationServerTokenServices`, `ResourceServerTokenServices`, `ConsumerTokenServices`
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
    * 例如实现 JWT 添加自定义 Claims
    * `TokenEnhancerChain` 实现一组增强
  * `TokenStore`
    * 存储 OAuth2 Token
  * `ConsumerTokenServices`
    * 用于回收 Token
  * `TokenGranter`
    * 对应 OAuth2 中的不同授权类型
    * `AuthorizationCodeServices`
      * 生成和存储 authorization_code
    * 账号密码的授权会使用 Spring Security 中的 `AuthenticationManager` 来判断是否授权成功


* `TokenGranter`
  * 生成不同类型的 Token
  * `ImplicitTokenGranter`
    * implicit
  * `RefreshTokenGranter`
    * refresh_token
  * `AuthorizationCodeTokenGranter`
    * authorization_code
  * `ResourceOwnerPasswordTokenGranter`
    * password
  * `ClientCredentialsTokenGranter`
    * client_credentials

AuthorizationEndpoint
  /oauth2/authorize


AuthorizationEndpoint
  /oauth2/token
  
/oauth/confirm_access
/oauth/error
