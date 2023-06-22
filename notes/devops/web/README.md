---
title: Web
---

# Web Server

- Web 框架
- Web 服务
- 反向代理 服务
- 缓存 服务

## load balancer
- roundrobin
- ewma
  - Peak EWMA
  - Exponentially Weighted Moving Average
  - https://linkerd.io/2016/03/16/beyond-round-robin-load-balancing-for-latency/
    - https://doczhcn.gitbook.io/linkerd/index-1/beyond-round-robin-load-balancing-for-latency
- least_conn
- chash
- aperture
- p2c


```yaml
# https://flugel.it/kubernetes/kubernetes-nginx-ingress-consistent-hash-subset-load-balancer/
nginx.ingress.kubernetes.io/load-balance: ewma
nginx.ingress.kubernetes.io/upstream-hash-by: ewma
```
