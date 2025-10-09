---
tags:
  - Awesome
---

# Network Awesome

- [VPN Awesome](./vpn/vpn-awesome.md)
- [Proxy Awesome](./proxy/proxy-awesome.md)
- [cjdelisle/cjdns](https://github.com/cjdelisle/cjdns)
  - GPLv3, C+Python
  - encrypted IPv6 network using public-key cryptography for address allocation and a distributed hash table for routing
  - 提供 Zero-Configuration Networking
- [openziti/ziti](https://github.com/openziti/ziti)
  - Apache-2.0, Go
  - zero trust, application embedded, programmable network
- Proxy/Multiplexer
  - [yrutschle/sslh](https://github.com/yrutschle/sslh)
    - GPLv2, C
    - Applicative Protocol Multiplexer
    - protocol demultiplexer
    - 支持探测 HTTP, TLS/SSL (SNI, ALPN), SSH, OpenVPN, tinc, XMPP, SOCKS5
  - [mholt/caddy-l4](https://github.com/mholt/caddy-l4)
    - Caddy L4 模块
    - 支持探测 RDP, OpenVPN, Postgres, ProxyProtocol, QUIC, Socks, SSH, TLS, Winbox, Wireguard, XMPP
- TCP over ICMP
  - https://github.com/esrrhs/pingtunnel/tree/delete
- VIP
  - Keepalived
  - UCARP
  - Hardware Load-balancer
- LoadBalancing
  - HAProxy
  - Nginx
  - Hardware Load-balancer
- [Overlay](https://en.wikipedia.org/wiki/Overlay_network)
- [Tinc](./vpn/tinc/README.md)
- [zeritier](./vpn/zerotier.md)
- https://github.com/quiet
  - TCP over Sound
- DHCP
  - [coredhcp/coredhcp](https://github.com/coredhcp/coredhcp)
- TCP/IP
  - [lwip-tcpip/lwip](https://github.com/lwip-tcpip/lwip)
    - small independent implementation of the TCP/IP protocol suite
- Tunnel
  - [frp](./proxy/frp/README.md)
  - ssh
  - gost
  - [proxytunnel/proxytunnel](https://github.com/proxytunnel/proxytunnel)
  - [rapiz1/rathole](https://github.com/rapiz1/rathole)
    - Apache-2.0, Rust
  - [stunnel](./tunnel/stunnel.md)
  - [localtunnel](./tunnel/localtunnel.md)
    - NodeJS
  - [mhzed/wstunnel](https://github.com/mhzed/wstunnel)
    - NodeJS, Websocket
  - [MDSLab/wstun](https://github.com/MDSLab/wstun)
    - NodeJS, Websocket
  - [andydunstall/piko](https://github.com/andydunstall/piko)
    - MIT, Go
    - alternative to Ngrok
  - [inlets](./tunnel/inlets.md)
  - Ngrok

## Analysis

- [arkime/arkime](https://github.com/arkime/arkime)
  - Apache-2.0, C+Vue
  - 之前叫 Moloch
- [Kiougar/luci-wrtbwmon](https://github.com/Kiougar/luci-wrtbwmon)
  - openwrt,wrtbwmon
- [pyrovski/wrtbwmon](https://github.com/pyrovski/wrtbwmon)
  - bandwidth monitor with per-device tracking
  - 不活跃
- [spot.apache.org](https://spot.apache.org)
  - Python
  - 不活跃
  - [apache/incubator-spot](https://github.com/apache/incubator-spot)
- [metron.apache.org](https://metron.apache.org)
  - Java
  - REAL-TIME BIG DATA SECURITY
  - 项目停止
- [6tunnel](https://github.com/wojtekka/6tunnel)
  - TCP proxy for non-IPv6 applications
- [tlstunnel](https://sr.ht/~emersion/tlstunnel/)

## Tools

- mtr - ping+tracerouter
