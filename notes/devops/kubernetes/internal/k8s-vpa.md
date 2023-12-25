---
title: VPA
---

# K8S VPA

- https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler
  - [限制](https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler#known-limitations)

## JVM

不适用于 JVM 类的应用，因为无法获知真实的内存资源使用情况。

- 可以考虑 `-XX:MaxRAMPercentage=75` 不要使用 `-Xmx` `-Xms`，这样可以让 JVM 自己管理内存
- https://cloud.google.com/kubernetes-engine/docs/concepts/verticalpodautoscaler?hl=zh-cn#limitations
- https://github.com/kubernetes/autoscaler/issues/5029
