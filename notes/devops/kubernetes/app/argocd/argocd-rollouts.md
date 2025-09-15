---
title: Argo Rollouts
---

# Argo Rollouts

- [argoproj/argo-rollouts](https://github.com/argoproj/argo-rollouts)
  - Apache-2.0, Go
  - Rollout 可替代 Deployment
  - Blue-Green / 蓝绿发布
  - Canary / 金丝雀发布
  - 精细化流量权重分配
  - 自动回滚与自动推广
  - 支持人工判断
  - 可自定义业务指标（KPI）查询与分析
  - Ingress 控制器集成：NGINX、ALB、Apache APISIX
  - Service Mesh 集成：Istio、Linkerd、SMI
  - 支持多种流量管理方案同时使用，如 SMI + NGINX、Istio + ALB 等
  - 指标提供商集成：Prometheus、Wavefront、Kayenta、Web、Kubernetes Jobs、Datadog、New Relic、Graphite、InfluxDB
- 渐进式交付（Progressive Delivery）
  - 高级部署策略：支持蓝绿（Blue-Green）部署和金丝雀（Canary）发布等多种高级部署策略，相比 Kubernetes 内置的滚动更新（RollingUpdate）提供了更强的灵活性和安全性。
  - 渐进式流量转移：能够与服务网格（Service Mesh）和 Ingress 控制器集成（例如 Istio, Linkerd, NGINX, ALB），以精细地控制流向新版本的流量比例。您可以逐步将用户流量从旧版本迁移到新版本，从而减小发布风险。
  - 自动化分析与回滚：Argo Rollouts 可以集成多种指标提供商（如 Prometheus, Datadog, New Relic 等）。在发布过程中，它可以自动查询和分析关键业务指标（KPIs），如果新版本表现不佳，它可以自动中止发布并回滚到旧版本。
  - 手动控制和判断：在发布流程中，可以设置暂停点，允许人工进行验证和判断，然后再决定是继续推广新版本还是执行回滚。
- 参考
  - https://argoproj.github.io/argo-rollouts/
  - https://github.com/Knetic/govaluate
    - 表达式
    - fork https://github.com/casbin/govaluate
    - alternative https://github.com/expr-lang/expr

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: rollout-canary-demo
spec:
  replicas: 5
  selector:
    matchLabels:
      app: rollout-canary-demo
  template:
    metadata:
      labels:
        app: rollout-canary-demo
    spec:
      containers:
        - name: demo-app
          # 初始版本，显示蓝色背景
          image: argoproj/rollouts-demo:blue
          ports:
            - containerPort: 8080
  strategy:
    canary:
      # 金丝雀发布的具体步骤
      steps:
        # 1. 将 20% 的流量切到新版本
        - setWeight: 20
        # 2. 暂停发布，等待人工确认。如果不设置 duration，它会一直暂停。
        - pause: {}
        # 3. 人工确认后，在 10 秒内将流量逐步增加到 40%
        - setWeight: 40
        - pause: { duration: 10s }
        # 4. 在 10 秒内将流量逐步增加到 60%
        - setWeight: 60
        - pause: { duration: 10s }
        # 5. 在 10 秒内将流量逐步增加到 80%
        - setWeight: 80
        - pause: { duration: 10s }
      # 6. 最后流量会全量切到 100%
```

```yaml
steps:
  - setWeight: 20 # 放量 20%
  - pause: {} # 人工 PromptFull
  - setWeight: 50 # 放量 100%
```

# FAQ

## Why Rollouts

- Deployment 的局限性
  - 难以精确控制发布速度
  - 无法灵活管理新版本的流量分配
  - 就绪探针无法用于更深入、压力或一次性检查
  - 无法查询外部指标验证更新效果
  - 虽可暂停发布，但无法自动中止并回滚更新

## Blue-Green vs Canary

- Blue-Green
  - 需要两倍的资源
  - 通过 service selector 选择 hash 瞬间全量切换
  - 场景
    - 高风险
    - 快速回滚
    - 资源充足
    - 状态无关
- Canary

> 矿井中的金丝雀用于检测危险。

| 发布策略 | Blue-Green（蓝绿发布）   | Canary（金丝雀发布） |
| -------- | ------------------------ | -------------------- |
| 资源需求 | 2x                       | 1.1-1.5x             |
| 切换速度 | 瞬时                     | 渐进                 |
| 风险控制 | 中等                     | 高                   |
| 回滚速度 | 瞬时                     | 需要时间             |
| 流量控制 | 粗粒度                   | 细粒度               |
| 复杂度   | 低                       | 高                   |
| 测试机会 | 预览环境                 | 生产流量             |
| 适用场景 | 重大版本升级、需快速切换 | 细粒度发布、持续交付 |
