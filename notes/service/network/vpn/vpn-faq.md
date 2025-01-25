---
title: 私有虚拟网络常见问题
keywords:
  - VPN FAQ
  - VPN 常见问题
tags:
  - FAQ
---

# 私有虚拟网络常见问题

:::caution

- macOS 目前 tuntap 安装相对麻烦
- macOS 原生支持 utun - 等同于 tun 设备

:::

## Proxy vs VPN

- Proxy - tunnel
  - 通道、端口维度
- VPN - overlay
  - 网络维度 - 有 IP

## Why Tinc

**Why Tinc**

1. 去中心化
1. 全 Mesh 网络
1. 支持 L2 和 L3 模式
1. 支持 Relay
1. 支持 VIP - 多个节点相同 IP
1. 不依赖外部服务 - self contained

:::tip

- 适用于基础设施

:::

**Why Not Tinc**

1. 无中心化认证
   - 可以从任意一个节点加入 - 一个节点被入侵可导致别的节点加入网络
   - 移除节点需要整个网络调整
1. 一次只能组成一个网络
   - 不能提供类似 SaaS 能力
   - 每个网络需要独立 tinc 进程
1. 没有内置 IPAM
   - L2 可以使用 dhcpd
   - L3 只能自己自己分配
1. 单线程

## Tinc vs ZeroTier vs Wireguard vs IPSec vs SoftEther

- 共同点
  - P2P 协议
  - 支持加密
- Tinc 完全中心化，无控制器，网络连接性会更好，tinc 1.1pre 使用非常简单
  - 开源的 Android 和 iOS 应用，但未维护了
  - 支持 UDP
  - 支持 Switch 模式 - 2 层网络 - MAC 寻址
  - 默认 Router 模式 - TCP/IP 寻址
  - 单线程 - 性能有一定瓶颈 - 例如 1Gb 网卡可能只能跑满 300-600 Mb
  - 用户空间
  - 安装使用配置方便 - 1.1 版本
  - 实现简单 LOC ~ 3k
- ZeroTier 有中心控制器，能够进行验证授权，使用简单，有管理接口和页面
  - 闭源 Android 和 iOS 应用 - 可在应用商店安装
  - 对于 SelfHost 中心节点不友好 - 简单配置是基于使用 ZeroTier 的服务之上
  - QoS 控制
  - 基于 TCP
  - 支持文本配置路由
  - 网络连接性 < TINC、配置性 > TINC
- Wireguard
  - 目前没有比较好的 mesh 方案 - 需要所有节点配置
  - 节点不能自动发现
  - 需要节点之间直连 - 不能通过中继访问
  - 只支持 Layer 3 - 不能 DHCP 或桥接 - 使用 IP 寻址
  - 使用 UDP 通信
  - 替代 OpenVPN 和 IPsec
  - 实现简单 LOC ~ 4k
  - 开源可用的 Android 和 iOS 应用
  - 客户端支持广泛
  - Linux 内核支持
- IPSec
  - 开源成熟的标准
  - 客户端使用相对没那么友好
  - 服务端初次配置相对复杂
  - 高性能 - 如果只在服务端使用需要很高的性能则优先选择 IPSec - 1Gb 网络基本能达到 900+Mb
  - Android 和 iOS 原生支持
