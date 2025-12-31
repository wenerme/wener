---
title: Linux IPv6 配置 (IPv6 Configuration)
tags:
  - Linux
  - Network
  - IPv6
---

# Linux IPv6 配置 (IPv6 Configuration) {#linux-ipv6-configuration}

## 禁用 IPv6 (Disable IPv6) {#disable-ipv6}

- Kernel boot argument: `ipv6.disable=1`
- sysctl:

```bash
sysctl net.ipv6.conf.all.disable_ipv6
sysctl net.ipv6.conf.default.disable_ipv6

# Per interface
# net.ipv6.conf.<device>.disable_ipv6
cat /proc/sys/net/ipv6/conf/all/disable_ipv6
```
