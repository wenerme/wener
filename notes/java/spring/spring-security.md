---
id: security
title: Spring Security
---

# Spring Security

## Tips
http://www.baeldung.com/spring-security-login

## Notes
* `@EnableGlobalMethodSecurity`
  * 标识被注解的类可以用于配置 `AuthenticationManagerBuilder`, 即可以注入该配置对象
  * 该注解可以作为元注解使用, 因此 `@EnableWebSecurity` 和 `@EnableWebMvcSecurity` 都有这样的功能
  * `AuthenticationConfiguration`
* `@EnableWebSecurity`
  * 如果有 mvc 环境, 会启用 `WebMvcSecurityConfiguration` 配置
  * `WebMvcSecurityConfiguration`
    * 添加了 `@AuthenticationPrincipal` 方法参数注解的处理
    * 添加了 `CsrfToken` 参数注入
  * `WebSecurityConfiguration`
    * 使用 `WebSecurity` 来构建一个 `Filter` (springSecurityFilterChain)
    * `WebSecurity`
      * 核心配置上下文
    * `WebSecurityConfigurer`
      * 从 `AutowiredWebSecurityConfigurersIgnoreParents` 取得
      * 继承自 `SecurityConfigurer`
        * 配置结果为 `Filter`
        * 未添加任何其他的方法
* `@EnableWebMvcSecurity`
  * 已弃用, 使用 `@EnableWebSecurity`
* `@EnableGlobalMethodSecurity`
  * `GlobalMethodSecuritySelector`
    * 根据注解上启用的功能来导入配置
  * `GlobalMethodSecurityConfiguration`
    * `MethodInterceptor`
      * 使用配置项构建的方法拦截 (methodSecurityInterceptor)
      * `AccessDecisionManager`
        * 默认为 `AffirmativeBased`
        * `PreInvocationAuthorizationAdviceVoter`
          * 实现 `@PreFilter` 和 `@PreAuthorize`
          * 实际上该类型的判断不需要作为基于投票的判断, 因为已经能从信息中拿到结果, 不过为了可读性才以基于投票的系统来实现
        * `RoleVoter`
        * `AuthenticatedVoter`
      * `AfterInvocationManager`
        * 如果没有开启前后处理(prePost), 那么不会有该实现
        * 该接口主要用于实现后处理
        * 默认为 `AfterInvocationProviderManager`
          * 实际决策由 `AfterInvocationProvider` 处理
          * `PostInvocationAdviceProvider`
            * `PostInvocationAuthorizationAdvice`
              * `ExpressionBasedPostInvocationAdvice`
                * `PostInvocationExpressionAttribute`
                * 实现 `@PostFilter` 和 `@PostAuthorize` 的处理
      * `MethodSecurityMetadataSource`
        * 一个 `SecurityMetadataSource` 的实现
        * 用于生成不同访问决策 `AccessDecisionManager` 需要的 `ConfigAttribute`
      * `RunAsManager`
        * 处理 `@RunAs`
        * 默认没有实现
        * 执行时创建一个新的授权对象
  * `Jsr250MetadataSourceConfiguration`
    * `@DenyAll`, `@PermitAll`, `@RolesAllowed`
