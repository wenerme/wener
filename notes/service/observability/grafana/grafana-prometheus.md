---
title: Grafana Prometheus
---

# Grafana Prometheus

- 变量语法
  - `$<varname>`
    - `rate(http_requests_total{job=~"$job"}[5m])`
  - `[[varname]]`
    - 更好直接替换
    - `rate(http_requests_total{job=~"[[job]]"}[5m])`

**模板查询**

| var                         | API                               |
| --------------------------- | --------------------------------- | ---------------------- |
| label_names()               | /api/v1/labels                    | 返回标签列表           |
| label_values(label)         | /api/v1/label/label/values        | 返回标签值列表         |
| label_values(metric, label) | /api/v1/series                    | 返回指标标签值列表     |
| metrics(metric)             | /api/v1/label/\_\_name\_\_/values | 返回正则匹配的指标名字 |
| query_result(query)         | /api/v1/query                     | 返回查询结果           |

- 由 grafana 进行预处理
  - [grafana/public/app/plugins/datasource/prometheus/metric_find_query.ts](https://github.com/grafana/grafana/blob/9fc9708ba5e9ee0f0565c00e681d2bf19146cee0/public/app/plugins/datasource/prometheus/metric_find_query.ts)

**全局变量**

| name               | demo  | desc                                                      | since |
| ------------------ | ----- | --------------------------------------------------------- | ----- |
| `$__interval`      | 30s   | `(to - from)/resolution`                                  |
| `$__interval_ms`   | 30000 |                                                           |
| `$__range`         |       | to - from                                                 | v5.3+ |
| `$__range_s`       |       |                                                           | v5.3+ |
| `$__range_ms`      |       |                                                           | v5.3+ |
| `$__rate_interval` |       | `max($__interval + Scrape interval, 4 * Scrape interval)` | v7.2+ |

- 如果在模板变量中使用，注意将 refresh 设置为 On Time Range Change
- `$interva` 等同于 `$__interval`， 但应该用 `$__interval`
- 参考
  - 其他 [全局变量](https://grafana.com/docs/grafana/latest/variables/variable-types/global-variables/)
    - `$__dashboard` - dashboard 名字
    - `$__from` , `$__to`
    - `$__name` - 在 Singlestat 面板中替换为 serial 的名字或别名
    - `$__org` - ID, `${__org.name}` - 名字
    - `$__user` - id,login,email
    - `$timeFilter`, `$__timeFilter` - 例如 `time > now() - 7d`

```promql
# 变量替换
# $<varname>
rate(http_requests_total{job=~”$job”}[5m])
# [[varname]]
rate(http_requests_total{job=~”[[job]]"}[5m])
```

## 参考

- [Prometheus data source](https://grafana.com/docs/grafana/latest/datasources/prometheus/)