- [SoftEther](https://en.wikipedia.org/wiki/SoftEther_VPN)
  - 支持多路负载
  - 权限控制

**性能对比**

| iperf3\10s | Transfer    | Bitrate       |
| ---------- | ----------- | ------------- |
| Native     | 1.10 GBytes | 943 Mbits/sec |
| TINC       | 385 MBytes  | 323 Mbits/sec |
| WireGuard  | 1.05 GBytes | 898 Mbits/sec |

> TINC 最弱 - 因为服务器单核较弱 - 单核 CPU 100%
> Intel(R) Xeon(R) CPU E5-2651 v2 @ 1.80GHz

## Tinc vs ZeroTier

- 相同点
  - 都是 Mesh 网络
- Tinc
  - 无中心节点，但有核心 meta 节点
    - 保证链接，不负责 IP 分配 - 可利用 DHCP 控制
    - host 支持配置 subnet - 路由
    - 无法控制权限，可通过 meta 控制节点密钥来控制接入
  - 需要 meta 节点能被其他节点直接访问
    - 基本等同于需要公网 IP
  - 连接性好
    - 因为是直接配置 meta 地址，所以很容易判断
  - 问题易于排查，透明 IP
  - 稳定性问题
    - 1.17 出现 crash 问题 - 通过 openrc 设置自动重启解决
- ZeroTier
  - 依赖 ZT 控制器 - 可自行维护，但发现依赖 ZT 网络
    - IP 分配
    - 路由下发
    - 权限控制
  - 连接性弱
    - 依赖 ZT 启动慢 - 特别在国内
    - 可能无法请求到配置
    - 无法直接提供中转发现节点
    - Nat 穿透性弱于 Tinc
  - 问题难排查
    - 每个节点有唯一 ID
    - 每个网络有唯一 ID
    - 信息不透明
  - 稳定性问题
    - 偶现 daemon 异常 cpu 100% - 一段时间后恢复或重启 ZeroTier One
    - 出现节点一直处于 REQUESTING_CONFIGURATION 状态
      - **目前无解**

## Tinc vs Nebula

- 相同点
  - 点对点网络
- Tinc
  - GPL 2.0
  - 多用于服务端组网 - 没有 Android 和 iOS
  - 节点基于密钥认证 - 对等
  - L2、L3 组网
  - 通过 meta 节点 - 对外暴露节点组网
  - 支持节点 relay
- Nebula - 受 tinc 启发
  - MIT
  - 多用于服务访问 - 有 Android 和 iOS
  - 通过 lighthouse PKI 认证 组网
  - 非 lighthouse 节点只有 key 和 cert 没有 ca
  - lighthouse 类似 tinc 的 meta 节点
  - L3 组网
  - 不支持 relay
  - 网络安全性管控 - 默认不允许访问非节点网 - unsafe_routes
    - tinc 可配置任意, L2 可路由任意
  - lighthouse 中心化管控

## Tinc vs N2N

- 相同点
  - 支持 L2 Mesh
  - 依赖 tuntap
  - 单线程
- n2n - since 2008
  - 节点分为 supernode 和 edge
  - 中心化 supernode signal - 支持中继
  - 一个 supernode 支持多个网络
  - 大多时候需要自己编译 - 官方提供部分下载
  - 固定 MTU - 支持开启 PMTU
  - 只支持 L2 网络 - TAP
  - 内建流量控制 - ACL
  - 支持自动分配 IP
  - 应用可以控制包转发
  - 使用比 tinc 更加友好简单 - 体验类似 zerotier
- tinc - since 1998
  - 完全去中心化 - 节点关系相同
  - 所有节点都连接的节点的称为 metanode - 和普通节点相同 - 支持中继
  - 一个网络需要一个 metanode
  - 大多平台都可以直接安装
  - 动态自适应 MTU - MSS clamping- PMTU
  - 支持 L2 和 L3 网络 - TAP/TUN

:::caution

- tinc 和 n2n 同时运行可能导致 n2n 实际走的 tinc 网络

:::

## StrongSwan vs Openswan vs Libreswan vs Freeswan

- FreeS/WAN
- Libreswan 即 Openswan
  - 2003 fork freeswan 命名为 openswan
  - 2011 被强制要求更名 - 命名为 libreswan
  - 支持更多[硬件加密](https://libreswan.org/wiki/OCF_Hardware_crypto_acceleration) - 可能需要内核补丁
- StrongSwan
  - 相较 Libreswan 做了更多的提升和文档
  - 支持 EAP - 更易于集成
  - 支持[集群](https://wiki.strongswan.org/projects/strongswan/wiki/HighAvailability)
  - **不支持** [OE](https://wiki.strongswan.org/issues/2160)

> _参考_
>
> 1. [Libreswan History](https://libreswan.org/wiki/History)
> 2. [strongswan vs openswan](https://serverfault.com/a/655752/190601)

## Site to Site/站点对站点 VPN

- 连接两个子网
- 连接地域上分离的两个网络
- 例如
  - 开发人员 -VPN-> Site to Site VPN --> 阿里云内网

## L2TP vs IPSec vs L2TP/IPSec

- L2TP - Layer 2 Tunneling Protocol - 2 层通道协议
  - 工作在 2 层
  - 没有认证和加密
- IPSec
  - 工作在 3 层 - IP 层
  - 提供认证和加密
- L2TP over IPSec
  - IPSec 提供认证和加密通道
  - L2TP 提供网络

## IPsec/L2TP vs IPSec/Xauth vs IPsec/L2TP

- IPsec/L2TP
  - 使用 L2TP 协议进行隧道封装
  - 提供二层隧道，适用于需要二层连接的场景
  - 通过 IPsec 提供认证和加密
  - 常用于 VPN 连接，支持广泛的客户端

- IPSec/Xauth
  - 使用 Xauth 进行用户认证
  - 提供三层隧道，适用于需要三层连接的场景
  - 通过 IPsec 提供认证和加密
  - 常用于远程访问 VPN，支持多种客户端

- IPsec/L2TP
  - 结合了 L2TP 和 IPsec 的优点
  - 提供二层隧道，适用于需要二层连接的场景
  - 通过 IPsec 提供认证和加密
  - 常用于 VPN 连接，支持广泛的客户端

> _参考_
>
> 1. [IPsec/L2TP](https://en.wikipedia.org/wiki/IPsec)
> 2. [IPSec/Xauth](https://en.wikipedia.org/wiki/Internet_Key_Exchange)
