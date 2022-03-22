---
title: DNS FAQ
tags:
  - FAQ
---

# DNS FAQ

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
