---
title: 网络常见问题
tags:
  - FAQ
---

# 网络常见问题

## VTI vs XFRM

> XFRM 比 VTI 更好

- VTI - Linux 3.6+
  - L3 通道，指定终端地址
  - 单地址族
  - 只支持通道模式
- XFRM - Linux 4.19+

  - 不需要配置通道地址
    - 避免 VTI SAs:interface 的 1:1 关系
    - SAs peers 共享 interface
  - 同时支持 IPv4 IPv6
  - 支持包括通道的其他模式
  - XFRM interface ID 配置
    - 避免 GRP key 和 XFRM mark 配置

- 参考
  - [RouteBasedVPN](https://wiki.strongswan.org/projects/strongswan/wiki/RouteBasedVPN)

## VPN vs Mesh Network

- VPN
  - 通常指传统 VPN - 例如 OpenVPN, IPSec
  - 所有 Endpoint 连上一个 Server, 网络通过指定的节点出
  - 多为 Client, Server 模式
  - 多面消费端 - Consumer
- Mesh Network
  - 用于组建私有网络的技术 - VPN
  - 点对点直连
  - 多为平等节点关系 - Server to Server
  - 多用于基础网络建设

## bridge vs macvlan

- bridge
  - 完整功能
  - 会学习 Mac 地址
  - 会内部转发匹配 Mac 的包
- macvlan
  - 可理解为简单的 bridge
  - 不会学习 Mac 地址，不会内部转发 - 因此稍微会快一点，内存少一点
- [Bridge vs Macvlan](https://hicu.be/bridge-vs-macvlan)

## DROP vs REJECT

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

## mangle vs nat

- 两者都是操作、修改包
- mangle 先于 nat
- mangle
  - 服务类型
  - TTL
  - Mark
  - POSTROUTING 在路由决策之前，因此 mark 标记进入不同的路由表比较重要
- nat
  - 地址转换

## MASQUERADE vs SNAT

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

## Nginx/HAProxy 端口转发 vs IPTables 端口转发

- IPTables
  - 性能最好
  - 不中断
- Nginx/HAProxy
  - 应用层功能更强

## ifconfig eth0:0 语法

- 是 ifconfig 支持多 ip 的写法，等同于 iproute2 的 `ip addr add`
- 后面的名字是地址的标签, linux 2.0 网络别名, 以设备名字+`:`为开头, 最长 15
- ip addr add 没有标签 ifconfig 则不会显示

```bash
ifconfig eth0:0 192.168.1.2 netmask 255.255.255.0
# 对等语法
ip addr add 192.168.1.2/24 dev eth0 label eth0:0
```

- 参考
  - [ip-address.8](http://manpages.ubuntu.com/manpages/hirsute/en/man8/ip-address.8.html)

## ping: sendto: Invalid argument

## ping Destination Host Unreachable
