---
title: Debian FAQ
tags:
  - FAQ
---

# Debian FAQ

- slim
  - 100MB -> 30 - 70MB
  - 移除 /usr/share/{doc,man,locale}


## mirror


```bash
# Mirror
cp /etc/apt/sources.list  /etc/apt/sources.list.origin
# VERSION_CODENAME=$(sed -nr 's/VERSION.*\((.*)\).*/\1/p' /etc/os-release)
source /etc/os-release
echo "# Use Aliyun ubuntu mirror
deb http://mirrors.aliyun.com/debian/               $VERSION_CODENAME main non-free contrib
deb http://mirrors.aliyun.com/debian/               $VERSION_CODENAME-proposed-updates main non-free contrib
deb-src http://mirrors.aliyun.com/debian/           $VERSION_CODENAME main non-free contrib
deb-src http://mirrors.aliyun.com/debian/           $VERSION_CODENAME-proposed-updates main non-free contrib
" > /etc/apt/sources.list

echo "deb http://mirrors.aliyun.com/debian $VERSION_CODENAME-backports main" > /etc/apt/sources.list.d/backports.list
```

<!--
deb http://mirrors.aliyun.com/debian-security/      $VERSION_CODENAME/updates main non-free contrib
deb-src http://mirrors.aliyun.com/debian-security/  $VERSION_CODENAME/updates main non-free contrib
-->

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

## non-free

- non-free-firmware
  - 2022
  - firmware-iwlwifi, firmware-amd-graphics, firmware-misc-nonfree
