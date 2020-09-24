# 代理

## Tips
## HTTP 代理
* CONNECT 会用于建立 TCP 通道
  * 通常是用于 https
  * 非 https 的时候会直接发起 GET 这样的请求
* Path 不会参与代理协议

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
## Golang
* [httputil.ReverseProxy](https://golang.org/pkg/net/http/httputil/#ReverseProxy)
* [google/huproxy](https://github.com/google/huproxy)
  * Server/Client 结构
  * 与 HTTP 并存
  * 支持 Path
  * 利用 Connection-Upgrade 升级为其他协议
* [google/inverting-proxy](https://github.com/google/inverting-proxy)
  * Reverse proxy that inverts the direction of traffic
* [google/martian](https://github.com/google/martian)
  * library for building custom HTTP/S proxies
* [antoniomika/sish](https://github.com/antoniomika/sish)
  * HTTP(S)/WS(S)/TCP Tunnels to localhost using only SSH.
* [ginuerzh/gost](https://github.com/ginuerzh/gost) - GO Simple Tunnel
  * 多端口
  * 支持代理 HTTP/HTTPS/HTTP2/SOCKS4(A)/SOCKS5
  * UDP over TCP
  * TCP/UDP 透明代理/转发
  * 支持 Shadowsocks(TCP/UDP)
  * 支持 SNI 代理
  * TUN/TAP
  * 权限控制
  * 负载均衡
  * 路由控制
  * DNS解析和代理
* [xtaci/smux](https://github.com/xtaci/smux) - Stream Multiplexing Library
* [jamescun/switcher](https://github.com/jamescun/switcher) - ssh http same port
* [inetaf/tcpproxy](https://github.com/inetaf/tcpproxy)
  * TCP over HTTP
  * 支持静态规则 - Host 头、SNI
* [akutz/memconn](https://github.com/akutz/memconn)
  * [MemConn: an in-memory network stack for Go](https://akutz.wordpress.com/2018/04/20/memconn/)
  * 可用于测试或虚拟内部代理网络

## 其他语言
* [yrutschle/sslh](https://github.com/yrutschle/sslh) - Applicative Protocol Multiplexer
  * C
  * HTTP, TLS/SSL (including SNI and ALPN), SSH, OpenVPN, tinc, XMPP, SOCKS5

## github.com/rancher/remotedialer
* 使用 websocket 建立通道
* tcp over websocket
* 内部会管理多个客户端
* 通过通道进行 `Dial` - 相当于通过远程进行调用
