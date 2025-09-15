---
title: HPA
---

## HPA

:::caution

- 资源使用率基于 requests 计算，而不是 limits

:::

| API Version         |   K8S | 说明                                       |
| ------------------- | ----: | ------------------------------------------ |
| autoscaling/v1      |  1.1+ | 仅支持 CPU，targetCPUUtilizationPercentage |
| autoscaling/v2beta1 | 1.12+ | 支持多指标                                 |
| autoscaling/v2beta2 | 1.16+ | 增加 behavior 配置                         |
| autoscaling/v2      | 1.23+ | 正式版，推荐使用                           |

- v1.16 后允许 minReplicas=0
- https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.27/#horizontalpodautoscaler-v2-autoscaling
- metrics
  - type
    - ContainerResource：针对特定容器的资源（如 CPU、内存）进行伸缩，适用于多容器 Pod 场景。
    - Resource：根据 Pod 整体资源（如 CPU、内存）利用率进行伸缩，是最常用的类型。
    - Pods：根据每个 Pod 的自定义指标（如请求数、队列长度）进行伸缩，需在 Pod 内暴露指标。
    - Object：根据其他 Kubernetes 对象的指标（如 Service 的 QPS）进行伸缩，需配置指标来源对象。
    - External：根据集群外部系统的指标（如云服务监控、第三方 API）进行伸缩，需配置外部指标源。
  - containerResource
    - 可以选择目标 container
  - resource
- target
  - type - Utilization, Value, AverageValue
  - averageUtilization - 所有 Pod - 只能 Resource
  - averageValue
- behavior - scaleDown, scaleUp
  - policies
    - type: Pods
    - value - 每次变化的 Pod 数量
    - periodSeconds - 间隔
      - 0-1800
  - selectPolicy=Max
  - stabilizationWindowSeconds
    - 0-3600
    - up 默认 0
    - down 默认 300 - 5 分钟
  - 表述
    - 扩容: 等待0秒立即响应，每次扩容1个Pod，然后等待2分钟再次评估
    - 缩容: 等待5分钟确认负载下降，每次缩容1个Pod，然后等待2分钟再次评估

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: server
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: server
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource # Resource、Pods、Object、External
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 50
```

```
desiredReplicas = ceil[currentReplicas * ( currentMetricValue / desiredMetricValue )]
```
