---
id: thanos
title: Thanos
---

# Thanos

## Tips

- 多租户方案
  - sidecar 配置 external label，使用多层 query
  - receive 接收多租户，但不推荐
    - 适用于网络隔离场景，querier 无法直接访问 sidecar 时
- [存储](https://thanos.io/storage.md)
  - S3
  - GCS
  - Azure
  - OpenStack Swift
  - Tencent COS
  - AliYun OSS
- 块存储
  - 基于 Prometheus TSDB
  - 默认 2h 一个区块
  - 每个块都有对应的 index
    - 指标名字
    - 标签
    - 时间范围

## 组件

- compactor
  - 不参与集群
  - 压缩 OSS 数据
  - 下采样 - downsampling
    - 40h -> 5m
    - 10d -> 1h
  - 执行保留策略 - 删除旧数据
  - 一个 bucket 部署一个 - 并行部署多个会有问题
- query
  - 唯一可扩容的节点
  - 实现 Prometheus HTTP v1 API
  - PromQL
  - 从 StoreAPI 获取数据
    - 数据去重、合并、填充
    - 自动下采样
- query-frontend
  - 处理 `/api/v1/query_range`
  - 切分查询、记录慢查询、重试、缓存
- receive
  - 实现 Prometheus 远程写入接口，写入本地 tsdb
  - 目前只支持单个 tsdb
  - 暴露 StoreAPI
  - 实现基于推送的指标采集
  - 用于网络不互通、外部指标采集环境
  - 可以用支持多租户
- rule
  - 对查询求值 - 提供 StoreAPI，结果写入磁盘
  - 类似一个简单的 Prometheus 实例
  - 因为是查询的分布式数据，查询可能失败，用于监控时需要小心
  - 支持配置记录规则、告警规则
- sidecar
  - 上传 Prometheus 的数据到对象存储
  - 提供 StoreAPI
  - 要求 prometheus 设置参数
    - `--storage.tsdb.min-block-duration=2h`
    - `--storage.tsdb.max-block-duration=2h`
  - 数据有大约 2h 延时，如果 prometheus 异常数据丢失则可能丢失 2h 的监控数据
  - 要求 prometheus 配置 external_labels - 用于去重
  - 默认不会上传已压缩数据
    - tsdb 块下 meta.json 里的 `compaction.level` 表示了压缩级别 - 1 为未压缩
    - `--shipper.upload-compacted` 上传压缩数据 - 用于第一次迁移
- store
  - 存储网关 - Store Gateway
  - 读取 对象存储 暴露 StoreAPI
  - 支持索引缓存
    - in-memory
    - memcached
  - 支持 Bucket 缓存 - 缓存 Prometheus 区块数据
    - memcached
- tools
  - bucket 管理工具
    - ls、verify、downsampling、inspect、replicate、web
  - 规则检查
- StoreAPI
  - 提供数据的后端接口
  - Prometheus Sidecar
  - 对象存储 - Store Gateway
  - 全局 alerting/recording 规则结果 - Ruler
  - Receiver
  - 其他 Queriers
  - 其他指标系统 - OpenTSDB
- [G-Research/thanos-remote-read](https://github.com/G-Research/thanos-remote-read)
  - 将 remove read 暴露为 StoreAPI
  - 也可以使用 Sidecar + Prometheus Remote Read 来达到相同目的

| Component | Interface               | Port  |
| --------- | ----------------------- | ----- |
| Sidecar   | gRPC                    | 10901 |
| Sidecar   | HTTP                    | 10902 |
| Query     | gRPC                    | 10903 |
| Query     | HTTP                    | 10904 |
| Store     | gRPC                    | 10905 |
| Store     | HTTP                    | 10906 |
| Receive   | gRPC (StoreAPI)         | 10907 |
| Receive   | HTTP (remote write API) | 10908 |
| Receive   | HTTP                    | 10909 |
| Rule      | gRPC                    | 10910 |
| Rule      | HTTP                    | 10911 |
| Compact   | HTTP                    | 10912 |

```bash
# macOS
brew install thanos

# external_labels 是必须的
cat <<YAML > prometheus.yaml
global:
  external_labels:
    cluster: test
    replica: svr-1
  scrape_interval: 15s

scrape_configs:
  - job_name: "prometheus"
    static_configs:
    - targets: ["localhost:9090"]

  - job_name: "node"
    static_configs:
    - targets: ["localhost:9100"]
YAML

# 默认参数
# http://localhost:9090
prometheus \
  --config.file="prometheus.yml" \
  --storage.tsdb.path=data/ \
  --storage.tsdb.max-block-duration=2h \
  --storage.tsdb.min-block-duration=2h \
  --web.enable-lifecycle \
  --web.enable-admin-api

cat <<YAML > thanos-store.yaml
type: S3
config:
  bucket: "metrics"
  endpoint: "minio.cluster.internal"
  insecure: true
  signature_version2: false
  access_key: "VS8RNK4LTCSUI1Q3ZMR2"
  secret_key: "uyMmzlJ5ZDxAyK0NAk4rVz+yMZj1nX+WFO3PMs0i"
YAML
# Sidecar 上传 chunk 暴露 prometheus 为 StoreAPI
# 默认 http://localhost:10902 grpc://localhost:10901
thanos sidecar \
  --tsdb.path="./data" \
  --prometheus.url=http://localhost:9090 \
  --objstore.config-file=thanos-store.yaml \
  --http-address="0.0.0.0:10902" \
  --grpc-address="0.0.0.0:10901"

# 暴露 S3 为 StoreAPI
# 修改端口避免冲突
thanos store \
    --http-address=0.0.0.0:10912 \
    --grpc-address=0.0.0.0:10911 \
    --data-dir="./store-cache" \
    --objstore.config-file=thanos-store.yaml

# 查询
# 修改端口避免冲突
# 查询 UI http://localhost:11902/graph
# --store 为后端
thanos query \
    --http-address=0.0.0.0:11902 \
    --grpc-address=0.0.0.0:11901 \
    --store=localhost:10901 \
    --store=localhost:10911


# 压缩
# --data-dir cache blocks and process compactions
# --wait 等待新的任务，默认执行完成后退出
thanos compact \
  --http-address=0.0.0.0:12902 \
  --data-dir=thanos-compact \
  --objstore.config-file=thanos-store.yaml \
  --wait
```

## 存储配置
* [Storage](https://thanos.io/tip/thanos/storage.md)

```yaml
---
# S3 常用配置
type: S3
config:
  bucket: ""
  endpoint: ""
  # HTTP 还是 HTTPS
  insecure: true
  access_key: ""
  secret_key: ""
  # 部分 S3 实现需要设置为 false
  signature_version2: false
  # multipart 上传的单块 大小 - 部分 S3 实现需要修改
  # 0 -> 默认 128m
  part_size: 0

---
# S3 完整配置
type: S3
config:
  bucket: ""
  endpoint: ""
  region: ""
  access_key: ""
  insecure: false
  signature_version2: false
  secret_key: ""
  put_user_metadata: {}
  http_config:
    idle_conn_timeout: 1m30s
    response_header_timeout: 2m
    insecure_skip_verify: false
  trace:
    enable: false
  part_size: 134217728
  sse_config:
    type: ""
    kms_key_id: ""
    kms_encryption_context: {}
    encryption_key: ""

---
# 阿里云 OSS
type: ALIYUNOSS
config:
  endpoint: ""
  bucket: ""
  access_key_id: ""
  access_key_secret: ""

---
# 腾讯云 COS
type: COS
config:
  bucket: ""
  region: ""
  app_id: ""
  secret_key: ""
  secret_id: ""
```
