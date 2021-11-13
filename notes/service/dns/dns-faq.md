---
title: DNS FAQ
tags:
  - FAQ
---

# DNS FAQ

## 清楚 DNS 缓存 / Clear DNS cache

```bash
# macOS
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder

# Windows
ipconfig /flushdns
```
