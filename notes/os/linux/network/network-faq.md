---
title: 网络常见问题
---

# VPN vs Mesh Network
* VPN
  * 通常指传统 VPN - 例如 OpenVPN, IPSec
  * 所有 Endpoint 连上一个 Server, 网络通过指定的节点出
  * 多为 Client, Server 模式
  * 多面消费端 - Consumer
* Mesh Network
  * 用于组建私有网络的技术 - VPN
  * 点对点直连
  * 多为平等节点关系 - Server to Server
  * 多用于基础网络建设

# bridge vs macvlan

- bridge
  - 完整功能
  - 会学习 Mac 地址
  - 会内部转发匹配 Mac 的包
- macvlan
  - 可理解为简单的 bridge
  - 不会学习 Mac 地址，不会内部转发 - 因此稍微会快一点，内存少一点
- [Bridge vs Macvlan](https://hicu.be/bridge-vs-macvlan)

# DROP vs REJECT

:::tip

建议使用 REJECT

:::

- DROP - 不处理直接丢包
  - TCP 会超时
    - TCP 会发起多次，因为 TCP 本身协议可靠会重复发包
  - UDP 认为服务端已经接收
  - 针对恶意攻击会耗费更多客户端资源
    - 但专业的工具一般不受影响
- REJECT 返回失败 - 客户端接收到无法到达
  - 通过 ICMP 返回
  - 可以包含原因
  - 对于恶意攻击可嗅探则会立即返回增加检测速度
  - 用户体验会更好

# mangle vs nat

- 两者都是操作、修改包
- mangle 先于 nat
- mangle
  - 服务类型
  - TTL
  - Mark
  - POSTROUTING 在路由决策之前，因此 mark 标记进入不同的路由表比较重要
- nat
  - 地址转换

# MASQUERADE vs SNAT

> 两者都做 来源地址转换 - Source NAT

- SNAT
  - 固定目标 IP - `--to-source`
- MASQUERADE
  - 动态地址
  - 比 SNAT 慢 - 每个包都需要检测应该使用的地址

```bash
iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE
iptables -t nat -A POSTROUTING -o eth0 -j SNAT --to-source 192.168.8.2
```
