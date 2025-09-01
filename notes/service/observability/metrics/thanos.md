---
title: Thanos
---

# Thanos

- [thanos-io/thanos](https://github.com/thanos-io/thanos)
  - Prometheus 长期存储
  - 后端使用对象存储服务
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

:::caution

- compact
  - raw 格式数据**非常大** - 需要 compact 进行压缩
  - 如果 raw 导致磁盘空间满，会可能驱逐 compact 进入恶性循环
  - compact 需要与 存储 服务进行大量数据交互 - 最好在同一个节点或机房
  - 一个 bucket 只能运行 **一个** compact
    - 因此有一定规模后 compact 反而可能成为瓶颈
- receive
  - 因为需要缓存接收的数据，因此也需要磁盘空间 一般 3-5 G
- 一个租户需要一个 Bucket
  - [#1318](https://github.com/thanos-io/thanos/issues/1318) 提议添加前缀 - 但工作量很大

:::

## 组件

- Thanos 分为多个组件
  - compactor, query, query-frontend, receive, rule, sidecar, store
- compactor
  - 不参与集群
  - 压缩 OSS 数据
  - 下采样 - downsampling
    - 大于 40 小时创建 5m 采样
    - 大于 10 天创建 1h 采样
  - 默认永久保留 `--retention.resolution-X=0d` - X 为采样类型 - raw,5m,1h
  - 执行保留策略 - 删除旧数据
  - 一个 bucket 部署一个 - 并行部署多个会有问题
  - 下采样并不会节省空间，每个原始区块会添加额外的下采样区块数据 - 只比原始的小一点点
    - 相当于容量增加 3 倍
  - 提升范围查询性能
  - 运行需要本地临时存储
    - 建议 100G
    - 可重启后删除 - 不需要持久
  - kube-thanos 将 compact 部署为 sts 而不是 cronjob
- query
  - 无状态，可扩容
  - 实现 Prometheus HTTP v1 API
  - PromQL
  - 从 StoreAPI 获取数据
    - 部分返回
      - `?partial_response=1` - 请求接受部分响应
      - `--query.partial-response` - 控制是否开启和策略
      - `--query.timeout=2m` - 查询超时
      - `--query.lookback-delta=5m` - 回查时间，过短会产生 gap，至少设置为抓取时间两倍
      - `--store.response-timeout` - 存储响应超时
      - `--no-query.partial-response` - 强制关闭
    - 支持指定副本 label 就行去重
      - `?replicaLabels=replicaA&replicaLabels=replicaB`
    - 数据去重
      - `?dedup`
      - `--query.replica-label` - 基于副本标签进行去重
    - 自动下采样
      - `?max_source_resolution=5m` - 0s 禁用，可设置为 1h 或 auto
        - 如果发现数据有 gap 可禁用
      - `--query.auto-downsampling` - 默认为 step/5
    - 并发 select
      - `--query.max-concurrent-select=4` - 每次请求的最大并发 select
      - `--query.max-concurrent=20` - 最大并发查询数
    - 支持自定义返回字段
    - 支持过滤 store
      - `?query=up&dedup=true&partial_response=true&storeMatch[]={__address__=~"prometheus-foo.*"}`
  - grafana 可配置查询参数 `max_source_resolution=auto&partial_response=true`
- query-frontend
  - 无状态，可扩容
  - 实际使用时影响查询性能的关键组件
  - 处理 `/api/v1/query_range`
  - `--query-frontend.downstream-url` - 下游 Prometheus 地址 - 一般为 Thanos Query 暴露地址
  - `--query-frontend.compress-responses` - 响应结果压缩
  - 并行
    - `-query-range.max-query-length=0` - 限制查询长度
    - `--query-range.max-query-parallelism=14` - 最大并行查询
  - 切分查询
    - `--query-range.split-interval=24h` - 切分并行查询的间隔 `response-cache-config`
    - 可以避免 query 查询过大数据导致 OOM
    - 并行查询效率更好
    - query 负载均衡
  - 重试
    - `--query-range.max-retries-per-request=5`
  - 缓存
    - 下次查询时复用
    - 缺少数据会并行查询就行补齐
    - 支持 IN-MEMORY 和 MEMCACHED
    - `--query-range.response-cache-max-freshness=1m` - 缓存的最新时间 - 小于该时间不缓存
    - `--query-range.response-cache-config-file`
    - `--query-range.response-cache-config`
  - 记录慢查询
    - `--query-frontend.log-queries-longer-than`
- receive
  - 实现 Prometheus 远程写入接口，写入本地 tsdb
  - 目前只支持单个 tsdb
  - 暴露 StoreAPI
  - 实现基于推送的指标采集
  - 用于网络不互通、外部指标采集环境
  - 可继续传递到 receive
    - 支持多副本
  - 可以用支持多租户
    - 租户头 `--receive.tenant-header=THANOS-TENANT` 可用于分流
  - 注意 ⚠️
    - write 地址为 `/api/v1/receive`
    - 节点调整时确保数据被刷到 存储
    - 重启后可能会收到大量 Prometheus 请求需要控制好流量
    - 默认会添加 `tenant_id="default-tenant"` - 可自行控制
    - 资源占用较多，反向代理也会占用资源
      - 4k/s 大约 0.1 CPU, 250M 内存
      - 0 负载的 nginx 多了 1 的 CPU
  - 参考
    - [Thanos Remote Write](https://thanos.io/tip/proposals/201812_thanos-remote-receive.md/)
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
  - 注意 ⚠️
    - 无法 flush 数据 - prometheus 无法 flush wal，因此可能会丢失 2h 数据
- store
  - 存储网关 - Store Gateway
  - 读取 对象存储 暴露 StoreAPI
  - 支持索引缓存
    - in-memory
    - memcached
  - 支持 Bucket 缓存 - 缓存 Prometheus 区块数据
    - memcached
  - 默认内存缓存 250M
  - 支持文件缓存 index-header, in-mem cache items, meta.jsons
  - 注意
    - 初始索引过程可能会耗费大量内存
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
  access_key: "key"
  secret_key: "secretsecret"
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

## Tool

```bash
# 查看 bucket 分布情况
# http://localhost:10902/
thanos tools bucket web --objstore.config-file=thanos-bucket.yaml

# 查看 bucket
thanos tools bucket ls
# 以 table 显示 bucket 信息
# | ULID | FROM | UNTIL | RANGE | UNTIL-DOWN | #SERIES | #SAMPLES | #CHUNKS | COMP-LEVEL | COMP-FAILED | LABELS | RESOLUTION | SOURCE |
thanos tools bucket inspect

# 标记删除或不压缩
# tools bucket mark --id=ID --marker=MARKER --details=DETAILS
# Marker - deletion-mark.json,no-compact-mark.json
# mark 或删除在 web 上不会刷新，需要停止从开
thanos tools bucket mark --id 01EJD9PS4P3MJMF3TGJGTJTE25 --marker deletion-mark.json --details 'useless bucket'

# 立即清除被 mark bucket
# 默认由 compactor 来清理
thanos tools bucket cleanup

# out.txt
thanos tools bucket inspect --log.level error --objstore.config-file=thanos-store.yaml > out.txt
# ids.txt
cat out.txt | grep -P '\d\d-2021' | cut -d '|' -f 2  | tr -d ' '| sed 's/^/--id=/' > ids.txt
# filter & delete
# 批量标记删除 - 需要有 compact 实际删除 - 或者执行 compact --delete-delay=0
cat out.txt | grep -P '(01|02|03|04|05|06|07|08)-2021' | cut -d '|' -f 2  | tr -d ' '| sed 's/^/--id=/' | xargs thanos tools bucket mark --marker deletion-mark.json --details 'delete' --objstore.config-file=thanos-store.yaml
cat ids.txt | xargs thanos tools bucket mark --marker deletion-mark.json --details 'delete' --objstore.config-file=thanos-store.yaml
```

## 缓存配置

```yaml
# 文件缓存
type: IN-MEMORY
config:
  max_size: 0
  max_size_items: 2048
  # 缓存时效
  validity: 6h

---
type: MEMCACHED
config:
  addresses: []
  timeout: 0s
  max_idle_connections: 0
  max_async_concurrency: 0
  max_async_buffer_size: 0
  max_get_multi_concurrency: 0
  max_item_size: 0
  max_get_multi_batch_size: 0
  dns_provider_update_interval: 0s
  expiration: 0s
```

## 存储配置

- [Storage](https://thanos.io/tip/thanos/storage.md)

```yaml
---
# S3 常用配置
type: S3
config:
  bucket: ''
  endpoint: ''
  # HTTP 还是 HTTPS
  insecure: true
  access_key: ''
  secret_key: ''
  # 部分 S3 实现需要设置为 false
  signature_version2: false
  # multipart 上传的单块 大小 - 部分 S3 实现需要修改
  # 0 -> 默认 128m
  part_size: 0

---
# S3 完整配置
type: S3
config:
  bucket: ''
  endpoint: ''
  region: ''
  access_key: ''
  insecure: false
  signature_version2: false
  secret_key: ''
  put_user_metadata: {}
  http_config:
    idle_conn_timeout: 1m30s
    response_header_timeout: 2m
    insecure_skip_verify: false
  trace:
    enable: false
  part_size: 134217728
  sse_config:
    type: ''
    kms_key_id: ''
    kms_encryption_context: {}
    encryption_key: ''

---
# 阿里云 OSS
type: ALIYUNOSS
config:
  endpoint: ''
  bucket: ''
  access_key_id: ''
  access_key_secret: ''

---
# 腾讯云 COS
type: COS
config:
  bucket: ''
  region: ''
  app_id: ''
  secret_key: ''
  secret_id: ''
```

## Kubernetest

- [thanos-io/kube-thanos](https://github.com/thanos-io/kube-thanos) - jsonnet manifest
  - [examples/all/manifests](https://github.com/thanos-io/kube-thanos/blob/master/examples/all/manifests)
    - 示例，值得参考
- [banzaicloud/thanos-operator](https://github.com/banzaicloud/thanos-operator)

## Tracing

- [Tracing](https://thanos.io/tip/thanos/tracing.md/)

```yaml
type: JAEGER
config:
  service_name: ''
  disabled: false
  rpc_metrics: false
  tags: ''
  sampler_type: ''
  sampler_param: 0
  sampler_manager_host_port: ''
  sampler_max_operations: 0
  sampler_refresh_interval: 0s
  reporter_max_queue_size: 0
  reporter_flush_interval: 0s
  reporter_log_spans: false
  endpoint: ''
  user: ''
  password: ''
  agent_host: ''
  agent_port: 0
```

## FAQ

## Expire

```bash
# --delete-delay=0 - 立即删除 - 默认 48h
thanos compact \
  --http-address=0.0.0.0:12902 \
  --data-dir=thanos-compact \
  --objstore.config-file=thanos-store.yaml \
  --wait \
  --compact.concurrency=32 \
  --retention.resolution-raw=30d \
  --retention.resolution-5m=90d \
  --retention.resolution-1h=180d \
  --delete-delay=0
```

## Sidecar 上传历史文件

```bash
thanos sidecar \
  --tsdb.path=/var/lib/prometheus/data/ \
  --prometheus.url=http://localhost:9090 \
  --objstore.config-file=thanos-bucket.yaml \
  --shipper.upload-compacted
```

### Sidecar 暴露 Prometheus 为 StoreAPI

```bash
thanos sidecar --prometheus.url=http://localhost:9090
```

## 跨网络部署方案

1. Prometheus Remote Write + Thanos Receive

- 优点
  - 部署简单
  - 不丢数据
- 缺点
  - RW 性能扩容问题
    - 默认 max_samples_per_send 为 100，指标上去后很容易 qps 上百
    - 如果使用了反向代理，反向代理也会有一定性能问题
    - 增大单次批量会占用较多内存，例如 max_samples_per_send 5000 capacity 1000 启动发送后内存达到 1G+
  - 稳定性问题
    - 需要额外维护 thanos receive
  - thanos receive 有状态 - 本地记录 tsdb
- 参考
  - [Thanos Remote Write](https://thanos.io/tip/proposals/201812_thanos-remote-receive.md/)

1. Prometheus + Sidecar + Prometheus Remote Write + Thanos Receive

- Sidecar 上传 2h
- Receive 查询最近 2h
- 优点 - thanos receive 状态无所谓，可丢弃
- 缺点 - 多部署一个 sidecar

1. Prometheus + Sidecar + StoreAPI tunnel

- StoreAPI 默认 h2c
- 缺点
  - grpc 不能 tunnel 到子路径，需要使用子域名或独立端口
  - 需要额外的 tunnel 部署
- 优点
  - 简单易理解
  - 打通所需服务网络

1. Prometheus + Sidecar + Prometheus:8080 tunnel + Sidecar

- 可以将 9090 tunnel 到子路径
- 内网 sidecar 将 tunnel 暴露为 StoreAPI
- 缺点
  - 多部署一个 sidecar 到内网
- 优点
  - 可 tunnel 到子路径
  - 打通所监控的 prometheus

## 自动下采样

- `?max_source_resolution`
  - 0s - 禁用
  - 5m
  - 1h
  - auto - 自动
- 使用 rate 可能会导致 gap
- 参考
  - [#813](https://github.com/thanos-io/thanos/issues/813)

```promql
# 5m 使用下采样会有 gap
avg(irate(node_cpu_seconds_total{mode="system"}[5m])) by (instance) *100
# 10m 则没有问题
avg(irate(node_cpu_seconds_total{mode="system"}[10m])) by (instance) *100

# grafana
avg(irate(node_cpu_seconds_total{mode="system"}[$__interval])) by (instance) *100
```

## filter meta in oss

```bash
ls */meta.json | xargs -n 1 -I {}  sh -c "dirname {} | tr -d '\n';echo -n ' ';jq -r '.maxTime/1000 | todate' {}" > /tmp/dump.txt
# 强制删除
cat /tmp/dump.txt | grep '2021-' | awk '{print $1}' | sudo xargs -I {} rm -r {}
```
