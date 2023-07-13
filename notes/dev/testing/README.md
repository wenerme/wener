---
title: 测试
---

# 测试

# Load Test


- virtual users (VUs) - 模拟用户并发场景
- requests per second - RPS/QPS - 模拟原始的请求，真实的吞吐量
- Latency - 响应时间
- Availability - 可用性
- SLOs - Service Level Objectives - 服务水平目标
- SLIs - Service Level Indicators - 服务水平指标
- SLAs - Service Level Agreements - 服务水平协议

**Why load test**

- 验证预期流量下的可靠性
- 发现系统问题，探测系统上线

---

- https://k6.io/docs/testing-guides/api-load-testing/

## 测试类型

- 冒烟测试 - 最小负载验证系统功能
- 平均负载测试 - 典型负载验证系统功能
- 压力测试 - 峰值负载验证系统功能
- 峰值测试 - 突发负载验证系统功能
- 断点测试 - 逐步增加负，发现系统的瓶颈
- 浸泡测试 - 长时间负载，系统在什么节点出现降级
