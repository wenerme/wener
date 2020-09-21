# Grafana Prometheus

## Tips

- https://grafana.com/docs/grafana/latest/features/datasources/prometheus/

| name               | demo  | desc |
| ------------------ | ----- | ---- |
| `$__interval`      | 30s   | Max data points / time range
| `$__interval_ms`   | 30000 |
| `$__range`         |       |
| `$__range_s`       |       |
| `$__range_ms`      |       |
| `$__rate_interval` |       | v7.2+ `max($__interval + Scrape interval, 4 * Scrape interval)`

```promql
# 变量替换
# $<varname>
rate(http_requests_total{job=~”$job”}[5m])
# [[varname]] 
rate(http_requests_total{job=~”[[job]]"}[5m])
```
