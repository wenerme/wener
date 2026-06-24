---
title: Quota
---

# Design Quota

## 概念 {#concept}

- Quota - 业务规则 - 强一致性
  - 用户/租户/套餐/资源在某个周期内拥有多少可用额度
  - 账户权益 - 管理权益、周期额度、用量、账单、余额
  - 关联概念
    - billing - 计费
    - subscription - 订阅
    - plan
    - entitlement - 权益
    - usage - 用量
    - metering - 计量
    - balance - 余额
    - credit
  - 实现考量
    - period - 周期
    - reset、timezone、proration、plan change
- Limiter - 技术机制 - 弱一致性
  - 在请求发生时，根据 quota、rate、并发、成本等规则决定是否放行
  - 流量控制 - 管理速率、并发、排队、拒绝、等待
  - 关联概念
    - rate limit - 限速
    - throttle - 阈值
    - concurrency - 并发
    - queue - 队列
    - backpressure - 背压
    - retry-after
    - burst
    - window - 窗口

```
Request -> Auth
  -> Quota check
  -> Limiter check
  -> Execute -> Usage metering
  -> Quota update / reconciliation
```

- Usage -> Metering -> Price -> Cost -> Billing
- reserve estimated cost -> execute -> commit actual usage -> release/refund delta

**参考**

- https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-request-throttling.html
- https://github.com/envoyproxy/data-plane-api/blob/master/envoy/service/ratelimit/v3/rls.proto
- https://pkg.go.dev/golang.org/x/time/rate
- https://github.com/square/quotaservice
- https://developer.konghq.com/plugins/rate-limiting/
- https://raw.githubusercontent.com/Salah856/System-Design/refs/heads/main/Design%20Rate%20Limiter.md
- https://datatracker.ietf.org/doc/draft-ietf-httpapi-ratelimit-headers

## Rate Limiter

- 目标
  - 限制单位时间内的请求量、并发量或成本消耗。
  - 保护下游系统，避免瞬时流量、重试风暴、恶意请求或高成本请求拖垮服务。
  - 给调用方明确反馈：允许、拒绝、等待、排队、降级，通常配合 `Retry-After`、剩余额度、reset time。
- 常见参数
  - `limit`：窗口内允许的最大请求数或最大成本。
  - `window`：统计窗口，例如 1s、1m、1h、1d。
  - `rate`：令牌生成速率或漏出速率，例如 100 req/s。
  - `burst`：允许的瞬时突发容量。
  - `cost`：单次请求消耗的权重，例如 1 request、N tokens、N credits。
  - `scope`：限流维度，例如 global、tenant、user、API key、IP、route、model。
- 算法选择
  - Token bucket：平均速率 + 可控 burst，最常用。
  - Leaky bucket：平滑输出速率，更像排队/整形。
  - Fixed window counter：实现最简单，边界误差最大。
  - Sliding window log：最精确，存储成本最高。
  - Sliding window counter：精度和成本折中，工程上常用。
  - Exponential backoff：不是服务端限流计数算法，而是超限/失败后的重试退避策略，常与 `429`、`Retry-After`、queue、client SDK 配合。

### Token Bucket

- 基本概念
  - 桶里最多保存 `burst` 个 token。
  - 系统按固定 `rate` 持续补充 token，最多补到桶容量。
  - 请求到来时消耗 `cost` 个 token；token 足够则放行，不足则拒绝或等待。
  - `golang.org/x/time/rate` 使用的就是 token bucket 思路。
- Pros
  - 支持突发流量，用户体验比严格匀速更好。
  - 能同时表达平均速率和最大 burst。
  - 状态很小，通常每个 key 只需要保存 token 数和上次更新时间。
  - 容易扩展到加权请求，例如大请求消耗更多 token。
- Cons
  - 不能保证任意固定窗口内绝不超过 `limit`，因为允许 burst。
  - 分布式环境需要原子更新，否则并发下可能超发 token。
  - burst 设置过大时，下游仍会被瞬时流量打爆。
  - 对长任务只控制进入速度，不控制执行中的并发和资源占用。
- 适用场景
  - API QPS、LLM 请求入口、短信/邮件发送、按成本加权的请求入口限流。

### Leaky Bucket

- 基本概念
  - 请求进入桶或队列，系统以固定速率把请求“漏出”并执行。
  - 桶满时新请求被拒绝、丢弃或阻塞等待。
  - 与 token bucket 相比，leaky bucket 更强调输出速率稳定，而不是允许 burst。
