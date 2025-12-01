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

- 静态策略 - 适用于冷启动
  - RR - Round Robin
  - WRR - Weighted Round Robin - 加权轮训
- 简单动态策略
  - least_conn - 最少连接
    - 只知道“忙不忙”（连接数），但不知道“为什么忙”
    - 无法区分“处理快但连接多”和“处理慢但连接少”
    - 对网络抖动（导致连接建立慢）不敏感
- Hash-Based
  - 适用于状态场景；需要会话保持
  - chash - consistent hashing - 一致性哈希
  - uri
  - source
  - url_param
  - hdr
  - request_id
- SMA - simple moving average - 简单移动平均
  - 计算最近 N 次请求的平均延迟
  - 局限性
    - 反应慢，对峰值不敏感
    - 如果 N=10 上游突然变慢，需要 10 个慢请求才能完全意识到问题，对于恢复也是一样。
- EWMA - Exponentially Weighted Moving Average - 指数加权移动平均
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

## EWMA

- EWMA  - Exponentially Weighted Moving Average - 指数加权移动平均
- 计算最近 N 次请求的平均延迟
$$
EWMA = \alpha \times Y + (1 - \alpha) \times EWMA_{t-1}
$$

- `\alpha` - 权重因子
  - 0.3 简单选择
- `Y` - 当前请求的延迟
- `EWMA_{t-1}` - 上一次请求的 EWMA 值


## NOTE

- LB 需要考虑
  - 支持的协议层级
  - 支持的应用协议
  - 支持的负载权重因子
- LB
  - 优化 性能/Latency/Throughput
  - 优化 可靠性/Reliability/Error Rate
- 复杂场景 - 多维度目标优化策略
  - 价格
  - 性能
  - 可靠性
