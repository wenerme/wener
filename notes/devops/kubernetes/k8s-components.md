---
title: Kubernetes Components Overview
tags:
  - DevOps
  - Kubernetes
  - Component
  - CCM
---

# Kubernetes Components Overview

- `kube-controller-manager`

## Cloud Controller Manager (CCM)

- [Cloud Controller Manager Administration](https://kubernetes.io/docs/tasks/administer-cluster/running-cloud-controller/)
- [Cloud Controller Manager Concept](https://kubernetes.io/docs/concepts/architecture/cloud-controller/)

### Responsibilities (职责)

- **节点控制器 (Node Controller)**
  - 初始化 Node 对象
  - 为 Node 添加相关注释和标签 (CPU, Memory, Region, etc.)
  - 获取 Node 的网络和主机名字
  - 验证节点健康
- **路由控制器 (Route Controller)**
- **服务控制器 (Service Controller)**

### Example: K3s with External Cloud Provider

```bash
k3s server --disable-cloud-controller --kubelet-arg --cloud-provider=external
```
