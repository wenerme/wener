---
tags:
  - Protocol
---

# DNS Protocol

| nmae                     | abbr.    | schema                 | notes    |
| ------------------------ | -------- | ---------------------- | -------- |
| DNS-over-UDP/53          | Do53     |                        | 512 字节 |
| DNS-over-TCP/53          | Do53/TCP | `tcp`, `tcp+udp` |
| DNS-over-TLS             | DoT      | `tls`, `tcp-tls` |
| DNS-over-HTTPS           | DoH      | `https`             |
| DNS-over-TOR             |          |
| Oblivious DNS-over-HTTPS | ODoH     |
| [DNS-over-QUIC]          |          | `quic://:763`          |
| DNSCrypt                 |          | `sdns://`              |

[dns-over-quic]: https://tools.ietf.org/html/draft-huitema-quic-dnsoquic-07
[rfc7858]: https://datatracker.ietf.org/doc/html/rfc7858.html

- Oblivious DNS over HTTPS - ODoH
  - 避免 Provider 感知到用户 IP - 类似 anonymized DNScrypt
  - https://blog.cloudflare.com/oblivious-dns/
  - https://tools.ietf.org/html/draft-pauly-dprive-oblivious-doh-03
  - [cloudflare/odoh-go](https://github.com/cloudflare/odoh-go)
- https://dnsprivacy.org/dns_privacy_clients/
- DoH
  - https://github.com/curl/curl/wiki/DNS-over-HTTPS
- DoT
  - [rfc7858] Opportunistic Privacy Profile

```bash
apk add bind-utils knot-utils # for AlpineLinux
brew install bind knot        # for macOS

dig wener.me @114.114.114.114
dig wener.me @114.114.114.114 +tcp
dig wener.me @127.0.0.1 -p 5353

# 最新版本 dig 支持 DoH
dig @cloudflare-dns.com +https wener.me

# DoT
# +tls-hostname=STR +tls-pin=BASE64 +tls-sni=STR +tls-ocsp-stapling
kdig @1.1.1.1 +tls-ca wener.me
curl https://1.1.1.1:853
kdig @223.5.5.5 +tls-ca wener.me

kdig -d @8.8.8.8 +tls-ca +tls-host=dns.google.com wener.me

kdig -d @dns.alidns.com +tls-ca wener.me

# 判断污染 DNS 解析和域名解析结果
# 可能返回错误的 IP
dig +short @1.1.1.1 wikipedia.org
openssl s_client -connect $(dig +short @1.1.1.1 wikipedia.org):443
openssl s_client -servername wikipedia.org -connect $(dig +short @1.1.1.1 wikipedia.org):443 < /dev/null 2> /dev/null | openssl x509 -noout -subject

# 判断 DNS 拦截
# 正常情况应该返回 NS 但是被拦截后只返回 A 记录, 说明 1.0.0.1 这个 DNS 服务器被拦截了
kdig @1.0.0.1 www.twitter.com NS         # 可能只返回 A 记录
kdig @1.0.0.1 www.twitter.com NS +tls-ca # 这时候能够正常返回 NS 记录
# 向一个不存在的 DNS 发出查询还是会有返回，说明是被污染
dig +nocookie +tries=1 +time=1 www.twitter.com NS @example.com # 返回 A 记录
dig +nocookie +tries=1 +time=1 wener.me NS @example.com        # 不会返回，因为这个域名没有被污染
# 类似被封锁的域名
dig +nocookie +tries=1 +time=1 www.google.com NS @example.com
dig +nocookie +tries=1 +time=1 www.nordvpn.com NS @example.com
# 使用 IP 减少尝试次数
dig +nocookie +tries=1 +time=1 google.com NS @23.192.228.84

kdig @9.9.9.9 google.com +tls-ca
curl https://9.9.9.9:853

# DoH
# knot-dnsutils
# 直接请求 DoH
curl -H 'accept: application/dns-json' 'https://dns.cloudflare.com/dns-query?name=wener.me&type=A' | jq .
# curl 使用 DoT 解析
curl --doh-url https://dns.cloudflare.com/dns-query https://wener.me

#
kdig @https://dns.google/dns-query wener.me A +tls

# DoH
kdig @1.1.1.1 +https wener.me
kdig @dns.alidns.com +https example.com.
kdig @8.8.4.4 +https +https-get example.com.
kdig @8.8.8.8 +https +tls-hostname=dns.google +fastopen example.com.
# https://8.8.8.8 -> https://dns.google
```

- DoH
  - https://dns.google/dns-query
  - https://cloudflare-dns.com/dns-query
  - https://dns.alidns.com/dns-query
- https://github.com/wolf-joe/ts-dns/issues/24
- https://zh.wikipedia.org/zh/中华人民共和国被封锁网站列表
