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
* [Eureka at a glance](https://github.com/Netflix/eureka/wiki/Eureka-at-a-glance)
* [Spring Cloud Netflix Eureka - The Hidden Manual](http://blog.abhijitsarkar.org/technical/netflix-eureka/)
* [Spring Cloud中，Eureka常见问题总结](http://www.itmuch.com/spring-cloud-sum-eureka/)
* [Eureka Clustering documentation and best practices#203](https://github.com/spring-cloud/spring-cloud-netflix/issues/203)

## zuul
* [Netflix/zuul](https://github.com/Netflix/zuul)
  * Zuul is a gateway service that provides dynamic routing, monitoring, resiliency, security, and more.
* `ZuulServlet`
  * 主要入口
  * 负责初始化 RequestContext
    * 设置请求和响应对象
  * 将请求代理给过滤器处理
  * 分文前中后和异常步骤
  * 默认会开启 buffer-requests, 将请求体缓存起来
  * 响应也是会缓冲起来
* `RequestContext.getCurrentContext()`
  * 请求上下文信息
  * 线程相关
  * 集成自 ConcurrentHashMap ,用于存储额外信息
  * 包含请求和响应对象
* `FilterProcessor.getInstance()`
  * 核心的过滤处理
* `FilterLoader.getInstance()`
  * 加载和编译过滤器 `ZuulFilter`
* `ZuulFilter`
  * 实际处理的过滤器
  * 基本属性
    * 类型
      * error, post, pre, route
    * 顺序
  * `ZuulFilterResult` 执行结果
    * `ExecutionStatus` 结果状态
      * SUCCESS(1), SKIPPED(-1), DISABLED(-2), FAILED(-3);
    * 异常
    * 结果
* `TracerFactory`
  * 跟踪调用链
* 扩展

#### 常见问题
##### 无法反向代理 WebSockets
##### 无法基于域名反向代理

### Spring Cloud Netflix Zuul
* 集成 Zuul
* 实现反向代理
* 简化配置
* 实现了很多 `ZuulFilter`
* `@EnableZuulProxy`
  * 主要用于反向代理
  * `ZuulProxyConfiguration`
  * `Zuul (Discovery)` 特性
* `@EnableZuulServer`
  * 通用的 Zuul 服务
  * `Zuul (Simple)` 特性
* `ServiceRouteMapper`
  * 将 ServiceId 转为路由名
* `RouteLocator`
  * 核心的路由定位接口
  * `DiscoveryClientRouteLocator`
    * 主要实现
    * 基于 `DiscoveryClient`
* `ProxyRequestHelper`
  * 反向代理的辅助工具类
  * 主要用于构建反向代理的请求
* `FilterConstants`
  * 定义主要用到的常量
* `ZuulFilter`
  * `PreDecorationFilter`
    * 前过滤器
    * 设置代理相关的头
  * 确定代理的目标
  * `RibbonRoutingFilter`
    * 通过 ServiceId 反向代理的路过最终会由该过滤器处理, 会构建一个 RibbonCommand 进行执行请求


#### FAQ

##### 不能动态配置
* [#706](https://github.com/spring-cloud/spring-cloud-netflix/issues/706)

```java
// 通过刷新来获取新的配置使得配置生效
// 只能使得修改生效,不能使得新增和删除生效
// 修改如果从 url 修改为 serviceid 也是不会生效的
@Bean(name="zuul.CONFIGURATION_PROPERTIES")
@RefreshScope
@ConfigurationProperties("zuul")
public ZuulProperties zuulProperties() {
   return new ZuulProperties();
}
```

## spring-cloud-config
* 分为 client 端和 server 端
* 配置分为: env, resource
* 指定配置需要: application, profile, label
* 配置的默认值:
  * profile: default
  * application: ${spring.application.name}
* `RefreshEndpoint`
  * 用于刷新拉取配置
* `RefreshAutoConfiguration`

### spring-cloud-config-client
* `ConfigClientAutoConfiguration`
  * `ConfigClientWatch`
    * 配置监控刷新, 默认未开启
    * `spring.cloud.config.watch.enabled`
    * 默认初始延时 `spring.cloud.config.watch.initialDelay` 为 180s
    * 默认间隔 `spring.cloud.config.watch.delay` 为 500ms
    * `config.client.state`
      * 客户端状态是否发生变化的依据
      * 由 `ConfigServicePropertySourceLocator` 放入

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
