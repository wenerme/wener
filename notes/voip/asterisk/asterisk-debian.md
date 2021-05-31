---
title: Asterisk Debian
---

# Asterisk Debian

- Why ?
  - Asterisk 对 AlpineLinux musl 兼容不好 - 偶尔会出现 segfault
  - debian glibc, 包持续维护
    - 缺点 - 不是最新 LTS, debian 10 和 11 都是 asterisk 16
- debian asterisk [tracker](https://tracker.debian.org/pkg/asterisk)
- packages [asterisk](https://packages.debian.org/search?keywords=asterisk)

## 源码安装

```bash
apt update && apt upgrade
apt install gcc g++ make patch libedit-dev uuid-dev libxml2-dev libsqlite3-dev libssl-dev
cd /usr/src/ && wget https://downloads.asterisk.org/pub/telephony/asterisk/asterisk-18-current.tar.gz
tar -xzf asterisk-18.*
cd asterisk-18.*

# contrib 可选
# 拉取 res_mp3 源码
# contrib/scripts/get_mp3_source.sh
# contrib/scripts/install_prereq install

./configure --with-jansson-bundled
make menuselect

make && make all && make install
# 可选
make samples
make progdocs

# init 脚本
make config

systemctl start asterisk
systemctl enable asterisk

asterisk -rvvv
```
