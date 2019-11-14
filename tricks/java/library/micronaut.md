# micronaut

## Tips
* A modern, JVM-based, full-stack framework for building modular, easily testable microservice and serverless applications.
* [micronaut-projects/micronaut-core](https://github.com/micronaut-projects/micronaut-core)
* 原 Grails 团队开发 - 对标 Spring 能力
* 支持 Java、Kotlin、Groovy
* 支持 Graalvm Native 编译
* 主要特性
  * IoC - jsr330 javax.inject - 避免反射，类似于针对服务端的 Dagger
    * 有不少额外的能力
    * 编译时候生成元数据类，生成 services 定义，通过 ServiceLoader 加载
    * graal 下会生成 reflect.json
  * AOP
    * 非反射，编译时生成
  * Validate - 校验
    * 支持 Hiberante Validate
  * REST 注解 - 类似于 jaxrs
  * 默认自动配置
  * 配置共享
  * 服务发现
  * HTTP 路由
  * HTTP 客户端和客户端负载均衡
* 主要优势
  * 快速启动
  * 内存占用少
  * 最少限度使用反射
    * 路径参数编译时校验
  * 最少限度使用代理
  * 单元测试容易
* 主要依赖
  * Netty - HTTP服务端和客户端
  * Hibernate

```bash
# 安装 mn 命令行
sdk install micronaut
# 或
brew install micronaut
```