- Pros
  - 输出更平滑，可以保护下游系统免受尖峰流量影响。
  - 适合把突发流量整形成稳定消费速率。
  - 队列长度可作为 backpressure 指标。
- Cons
  - 排队会引入延迟，不适合低延迟交互请求。
  - 队列过长时容易造成超时、取消、堆积和 head-of-line blocking。
  - 需要处理请求取消、超时、优先级和队列持久化问题。
  - 只限制流出速率，不天然表达“某窗口最多 N 次”的业务规则。
- 适用场景
  - 后台任务、异步发送、写入削峰、下游吞吐固定的 worker / queue 消费。

### Fixed Window Counter

- 基本概念
  - 把时间切成固定窗口，例如每分钟一个 bucket。
  - 每个 `scope + window` 维护一个 counter，请求到来时递增。
  - counter 小于等于 limit 则放行，超过则拒绝；窗口结束后重置或依赖 TTL 过期。
- Pros
  - 实现最简单，Redis `INCR` + `EXPIRE` 就能完成。
  - 存储成本低，每个 scope 每个窗口一个 counter。
  - 易于解释、观测和排查，例如“本分钟已使用 83/100”。
- Cons
  - 窗口边界会产生双倍 burst：上一窗口末尾和下一窗口开头各打满一次。
  - 对窗口边界附近的用户不公平，限流体验有跳变。
  - 只适合粗粒度限流，不适合严格平滑流量。
  - 多节点本地计数会不一致，集中式计数又会增加 Redis / DB 压力。
- 适用场景
  - 日配额、小时配额、管理后台操作、低成本粗粒度 API 限制。

### Sliding Window Log

- 基本概念
  - 为每个 scope 保存最近窗口内每次请求的时间戳。
  - 请求到来时删除窗口外时间戳，再判断剩余数量是否超过 limit。
  - 如果未超过则记录当前时间戳并放行。
- Pros
  - 精度最高，能严格表达“过去 N 秒内最多 M 次”。
  - 不存在 fixed window 的边界双倍 burst 问题。
  - 便于审计和调试，因为保留了每次请求时间。
- Cons
  - 存储成本高，请求越多日志越多。
  - 每次请求都需要清理旧记录和写入新记录，热 key 压力大。
  - 高 QPS 场景下 Redis sorted set / list 容易成为瓶颈。
  - 不适合全量用户、全路由的大规模通用限流。
- 适用场景
  - 登录尝试、验证码发送、敏感操作、防滥用、安全风控等低频但需要精确的场景。

### Sliding Window Counter

- 基本概念
  - 用当前窗口和上一个窗口的 counter 估算滑动窗口内请求数。
  - 常见估算：`estimated = current_count + previous_count * overlap_ratio`。
  - 比 fixed window 更平滑，比 sliding window log 更省存储。
- Pros
  - 大幅降低 fixed window 的边界突刺。
  - 存储成本低，通常每个 scope 只需要当前和上一个窗口 counter。
  - 适合大规模 API 限流，比 log 方案更容易扩展。
  - 可以用 Redis counter / Lua 原子脚本实现。
- Cons
  - 是近似算法，不如 sliding window log 精确。
  - 窗口粒度和 overlap 计算会影响误差。
  - 分布式原子性、时钟偏差和热 key 仍然需要处理。
  - 对强审计场景不够透明，因为没有保留每次请求时间戳。
- 适用场景
  - 大部分面向用户/API key/租户的通用限流，尤其是需要比 fixed window 更平滑但不想保存请求日志的场景。

### Exponential Backoff

- 基本概念
  - 请求被限流、下游过载或临时失败后，不立即等间隔重试，而是按指数增长等待时间。
  - 常见公式：`delay = min(base * factor^attempt, max_delay)`。
  - 实践中通常加 jitter：`delay = random(0, delay)` 或在 delay 附近随机抖动，避免大量客户端同一时间重试。
  - 服务端限流返回 `Retry-After` 时，客户端应优先尊重服务端建议，再结合 backoff 上限和重试预算。
- Pros
  - 能快速降低重试风暴对服务端、队列、数据库和第三方 API 的压力。
  - 实现简单，适合 client SDK、worker、queue consumer、webhook delivery。
  - 配合 jitter 可以避免 thundering herd / synchronized retry。
  - 可以和 token bucket / leaky bucket 组合：服务端拒绝或排队，客户端按 backoff 重试。
