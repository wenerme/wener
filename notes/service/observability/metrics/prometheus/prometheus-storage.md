---
id: storage
title: Prometheus 存储
---

# Prometheus 存储

- 主流方式
  - Remote API
  - Sidecar 上传 Chunk 做长期 + Sidecar 请求 Prometheus 查看实时
- [m3db/m3](https://github.com/m3db/m3)
  - 分布式 TSDB，聚合查询引擎
  - Prometheus Sidecar, Graphite Compatible, Metrics Platform
- [VictoriaMetrics/VictoriaMetrics](https://github.com/VictoriaMetrics/VictoriaMetrics) - VictoriaMetrics - fast, cost-effective and scalable time series database, long-term remote storage for Prometheus
- [OpenObservability/OpenMetrics](https://github.com/OpenObservability/OpenMetrics)
- [timescale/timescaledb](https://github.com/timescale/timescaledb)
  - 基于 PG 的衍生数据库
  - [timescale/timescale-prometheus](https://github.com/timescale/timescale-prometheus)
    - 基于 timescaledb 实现 Prometheus 接口
- [cortexproject/cortex](https://github.com/cortexproject/cortex)
  - [架构](https://cortexmetrics.io/docs/architecture/)
  - Consul 中央调度、PG 配置存储、Cassandra 数据存储、S3 长期冷数据、Memcache 查询缓存
- [thanos-io/thanos](https://github.com/thanos-io/thanos)
  - [设计](https://thanos.io/design.md/)
  - 无状态、对象存储、查询聚合去重
- 参考
  - [Cortex and Thanos](https://grafana.com/blog/2019/11/21/promcon-recap-two-households-both-alike-in-dignity-cortex-and-thanos)

## Remote

- [Prometheus Remote Storage](https://www.promlts.com/resources/prometheus-remote-storage)
- 日志
  - dropped sample for series that was not explicitly dropped via relabelling
    - 可能由于 relabel 之类的原因导致时间序列没有了 label，丢弃这类数据
  - Remote storage resharding from N to M
    - 动态队列调整分片 - 增长以保证跟上采集的指标数，写入速率
    - 如果指标数便少了也会减少
  - Currently resharding, skipping
    - 正在调整分片的时候又触发了调整
  - Failed to flush all samples on shutdown
    - 在停止一个队列时无法写入全部指标
    - 可能远程存储有问题，可能超时
- 注意
  - rps 较大，对反向代理有一定性能影响
  - prometheus 会多用约 25% 内存
- 参考
  - [#5627](https://github.com/prometheus/prometheus/issues/5627) - Remote Write Shard Flapping
  - [REMOTE WRITE TUNING](https://prometheus.io/docs/practices/remote_write)

```yaml
remote_write:
  - url: http://127.0.0.1:1234
    # 唯一远程名字 - 用于内部标示 - 会在 prometheus 指标和日志中体现
    # 不设置则会生成一个唯一的名字
    name:
    # 远程写超时 - 数据量大的时候建议设置大一点
    # 如果设置小了会导致数据一直失败
    # 如果使用了反向代理，也要注意修改反向代理的超时时间
    remote_timeout: 30s

    # 标签修改
    write_relabel_configs:
      # 移除 go_ 开头的指标
      - action: drop
        regex: go_.*
        source_labels: [__name__]

    # HTTP Authorization: Basic
    basic_auth:
      username: username
      password: password
      # 从文件读取密码
      password_file: /etc/prometheus/my-remote-password

    # HTTP Authorization: Bearer
    # 例如 JWT
    bearer_token: <string>
    bearer_token_file: /etc/prometheus/my-remote-token

    # TLS 配置
    tls_config: [<tls_config>]

    # HTTP 代理
    proxy_url: http://127.0.0.1:8080

    # 队列配置
    # 当指标量大的时候比较重要
    queue_config:
      # Number of samples to buffer per shard before we block reading of more
      # samples from the WAL. It is recommended to have enough capacity in each
      # shard to buffer several requests to keep throughput up while processing
      # occasional slow remote requests.
      # 每个 shard 的容量 - 读取 WAL 的缓冲数量
      # 超过则会扩容 - 设置过大可能会导致 OOM
      # 建议 max_samples_per_send 的 3-10 倍
      capacity: 500
      # 最小 shard 数量 - 调整最小可避免初始 rw 写入过慢
      # 如果 rw 跟不上时会增加
      min_shards: 1
      # 最大 shard 数量 - 并发数请求数
      max_shards: 1000
      # 每次批量发送的样本数 - 默认较小，为了兼容更多系统
      # 设置大可以使吞吐更大 - 压缩更好，占用更少网络
      max_samples_per_send: 100
      # 每次发送的最大等待时间 - 即便没达到 max_samples_per_send 也发送
      # 在延迟行要求不高场景可以设置高一点 - 也能增加每次发送的量
      batch_send_deadline: 5s

      # 会一直重试 - 没有最大等待次数
      # 初次重试等待
      min_backoff: 30ms
      # 最大重试等待
      max_backoff: 100ms
```

```yaml
# 示例配置
queue_config:
  # 500
  capacity: 2500
  # 1000
  max_shards: 1000
  # 1
  min_shards: 200
  # 100
  max_samples_per_send: 5000
  # 5s
  batch_send_deadline: 10s
```
