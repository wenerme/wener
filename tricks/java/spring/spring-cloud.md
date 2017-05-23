# Spring Cloud
* [Spring Cloud](http://projects.spring.io/spring-cloud/)
* [Dalston.RELEASE Docs](http://cloud.spring.io/spring-cloud-static/Dalston.RELEASE)

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
* [Appendix: Compendium of Configuration Properties](http://cloud.spring.io/spring-cloud-static/Dalston.RELEASE/#_appendix_compendium_of_configuration_properties)

__bootstrap.yml__
```yaml
spring:
  application:
    name: foo
  cloud:
    config:
      uri: ${SPRING_CONFIG_URI:http://localhost:8888}
```

## Spring Cloud Netflix Eureka
* [Spring Cloud Netflix Eureka - The Hidden Manual](http://blog.abhijitsarkar.org/technical/netflix-eureka/)
* [Spring Cloud中，Eureka常见问题总结](http://www.itmuch.com/spring-cloud-sum-eureka/)
* [Eureka Clustering documentation and best practices#203](https://github.com/spring-cloud/spring-cloud-netflix/issues/203)

## spring-cloud-config
* 分为 client 端和 server 端
* 配置分为: env, resource
* 指定配置需要: application, profile, label
* 配置的默认值:
  * profile: default
  * application: ${spring.application.name}


### spring-cloud-config-clientp
* 配置类 `ConfigClientAutoConfiguration`
* 配置对象: `ConfigServiceBootstrapConfiguration`, `DiscoveryClientConfigServiceBootstrapConfiguration`

### spring-cloud-config-server
* 服务端会暴露出来相应的数据接口
* 提供加密的功能
* 后端配置支持: 文件系统 和 Git, SVN 等 VCS `AbstractScmAccessor`
* 环境
  * `EnvironmentRepository#findOne(String application, String profile, String label)`
* 资源
  * `ResourceRepository#findOne(String name, String profile, String label, String path)`
* 服务接口前缀通过 `spring.cloud.config.server.prefix` 配置
  * 最好配置一个前缀, 否则静态资源都无法访问
* 默认情况下 config-server 是不会启动 config-client 的, 需要手动指定
  * `spring.cloud.config.enabled: true`
