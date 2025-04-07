---
tags:
  - Configuration
---

# Mihomo 配置


- [DNS]
- sniffer - 嗅探
- prixies - 出站代理
  - 内置
    - DIRECT
    - REJECT
    - REJECT-DROP
    - PASS - 匹配时忽略规则
    - COMPATIBLE = DIRECT
- proxy-groups - 代理组
  - 内置 GLOBAL
    - 所有代理组和代理节点
    - 可以覆盖定义
- proxy-providers - 代理集合
- rule-providers - 规则集合
- 入站代理
  - mixed-port - HTTP+Socks
  - port - HTTP/HTTPS
  - socks-port - SOCKS4/4a/5
  - redir-port
    - Linux, Android, macOS
  - tproxy-port
    - Linux, Android
  - tun
  - listeners
- dns
  - default-nameserver
    - 用来解析 DNS 用到的域名，必须是 IP
    - 推荐 tls://223.5.5.5:853
  - direct-nameserver
    - for DIRECT
    - nameserver-policy -> nameserver -> fallback
  - nameserver-policy
    - 根据策略选择 DNS
  - nameserver
  - proxy-server-nameserver
  - fallback
    - 通常为海外 DNS
    - 配合 fallback-filter: geoip-code: CN
  - respect-rules
    - DNS 服务是否走路由规则
  - enhanced-mode
    - redir-host - DNSMapping
    - fake-ip
    - normal
    - hosts

```yaml
log-level: warning
mixed-port: 7890
allow-lan: true
bind-address: "*"
# off, always, strict
find-process-mode: off
mode: rule
tcp-concurrent: true
unified-delay: true
ipv6: false
```

---

```bash
# 配置了 tun+sniffer 也可以这样
curl -H 'Host: example.com' 198.18.0.1
```

- 大部分配置和 clash 配置相同
- 新增的能会有和 clash 配置不同的地方

**域名匹配规则**

| sym | rule         | true                                           | false                         |
| --- | ------------ | ---------------------------------------------- | ----------------------------- |
| `*` | `*.wener.me` | `a.wener.me`                                   | `a.a.wener.me`<br/>`wener.me` |
| `+` | `+.wener.me` | `wener.me`<br/>`a.wener.me`<br/>`a.a.wener.me` | -                             |
| `.` | `.wener.me`  | `a.wener.me`<br/>`a.a.wener.me`                | `wener.me`                    |

- 端口范围 `114-514/810-1919,65530`
- 参考
  - https://github.com/ewigl/mihomo

## DNS

**支持的协议**

```yaml
# UDP - 53
- 223.5.5.5
- udp://223.5.5.5
# TCP - 53
- tcp://8.8.8.8
# DoT - DNS over TLS - 853
- tls://1.1.1.1
# Do DNS over HTTPS - 443
- https://doh.pub/dns-query
# DoQ - DNS over QUIC - 853, 784
- quic://dns.adguard.com:784
# 系统
- system://
- system
# DHCP
- dhcp://en0
- dhcp://system # 仅限 cmfa，使用系统 dns

# 固定返回值 - 用于屏蔽域名
- rcode://success # No error
- rcode://format_error # Format error
- rcode://server_failure # Server failure
- rcode://name_error # Non-existent domain
- rcode://not_implemented # Not implemented
- rcode://refused # Query refused
```

- 参数
  - `tls://dns.google#RULES`
  - `tls://dns.google#proxy`
  - `tls://dns.alidns.com#eth0`
  - `https://dns.cloudflare.com/dns-query#h3=true`
    - 强制 HTTP/3
  - `skip-cert-verify=true` - DoH 不验证证书
  - `ecs=1.1.1.1/24`
    - DoH ECS 的 subnet
  - `ecs-override=true`
    - DoH ECS 强制覆盖 subnet
- 国内 DNS - DoT, DoH
  - 阿里云
    - 223.5.5.5
    - 223.6.6.6
    - dns.alidns.com
  - 腾讯云 DnsPod
    - 1.12.12.12
    - 120.53.53.53
    - https://doh.pub/dns-query
- 国外 DNS - DoT, DoH, DoQ
  - ⚠️ 目前海外服务都是被阻断或者污染的状态
  - Google
    - dns.google
    - 8.8.8.8
    - 8.8.4.4
  - Cloudflare
    - 1.1.1.1
    - 1.0.0.1
    - https://cloudflare-dns.com/dns-query
    - https://one.one.one.one/dns-query
- 参考
  - https://www.andan.me/diary/1742.html

```bash
kdig -d @1.1.1.1 +tls-ca +tls-host=one.one.one.one example.com
kdig @dns.adguard.com wener.me +quic
kdig @dns.google example.com +quic
curl --http2 --header "accept: application/dns-json" "https://1.1.1.1/dns-query?name=cloudflare.com" --next --http2 --header "accept: application/dns-json" "https://1.1.1.1/dns-query?name=example.com"
```
