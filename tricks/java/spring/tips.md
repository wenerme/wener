
## Classes
* Spring 缓存拦截 `org.springframework.cache.interceptor.CacheInterceptor`
  * 每个操作由不同的 `org.springframework.cache.interceptor.CacheOperation`
  * 实际对缓存的操作位于 `org.springframework.cache.interceptor.CacheAspectSupport#execute(CacheOperationInvoker, CacheAspectSupport.CacheOperationContexts)`
* Spring Data
  * Repository 的基本实现 `org.springframework.data.jpa.repository.support.SimpleJpaRepository`
  * Repository CRUD 方法调用元数据构建和缓存 `org.springframework.data.jpa.repository.support.CrudMethodMetadataPostProcessor.CrudMethodMetadataPopulatingMethodInterceptor`
  * 获取当前事务的信息 `org.springframework.transaction.support.TransactionSynchronizationManager`
  * 拦截实现事务
    * 方法拦截 `org.springframework.transaction.interceptor.TransactionInterceptor`
    * 具体处理类 `org.springframework.transaction.interceptor.TransactionAspectSupport#invokeWithinTransaction`
  * 处理 Repository 上的 `default` 方法调用 `org.springframework.data.projection.DefaultMethodInvokingMethodInterceptor`
  * 处理定义的方法查询 `org.springframework.data.repository.core.support.RepositoryFactorySupport`
  * 查询类接口 `org.springframework.data.repository.query.RepositoryQuery`
  * 执行 JPA 操作 `org.springframework.data.jpa.repository.query.JpaQueryExecution`
  * Repository 方法名编译后的语法树 `org.springframework.data.repository.query.parser.PartTree`
  * 最终构建为 `javax.persistence.Query`
  * Hibernate 支持的 Hint `org.hibernate.jpa.QueryHints`, `org.hibernate.annotations.QueryHints`
    * 可通过 Hint 设置缓存等
    * 将 Hint 转换为具体设置 `org.hibernate.jpa.spi.BaseQueryImpl#setHint`
  * Hibernate 集合缓存处理 `org.hibernate.jpa.spi.BaseQueryImpl#setHint`
* Spring AOP
  * 动态代理处理类 `org.springframework.aop.framework.JdkDynamicAopProxy`
* 大多 Spring AOP 的拦截点都可以通过 `spring-aspects` 中定义的 AspectJ 来直观的看到


## Spring AOP vs AspectJ

__Spring AOP__

优点

* 比 AspectJ 简单, 不需要 LTW (load-time weaving) 或 AspectJ 编译
* 当使对Spring AOP 使用 `@Aspect` 注解时会切换为使用 AspectJ AOP
* 使用 Proxy 和 Decorator 模式

缺点

* 基于代理的 AOP, 因此只能使用方法执行作为切点
* 当在相同类中调用其他方法时,切面不会生效.
* 只对 Spring 创建的类生效
* 调用栈冗余较多且无意义
* 需要额外的运行时

__AspectJ__

优点

* 支持所有切点
* 运行时依赖相对简单
* 速度更快

缺点

* 确保织入的切面是你想要织入的切面
* 需要额外的构建过程来使用 AspectJ 编译器或需要设置 LTW (load-time weaving)


* [Spring AOP vs AspectJ](http://stackoverflow.com/questions/1606559)
* [Choosing which AOP declaration style to use](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/aop.html#aop-choosing)

## 在 REST 中使用 spring-data-rest 分页
```java
// JPA data-rest
@RestResource(path = "nameStartsWith", rel = "nameStartsWith")
public Page findByNameStartsWith(@Param("name") String name, Pageable p);
```

## 记录启动端口和进程 ID
```java
SpringApplication application = new SpringApplication(ServerApplication.class);
application.addListeners(new ApplicationPidFileWriter(), new EmbeddedServerPortFileWriter());
application.run(args);
SpringApplication.run(ServerApplication.class, args);
```

默认 PID 文件为 `application.pid`, 默认 PORT 文件为 application.port

```yml
# 修改 PID 文件
spring.pid.file: app.pid
# 修改 PORT 文件
portfile: app.port
```

## 修改 DATA REST 返回页的条数
```java
@Configuration
static class RepositoryRestConfigurer extends RepositoryRestConfigurerAdapter {
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config
                .setDefaultPageSize(10)
                .setMaxPageSize(20);
    }
}
```

## Spring Boot 启动非常慢 Tomcat SessionIdGeneratorBase
```
INFO 1 --- [localhost-startStop-1] o.a.c.util.SessionIdGeneratorBase        : Creation of SecureRandom instance for session ID generation using [SHA1PRNG] took [48,326] milliseconds.
```

在启动时为 JVM 添加 `-Djava.security.egd=file:/dev/./urandom`.

```
java -Djava.security.egd=file:/dev/./urandom -jar myjar.jar app.Main.
```


## JSON 时间格式选择
http://stackoverflow.com/questions/10286204/the-right-json-date-format

"yyyy-MM-dd'T'HH:mm:ssZ"
"2012-04-23T18:25:43.511Z"              JavaScript built-in JSON object
"2012-04-21T18:25:43-05:00"             ISO 8601

2012-04-23T18:25:43.511Z

Here's why:

It's human readable but also succinct

It sorts correctly

It includes fractional seconds, which can help re-establish chronology

It conforms to ISO 8601

ISO 8601 has been well-established internationally for more than a decade

ISO 8601 is endorsed by W3C, RFC3339, and XKCD

## 配置 Spring MVC 使用 ObjectMapper

默认 Spring MVC 在序列化 JSON 时不会使用系统中配置的 ObjectMapper.

```java
@Configuration
public static class WebMvcConfigurer extends WebMvcConfigurerAdapter {
    @Autowired
    ObjectMapper objectMapper;
    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        converters.add(new MappingJackson2HttpMessageConverter(objectMapper));
    }
}
```

然后可通过配置修改 Jackson 格式
```yaml
spring:
  jackson:
    date-format: yyyy-MM-dd HH:mm:ss
    serialization-inclusion: non_null
    serialization:
      WRITE_DATES_AS_TIMESTAMPS: false
      WRITE_NULL_MAP_VALUES: false
```

## 修改默认分页数量
1. 通过配置对象修改
```java
@Configuration
static class RepositoryRestConfigurer extends RepositoryRestConfigurerAdapter {
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config
                .setDefaultPageSize(10)
                .setMaxPageSize(20);
    }
}
```
2. 通过配置文件修改
```yaml
spring:
  data:
    rest:
      default-page-size: 10
      max-page-size: 20
```
