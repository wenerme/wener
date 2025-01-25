---
tags:
  - FAQ
---

# Proxy FAQ

## tunnel vs overlay

- tunnel
  - 单端口 - 端口按需映射
  - 单 IP/固定 IP - TCP IP 层 - L4
- overlay
  - 网络 - CIDR
  - mac 层 - L2

## fake-ip

- DNS 服务器为域名分配假的 IP，在请求时就行映射
  - 客户端请求 A google.com
  - 服务端返回 192.168.2.1
  - 代理服务收到请求 192.168.2.1
    - 代理请求 google.com
- 代理服务作为网关角色
- https://www.rfc-editor.org/rfc/rfc3089
- https://blog.skk.moe/post/what-happend-to-dns-in-proxy/

## fakeip + tun

- 全局透明
- TEST-NET
  - [RFC 5737](https://datatracker.ietf.org/doc/html/rfc5737): “IPv4 Address Blocks Reserved for Documentation”
  - 192.0.2.0/24, 198.51.100.0/24, 203.0.113.0/24

## proxy env

- `[scheme]_proxy`
  - http_proxy
  - https_proxy
  - ftp_proxy
- all_proxy, ALL_PROXY

---

- https://everything.curl.dev/usingcurl/proxies

## fakedns

- fake ip
- https://blog.skk.moe/post/what-happend-to-dns-in-proxy/

## 获取代理原始 IP

- 如果用户做了分流，则可以考虑访问未分流的地址请求 URL
- https://vv.video.qq.com/checktime?otype=json&callback=onCheckTime

## jdbc url

```
jdbc:mysql://192.168.99.100:33056/guest?user=guest&\
password=guest&failOverReadOnly=false&maxReconnects=10&\
socksProxyHost=82.204.180.43&socksProxyPort=36819&autoReconnect=true
```

## TProxy vs Redirect

- TProxy
  - Transparent Proxy
  - iptables SO_MARK
  - 用于处理非本地生成的流量（如路由器转发的流量）。
  - 保留目标地址
  - 支持 UDP 和 TCP
  - 配置复杂，依赖 Linux 内核模块
- Redirect
  - iptables REDIRECT
  - 配置简单，无需复杂路由
  - 将客户端流量直接重定向到代理服务的指定端口。
  - 不保留目标 IP 和端口，转发的目标为代理的监听地址。

```bash
sysctl -w net.ipv4.ip_forward=1

# TProxy
iptables -t mangle -A PREROUTING -p tcp -j TPROXY --on-port 12345 --tproxy-mark 1
ip rule add fwmark 1 lookup 100
ip route add local default dev lo table 100

# Redirect
iptables -t nat -A PREROUTING -p tcp -j REDIRECT --to-ports 12345
```

**TProxy**

```bash
ip rule add fwmark 1 lookup tproxy
ip route add local default dev lo table tproxy
```

```nft
table ip mangle {
    chain PREROUTING {
        type filter hook prerouting priority -150; policy accept;
        # 标记 TCP 和 UDP 流量
        ip daddr != 127.0.0.1 meta l4proto { tcp, udp } mark set 1 comment "Mark packets for TProxy"
        # 将标记的流量交给 TProxy
        mark 1 tproxy to :12345 comment "Redirect marked packets to TProxy"
    }
    chain OUTPUT {
        type route hook output priority -150; policy accept;
    }
}
```

```txt title="/etc/iproute2/rt_tables"
100     tproxy
```

**Redirect**

```nft
table ip nat {
    chain PREROUTING {
        type nat hook prerouting priority -100; policy accept;
        # 将流量重定向到 Sing-box 的监听端口
        ip daddr != 127.0.0.1 meta l4proto { tcp, udp } redirect to :12345 comment "Redirect packets to proxy"
    }
}
```

## VLESS vs VMess

- VLESS
  - 更轻量的协议，无需加密，常配合 TLS 使用
- VMess
  - V2Ray 原生加密协议，自带加密

| 特性       | VLESS         | VMess      |
| ---------- | ------------- | ---------- |
| 加密       | 无内置加密    | 自带加密层 |
| 性能       | 较好          | 一般       |
| TLS        | 推荐配合使用  | 可选       |
| 协议复杂度 | 简单          | 较复杂     |
| 检测难度   | 较难          | 较容易     |
| 使用场景   | 配合 TLS 使用 | 通用场景   |

- 推荐 VLESS + TLS
  - 性能更好
  - 配置简单
  - 安全性有保障
- VMess 适用于
  - 不方便配置 TLS
  - 需要额外加密层
  - 兼容性要求高的场景
