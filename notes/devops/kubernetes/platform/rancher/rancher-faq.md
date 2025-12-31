---
title: Rancher FAQ & Examples
tags:
  - DevOps
  - Kubernetes
  - Rancher
  - Helm
---

# Rancher FAQ & Examples

## Cluster Repositories

```yaml
# 内建仓库
apiVersion: catalog.cattle.io/v1
kind: ClusterRepo
metadata:
  name: rancher-charts
spec:
  gitBranch: main
  gitRepo: https://git.rancher.io/charts
---
apiVersion: catalog.cattle.io/v1
kind: ClusterRepo
metadata:
  name: rancher-partner-charts
spec:
  gitBranch: main
  gitRepo: https://git.rancher.io/partner-charts
---
# 自定义仓库示例
apiVersion: catalog.cattle.io/v1
kind: ClusterRepo
metadata:
  name: wener-charts
spec:
  url: https://charts.wener.tech
```
