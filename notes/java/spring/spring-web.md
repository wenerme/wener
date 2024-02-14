---
title: Spring MVC
---

# Spring MVC

- [Spring Framework Reference Documentation](http://docs.spring.io/spring/docs/current/spring-framework-reference/htmlsingle/)

## Notes

- `HandlerMethodArgumentResolver`
  - 实现自定义方法注入
- `HandlerMethodReturnValueHandler`
  - 实现返回数据类型的处理
    WebMvcConfigurer

https://docs.spring.io/spring-session/docs/current/reference/html5/

```
this = {FilterChainProxy$VirtualFilterChain@13089}
 originalChain = {ApplicationFilterChain@12215}
  filters = {ApplicationFilterConfig[10]@12476}
   0 = {ApplicationFilterConfig@12546} "ApplicationFilterConfig[name=characterEncodingFilter, filterClass=org.springframework.boot.web.servlet.filter.OrderedCharacterEncodingFilter]"
   1 = {ApplicationFilterConfig@12530} "ApplicationFilterConfig[name=hiddenHttpMethodFilter, filterClass=org.springframework.boot.web.servlet.filter.OrderedHiddenHttpMethodFilter]"
   2 = {ApplicationFilterConfig@12514} "ApplicationFilterConfig[name=httpPutFormContentFilter, filterClass=org.springframework.boot.web.servlet.filter.OrderedHttpPutFormContentFilter]"
   3 = {ApplicationFilterConfig@12483} "ApplicationFilterConfig[name=requestContextFilter, filterClass=org.springframework.boot.web.servlet.filter.OrderedRequestContextFilter]"
   4 = {ApplicationFilterConfig@12463} "ApplicationFilterConfig[name=springSecurityFilterChain, filterClass=org.springframework.boot.web.servlet.DelegatingFilterProxyRegistrationBean$1]"
   5 = {ApplicationFilterConfig@13099} "ApplicationFilterConfig[name=httpTraceFilter, filterClass=org.springframework.boot.actuate.web.trace.servlet.HttpTraceFilter]"
   6 = {ApplicationFilterConfig@13100} "ApplicationFilterConfig[name=webMvcMetricsFilter, filterClass=org.springframework.boot.actuate.metrics.web.servlet.WebMvcMetricsFilter]"
   7 = {ApplicationFilterConfig@13101} "ApplicationFilterConfig[name=oauth2ClientContextFilter, filterClass=org.springframework.security.oauth2.client.filter.OAuth2ClientContextFilter]"
   8 = {ApplicationFilterConfig@13102} "ApplicationFilterConfig[name=Tomcat WebSocket (JSR356) Filter, filterClass=org.apache.tomcat.websocket.server.WsFilter]"
  pos = 5
  n = 9
  servlet = {DispatcherServlet@12214}
  servletSupportsAsync = true
 additionalFilters = {ArrayList@12423}  size = 11
  0 = {WebAsyncManagerIntegrationFilter@12231}
  1 = {SecurityContextPersistenceFilter@12230}
  2 = {HeaderWriterFilter@12229}
  3 = {CsrfFilter@12228}
  4 = {LogoutFilter@12227}
  5 = {RequestCacheAwareFilter@12226}
  6 = {SecurityContextHolderAwareRequestFilter@12225}
  7 = {AnonymousAuthenticationFilter@12224}
  8 = {SessionManagementFilter@12223}
  9 = {ExceptionTranslationFilter@12222}
  10 = {FilterSecurityInterceptor@12221}
```

- SecurityContextRepository
- HeaderWriterFilter
  Filter implementation to add headers to the current response. Can be useful to add
  certain headers which enable browser protection. Like X-Frame-Options, X-XSS-Protection
  and X-Content-Type-Options.
- RedirectAttributes redirectAttributes
  添加重定向参数
