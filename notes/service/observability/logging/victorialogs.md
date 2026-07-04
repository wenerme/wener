---
title: VictoriaLogs
---

# VictoriaLogs

- [VictoriaMetrics/VictoriaLogs](https://github.com/VictoriaMetrics/VictoriaLogs)
  - Apache-2.0, Go + TypeScript
  - high-performance, lightweight, schema-free log database
- 文档：<https://docs.victoriametrics.com/victorialogs/>
- 默认端口：`9428`
- 查询语言：LogsQL

## 概述

VictoriaLogs 是 VictoriaMetrics 团队开发的日志数据库，定位是轻量、低资源占用、易部署的日志存储与查询系统。

特点：

- 单节点和集群版本都开源可用。
- 单个 zero-config executable，部署和运维复杂度较低。
- 支持水平扩展和垂直扩展。
- 支持从常见日志采集器写入。
- 支持高基数字段，例如 `trace_id`、`user_id`、`ip`。
- 适合 wide events，即单条日志包含大量字段的场景。
- 内置 Web UI、Grafana plugin、CLI 查询工具。
- 支持 live tail、周边日志查询、日志告警、多租户。

## 部署

### Docker

```bash
docker run --rm -it \
  -p 9428:9428 \
  -v victoria-logs-data:/victoria-logs-data \
  docker.io/victoriametrics/victoria-logs:latest
```

### 常用参数

```bash
victoria-logs \
  -storageDataPath=/var/lib/victoria-logs \
  -retentionPeriod=30d
```

| 参数                                | 说明                                |
| ----------------------------------- | ----------------------------------- |
| `-httpListenAddr`                   | HTTP 监听地址                       |
| `-storageDataPath`                  | 数据目录，默认 `victoria-logs-data` |
| `-retentionPeriod`                  | 按时间保留日志，默认 7 天           |
| `-futureRetention`                  | 接收未来时间戳日志的范围，默认 2 天 |
| `-maxBackfillAge`                   | 限制可回填日志的最大年龄            |
| `-retention.maxDiskSpaceUsageBytes` | 按磁盘空间上限保留                  |
| `-retention.maxDiskUsagePercent`    | 按磁盘使用百分比保留                |
| `-delete.enable`                    | 启用删除日志 API                    |

## 数据写入

支持多种日志采集器和协议：

- vlagent
- Filebeat
- Fluent Bit
- Fluentd
- Logstash
- OpenTelemetry Collector
- Promtail / Loki push API
- Vector
- Telegraf
- Journald
- Syslog
- Splunk HEC
- Datadog Agent

## 查询

- LogsQL：VictoriaLogs 的查询语言。
- 内置 Web UI 可用于日志探索。
- Grafana plugin 可用于构建日志面板。
- `vlogscli` 可用于命令行查询。

## 数据模型

常见字段：

| 字段          | 说明                                                     |
| ------------- | -------------------------------------------------------- |
| `_time`       | 日志时间                                                 |
| `_msg`        | 日志消息内容                                             |
| stream fields | 用于划分日志流的字段，类似 Loki labels，但可支持更高基数 |
| normal fields | 普通日志字段，可用于过滤、提取、聚合                     |

:::tip
VictoriaLogs 支持高基数字段，但仍应避免把完全无边界增长的字段滥用为 stream fields。常见做法是把 `service`、`namespace`、`pod`、`host` 作为流字段，把 `trace_id`、`user_id` 作为普通字段用于查询。
:::

## Retention

- 默认保留时间：7 天。
- `-retentionPeriod` 支持从 `1d` 到 `100y`。
- 日志按天分区存储，过期分区会被自动删除。
- 也可以按磁盘空间使用量做 retention。
- 建议为数据目录保留至少 20% 空闲空间，避免写入和查询性能下降。

```bash
# 保留 8 周
victoria-logs -retentionPeriod=8w

# 按磁盘空间限制保留
victoria-logs \
  -retention.maxDiskSpaceUsageBytes=100GiB \
  -retentionPeriod=100y

# 按磁盘使用百分比限制保留
victoria-logs \
  -retention.maxDiskUsagePercent=80 \
  -retentionPeriod=100y
```

## 监控

VictoriaLogs 暴露 Prometheus 格式的内部指标：

```bash
curl http://localhost:9428/metrics
```

建议：

- 使用 VictoriaMetrics、vmagent 或 Prometheus 采集 `/metrics`。
- 安装官方 Grafana dashboard。
- 设置 `alerts-vlogs.yml` 和 `alerts-health.yml`。
- 排障时同时查看 VictoriaLogs 自身 stdout 日志。

常见指标：

```promql
# 被 retention 或时间范围拒收的日志
rate(vl_rows_dropped_total[5m]) > 0
```

## 运维注意

- 推荐文件系统：`ext4`。
- 存储超过 1TB 时，官方建议 `mkfs.ext4` 启用 `64bit,huge_file,extent`。
- 升级/降级通常安全，但仍应先读 release notes。
- 升级时发送 `SIGINT` 优雅停止，再启动新版本。
- 删除日志需要显式开启 `-delete.enable`，删除大规模数据可能很慢，不适合频繁执行。
- 可通过 partition snapshot 做备份和恢复。

## 对比

| 系统          | 侧重点                                            |
| ------------- | ------------------------------------------------- |
| VictoriaLogs  | 低资源占用、schema-free、LogsQL、易部署           |
| Loki          | label-based log store，和 Grafana 生态集成紧密    |
| Elasticsearch | 通用搜索/分析引擎，功能强但资源和运维成本较高     |
| ClickHouse    | OLAP 引擎，适合结构化日志分析，需要自行设计表结构 |

## 参考

- <https://docs.victoriametrics.com/victorialogs/>
- <https://github.com/VictoriaMetrics/VictoriaLogs>
- <https://docs.victoriametrics.com/victorialogs/data-ingestion/>
- <https://docs.victoriametrics.com/victorialogs/querying/>
- <https://docs.victoriametrics.com/victorialogs/logsql/>
