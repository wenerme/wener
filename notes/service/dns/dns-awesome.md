---
title: DNS Awesome
tags:
  - Awesome
---

# DNS Awesome

:::tip 推荐 DNS 配置

- 选择支持分流的 DNS 服务、支持 DoH/DoT 解析的服务
  - AdGuard、PiHole
- 默认走国内 DNS
  - 因为国内很多服务 CDN 依赖 DNS 解析，使用国外 DNS 可能导致 CDN 出问题，访问非常慢或打不开
  - 国内 DNS 更快
- 选择会被污染的域名走 DoH/DoT 解析
  - DoH 和 DoT 不会被污染
  - 即便是用国外的 DNS over TCP/UDP 也是会被污染的，协议层不安全

:::

:::caution

- DNS 都有限速或者限制 - 尽量做本地 Cache
  - alidns [公共DNS免费版接入限速通知](https://help.aliyun.com/zh/dns/public-dns-free-version-access-speed-limit-notification)
    - 2024年9月30日24时起
    - DoT, DoH 每月1000万次
  - dnspod [免费版DoH、DoT不再公开IP接入的公告](https://docs.dnspod.cn/notices/mian-fei-ban-dot-dohbu-zai-gong-kai-ipjie-ru-de-gong-gao/)
- ISP 一般都会污染 UDP DNS
  - 尽量使用 DoT, DoH 之类的协议在本地做代理

:::

```bash
# DoT tcp 853
kdig @223.5.5.5 +tls-ca wener.me
# kdig @120.53.53.53 +tls-ca wener.me
fping 223.5.5.5 223.6.6.6 8.8.8.8 1.1.1.1 119.29.29.29 120.53.53.53 -l

# 检测 DNS 配置
curl https://nstool.netease.com/
```

- Forwarder/Proxy/转发/代理/缓存/Local/Resolver
  - [dnsmasq]
  - [AdguardTeam/dnsproxy](https://github.com/AdguardTeam/dnsproxy)
    - Apache-2.0, Golang
    - 上游 DoT, DoH, DoQ, DNSCrypt
    - 下游 DoH, DoT, DoQ
    - DNS proxy with DoH, DoT, DoQ and DNSCrypt support
  - [DNSCrypt/dnscrypt-proxy](https://github.com/DNSCrypt/dnscrypt-proxy)
  - [pymumu/smartdns](https://github.com/pymumu/smartdns)
    - GPLv3, C
    - TCP, UDP, DoH，DoT，DoQ
    - 返回 访问速度最快的解析结果
    - 支持分流
    - ⚠️ 不支持 macOS
  - [0xERR0R/blocky](./blocky)
  - [nicholasb2101/PiHole](https://github.com/nicholasb2101/PiHole)
  - [IrineSistiana/mosdns](https://github.com/IrineSistiana/mosdns)
    - GPLv3, Golang
    - DNS Forwarder
  - [looterz/grimd](https://github.com/looterz/grimd)
    - MIT, Golang
- Command Line Tools/Client/Debug/Lookup
  - nslookup
  - host
  - dig - bind-tools
  - kdig - knot-dnsutils
  - [NLnetLabs/ldns](https://github.com/NLnetLabs/ldns)
    - BSD-3, C
    - DNS library
    - drill
      - 输入输出接近 dig
  - [ameshkov/dnslookup](https://github.com/ameshkov/dnslookup)
    - MIT, Go
  - [natesales/q](https://github.com/natesales/q)
    - GPLv3, Go
  - ~~[ogham/dog](https://github.com/ogham/dog)~~
    - EUPL1.2, Rust
  - [mr-karan/doggo](https://github.com/mr-karan/doggo)
    - GPLv3, Go
- blocklist/list/category/anti-ad/hosts
  - https://github.com/hagezi/dns-blocklists
  - [hagezi/dns-blocklists](https://github.com/hagezi/dns-blocklists)
  - https://s3.amazonaws.com/lists.disconnect.me/simple_ad.txt
  - https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts

## DNS Provider

| Provider        | Primary         | Secondary       | IPv6            | DoH                                              | DoT                              | DoQ | ECS | ECS-Override |
| --------------- | --------------- | --------------- | --------------- | ------------------------------------------------ | -------------------------------- | --- | --- | ------------ |
| Google          | 8.8.8.8         | 8.8.4.4         |                 | dns.google                                       | dns.google                       | ✓   | ✓   | ✓            |
| Cloudflare      | 1.1.1.1         | 1.0.0.1         |                 | cloudflare-dns.com <br/> https://one.one.one.one | 1dot1dot1dot1.cloudflare-dns.com | ✓   | ✗   | ✗            |
| Quad9           | 9.9.9.9         | 149.112.112.112 |                 | dns.quad9.net                                    | dns.quad9.net                    | ✓   | ✓   | ✗            |
| Cisco OpenDNS   | 208.67.222.222  | 208.67.220.220  |                 | doh.opendns.com                                  | dns.opendns.com                  | ✗   | ✓   | ✗            |
| **国内**        |                 |                 |                 |                                                  |                                  |     |     |              |
| Aliyun          | 223.5.5.5       | 223.6.6.6       |                 | dns.alidns.com                                   | dns.alidns.com                   | ✗   | ✓   | ✗            |
| 腾讯 DNSPod     | 119.29.29.29    | 182.254.116.116 | 2402:4e00::     | doh.pub                                          | dot.pub                          | ✗   | ✓   | ✗            |
| 114DNS 中国电信 | 114.114.114.114 | 114.114.115.115 |
| 百度            | 180.76.76.76    |                 | 2400:da00::6666 |

| protocol | url                                                   |
| -------- | ----------------------------------------------------- |
| UDP      | 1.1.1.1:53                                            |
| TCP      | 1.1.1.1:53                                            |
| DoT      | tls://1.1.1.1:853                                     |
| DoH      | `https://dns.wener.me/dns-query?name=wener.me&type=A` |

| abbr.  | stand for                              | notes                                          |
| ------ | -------------------------------------- | ---------------------------------------------- |
| DoH    | DNS over HTTPS                         | 通过HTTPS协议加密DNS查询                       |
| ODoH   | Oblivious DNS over HTTPS               | RFC 9230, 隐私增强, Proxy 无法感知内容         |
| HPKE   | Hybrid Public Key Encryption           | ODoH实现中使用的加密标准                       |
| DNSSEC | Domain Name System Security Extensions | 验证DNS响应以防止欺骗                          |
| DNSKEY | DNS Public Key                         | DNSSEC中使用的公钥记录                         |
| DoQ    | DNS over QUIC                          | 通过QUIC协议的DNS查询，提供更好的性能          |
| ECS    | EDNS Client Subnet                     | 允许DNS解析器指定客户端子网以优化CDN响应的扩展 |

- [DNS64](https://developers.google.com/speed/public-dns/docs/dns64) 返回 AAAA, IPv4 合成的 IPv6 地址
- DoH
  - `GET/POST /dns-query `
    - RFC 8484
- [域名.信息](http://域名.信息)
- 工具
  - [dns.google](https://dns.google/)
  - [dnssec-analyzer](https://dnssec-analyzer.verisignlabs.com/)
  - [zu1k/nali](https://github.com/zu1k/nali)
- DoT 853 被 GFW 拦截
- TLD
  - https://data.iana.org/TLD/tlds-alpha-by-domain.txt
  - https://en.wikipedia.org/wiki/List_of_Internet_top-level_domains
  - [Top-level domain](https://en.wikipedia.org/wiki/Top-level_domain)
- names
  - https://github.com/uklans/cache-domains
- https://dnschecker.org/public-dns/cn
- https://public-dns.info/
  - https://public-dns.info/nameserver/cn.html
- Provider
  - Google DNS
    - 100 QPS/IP
    - https://developers.google.com/speed/public-dns
    - https://cloud.google.com/dns/quotas
  - [alidns](https://alidns.com/)
    - DoH3
      - h3://dns.alidns.com/dns-query
      - h3://223.5.5.5/dns-query
  - https://adguard-dns.io/kb/zh-CN/general/dns-providers/

```yaml
- name: google
  url: https://developers.google.com/speed/public-dns
  services:
    - hosts:
        - 8.8.8.8
        - 8.8.4.4
        - 2001:4860:4860::8844
        - 2001:4860:4860::8888
    - host: dns.google
    - host: dns.google.com
      notes: since 2020-06-23 -> dns.google
    - hosts:
        - 2001:4860:4860::6464
        - 2001:4860:4860::64
      notes: DNS64
  notes: DoH 支持 `GET /resolve?` 的 JSON-API

- name: cloudflare
  url: https://developers.cloudflare.com/1.1.1.1/
  services:
    - hosts:
        - 1.1.1.1
        - 1.1.0.0
        - 2606:4700:4700::1111
        - 2606:4700:4700::1001
        - one.one.one.one
        - cloudflare-dns.com
    - title: Block malware
      hosts:
        - 1.1.1.2
        - 1.0.0.2
        - 2606:4700:4700::1112
        - 2606:4700:4700::1002
        - security.cloudflare-dns.com
    - title: Block malware and adult content
      hosts:
        - 1.1.1.3
        - 1.0.0.3
        - 2606:4700:4700::1113
        - 2606:4700:4700::1003
        - family.cloudflare-dns.com
    - title: Oblivious DNS over HTTPS
      hosts:
        - odoh.cloudflare-dns.com
    - hosts:
        - http://cloudflare-ech.com/

- name: quad9
  url: https://quad9.net/service/service-addresses-and-features
  services:
    - hosts:
        - 9.9.9.9
        - 149.112.112.112
        - 2620:fe::fe
        - 2620:fe::9
        - dns.quad9.net
      features: [Malware Blocking, DNSSEC Validation]

- name: aliyun
  url: https://alidns.com
  services:
    - hosts:
        - 223.5.5.5
        - 223.6.6.6
        - 2400:3200::1
        - 2400:3200:baba::1
        - dns.alidns.com
```

```bash
curl 'https://dns.google/resolve?name=wener.me&type=A'
```

```conf
#AliDNS
223.5.5.5
223.6.6.6
2400:3200::1
2400:3200:baba::1
dns.alidns.com

#DNSPod
1.12.12.12
120.53.53.53
doh.pub
dot.pub

#360
101.198.191.4
101.199.254.118
106.63.24.74
111.7.73.60
112.65.69.15
123.6.48.18
180.163.249.75
221.181.72.233
36.99.170.86
39.156.84.71

#OpenDNS
208.67.222.222
208.67.220.220
2620:119:35::35
2620:119:53::53
146.112.41.2
146.112.41.5
2620:119:fc::2
2620:119:fc::5

#HiNet 中華電信
168.95.1.1
168.95.192.1
2001:b000:168::1
2001:b000:168::2

#Cloudflare
104.16.132.229
104.16.133.229
2606:4700::6810:84e5
2606:4700::6810:85e5

#Google
8.8.8.8
8.8.4.4

#Cloudflare
1.1.1.1
1.0.0.1

#DNS.SB
#HK
45.125.0.26
#JP
103.121.210.210
202.5.221.130
#KR
3.34.32.82
#SG
165.22.61.129

#NextDNS
#HK
45.11.104.186
#TW
45.150.242.161
#JP
103.170.232.254
#KR
103.127.124.46
#SG
194.156.163.172
```

## Server

- knot dns
  - AS DNS Server
  - https://www.knot-dns.cz/
- knot resolver
  - Minimalistic, caching, DNSSEC-validating DNS resolver
  - https://www.knot-resolver.cz
- [unbound]
- bind
- coredns
- nsd
- dnsdist
- [dnscrypt]
- [pdns recursor](./powerdns/powerdns-rec.md)
- [pdns](./powerdns/README.md)
- [kea](https://gitlab.isc.org/isc-projects/kea)
  - 提供 [perfdhcp](https://kea.readthedocs.io/en/latest/man/perfdhcp.8.html) 压测工具
- [serverless-dns/serverless-dns](https://github.com/serverless-dns/serverless-dns)
- [adguardhome](./adguard.md)

[dnscrypt]: ./dnscrypt.md
[unbound]: ./unbound.md
[dnsmasq]: ./dnsmasq.md

## Block

- https://gist.github.com/michaelx/316dc4882f125a8325150e4e2fa9edd6
- https://firebog.net/
- [privacy-protection-tools/anti-AD](https://github.com/privacy-protection-tools/anti-AD)
- [Mosney/anti-anti-AD](https://github.com/Mosney/anti-anti-AD)
- [neoFelhz/neohosts](https://github.com/neoFelhz/neohosts)
- [vokins/yhosts](https://github.com/vokins/yhosts)
- [blocklistproject/Lists](https://github.com/blocklistproject/Lists)
- https://github.com/nextdns/metadata/tree/master/privacy
  - blocklisk 拦截列表
  - native 系统级跟踪列表
- [jdlingyu/ad-wars](https://github.com/jdlingyu/ad-wars)
- https://github.com/badmojr/1Hosts
  - https://o0.pages.dev/Xtra/hosts.txt
- [AdguardTeam/AdguardFilters](https://github.com/AdguardTeam/AdguardFilters)
- [AdguardTeam/AdGuardSDNSFilter](https://github.com/AdguardTeam/AdGuardSDNSFilter)

```bash
curl https://raw.githubusercontent.com/jdlingyu/ad-wars/master/hosts -so ad-wars.txt
# 拆分为 1000 列表方便 cloudflare 导入
grep '127.0.0.1' ad-wars.txt | grep -v '#' | awk '{print $2}' | sort -u | split -l 1000 -d --additional-suffix '.csv' - ad-wars-
```

---

- https://whotracks.me/trackers/markmonitor.html
- https://whotracks.me/trackers/adguard.html

## mDNS

- [hashicorp/mdns](https://github.com/hashicorp/mdns)
  - MIT, Golang
  - Simple mDNS client/server library
- [pion/mdns](https://github.com/pion/mdns)
  - MIT, Go
  - Pure Go implementation of Multicast DNS

## Misc

- [dnstap](https://dnstap.info/)
- [llccd/netfilter-spooftcp](https://github.com/llccd/netfilter-spooftcp)
  - dns spoof
- [iptable drop spoof dns](https://twitter.com/gNodeB/status/1443975021840551941)
- [Mess with DNS](https://jvns.ca/blog/2021/12/15/mess-with-dns/)

## GFW

- [yangchuansheng/love-gfw](https://github.com/yangchuansheng/love-gfw)

## Well Known Domains

| domain           | for                   |
| ---------------- | --------------------- |
| https://pki.goog | Google Trust Services |

## 污染封禁域名列表 {#gfw}

> 不要走国内解析

<!--
Adguard
a=``
copy(`/${a.split(/\n/).join('/')}/`)

sort -uo notes/service/dns/gfwlist.txt{,}
sort -uo notes/service/dns/gfwlist.full.txt{,}

cat notes/service/dns/gfwlist{,.tld}.txt > notes/service/dns/gfwlist.full.txt
sort -uo notes/service/dns/gfwlist.full.txt{,}

cat gfw.list >> notes/service/dns/gfwlist.full.txt
-->

```bash
# for dnsmasq
curl -L https://raw.githubusercontent.com/wenerme/wener/master/notes/service/dns/gfwlist.txt \
  | sed -E 's#.+#address=/&/172.32.1.1#'

#
curl -L https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt | base64 -d > gfwlist.txt

# address=/docker.io/$SNI
curl -sfL 'https://github.com/wenerme/wener/raw/master/notes/service/dns/gfwlist.dev.txt' | sed -e 's#.*#address=/\0/$SNI#'

grep -E '^([|]{2}|[.])' gfwlist.txt | grep -v '/' | grep -v '[*]' | wc -l | sed 's/^[|.]*//' | sort -u

curl -LO https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/gfw.list
sed -i -e 's#^+.##' gfw.list
```

- [gfwlist.txt](https://raw.githubusercontent.com/wenerme/wener/master/notes/service/dns/gfwlist.txt)
- [gfwlist.dev.txt](https://raw.githubusercontent.com/wenerme/wener/master/notes/service/dns/gfwlist.dev.txt)
  - 开发相关域名
  - https://learn.microsoft.com/en-us/azure/security/fundamentals/azure-domains
  - https://www.netify.ai/resources/applications/github
  - https://www.google.com/supported_domains
  - https://github.com/v2fly/domain-list-community/blob/master/data/google
- https://github.com/MetaCubeX/meta-rules-dat/blob/meta/geo/geosite/gfw.list

**Bypass**

```
netflix.com
netflix.net
chat.openai.com
bard.google.com
```

- https://github.com/v2fly/domain-list-community/blob/master/data/netflix
- https://www.netify.ai/resources/applications/netflix
- https://github.com/gfwlist/gfwlist
- [中华人民共和国被封锁网站列表](https://zh.wikipedia.org/wiki/中华人民共和国被封锁网站列表)
- https://github.com/paulmillr/encrypted-dns

## CDN

- ghcr.io -> pkg-containers.githubusercontent.com

## reverse

- 112.46.2.37
  - pcs.baidu.com
  - 百度网盘
- public-dns-a.baidu.com