- Cons
  - 不是准入控制算法，不能替代服务端 rate limiter。
  - 增加尾延迟；用户交互请求通常不能无限退避。
  - 如果没有 max attempts、deadline、retry budget，可能造成长时间堆积或隐藏真实故障。
  - 如果所有客户端使用相同 backoff 且无 jitter，仍可能形成周期性流量尖峰。
  - 对非幂等请求可能产生重复副作用，需要 idempotency key 或去重机制。
- 适用场景
  - 客户端遇到 `429` / `503` 后重试。
  - 后台任务、消息消费、webhook 投递、第三方 API 调用。
  - 分布式系统里处理临时错误、网络抖动、leader 切换、短暂过载。
- 实践建议
  - 设置 `max_delay`、`max_attempts`、总 `deadline` 和 retry budget。
  - 对 `429` 优先使用 `Retry-After`，不要抢跑服务端窗口。
  - 必须加 jitter，尤其是大规模客户端或 worker fleet。
  - 区分可重试错误和不可重试错误，例如 4xx 业务错误通常不应重试。

### 多窗口 {#multi-window}

- 基本概念
  - 一个 subject 通常同时受多个窗口约束，例如 `1min`、`5min`、`1d`、`7d`、`billing_month`。
  - 短窗口更偏 limiter，用于保护系统瞬时压力。
  - 长窗口更偏 quota，用于表达套餐权益、成本预算和账务周期。
  - hard rule 通常需要全部通过：`allow = entitlement_ok && all(quota_windows_ok) && all(limiter_windows_ok)`。
- 常见组合
  - `60 req / 1min`：限制瞬时请求速度。
  - `300 req / 5min`：限制持续小突发，避免每分钟打满后长期压住系统。
  - `100k tokens / 1d`：每日权益或成本保护。
  - `500k tokens / rolling 7d`：防止短期跨日集中消耗。
  - `2M tokens / billing_month`：套餐或账期总额度。
- Limiter vs Quota 窗口
  - Limiter 常用 `1s`、`1min`、`5min`、`1h`，关注实时保护和弱一致性。
  - Quota 常用 `1d`、`7d`、`1mo`、`billing_cycle`，关注权益、账务、对账和强一致性。
  - 短窗口不能替代长窗口：当前分钟没超，不代表今天或本月额度没超。
  - 长窗口不能替代短窗口：月度额度还有剩余，也可能瞬间打爆下游。
- Rolling vs Calendar
  - `rolling 7d`：从当前时间向前滚动计算 7 天，更平滑，但实现和解释成本更高。
  - `calendar day/week/month`：按自然日/周/月重置，易解释，但边界有突刺风险。
  - `billing_month`：按订阅账期或合同账期重置，不一定等于自然月。
  - 文档和 API 里避免用 `1m` 表示分钟或月份，建议用 `1min` / `1mo` / `billing_month`。
- 评估顺序
  - 先做 entitlement：是否允许使用该能力。
  - 再做长窗口 quota pre-check / reserve：是否还有足够权益或余额。
  - 再做短窗口 limiter：是否允许当前瞬时请求进入系统。
  - 执行后按实际 usage commit，并对预估差额 refund / adjust。
- Key 设计
  - limiter key 可包含短窗口 bucket：`rl:tenant:t1:route:/v1/chat:1min:2026-06-16T10:03`。
  - quota key 应包含业务周期：`quota:tenant:t1:tokens:billing_month:2026-06`。
  - rolling window 通常不能只靠一个固定 bucket，需要 log、counter ring 或分桶聚合。
- 策略
  - 多窗口 hard limit：任一窗口超限即拒绝。
  - 多窗口 soft limit：长窗口超限可告警、降级、转按量付费或人工审批。
  - 返回错误时应指明命中的 rule/window，例如 `tokens_daily_exceeded`、`requests_1min_exceeded`。
  - 对用户展示时优先解释业务窗口；对工程排障时同时暴露短窗口 limiter 命中情况。

```text
pre-check aggregate
  -> reserve estimated cost
  -> execute
  -> commit actual usage
  -> refund/release delta
  -> append usage ledger
  -> update aggregate/cache
```

### 放置位置

- Client-side
  - 只能作为友好提示或 SDK 自我保护，不能作为安全边界。
  - 客户端可被绕过、伪造或降级，服务端仍必须做最终判断。
- Server-side / in-process
  - 适合单体应用、内部服务、需要强业务上下文的限流。
  - 优点是能直接访问用户、租户、套餐、成本估算等上下文。
  - 缺点是多语言/多服务重复实现，跨实例全局一致性需要外部存储。
