---
title: AIOps
---

# AIOps

- 架构
  - Detection (检测)：检测系统异常
  - Localization (定位)：定位异常位置
  - Analysis (分析)：分析根本原因
  - Mitigation (缓解)：修复和缓解异常
- “被动响应” -> “主动控制”
- “阈值判断” -> “统计分析”
- 基础
  - 关键指标 (Observed Key Metrics)
  - 熔断器 (Circuit Breaker) - 闭合、断开、半开
  - 权重调整与流量整形 (Weight Adjustment & Traffic Shaping)
    - 精确地控制用户流量的流向
  - 自愈 (Self-healing)
- 高级 - 渐进式交付 (Progressive Delivery)
  - 金丝雀发布
  - 蓝绿部署
  - 灰度发布
  - 滚动发布
- 参考
  - https://github.com/microsoft/AIOpsLab
  - https://github.com/spinnaker/kayenta
  - https://github.com/argoproj/argo-rollouts
