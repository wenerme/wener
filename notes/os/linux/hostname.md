---
title: hostname
---

# hostname

- /etc/hostname
- 参考
  - https://en.wikipedia.org/wiki/Hostname#Restrictions_on_valid_host_names
  - `[0-9a-z][0-9a-z.-]{,254}`

```bash
cat /etc/hostname
hostname

# AlpineLinux
# https://github.com/alpinelinux/alpine-conf/blob/master/setup-hostname.in
setup-hostname $HOST
# 等同于
echo "$HOST" > "$ROOT/etc/hostname"

# CentOS/RHEL
hostnamectl set-hostname server01
# 或编辑 /etc/hostname，不支持 hostnamectl 时手动修改
# /etc/hosts 和 /etc/sysconfig/network 中的 HOSTNAME= 也需保持一致
```
