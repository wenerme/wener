---
title: Alpine Aports
tags:
  - OS
  - Alpine
  - Build
---

# Alpine Aports

```bash
addgroup admin abuild
addgroup admin ping
mkdir -p /build /var/cache/distfiles
chgrp abuild /build /var/cache/distfiles
chmod g+w /build /var/cache/distfiles

# NOTE use admin as default password for ssh
echo admin:admin | chpasswd

mkdir /etc/apk/cache

cd /build
git clone https://github.com/wenerme/repository
git clone https://gitlab.alpinelinux.org/alpine/aports
```