- Middleware / API Gateway / Edge
  - 适合统一入口、API key/IP/route 维度、早拒绝和保护后端。
  - 常与 auth、WAF、IP allowlist、SSL termination、静态资源等能力共用。
  - 缺点是业务上下文有限，复杂 quota / billing 语义通常仍要回源查询。
- Dedicated rate limit service
  - 适合多服务共享规则、统一审计、集中配置和跨语言接入。
  - 常见形态是 gateway/filter 调用 rate-limit service，service 再读规则和计数存储。

### 存储与规则

- 规则存储
  - 静态配置：YAML / JSON / config repo，适合平台级限流规则。
  - 动态配置：DB / control plane / admin API，适合租户、套餐、客户级规则。
  - 缓存：规则加载到本地内存或 Redis，降低请求路径延迟。
- 计数存储
  - 本地内存：低延迟，但只能做单实例局部限流，重启丢失。
  - Redis / Memcached：工程上常用，支持 TTL、原子计数和跨实例共享。
  - 数据库：不适合高频请求路径；更适合账务级 usage ledger、审计、对账。
- Redis 常见实现
  - Fixed window：`INCR` + `EXPIRE`。
  - Sliding log：sorted set 记录 timestamp，按窗口裁剪。
  - Sliding counter / token bucket：通常用 Lua script 保证读改写原子性。
- Key 设计
  - `rl:{scope}:{id}:{dimension}:{window}`，例如 `rl:tenant:t1:route:/v1/chat:2026-06-16T10:03`。
  - 需要控制 key cardinality，避免把 user-agent、完整 URL、trace id 等高基数字段放入限流 key。

### 请求流程

```text
Request
  -> Identify subject: tenant / user / API key / IP
  -> Load rule: scope + route + plan + priority
  -> Build limit key and cost
  -> Atomic check/update counter or bucket
  -> Allow: forward to upstream
  -> Deny: return 429 / enqueue / degrade
  -> Emit metrics and audit event
```

- 对低成本 API，可在 allow 时直接计数。
- 对高成本或成本未知请求，建议先 reserve，再按实际 usage commit / refund。
- 对异步任务，rate limiter 控制入队速度；worker 侧还需要 concurrency limiter 和 queue backpressure。

### 超限响应

- HTTP 状态码
  - `429 Too Many Requests`：客户端超过限流规则。
  - `503 Service Unavailable`：系统过载或保护性拒绝，有时更适合全局熔断。
- 常见响应头
  - `Retry-After`：建议多久后重试。
  - `X-RateLimit-Limit` / `RateLimit-Limit`：当前窗口限制。
  - `X-RateLimit-Remaining` / `RateLimit-Remaining`：当前窗口剩余额度。
  - `X-RateLimit-Reset` / `RateLimit-Reset`：窗口重置时间或剩余秒数。
- 超限策略
  - Drop：直接拒绝，适合交互 API 和安全风控。
  - Queue：排队稍后处理，适合订单、消息、后台任务。
  - Degrade：降级模型、降低并发、减少返回内容或切换缓存。
  - Shadow：只记录 would-block，不实际拒绝，用于新规则灰度验证。
- https://datatracker.ietf.org/doc/draft-ietf-httpapi-ratelimit-headers

### 分布式注意事项

- 原子性
  - 多实例共享限流时，check + update 必须原子化，否则并发请求会穿透限制。
  - Redis 可用 Lua script / transaction；数据库可用条件更新，但通常延迟更高。
- 时钟
  - Sliding window / token refill 依赖时间，分布式节点时钟漂移会影响公平性。
  - 尽量使用存储端时间或统一 monotonic 时间来源。
- Fail open vs fail closed
  - `fail open`：限流存储不可用时放行，保护可用性但可能放大流量。
  - `fail closed`：限流存储不可用时拒绝，保护下游但可能误伤用户。
  - 通常按接口重要性、滥用风险、成本风险分级选择。
- 热 key
  - 全局限流、热门租户、热门 route 会形成 Redis 热点。
  - 可用分片 key、本地预取 token、分层限流（local + global）降低压力。
- 多层限流
  - Edge：IP / API key 粗粒度防护。
  - Gateway：tenant / route / plan 维度。
  - Service：业务上下文、成本估算、并发和下游保护。
  - Worker：队列消费速率和并发控制。

### 监控与调参

