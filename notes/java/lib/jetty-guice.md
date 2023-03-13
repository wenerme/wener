---
title: Jetty Guice
---

# Jetty Guice

- 如果想要直接使用 servlet，又不想使用容器，那么使用嵌入的 jetty-servlet 可能是最好的选择。
- 既然选择轻便，那么 Spring 是需要避免的，可以考虑 Guice 的 [ServletModule](https://github.com/google/guice/wiki/ServletModule)

**web.xml**

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<web-app
  xmlns="http://xmlns.jcp.org/xml/ns/javaee"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
  metadata-complete="false"
  version="3.1">
  <!-- 初始化 ServletModule -->
  <listener>
    <listener-class>trials.web.MyGuiceServletConfig</listener-class>
  </listener>

  <!-- 全局拦截器 -->
  <filter>
    <filter-name>guiceFilter</filter-name>
    <filter-class>com.google.inject.servlet.GuiceFilter</filter-class>
  </filter>
  <filter-mapping>
    <filter-name>guiceFilter</filter-name>
    <url-pattern>/*</url-pattern>
  </filter-mapping>
</web-app>
```

**MyGuiceServletConfig.java**

```java
public class MyGuiceServletConfig extends GuiceServletContextListener {
  @Override
  protected Injector getInjector() {
    return Guice.createInjector(new MyServletModule());
  }

  public static class MyServletModule extends ServletModule {
    @Override
    protected void configureServlets() {
      // 配置 servlet 和 filter
      serve("/my/*").with(MyServlet.class);
    }
  }
}
```

**App.java**

```java
public class App {
  public static void main(String[] args) throws Exception {
    WebAppContext webAppContext = new WebAppContext();
    webAppContext.setContextPath("/");
    // 使用 resources/webapp
    URL webAppDir = Thread.currentThread().getContextClassLoader().getResource("webapp");
    webAppContext.setResourceBase(webAppDir.toURI().toString());

    Server server = new Server(8080);
    server.setHandler(webAppContext);
    server.start();
    server.join();
  }
}
```

**pom.xml**

```xml
<dependencies>
  <!-- jetty webapp 支持 web.xml -->
  <!-- 如果不想使用 web.xml 也可以使用编码代替：更适用于只有代码的场景 -->
  <dependency>
    <groupId>org.eclipse.jetty</groupId>
    <artifactId>jetty-webapp</artifactId>
    <version>9.4.20.v20190813</version>
  </dependency>

  <dependency>
    <groupId>com.google.inject.extensions</groupId>
    <artifactId>guice-servlet</artifactId>
    <version>4.2.2</version>
  </dependency>
  <dependency>
    <groupId>com.google.inject</groupId>
    <artifactId>guice</artifactId>
    <version>4.2.2</version>
  </dependency>
</dependencies>
```
