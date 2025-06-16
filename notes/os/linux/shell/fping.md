---
title: fping
---

# fping

```bash
# -l 一直循环 - 类似普通 ping
fping -l 192.168.1.1
# 显示错误的
fping baidu.com 223.5.5.5 223.6.6.6 8.8.8.8 1.1.1.1 120.53.53.53 1.12.12.21 -l --timestamp-format=rfc3339 -D | grep -v '64 bytes'
```
