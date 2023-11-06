---
tags:
  - Awesome
---

# WireGuard Awesome

:::tip

- 值得关注 Wiretrustee
- 目前只有 Tailscale 的 移动端支持 Mesh

:::

- Vanilla [WireGuard](https://github.com/WireGuard)
  - [wireguard-go](https://github.com/WireGuard/wireguard-go)
    - MIT, Golang
    - Go 实现 wg
  - [wireguard-apple](https://github.com/WireGuard/wireguard-apple)
    - MIT, Golang+Swift
  - [wireguard-android](https://github.com/WireGuard/wireguard-android)
  - [wireguard-windows](https://github.com/WireGuard/wireguard-windows)
    - MIT, Golang, C
    - Windows 实现，基于 wireguard-nt
  - [wireguard-nt](https://github.com/WireGuard/wireguard-nt)
    - GPLv2, C
    - Windows 内核实现
    - NT Kernel
    - 预构建 binary License 更松
    - https://download.wireguard.com/wireguard-nt/
  - [wireguard-linux](https://github.com/WireGuard/wireguard-linux)
    - Linux kernel
  - [wgctrl-go](https://github.com/WireGuard/wgctrl-go)
  - [wintun](https://github.com/WireGuard/wintun)
    - Windows 下 tun 设备
- [cloudflare/boringtun](https://github.com/cloudflare/boringtun)
  - BSD-3, Rust
  - Userspace WireGuard® Implementation in Rust
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
- [database64128/swgp-go](https://github.com/database64128/swgp-go)
  - Simple WireGuard proxy with minimal overhead for WireGuard traffic

### WireGuard Userspace

:::tip

- 可以将 Wireguard 作为一般 Proxy 使用
- 大多 VPN 服务商都提供 Wireguard 接入

:::

- Clash.Meta
- https://gost.run/blog/2022/tun/

### WireGuard Mesh

- [wiretrustee/wiretrustee](https://github.com/netbirdio/netbird)
  Wireguard+Mesh
  - BSD-3, Go
  - WebRTC, STUN, TURN
- [gravitl/netmaker](https://github.com/gravitl/netmaker)
  - SSPL, Golang
  - Mesh
    - 没有也不考虑支持移动端
  - Admin UI, Private DNS, OAuth, ACL
- [tailscale/tailscale](https://github.com/tailscale/tailscale)
  WireGuard+2FA
  - BSD-3
  - 依赖 官方 coordinate 服务
- [juanfont/headscale](https://github.com/juanfont/headscale)
  - self-hosted Tailscale controller server
  - tailscale 目前移动端不支持修改 controller
- [HarvsG/WireGuardMeshes](https://github.com/HarvsG/WireGuardMeshes)
  Compare WireGuard Mesh Tools
