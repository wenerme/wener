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
- [Wireguard Awesome](./wireguard/wireguard-awesome.md)
- [Proxy Awesome](../proxy/proxy-awesome.md)

| Protocol         | Port                        | Usage                      |
| ---------------- | --------------------------- | -------------------------- |
| PPTP             | 47/GRE, 1723/TCP            | PPTP data path             |
| L2TP/IKEv2 (ESP) | 50                          | IPSec data path            |
| OpenVPN          | 443/TCP, 1194/UDP           | OpenVPN connections        |
| SSTP/SSL (TCP)   | 443                         | SSTP control and data path |
| L2TP             | 500/UDP, 1701/TCP, 4500/UDP | L2TP (IPSec control path)  |
| IKEv2 (UDP)      | 500, 4500                   | IKEv2 (IPSec control path) |
| WireGuard (UDP)  | 51820                       | Incoming connections       |

- https://www.ivpn.net/knowledgebase/troubleshooting/how-do-i-change-the-port-or-protocol-used-to-connect/

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
[wireguard]: ./wireguard/README.md

- [tinc]
  - [gsliepen/tinc](https://github.com/gsliepen/tinc)
- [n2n]
  - android [switch-iot/hin2n](https://github.com/switch-iot/hin2n)
  - ios [Oliver0624/hin2n-ios](https://github.com/Oliver0624/hin2n-ios)
- [nebula](./nebula.md)
  - MIT, Go
  - 基于 Noise 协议， WG 底层协议
- [zerotier](./zerotier.md)
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
- [qdm12/gluetun](https://github.com/qdm12/gluetun)
  - MIT, Go
  - VPN to HTTP/Socks Proxy
  - VPN client in a thin Docker container for multiple VPN providers, written in Go, and using OpenVPN or Wireguard, DNS over TLS, with a few proxy servers built-in.
  - 支持 AirVPN, Cyberghost, ExpressVPN, FastestVPN, Giganews, HideMyAss, IPVanish, IVPN, Mullvad, NordVPN, Perfect Privacy, Privado, Private Internet Access, PrivateVPN, ProtonVPN, PureVPN, SlickVPN, Surfshark, TorGuard, VPNSecure.me, VPNUnlimited, Vyprvpn, WeVPN, Windscribe
  - 支持 OpenVPN
  - 支持 Wireguard

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
- [ghostunnel/ghostunnel](https://github.com/ghostunnel/ghostunnel)
  - Apache-2.0, Go
  - SSL/TLS proxy with mTLS for securing non-TLS backend applications.
- [ptunnel](https://www.cs.uit.no/~daniels/PingTunnel/)
  - tunnel over icmp

### Tunnel Library

- [jpillora/chisel](https://github.com/jpillora/chisel)
- [rancher/remotedialer](https://github.com/rancher/remotedialer)
- inlets

## 流控/防火墙

- OpenClash
- Passwall
- Surge
- adg+passw+smart

## Provider

- nordvpn
  - wirdguard
  - openvpn
- expressvpn
  - openvpn
- Surfshark
- socks5
  - ProxyEmpire
  - BeeProxy
