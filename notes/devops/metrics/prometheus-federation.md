---
title: Prometheus 联邦
---

# Prometheus 联邦

* 是什么？
  * Prometheus 采集 Prometheus
  * 级联联邦/Hierarchical federation - 全量采集 - 例如 多个集群环境
  * 跨服务联邦/Cross-service federation - 部分采集 - 例如 多个集群部署相同服务
* 优势
  * 简单的解决分布式指标采集问题
* [FEDERATION](https://prometheus.io/docs/prometheus/latest/federation/)
* 建议
  * 如果有更好的条件则选择 Thanos

:::caution

* 联邦/Federation 解决的是采集问题，没有解决存储和查询问题
* 存储和查询能力受单机性能影响
* 没有缓存、没有查询分发、没有存储切分带来的问题是
  * 无法规模化
  * 数据采集延迟 - 难以集中告警
  * 存储容量无法扩展
  * 大量查询慢

:::

```yaml
scrape_configs:
  - job_name: 'federate'
    scrape_interval: 15s
    # 保留所有标签
    honor_labels: true
    # 暴露的联邦接口
    metrics_path: '/federate'
    # 选择指标 -
    params:
      'match[]':
        - '{job="prometheus"}'
        - '{__name__=~"job:.*"}'
    # 需要采集的实例
    static_configs:
      - targets:
        - 'source-prometheus-1:9090'
        - 'source-prometheus-2:9090'
        - 'source-prometheus-3:9090'
```