* `SecurityConfigurer`
  * 基础的安全配置配置接口
  * 核心的配置配置内容均继承自该接口
  * 分为配置结果和配置上下文
  * `SecurityBuilder`
    * 配置上下文的基础接口
    * 最终由该接口提供的方法配置出结果配置对象
    * 主要实现
      * `WebSecurity`
      * `HttpSecurityBuilder`
        * `HttpSecurity`
        * 结果类型为 `DefaultSecurityFilterChain`
        * 默认的 Filter 链顺序
          * `ChannelProcessingFilter`
            * 主要用于判断是否是从 `https` 端口来的请求
            * 构建 `FilterInvocation`
            * 拿到相应的安全配置属性 `ConfigAttribute`
            * 最终交由 `ChannelDecisionManager` 判断
          * `ConcurrentSessionFilter`
            * 默认的 Filter 链中有三个 `ConcurrentSessionFilter`
            * 主要用于处理并发会话
            * 主要做两件事
              1. 调用 `SessionRegistry#refreshLastRequest(String)`
                * 保证会话的上次更新时间是正确的
              2. 从 `SessionRegistry` 拿 `SessionInformation`, 并判断是否过期
                * 如果过期了则执行退出登录逻辑
          * `SecurityContextPersistenceFilter`
            * 将从 `SecurityContextRepository` 拿到的安全上下文 `SecurityContext` 放到 `SecurityContextHolder`
            * 必须在所有授权机制之前执行
            * 使用请求对象的属性(`__spring_security_scpf_applied`) 来保证只执行一次
            * `SecurityContextRepository`
              * 用于在请求之间持久化 `SecurityContext` 信息的接口
              * 大多是情况下是使用 `HttpSession` 来存储
              * 加载时不会反回 `null`, 如果没有, 会返回一个空的上下文
              * `HttpSessionSecurityContextRepository`
                * 会话存储键 `SPRING_SECURITY_CONTEXT`
              * `NullSecurityContextRepository`
                * 如果不启用会话则会使用该实现
                * 加载上下文时会使用 `SecurityContextHolder#createEmptyContext` 创建空的上下文
          * `LogoutFilter`
            * 处理匹配(`RequestMatcher`)的退出登录请求
            * 实际退出登录操作交由 `LogoutHandler` 处理
            * 退出登录成功后通知 `LogoutSuccessHandler`
            * 主要实现
              * `CookieClearingLogoutHandler`
                * 清理 Cookie
              * `CsrfLogoutHandler`
                * 清理 csrf
              * `SecurityContextLogoutHandler`
                * 失效会话
                * 去除安全上下文中的授权
              * `AbstractRememberMeServices`
                * 清除  RememberMe 信息
          * `X509AuthenticationFilter`
          * `AbstractPreAuthenticatedProcessingFilter`
            * 所有进行预认证的处理
            * 主要处理由外部系统认证的情况
            * 从请求中提取出 `principal`, 而不是对他们进行认证
            * 当一个认证失败后会尝试其他的认证机制
              * `continueFilterChainOnUnsuccessfulAuthentication`
            * 如果已经进行过授权则不会再次进行
            * 主要实现
              * `X509AuthenticationFilter`
                * 最先执行
              * `RequestHeaderAuthenticationFilter`
                * [CA SSO](https://www.ca.com/us/products/ca-single-sign-on.html)
                * CA Siteminder
                * `SM_USER` 头
              * `RequestAttributeAuthenticationFilter`
                * [Stanford WebAuth](http://webauth.stanford.edu/manual/mod/mod_webauth.html#java)
                * [Shibboleth](https://wiki.shibboleth.net/confluence/display/SHIB2/NativeSPJavaInstall)
                * [Shibboleth (Internet2)](https://en.wikipedia.org/wiki/Shibboleth_(Internet2))
                * `REMOTE_USER` 请求属性
          * `CasAuthenticationFilter`
            * 处理 cas 认证
          * `UsernamePasswordAuthenticationFilter`
            * 由 `formLogin` 配置
            * 取表单中的用户名密码进行认证
          * `ConcurrentSessionFilter`
          * `OpenIDAuthenticationFilter`
          * `DefaultLoginPageGeneratingFilter`
            * 生成默认登录页
            * 默认地址为 `/login`
          * `ConcurrentSessionFilter`
          * `DigestAuthenticationFilter`
            * 处理[HTTP 摘要认证](https://zh.wikipedia.org/wiki/HTTP摘要认证)
            * Digest 的弱点
              * 要求密码可恢复
          * `BasicAuthenticationFilter`
            * 处理 HTTP 基本验证
          * `RequestCacheAwareFilter`
            * 从 `RequestCache` 恢复缓存的请求
            * 允许重定向到认证机制后重新开始单个请求
          * `SecurityContextHolderAwareRequestFilter`
            * 包装当前的请求, 以实现 Servlet 3 请求上安全相关的方法
              * `HttpServletRequest#authenticate(HttpServletResponse)`
              * `HttpServletRequest#login(String, String)`
              * `HttpServletRequest#logout()`
              * `AsyncContext#start(Runnable)`
          * `JaasApiIntegrationFilter`
            * JAAS 集成
          * `RememberMeAuthenticationFilter`
            * 如果未找到当前的认证信息, 则尝试从 `RememberMeServices` 中构建认证
          * `AnonymousAuthenticationFilter`
            * 如果没有认证信息, 则构建一个匿名认证信息
          * `SessionManagementFilter`
            * 根据当前的认证信息执行会话相关的策略
          * `ExceptionTranslationFilter`
            * 处理抛出的 `AccessDeniedException` 和 `AuthenticationException` 异常
            * 将异常信息转换为对应的 HTTP 响应
            * `AuthenticationException`
              * 会尝试返回请求从新要求认证
            * `AccessDeniedException`
              * 如果当前认证是匿名的或者是记住我, 则尝试从新开始认证
              * 否则交由 `AccessDeniedHandler` 处理
          * `FilterSecurityInterceptor`
            * 执行 `Filter` 层的拦截处理
          * `SwitchUserFilter`
            * 处理用户切换请求 `/login/impersonate`
            * 处理退出切换的用户 `/logout/impersonate`
            * 例如: 将用户从 `ROLE_ADMIN` 切换为 `ROLE_USER`
  * 主要实现
    * `SecurityConfigurerAdapter`
      * 添加了对象后处理配置
        * `ObjectPostProcessor`
      * 添加了 `SecurityBuilder` 链式调用的处理
    * `WebSecurityConfigurerAdapter`
      * Builder 类型为 `WebSecurity`
      * `ContentNegotiationStrategy`
        * 配置内容协商决策
      * 请求对象 -> 媒体类型
      * 授权配置
      * 授权管理器配置
      * Http 安全配置
        * 默认配置
          * csrf
          * 异步集成
          * 异常处理
          * 头处理
          * 会话管理
          * 安全上下文
          * 请求缓存
          * 匿名请求
          * servlet 接口
          * 默认登录页
          * 退出登录
    * `AbstractHttpConfigurer`
      * Builder 类型为 `HttpSecurity`
      * 配置结果为 `DefaultSecurityFilterChain`
* `AuthenticationEventPublisher`
  * 用于发布授权成功或失败的 Publisher
    * `AuthenticationSuccessEvent`
  * 失败的授权会根据异常类型不同映射为不同的事件
* `UserDetailsService`
  * 安全系统中的用户概念
  * 该接口提供只读功能
  * `UserDetails`
    * 用户信息
  * `UserDetailsManager`
    * 提供对用户信息的管理
  * `GroupManager`
    * 用户分组管理
  * `AuthenticationUserDetailsService`
    * 从认证中拿到用户信息
* `AuthenticationTrustResolver`
  * 判断一个认证是否为匿名或记住我


## Doc Notes
* [Secure Object Implementations](http://docs.spring.io/spring-security/site/docs/current/reference/htmlsingle/#secure-object-impls)
* PermissionEvaluator 用于处理 hasPermission
* 方法安全的 AOP 主要基于 MethodSecurityInterceptor
* 方法安全相关的注解
  * PreAuthorize
  * PostAuthorize
  * PreFilter
  * PostFilter
* 可以使用 AuthenticationPrincipal 注入上下文中的授权对象 Authentication
* 如果使用了代理服务器, 需要配置正确的 ForwardedHeaderFilter
* 可以使用 RoleHierarchy 来实现角色间的层级关系
* 如果不是使用的传统的授权方式, 可以考虑添加自己的 AuthenticationEntryPoint 到 http 上
* 执行安全相关的主体逻辑在 AbstractSecurityInterceptor 中
  * [AbstractSecurityInterceptor](http://docs.spring.io/spring-security/site/docs/current/reference/htmlsingle/#secure-objects)
  * 授权验证
  * 前后验证
  * 访问决策
  * RunAs
    * 会替换当前请求上下文中的 `Authentication`
  * 分别分为 MethodInvocation 和 FilterInvocation
    * MethodInvocation 对 AOP 对方法调用的拦截
    * FilterInvocation 对 Servlet 请求响应的拦截
      * 会根据 Request 找到响应的处理
        * 例如: `.antMatchers("/user/**").access("@webSecurity.check(authentication,request)")`
          * 会生成一个 RequestMatcher 实现为 AntPathRequestMatcher
            * RequestMatcher 可能会从 request 中抽取出变量
          * 会生成 SecurityConfig , 会由 MetadataSource 转换为 WebExpressionConfigAttribute
          * 会由 WebExpressionVoter 处理
            * 是 AccessDecisionVoter 的实现
              * 基于投票的决策
              * 投票结果为 ACCESS_GRANTED, ACCESS_ABSTAIN, ACCESS_DENIED
              * 可能会由以下 AccessDecisionManager 实现处理
              * AffirmativeBased
                * 任意
              * ConsensusBased
                * 大多数, 不包括放弃投票的
              * UnanimousBased
                * 所有都投同意或放弃
          * 最终会汇聚到 ExpressionBasedFilterInvocationSecurityMetadataSource
* 角色之所以会使用 `ROLE_` 前缀, 是因为 `RoleVoter` 会将所有有该前缀的认为是橘色, 并作出判断
* ConfigAttribute
  * [What are Configuration Attributes](http://docs.spring.io/spring-security/site/docs/current/reference/htmlsingle/#tech-intro-config-attributes)
  * 是将所有权限验证串起来的关键
  * 每个验证都会生成相应的属性, 每个属性有各自的类型, 每个类型的属性也对应了相应的决策判断
  * 由 SecurityMetadataSource 创建, 主要针对 AOP, 分为方法调用和 Filter 调用
  * 由 AccessDecisionManager 处理, 处理之前都会判断相应的属性类型
* AspectJSecurityInterceptor 主要用于 DomainObject 级别的 ACL
* ExceptionTranslationFilter 会处理与授权相关的异常
  * AuthenticationException
  * AccessDeniedException
  * 如果是授权失败 AuthenticationException
    * 先  RequestCache#savedRequest
      * 例如用户授权成功后跳转
    * 会使用 AuthenticationEntryPoint 来解决异常
  * 如果是拒绝访问 AccessDeniedException
    * 如果是发现由于是因为未完全授权(匿名或记住我),也会触发上面授权失败的处理
    * 会使用 AccessDeniedHandler 来解决异常
  * 对于 RESTful 接口服务来说, 该 Filter 实际上是不需要的
* AuthenticationTrustResolver 可以用于实现对匿名和记住我的判断
* ThrowableAnalyzer 可以用来辅助异常处理
* AbstractSecurityWebSocketMessageBrokerConfigurer 可对 WebSocket 进行安全处理
* [Authentication vs Authorization](http://stackoverflow.com/questions/6556522)
  * Authentication
    * Who you are
    * Login
    * HTTP 401 Unauthorized
  * Authorization
    * What you are allowed to do
    * Permission
    * HTTP 403 Forbidden
* Spring Data 集成
  * 需要添加依赖 `spring-security-data`
  * 自动配置 `org.springframework.boot.autoconfigure.security.SecurityDataConfiguration`
  * 初始化 `org.springframework.security.data.repository.query.SecurityEvaluationContextExtension`
```java
@Bean
public SecurityEvaluationContextExtension securityEvaluationContextExtension() {
	return new SecurityEvaluationContextExtension();
}
```
  * `@Query` 可以使用 Spring Security 的表达式
    * `@Query("select m from Message m where m.to.id = ?#{ principal?.id }")`
* 并发
  * 由于授权是线程相关的, 如果要并发使用可以使用框架提供的包装类
    * DelegatingSecurityContextRunnable
    * DelegatingSecurityContextExecutor

![](http://docs.spring.io/spring-security/site/docs/current/reference/htmlsingle/images/security-interception.png)

```java
// 基于表达式的访问控制
// 即便不是用 access, 实际生成的也都是类似的表达式
http
  .authorizeRequests()
    // 可以直接调用上下文中的 bean 对象来检测
    // 其中的 request 参数是在 WebSecurityExpressionRoot 定义的
    .antMatchers("/user/**").access("@webSecurity.check(authentication,request)")
    // 访问路径参数
    .antMatchers("/user/{userId}/**").access("@webSecurity.checkUserId(authentication,#userId)")
```


### ACL
* [Domain Object Security](http://docs.spring.io/spring-security/site/docs/current/reference/htmlsingle/#domain-acls)
* spring-security-acl
* 主要用于控制对象权限
* 使用 `ACL_` 数据表
  * ACL_SID
    * SID -> Security Identifier
    * 系统中 principal 或 authority 的唯一标识符
  * ACL_CLASS
    * 系统中 DO 的唯一标识符
  * ACL_OBJECT_IDENTITY
    * DO 实例的唯一标识符
  * ACL_ENTRY
    * 存储指派给 recipient 的单独权限
    * 包含 ACL_OBJECT_IDENTITY, ACL_SID 和权限的 bit mask
* 主要接口
  * Acl
    * 每个 DO 对应一个 Acl, 包含 `AccessControlEntry` 信息, 不直接指向 DO, 但包含 `ObjectIdentity`.
    * 存储于 `ACL_OBJECT_IDENTITY` 表
  * AccessControlEntry
    * 包含多个 `AccessControlEntry`
    * 缩写为 `ACE`
    * 每个 ACE 指向一组 Permission, Sid 和 Acl.
    * 包含授权和未被授权信息
    * 包含审查设置
    * 存储于 `ACL_ENTRY`
  * Permission
    * 表示一个不可变的 bit mask, 并提供相应的操作
    * 基础的权限 (0-4) 在 `BasePermission` 类中
  * Sid
    * 抽象化了 principals 和 `GrantedAuthority[]`, 以供 ACL 模块引用
    * 常见的类包含
      * PrincipalSid: 表示 `Authentication` 中的 principals
      * GrantedAuthoritySid
    * 存储于 `ACL_SID`
  * ObjectIdentity
    * 每个 DO 实例在 ACL 模块中都使用 `ObjectIdentity` 表示
    * 默认实现为 `ObjectIdentityImpl`
      * 调用 `getId` 方法
  * AclService
    * 从 `ObjectIdentity` 取得 Acl 相关的信息
    * 默认实现为 `JdbcAclService`
    * 请求操作会转移到 `LookupStrategy`
      * 优化了对 ACL 信息的请求
      * BasicLookupStrategy
  * MutableAclService
    * 循序修改的 Acl 信息被持久化
    * 该功能可选
* 取不到 DO 的 id 会投弃权
* Permission
  * 权限为一个 bit mask + 字符
  * BasePermission 定义了基础权限
  * PermissionFactory
  * CumulativePermission 可修改的权限对象, 用于构建权限
* NOTE
  * 自己使用时建议自己实现 AclService, 如果不需要提供修改接口则不需要实现修改接口
  * 目前没有针对 Acl 的自动配置, 添加扫描路径应该可以, 或者手动添加 Voter 和 AfterInvocation 的处理.
  * 如果是基于现有对象实现 Acl
    * 实现自定义的 `ObjectIdentityRetrievalStrategy` 和 `ObjectIdentityRetrievalStrategy`
    * 存储真实的 DO 对象. AclService 从实现上取得真实对象关联的信息


__BasePermission__

Char | Mask | Meaning
--|---------|--------
R | '----1' | READ
W | '---1-' | WRITE
C | '--1--' | CREATE
D | '-1---' | DELETE
A | '1----' | ADMINISTRATION

## 主要对象
对象名|作用
----|----
SecurityContextHolder | 提供对 SecurityContext 的访问
SecurityContext | 提供 Authentication 和可能对请求相关的安全信息
Authentication | 以 Spring Security 的形式提供的 principal
GrantedAuthority | 反应应用范围内 principal 所获取到的权限
UserDetails | 提供必要的信息并通过应用的 DAO 或其他安全数据来源来构建一个 Authentication 对象
UserDetailsService | 通过提供的 username 或者 授权 ID 来构建一个 UserDetails 对象

[Setting the SecurityContextHolder Contents Directly](http://docs.spring.io/spring-security/site/docs/current/reference/htmlsingle/#setting-the-securitycontextholder-contents-directly)
实际上 Spring Security 并不关心 SecurityContextHolder 中的 Authentication 对象是如何放进去的.最重要的是 SecurityContextHolder 在 AbstractSecurityInterceptor 处理之前需要持有一个 Authentication 来表示 principal.



想要放入 SecurityContextHolder, 要保证会调用 SecurityContextPersistenceFilter, 默认情况下都会加载该 Filter.

## 基于表达式的权限控制

* 表达式的根对象为 `SecurityExpressionRoot`

表达式|描述
----|----
hasRole([role])| 返回 `true` 如果当前 principle 有该角色.默认情况下如果给的角色不是 `ROLE_` 开头的,会添加该角色.可通过 `DefaultWebSecurityExpressionHandler` 的 `defaultRolePrefix` 修改
hasAnyRole([role1,role2])| 同上
hasAuthority([authority])| 判断是否有该授权
hasAnyAuthority([authority1,authority2])| 同上
principal| 可直接访问当前的 principle
authentication| 可直接访问当前 `SecurityContext` 中的 `Authentication` 对象.
permitAll| 总是返回 `true`
denyAll| 总是返回 `false`
isAnonymous()| 判断是否为匿名用户,交由 `AuthenticationTrustResolver` 判断
isRememberMe()| 判断是否为记住我用户,交由 `AuthenticationTrustResolver` 判断
isAuthenticated()| 判断是否授权, 如果为非匿名则返回 `true`
isFullyAuthenticated()| 如果用户不是匿名用户且不是记住我用户.
hasPermission(Object target, Object permission)| 如果用户有访问该对象的权限返回 `true`<br/>交由 `PermissionEvaluator` 处理
hasPermission(Object targetId, String targetType, Object permission)| 同上
filterTarget | 表达式内建对象
returnValue | 表达式内建对象
hasIpAddress([IP])| 由 `WebSecurityExpressionRoot` 定义的内建表达式

__示例__

```java
@PreAuthorize("#n == authentication.name")
Contact findContactByName(@Param("n") String name);
@PreAuthorize("#c.name == authentication.name")
public void doSomething(@P("c") Contact contact);
@PreAuthorize("hasRole('USER')")
public void create(Contact contact);
@PreAuthorize("hasPermission(#contact, 'admin')")
public void deletePermission(Contact contact, Sid recipient, Permission permission);
@PostFilter("hasPermission(filterObject, 'read') or hasPermission(filterObject, 'admin')")
```

* 如果使用 JDK 8 编译, 编译时指定了 `-parameters` 参数,并且使用的 Spring4+, 那么通过 JDK 的反射接口可获取到接口和类的参数名.
* 如果编译时启用了调试符号,则可以通过调试符号获取到类参数名,无法获取到接口参数名,因为接口没有调试符号, 可是可以使用 `$P('name')` 的形式来给定名字

* [常用内建表达式](http://docs.spring.io/spring-security/site/docs/4.0.4.RELEASE/reference/htmlsingle/#el-common-built-in)

## Filter 顺序

类名|描述
----|----
ChannelProcessingFilter | 可能会重定向到不同协议
SecurityContextPersistenceFilter | SecurityContextHolder 的 SecurityContext 可在请求之前设置好, 在请求结束时所有对 SecurityContext 的修改都可以被复制到 HttpSession 中,以便于下次请求时使用.
ConcurrentSessionFilter | 因为使用了 SecurityContextHolder 的功能,并且需要更新 SessionRegistry 来反应正在处理的请求
Authentication 处理机制 |  UsernamePasswordAuthenticationFilter, CasAuthenticationFilter, BasicAuthenticationFilter 等<br/>使得 SecurityContextHolder 中能包含一个有效的 Authentication 请求令牌
SecurityContextHolderAwareRequestFilter | 用于添加一个能感知 Spring Security 上下文的 HttpServletRequestWrapper 到 servlet 容器中
JaasApiIntegrationFilter | 如果 JaasAuthenticationToken 在 SecurityContextHolder 中,该 Filter 会将 FilterChain 作为 JaasAuthenticationToken 的 Subject 来处理=
RememberMeAuthenticationFilter | 如果之前的鉴权处理都没有为 SecurityContextHolder 设置一个有效的 Authentication, 并且请求中携带的 Cookie 表示启用了'记住登陆'服务, 那么一个相应的 Authentication 会被放到 SecurityContextHolder 中.
AnonymousAuthenticationFilter | 如果之前的处理机制都没更新 SecurityContextHolder,一个匿名 Authentication 会被放到那里.
ExceptionTranslationFilter | 用来捕获所有在 Spring Security 发生的异常,可返回一个 HTTP 错误相应或相应的 AuthenticationEntryPoint 会被启动.
FilterSecurityInterceptor | 用于保护 URI, 当访问被拒绝时抛出异常

## 标准过滤器别名和顺序

别名 | 过滤器类 | 命名空间和属性
----|----|----
CHANNEL_FILTER | ChannelProcessingFilter | http/intercept-url@requires-channel
SECURITY_CONTEXT_FILTER | SecurityContextPersistenceFilter | http
CONCURRENT_SESSION_FILTER | ConcurrentSessionFilter | session-management/concurrency-control
HEADERS_FILTER | HeaderWriterFilter | http/headers
CSRF_FILTER | CsrfFilter | http/csrf
LOGOUT_FILTER | LogoutFilter | http/logout
X509_FILTER | X509AuthenticationFilter | http/x509
PRE_AUTH_FILTER | AbstractPreAuthenticatedProcessingFilter Subclasses | N/A
CAS_FILTER | CasAuthenticationFilter | N/A
FORM_LOGIN_FILTER | UsernamePasswordAuthenticationFilter | http/form-login
BASIC_AUTH_FILTER | BasicAuthenticationFilter | http/http-basic
SERVLET_API_SUPPORT_FILTER | SecurityContextHolderAwareRequestFilter | http/@servlet-api-provision
JAAS_API_SUPPORT_FILTER | JaasApiIntegrationFilter | http/@jaas-api-provision
REMEMBER_ME_FILTER | RememberMeAuthenticationFilter | http/remember-me
ANONYMOUS_FILTER | AnonymousAuthenticationFilter | http/anonymous
SESSION_MANAGEMENT_FILTER | SessionManagementFilter | session-management
EXCEPTION_TRANSLATION_FILTER | ExceptionTranslationFilter | http
FILTER_SECURITY_INTERCEPTOR | FilterSecurityInterceptor | http
SWITCH_USER_FILTER | SwitchUserFilter | N/A

* 参考 [自定义过滤器](http://docs.spring.io/spring-security/site/docs/current/reference/htmlsingle/#ns-custom-filters)
