
## 主要对象
对象名|作用
----|----
SecurityContextHolder | 提供对 SecurityContext 的访问
SecurityContext | 提供 Authentication 和可能对请求相关的安全信息
Authentication | 提供以 Spring 安全的形式提供 principal
GrantedAuthority | 反应应用范围内 principal 所获取到的权限
UserDetails | 提供必要的信息并通过应用的 DAO 或其他安全数据来源来构建一个 Authentication 对象
UserDetailsService | 通过提供的 username 或者 授权 ID 来构建一个 UserDetails 对象

实际上 Spring Security 并不关心 SecurityContextHolder 中的 Authentication 对象是如何放进去的.最重要的是 SecurityContextHolder 在 AbstractSecurityInterceptor 处理之前需要持有一个 Authentication 来表示 principal.

## 基于表达式的权限控制

表达式的根对象为 `SecurityExpressionRoot`

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
* 如果编译时启用了调试符号,则可以通过调试符号获取到类参数名,无法获取到接口参数名,因为接口没有调试符号.

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
