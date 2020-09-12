---
id: prometheus-storage
title: Prometheus 存储
---

# Remote
* [Prometheus Remote Storage](https://www.promlts.com/resources/prometheus-remote-storage)
* 日志
  * dropped sample for series that was not explicitly dropped via relabelling
    * 可能由于 relabel 之类的原因导致时间序列没有了 label，丢弃这类数据
  * Remote storage resharding from N to M
    * 动态队列调整分片 - 增长以保证跟上采集的指标数，写入速率
    * 如果指标数便少了也会减少
  * Currently resharding, skipping
    * 正在调整分片的时候又触发了调整
  * Failed to flush all samples on shutdown
    * 在停止一个队列时无法写入全部指标
    * 可能远程存储有问题，可能超时
* 参考
  * https://github.com/prometheus/prometheus/issues/5627

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
    tls_config:
      [ <tls_config> ]

    # HTTP 代理
    proxy_url: http://127.0.0.1:8080

    # 队列配置
    # 当指标量大的时候比较重要
    queue_config:
      # Number of samples to buffer per shard before we block reading of more
      # samples from the WAL. It is recommended to have enough capacity in each
      # shard to buffer several requests to keep throughput up while processing
      # occasional slow remote requests.
      # 每个 shard 的容量
      # 超过则会扩容 - 设置过大可能会导致 OOM
      capacity: 500
      # 最大 shard 数量 - 并发数
      max_shards: 1000
      # 最小 shard 数量
      min_shards: 1
      # 每次批量发送的样本数
      # 设置大可以使吞吐更大 - 压缩更好，占用更少网络
      max_samples_per_send: 100
      # 每次发送的最大等待时间
      batch_send_deadline: 5s
      
      # 会一直重试 - 没有最大等待次数
      # 初次重试等待
      min_backoff: 30ms
      # 最大重试等待
      max_backoff: 100ms
```
