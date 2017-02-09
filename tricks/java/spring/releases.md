# Releases
* https://spring.io/blog/category/releases
* [Spring Initializr](http://start.spring.io/)

## Spring Data

### Ingalls
* [Release Train Ingalls](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Ingalls)
* [What's new](https://spring.io/blog/2017/01/30/what-s-new-in-spring-data-release-ingalls)
* Spring 4.3
* Deps
  * Cassandra 3
  * Jackson 2.8
  * Elasticsearch 2.3.3
* New
  * Spring Data LDAP
* Highlights
  * 使用 method handles 在转换子系统中操作对象属性,提升性能
  * 支持 XML 和 JSON 的 REST 映射
  * Spring Data REST 共享 Cross-Origin
  * 支持更多的 MongoDB 聚合操作
  * 支持 Redis GEO 指令
  * 更新到 Cassandra 3.0, 支持更多的类型和查询方法
  * 仓库查询方法支持 Javaslang 的 Option, 集合和 map 类型
  * 支持 Java 8 中的 Optionl 和 Stream, 支持 JSR 310

### Hopper
* [Release Train Ingalls](https://github.com/spring-projects/spring-data-commons/wiki/Release-Hopper-Ingalls)
* Spring 4.2
* Spring Data Envers
* Deps
  * Querydsl 4
  * Solr 5
  * Elasticsearch 2


## Spring Boot
### 1.5
* [1.5 Release Notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-1.5-Release-Notes)
* [1.5.1 Released](https://spring.io/blog/2017/01/30/spring-boot-1-5-1-released)
* [1.5 Configuration Changelog](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-1.5-Configuration-Changelog)
* Deps
  * Spring Data Ingalls
  * Jetty 9.4
  * JooQ 3.9
  * AssertJ 2.6.0
  * Hikari 2.5
  * Neo4J 2.1
* New
  * Cloud Foundry actuator extensions
  * LDAP support
* Deprecate
  * ApplicationStartedEvent replaced by ApplicationStartingEvent
  * Apache DBCP -> Apache DBCP 2
  * CRaSH
    * 项目没人维护
* Highlights
  * Devtools 默认不再包含在最终的 jar 中
### 1.4
* [1.4 Release Notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-1.4-Release-Notes)
* [1.4 Configuration Changelog](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-1.4-Configuration-Changelog)
* Deps
  * Hibernate 5
    * [5.0 Migration Guide](https://github.com/hibernate/hibernate-orm/blob/5.0/migration-guide.adoc)
  * Jetty 9.3
  * Tomcat 8.5
  * Jackson 2.7
  * Solr 5.5
  * Spring Data Hopper
  * Hazelcast 3.6
  * Ehcache 3.1
  * Elasticsearch 2.3
* Highlights
  * 默认不再设置 Server 头, 除非手动设置 `server.server-header`
  * `@Transactional` 默认为使用 cglib 代理
  * 支持使用图片作为 banner,例如 banner.gif, banner.jpg, banner.png
    * 可通过 banner.image.width, banner.image.height, banner.image.invert 做更多控制
  * `@JsonComponent` 支持自定义的 Jackson 序列化和反序列化
  * 统一了 `@EntityScan`
  * 添加了 `@JsonTest`, `@WebMvcTest`, `@RestClientTest`, `@DataJpaTest` 用来测试指定功能
* New
  * Couchbase
  * Neo4J
  * Redis Spring Data
  * Narayana JTA
  * Caffeine
  * Elasticsearch Jest
* Deprecate
  * `@org.springframework.boot.orm.jpa.EntityScan` -> `@org.springframework.boot.autoconfigure.domain.EntityScan`
  * `multipart.` -> `spring.http.multipart.`
  * HornetQ -> Artemis
  * spring-integration-file
  * spring-integration-http
  * spring-integration-ip
  * spring-integration-stream



### 1.3
* [1.3.5 Released](https://spring.io/blog/2016/05/10/spring-boot-1-3-5-released)

## Spring Cloud

### Dalston
* Spring Boot 1.5.x
* [Spring Cloud Dalston Release Notes](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Dalston-Release-Notes)

### Camden
* Spring Boot 1.4.x
* [Spring Cloud Camden Release Notes](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Camden-Release-Notes)

### Brixton
* Spring Boot 1.3.x
* [Spring Cloud Brixton Release Notes](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Brixton-Release-Notes)

### Angel
* Spring Boot 1.2.x
* [Spring Cloud Angel Release Notes](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Angel-Release-Notes)

## QueryDSL
http://www.querydsl.com/releases
