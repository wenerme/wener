---
title: HPA
---

## HPA

- v1.16 后允许 minReplicas=0
- https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.27/#horizontalpodautoscaler-v2-autoscaling
- metrics
  - type - ContainerResource, External, Object, Pods, Resource
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
