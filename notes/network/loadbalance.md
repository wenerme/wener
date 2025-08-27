---
title: Load Balance
---

# Load Balance

- [DPDK](https://en.wikipedia.org/wiki/Data_Plane_Development_Kit) - Data Plane Development Kit
  - 直接在网卡开发应用实现抓发，绕过内核处理，做到性能最大化
  - 绕过内核
- [Netfilter](https://en.wikipedia.org/wiki/Netfilter)
  - Linux 提供的内核机制，用于网络相关处理
- [OpenOnload](https://www.openonload.org/)
  - 网络栈
- [FDio/vpp](https://github.com/FDio/vpp) - [fd.io](https://fd.io/) 的项目 - The Fast Data Project
  - open source version of Cisco's Vector Packet Processing (VPP) technology
- 参考
  - [Kernal bypass](https://blog.cloudflare.com/kernel-bypass/)
    - 如何绕过内核以提高性能
    - PACKET_MMAP - Linux 接口，快速网络嗅探
    - PF_RING - 加速包捕获，不在 linux 主干
    - Snabbswitch - L2，使用 Lua 编写的框架，对网卡编程，绕过内核网络栈
    - DPDK
    - Netmap
  - [10 Open Source Load Balancer for HA and Improved Performance](https://geekflare.com/open-source-load-balancer)
  - [iqiyi/dpvs](https://github.com/iqiyi/dpvs) - high performance Layer-4 load balancer based on DPDK
  - [Building a Billion User Load Balancer](https://news.ycombinator.com/item?id=13354546)

## 策略

- roundrobin
- WRR - 加权轮训
- SMA - simple moving average
- ewma - Exponentially Weighted Moving Average - 指数加权移动平均
  - 分析和预测时间序列数据
  - adopted by Linkerd, Apisix, NGINX Ingress
  - 优点
    - 反应速度快
  - 缺点
    - 边界效应
    - 滞后性
  - 参考
    - https://linkerd.io/2016/03/16/beyond-round-robin-load-balancing-for-latency/
    - https://doczhcn.gitbook.io/linkerd/index-1/beyond-round-robin-load-balancing-for-latency
- Peak EWMA
  - 专门设计来跟踪和平滑数据序列中的峰值。
  - 它在处理具有尖峰或极端值的时间序列数据时特别有用，比如网络流量、交易量或资源使用率等，其中峰值的快速检测对于系统监控、预警和资源规划至关重要。
  - 参考
    - https://twitter.github.io/finagle/guide/Clients.html#power-of-two-choices-p2c-peak-ewma
    - [envoyproxy/envoy#20907](https://github.com/envoyproxy/envoy/issues/20907)
    - [haproxy#1570](https://github.com/haproxy/haproxy/issues/1570)
- least_conn
- chash
- aperture
- p2c - power of two choices
- HAProxy [balance](https://docs.haproxy.org/2.9/configuration.html#4.2-balance)
  - roundrobin, static-rr, leastconn, first, hash, source, uri, url_param, hdr, random, rdp-cookie, log-hash, sticky
- Finagle [Load Balancing](https://twitter.github.io/finagle/guide/Clients.html#load-balancing)
  - 计算型场景
  - Heap + Least Loaded
  - P2C + {Least Loaded, Peak EWMA}
  - Aperture + Least Loaded

```yaml
# https://flugel.it/kubernetes/kubernetes-nginx-ingress-consistent-hash-subset-load-balancer/
nginx.ingress.kubernetes.io/load-balance: ewma
nginx.ingress.kubernetes.io/upstream-hash-by: ewma
```

## NOTE

- LB 需要考虑
  - 支持的协议层级
  - 支持的应用协议
  - 支持的负载权重因子
