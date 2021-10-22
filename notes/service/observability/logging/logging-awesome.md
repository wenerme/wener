---
title: Logging Awesome
tags:
  - Awesome
---

# Logging Awesome

- Logging Stack
  - ELK
  - EFK - Elastic, Fluent, Kibana
  - PLG - Promtail, Loki, Grafana
  - FIG - Fluent, InfluxDB, Grafana
- OS Log
  - linux
    - kmsg
    - syslog
    - /var/log
  - windows
    - event log
  - macos
    - /var/log
      - system.log
      - wifi.log
      - install.log
    - /Library/Logs
    - ~/Library/Logs

---

- [banzaicloud/logging-operator](https://github.com/banzaicloud/logging-operator)
  - Fluentd and Fluentbit

## Collector

- [fluent/fluentd](https://github.com/fluent/fluentd)
  - Apache-2.0, Ruby+C
  - 去中心化插件系统
  - 基于 Tag 路由
- [fluent/fluent-bit](https://github.com/fluent/fluent-bit)
  - Apache-2.0, C
  - 支持 Go 插件 - musl 不支持
- Logstash
  - 中心化插件系统
  - 基于语句路由
- beats
  - filebeat
  - metricbeat
  - packetbeat
  - winlogbeat
  - auditbeat
  - heartbeat
  - functionbeat
- Splunk

## 日志存储

- [grafana/loki](https://github.com/grafana/loki)
  - AGPL-3.0, Go
  - 日志界的 Prometheus
- influxdb

## 参考

- [Fast and Reliable Schema-Agnostic Log Analytics Platform](https://eng.uber.com/logging)
  - ELK -> Clickhouse

# FAQ

## fluent-bit vs Fluentd

- fluent-bit
  - 更加轻量 - 运行内存 450K
  - 插件较少 - 35+
  - 强调叶子节点日志采集 - 类似 各种 beats 集合
- Fluentd
  - Ruby+C - 运行内存 40MB
  - 插件多 - 650+
  - 强调日志聚合分析处理

## Fluentd vs Logstash

- 参考
  - [Fluentd vs Logstash](https://logz.io/blog/fluentd-logstash/)
