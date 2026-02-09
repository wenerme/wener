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

- EWMA - Exponentially Weighted Moving Average - 指数加权移动平均
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

## Samples

| 窗口 | RPM 阈值 | 窗口内请求数 | 说明               |
| ---- | -------- | ------------ | ------------------ |
| 1m   | ≥300     | ≥300         | 数据充足，快速响应 |
| 3m   | ≥100     | ≥300         | 数据充足           |
| 5m   | ≥30      | ≥150         | 基本够用           |
| 10m  | <30      | <300         | 低频，需要更长窗口 |

核心原则: 保证窗口内至少有 ~150-300 个请求，确保统计显著性。

150 个样本：在 95% 置信水平下，能够保证相对误差控制在约 8% 以内。这对于一般的负载均衡（发现明显的节点变慢）已经足够。
300 个样本：可以将相对误差降至约 5%。如果你需要非常精准的 P99 抖动识别，300 是一个更稳妥的底线。

抽样误差（Margin of Error）

$$
SE = \frac{s}{\sqrt{n}}
$$

$$
RSE = \frac{SE}{\bar{x}} = \frac{s}{\bar{x}\sqrt{n}} = \frac{CV}{\sqrt{n}}
$$

$CV$ (Coefficient of Variation) 是变异系数（标准差/均值）。

在生产环境的 AI 推理（MaaS）中，RT（响应时间）的 $CV$ 通常在 0.8 到 1.2 之间（因为长尾分布的存在，抖动较大）。

假设我们取一个典型的变异系数 $CV = 0.9$：
当 $n = 100$ 时：$RSE = 0.9 / \sqrt{100} = 0.09 = 9\%$
当 $n = 300$ 时：$RSE = 0.9 / \sqrt{300} \approx 0.9 / 17.32 \approx 0.0519 = \mathbf{5.19\%}$

P99（长尾延迟）
更特殊

| 样本数 (n) | 相对误差 (RSE) | 适用场景                                |
| :--------- | :------------- | :-------------------------------------- |
| 50         | ~13%           | 粗略监控，仅判断实例是否存活（Up/Down） |
| 150        | ~7.5%          | 普通负载均衡（WRR/LeastConns）调整权重  |
| 300        | ~5%            | 自适应调度、P99 阈值告警、自动熔断      |
| 1000+      | < 3%           | 高精度 A/B Test 性能对比                |

概率论与数理统计（Probability and Statistics）
质量控制（Quality Control）
可靠性工程与 SRE (Site Reliability Engineering)

$$
CV = \frac{\sigma}{\mu}
$$

- $\sigma$ (Sigma)：标准差（Standard Deviation），代表数据的离散程度（绝对波动）。
- $\mu$ (Mu)：算术平均值（Mean），代表数据的基准水平。

如果 $CV > 1$，通常意味着数据分布非常不均匀（存在严重的“长尾”或“重尾”现象）。

调度策略：

- 当 $CV < 1$：说明请求比较均匀，你的调度器可以大胆使用平均值预测。
- 当 $CV > 1$：说明系统有严重的抖动（Burst），此时仅靠均值会失灵，必须看 P99 或增加样本量来减小统计误差。

sigma 是波动的 “绝对值”
CV 是波动的 “相对比例”

- CV<1 低离散
- CV=1 指数分布
- CV>1 高离散/长尾
  - 均值失去意义
  - 参考 P99 或 中位数

Welford

```go
type Stat struct {
    n    float64
    mean float64
    m2   float64
}

func (s *Stat) Update(x float64) {
    s.n++
    delta := x - s.mean
    s.mean += delta / s.n
    delta2 := x - s.mean
    s.m2 += delta * delta2
}

func (s *Stat) Sigma() float64 {
    if s.n < 2 { return 0 }
    return math.Sqrt(s.m2 / (s.n - 1)) // 样本标准差
}

func (s *Stat) CV() float64 {
    m := s.mean
    if m == 0 { return 0 }
    return s.Sigma() / m
}
```

通过实时计算请求分布的变异系数 (CV)，在保证 95% 置信度（基于 ~300 个样本窗口） 的前提下，动态调整采样和分发策略。这能确保在模型出现长尾延迟时，调度器能比传统算法快 3-5 倍做出切流决策。


- https://github.com/hashicorp/go-metrics
- https://github.com/CrowdStrike/go-metrics-sliding-window
- https://github.com/axiomhq/variance∑
z
