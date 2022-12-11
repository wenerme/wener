---
title: 推荐默认设置
---

# Linux 推荐默认设置

```txt title="/etc/security/limits.d/default.conf"
* hard nofile 65536
* soft nofile 4096
```

```txt title="/etc/modprobe.d/default.conf"
configfs
```

