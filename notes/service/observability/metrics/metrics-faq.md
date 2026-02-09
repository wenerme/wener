---
title: 指标服务常见问题
tags:
  - FAQ
---

# 指标服务常见问题


- VictoriaMetrics
  - promscrape.maxScrapeSize 抓取默认 16M
  - scrape_response_size_bytes
  - 如果 Unique Label 太多可能导致抓取失败, 可以调整大小
  - remote_write maxInsertRequestSize 默认 32MB
- prometheus body_size_limit=0
  - 解压后的 body size
  - 是 stream 解析
  - 默认不限制大小

## 合理指标数量

- 指标条数 (Series Count):
  - ✅ 非常健康: < 1,000 条
  - 👌 正常范围: 1,000 ~ 5,000 条
  - ⚠️ 警告水位: > 10,000 条（开始影响 Scrape 性能）
  - ❌ 危险水位: > 50,000 条（极易导致抓取超时或 OOM）
- 数据大小 (Response Body Size):
  - ✅ 合理大小: < 1 MB
  - ⚠️ 边缘大小: 2 MB ~ 5 MB
  - ❌ 危险大小: > 10 MB

---

- `Histogram = _bucket + _count + _sum`
  - `_bucket` 一般 10-15 个

## Four Golden Signals

- Latency
- Traffic
- Errors
- Saturation
- 磁盘、网络、CPU

```bash
iostat -d -x 1
pidstat -d 1
iotop
```

- https://blog.devgenius.io/linux-disk-i-o-performance-1e920faba23

## vmagent vs prometheus vs prometheus agent

- vmagent
  - 比 prometheus 使用更少资源
  - 单个 remoteWrite.url 阻塞不影响其他健康 remoteWrite
  - 同时支持 pull & push
  - 支持 relabel
  - 用于 remote write 场景
- prometheus
  - 功能完善 - 提供查询、索引等
  - 面向独立使用场景
  - 对磁盘有一定要求
- prometheus agent
  - 与 vmagent 角色相似
  - 只能 pull
  - 不能 relabel
- prometheus pushgateway
  - 提供 push 能力

---

- [What is the difference between vmagent and Prometheus?](https://docs.victoriametrics.com/FAQ.html#what-is-the-difference-between-vmagent-and-prometheus)

## vmsingle vs prometheus

- vmsingle
  - 功能基本等同 prometheus
  - 存储性能优于 prometheus
  - 不支持 RemoteRead
  - 支持更多协议
  - 内置的 vmui 比 prometheus 弱
- prometheus
  - 功能完善
  - 支持 RemoteRead

## Thanos vs VictoriaMetrics

两者区别点大于相同点。

VictoriaMetrics 是 TSDB - 负责存储数据，insert 和 select 相当于 storage 的接口。
着重考虑读写路径。

Thanos 是 Prometheus 体系下扩容的工具集。
不负责存储，但针对查询有较多优化 - 分片、缓存。

两者可配合使用以达到最佳效果。

- 相同点
  - 为 Prometheus 提供长期存储服务
  - 高性能时序指标查询
- Thanos
  - 组件合集/工具集 - sidecar, store, query, compact, rule, receive, query-frontend
    - 用于拼装出满足需求的 Prometheus 存储查询结构
    - 可独立使用，配套组合实现所需架构
    - 结构灵活 - 复杂
  - 不关心数据如何存储 - 插件式
  - 结构灵活，针对查询有较多优化
  - 不负责存储 - 由 OSS 处理
    - **不存储数据**
  - 负责管理存储的数据 - 压缩、删除、下采样
  - 负责分流查询、上传本地时序 Chunk、缓存查询结果
  - 部署结构灵活 - 存储可选择混合部署 - 例如部分数据位于租户自己机房
  - 规模几乎无限制，但设计非常多的组件，门槛相对更高且必须配套 OSS 存储服务
    - Sidecar 直接上传 OSS 理论上扩容规模更大 - 异常可能丢失部分数据 2H
    - OSS 成本比 Block 存储服务成本更高
  - 支持 Promethues 协议
  - **优点**
    - 组件丰富、灵活
  - **缺点**
    - 依赖 OSS 存储
    - compact 需要拉回 oss 数据进行操作 - oss 流量大，速度影响 compact 时间
- VictoriaMetrics - TSDB
  - 数据库 - 提供高性能的时序数据存储和查询
    - **会实际存储数据**
  - 垂直扩容为主 - HA 模式的 Replica 也不能作为高可用
  - HA 模型增强读写性能
  - 存储数据的高可用需要额外保证 - 例如 存储于 Longhorn 或 CEPH
  - 支持更多的协议 - prometheis,datalog,influx,opentsdb
  - 集群版本包含三个基本组件 - insert, storage, select
  - 单次查询不可跨租户
  - **优点**
    - vmsingle 部署和使用简单
    - vmcluster 结构灵活
    - 不依赖外部存储服务
  - **缺点**
    - vmsingle 和 vmcluster 差异大 - 建议支持使用 vmcluster
    - vmsingle 不支持多租户

---

- [VictoriaMetrics vs Thanos](https://docs.victoriametrics.com/FAQ.html#what-is-the-difference-between-victoriametrics-and-thanos)

## VictoriaMetrics vs TimeScaleDB

- 相同点
  - 都是 TSDB
- TimeScaleDB
  - 基于 PostgreSQL
    - 熟悉的运维
    - 存储效率低于专门的时序存储
    - 简单易用
  - 2.0 支持集群
  - SQL 查询
    - 更加灵活
    - 更容易与业务结合
    - 学习门槛相对更低
  - 通过适配器支持其他协议
  - 先是基于 SQL 的 TSDB 其次再是 Metric 指标长期存储服务
- VictoriaMetrics
  - 自主实现数据存储底层 - 更高效
  - 增强 PromQL 查询
  - 分为 写入、查询、存储 组件 - 写入和查询和独立扩容