- 核心指标
  - allowed / blocked / shadow-blocked request count。
  - over-limit rate、429 rate、Retry-After 分布。
  - limiter check latency、Redis latency、Lua error、timeout。
  - key cardinality、hot key、规则命中分布。
  - queue depth、wait time、drop count、degrade count。
- 调参判断
  - 误伤正常用户：放宽规则、增加 burst、区分 plan / priority。
  - 突发流量穿透：降低 burst、增加并发限制、改用 leaky bucket / queue。
  - Redis 压力过高：本地预限流、分层限流、降低 key cardinality、换近似算法。
  - 规则不生效：检查 scope 提取、descriptor 顺序、默认规则、灰度/shadow 配置。

## envoyproxy/ratelimit

- descriptor-based rate limit
- https://github.com/envoyproxy/ratelimit

```proto
// 支持 ADS（Aggregated Discovery Service，SotW 或 delta 协议）的管理服务，
// 可以通过 RateLimitConfig 消息类型下发限流服务配置。
// 限流服务中的 ADS client 会使用资源类型 URL
// "type.googleapis.com/ratelimit.config.ratelimit.v3.RateLimitConfig"
// 发送 Discovery Request 流。
// ADS 管理服务应返回相同类型 URL 的 Discovery Response 流，
// 并在 Discovery Response 的 resources 中包含 RateLimitConfig 数组。

// 单个 domain 的限流配置。
message RateLimitConfig {
  // 限流配置名称。每个配置应保持唯一。
  string name = 1;

  // 限流配置所属的 domain 名称。
  string domain = 2;

  // 限流配置 descriptor 列表。
  repeated RateLimitDescriptor descriptors = 3;
}

// 限流配置 descriptor。
message RateLimitDescriptor {
  // descriptor 的 key。
  string key = 1;

  // descriptor 的可选 value。
  string value = 2;

  // descriptor 的限流策略。
  RateLimitPolicy rate_limit = 3;

  // 子级限流 descriptor 列表。
  repeated RateLimitDescriptor descriptors = 4;

  // 将 descriptor 标记为 shadow。为 true 时，限流服务会放行请求到后端。
  bool shadow_mode = 5;

  // 为 descriptor 设置 `detailed_metric: true` 会扩展生成的指标。
  bool detailed_metric = 6;

  // 将 descriptor 标记为 quota 模式。quota_mode 为 true 时，限流服务会持续放行请求，
  // 直到所有 quota descriptor 都超过限制。
  bool quota_mode = 7;
}

// 限流策略。
message RateLimitPolicy {
  // 限流的时间单位。
  RateLimitUnit unit = 1;

  // 在 `unit` 时间内允许的请求数。
  uint32 requests_per_unit = 2;

  // 将限流策略标记为无限制。所有请求都会被放行到后端。
  bool unlimited = 3;

  // 限流策略的可选名称。如果该策略需要被其他策略替换（跳过评估），则应命名。
  string name = 4;

  // 该限流策略会替换（跳过评估）的限流策略列表。
  // 更多信息：https://github.com/envoyproxy/ratelimit/tree/0b2f4d5fb04bf55e1873e2c5e2bb28da67c0643f#replaces
  // 示例：https://github.com/envoyproxy/ratelimit/tree/0b2f4d5fb04bf55e1873e2c5e2bb28da67c0643f#example-7
  repeated RateLimitReplace replaces = 5;
}

// Replace 指定应被替换（跳过评估）的限流策略。
// 更多信息：https://github.com/envoyproxy/ratelimit/tree/0b2f4d5fb04bf55e1873e2c5e2bb28da67c0643f#replaces
message RateLimitReplace {
  // 被替换（跳过评估）的限流策略名称。
  string name = 1;
}

// 标识限流的时间单位。
enum RateLimitUnit {
  UNKNOWN = 0;
  SECOND = 1;
  MINUTE = 2;
  HOUR = 3;
  DAY = 4;
  WEEK = 7;
  MONTH = 5;
  YEAR = 6;
}
```

# FAQ

## Quota vs Entitlement vs Balance

- Entitlement 是“是否有权使用某能力/资源”。
- Quota 是“在某范围/周期/维度下允许多少”。
- Balance/Credit 是“可消费余额”，通常更像账户资金或赠送额度。

## Hard quota vs Soft quota

- Hard quota：超过即拒绝，例如 API calls/month。
- Soft quota：超过后告警、降级、排队、转按量付费或人工审批。
