---
title: Prometheus API
tags:
  - API
---

# Prometheus API

```
GET /api/v1/query
POST /api/v1/query

GET /api/v1/query_range
POST /api/v1/query_range

GET /api/v1/format_query
POST /api/v1/format_query

GET /api/v1/series
POST /api/v1/series

GET /api/v1/labels
POST /api/v1/labels

GET /api/v1/label/<label_name>/values

GET /api/v1/query_exemplars
POST /api/v1/query_exemplars

GET /api/v1/targets

GET /api/v1/rules
GET /api/v1/alerts

GET /api/v1/targets/metadata
GET /api/v1/metadata

GET /api/v1/alertmanagers

GET /api/v1/status/config
GET /api/v1/status/flags
GET /api/v1/status/runtimeinfo
GET /api/v1/status/buildinfo

GET /api/v1/status/tsdb
GET /api/v1/status/walreplay

POST /api/v1/admin/tsdb/snapshot
PUT /api/v1/admin/tsdb/snapshot

POST /api/v1/admin/tsdb/delete_series
PUT /api/v1/admin/tsdb/delete_series

POST /api/v1/admin/tsdb/clean_tombstones
PUT /api/v1/admin/tsdb/clean_tombstones
```


- https://prometheus.io/docs/prometheus/latest/querying/api/
