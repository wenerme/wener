---
title: 指标
---

# Metrics

- [Micrometer](https://micrometer.io/)
  - [概念](https://micrometer.io/docs/concepts)
    - 纬度方式: 纬度、级联
    - 频率聚合: 客户端聚合、服务端聚合
    - 上报方式: 推、拉
- Spring Boot [Production-ready Metrics](https://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-metrics.html)
  - 基于 Micrometer
  - 对 Prometheus 暴露 `/actuator/prometheus`

:::tip

- 指标本身是多维数据

:::

- 领先指标（Leading Indicator）

## 指标类型

### 基础指标类型

- **Counter** - 计数器
  - 只能递增的累积指标
  - 聚合方式: sum, rate
  - 示例: HTTP 请求数、错误数、任务完成数
- **Gauge** - 测量器
  - 可上升或下降的瞬时值
  - 聚合方式: min, max, last, average
  - 显示方式: 单值
  - 示例: CPU 使用率、内存使用率、队列长度
- **Histogram** - 直方图
  - 观察值分布统计
  - 聚合方式: buckets, sum, count
  - 显示方式: heatmap, histogram
    - heatmap 体现请求响应时间的分布情况
    - histogram 体现请求响应时间的具体分布
  - 示例: 请求响应时间分布、文件大小分布
- **Summary** - 摘要
  - 时间窗口内的分位数统计
  - vs histogram
    - 在客户端聚合, 直接提供 quantile
    - 不能在服务端重新计算，值不正确
    - 主要用于预定义的 percentiles - 延迟、size 等
  - 聚合方式: quantiles, sum, count
  - 示例: 请求延迟的 P95、P99

### 衍生指标类型

- **Rate** - 比率/速率
  - 基于 Counter 计算的变化率
  - 单位通常是 /秒
  - 示例: QPS (每秒请求数)、错误率
- **Trend** - 趋势
  - 时间序列数据的统计特征
  - 聚合方式: min, max, average, percentiles
  - 示例: 响应时间趋势、资源使用趋势

## 常见指标分类

### 应用层指标

#### HTTP/API 指标

- **请求指标**
  - `http_requests_total` - HTTP 请求总数 (Counter)
  - `http_request_duration_seconds` - 请求响应时间 (Histogram)
  - `http_requests_per_second` - 每秒请求数 (Rate)
  - `http_response_size_bytes` - 响应大小 (Histogram)
- **错误指标**
  - `http_errors_total` - HTTP 错误总数 (Counter)
  - `http_error_rate` - 错误率 (Rate)
  - `http_status_codes` - 状态码分布 (Counter with labels)

#### 业务指标

- **用户指标**
  - `active_users` - 活跃用户数 (Gauge)
  - `user_sessions_total` - 用户会话总数 (Counter)
  - `user_login_total` - 用户登录总数 (Counter)
- **交易指标**
  - `transactions_total` - 交易总数 (Counter)
  - `transaction_amount` - 交易金额 (Counter/Histogram)
  - `payment_failures_total` - 支付失败数 (Counter)

### 系统层指标

#### CPU 指标

- `cpu_usage_percent` - CPU 使用率 (Gauge)
- `cpu_load_average` - CPU 负载平均值 (Gauge)
- `cpu_context_switches_total` - 上下文切换数 (Counter)

#### 内存指标

- `memory_usage_bytes` - 内存使用量 (Gauge)
- `memory_usage_percent` - 内存使用率 (Gauge)
- `memory_available_bytes` - 可用内存 (Gauge)
- `gc_collections_total` - GC 次数 (Counter)
- `gc_duration_seconds` - GC 耗时 (Histogram)

#### 磁盘指标

- `disk_usage_bytes` - 磁盘使用量 (Gauge)
- `disk_usage_percent` - 磁盘使用率 (Gauge)
- `disk_io_operations_total` - 磁盘 I/O 操作数 (Counter)
- `disk_io_bytes_total` - 磁盘 I/O 字节数 (Counter)

#### 网络指标

- `network_bytes_total` - 网络传输字节数 (Counter)
- `network_packets_total` - 网络包数 (Counter)
- `network_connections` - 网络连接数 (Gauge)
- `network_errors_total` - 网络错误数 (Counter)

### 中间件指标

#### 数据库指标

- `db_connections_active` - 活跃数据库连接数 (Gauge)
- `db_connections_pool_size` - 连接池大小 (Gauge)
- `db_query_duration_seconds` - 查询响应时间 (Histogram)
- `db_queries_total` - 查询总数 (Counter)
- `db_slow_queries_total` - 慢查询数 (Counter)

#### 缓存指标

- `cache_hits_total` - 缓存命中数 (Counter)
- `cache_misses_total` - 缓存未命中数 (Counter)
- `cache_hit_rate` - 缓存命中率 (Rate)
- `cache_size_bytes` - 缓存大小 (Gauge)
- `cache_evictions_total` - 缓存淘汰数 (Counter)

#### 消息队列指标

- `queue_size` - 队列长度 (Gauge)
- `messages_published_total` - 发布消息数 (Counter)
- `messages_consumed_total` - 消费消息数 (Counter)
- `message_processing_duration_seconds` - 消息处理时间 (Histogram)

### 容器和编排指标

#### Docker 指标

- `container_cpu_usage_percent` - 容器 CPU 使用率 (Gauge)
- `container_memory_usage_bytes` - 容器内存使用量 (Gauge)
- `container_network_bytes_total` - 容器网络流量 (Counter)
- `container_restarts_total` - 容器重启次数 (Counter)

#### Kubernetes 指标

- `kube_pod_status_ready` - Pod 就绪状态 (Gauge)
- `kube_deployment_replicas` - Deployment 副本数 (Gauge)
- `kube_node_status_ready` - 节点就绪状态 (Gauge)
- `kube_service_endpoints` - Service 端点数 (Gauge)

## 指标标签和维度

### 常用标签

- `instance` - 实例标识
- `job` - 任务名称
- `environment` - 环境 (dev/staging/prod)
- `version` - 应用版本
- `region` - 地域
- `service` - 服务名称
- `method` - HTTP 方法
- `status` - 状态码
- `endpoint` - API 端点

### 标签最佳实践

- 避免高基数标签 (如用户 ID、IP 地址)
- 使用有意义的标签名称
- 保持标签值的一致性
- 限制标签数量 (通常不超过 10 个)

## 指标聚合和计算

### 时间聚合

- `rate()` - 计算速率
- `increase()` - 计算增量
- `avg_over_time()` - 时间范围内平均值
- `max_over_time()` - 时间范围内最大值

### 空间聚合

- `sum()` - 求和
- `avg()` - 平均值
- `max()/min()` - 最大值/最小值
- `count()` - 计数
- `topk()/bottomk()` - 前 K 个/后 K 个

### 分位数计算

- `histogram_quantile()` - 直方图分位数
- P50 (中位数)、P90、P95、P99、P99.9

## 监控模式

- SLI/SLO 关键指标
- 分布式跟踪
  - 端到端延迟 E2E Latency
  - 链路错误率 Trace Error Rate
  - 关键路径耗时 Critical Path Duration
- Batch/ETL
  - 吞吐量 (Throughput): 单位时间内处理的数据量（例如，MB/秒 或 记录数/分钟）。
  - 新鲜度 (Freshness): 数据从生成到处理完成的时间延迟。例如，报表数据是否在早上9点前准备好。
  - 正确性 (Correctness): 处理结果是否准确无误，例如通过数据校验发现的坏数据比例。
  - 执行时长 (Execution Duration): 整个批处理任务完成所需的时间。
- 业务指标驱动 (Business KPIs)
  - 用户注册成功率
  - 视频播放成功率
  - 搜索结果相关性

### 黄金信号 (Golden Signals)

1. **延迟 (Latency)** - 请求响应时间
2. **流量 (Traffic)** - 请求速率
3. **错误 (Errors)** - 错误率
4. **饱和度 (Saturation)** - 资源利用率

从用户（或服务的消费者）的视角出发，衡量服务的宏观表现。它试图回答一个问题：“从外部看，我的服务运行得好吗？”

- 场景
  - 面向用户的服务
  - 复杂的分布式系统
  - 黑盒监控

### RED 方法

1. **Rate** - 请求速率
2. **Errors** - 错误率
3. **Duration** - 响应时间

回答：“我的这个微服务健康吗？”

- 黄金信号的简化版 - 去掉了最难的 饱和度

### USE 方法

1. **Utilization** - 资源利用率
2. **Saturation** - 资源饱和度
3. **Errors** - 错误数量

从系统资源（硬件或软件资源）的视角出发，进行白盒监控。

回答：“我的这个（服务器/数据库/缓存）资源够用吗？瓶颈在哪里？”

- 场景
  - 基础设施监控
  - 有状态服务/资源型服务: 监控数据库（连接池、磁盘队列）、消息队列（队列深度）、缓存（内存使用率）等。
  - 问题排查
