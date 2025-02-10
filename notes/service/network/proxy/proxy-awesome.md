---
title: 代理
tags:
  - Awesome
---

# 代理

## 协议 {#protocol}

> **Note**
>
> - 建议基于 overlay 组件内部 proxy，更安全，更好跨网。
> - 对外暴露甚至选择

| protocol         | transport           | UDP | Note                   |
| ---------------- | ------------------- | --- | ---------------------- |
| socks4           | tcp                 | ❌  |
| socks5           | tcp                 | ✅  |
| http             | http                | ❌  |
| https            |
| ss/ShadowSocks   | tcp,ws,quic,http    | ✅  |
| ssr/ShadowSocksR |                     | ✅  |
| vmess            | tcp,ws,http,h2,grpc | ✅  | V2Ray                  |
| vless            |                     |     | by XTLS                |
| snell            | tcp                 | ❌  | surge                  |
| trojan           | h2,http,grpc,ws     | ✅  |
| tuic             | quic                |
| hysteria         | quic                |
| hysteria2        | http3, 0rtt udp     |
| wireguard        |                     |     | 用户空间实现可作为代理 |
| juicity          | quic                |
| reality          |                     |     | by XTLS                |

[snell]: https://github.com/surge-networks/snell
[trojan]: https://github.com/trojan-gfw/trojan
[vmess]: https://www.v2ray.com/en/configuration/protocols/vmess.html

