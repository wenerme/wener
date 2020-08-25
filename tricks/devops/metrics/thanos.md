---
id: thanos
title: Thanos
---

# Thanos
## Tips
* 多租户方案
  * sidecar 配置 external label，使用多层 query
  * receive 接收多租户，但不推荐
* [存储](https://thanos.io/storage.md)
  * S3
  * GCS
  * Azure
  * OpenStack Swift
  * Tencent COS
  * AliYun OSS
* 块存储
  * 基于 Prometheus TSDB
  * 默认 2h 一个区块
  * 每个块都有对应的 index
    * 指标名字
    * 标签
    * 时间范围

## 组件
* compactor
  * 不参与集群
  * 压缩 OSS 数据
  * 下采样 - downsampling
    * 40h -> 5m
    * 10d -> 1h
  * 执行保留策略 - 删除旧数据
  * 一个 bucket 部署一个 - 并行部署多个会有问题
* query
  * 唯一可扩容的节点
  * 实现 Prometheus HTTP v1 API
  * PromQL
  * 从 StoreAPI 获取数据
    * 数据去重、合并、填充
    * 自动下采样
* query-frontend
  * 处理 `/api/v1/query_range`
  * 切分查询、记录慢查询、重试、缓存
* receive
  * 实现 Prometheus 远程写入接口，写入本地 tsdb
  * 目前只支持单个 tsdb
  * 暴露 StoreAPI
  * 实现基于推送的指标采集
  * 用于网络不互通、外部指标采集环境
  * 可以用支持多租户
* rule
  * 对查询求值 - 提供 StoreAPI，结果写入磁盘
  * 类似一个简单的 Prometheus 实例
  * 因为是查询的分布式数据，查询可能失败，用于监控时需要小心
  * 支持配置记录规则、告警规则
* sidecar
  * 上传 Prometheus 的数据到对象存储
  * 提供 StoreAPI
  * 数据有大约 2h 延时，如果 prometheus 异常数据丢失则可能丢失 2h 的监控数据
* store
  * 存储网关 - Store Gateway
  * 读取 对象存储 暴露 StoreAPI
  * 支持索引缓存
    * in-memory
    * memcached
  * 支持 Bucket 缓存 - 缓存 Prometheus 区块数据
    * memcached
* tools
  * bucket 管理工具
    * ls、verify、downsampling、inspect、replicate、web
  * 规则检查
* StoreAPI
  * 提供数据的后端接口
  * Prometheus Sidecar
  * 对象存储 - Store Gateway
  * 全局 alerting/recording 规则结果 - Ruler
  * Receiver
  * 其他 Queriers
  * 其他指标系统 - OpenTSDB

| Component | Interface               | Port  |
| --------- | ----------------------- | ----- |
| Sidecar   | gRPC                    | 10901 |
| Sidecar   | HTTP                    | 10902 |
| Query     | gRPC                    | 10903 |
| Query     | HTTP                    | 10904 |
| Store     | gRPC                    | 10905 |
| Store     | HTTP                    | 10906 |
| Receive   | gRPC (store API)        | 10907 |
| Receive   | HTTP (remote write API) | 10908 |
| Receive   | HTTP                    | 10909 |
| Rule      | gRPC                    | 10910 |
| Rule      | HTTP                    | 10911 |
| Compact   | HTTP                    | 10912 |
