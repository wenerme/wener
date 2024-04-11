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
```
