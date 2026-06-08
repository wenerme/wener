---
title: Quota
---

# Design Quota

- Quota - 业务规则
  - 用户/租户/套餐/资源在某个周期内拥有多少可用额度
  - 账户权益 - 管理权益、周期额度、用量、账单、余额
  - 关联概念
    - billing
    - subscription
    - plan
    - entitlement
    - usage
    - metering
    - balance
    - credit
- Limiter - 技术机制
  - 在请求发生时，根据 quota、rate、并发、成本等规则决定是否放行
  - 流量控制 - 管理速率、并发、排队、拒绝、等待
  - 关联概念
    - rate limit
    - throttle
    - concurrency
    - queue
    - backpressure
    - retry-after
    - burst
    - window

```
Request -> Auth
  -> Quota check
  -> Limiter check
  -> Execute -> Usage metering
  -> Quota update / reconciliation
```

- https://github.com/envoyproxy/data-plane-api/blob/master/envoy/service/ratelimit/v3/rls.proto

## envoyproxy/ratelimit

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
