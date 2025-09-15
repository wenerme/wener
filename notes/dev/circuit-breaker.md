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
- Go: go-circuitbreaker
- https://github.com/netflix/hystrix/wiki/how-it-works
- https://learn.microsoft.com/en-us/azure/architecture/patterns/bulkhead
