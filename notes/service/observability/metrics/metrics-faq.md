---
title: 指标服务常见问题
tags:
  - FAQ
---

# 指标服务常见问题

## Thanos vs VictoriaMetrics

- 相同点
  - 为 Prometheus 提供长期存储服务
  - 高性能时序指标查询
- Thanos
  - 工具集 - 用于拼装出满足需求的 Prometheus 存储查询结构
  - 不负责存储 - 由 OSS 处理
  - 负责管理存储的数据 - 压缩、删除、下采样
  - 负责分流查询、上传本地时序 Chunk、缓存查询结果
  - 部署结构灵活 - 存储可选择混合部署 - 例如部分数据位于租户自己机房
  - 规模几乎无限制，但设计非常多的组件，门槛相对更高且必须配套 OSS 存储服务
    - Sidecar 直接上传 OSS 理论上扩容规模更大 - 异常可能丢失部分数据 2H
    - OSS 成本比 Block 存储服务成本更高
  - 支持 Promethues 协议
- VictoriaMetrics - TSDB
  - 数据库 - 提供高性能的时序数据存储和查询
  - 垂直扩容为主 - HA 模式的 Replica 也不能作为高可用
  - HA 模型增强读写性能
  - 存储数据的高可用需要额外保证 - 例如 存储于 Longhorn 或 CEPH
  - 规模有一定限制，但部署和使用简单
  - 支持更多的协议

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
