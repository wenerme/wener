---
title: Debian FAQ
tags:
  - FAQ
---

# Debian FAQ

## 查找文件所属包

```bash
dpkg -S /usr/lib/asterisk/modules/codec_opus_open_source.so
```

## 使用 backports

```bash
# 从 backport 安装单个包
apt-get install asterisk/buster-backports

# 从 backport 安装
apt-get install -t buster-backports asterisk
```
