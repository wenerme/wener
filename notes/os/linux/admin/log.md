---
title: Logging
---

# Linux Logging

- /dev/log
- /dev/kmsg -> dmesg
- /proc/kmsg

## 文件

- /var/log/messages 或 /var/log/messages
  - 由 syslog 写入
- /var/log/dmesg
  - Alpine 下 bootmisc 通过 `dmesg > /var/log/dmesg` 创建
- /var/log/auth.log
  - Debian
- /var/log/secure
  - CentOS
- /var/log/kern.log
- /var/log/cron

---

- https://superuser.com/a/734328/242730
