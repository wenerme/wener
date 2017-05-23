# Spring Security

## Tips
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
hasPermission(Object target, Object permission)| 如果用户有访问该对象的权限返回 `true`<br>交由 `PermissionEvaluator` 处理
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
Authentication 处理机制 |  UsernamePasswordAuthenticationFilter, CasAuthenticationFilter, BasicAuthenticationFilter 等<br>使得 SecurityContextHolder 中能包含一个有效的 Authentication 请求令牌
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
