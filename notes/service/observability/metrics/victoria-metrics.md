---
title: VictoriaMetrics
---

# VictoriaMetrics
* 是什么？
  * 时序数据库
  * 高性能、低成本、大规模
  * 支持集群
* [VictoriaMetrics/VictoriaMetrics](https://github.com/VictoriaMetrics/VictoriaMetrics)
* 默认推荐但节点 - 小于 百万/s 的指标速率推荐单节点版本 - 通过垂直扩容/增加 CPU 内存来提升性能
  * 高压缩率 - 磁盘占用空间小 - IO 高
  * 单节点性能可参考 [measuring-vertical-scalability](https://valyala.medium.com/92550d78d8ae)
    * 1vCPU 4G - 500k/s
    * 2vCPU 8G - 800k/s
    * 64vCPU 240G - 19M/s
    * 基本呈线性增长 - 1.6-1.8x
## 集群
* 集群 - 每个组件可单独扩容 - 分支 [cluster](https://github.com/VictoriaMetrics/VictoriaMetrics/tree/cluster)
* __副本不能用于容灾__ - 通过备份容灾 - 副本可提升写入查询性能 - 扩容
  * K8S 上推荐使用带副本功能的 PV
* 副本在 vminsert 层控制 - 写入多副本
* URL 包含 `accountID:projectID` 实现多租户
  * 两个 ID 为 uint32
  * projectID 默认 0
  * 自动创建，只关心数据维度划分，不关心授权之类
  * 会自动负载到 vmstorage
  * __不支持单个请求查询多个租户__
* 组件
  * vmstorage - 存储数据 - shared noting 结构 - 节点之间不互相感知
    * vCPUs = ingestion_rate / 150K
    * `RAM = 2 * active_time_series * 1KB * replicationFactor`
    * active_time_series - 1h 内有读写
    * `storage_space = ingestion_rate * retention_seconds`
  * vminsert - 代理分发到多个 vmstorage - 一致性 Hash
    * vCPUs = ingestion_rate / 150K
    * 单个性能应该与 vmstorage 相同
    * 内存 1G+
  * vmselect - 通过 vmselect 聚合查询数据

# FAQ
## VictoriaMetrics vs Thanos
两者区别点大于相同点。

VictoriaMetrics 是 TSDB - 负责存储数据，insert 和 select 相当于 storage 的接口。
着重考虑读写路径。

Thanos 是 Prometheus 体系下扩容的工具集。
不负责存储，但针对查询有较多优化 - 分片、缓存。

两者可配合使用以达到最佳效果。

* Thanos
  * 组件合集 - sidecar, store, query, compact, rule, receive, query-frontend
    * 不可独立使用，配套组合实现所需架构
  * 不关心数据如何存储 - 插件式
  * 结构灵活，针对查询有较多优化
* VictoriaMetrics
  * 可独立使用 - 单可执行文件
  * 集群版本包含三个组件 insert, storage, select
  * 单次查询不可跨租户
