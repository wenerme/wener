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

- [域名.信息](http://域名.信息)
- [alidns](https://alidns.com/)
- 工具
  - [dns.google](https://dns.google/)
  - [dnssec-analyzer](https://dnssec-analyzer.verisignlabs.com/)
- DoT 853 被 GFW 拦截
- Lookup Client
  - nslookup
  - host
  - dig - bind-tools
  - kdig - knot-dnsutils
  - drill from [NLnetLabs/ldns](https://github.com/NLnetLabs/ldns)
    - 输入输出接近 dig
  - [ameshkov/dnslookup](https://github.com/ameshkov/dnslookup)
    - MIT, Go
  - [natesales/q](https://github.com/natesales/q)
    - GPLv3, Go
  - [ogham/dog](https://github.com/ogham/dog)
    - EUPL1.2, Rust
- TLD
  - https://data.iana.org/TLD/tlds-alpha-by-domain.txt
  - https://en.wikipedia.org/wiki/List_of_Internet_top-level_domains
  - [Top-level domain](https://en.wikipedia.org/wiki/Top-level_domain)
- https://dnschecker.org/public-dns/cn
- https://public-dns.info/nameserver/cn.html

```bash
curl 'https://dns.google/resolve?name=wener.me&type=A'
```

## Server

- knot dns
- knot resolver
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

- [0xERR0R/blocky](https://github.com/0xERR0R/blocky)
- [nicholasb2101/PiHole](https://github.com/nicholasb2101/PiHole)
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

## Protocol

| nmae                     | abbr.    | schema        |
| ------------------------ | -------- | ------------- |
| DNS-over-UDP/53          | Do53     |
| DNS-over-TCP/53          | Do53/TCP | `tcp://`      |
| DNSCrypt                 |          | `sdns://`     |
| DNS-over-TLS             | DoT      | `tls://`      |
| DNS-over-HTTPS           | DoH      | `https://`    |
| DNS-over-TOR             |          |
| Oblivious DNS-over-HTTPS | ODoH     |
| [DNS-over-QUIC]          |          | `quic://:763` |

[dns-over-quic]: https://tools.ietf.org/html/draft-huitema-quic-dnsoquic-07

- Oblivious DNS over HTTPS - ODoH
  - 避免 Provider 感知到用户 IP - 类似 anonymized DNScrypt
  - https://blog.cloudflare.com/oblivious-dns/
  - https://tools.ietf.org/html/draft-pauly-dprive-oblivious-doh-03
  - [cloudflare/odoh-go](https://github.com/cloudflare/odoh-go)
- https://dnsprivacy.org/dns_privacy_clients/
- DoT
  - https://github.com/curl/curl/wiki/DNS-over-HTTPS

```bash
# Resolve
# dig - bind-utils
dig wener.me @114.114.114.114
dig wener.me @114.114.114.114 +tcp
# DoH
# knot-dnsutils
kdig -d @8.8.8.8 +tls-ca +tls-host=dns.google.com wener.me
# 直接请求 DoH
curl -H 'accept: application/dns-json' 'https://dns.cloudflare.com/dns-query?name=wener.me&type=A' | jq .
# curl 使用 DoT 解析
curl --doh-url https://dns.cloudflare.com/dns-query https://wener.me
```

- [ogham/dog](https://github.com/ogham/dog)

# mDNS

- [hashicorp/mdns](https://github.com/hashicorp/mdns)
  - MIT, Golang
  - Simple mDNS client/server library
- [pion/mdns](https://github.com/pion/mdns)
  - MIT, Go
  - Pure Go implementation of Multicast DNS

## Forwarder/Proxy

- [IrineSistiana/mosdns](https://github.com/IrineSistiana/mosdns)
  - GPLv3, Golang
  - DNS Forwarder
- [AdguardTeam/dnsproxy](https://github.com/AdguardTeam/dnsproxy)
- [looterz/grimd](https://github.com/looterz/grimd)
  - MIT, Golang

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

## Public DNS

| -                    | Primary         | Secondary                   | IPv6 Primary         | IPv6 Secondary       | DoH                                           | DoT                                    |
| -------------------- | --------------- | --------------------------- | -------------------- | -------------------- | --------------------------------------------- | -------------------------------------- |
| Alibaba              | 223.5.5.5       | 223.6.6.6                   | 2400:3200::1         | 2400:3200:baba::1    | https://dns.alidns.com/dns-query              | tls://dns.alidns.com                   |
| 南京信风             | 114.114.114.114 | 114.114.115.115             |
| 南京信风 Safe        | 114.114.114.119 | 114.114.115.119             |
| 南京信风 Family      | 114.114.114.110 | 114.114.115.110             |
| DNSPod               | 119.29.29.29    |
| 中国电信             | 218.102.23.228  | 218.108.23.1                |
| 中国互联网络信息中心 | 1.2.4.8         |
| 香港                 | 206.80.96.10    | 206.80.96.9                 |
| 香港                 | 203.80.96.10    | 203.80.96.9                 |
| 香港                 | 61.10.0.130     | 61.10.1.130                 |
| 台湾中华             | 168.95.1.1      | 168.95.192.1,168.95.1.2     |
| Baidu                | 180.76.76.76    |
| 网通                 | 106.185.46.149  |
| 联通                 | 121.40.240.227  |
| 电信                 | 139.196.12.167  |
| **国外**             |
| 韩国长安大学         | 168.126.63.1    | 168.126.63.2                |
| 韩国                 | 168.126.63.15   | 168.126.63.16               |
| 韩国                 | 112.106.53.22   | 112.105.54.34,112.106.23.34 |
| Google               | 8.8.8.8         | 8.8.4.4                     | 2001:4860:4860::8888 | 2001:4860:4860::8844 | https://dns.google/dns-query                  | tls://dns.google                       |
| 美国赛门铁克诺顿     | 198.153.194.1   | 198.153.192.1               |
| OpenDNS              | 208.67.222.222  | 208.67.220.220              |
| 美国 Psychz          | 208.87.241.170  |
| 美国                 | 64.81.45.2      |
| ?                    | 23.41.21.106    | 23.45.157.25                |
| Pacific SuperNet     | 202.14.67.4     | 202.238.95.26               |
| Pacific SuperNet     | 202.238.95.24   | 202.14.67.14                |
| 日本 MINET           | 203.112.2.4     | 203.112.2.5                 |
| ^                    | 203.112.2.4     | 203.112.2.5                 |
| ^                    | 202.45.84.58    | 202.45.84.59                |
| ^                    | 202.67.240.221  | 202.67.240.220              |
| ^                    | 202.69.209.5    | 202.69.209.133              |
| ^                    | 202.81.252.1    | 202.81.252.2                |
| ^                    | 202.98.198.167  | 202.98.192.67               |
| ^                    | 123.125.81.6    | 123.206.21.48               |
| ^                    | 4.4.4.4         |
| ^                    | 101.226.4.6     |
| ^                    | 210.2.4.8       |
| Cloudflare           | 1.1.1.1         | 1.0.0.1                     | 2606:4700:4700::1111 | 2606:4700:4700::1001 | https://dns.cloudflare.com/dns-query          | tls://1dot1dot1dot1.cloudflare-dns.com |
| Cloudflare Security  | 1.1.1.2         | 1.0.0.2                     | 2606:4700:4700::1112 | 2606:4700:4700::1002 | https://security.cloudflare-dns.com/dns-query | tls://security.cloudflare-dns.com      |
| Cloudflare Family    | 1.1.1.3         | 1.0.0.3                     | 2606:4700:4700::1113 | 2606:4700:4700::1003 | https://family.cloudflare-dns.com/dns-query   | tls://family.cloudflare-dns.com        |

- Safe - block phishing, malcious and other unsafe websites
- Family - block adult websites and inappropriate contents
- Cloudflare Security - Malware blocking

---

- https://kb.adguard.com/general/dns-providers
- https://dns.pub/dns-query

## 污染封禁域名列表

> 不要走国内解析

```
ai.com
akamai.net
bing.com
cloudflare.com
docker.io
dribbble.com
facebook.com
gitbook.com
gitbook.io
github.com
github.io
githubassets.com
githubusercontent.com
gmail.com
goog
google
google.com
googleapis.com
googlevideo.com
hbo.com
imdb.com
instagram.com
intellij.net
jetbrains.com
jp
jsdelivr.net
k3s.io
linode.com
medium.com
mega.nz
msecnd.net
netflix.com
nintendo.com
nintendo.net
nordvpn.com
openai.com
pornhub.com
pximg.net
quay.io
quora.com
rarbg.to
rarbgprx.org
redd.it
reddit.com
reddit.com
slack.com
spotify.com
svc.ms
t.co
telegram.org
thepiratebay.org
twimg.com
twitter.com
uk
v2ex.com
whatsapp.com
wikileaks.org
wikipedia.org
wikiquote.org
wsj.com
xvideos.com
youtube.com
```

<!--
Adguard
a=``
copy(`/${a.split(/\n/).join('/')}/`)

sort -uo notes/service/dns/gfwlist.txt{,}
-->

```bash
# for dnsmasq
curl -L https://raw.githubusercontent.com/wenerme/wener/master/notes/service/dns/gfwlist.txt \
  | sed -E 's#.+#address=/&/172.32.1.1#'

#
curl -L https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt | base64 -d > gfwlist.txt

grep -E '^([|]{2}|[.])' gfwlist.txt  | grep -v '/' | grep -v '[*]' | wc -l | sed 's/^[|.]*//' | sort -u
```

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
