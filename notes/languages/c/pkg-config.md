---
title: pkg-config
---

# pkg-config

- .pc
- PKG_CONFIG_PATH
  - /usr/local/Homebrew/Library/Homebrew/os/mac/pkgconfig
  - /usr/lib/pkgconfig
  - /usr/local/lib/pkgconfig
  - /usr/lib/pkgconfig

```bash
# /usr/local/bin/pkg-config - brew
which pkg-config

pkg-config --list-all

# 自定义目录
PKG_CONFIG_PATH=/usr/local/opt/openexr/lib/pkgconfig:/usr/local/opt/imath/lib/pkgconfig pkg-config --libs OpenEXR

# 所有 brew 的 pkgconfig
echo /usr/local/opt/*/lib/pkgconfig | tr ' ' ':'
```
