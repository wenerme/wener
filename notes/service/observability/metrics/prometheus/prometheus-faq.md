---
title: Prometheus FAQ
tags:
  - FAQ
---

# Prometheus 常见问题

## remote write 调优

- [REMOTE WRITE TUNING](https://prometheus.io/docs/practices/remote_write/)
- 调优目标 延时、QPS、内存占用
- 减少内存占用
  - 降低 max_shards, 增加 capacity 和 max_samples_per_send
  - 分片内存占用影响因素 `number of shards * (capacity + max_samples_per_send)`
- 减少延时
  - 减少 batch_send_deadline, 增加 max_samples_per_send
- 减少 QPS
  - 增加 max_samples_per_send, 增加 capacity
  - 减少 QPS 也能减少服务端压力
- shards 会自动增减 - 通过 min_shards 和 max_shards 限定范围

```yaml
# 默认
# 一个分片大约 500k
capacity: 2500
max_samples_per_send: 500

max_shards: 1000
min_shards: 1
max_samples_per_send: 100
batch_send_deadline: 5s

# capacity
# 每个分片队列的容量
# 需要设置高一点避免阻塞读取 wal
# 一般 3-10 倍于 max_samples_per_send
capacity:

# 批量发送暴力配置
capacity: 10000
max_shards: 1000
min_shards: 1
max_samples_per_send: 5000
batch_send_deadline: 10s
```

## open /prometheus/queries.active: permission denied

- prometheus operator 部署的话可能在 volume 出现问题的时候出现该错误
- 使用 emptyDir 挂载可避免，或者修复 volume

## unknown function with name "label_values"

grafana template
