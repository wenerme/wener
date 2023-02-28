---
tags:
  - FAQ
---

# Spring FAQ

## Tomcat 上传超时

**异常信息**

```
org.springframework.web.util.NestedServletException: Request processing failed; nested exception is org.springframework.web.multipart.MultipartException: Could not parse multipart servlet request; nested exception is org.apache.commons.fileupload.FileUploadBase$IOFileUploadException: Processing of multipart/form-data request failed. Read timed out
        org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:894)
        org.springframework.web.servlet.FrameworkServlet.doPost(FrameworkServlet.java:789)
        javax.servlet.http.HttpServlet.service(HttpServlet.java:641)
        javax.servlet.http.HttpServlet.service(HttpServlet.java:722)
        org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:312)
        org.springframework.security.web.access.intercept.FilterSecurityInterceptor.invoke(FilterSecurityInterceptor.java:116)
        org.springframework.security.web.access.intercept.FilterSecurityInterceptor.doFilter(FilterSecurityInterceptor.java:83)
        org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:324)
        org.springframework.security.web.access.ExceptionTranslationFilter.doFilter(ExceptionTranslationFilter.java:113)
        org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:324)
```

解决该问题可在 Tomcat 的 `server.xml` 中添加如下配置解决

```xml
<Connector port="8080" protocol="HTTP/1.1" URIEncoding="UTF-8"
           connectionUploadTimeout="36000000" disableUploadTimeout="false"
           connectionTimeout="60000" redirectPort="8443" />
```

在 Spring Boot 中则可以通过该方法来修改配置

```java
@Bean
public EmbeddedServletContainerCustomizer containerCustomizer() throws FileNotFoundException {
    return factory -> {
        if (factory instanceof TomcatEmbeddedServletContainerFactory) {
            TomcatEmbeddedServletContainerFactory containerFactory = (TomcatEmbeddedServletContainerFactory) factory;
            containerFactory.addConnectorCustomizers(c -> {
                // http://tomcat.apache.org/tomcat-8.0-doc/config/http.html#Standard_Implementation
                log.info("Customize tomcat connector");
                c.setAttribute("connectionUploadTimeout", 36000000);// milliseconds
                c.setAttribute("disableUploadTimeout", false);
            });
        }
    };
}
```
