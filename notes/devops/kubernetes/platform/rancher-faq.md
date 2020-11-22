# Res

```yaml
# 内建
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
# 我自己的仓库
apiVersion: catalog.cattle.io/v1
kind: ClusterRepo
metadata:
  name: wener-charts
spec:
  url: https://charts.wener.tech
```
