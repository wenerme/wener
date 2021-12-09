---
title: KSMBD
---

# KSMBD

- Linux 5.15 in-knernel smbd
  - by Samsung
  - CONFIG_SMB_SERVER
  - 主要实现性能相关特性到内核
    - RDMA for SMB Direct
- [Documentation/filesystems/cifs/ksmbd](https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/tree/Documentation/filesystems/cifs/ksmbd.rst)
- [cifsd-team/ksmbd-tools](https://github.com/cifsd-team/ksmbd-tools)
  - ksmbd.addshare
  - ksmbd.adduser
  - ksmbd.control
  - ksmbd.mountd

```bash
apk add ksmbd-tools

modprobe ksmbd
mkdir /etc/ksmbd
# /etc/ksmbd/users.db
ksmbd.adduser -a admin

# https://github.com/cifsd-team/ksmbd-tools/blob/master/smb.conf.example
touch /etc/ksmbd/smb.conf
ksmbd.addshare -a myshare -o "guest ok = yes, writable = yes, path = /mnt/data"

ksmbd.mountd

ksmbd.control -s  # stop
rmmod ksmbd       # unload module

ksmbd.control -d "all"  # debug all
ksmbd.control -d "smb"  # debug smb
```
