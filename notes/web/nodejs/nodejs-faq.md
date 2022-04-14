---
title: NodeJS FAQ
tags:
  - FAQ
---

# NodeJS FAQ

## 直接执行 typescript 或 esnext

```bash
node -r @ts-node/register app.ts
node -r @babel/register app.js
```

## Package 'OpenEXR', required by 'vips', not found

找不到 brew 安装的 pkgconfig

```bash
PKG_CONFIG_PATH=/usr/local/opt/vips/lib/pkgconfig:/usr/local/opt/glib/lib/pkgconfig:/usr/local/opt/openexr/lib/pkgconfig:/usr/local/opt/imath/lib/pkgconfig npm i
```

```
/usr/local/include/vips/vips8:35:10: fatal error: 'glib-object.h' file not found
```

```bash
# export CC
export CXX="$(which g++) -I/usr/local/opt/glib/include/glib-2.0/ -I/usr/local/opt/glib/lib/glib-2.0/include/"

export CXX="$(which g++) $(pkg-config --cflags glib-2.0)"
```

## libtool: unrecognized option -static when building

```bash
brew unlink libtool
rm -rf /usr/local/bin/libtool
which libtool

# 如果添加了 /usr/local/opt/libtool/libexec/gnubin
export PATH=$(echo $PATH | sed -r 's/:[^:]*?libtool[^:]*:/:/')
```

## require() of ES modules is not supported

尝试降级依赖

- ts 可配置 "module": "esnext"
- 然后 package.json 修改 type: module
  - 影响很大
- 参考
  - [node-fetch/node-fetch#1266](https://github.com/node-fetch/node-fetch/issues/1266)