- [juicity](https://github.com/juicity/juicity)
  - AGPLv3, Golang
  - quic-based, inspired by tuic
- [TUIC](./tuic.md)
- [trojan]
  - 伪装 tls/https
  - 必须 TLS
  - WS+TLS
  - 伪装非常好
- VLESS
  - 更轻量的协议，无需加密，常配合 TLS 使用
  - 推荐 VLESS+TLS
  - vs Trojan
    - 性能更好一点
    - TLS 非必须
    - 配置更简单一些
- ~~[vmess]~~
  - V2Ray 原生加密协议，自带加密
  - 支持非常复杂的协议配置
  - 有点过于复杂和臃肿
- [XTLS/REALITY](https://github.com/XTLS/REALITY)
  - 替代 TLS，消除服务端 TLS 指纹特征
- [snell]
- hysteria
  - v1 和 v2 不兼容
- brook wss
  - https://github.com/txthinking/brook
- [enfein/mieru](https://github.com/enfein/mieru)
  - 一些设计思考 https://github.com/enfein/mieru/issues/8
- naive
- http proxy
  - nginx
  - squid
  - [tinyproxy](./tinyproxy.md)
  - [Privoxy](./privoxy.md)
- socks proxy
  - [dante](./dante.md)
- ss - ShadowSocks
- ssr - ShadowSocksR
  - 不活跃，不推荐使用
- obfs - 混淆 - 用于 ss,ssr,hysteria
  - tls1.2_ticket_auth, tls1.2_ticket_fastauth
  - http_simple, http_post
- CCProxy, Proxycap, Proxifier
- Tunnel
  - [ginuerzh/gost](https://github.com/ginuerzh/gost)
  - kcp

## Tunnel

- [XX-net/XX-Net](https://github.com/XX-net/XX-Net)
- [snail007/goproxy](https://github.com/snail007/goproxy)
  - GPL-3.0, Go
- [frp](./frp/README.md)
- [rapiz1/rathole](https://github.com/rapiz1/rathole)
  - Apache-2.0, Rust
  - 类似 frp，但 rust 实现

```bash
curl https://1.1.1.1/cdn-cgi/trace
curl https://wener.me/cdn-cgi/trace
```

## Awesome

> **Note** Server/universal
>
> - 入站和出站都支持多种协议

> **Note** Client
>
> - 支持订阅
> - 强调规则
> - 支持较多出站协议 - outbound
> - 至少支持 socks 或 http 入站 - 最常用本地代理
> - 支持更多的接入逻辑 - 透明代理、tun、ebpf、redir、tproxy
> - 支持多路复用
> - 支持负载均衡
> - 支持 DNS

:::tips

- macOS 只能使用 tun 做全局代理
- TUN macOS/Windows 无法自动劫持发往局域网的 dns 请求
  - 因为不会走 TUN interface
- Linux 可以选择 redir/tproxy 做全局代理
- LAN 可以使用 DNS+SNI 做部分全局透明代理
- 本机可以使用 TUN+Route 做全局代理
- TUN 模式不支持 ICMP
  - 基本没有实现 ICMP 代理的，因此开发场景不建议本地使用 TUN 代理
  - 不能使用 ping 很多时候无法排查网络问题

:::

- GUI/客户端
  - [2dust/clashN](https://github.com/2dust/clashN)
    - Windows
  - [clash-verge-rev/clash-verge-rev](https://github.com/clash-verge-rev/clash-verge-rev)
    - GPLv3, TS, Rust
    - GUI client based on Tauri, designed to run in Windows, macOS and Linux
    - mihomo 内核
- 内核/通用/平台/Universal
  - [MetaCubeX/mihomo](./mihomo/README.md)
    - GPLv3, Go
    - Clash.Meta -> mihomo
    - 💡 适合做客户端，支持的入站协议不多
    - 支持出站传输协议 VLESS Reality, Vision, Trojan XTLS, Hysteria, TUIC, ShadowTLS
    - 规则支持 GEOSITE
    - 支持 TUN
    - [zzzgydi/clash-verge](https://github.com/zzzgydi/clash-verge)
      - GPLv3, Rust+Typescript
      - 基于 tauri 的桌面应用
  - [v2ray](./v2ray/README.md)
  - [XTLS/Xray-core](https://github.com/XTLS/Xray-core)
    - MPLv2, Go
    - 不支持 TUN [XTLS/Xray-core#3576](https://github.com/XTLS/Xray-core/issues/3576)
  - [SagerNet/sing-box](./sing-box/README.md)
    - GPLv3, Golang
    - universal proxy platform
  - ~~[clash](./clash.md)~~
    - rule based
- Dashboard/GUI
  - [MetaCubeX/metacubexd](https://github.com/MetaCubeX/metacubexd)
  - [MetaCubeX/Yacd-meta](https://github.com/MetaCubeX/Yacd-meta)
- Config
  - https://clash.skk.moe/general
  - https://github.com/SukkaW/Surge
- 服务/Servic/Socks/HTTP Proxy
  - [ginuerzh/gost](./gost.md)
    - MIT, Golang
    - GO Simple Tunnel
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
  - [nadoo/glider](./glider.md)
    - 类似 gost，但支持更多协议
      - 只有 Listener 和 Forwarder
    - mix - http+socks5
    - http
    - socks5
    - ss
    - [trojan]
    - trojanc - cleartext
    - vless
    - vmess
    - Forward/TCP - ssr, ssh. socks4, socks4a
    - tcp, udp - tunnel
    - tls, kcp, unic, vsock, smux, ws, wss, PROXY Protocol, simple obfs
    - redir, redir6, TProxy
    - reject
  - [hiddify/Hiddify-Manager](https://github.com/hiddify/Hiddify-Manager)
    - GPLv3, Python
- Transparent/Protocol
  - [mezantrop/ts-warp](https://github.com/mezantrop/ts-warp)
    - BSD-2, C
  - [HyNetwork/hysteria](./hysteria.md)
    - MIT, Go
  - [daeuniverse/dae](https://github.com/daeuniverse/dae)
    - AGPLv3, Go
    - Linux >= 5.8
    - eBPF
    - /sys/fs/bpf
    - Linux high-performance transparent proxy solution based on eBPF
    - https://github.com/daeuniverse/dae/blob/main/docs/en/proxy-protocols.md
- 命令行/CLI
  - [proxychain-ng](./proxychain-ng.md)
- [anderspitman/awesome-tunneling](https://github.com/anderspitman/awesome-tunneling)
- https://github.com/hunshcn/gh-proxy
- [heiher/hev-socks5-tproxy](https://github.com/heiher/hev-socks5-tproxy)
- [sower-proxy/sower](https://github.com/sower-proxy/sower)
  - 透明代理
  - https://github.com/sower-proxy/sower/wiki

### iOS Client

- [Stash](https://apps.apple.com/app/stash/id1596063349) - Rule Based Proxy
  - $4
  - 支持 iPhone, iPad, AppleTV
  - Clash 内核
  - Test Flight https://testflight.apple.com/join/elwvzipQ
  - https://t.me/RnNc2RaV8x0wMzQ0
  - https://t.me/stashnetworks
- [Shadowrocket](https://apps.apple.com/app/shadowrocket/id932747118)
  - $3
  - 支持 iPhone, iPad, AppleTV
- [Loon](https://apps.apple.com/app/loon/id1373567447)
  - $8
  - 支持 iPhone, iPad, AppleTV
- [Quantumult X](https://apps.apple.com/app/quantumult-x/id1443988620)
  - $8
  - 支持 macOS, iPhone, iPad, AppleTV
  - https://github.com/crossutility/Quantumult-X
- [SingBox](https://apps.apple.com/app/sing-box/id6451272673)
  - 免费
- [Pharos Pro](https://apps.apple.com/app/pharos-pro/id1456610173)
  - $3
  - iPad, iPhone
- [Potatso](https://apps.apple.com/app/potatso/id1239860606)
  - Free
  - iPad, iPhone
- Surge 5 https://nssurge.com/buy_now
  - $50
- Clash for iOS
  - App Store https://apps.apple.com/us/app/choc/id1582542227
  - Test Flight https://testflight.apple.com/join/J5QPqXKO
  - https://t.me/choc_channel
  - https://t.me/choc_chat
- Proxyman
  - https://github.com/ProxymanApp/atlantis

## 配置

- [xmdhs/clash2singbox](https://github.com/xmdhs/clash2singbox)
  - Clash.Mate -> SingBox
  - Web 版 [xmdhs/clash2sfa](https://github.com/xmdhs/clash2sfa)
- https://github.com/Toperlock/sing-box-subscribe
  - https://sing-box-subscribe.vercel.app
- https://github.com/izumiChan16/clash_ini2sing-box
- https://clash2sfa-xmdhs.koyeb.app
- https://github.com/chika0801/sing-box-examples
- https://subconverters.com/

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
- [requestly/requestly](https://github.com/requestly/requestly)
  - https://requestly.io/proxyman

## HTTP 代理 {#http-proxy}

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

# 库

- [eycorsican/leaf](https://github.com/eycorsican/leaf)
  - Apachev2, Rust
- [Koolson/Qure](https://github.com/Koolson/Qure)
  - Quantumult X Policy Icon Set
- [crossutility/Quantumult-X/](https://github.com/crossutility/Quantumult-X/)

## Golang

- [p4gefau1t/trojan-go](https://github.com/p4gefau1t/trojan-go)
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
- [xtaci/smux](https://github.com/xtaci/smux)
  - TCP, KCP
  - Simple MUltipleXing
- [hashicorp/yamux](https://github.com/hashicorp/yamux)
  - MPLv2, Go
  - connection multiplexing
- [jamescun/switcher](https://github.com/jamescun/switcher) - ssh http same port
- [inetaf/tcpproxy](https://github.com/inetaf/tcpproxy)
  - TCP over HTTP
  - 支持静态规则 - Host 头、SNI
- [akutz/memconn](https://github.com/akutz/memconn)
  - [MemConn: an in-memory network stack for Go](https://akutz.wordpress.com/2018/04/20/memconn/)
  - 可用于测试或虚拟内部代理网络
- [dshulyak/uring](https://github.com/dshulyak/uring)
- [pojntfx/weron](https://github.com/pojntfx/weron)
  - AGPLv3, Golang
  - Overlay networks based on WebRTC

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

## Rules

- https://github.com/Loyalsoldier/v2ray-rules-dat
- https://github.com/Loyalsoldier/clash-rules
- https://github.com/Loyalsoldier/surge-rules
- https://github.com/Loyalsoldier/geoip
- https://github.com/DustinWin/clash-geosite
- https://github.com/MetaCubeX/meta-rules-dat
- [felixonmars/dnsmasq-china-list](https://github.com/felixonmars/dnsmasq-china-list)

## Game Rules

> 游戏主要以 IP 为判断标准，且大多需要 UDP 协议，传统代理试用 域名 作为判断标准

- Roblex AS22697
  - https://bgp.he.net/AS22697#_prefixes
  - https://en.help.roblox.com/hc/en-us/articles/203312880-General-Connection-Problems
    - UDP 49152 - 65535
    - TCP: 3074
    - UDP: 88, 500, 3074, 3544, 4500
- Nintendo
  - `t-00000000-lp1.lp1.t.npln.srv.nintendo.net`
  - `baas.nintendo.net`
- 参考
  - https://github.com/FQrabbit/SSTap-Rule

## Limits

- https://platform.openai.com/docs/supported-countries
- Netflix HK 只能看自有，不能看授权内容
- tv.apple.com
  - https://support.apple.com/zh-cn/HT204411

## Testing

- https://i.ytimg.com/generate_204
- https://www.gstatic.com/generate_204
