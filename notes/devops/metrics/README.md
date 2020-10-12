---
id: metrics
title: 指标监控
---

# Metrics
## Tips
* [Micrometer](https://micrometer.io/)
  * [概念](https://micrometer.io/docs/concepts)
    * 纬度方式: 纬度、级联
    * 频率聚合: 客户端聚合、服务端聚合
    * 上报方式: 推、拉
* Spring Boot [Production-ready Metrics](https://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-metrics.html)
  * 基于 Micrometer
  * 对 Prometheus 暴露 `/actuator/prometheus`
* NOTE
  * 指标本身是多维数据