---
tags:
  - Configuration
---

# Spring Boot Properties

- https://cloud.spring.io/spring-cloud-gateway/reference/html/appendix.html
- https://docs.spring.io/spring-boot/docs/current/reference/html/application-properties.html
- https://docs.spring.io/spring-boot/docs/2.7.x-SNAPSHOT/reference/htmlsingle/#features.external-config

## 主要配置对象

配置对象都通过 Adapter/Configurer 的类进行配置, 只是对内部配置进行修改而不是直接替换.

- org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter
- org.springframework.security.config.annotation.authentication.configurers.GlobalAuthenticationConfigurerAdapter
- org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter
- org.springframework.security.config.annotation.SecurityConfigurerAdapter
- org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
- org.springframework.scheduling.annotation.AsyncConfigurer
- org.springframework.cache.annotation.CachingConfigurer
- org.springframework.web.servlet.config.annotation.ContentNegotiationConfigurer
- org.springframework.security.config.annotation.web.configurers.HeadersConfigurer
- org.springframework.boot.autoconfigure.security.oauth2.resource.JwtAccessTokenConverterConfigurer
- org.springframework.web.servlet.config.annotation.PathMatchConfigurer
- org.springframework.security.config.annotation.web.configurers.RequestCacheConfigurer
- org.springframework.transaction.annotation.TransactionManagementConfigurer

## 配置属性加载顺序

0. 命令行参数
1. 环境变量 `SPRING_APPLICATION_JSON` 指定的 JSON 配置或系统属性
2. JNDI 属性 `java:comp/env`
3. Java 系统属性 (System.getProperties())
4. 操作系统环境变量
5. `RandomValuePropertySource` 为 `random.*` 设置随机属性值
6. Jar 包外基于 profile 的应用属性 (application-{profile}.properties 或 YAML)
7. Jar 包内基于 profile 的应用属性 (application-{profile}.properties 或 YAML)
8. Jar 包外的应用属性配置 (application.properties 或 YAML)
9. Jar 包内的应用属性配置 (application.properties 或 YAML)
10. `@Configuration` 类上的 `@PropertySource`
11. 默认属性 (通过 SpringApplication.setDefaultProperties 指定)

**示例**

```bash
SPRING_APPLICATION_JSON='{"foo":{"bar":"spam"}}' java -jar myapp.jar
java -Dspring.application.json='{"foo":"bar"}' -jar myapp.jar
java -jar myapp.jar --spring.application.json='{"foo":"bar"}'
```

## 查找属性文件的顺序

0. 当前目录下的 `/config` 子目录
1. 当前目录
2. 类路径下的 `/config` 包
3. 类路径根

**修改**

```bash
# 修改配置文件名
java -jar myproject.jar --spring.config.name=myproject
# 修改配置文件目录
java -jar myproject.jar --spring.config.location=classpath:/default.properties,classpath:/override.properties
# 通过环境变量修改文件名
SPRING_CONFIG_NAME=myproject java -jar myproject.jar
# 可同时加载多个配置名
# --spring.config.name=server-app,env
# 可在启动时激活相应配置
# --spring.profiles.active=local
# 可修改配置的搜索路径
# --spring.profiles.location=file:./conf
# 修改默认 Profile
# --spring.profiles.default=test
# 可直接传递 JSON 参数
# --spring.application.json={"redis.port":6379}
```

> **注意**:
>
> - 使用 Profile 时, include 的优先级会比当前配置的优先级高,因此在使用时建议避免使用 include 来包含默认配置.
> - 指定多个 profile 时后面的会覆盖前面的

## 特殊配置说明

- DevTool 会尝试查找 HOME 下的 `.spring-boot-devtools.properties` 配置文件
- `spring.main` 下的参数会应用到 `SpringApplication` 上,因此可以在配置文件中配置 `spring.main.web_environment: false` 这样的参数
- Spring 启动时的处理类为 `org.springframework.boot.context.config.ConfigFileApplicationListener`
  - 负责加载给定的配置 `spring.config.name`,`spring.profiles.active`,`spring.profiles.location`
  - 负责将 `spring.main` 上的属性绑定到 `SpringApplication` 上
- 可启用日志,记录所有尝试加载的配置文件名

```
<logger name="org.springframework.boot.context.config.ConfigFileApplicationListener"
        level="TRACE"
        additivity="false">
    <appender-ref ref="CONSOLE"/>
    <appender-ref ref="FILE"/>
</logger>
```

## 属性文件可使用占位符

```
app.name=MyApp
app.description=${app.name:Default Name} is a Spring Boot application
```

## 单个 YAML 可指定多个 profile

```yaml
server:
  address: 192.168.1.100
---
spring:
  profiles: development
server:
  address: 127.0.0.1
---
spring:
  profiles: production
server:
  address: 192.168.1.120
```

## 配置注解

默认会开启 `@EnableConfigurationProperties` 注解配置, 有 `@ConfigurationProperties` 注解会自动使用 `Environment` 进行初始化.也可以直接通过 `@EnableConfigurationProperties` 来注册配置对象

## 绑定属性名

进行绑定的属性名相对宽容

| 属性名格式        | 说明                                        |
| ----------------- | ------------------------------------------- |
| person.firstName  | 标准驼峰语法                                |
| person.first-name | 横线分隔, 推荐在 .properties 和 .yml 中使用 |
| PERSON_FIRST_NAME | 大写格式, 推荐在系统变量使用                |

## 日志配置

| Spring Environment                | System Property               | Comments                                                           |
| --------------------------------- | ----------------------------- | ------------------------------------------------------------------ |
| logging.exception-conversion-word | LOG_EXCEPTION_CONVERSION_WORD | The conversion word that’s used when logging exceptions.           |
| logging.file                      | LOG_FILE                      | 如果定义了会作为默认日志配置                                       |
| logging.path                      | LOG_PATH                      |
| logging.pattern.console           | CONSOLE_LOG_PATTERN           | 控制台(stdout)输出的日志格式(不支持 JDK logger)                    |
| logging.pattern.file              | FILE_LOG_PATTERN              | 输出到文件的日志格式                                               |
| logging.pattern.level             | LOG_LEVEL_PATTERN             | 输出日志等级的格式(默认 %5p)(logging.pattern.level 支持直 Logback) |
| PID                               | PID                           |

## 常用配置

```yaml
# 日志配置
logging.level.root: INFO
logging.level.org.springframework.web: DEBUG
logging.level.org.hibernate: ERROR

# 启用 h2 控制台
spring.h2.console.enabled: true
# 修改控制台路径,默认 /h2-console
spring.h2.console.path: /h2-console

# 修改 Jackson 时间格式,设置正确的时区非常重要,否则会导致序列化的时间有时差
spring:
  jackson:
    date-format: yyyy-MM-dd HH:mm:ss
    locale: zh_CN
    time-zone: GMT+8
```
