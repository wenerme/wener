---
id: oauth
title: OAuth
---

# OAuth

## Tips
* [JWT 验证](https://www.jsonwebtoken.io/)
* [Auth 2.0 vs JWT](http://www.seedbox.com/en/blog/2015/06/05/oauth-2-vs-json-web-tokens-comment-securiser-un-api/)
* [OAuth and OpenID Connect for Microservices](https://www.youtube.com/watch?v=BdKmZ7mPNns)
  * OAuth is a scalable delegation protocol
  * OAuth 4 actors
    * Resource Owner (RO)
      * User
    * Authorization Server (AS)
    * Client
      * App/Backend
    * Resource Server (RS)
      * Gmail
  * Client -> AS -> RO(浏览器) -Token-> Client -> RS -> AS -> Client
  * 客户端对用户无感知, 主要用于基于客户端的方式访问用户资源
  * 当有后端服务的时候流程会有所不同
    * 后端服务需要对用户资源发起请求
    * 会对用户有感知
    * 建立了信任关系
    * 基于 Token 进行资源请求
    * Token 例如 JWT, 有用户信息
  * 基于引用的令牌
    * 例如 UUID
    * 不包含任何用户信息
    * 用于外部
  * 基于值的令牌
    * 例如 JWT
    * 包含了所有必要的信息
    * 用于内部
  * 在微服务中由网关将基于引用的令牌转换为基于值的令牌在服务内部使用
* OpenID Connect / OIDC
  * 是在 OAuth2 之上的协议
* OAuth2 中会有一个 Token
  * JWT 可以当做是其中一种
* API 中的的两个主要问题
  * 访问控制
    * 认证/用户标示
    * 授权/权限
  * 数据
    * 文档
    * 一致格式
    * 有效的服务
* 实现
  * OAuth2 [Code](https://oauth.net/code/)
    * 服务端
    * 客户端
    * 代理
  * [OAuth.io](https://oauth.io/)
    * https://github.com/oauth-io
  * [Auth0](https://auth0.com/)
  


## OAuth 2.0
* [Auth 2](http://oauth.net/2/)
* [OAuth vs OAuth2](http://stackoverflow.com/q/4113934/1870054)
* https://tools.ietf.org/html/rfc6749  The OAuth 2.0 Authorization Framework
https://tools.ietf.org/html/rfc8252 OAuth 2.0 for Native Apps
* 是一套认证框架
* 规范复杂且庞大
* 主要用于对外提供用户认证服务
* 参考
  * Google [OAuth Playground](https://developers.google.com/oauthplayground/)
    * https://developers.google.com/accounts/docs/OAuth2Login
  * 豆瓣 [OAuth2](https://developers.douban.com/wiki/?title=oauth2)
    * https://www.douban.com/service/auth2/auth
  * 微信公众号 [获取 access_token](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140183)
    * 使用的 Client credentials grant
  * 蚂蚁金服 [用户授权](https://doc.open.alipay.com/docs/doc.htm?treeId=193&articleId=105656&docType=1)
    * https://openauth.alipay.com/oauth2/publicAppAuthorize.htm
      * app_id
      * scope
        * auth_user 获取用户信息、网站支付宝登录
        * auth_base 用户信息授权
        * auth_ecard 商户会员卡
        * auth_invoice_info 支付宝闪电开票
        * auth_puc_charge 生活缴费
      * redirect_uri
      * state
    * 返回 auth_code, auth_code -> access_token,userId
  * 腾讯 [OAuth2](http://wiki.open.qq.com/wiki/mobile/OAuth2.0%E5%BC%80%E5%8F%91%E6%96%87%E6%A1%A3)
    * [使用Implicit_Grant方式获取Access_Token](http://wiki.open.qq.com/wiki/mobile/使用Implicit_Grant方式获取Access_Token)
    * https://graph.qq.com/oauth2.0/authorize
      * response_type=token
      * client_id
      * redirect_uri
      * scope
        * 默认为 get_user_info
        * [API列表](http://wiki.open.qq.com/wiki/mobile/API列表)
  * 微博 [OAuth2](http://open.weibo.com/wiki/%E6%8E%88%E6%9D%83%E6%9C%BA%E5%88%B6%E8%AF%B4%E6%98%8E)
    * https://api.weibo.com/oauth2/authorize
      * client_id
      * redirect_uri
      * scope
        * all
        * email
        * direct_messages_write
        	 * 私信发送接口
        * direct_messages_read
        	 * 私信读取接口
        * invitation_write
          * 邀请发送接口
        * friendships_groups_read
          * 好友分组读取接口组
        * friendships_groups_write
        	 * 好友分组写入接口组
        * statuses_to_me_read
          * 定向微博读取接口组
        * follow_app_official_microblog
          * 关注应用官方微博
      * state
      * display
        * 授权页面的终端类型
          * default	默认的授权页面，适用于web浏览器。
          * mobile	移动终端的授权页面，适用于支持html5的手机。注：使用此版授权页请用 https://open.weibo.cn/oauth2/authorize 授权接口
          * wap	wap版授权页面，适用于非智能手机。
          * client	客户端版本授权页面，适用于PC桌面应用。
          * apponweibo	默认的站内应用授权页，授权后不返回access_token，只刷新站内应用父框架。
      * forcelogin
        * 是否强制重新登录
      * language
        * 授权页面语言
  * 企业微信
    * [网页授权](https://work.weixin.qq.com/api/doc#10028)
      * Authorisation Code Grant
      * https://open.weixin.qq.com/connect/oauth2/authorize
        * appid
          * 企业的 CorpID
        * redirect_uri
        * response_type=code
        * scope
          * snsapi_base,基础信息
          * snsapi_userinfo,详细信息,不包含手机邮箱
          * snsapi_privateinfo,手动授权
        * agentid
          * 可选, 企业应用 ID
          * 当 scope 为非 snsapi_base 时必填
        * state
        * #wechat_redirect
          * 终端使用此参数判断是否需要带上身份信息
      * 返回 code, 使用 code 获取 user_ticket, 使用 user_ticket 获取用户信息

__强项__

* 快速开发
* 只需要少量的代码即可实现
* 减少管理

__限制__

* 授权交由第三方

### 授权类型
* [Guide To OAuth 2.0 Grants](https://alexbilbie.com/guide-to-oauth-2-grants/)
* Authorisation Code Grant
  * 类似于使用 Facebook 或者 Google 账号登陆
  * 流程#1
    * 客户端重定向用户到 AS
      * response_type=code
      * client_id
      * redirect_uri
        * 该参数可选
        * 指定成功后的重定向地址
        * 如果不指定一般则使用预设的
      * scope
        * 空格分割的请求 scope
      * state
        * CSRF token
        * 该参数可选, 但建议尽量使用, 用于确认是否是正确的回调信息
    * 用户登录,并批准申请的权限
    * 重定向到用户指定的地址
      * code
        * 授权码
      * state
        * 之前的 state, 验证和发起请求前的是否匹配
  * 流程#2
    * 客户端对 AS 发起 POST 请求
      * grant_type=authorization_code
      * client_id
      * client_secret
      * redirect_uri
      * code
        * 之前重定向时拿到的授权码
    * 服务器返回 JSON
      * token_type
        * 一般为 Bearer
      * expires_in
        * access_token 的 ttl
      * access_token
      * refresh_token
        * 如果请求了
        * 用于刷新 access_token 的 token
* Implicit grant
  * 类似于授权码授权
  * 主要用于基于用户代理客户端的模式(例如: 单页应用),客户端不应持有 client_secret 的情况,因为客户端存储不安全
  * 不同于 authorization_code 返回授权码再去请求 access_token 的形式, implicit 直接返回 access_token
  * 流程
    * 客户端重定向用户到 AS
      * response_type=token
      * client_id
      * redirect_uri
      * scope
      * state
    * 重定向到指定的地址
      * token_type=Bearer
      * expires_in
      * access_token
      * state
* Resource owner credentials grant
  * 主要用于可信任的客户端授权
  * 流程
    * 客户端向用户索要授权凭证,一般为账号密码
    * 客户端发送 POST 请求到 AS
      * grant_type=password
      * client_id
      * client_secret
      * scope
      * username
      * password
    * AS 返回 JSON
      * token_type=Bearer
      * expires_in
      * access_token
      * refresh_token
* Client credentials grant
  * OAuth2 中最简单的授权
  * 主要用于后端到后端的授权, 不需要使用用户权限的情况
  * 流程
    * 客户端发送 POST 到 AS
      * grant_type=client_credentials
      * client_id
      * client_secret
      * scope
    * AS 返回 JSON
      * token_type=Bearer
      * expires_in
      * access_token
* Refresh token grant
  * 授权令牌最终会失效, 如果客户端请求了 refresh_token, 则可以在不需要重定向用户的前提下更新授权令牌
  * 流程
    * 客户端发送一个 POST 请求到 AS
      * grant_type=refresh_token
      * refresh_token
      * client_id
      * client_secret
      * scope
        * 可选
        * 如果没有则使用之前的
        * 可以设置为之前 scope 的子集
    * AS 返回 JSON
      * token_type=Bearer
      * expires_in
      * access_token
      * refresh_token
* Extension Grants
  * 客户端可以指定 grant_type 为 AS 定义的绝对 URI 来使用自定义的授权方式
    * grant_type=urn:ietf:params:oauth:grant-type:saml2-bearer
      * 使用 OAuth-SMAL2

## OICD
* OpenID Connect
* 有发现机制
  * https://accounts.google.com/.well-known/openid-configuration

## JWT
* [JWT](http://jwt.io/)
* https://mkjwk.org/
  * 生成 JWK
* 是一套认证协议
* 协议简单且易于实现
* 主要用于分布式的无状态接口调用
* 国际标准 [RFC 7519](https://tools.ietf.org/html/rfc7519)

* [jws rfc](https://tools.ietf.org/html/rfc7515)
* [jwe rfc](https://tools.ietf.org/html/rfc7516)
* [jwt rfc](https://tools.ietf.org/html/rfc7519)

__强项__

* 快速开发
* 不需要 Cookie
* JSON 相对友好
* 不依赖社交登陆
* 概念简单易于理解

__限制__
* Token 有大小限制
* Token 不能被回收
* 需要 Token 有个较短的失效周期


字段|全称|含义
----|----|----
iss | Issuer | 发出者
sub | Subject | 一般为用户 id
aud | Audience | 接受者
exp | Expiration time | 失效时间
nbf | Not before | 在这之前不生效
iat | Issued at | 发出时间
jti | JWT ID
typ | Type | 类型,由用户扩展

常见算法

* HMAC + SHA256
* RSASSA-PKCS1-v1_5 + SHA256
* ECDSA + P-256 + SHA256
* RSA vs ECDSA
  * 同等安全度下
    * RSA 更长, 签名验证更快
    * ECDSA 更短, 生成签名和密钥时快得多

__示例__

```js
{
  "iss": "http://example.org",
  "aud": "http://example.com",
  "iat": 1356999524,
  "nbf": 1357000000
}
```

```js
{
  "iss": "https://oidc.my.com",
  "x5t": "AAAAAAAAAAAAAAAAAAAA"
  "typ": "JWT"
  "alg": "RS265"
}

{
  "sub": "wener"
  "name": "Wener"
  "email": "wener@wener.me"
  "phone_number": "1852159826715"
  "aud": "https://otheremail.com"
  "iss": "https://oidc.my.com"
  "nbf": 1497868409096
  "jti": "ANpzy7AyyANx0Cn8WMP5N7bG3E8awOhB"
  "exp": 1497868509096
  "nbf": 1497868409096
}
```

## PAST
* https://github.com/paragonie/past
* Platform-Agnostic Security Tokens
* 目的
  * JWT 的 alg 不太安全, 因为有一些加密算法安全性本身不高, 甚至可以使用 none


```
v2.local.wvbu1sWg-Td2nDxn7vyAVAEzTGqtzn_zfzaiGjAkQzfa5-l2PaAK1QA0IZjrWdKP8Xqi7DHHlu6F8E5BXoarTSfmrgkMEOeiasRhuZ3GWDUtmD2K027gjgalkjMZJE7lNfkOSdKr65Fo0_8.UGFyYWdvbiBJbml0aWF0aXZlIEVudGVycHJpc2Vz
```

* 版本: v2
* 目的: local
* 内容
```
c2f6eed6c5a0f937769c3c67eefc805401334c6aadce7ff37f36a21a30244337
dae7e9763da00ad500342198eb59d28ff17aa2ec31c796ee85f04e415e86ab4d
27e6ae090c10e7a26ac461b99dc658352d983d8ad36ee08e06a5923319244ee5
35f90e49d2abeb9168d3ff
```
* Nonce: c2f6eed6c5a0f937769c3c67eefc805401334c6aadce7ff3
* Authentication tag: 3319244ee535f90e49d2abeb9168d3ff
* 解码后的内容
```json
{
  "data": "this is a signed message",
  "exp": "2039-01-01T00:00:00"
}
```
* Key: `707172737475767778797a7b7c7d7e7f808182838485868788898a8b8c8d8e8f`

## GitHub
* https://developer.github.com/apps/building-oauth-apps/

```bash
curl -H "Authorization: token OAUTH-TOKEN" https://api.github.com/users/wenerme -I
```

```
HTTP/1.1 401 Unauthorized
Date: Tue, 02 Jan 2018 05:08:34 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 93
Server: GitHub.com
Status: 401 Unauthorized
X-GitHub-Media-Type: github.v3; format=json
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 58
X-RateLimit-Reset: 1514873228
Access-Control-Expose-Headers: ETag, Link, Retry-After, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval
Access-Control-Allow-Origin: *
Content-Security-Policy: default-src 'none'
Strict-Transport-Security: max-age=31536000; includeSubdomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: deny
X-XSS-Protection: 1; mode=block
X-Runtime-rack: 0.011490
X-GitHub-Request-Id: C390:1E82:97CD8EB:B8B4F1D:5A4B13D1
```

## Auth0
### NOTES
* 客户端
  * 名字
  * 域名
  * Client ID
  * Client Secret
  * 描述
  * Logo - 150x150
  * 类型
    * 原生
    * 非交互应用
    * 一般网页应用
    * 单页应用
  * Token Endpoint Authentication Method
    * Basic
    * Post
  * Allowed Callback URLs
  * Allowed Web Origins
  * Allowed Logout URLs
  * Allowed Origins (CORS)
  * JWT Expiration = 36000
  * Use Auth0 instead of the IdP to do Single Sign On
  * 高级设置
    * 应用元数据
    * 移动设置
      * IOS
        * Team ID
        * App bundle identifier
      * Android
        * App Package Name
        * Key Hashes
    * OAuth
    * Allowed APPs / APIs
    * JsonWebToken Signature Algorithm
      * HS256
      * RS256
    * OIDC 适配
    * Cross-Origin Verification Fallback
    * 授权类型
      * Implicit
      * Authorization Code
      * Refresh Token
      * Client Credentials
      * Password
      * MFA
      * Legacy: RO
      * Legacy: RO jwt-bearer
      * Legacy: Delegation Refresh Token
      * Legacy: Delegation ID Token
      * Legacy: Access Token
    * WS-Federation
    * Certificates
    * Endpoints
      * OAuth
        * OAuth Authorization URL https://wener.auth0.com/authorize
        * OAuth Token URL https://wener.auth0.com/oauth/token
        * OAuth User Info URL https://wener.auth0.com/userinfo
        * OpenID Configuration https://wener.auth0.com/.well-known/openid-configuration
        * JSON Web Key Set https://wener.auth0.com/.well-known/jwks.json
      * SAML
        * SAML Protocol URL https://wener.auth0.com/samlp/<ClientID>
        * SAML Metadata URL https://wener.auth0.com/samlp/metadata/<ClientID>
      * WS-Federation
        * WsFederation Metadata URL https://wener.auth0.com/wsfed/<ClientID>/FederationMetadata/2007-06/FederationMetadata.xml
        * WsFederation Sign-in URL https://wener.auth0.com/wsfed/<ClientID>
* 链接
  * 实际存储用户
  * 提供
      * 用户导入
    * 社交
    * 企业
* 用户

* 数据库
  * 用户策略
    * 是否需要用户名
      * 长度限制
    * 是否允许注册
  * 密码策略
    * 密码强度
      * Low
        * 6 位
      * Fair
        * 8 位
        * 至少包含 小写字母, 大写字母, 数字
      * Good
        * 8 位
        * 至少包含三类: 小写, 大写, 数字, 特殊字符
      * Excellent
        * 10 位
        * 至少包含三类: 小写, 大写, 数字, 特殊字符
        * 最多 128
        * 连续相同字符不能超过两位
    * 密码历史
      * 历史大小
        * 最多 24
    * 密码字典
    * 个人数据
      * 不允许使用包含在其他字段的信息
  * 自定义数据库
    * 模板
      * ASP.NET Membership Provider MVC3 - Universal Providers
      * ASP.NET Membership Provider MVC4 - Simple Membership
      * MongoDB
      * MySQL
      * Oracle
      * PostgreSQL
      * SqlServer
      * Windows Azure SQL Database
      * Request with Basic Auth
      * Storm Path
    * 操作
      * 登陆 - email, password
      * 创建 - user{password, email}
      * 验证 - email
        * 注册, 邮箱验证, 密码重置, 删除用户
      * 修改密码 - email, newPassword
      * 获取用户 - email
        * {user_id, nickname, email, name, given_name, family_name}
      * 删除 - id
    * 使用 bcrypt/10 加密
    * nodejs
    * 配置 SQL 语句
    * 支持配置属性
* 社交
  * Google
    * https://console.developers.google.com/projectselector/apis/credentials
    * Client ID
    * Client Secret
    * Allowed Mobile Client IDs
    * Attributes
      * Basic Profile
        * 邮箱和邮箱验证标识
      * Extended Profile
        * 必选
    * 权限
      * Contacts
      * Blogger
      * Calendar
      * Gmail
      * Google+
      * Orkut
      * Picasa Web
      * Tasks
      * YouTube
      * Adsense Management
      * Google Affiliate Network
      * Analytics
      * Google Books
      * Google Cloud Storage
      * Content API for Shopping
      * Chrome Web Store
      * Document List
      * Google Drive
      * Google Drive Files
      * Latitude (Best)
      * Latitude (City)
      * Moderator
      * Sites
      * Spreadsheets
      * URL Shortener
      * Webmaster Tools
      * Coordinate
      * Coordinate (read only)
  * Facebook
  * GitHub
    * Client ID
    * Client Secret
    * Attributes
      * Basic Profile
      * Email address
    * 权限
  * 新浪微博
    * App Key
    * App Secret
    * Attributes
      * Basic Profile
      * Email, 默认未选中
    * 权限
      * direct_messages_write
      * direct_messages_read
      * friendships_groups_write
      * friendships_groups_read
      * invitation_write
  * 百度
    * API Key
    * Secret Key
    * Attributes
      * Basic Profile
  * Twitter
    * https://apps.twitter.com/
    * Consumer Key
    * Consumer Secret
    * Attributes
      * Basic Profile
        * name, picture, signup date, twitter description, language, location, twitter screen name, time zone, URL, timezone and verified account. 
        * 目前不提供用户邮箱
* 企业
  * AD/LDAP
  * ADFS
  * IP
  * PingFederate
  * SAMLP Identity Provider
  * SharePoint Apps
  * Google Apps
  * Office 365
  * Microsoft Azure AD
* 无密码
  * 短信
    * Twilio SID
    * Twilio AuthToken
    * SMS Source
      * Copilot
        * Copilot SID
      * From
        * 好嘛
    * 语法
      * Liquid
      * Markdown
  * 邮箱
    * 语法
      * HTML+(Liquid)[https://github.com/Shopify/liquid]
      * Markdown
    * 主题
    * 内容
    * 授权参数
    * OTP Expiry
    * OTP 长度
    * 禁用注册
  * TouchID
* 托管页面
  * 登陆
  * 密码重置
* 邮件
  * 模板
    * 验证
    * 欢迎
    * 注册
    * 修改密码
    * 密码修改提示
    * 禁用提示
  * 提供商
    * MANDRILL
    * AWS
    * SendGrid
    * SMTP
      * From
      * Host
      * Port
      * Username
      * Password
* Logs
  * 概况
    * 时间
    * 描述
    * 日期
    * 链接
    * 客户端
    * 应用
    * 用户
  * 元数据
  * 上下文数据
    * 应该为 Referer

__元数据__
```json
{
  "date": "2018-01-02T07:59:06.836Z",
  "type": "f",
  "description": "the connection was disabled",
  "connection": "wener",
  "connection_id": "con_lXyPhu5jR9BjYNg6",
  "client_id": "bm4susnnbqtysjSoTuWMqgqhkFQa8dBg",
  "ip": "47.89.37.179",
  "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36",
  "details": {
    "body": {},
    "qs": {
      "client_id": "bm4susnnbqtysjSoTuWMqgqhkFQa8dBg",
      "response_type": "code",
      "connection": "wener",
      "prompt": "consent",
      "redirect_uri": "https://manage.auth0.com/tester/callback?connection=wener",
      "scope": "openid profile"
    },
    "connection": "wener",
    "error": {
      "message": "the connection was disabled",
      "oauthError": "invalid_request",
      "type": "request-error"
    }
  },
  "log_id": "49574419589858254662358307566469418022270857965582942242"
}
```

__上下文数据__
```json
{
  "body": {},
  "qs": {
    "client_id": "bm4susnnbqtysjSoTuWMqgqhkFQa8dBg",
    "response_type": "code",
    "connection": "wener",
    "prompt": "consent",
    "redirect_uri": "https://manage.auth0.com/tester/callback?connection=wener",
    "scope": "openid profile"
  },
  "connection": "wener",
  "error": {
    "message": "the connection was disabled",
    "oauthError": "invalid_request",
    "type": "request-error"
  }
}
```

## Hydra
* https://github.com/ory/hydra

