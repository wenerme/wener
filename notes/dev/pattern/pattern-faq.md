---
title: Pattern FAQ
tags:
  - FAQ
---

# Pattern FAQ

## Actor vs CSP

- [Comparison with the actor model](https://en.wikipedia.org/wiki/Communicating_sequential_processes#Comparison_with_the_actor_model)
  - CSP 消息内容无关，Actor 消息类型明确
  - CSP 基于 channel，Actor 基于明确的终端标识
  - CSP channel 收发两端存在“约会”定点，Actor 全异步不存在等待
- [How are Akka actors different from Go channels?](https://www.quora.com/How-are-Akka-actors-different-from-Go-channels-How-are-two-related-to-each-other)
  - channel
    - limit buffer
    - select - waiting faster
    - wait - 不消耗 CPU，只需要一点内存
      - 无 buffer - 等待对方存在
      - buffer 满 - 等待空间
      - 空 buffer - 等待数据存在
    - 劣势
      - 互相依赖可能导致死锁
  - actor
    - 每个 actor 类似一个 goroutine `for {}`
    - 只有一个输入 channel
    - infinite buffer
    - unbounded number of writer - writer 也是 actor
    - 不存在 wait - 全异步 - 不存在 select
    - 劣势
      - 当需要流控交互时会变得麻烦 - 请求/响应 - 失去性能优势
      - 无法拒绝通讯 - go 可以选择 close channel，可 select 部分
      - 无限的 buffer 并不能实际被保障 - 内存总是会满的

## Adapter vs Facade

- Adapter
  - 目的：将一个类的接口转换成客户希望的另一个接口
  - 适用场景：当想要使用一个类，但其接口不符合要求时
  - 例子：适配器模式可以让不兼容的接口协同工作
- Facade
  - 目的：为一组接口提供一个统一的高层接口
  - 适用场景：当需要简化复杂系统的使用时
  - 例子：一个复杂子系统的简化接口

## 断路器 vs 优雅降级 {#circuit-breaker-vs-graceful-degradation}

断路器是实现优雅降级的关键触发机制之一。
它们相辅相成，是构建现代化、高韧性（Resilient）系统的标准实践。

- 断路器（Circuit Breaker）
  - 一种“机制”
  - 一种保护性的设计模式。
  - 保护系统
- 优雅降级（Graceful Degradation）
  - 一种“策略”
  - 一种系统设计的指导思想或策略。
  - 保障核心功能和用户体验。
  - 做什么来补救
  - “B计划” (Contingency Plan)
- 动态负载均衡 (Dynamic Load Balancing) / 自适应负载均衡 (Adaptive Load Balancing)
  - 基于健康状况的自动降权 (Health-Based Automatic Weight Reduction)。
  - 核心思想
    - 负载均衡器不再是一个静态的、按预设规则（如轮询、IP哈希）分配流量的设备，而是一个智能的、能感知上游服务状态的决策者。
  - 监控与健康检查 (Monitoring & Health Checking):
  - 动态权重调整 (Dynamic Weight Adjustment)
  - 自动恢复 (Automatic Recovery)
