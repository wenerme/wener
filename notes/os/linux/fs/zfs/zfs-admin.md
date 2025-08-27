---
tags:
- Admin
---

# ZFS 管理

```bash
ZPOOL_CACHE="/etc/zfs/zpool.cache"
```

**zfs-import**

```bash
modprobe zfs

# In case not shutdown cleanly.
rm -f /etc/dfs/sharetab

# 已经导入的
zpool list -H -oname
# 可导入的
zpool import

zpool import -d /dev/disk/by-id
```
