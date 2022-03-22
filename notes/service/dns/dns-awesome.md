---
title: DNS Awesome
tags:
  - Awesome
---

# DNS Awesome

- [域名.信息](http://域名.信息)
- [alidns](https://alidns.com/)
- 工具
  - [dns.google](https://dns.google/)
  - [dnssec-analyzer](https://dnssec-analyzer.verisignlabs.com/)
- DoT 853 被 GFW 拦截

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

[dnscrypt]: ./dnscrypt.md
[unbound]: ./unbound.md
[dnsmasq]: ./dnsmasq.md

## Block

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

```bash
curl https://raw.githubusercontent.com/jdlingyu/ad-wars/master/hosts -so ad-wars.txt
# 拆分为 1000 列表方便 cloudflare 导入
grep '127.0.0.1' ad-wars.txt | grep -v '#' | awk '{print $2}' | sort -u | split -l 1000 -d --additional-suffix '.csv' - ad-wars-
```

---

- https://whotracks.me/trackers/adguard.html

## Protocol

| nmae                     | abbr.    |
| ------------------------ | -------- |
| DNS-over-UDP/53          | Do53     |
| DNS-over-TCP/53          | Do53/TCP |
| DNSCrypt                 |          |
| DNS-over-TLS             | DoT      |
| DNS-over-HTTPS           | DoH      |
| DNS-over-TOR             |          |
| Oblivious DNS-over-HTTPS | ODoH     |

- Oblivious DNS over HTTPS - ODoH
  - 避免 Provider 感知到用户 IP - 类似 anonymized DNScrypt
  - https://blog.cloudflare.com/oblivious-dns/
  - https://tools.ietf.org/html/draft-pauly-dprive-oblivious-doh-03
  - [cloudflare/odoh-go](https://github.com/cloudflare/odoh-go)

```bash
# Resolve
# dig - bind-utils
dig wener.me @114.114.114.114
dig wener.me @114.114.114.114 +tcp
# DoH
# knot-dnsutils
kdig -d @8.8.8.8 +tls-ca +tls-host=dns.google.com wener.me
# 直接强求 DoH
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

- Google
  - IPv4
    - 8.8.8.8
    - 8.8.4.4
  - IPv6
    - 2001:4860:4860::8888
    - 2001:4860:4860::8844
  - DoH - https://dns.google/dns-query
  - DoT - tls://dns.google
- Cloudflare
  - IPv4
    - 1.1.1.1
    - 1.0.0.1
  - IPv6
    - 2606:4700:4700::1111
    - 2606:4700:4700::1001
  - DoH - https://dns.cloudflare.com/dns-query
  - DoT - tls://1dot1dot1dot1.cloudflare-dns.com
- Cloudflare Malware blocking
  - IPv4
    - 1.1.1.2
    - 1.0.0.2
  - IPv6
    - 2606:4700:4700::1112
    - 2606:4700:4700::1002
  - DoH - https://security.cloudflare-dns.com/dns-query
  - DoT - tls://security.cloudflare-dns.com
- Cloudflare Malware and adult content blocking
  - IPv4
    - 1.1.1.3
    - 1.0.0.3
  - IPv6
    - 2606:4700:4700::1113
    - 2606:4700:4700::1003
  - DoH - https://family.cloudflare-dns.com/dns-query
  - DoT - tls://family.cloudflare-dns.com
- 114
  - IPv4
    - 114.114.114.114
    - 114.114.115.115
  - Safe - Block phishing, malcious and other unsafe websites
    - 114.114.114.119
    - 114.114.115.119
  - Family - block adult websites and inappropriate contents
    - 114.114.114.110
    - 114.114.115.110
- Ali
  - IPv4
    - 223.5.5.5
    - 223.6.6.6
  - IPv6
    - 2400:3200::1
    - 2400:3200:baba::1
  - DoH - https://dns.alidns.com/dns-query
  - DoT - tls://dns.alidns.com

---

- https://kb.adguard.com/general/dns-providers

## 污染封禁域名列表

> 不要走国内解析

```
facebook.com
github.com
github.io
goog
google
google.com
hbo.com
imdb.com
instagram.com
jp
medium.com
mega.nz
netflix.com
nintendo.com
nordvpn.com
pornhub.com
quora.com
rarbg.to
rarbgprx.org
reddit.com
slack.com
spotify.com
t.co
telegram.org
thepiratebay.org
twitter.com
uk
whatsapp.com
wikileaks.org
wikipedia.org
wikiquote.org
wsj.com
xvideos.com
youtube.com
```

<!--
a=``
copy(`/${a.split(/\n/).join('/')}/`)
-->

- [中华人民共和国被封锁网站列表](https://zh.wikipedia.org/wiki/中华人民共和国被封锁网站列表)
- https://github.com/paulmillr/encrypted-dns
