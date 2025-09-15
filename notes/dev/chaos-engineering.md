---
title: 混沌工程
---

# 混沌工程

- Chaos engineering
- 目标: 通过主动发现弱点来建立对系统韧性（Resilience）的信心。
  - 建立稳态假设
  - 引入真实世界的变量
  - 验证或证伪假设
- 方法
  - 黑洞攻击（Blackhole Attack）： 让服务A无法访问服务B的网络。
  - 延迟注入（Latency Injection）： 人为增加服务B的响应时间，使其持续超时。
  - 服务关停（Shutdown）： 直接关闭服务B的实例。
- 结果
  - 验证成功
  - 发现弱点

---

- [Chaos Mesh](https://github.com/chaos-mesh/chaos-mesh)
  - Apache-2.0, Go, Typescript
  - Chaos Engineering Platform for Kubernetes.
- [litmuschaos/litmus](https://github.com/litmuschaos/litmus)
  - Apache-2.0, Go
- [Gremlin](https://www.gremlin.com/)
  - 商业软件
  - Chaos Engineering as a Service.
