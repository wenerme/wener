---
title: 代理
tags:
  - Awesome
---

# 代理

> **Note**
>
> 建议基于 overlay 组件内部 proxy，更安全，更好跨网。

| protocol           | transport                  | UDP | Note  |
| ------------------ | -------------------------- | --- | ----- |
| socks4             | tcp                        | ❌  |
| socks5             | tcp                        | ✅  |
| http               | http                       | ❌  |
| ShadowSocks - ss   | tcp,websocket,quic,http    | ✅  |
| ShadowSocksR - ssr |                            | ✅  |
| vmess              | tcp,websocket,http,h2,grpc | ✅  | V2Ray |
| [snell]            | tcp                        | ❌  | surge |
| [trojan]           | h2,http,grpc               | ✅  |

[snell]: https://github.com/surge-networks/snell
[trojan]: https://github.com/trojan-gfw/trojan

- brook wss
  - https://github.com/txthinking/brook
- obfs - 混淆 - 用于 ss,ssr
  - tls1.2_ticket_auth, tls1.2_ticket_fastauth
  - http_simple, http_post
- CCProxy, Proxycap, Proxifier

## Sniff/Introspection

- Charles - 商业
  - macOS
- Proxyman - 商业
  - macOS
- [mitmproxy](./mitmproxy.md)
  - [lqqyt2423/go-mitmproxy](https://github.com/lqqyt2423/go-mitmproxy)
    - MIT, Golang
  - [AdguardTeam/gomitmproxy](https://github.com/AdguardTeam/gomitmproxy)
    - GPL-3.0, Golang
- Wireshark
- tshark
- tcpdump
- ngrep

## HTTP 代理

- CONNECT 会用于建立 TCP 通道
  - 通常是用于 https
  - 非 https 的时候会直接发起 GET 这样的请求
- Path 不会参与代理协议

```bash
# 会发起 GET 请求
curl -x http://127.0.0.1:8080 icanhazip.com -v
# 相同
curl -x http://127.0.0.1:8080 https://icanhazip.com -v
curl -x http://127.0.0.1:8080/proxy https://icanhazip.com -v

# http2
# ==========
# HTTP Upgrade
curl -v --http2 http://localhost:8000
# GET / HTTP/2
curl -v --http2-prior-knowledge http://localhost:8000
```

## Proxy Protocol

- HAProxy Protocol - 主要用于保留原 IP
  - 希望基于来源 IP 做策略的一般都会支持
  - [proxy-protocol.txt](https://github.com/haproxy/haproxy/blob/master/doc/proxy-protocol.txt)
    - v1 - 明文 `PROXY TCP4 255.255.255.255 255.255.255.255 65535 65535\r\n\r\n`
    - v2 - 支持二进制，支持更多协议
  - 支持的服务: haproxy, nginx, varnish, stud, stunnel
  - 实现
    - [cloudflare/mmproxy](https://github.com/cloudflare/mmproxy)
    - [path-network/go-mmproxy](https://github.com/path-network/go-mmproxy)
    - [AdGuardHome#2798](https://github.com/AdguardTeam/AdGuardHome/issues/2798)

## server

- https://www.v2ray.com/
  - https://github.com/v2rayA/v2rayA
- [clash](./clash.md)
  - rule based
- [HyNetwork/hysteria](https://github.com/HyNetwork/hysteria)
  - MIT, Go
- [SagerNet/sing-box](https://github.com/SagerNet/sing-box)
  - GPL, Golang
  - universal proxy platform
- [anderspitman/awesome-tunneling](https://github.com/anderspitman/awesome-tunneling)

## iOS

- Stash - Rule Based Proxy
  - $2.99
  - 支持 Clash, hysteria
  - App Store https://apps.apple.com/app/stash/id1596063349
  - Test Flight https://testflight.apple.com/join/elwvzipQ
  - https://t.me/RnNc2RaV8x0wMzQ0
  - https://t.me/stashnetworks
- Clash for iOS
  - App Store https://apps.apple.com/us/app/choc/id1582542227
  - Test Flight https://testflight.apple.com/join/J5QPqXKO
  - https://t.me/choc_channel
  - https://t.me/choc_chat


# 库

## Golang

- [mingcheng/socks5lb](https://github.com/mingcheng/socks5lb)
- [httputil.ReverseProxy](https://golang.org/pkg/net/http/httputil/#ReverseProxy)
- [google/huproxy](https://github.com/google/huproxy)
  - Server/Client 结构
  - 与 HTTP 并存
  - 支持 Path
  - 利用 Connection-Upgrade 升级为其他协议
- [google/inverting-proxy](https://github.com/google/inverting-proxy)
  - Reverse proxy that inverts the direction of traffic
- [google/martian](https://github.com/google/martian)
  - library for building custom HTTP/S proxies
- [antoniomika/sish](https://github.com/antoniomika/sish)
  - HTTP(S)/WS(S)/TCP Tunnels to localhost using only SSH.
- [ginuerzh/gost](https://github.com/ginuerzh/gost) - GO Simple Tunnel
  - 多端口
  - 支持代理 HTTP/HTTPS/HTTP2/SOCKS4(A)/SOCKS5
  - UDP over TCP
  - TCP/UDP 透明代理/转发
  - 支持 Shadowsocks(TCP/UDP)
  - 支持 SNI 代理
  - TUN/TAP
  - 权限控制
  - 负载均衡
  - 路由控制
  - DNS 解析和代理
- [xtaci/smux](https://github.com/xtaci/smux)
  - TCP, KCP
  - Simple MUltipleXing
- [jamescun/switcher](https://github.com/jamescun/switcher) - ssh http same port
- [inetaf/tcpproxy](https://github.com/inetaf/tcpproxy)
  - TCP over HTTP
  - 支持静态规则 - Host 头、SNI
- [akutz/memconn](https://github.com/akutz/memconn)
  - [MemConn: an in-memory network stack for Go](https://akutz.wordpress.com/2018/04/20/memconn/)
  - 可用于测试或虚拟内部代理网络
- [dshulyak/uring](https://github.com/dshulyak/uring)

## 其他语言

- [yrutschle/sslh](https://github.com/yrutschle/sslh) - Applicative Protocol Multiplexer
  - C
  - HTTP, TLS/SSL (including SNI and ALPN), SSH, OpenVPN, tinc, XMPP, SOCKS5
- [joeferner/node-http-mitm-proxy](https://github.com/joeferner/node-http-mitm-proxy)
  - NodeJS

## GFW

- [ValdikSS/GoodbyeDPI](https://github.com/ValdikSS/GoodbyeDPI)
  - https://news.ycombinator.com/item?id=32199468
- [SadeghHayeri/GreenTunnel](https://github.com/SadeghHayeri/GreenTunnel)
- [comwrg/FUCK-GFW](https://github.com/comwrg/FUCK-GFW)
- https://github.com/haoel/haoel.github.io

## 线路

- CN1 - 163 骨干网 - 带宽容量大，价格便宜
  - as4134
  - `202.97.*`
- CN2 - 带宽容量较小，费用高
  - as4809
  - `59.43.*`
  - CN2 GT - Global Transit
    - 出口单独线路，入口使用 163
  - CN2 GIA
    - 独立的回国线路
- HK > CN2 GIA > CN2 GT

## 域名

- 常见需要代理域名
  - quora.com
  - medium.com
- 可直接访问
  - gstatic.com
- 需要速度快 - 体验好
  - google.com
  - github.com
- 大流量 - 带宽为主
  - www.googleapis.com
    - Google 的云盘、对象存储
  - googlevideo.com
    - Youtube
  - svc.ms
    - OneDrive 下载
  - anonfiles.com
  - codeload.github.com
    - `https://codeload.github.com/<org>/<repo>/tar.gz/refs/tags/<tag>`
  - objects.githubusercontent.com
    - Github Release
  - googleusercontent.com
- google
  - goog
  - google
  - google.com
  - googleusercontent.com
  - gstatic.com
  - ggpht.com
    - google maps
    - profile
  - https://developers.google.com/maps/gmp-domains
- TG - AS62041 - https://core.telegram.org/resources/cidr.txt - https://ipinfo.io/AS62041
  - 91.108.56.0/22
    - 91.108.56.150
- nintendo
  - app.lp1.five.nintendo.net
  - atum.hac.lp1.d4c.nintendo.net - 主要下载 CDN
    - https://www.ping.cn/dns/atum.hac.lp1.d4c.nintendo.net
    - 23.56.180.81
    - 23.2.16.27
  - app-a03.lp1.npns.srv.nintendo.net
  - http://ctest.cdn.nintendo.net.akamaized.net
    - 网络检测
  - broker.lp1.npns.srv.nintendo.net
  - bcat-list-lp1.cdn.nintendo.net
  - https://github.com/buggerman/SwitchBlockerForPiHole
  - receive-lp1.er.srv.nintendo.net
    - 可以 blcok
    - Error Reporting
  - 香港 DNS:
    - 208.67.222.222
    - 208.67.220.220

## Domains

- min-api.cryptocompare.com
- webpkgcache.com
- gas-api.metaswap.codefi.network
- amdc.alipay.com
  - HTTP DNS
  - `curl -X POST amdc.alipay.com/squery`
  - https://github.com/cxw620/AdGuard-Rules/issues/3


## ADGuard

```
114.114.114.114
114.114.115.115
223.5.5.5
223.6.6.6
[/facebook.com/github.com/github.io/goog/google/google.com/hbo.com/imdb.com/instagram.com/jp/medium.com/mega.nz/netflix.com/nordvpn.com/pornhub.com/quora.com/rarbg.to/rarbgprx.org/reddit.com/slack.com/spotify.com/t.co/telegram.org/thepiratebay.org/twitter.com/uk/whatsapp.com/wikileaks.org/wikipedia.org/wikiquote.org/wsj.com/xvideos.com/youtube.com/okx.com/okpool.top/]https://dns.cloudflare.com/dns-query
[/nintendo.net/nintendo.com/]208.67.222.222
```

- https://dns.pub/dns-query
