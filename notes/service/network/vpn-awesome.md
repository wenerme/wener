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
    - nebula, tailscale, innernet, ipsec
  - 服务组网 - 例如 游戏，VoIP
    - n2n, tinc
- slirp
- stunnel

## VPN/私有网络

> VPN/私有网络 指整个网络纬度, 区分 L2, L3

- [gsliepen/tinc](https://github.com/gsliepen/tinc)
- [slackhq/nebula](https://github.com/slackhq/nebula)
  - MIT, Go
  - 基于 Noise 协议， WG 底层协议
- [zerotier/ZeroTierOne](https://github.com/zerotier/ZeroTierOne)
  - BSL, C++
  - 默认基于官方 controller, 可以 selfhost 但还是会用到官方的节点进行传播
  - 连接稳定性一般, 使用 官方 controller 免费最多 100 节点
- [dswd/vpncloud](https://github.com/dswd/vpncloud)
- [hwdsl2/setup-ipsec-vpn](https://github.com/hwdsl2/setup-ipsec-vpn)
- [How adsl Works](https://kitz.co.uk/adsl/equip.htm)

## 基于 WireGuard

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
  - self-hosted Tailscale control server
- [tonarino/innernet](https://github.com/tonarino/innernet)
  - MIT, Rust
- [Place1/wg-access-server](https://github.com/Place1/wg-access-server)
  - MIT, Go
  - WireGuard VPN solution + Web UI
  - [HN](https://news.ycombinator.com/item?id=28719488)
- [subspacecommunity/subspace](https://github.com/subspacecommunity/subspace)
  - WireGuard VPN server GUI
- [firezone/firezone](https://github.com/firezone/firezone)
  - VPN server and firewall
- [weejewel/wg-easy](https://github.com/weejewel/wg-easy)
  - WireGuard VPN + Web-based Admin UI
- [aramperes/onetun](https://github.com/aramperes/onetun)

## Tunnel/通道

> Tunnel/通道 指连接、端口纬度, 区分协议协议类型

- [rtctunnel/rtctunnel](https://github.com/rtctunnel/rtctunnel)
  tunnels over WebRTC
  - MIT, Go
- [fatedier/frp](https://github.com/fatedier/frp)
  - Apache-2.0, Go
- [stunnel](https://www.stunnel.org/)
- [ehang-io/nps](https://github.com/ehang-io/nps)
  - GPL-3, Go
  - 转向闭源收费, 开源开发停滞
