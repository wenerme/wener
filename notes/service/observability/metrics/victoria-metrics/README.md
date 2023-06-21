---
title: VictoriaMetrics
---

# VictoriaMetrics

- [VictoriaMetrics/VictoriaMetrics](https://github.com/VictoriaMetrics/VictoriaMetrics) 是什么？
  - Apache-2.0, Golang
  - 时序数据库
  - 高性能、低成本、大规模
  - 支持集群
- 默认推荐单节点 - 小于 百万/s 的指标速率推荐单节点版本 - 通过垂直扩容/增加 CPU 内存来提升性能
  - 高压缩率 - 磁盘占用空间小 - IO 高
  - 单节点性能可参考 [measuring-vertical-scalability](https://valyala.medium.com/92550d78d8ae)
    - 1vCPU 4G - 500k/s
    - 2vCPU 8G - 800k/s
    - 64vCPU 240G - 19M/s
    - 基本呈线性增长 - 1.6-1.8x
- http://victoriametrics:8428/api/v1/write
- 存储设计参考 ClickHouse
- 参考
  - grafana dashboard vmcluster [11176](https://grafana.com/grafana/dashboards/11176)
  - grafana dashboard vmsingle [10229](https://grafana.com/grafana/dashboards/10229)

| port | for              |
| ---- | ---------------- |
| 8480 | vminsert         |
| 8481 | vmselect         |
| 8482 | vmstorage        |
| 8427 | vmauth           |
| 8428 | single           |
| 8429 | vmagent/vmsingle |

:::caution

- 不支持 下采样
- 区分单节点和集群模式
- histogram_quantile 有问题
  - [#678](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/678)

:::

:::warning

- ~~vmauth 无法访问 /vmui [#1752](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1752)~~

:::

## Notes

- VictoriaMetrics 分为多个组件
  - vminsert, vmselect, vmstorage, vmauth, vmalert
- 集群 - 每个组件可单独扩容 - 分支 [cluster](https://github.com/VictoriaMetrics/VictoriaMetrics/tree/cluster)
- **副本不能用于容灾** - 通过备份容灾 - 副本可提升写入查询性能 - 扩容
  - K8S 上推荐使用带副本功能的 PV
- 副本在 vminsert 层控制 - 写入多副本
- URL 包含 `accountID:projectID` 实现多租户
  - 两个 ID 为 uint32
  - projectID 默认 0
  - 自动创建，只关心数据维度划分，不关心授权之类
  - 会自动负载到 vmstorage
  - **不支持单个请求查询多个租户**
- vmstorage - 存储数据 - shared noting 结构 - 节点之间不互相感知
  - vCPUs = ingestion_rate / 150K
  - `RAM = 2 * active_time_series * 1KB * replicationFactor`
  - active_time_series - 1h 内有读写
  - `storage_space = ingestion_rate * retention_seconds`
- vminsert - 代理分发到多个 vmstorage - 一致性 Hash
  - vCPUs = ingestion_rate / 150K
  - 单个性能应该与 vmstorage 相同
  - 内存 1G+
- vmagent - 采集
- vmselect - 通过 vmselect 聚合查询数据
- vmauth - auth 代理 - 简单的反向代理+负载均衡
  - 支持 bearer token, basic auth
  - 基于 auth 信息选择代理上游
- vmbackup - 将 snapshot 备份到其他存储
- vmrestore - 将 backup 的内容恢复
- vmalert - 告警 和 记录
- vmctl - 命令行工具 - 数据迁移
- vmgateway - 收费组件
- vmbackupmanager - 收费组件

## 集群

- accountID
  - accountID:projectID
  - accountID - int32
  - projectID - int32 - 默认 0
- `http://<vminsert>:8480/insert/<accountID>/`
  - prometheus/api/v1/write
  - prometheus/api/v1/import
  - prometheus/api/v1/import/native
  - prometheus/api/v1/import/csv
  - prometheus/api/v1/import/prometheus
- `http://<vmselect>:8481`
  - `/select/<accountID>`
    - /prometheus
    - /graphite
    - /vmui
  - `/delete/<accountID>/prometheus/api/v1/admin/tsdb/delete_series?match[]=<timeseries_selector_for_delete>`
  - `/api/v1/status/top_queries`
- `http://<vmstorage>:8482`
  - /internal/force_merge - 触发合并压缩
  - /snapshot/create
  - /snapshot/list
  - /snapshot/delete
  - /snapshot/delete?snapshot=$ID
  - /snapshot/delete_all
- `http://<vmauth>:8427`
  - /-/reload

## vmauth

```yaml title="生成的 src_paths"
users:
  - url_map:
      - url_prefix: http://vmselect-demo.monitoring-system.svc:8481/select/500
        src_paths:
          - /vmui
          - /vmui/vmui
          - /graph
          - /prometheus/graph
          - /prometheus/api/v1/label.*
          - /graphite.*
          - /prometheus/api/v1/query.*
          - /prometheus/api/v1/rules
          - /prometheus/api/v1/alerts
          - /prometheus/api/v1/metadata
          - /prometheus/api/v1/rules
          - /prometheus/api/v1/series.*
          - /prometheus/api/v1/status.*
          - /prometheus/api/v1/export.*
          - /prometheus/federate
          - /prometheus/api/v1/admin/tsdb/delete_series
      - url_prefix: http://vminsert-demo.monitoring-system.svc:8480/insert/500
        src_paths:
          - /prometheus/api/v1/write
          - /prometheus/api/v1/import.*
          - /influx/.*
          - /datadog/.*
```

## vmctl

- 数据迁移 Prometheus, Thanos, InfluxDB, OpenTSDB
- 迁移步骤
  1. 添加 remote_write 写入到 vm
  2. 迁移旧数据
  3. 去掉旧的 remote_write
  4. 停止旧服务

:::caution

- 无法导入下采样后的数据 [#1101](https://github.com/VictoriaMetrics/VictoriaMetrics/issues/1101)

:::

```bash
# thanos
vmctl prometheus --prom-snapshot thanos-data --vm-addr http://victoria-metrics:8428
```

## vmagent

- maxBlockSize
- maxDiskUsagePerURL=1073741824 - 1G
- queues
- showURL
- tmpDataPath
  - 为确保数据持久化，建议映射存储
    - /tmp/vmagent-remotewrite-data
- flushInterval=1s
- label
  - 额外 Label

## Lens

- vmcluster
  - Helm
  - monitoring-system/vmselect-NAME:8481/select/0/prometheus
- vmsingle
  - Helm
  - monitoring-system/vmsingle-victoria-metrics-stack:8429/prometheus

## cannot handle more than 4 concurrent inserts during 1m0s

尝试增加 vmstorage 资源，检查 vmstorage 状态。

## too many open files
