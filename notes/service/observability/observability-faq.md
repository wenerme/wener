---
title: Observability FAQ
tags:
  - FAQ
---

# Observability FAQ

- 基础设施 - Operational
- 数据源
- 业务

## 数据规模

| 规模   | 量级          |
| ------ | ------------- |
| 小规模 | < GB/天       |
| 中规模 | GB/天 < TB/天 |
| 大规模 | TB/天, PB/天  |

## 长期存储

- 至少 大于 6个月
- 通常做下采样

## fluent vs filebeat

- [fluent-filebeat-comparison.md](https://gist.github.com/StevenACoffman/4e267f0f60c8e7fcb3f77b9e504f3bd7)

## Grafana vs Kibana

- 参考
  - [Grafana vs. Kibana: The Key Differences to Know](https://logz.io/blog/grafana-vs-kibana/)
