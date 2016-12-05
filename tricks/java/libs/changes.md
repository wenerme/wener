# CHANGELOG

## Guava
### 20

__主要变更__

* 2016.10.28
* [Release20](https://github.com/google/guava/wiki/Release20)
* 添加了 `common.graph` 包
* common.hash
  * 添加了 FarmHash Fingerprint64 和一些 HMAC 算法
* common.math
  * 主要添加了统计相关的类型
  * Quantiles
  * Stats 和 StatsAccumulator, PairedStats 和 PairedStatsAccumulator
  * LinearTransformation


## Guice
### 4.1.0

* [Guice41](https://github.com/google/guice/wiki/Guice41)
* 2016.6.27
* 性能优化,问题修复,错误调整

## Spring
http://docs.spring.io/spring-framework/docs/4.3.x/spring-framework-reference/htmlsingle/#new-in-4.3
### 4.3.x

* 如果 Bean 只有一个构造函数,可以不指定 `@Autowired`
* `@Configuration` 类支持构造函数注入
* `@EventListener` 中的条件 SpEL 可引用 bean `@beanName.method()`
* `@Scheduled` 和 `@Schedules` 可用于元注解,实现自定义注解
* 缓存
  * 缓存的 SpEL 可访问 bean `@beanName.method()`
* Web
  * 支持 `HEAD` 和 `OPTION` [操作](http://docs.spring.io/spring-framework/docs/4.3.x/spring-framework-reference/htmlsingle/#mvc-ann-requestmapping-head-options)
  * 新增 `@GetMapping`, `@PostMapping`, `@PutMapping`, `@DeleteMapping`, 和 `@PatchMapping`
  * 新增 `@RequestScope`, `@SessionScope`, 和 `@ApplicationScope`
  * 新增 `@RestControllerAdvice`
  * `@ResponseStatus` 现在可指定在类上,所有方法继承
  * 新增 `@SessionAttribute`
  * 新增 `@RequestAttribute`
* 依赖
  * Hibernate ORM 5.2
  * Hibernate Validator 5.3
  * Jackson 2.8
  * OkHttp 3.x
  * Tomcat 8.5 as well as 9.0 milestones
  * Netty 4.1
  * Undertow 1.4
  * WildFly 10.1

### 4.2.x


* 完善对 Java 8 的支持
  * Java 8 的新增类型
  * Java 8 的接口默认方法支持
* 支持 Hibernate ORM 5.0
* Web
  * 支持 HTTP SSE
  * 內建支持 CORS
  * `@Controller` 可返回 `java.util.concurrent.CompletableFuture`
  * 静态资源支持断点续传
  * `RestTemplate` 集成 OkHTTP
  * 添加 `RequestBodyAdvice` 扩展点,以支持在 `@RequestBody` 上使用 `@JsonView`

## SpringBoot

### 1.4
* [Spring-Boot-1.4-Release-Notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-1.4-Release-Notes)
* https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-1.4-Configuration-Changelog
* 代号为 Ingalls
* 移除对 Log4j 1 的支持
* 依赖版本更新
  * Hibernate 5.0
  * Spring Framework 4.3
  * Tomcat 8.5
  * Jackson 2.7
* 合并了 EntityScan 标签
* 废弃 Guava 缓存,推荐使用 Caffeine
* 集成对 Neo4j 配置
* 支持 Redis Spring Data Repository
* 支持 Elasticsearch Jest
* 添加了 `@JsonComponent` 以支持自定义 Jackson 的序列化和反序列化
* Actuator
  * 提供 InfoContributor 用于获取构建和应用的信息
* 废弃 Velocity
* 使用 artemis 替代 hornetq

## Hibernate
### 5.0
* https://github.com/hibernate/hibernate-orm/blob/5.0/migration-guide.adoc
