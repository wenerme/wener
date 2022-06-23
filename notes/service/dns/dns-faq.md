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
  - 显性URL - Location 头
  - 隐性URL - 使用 iframe

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

## PiHole vs AdGuard

- PiHole
  - 完全控制
- AdGuard
  - 使用更简单

---

- https://github.com/AdguardTeam/AdguardHome#how-does-adguard-home-compare-to-pi-hole
