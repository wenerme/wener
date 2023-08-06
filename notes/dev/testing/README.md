---
title: 测试
---

# 测试

:::tip

- QPS=VU/RT
- VU=QPS\*RT
- RT=VU/QPS

:::

- QPS=Concurrency/ResponseTime
- Concurrency=VU - Virtual User
- ResponseTime=Latency
- e.g. 1000/100ms = 10 QPS
- 反之:
  - 3000/0.5=6000 VU - 期望 QPS 3000, latency 0.5ms, 需要 6000 并发
  - 1500/0.5=3000 VU - 期望 QPS 1500, latency 0.5ms, 需要 3000 并发

---

- DAU - Daily Active User - 日活跃用户 - 日活
- DAU -> UV - 日活跃用户推导并发
  - 峰值时间段
  - 单次时常
  - 使用间隔
- UX -> RT - 用户体验决定响应时间
  - 区分业务场景
    - 即时响应(<100ms)
      - 搜索自动补全、按钮点击反馈等交互
    - 流畅响应(100-300ms)
      - 页面和内容加载
      - 前端静态，组件加载初始化
      - 乐观更新
    - 可接受的响应(300-1000ms)
      - 一般后台操作,如提交表单
    - 过长响应(>1000ms)
      - 用户会感到延迟,影响体验。
  - 交互接口考虑 100-300ms
  - 一般接口考虑 500ms
- 参考
  - [Latency](../../devops/concept/latency.md)

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

- Breakpoint testing - 断点测试 - 逐步增加负，发现系统的瓶颈
- Load testing - 平均负载测试 - 典型负载验证系统功能
- Smoke testing - 冒烟测试 - 最小负载验证系统功能
- Soak testing - 浸泡测试 - 长时间负载，系统在什么节点出现降级
- Spike testing - 峰值测试 - 突发负载验证系统功能
- Stress testing- 压力测试 - 峰值负载验证系统功能
