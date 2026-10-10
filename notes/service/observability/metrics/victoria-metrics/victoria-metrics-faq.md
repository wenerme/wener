---
tags:
  - FAQ
---

# VictoriaMetrics FAQ

- -downsampling.period
  - 企业版本下采样
  - 处理超过一定时间的旧数据，例如 30d:5m 表示 30 天前的数据每 5 分钟保留一个点。
- -dedup.minScrapeInterval
  - 高可用部署必须配合去重，而且去重间隔要等于抓取间隔。

## cannot handle more than 4 concurrent inserts during 1m0s

尝试增加 vmstorage 资源，检查 vmstorage 状态。

## too many open files

- 调整 Linux 配置

## cannot select more than -search.maxSamplesPerQuery

```
cannot select more than -search.maxSamplesPerQuery=500000000 samples; possible solutions: increase the -search.maxSamplesPerQuery; reduce time range for the query; use more specific label filters in order to select fewer series
```

- 做 downsample
- 检查 dedup
- 优化查询
- 一般增加 rate interval 没用
