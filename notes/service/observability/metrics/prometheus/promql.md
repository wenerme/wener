---
title: PromQL
---

# PromQL

- [PromQL](https://prometheus.io/docs/prometheus/latest/querying/basics/)
- [QUERY EXAMPLES](https://prometheus.io/docs/prometheus/latest/querying/examples/)
- [PromQL tutorial for beginners and humans](https://medium.com/@valyala/9ab455142085)
- 支持 PromQL 的应用
  - [VictoriaMetrics](https://github.com/VictoriaMetrics/VictoriaMetrics)
    - long-term remote storage for Prometheus
- 参考
  - [Rate then sum, never sum then rate](https://www.robustperception.io/rate-then-sum-never-sum-then-rate)

```promql
# 指标
node_cpu_seconds_total
# 标签过滤，支持操作符号 = != 匹配 =~ 不匹配 !~
node_cpu_seconds_total{mode="user"}
# 5 分钟均值
rate(node_cpu_seconds_total{mode="user"}[5m])
# 聚合结果
sum(rate(node_cpu_seconds_total{mode="user"}[5m]))
# 按照 mode 分组
sum(rate(node_cpu_seconds_total[5m])) by (mode)
# 不看 idle 和 nice
sum(rate(node_cpu_seconds_total{mode!~"idle|nice"}[5m])) by (mode)
# 只看 user 和 system
sum(rate(node_cpu_seconds_total{mode=~"user|system"}[5m])) by (mode)
# 分别返回
# by (mode) 是必须的，如果丢失了 label，则会认为是同样的指标，会被丢弃
sum(rate(node_cpu_seconds_total{mode="user"}[5m])) by (mode) or sum(rate(node_cpu_seconds_total{mode="system"}[5m])) by (mode)
# 结果加上另外一个指标
sum(rate(node_cpu_seconds_total{mode=~"user|system"}[5m])) by (mode) or node_load15

# unifiVapNumStations 结果 join unifiVapEssId label
sum(unifiVapNumStations * on(unifiVapIndex,instance) group_left(unifiVapEssId) unifiVapEssId{}) by (unifiVapEssId)

# 替换标签
# grafana 里能让一列出现两次
# 但 grafana 不能全文匹配 https://github.com/grafana/grafana/issues/11418
label_replace(unifiIfMac, "unifiLabel", "$0", "unifiIfMac", ".+")
```

## 常用

```promql
# 查询在线节点
{__name__=~"probe_success|up"}
# 成功率
sum({__name__=~"probe_success|up"})/count({__name__=~"probe_success|up"})*100
# 全节点信息
label_replace({__name__=~"probe_success|up"}, "instance_ip", "$2", "instance", "(192[.]168[.]|http?://)?([0-9.+]+|.*).*")

# 排除 kube 内置组件
{job!~"apiserver|kubelet"}
```

# FAQ

## irate vs rate

- 只用于 counter - 增长值
- 尽量使用 rate - irate 不比 rate 快，无法捕获峰值
- irate
  - 只使用范围内最近两个时间点数据
- rate
  - 所有间隔进行求平均每秒
- [Why irate from Prometheus doesn't capture spikes](https://medium.com/@valyala/why-irate-from-prometheus-doesnt-capture-spikes-45f9896d7832)
