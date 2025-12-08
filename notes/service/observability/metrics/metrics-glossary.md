---
tags:
  - Glossary
---

# Metrics Glossary

- metrics
  - `__name__{labels}=value`
- `__name__`
  - https://prometheus.io/docs/practices/naming/
- 异常检测
  - Anomaly Detection
  - Outlier Detection
  - Dynamic Thresholding
  - Adaptive Alerting
  - Z-Score Monitoring
  - Bollinger Bands 布林带
    - “均值 +/- 2倍标准差”组成的通道
  - 过去一段时间的平均值 + N倍标准差
- 3 sigma
  - 1 sigma 68%
  - 2 sigma 95%
  - 3 sigma 99.7% -> 99.7% 的信心确认出问题
  - 过去平均+3倍标准差
  - 正态分布
- 参考
  - https://docs.victoriametrics.com/victoriametrics/keyconcepts/
  - https://prometheus.io/docs/prometheus/latest/querying/api/

**Raw Sample**

```
Name Label Sample [Timestamp]
```

```
requests_total{path="/", code="200"} 123 4567890
```
