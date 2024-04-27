---
title: ARP
---

# ARP

- arpd
  - 管理 ARP 缓存 - 避免在网络上因为频繁的 ARP 广播请求而导致的性能问题
  - 网络优化
  - 安全 - 检测和防御 ARP 欺骗攻击
- 参考
  - [royhills/arp-scan](https://github.com/royhills/arp-scan)

```bash
# 所有 hosts
arp -a

# /etc/arp-scan/mac-vendor.txt
# /usr/share/arp-scan/ieee-oui.txt
# arp-fingerprint arp-scan get-iab get-oui
apk add arp-scan

# IP -> MAC
sudo arp-scan 192.168.1.1
sudo arp-scan 192.168.1.0/24
```
