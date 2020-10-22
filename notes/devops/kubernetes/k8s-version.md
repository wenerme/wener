---
id: k8s-version
---

# Kubernetes 版本

## Tips

## 1.19
* [CHANGELOG-1.19](https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.19.md)
* EndpointSlices 默认启用
* Ingress GA
* seccomp GA
* KubeSchedulerConfiguration Beta
* 存储容量跟踪 - Alpha
  * 之前调度时都不会考虑节点存储容量
* 通用临时存储卷
* 不可变的 Secrets 和 ConfigMaps - Beta
* kubernetes/dashboard v2
* 通用 [ephemeral volumes](https://kubernetes.io/docs/concepts/storage/ephemeral-volumes/)
  * 生命周期与 pod 绑定
  * 支持使用动态 provisioning 存储作为临时卷 - ALPHA
