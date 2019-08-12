---
id: tracing
title: Tracing
---

# Tracing
## Tips
* [Tracing](https://en.wikipedia.org/wiki/Tracing_(software))
* Google [Dapper](https://research.google.com/pubs/pub36356.html)
  * a Large-Scale Distributed Systems Tracing Infrastructure
* [opentracing](http://opentracing.io/)
  * Vendor-neutral APIs and instrumentation for distributed tracing
* [openzipkin/zipkin](https://github.com/openzipkin/zipkin)
  * Java
* [jaegertracing/jaeger](https://github.com/jaegertracing/jaeger)
  * Golang
  * Thrift
  * CNCF Jaeger, a Distributed Tracing System
  * https://jaegertracing.io/
* [apache/skywalking](https://github.com/apache/incubator-skywalking)
  * Java
* [Spring Cloud Sleuth](https://spring.io/projects/spring-cloud-sleuth)
  * [参考手册](https://cloud.spring.io/spring-cloud-sleuth/reference/html/)
  * spring-cloud-sleuth-zipkin 支持集成 Zipkin，默认发送到 `http://localhost:9411`，通过 `spring.zipkin.baseUrl` 配置
  * 会记录 trace 信息到 Slf4J MDC
* [openzipkin-contrib/brave-opentracing](https://github.com/openzipkin-contrib/brave-opentracing)
  * OpenTracing 适配 Zipkin
* W3C [trace-context](https://github.com/w3c/trace-context)
  * HTTP 添加 trace 头 traceparent,traceparent
  * 头中信息包含 version、trace-id、parent-id、trace-flags
* APM (application performance monitor)


```bash
docker run -it --rm \
  -e COLLECTOR_ZIPKIN_HTTP_PORT=9411 \
  -p5775:5775/udp -p6831:6831/udp -p6832:6832/udp \
  -p5778:5778 -p16686:16686 -p14268:14268 -p9411:9411 \
  jaegertracing/all-in-one:latest
```

## FAQ
### Jaeger vs Zipkin
* Jaeger
  * Golang
  * CNCF 项目
  * 更适用于 Kubernates 环境
  * 分为 agent、collector、query 等角色
  * 默认 0.1% 采样
  * [spring-cloud-sleuth#628](https://github.com/spring-cloud/spring-cloud-sleuth/issues/628) - Jaeger integration
    * 可通过 [brave-opentracing](https://github.com/openzipkin-contrib/brave-opentracing) 来使用，但会丢失一些 jaeger 的特性
* Zipkin
  * Java
  * 在容器化潮流前便已存在
  * 单服务，报表、采集
  * Spring Cloud Sleuth 有集成

__jaeger__

[![jaeger architecture](https://www.jaegertracing.io/img/architecture-v1.png)](https://www.jaegertracing.io/docs/1.12/architecture/)

__zipkin__
[![zipkin architecture](https://zipkin.io/public/img/architecture-1.png)](https://zipkin.io/pages/architecture.html)

* 参考
  * [Distributed Tracing for Microservices: Jaeger vs. Zipkin](https://www.bizety.com/2019/01/14/distributed-tracing-for-microservices-jaeger-vs-zipkin/)
  * [Zipkin vs Jaeger: Getting Started With Tracing](https://logz.io/blog/zipkin-vs-jaeger/)
