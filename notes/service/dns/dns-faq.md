---
title: DNS FAQ
tags:
  - FAQ
---

# DNS FAQ

- apex domain
  - 不含子域名
  - 有 SOA 记录
  - 域的顶级 记录/节点
  - apex=origin
- https://www.rfc-editor.org/rfc/rfc7719 "DNS Terminology"
- 阿里云 URL 记录 - 会隐含 A 记录
  - 显性 URL - Location 头
  - 隐性 URL - 使用 iframe

## CNAME 和 TXT 不能共存

- RFC1034

> If a CNAME RR is present at a node, no other data should be present

- 但可以有 A 记录
- 或者尝试用 ALIAS - 不是所有都支持,不是标准记录
  - PowerDNS
  - bind9
  - dnsimple [What’s an ALIAS record?](https://support.dnsimple.com/articles/alias-record/#whats-an-alias-record)

## 清除 DNS 缓存 / Clear DNS cache

```bash
# macOS
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder

# Windows
ipconfig /flushdns
```

- chrome://net-internals/#dns
  - 清除 DNS 缓存
- chrome://net-internals/#sockets
  - 清除链接 - 因为还是打开的之前的地址

## PiHole vs AdGuard

- PiHole
  - 完全控制
- AdGuard
  - 使用更简单

---

- https://github.com/AdguardTeam/AdguardHome#how-does-adguard-home-compare-to-pi-hole

## usercontent

- To C 场景运行 UGC 时需要考虑
- Thanks HN: Lessons learned after Google nearly killed my site
  [HN](https://news.ycombinator.com/item?id=26357033)

## @

- placeholder = the current domain/current origin
- https://datatracker.ietf.org/doc/html/rfc1035#page-35
