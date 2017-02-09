# Spring Cloud
* [Spring Cloud](http://projects.spring.io/spring-cloud/)

## 主要特性
* 分布式/版本化 配置管理
* 服务注册和发现
* 服务路由
* 服务直接调用
* 负载均衡
* Circuit Breakers
* 全局锁
* 主节点选举和集群状态管理
* 分布式消息传递

## 应用上下文
该模块会在 SpringApplication 或 SpringApplicationBuilder 上添加一个启动层,

## Reference

* String Cloud 会在程序上添加一个启动层,使用 boostrap.yml 来控制启动层的行为
* 如果需要程序相关的配置,建议设置 `spring.application.name`.
* 在启动时设置 `spring.cloud.bootstrap.enabled=false` 可禁用该启动层.
* 启动层负责拿到具体的程序配置,具体配置可以使用不同的配置源.
* [Appendix: Compendium of Configuration Properties](http://cloud.spring.io/spring-cloud-static/Camden.SR4/#_appendix_compendium_of_configuration_properties)

__bootstrap.yml__
```yaml
spring:
  application:
    name: foo
  cloud:
    config:
      uri: ${SPRING_CONFIG_URI:http://localhost:8888}
```
