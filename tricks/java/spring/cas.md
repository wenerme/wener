# CAS

## Tips
* Apereo CAS - Enterprise Single Sign On for all earthlings and beyond
* https://apereo.github.io/cas/
* https://github.com/apereo/cas
* Features
  * CAS v1, v2 and v3 Protocol
  * SAML v1 and v2 Protocol
  * OAuth Protocol
  * OpenID & OpenID Connect Protocol
  * WS-Federation Passive Requestor Protocol
  * Authentication via JAAS, LDAP, RDBMS, X.509, Radius, SPNEGO, JWT, Remote, Trusted, BASIC, Apache Shiro, MongoDb, Pac4J and more.
  * Delegated authentication to WS-FED, Facebook, Twitter, SAML IdP, OpenID, OpenID Connect, CAS and more.
  * Authorization via ABAC, Time/Date, REST, Internet2's Grouper and more.
  * HA clustered deployments via Hazelcast, Ehcache, JPA, Memcached, Apache Ignite, MongoDb, Redis, Couchbase and more.
  * Application registration backed by JSON, LDAP, YAML, JPA, Couchbase, MongoDb and more.
  * Multifactor authentication via Duo Security, YubiKey, RSA, Google Authenticator and more.
  * Administrative UIs to manage logging, monitoring, statistics, configuration, client registration and more.
  * Global and per-application user interface theme and branding.
  * Password management and password policy enforcement.
* https://github.com/apereo/java-cas-client
* 部分协议是基于 Pac4j 实现的
* 个人见解
  * CAS 主要是维护 Ticket
  * 协议相关的可以说主要交由其他组件实现的
  * 核心的 Webflow 使得认证流程可配可控

## 代码分析
* war overlay
  * 官方建议使用该方式来部署
  * 官方提供了一个大的 war 包
    * 基于 Spring
    * 可以直接使用 java -jar 运行
  * 附加功能通过提价额外依赖的方式来添加
    * Spring Boot 会检测到自动配置
  * 基于 Spring Webflow
* `AuthenticationHandler`
  * 核心接口, 所有授权的实现都基于该接口
* 如果想要实现自己的鉴权,可以参考 cas-server-support-generic-remote-webflow
  * `org.springframework.webflow.execution.Action`
    * `org.apereo.cas.web.flow.AbstractAuthenticationAction`
    * 实现该接口,从请求中提取需要的 `org.apereo.cas.authentication.Credential`
  * `org.apereo.cas.authentication.AuthenticationHandler`
    * 实现一个用于处理自定义 `Credential` 的处理器
  * 添加一个自动配置
    * 注入自定义的 `AuthenticationHandler` 和 `Action`
    * 继承 `AuthenticationEventExecutionPlanConfigurer` 配置, 在 `AuthenticationEventExecutionPlan` 中注册自定义的处理器
* `CentralAuthenticationService`
* `CasCoreBootstrapStandaloneConfiguration`
  * 核心配置
* `org.apereo.cas.web.CasWebApplication#main`
  * 程序入口
* `org.apereo.cas.authentication.AuthenticationManager`

## 配置
* [Configuration-Properties](https://apereo.github.io/cas/5.1.x/installation/Configuration-Properties.html)
* `cas.standalone.config`
  * 配置目录
  * 默认为 `/etc/cas/config`
* `cas.standalone.config.file`
  * 配置文件
