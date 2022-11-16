---
title: x11vnc
---

# x11vnc

- [LibVNC/x11vnc](https://github.com/LibVNC/x11vnc)
  - GPL-2.0, C
  - `brew install x11vnc`
  - VNC server for real X displays

```bash
# 默认密码文件
x11vnc -storepasswd vnc ./passwd
x11vnc -forever -shared -ncache 10 -display :1 -wait 20 -rfbauth passwd -rfbport 5901
```

# FAQ

## x11vnc 1280x12288

因为 `-ncache 10`
