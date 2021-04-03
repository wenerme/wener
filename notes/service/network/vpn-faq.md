---
id: vpn-faq
title: 私有虚拟网络常见问题
keywords:
- VPN FAQ
- VPN 常见问题
---


# 私有虚拟网络常见问题

## SOCKS vs HTTP vs HTTPS

- HTTP
  - 支持最广泛的协议
  - 基于 HTTP 的 CONNECT 方法 - 7 层协议
  - wget 只支持 http
  - 一般支持 Basic 鉴权
  - 请求是明文感知更多细节
  - 支持复杂转发逻辑 - privoxy
    - 路径, 域名, 头
    - 更加智能的转发
  - 可以配合缓存服务使用
    - 例如 squid - 需结合 tls 使用
  - 可以做 TCP 通道
- SOCKS
  - 支持程度仅次于 HTTP
  - TCP 协议 - 5 层协议
  - 支持 UDP
  - 最容易的协议 - `ssh -d 1080`
  - 基于握手进行协商，一个地址一个端口进行映射
  - DNS 在远程进行解析
- HTTPS
  - 使用少
  - HTTP + TLS

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
      - __目前无解__

## Tinc vs Nebula
* 相同点
  * 点对点网络
* Tinc
  * GPL 2.0
  * 多用于服务端组网 - 没有 Android 和 iOS
  * 节点基于密钥认证 - 对等
  * L2、L3 组网
  * 通过 meta 节点 - 对外暴露节点组网
  * 支持节点 relay
* Nebula - 受 tinc 启发
  * MIT
  * 多用于服务访问 - 有 Android 和 iOS
  * 通过 lighthouse PKI 认证 组网
  * 非 lighthouse 节点只有 key 和 cert 没有 ca
  * lighthouse 类似 tinc 的 meta 节点
  * L3 组网
  * 不支持 relay
  * 网络安全性管控 - 默认不允许访问非节点网 - unsafe_routes
    * tinc 可配置任意, L2 可路由任意
  * lighthouse 中心化管控

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
* L2TP - Layer 2 Tunneling Protocol - 2层通道协议
  * 工作在 2 层
  * 没有认证和加密
* IPSec
  * 工作在 3 层 - IP 层
  * 提供认证和加密
* L2TP over IPSec
  * IPSec 提供认证和加密通道
  * L2TP 提供网络
  * IP 包之上添加 L2TP 包头

