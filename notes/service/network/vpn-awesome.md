---
title: VPN Awesome
tags:
  - Awesome
---

# VPN Awesome

- 组网场景
  - 基础设施组网 - 例如 Kubernetes 混合云
    - tinc, n2n, ipsec
  - 用户组网 - 例如 公司员工接入
    - nebula, wireguard, innernet, ipsec
  - 服务组网 - 例如 游戏，VoIP
    - n2n, tinc
- Mesh 网络模式
  - L3 - TCP/IP - tun,utun 设备
    - Mesh 有 IPAM 功能或预先手动分配好 IP
    - 不支持 DHCP 等 L2 层协议
    - 偏向用户层
  - L2 - Ethernet - tap 设备
    - 功能更加通用，但一般移动设备接入不支持作为 Mesh 节点
    - 偏向基础设施层
    - 支持作为桥接、支持更灵活的组网
    - 目前 macOS 无法支持 tap 设备

## VPN/私有网络

:::tip

- VPN/私有网络 指整个网络纬度, 区分 L2, L3

:::

**功能**

| vs.         | License | protocol  | TUN/TAP | relay | P2P | mesh | NAT | policy |
| ----------- | ------- | --------- | ------- | ----- | --- | ---- | --- | ------ |
| [tinc]      | GPLv2   | UDP/TCP   | ✅/✅   | ✅    | ✅  | ✅   | ✅  | ❌     |
| [n2n]       | GPLv3   | UDP       | ❌/✅   | ✅    | ✅  | ✅   | ✅  | ❌     |
| [nebula]    | MIT     | UDP/Noise | ✅/❌   | ❌    | ✅  | ✅   | ✅  | ✅     |
| [zerotier]  | BSL     | UDP       | ❌/✅   | ✅    | ✅  | ✅   | ✅  | ✅     |
| [wireguard] | GPL     | UDP/Noise | ✅/❌   | ❌    | ❌  | ❌   | ❌  | ❌     |

**平台**

| vs.         | android/ios | windows/macos/linux |
| ----------- | ----------- | ------------------- |
| [wireguard] | ✅/✅       | ✅/✅/✅            |
| [zerotier]  | 🔴/🔴       | ✅/✅/✅            |
| [nebula]    | ✅/✅       | ✅/✅/✅            |
| [tinc]      | 🟠/🟠       | ✅/🟡/✅            |
| [n2n]       | ✅/🟡       | ✅/🟡/✅            |

| legend | for          |
| ------ | ------------ |
| ✅     | Yes          |
| ❌     | No           |
| 🟡     | Partial      |
| 🟠     | Maybe        |
| 🔴     | Close source |

[n2n]: ./n2n.md
[tinc]: ./tinc/README.md
[nebula]: ./nebula.md
[zerotier]: ./zerotier.md
[wireguard]: ./wireguard.md

