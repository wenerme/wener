---
title: QoS
---

# Design QoS

## 概念 {#concept}

- QoS - Quality of Service
  - 在共享资源上为不同流量提供可预期的服务质量。
  - 常见目标：带宽、延迟、抖动、丢包率、优先级、公平性、隔离性。
  - QoS 不是“让所有请求更快”，而是在资源竞争时定义谁先被服务、谁被限制、谁被降级。
- 典型对象
  - 网络包：IP、DSCP、队列、带宽、丢包。
  - API 请求：租户、用户、API key、route、method、model、成本。
  - 后台任务：priority、queue、worker、deadline、retry、quota。
  - 存储/数据库：IOPS、吞吐、连接数、查询成本、并发。
- 设计维度
  - `classify`：识别流量类别。
  - `mark`：给流量打标，供后续节点选择策略。
  - `meter`：测量是否符合 traffic profile。
  - `police`：超出规则时拒绝、丢弃、降级或重标记。
  - `shape`：超出规则时排队并延迟释放。
  - `schedule`：资源竞争时按策略选择下一个服务对象。
  - `observe`：记录使用量、延迟、丢弃、排队、超限和策略命中。

```
Request / Packet / Job
  -> Classifier
  -> Marker
  -> Meter
  -> Policer / Shaper
  -> Queue / Scheduler
  -> Execute / Forward
  -> Observe / Bill / Audit
```

## QoS vs Quota vs Rate Limit

| 概念 | 关注点 | 常见动作 | 典型问题 |
| --- | --- | --- | --- |
| QoS | 多类流量共享资源时的服务质量 | 分类、标记、排队、调度、丢弃、降级 | 资源竞争时谁优先？延迟/丢包如何控制？ |
| Quota | 某主体在周期内拥有多少权益或额度 | 预留、扣减、重置、对账、计费 | 本月还能用多少？是否欠费？ |
| Rate Limit | 单位时间内允许多少请求或成本 | 放行、拒绝、等待、`Retry-After` | 现在这次请求能不能进？ |
| Traffic Policing | 超出 profile 时立即处理 | drop/reject/remark/throttle | 要不要硬性拦截突发或越权流量？ |
| Traffic Shaping | 超出 profile 时延迟释放 | queue、delay、smooth、backpressure | 如何把突发流量变平滑？ |

## Traffic Conditioning

Traffic conditioning 是 DiffServ / QoS 里的核心入口逻辑：在边界节点或服务入口对流量分类、测量、标记、丢弃或整形。

- `Classifier`
  - 根据 header、tenant、user、API key、route、model、source IP、priority 等规则选择流量。
  - 网络里常见 BA classifier（按 DSCP）和 MF classifier（按多字段）。
- `Marker`
  - 设置或修改流量标记，例如 DSCP、priority、queue、plan tier、internal feature key。
  - 标记应在信任边界重新校验，避免客户端伪造高优先级。
- `Meter`
  - 按 traffic profile 测量流量是否合规。
  - 常见 profile：`rate + burst`、peak rate、平均速率、并发、成本预算。
- `Policer`
  - 对 out-of-profile 流量立即 reject/drop/remark/downgrade。
  - 适合 hard limit、入口保护、安全边界、租户隔离。
- `Shaper`
  - 对 out-of-profile 流量排队，按目标速率释放。
  - 适合出口整形、异步任务、写入削峰、第三方 API 调用节流。

## Traffic Policing vs Traffic Shaping

| 对比 | Policing | Shaping |
| --- | --- | --- |
| 核心动作 | 超出即拒绝、丢弃或降级 | 超出先排队，稍后发送 |
| 是否需要队列 | 不需要，或只依赖后续正常队列 | 需要 queue/buffer |
| 延迟 | 低，失败快 | 会增加排队延迟 |
| 丢弃 | 更容易发生 | 队列未满时较少丢弃 |
| burst | 可能传播 burst | 平滑 burst |
| 常见位置 | 入口、边界、API gateway、安全策略 | 出口、worker、异步队列、下游适配层 |
| 失败模式 | `429`、drop、重试风暴、TCP 退避 | 队列堆积、超时、HOL blocking、内存压力 |

选择原则：

- 交互式请求优先 policing，快速失败并返回明确的 `Retry-After`。
- 后台任务和可等待请求优先 shaping，用队列换取平滑吞吐。
- shaping 必须设置队列长度、最大等待时间、取消语义和降级/丢弃策略。
- policing 常作为 shaping 的保护阀：队列满、等待超时、预算耗尽时拒绝。

## Scheduling

当多个 class 同时竞争资源时，需要 scheduler 决定服务顺序。

- FIFO
  - 简单，但无法表达优先级，容易被大任务阻塞。
- Priority Queue
  - 高优先级先执行；需要防止低优先级饥饿。
- Weighted Fair Queue / Weighted Round Robin
  - 按权重分配服务份额，适合多租户或多等级套餐。
- Deficit Round Robin
  - 适合不同请求大小/成本，避免大请求长期无法执行。
- Deadline / EDF
  - 按截止时间排序，适合有 SLA deadline 的任务。
- Concurrency Limit
  - 限制同时执行数量，常与 rate limit 配合保护 CPU、DB、GPU、第三方 API。

## 分层设计

QoS 通常要分层，而不是只在单点做一个全局 limiter。

- Global：保护整个系统容量，例如总 QPS、总并发、总 token/s。
- Tenant：租户隔离，防止单租户耗尽共享资源。
- User / API key：控制账号级滥用。
- Route / Feature：不同接口或功能有不同成本与优先级。
- Provider / Downstream：保护数据库、队列、GPU、第三方供应商。
- Operation：读写分离、管理操作、批处理、实时请求分别控制。

示例：

```
Global limiter
  -> Tenant limiter
  -> Route / Model limiter
  -> Provider shaper
  -> Worker concurrency limiter
```

## 观测指标

- 流量
  - request rate、throughput、bytes/s、tokens/s、jobs/s。
- 质量
  - p50/p95/p99 latency、queue wait、jitter、timeout、drop rate。
- 资源
  - CPU、memory、connection、thread、GPU、DB pool、queue length。
- 策略
  - allowed、rejected、shaped、queued、dropped、remarked、downgraded。
- 公平性
  - per-tenant usage、noisy neighbor、starvation、priority inversion。

## 常见陷阱

- 只做 rate limit，不做 concurrency limit，导致慢请求堆满执行资源。
- shaping 队列无上限，峰值期间把系统从“拒绝请求”变成“整体高延迟”。
- 客户端重试没有 jitter，policing 后触发同步重试风暴。
- 信任客户端传入的 priority / DSCP / plan tier，导致高优先级被滥用。
- 只看平均 QPS，不看 burst、队列等待、尾延迟和下游错误率。
- 多层 limiter 参数不一致，导致内层已排队但外层超时，浪费资源。
- strict priority 没有配额或 aging，低优先级流量长期饥饿。

## 参考

- [RFC 2475 - An Architecture for Differentiated Services](https://datatracker.ietf.org/doc/html/rfc2475)
- [Cisco - Compare Traffic Policy and Traffic Shape to Limit Bandwidth](https://www.cisco.com/c/en/us/support/docs/quality-of-service-qos/qos-policing/19645-policevsshape.html)
- [Design Quota](./design-quota.md)
