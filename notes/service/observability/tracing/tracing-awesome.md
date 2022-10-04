---
title: Tracing Awesome
tags:
  - Awesome
---

# Tracing Awesome

- 主流 Jaeger、Zipkin、Apache SkyWalking、CAT、Pinpoint、Elastic APM

## Service

- [openzipkin/zipkin](./zipkin.md)
  - Java
- [jaegertracing/jaeger](./jaeger.md)
  - Golang
  - Thrift
  - CNCF Jaeger, a Distributed Tracing System
  - https://jaegertracing.io/
- [apache/skywalking](./skywalking.md)
  - Java
- [lmangani/cLoki](https://github.com/lmangani/cLoki)
  - AGPL-3.0, JS
  - Loki+ClickHouse

## Integration

- [Spring Cloud Sleuth](https://spring.io/projects/spring-cloud-sleuth)
  - [参考手册](https://cloud.spring.io/spring-cloud-sleuth/reference/html/)
  - spring-cloud-sleuth-zipkin 支持集成 Zipkin，默认发送到 `http://localhost:9411`，通过 `spring.zipkin.baseUrl` 配置
  - 会记录 trace 信息到 Slf4J MDC
- [openzipkin-contrib/brave-opentracing](https://github.com/openzipkin-contrib/brave-opentracing)
  - OpenTracing 适配 Zipkin

## Spec

- [opentracing](http://opentracing.io/)
  - Vendor-neutral APIs and instrumentation for distributed tracing
- W3C [trace-context](https://github.com/w3c/trace-context)
  - HTTP 添加 trace 头 traceparent,traceparent
  - 头中信息包含 version、trace-id、parent-id、trace-flags

## Reference

- [Tracing](<https://en.wikipedia.org/wiki/Tracing_(software)>)
- Google [Dapper](https://research.google.com/pubs/pub36356.html)
  - a Large-Scale Distributed Systems Tracing Infrastructure
- APM - application performance monitor

# FAQ

## Jaeger vs Zipkin

- Jaeger
  - Golang, CNCF 项目
  - 更适用于 Kubernates 环境
  - 分为 agent、collector、query 等角色
  - 默认 0.1% 采样
- Zipkin
  - Java
  - 在容器化潮流前便已存在
  - 单服务，报表、采集
  - Spring Cloud Sleuth 有集成

**jaeger**
[![jaeger architecture](https://www.jaegertracing.io/img/architecture-v1.png)](https://www.jaegertracing.io/docs/1.12/architecture/)

**zipkin**
[![zipkin architecture](https://zipkin.io/public/img/architecture-1.png)](https://zipkin.io/pages/architecture.html)

- 参考
  - [Distributed Tracing for Microservices: Jaeger vs. Zipkin](https://www.bizety.com/2019/01/14/distributed-tracing-for-microservices-jaeger-vs-zipkin/)
  - [Zipkin vs Jaeger: Getting Started With Tracing](https://logz.io/blog/zipkin-vs-jaeger/)
