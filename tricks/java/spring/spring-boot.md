# Spring Boot
```bash
# 安装命令行工具
brew tap pivotal/tap
brew install springboot
```

## 参考
* [最新文档](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/)
* [所有的配置属性](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#common-application-properties)

## Changes
### 1.4

* 升级到 Hibernate 5

### 1.3

## 使用 Jetty 而不使用 Tomcat
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </exclusion>
    </exclusions>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jetty</artifactId>
</dependency>
```

## 常量
* org.springframework.http.HttpHeaders
* org.springframework.http.HttpStatus

## 重要的处理接口
* org.springframework.util.PathMatcher
  路径的匹配格式,比如 cors 配置

## 配置

### 主要配置对象
配置对象都通过 Adapter/Configurer 的类进行配置, 只是对内部配置进行修改而不是直接替换.

* org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter
* org.springframework.security.config.annotation.authentication.configurers.GlobalAuthenticationConfigurerAdapter
* org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter
* org.springframework.security.config.annotation.SecurityConfigurerAdapter
* org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
* org.springframework.scheduling.annotation.AsyncConfigurer
* org.springframework.cache.annotation.CachingConfigurer
* org.springframework.web.servlet.config.annotation.ContentNegotiationConfigurer
* org.springframework.security.config.annotation.web.configurers.HeadersConfigurer
* org.springframework.boot.autoconfigure.security.oauth2.resource.JwtAccessTokenConverterConfigurer
* org.springframework.web.servlet.config.annotation.PathMatchConfigurer
* org.springframework.security.config.annotation.web.configurers.RequestCacheConfigurer
* org.springframework.transaction.annotation.TransactionManagementConfigurer

### 配置属性加载顺序

0. 命令行参数
0. 环境变量 `SPRING_APPLICATION_JSON` 指定的 JSON 配置或系统属性
0. JNDI 属性 `java:comp/env`
0. Java 系统属性 (System.getProperties())
0. 操作系统环境变量
0. `RandomValuePropertySource` 为 `random.*` 设置随机属性值
0. Jar 包外基于 profile 的应用属性 (application-{profile}.properties 或 YAML)
0. Jar 包内基于 profile 的应用属性 (application-{profile}.properties 或 YAML)
0. Jar 包外的应用属性配置 (application.properties 或 YAML)
0. Jar 包内的应用属性配置 (application.properties 或 YAML)
0. `@Configuration` 类上的 `@PropertySource`
0. 默认属性 (通过 SpringApplication.setDefaultProperties 指定)

__示例__

```bash
SPRING_APPLICATION_JSON='{"foo":{"bar":"spam"}}' java -jar myapp.jar
java -Dspring.application.json='{"foo":"bar"}' -jar myapp.jar
java -jar myapp.jar --spring.application.json='{"foo":"bar"}'
```

### 查找属性文件的顺序

0. 当前目录下的 `/config` 子目录
0. 当前目录
0. 类路径下的 `/config` 包
0. 类路径根

__修改__
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

> __注意__:
>   
> * 使用 Profile 时, include 的优先级会比当前配置的优先级高,因此在使用时建议避免使用 include 来包含默认配置.
> * 指定多个 profile 时后面的会覆盖前面的

### 特殊配置说明
* DevTool 会尝试查找 HOME 下的 `.spring-boot-devtools.properties` 配置文件
* `spring.main` 下的参数会应用到 `SpringApplication` 上,因此可以在配置文件中配置 `spring.main.web_environment: false` 这样的参数
* Spring 启动时的处理类为 `org.springframework.boot.context.config.ConfigFileApplicationListener`
  * 负责加载给定的配置 `spring.config.name`,`spring.profiles.active`,`spring.profiles.location`
  * 负责将 `spring.main` 上的属性绑定到 `SpringApplication` 上
* 可启用日志,记录所有尝试加载的配置文件名
```
<logger name="org.springframework.boot.context.config.ConfigFileApplicationListener"
        level="TRACE"
        additivity="false">
    <appender-ref ref="CONSOLE"/>
    <appender-ref ref="FILE"/>
</logger>
```

### 属性文件可使用占位符
```
app.name=MyApp
app.description=${app.name:Default Name} is a Spring Boot application
```
### 单个 YAML 可指定多个 profile
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

### 配置注解

默认会开启 `@EnableConfigurationProperties` 注解配置, 有 `@ConfigurationProperties` 注解会自动使用 `Environment` 进行初始化.也可以直接通过 `@EnableConfigurationProperties` 来注册配置对象

### 绑定属性名
进行绑定的属性名相对宽容

属性名格式|说明
----|----
person.firstName | 标准驼峰语法
person.first-name | 横线分隔, 推荐在 .properties 和 .yml 中使用
PERSON_FIRST_NAME | 大写格式, 推荐在系统变量使用

### 日志配置
Spring Environment |	System Property |	Comments
----|----|----
logging.exception-conversion-word | LOG_EXCEPTION_CONVERSION_WORD| The conversion word that’s used when logging exceptions.
logging.file | LOG_FILE | 如果定义了会作为默认日志配置
logging.path | LOG_PATH |
logging.pattern.console|CONSOLE_LOG_PATTERN|控制台(stdout)输出的日志格式(不支持 JDK logger)
logging.pattern.file|FILE_LOG_PATTERN|输出到文件的日志格式
logging.pattern.level|LOG_LEVEL_PATTERN|输出日志等级的格式(默认 %5p)(logging.pattern.level 支持直 Logback)
PID|PID|

### 常用配置
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

### Tips

* 可自定义数据类型转换 [Properties conversion](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-external-config-conversion)
* 可使用 `javax.validation` 对配置的属性进行校验
* 可通过 `spring-boot-actuator` 模块在 `/configprops` 查看属性配置


## Actuator

### 常用终端
ID|描述|默认敏感
----|----|----
actuator|提供基于超媒体的发现页,需要 Spring HATEOAS.| true
autoconfig| 显示自动配置的汇报,显示所有自动配置的候选和为什么没有被使用| true
beans| 显示程序中的 beans 列表 | true
configprops| 显示所有 `@ConfigurationProperties`|true
docs|显示文档,包括请求和相应的例子,需要 `spring-boot-actuator-docs`|false
dump|执行线程转储|true
env|暴露 `ConfigurableEnvironment` 的属性|true
flyway| 显示 Flyway 数据库的迁移状态|true
health|显示应用的监控信息,授权后请求返回详细信息| false
info| 显示任何信息||false
liquibase| 显示 liquibase 数据库迁移状态|true
logfile| 返回 logfile 中的内容(如果设置了 logging.file 或 logging.path 属性).需要 MVC 支持.支持 HTTP 头的范围请求.|true
metrics| 显示当前应用的 metrices 信息|true
mappings| 显示所有 `@RequestMapping` 路径|true
shutdown| 停止应用(默认未开启)|true
trace| 显示跟踪信息(默认只显示前几个 HTTP 请求)|true

### 配置
```yaml
# 修改一个终端的敏感值
endpoints.beans.id=springbeans
endpoints.beans.sensitive=false
# 控制是否启用终端
endpoints.enabled=false
endpoints.info.enabled=true
endpoints.shutdown.enabled=true
# 控制是否启用敏感
endpoints.sensitive=true
endpoints.info.sensitive=false
# 控制 CORS
endpoints.cors.allowed-origins: http://example.com
endpoints.cors.allowed-methods: GET,POST
# 控制是否启用监控检查
management.health.defaults.enabled=false
# 控制路径和端口地址
management.context-path: /manage
management.port=8081
management.address=127.0.0.1
# 定制化通过 info 终端暴露的信息
info.app.name=MyService
info.app.description=My awesome service
info.app.version=1.0.0
# 通过 Maven 自动展开属性
# spring boot parent 使用 git 插件提供了 git.properties 文件
project.artifactId=myproject
project.name=Demo
project.version=X.X.X.X
project.description=Demo project for info endpoint
info.build.artifact=@project.artifactId@
info.build.name=@project.name@
info.build.description=@project.description@
info.build.version=@project.version@
# 控制访问管理台需要的角色
management.security.role=SUPERUSER
# 为单独的终端指定路径
endpoints.{name}.path
# 禁用 HTTP 终端
management.port=-1
# 修改 MBean 名字
endpoints.jmx.domain=myapp
endpoints.jmx.unique-names: true
```

## Remote shell
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-remote-shell</artifactId>
</dependency>
```

* 默认端口为 2000
* 命令扫描路径为
```
classpath*:/commands/**
classpath*:/crash/commands/**
```
* 可通过 `shell.command-path-patterns` 来修改命令路径
* 继承自 `org.crsh.plugin.CRaSHPlugin` 的 Bean 会自动注册
### 配置
```
shell.auth.simple.user.name
shell.auth.simple.user.password
```

## Metrics

### 监控信息
__系统监控__

键|描述|单位
----|----|----
mem | 总内存 | KB
mem.free | 空闲内存 | KB
processors | 进程数
uptime | 系统运行时间  ms
instance.uptime | 程序运行时间 | ms
systemload.average| 系统平均负载
heap<br>heap.committed<br>heap.init<br>heap.used|堆信息| KB
threads<br>thread.peak<br>thread.daemon| 线程信息
classes<br>classes.loaded<br>classes.unloaded| 类加载信息
gc.xxx.count<br>gc.xxx.time| 垃圾回收信息

__数据源监控__

键|描述
----|----
datasource.xxx.active|激活链接数
datasource.xxx.usage|当前线程池的使用情况

* `datasource.primary` 表示 `@Primary` 的数据源
* 如果一个数据源 bean 的名字是以 DataSource 结尾的,那么 metric 里只会显示之前的,例如 `myDataSource` 显示为 `datasource.my`
* 否则都是用 bean 名作为 metric 名
* 可通过注册 `DataSourcePublicMetrics` 来修改部分默认配置.
* 默认情况下会显示所有支持的元数据,可通过 `DataSourcePoolMetadataProvider` Bean 添加额外的. 请查看`DataSourcePoolMetadataProvidersConfiguration`.

__缓存监控__

键|描述
----|----
cache.xxx.size|缓存大小
cache.xxx.hit.ratio|命中率
cache.xxx.miss.ratio|未命中率


__TOMCAT SESSION__

* httpsessions.active
* httpsessions.max

### 自定义
可通过注入 CounterService 或 GaugeService 来提供应用监控, 虽然任何字符串都可以作为名字,但建议参考 [该指南](http://matt.aimonetti.net/posts/2013/06/26/practical-guide-to-graphite-monitoring/).

可通过注册 `PublicMetrics` 来做通过计算得出的统计.可通过 `MetricsEndpoint` 来定制处理方式.

### 输出监控信息

```
spring.metrics.export
  .send-latest
  .delay-millis
  .includes
  .excludes
# 也可为每个 bean 设置
spring.metrics.export.triggers.<name>.*
```

#### 输出到 Redis
```java
@Bean
@ExportMetricWriter
MetricWriter metricWriter(MetricExportProperties export) {
	return new RedisMetricRepository(connectionFactory,
      export.getRedis().getPrefix(), export.getRedis().getKey());
}
```

```
spring.metrics.export.redis.prefix: metrics.mysystem.${spring.application.name:application}.${random.value:0000}
spring.metrics.export.redis.key: keys.metrics.mysystem
```

#### 输出到 statd
```java
@Value("${spring.application.name:application}.${random.value:0000}")
private String prefix = "metrics";

@Bean
@ExportMetricWriter
MetricWriter metricWriter() {
	return new StatsdMetricWriter(prefix, "localhost", "8125");
}
```

#### 导出到 JMX
```java
@Bean
@ExportMetricWriter
MetricWriter metricWriter(MBeanExporter exporter) {
	return new JmxMetricWriter(exporter);
}
```

### 获取 XmlMapper
http://docs.spring.io/spring-boot/docs/current/reference/html/howto-spring-mvc.html

```xml
<dependency>
    <groupId>com.fasterxml.jackson.dataformat</groupId>
    <artifactId>jackson-dataformat-xml</artifactId>
</dependency>
```

```java
@Autowired
public void init(MappingJackson2XmlHttpMessageConverter xmlConverter){
    XmlMapper mapper = (XmlMapper) xmlConverter.getObjectMapper();
}
```

### 获取请求体文本

```java
@RequestMapping(path = "/echo", method = RequestMethod.POST)
public Object echo(HttpServletRequest request) throws IOException {
  String content = CharStreams.toString(new InputStreamReader(request.getInputStream()));
  return content;
}
```

### 去除错误白板页

```java
@RestController
public class IndexController implements ErrorController{

    private static final String PATH = "/error";

    private final ErrorAttributes errorAttributes;

    // 也可以自己处理错误
    @Autowired
    public IndexController(ErrorAttributes errorAttributes) {
      Assert.notNull(errorAttributes, "ErrorAttributes must not be null");
      this.errorAttributes = errorAttributes;
    }

    @RequestMapping(value = PATH)
    public String error() {
        return "Error handling";
    }

    @Override
    public String getErrorPath() {
        return PATH;
    }
}
// 默认的错误控制器为 ErrorMvcAutoConfiguration#basicErrorController
```
