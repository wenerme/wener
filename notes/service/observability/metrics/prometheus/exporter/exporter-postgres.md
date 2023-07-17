---
title: postgres_exporter
---

# postgres_exporter

- [prometheus-community/postgres_exporter](https://github.com/prometheus-community/postgres_exporter)
- https://grafana.com/grafana/dashboards/12273
- https://github.com/lstn/misc-grafana-dashboards
- https://github.com/percona/grafana-dashboards/blob/master/dashboards/PostgreSQL_Overview.json
- 指标
  - [postgres_exporter.go#L211](https://github.com/prometheus-community/postgres_exporter/blob/8531abac469ebb163ae9e4758e36d2ea9e6a3fcd/cmd/postgres_exporter/postgres_exporter.go#L211)
    - 内建指标
  - [queries.yaml](https://github.com/prometheus-community/postgres_exporter/blob/master/queries.yaml)
    - 自定义指标
    - pg_stat_statements 的 querid 为 label - 会产生比较多指标，如果不需要可以考虑 groupby
- [pg_stat_statements](https://www.postgresql.org/docs/current/pgstatstatements.html)
  - 语句情况统计
- [Statistics Collector](https://www.postgresql.org/docs/current/monitoring-stats.html)