- [tinc]
  - [gsliepen/tinc](https://github.com/gsliepen/tinc)
- [n2n]
  - android [switch-iot/hin2n](https://github.com/switch-iot/hin2n)
  - ios [Oliver0624/hin2n-ios](https://github.com/Oliver0624/hin2n-ios)
- [slackhq/nebula](https://github.com/slackhq/nebula)
  - MIT, Go
  - 基于 Noise 协议， WG 底层协议
- [zerotier/ZeroTierOne](https://github.com/zerotier/ZeroTierOne)
  - BSL, C++
  - 默认基于官方 controller, 可以 selfhost 但还是会用到官方的节点进行传播
  - 连接稳定性一般, 使用 官方 controller 免费最多 100 节点
  - relay over moon
- [dswd/vpncloud](https://github.com/dswd/vpncloud)
  - P2P VPN
  - [vs. Tinc, Nebula, OpenVPN, WG](https://vpncloud.ddswd.de/features/comparison)
- [hwdsl2/setup-ipsec-vpn](https://github.com/hwdsl2/setup-ipsec-vpn)
- [How adsl Works](https://kitz.co.uk/adsl/equip.htm)
- [proxysu/ProxySU](https://github.com/proxysu/ProxySU)
- [anderspitman/awesome-tunneling](https://github.com/anderspitman/awesome-tunneling)
- userspace
- [TunSafe/TunSafe](https://github.com/TunSafe/TunSafe)
- [cjdelisle/cjdns](https://github.com/cjdelisle/cjdns)
  - GPLv3, C+Python
  - encrypted IPv6 network using public-key cryptography for address allocation and a distributed hash table for routing
  - 提供 Zero-Configuration Networking
- windows
  - tap-windows
  - wintun
- [yggdrasil-network/yggdrasil-go](https://github.com/yggdrasil-network/yggdrasil-go)
  - routing as an encrypted IPv6 overlay network
- [pojntfx/weron](https://github.com/pojntfx/weron)
  - AGPL-3.0, Golang
  - P2P VPN over WebRTC

## WireGuard

:::tip

- 值得关注 Wiretrustee
- 目前只有 Tailscale 的 移动端支持 Mesh

:::

- Vanilla [WireGuard](https://github.com/WireGuard)
  - [wireguard-apple](https://github.com/WireGuard/wireguard-apple)
  - [wireguard-android](https://github.com/WireGuard/wireguard-android)
  - [wireguard-windows](https://github.com/WireGuard/wireguard-windows)
  - [wireguard-linux](https://github.com/WireGuard/wireguard-linux)
  - [wireguard-go](https://github.com/WireGuard/wireguard-go)
  - [WireGuard/wgctrl-go](https://github.com/WireGuard/wgctrl-go)
- [tonarino/innernet](https://github.com/tonarino/innernet)
  - MIT, Rust
- [Place1/wg-access-server](https://github.com/Place1/wg-access-server)
  - MIT, Go
  - WireGuard VPN solution + Web UI
  - [HN](https://news.ycombinator.com/item?id=28719488)
- [subspacecommunity/subspace](https://github.com/subspacecommunity/subspace)
  - WireGuard VPN server GUI
- [firezone/firezone](https://github.com/firezone/firezone)
  - Apache-2.0, Elixir+Ruby
  - WebUI
  - nftables
  - 兼容官方 WireGuard
- [weejewel/wg-easy](https://github.com/weejewel/wg-easy)
  - JS
  - WireGuard VPN + Web-based Admin UI
- [aramperes/onetun](https://github.com/aramperes/onetun)
  - MIT, Rust
  - Access your WireGuard network from anywhere
- [freifunkMUC/wg-access-server](https://github.com/freifunkMUC/wg-access-server)
  - MIT, Go
  - WebUI

### WireGuard Mesh

- [wiretrustee/wiretrustee](https://github.com/wiretrustee/wiretrustee)
  Wireguard+Mesh
  - BSD-3, Go
  - WebRTC, STUN, TURN
- [gravitl/netmaker](https://github.com/gravitl/netmaker)
  - SSPL
- [tailscale/tailscale](https://github.com/tailscale/tailscale)
  WireGuard+2FA
  - BSD-3
  - 依赖 官方 coordinate 服务
- [juanfont/headscale](https://github.com/juanfont/headscale)
  - self-hosted Tailscale controller server
  - tailscale 目前移动端不支持修改 controller
- [HarvsG/WireGuardMeshes](https://github.com/HarvsG/WireGuardMeshes)
  Compare WireGuard Mesh Tools


## Tunnel/通道

> Tunnel/通道 指连接、端口纬度, 区分协议协议类型

- [rtctunnel/rtctunnel](https://github.com/rtctunnel/rtctunnel)
  tunnels over WebRTC
  - MIT, Go
- [fatedier/frp](https://github.com/fatedier/frp)
  - Apache-2.0, Go
- [rapiz1/rathole](https://github.com/rapiz1/rathole)
  - Apache-2.0, Rust
- [stunnel](https://www.stunnel.org/)
- [ehang-io/nps](https://github.com/ehang-io/nps)
  - GPL-3, Go
  - 转向闭源收费, 开源开发停滞
- slirp

### Tunnel Library

- [jpillora/chisel](https://github.com/jpillora/chisel)
- [rancher/remotedialer](https://github.com/rancher/remotedialer)
- inlets

## 流控/防火墙

- OpenClash
- Passwall
- Surge
- adg+passw+smart

## Clash

- [Dreamacro/clash](https://github.com/Dreamacro/clash)
- Client
  - [vernesong/OpenClash](https://github.com/vernesong/OpenClash)
    - OpenWRT Client
  - [Fndroid/clash_for_windows_pkg](https://github.com/Fndroid/clash_for_windows_pkg)
  - [ClashDotNetframework](https://github.com/ClashDotNetframework/ClashDotNetframework)
    - DotNet, Windows
  - [yichengchen/clashX](https://github.com/yichengchen/clashX)
    - macOS
    - [WhoJave/clashX](https://github.com/WhoJave/clashX/tree/master)
  - [Kr328/ClashForAndroid](https://github.com/Kr328/ClashForAndroid)
  - [WhoJave/ClashA](https://github.com/WhoJave/ClashA)
  - [ccg2018/ClashA](https://github.com/ccg2018/ClashA)
  - iOS
    - https://apps.apple.com/app/choc/id1582542227
      - 收费，不一定可用
  - [SpongeNobody/Clashy](https://github.com/SpongeNobody/Clashy)
- [链接转换](https://sites.google.com/view/honven/%E9%A6%96%E9%A1%B5/%E6%9C%BA%E5%9C%BA%E9%93%BE%E6%8E%A5%E8%BD%AC%E6%8D%A2)
- [Dreamacro/clash-tracing](https://github.com/Dreamacro/clash-tracing)
