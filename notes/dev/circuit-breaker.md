---
title: 熔断
---

## 熔断

- Circuit breaker
- 保护调用方
- 应对故障的被动反应机制。
- 避免 级联故障（Cascading Failures）
- Closed -> Open -> Half-Open -> Closed
  - Open/打开 - 阻断请求
- HTTP 5XX
- Java: Resilience4j, Netflix Hystrix (目前已进入维护状态)
- .NET: Polly
- Golang
  - [failsafe-go/failsafe-go](https://github.com/failsafe-go/failsafe-go)
  - [sony/gobreaker](https://github.com/sony/gobreaker)
    - Apache-2.0, Go
    - 🌟 简单好理解，推荐阅读
    - age bucket 的 index
    - start - 当前窗口起始时间
    - generation - 跟踪 bucket 的切换, 避免旧请求写入新桶, 避免时间窗口过大导致统计数据污染
    - expiry 控制 Open -> Half-Open
    - requests <= maxRequests - HalfOpen - 可能出现 TooManyRequests
- NodeJS/JS
  - [nodeshift/opossum](https://github.com/nodeshift/opossum)
    - Apache-2.0, JS
- https://github.com/netflix/hystrix/wiki/how-it-works
- https://learn.microsoft.com/en-us/azure/architecture/patterns/bulkhead
