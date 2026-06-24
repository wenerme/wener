---
tags:
  - FAQ
---

# Grafana FAQ

## SchemaVersion

- https://github.com/grafana/grafana/blob/main/public/app/features/dashboard/state/DashboardMigrator.ts

| schemaVersion | 关键变更                                        | 对应 Grafana 版本 |
| ------------- | ----------------------------------------------- | ----------------- |
| 2-8           | 早期 filter/timepicker/InfluxDB 迁移            | 很早期            |
| 9-13          | singlestat→stat, graph→timeseries 等面板迁移    | ~v5-v6            |
| 16            | Grid layout 布局迁移                            | ~v5               |
| 24            | Angular table→table-old                         | v7.0              |
| 27            | 移除 repeated panels, constant 变量转换         | ~v7.x             |
| 30            | value mappings 升级                             | ~v8.x             |
| 33            | datasource name → uid/type object 引用          | v8.3              |
| 36            | annotations/variables 中 datasource 引用迁移    | ~v9.x             |
| 37-39         | legend, table cellOptions, timeseries transform | ~v10.x            |
| 40-41         | refresh 属性、timepicker cleanup                | ~v11.x            |
| 42            | hideFrom.viz 迁移，标记为 v1 API 最终版本       | v12.0+            |

## Public

- 公开访问
- 开启后可以绑定 org+role

## TypeTimeSeriesLong TypeTable

- TypeTimeSeriesLong
  - 数据不是按列展开，而是按行堆叠
  - Time, Value, Labels/Tags

| Time  | Metric Name | Value | Host     |
| :---- | :---------- | :---- | :------- |
| 10:00 | cpu_usage   | 20    | server-A |
| 10:00 | cpu_usage   | 25    | server-B |
| 10:01 | cpu_usage   | 22    | server-A |

- TypeTable
  - 每一行是一个独立的记录，每一列是一个字段

| ID  | Name  | Status  | LastLogin  |
| :-- | :---- | :------ | :--------- |
| 1   | Admin | Online  | 2024-04-09 |
| 2   | Guest | Offline | 2024-04-01 |

- TypeTimeSeriesWide

| time             | bitable-A/429 | bitable-B/429 |
| ---------------- | ------------- | ------------- |
| 2026-04-09 10:00 | 35.2          | 12.1          |
| 2026-04-09 10:01 | 38.5          | 8.3           |

每个 series 是一列，列名/labels 就是维度标识。适合多 series 对比。

## DatasourceError

- 考虑增加 timeout
- 考虑 filter 内容为 DatasourceError 的情况

```ini
[alerting]
evaluation_timeout = 1m
max_attempts = 3
```
