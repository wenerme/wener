---
title: VNC Awesome
tags:
  - Awesome
---

# VNC Awesome


```bash
# macOS
open vnc://127.0.0.1:5900
```

[vnc]: https://en.wikipedia.org/wiki/Virtual_Network_Computing

- 协议
  - [VNC]/[RFB](https://github.com/rfbproto/rfbproto/blob/master/rfbproto.rst)/Remote Frame Buffer
  - RDP
  - Spice
- [apache/guacamole-server](https://github.com/apache/guacamole-server)
  - clientless remote desktop gateway
  - VNC, SSH, Telnent
  - 基础依赖: Cairo, libjpeg-turbo/libjpeg, libpng, OSSP UUID
  - 功能依赖:
    - FreeRDP
    - SSH - libssh2, OpenSSL, Pango
    - SFTP - libssh2, OpenSSL
    - WebP - libwebp
    - guacenc - FFmpeg
    - libtelnnet, Pango
    - libVNCserver - PulseAudio
- [TigerVNC/tigervnc](https://github.com/TigerVNC/tigervnc)
  - GPLv2, C++, Java
  - Client+Server
  - `brew install tiger-vnc`
- [TurboVNC/turbovnc](https://github.com/TurboVNC/turbovnc)
  - GPLv2, C, Java
  - Client+Server
  - 基于 TightVNC
  - `brew install turbovnc-viewer` - Cask
- realvnc
  - Client+Server
  - `brew install vnc-server`
  - `brew install vnc-viewer`
- Library
  - libvnc
  - libvncserver
- Client
  - [novnc/noVNC](https://github.com/novnc/noVNC)
    - JS
    - Web 渲染 VNC
  - gtk-vnc
  - tiger-vnc x11vnc vnu znc
  - vncsnapshot
    - VNC 截屏、快照
  - tigervnc-viewer
  - vlc vnc-viewer
  - 商业/收费
    - jollysfastvnc
- Server
  - [FreeRDP/FreeRDP](https://github.com/FreeRDP/FreeRDP)
    - Apache-2.0, C
    - [FreeRDP/FreeRDP-WebConnect](https://github.com/FreeRDP/FreeRDP-WebConnect)
    - [cedrozor/myrtille](https://github.com/cedrozor/myrtille)
      - Apache-2.0, C#
      - Web 客户端
  - [LibVNC/x11vnc](https://github.com/LibVNC/x11vnc)
    - GPL-2.0, C
    - `brew install x11vnc`
    - VNC server for real X displays
  - [LibVNC/libvncserver](https://github.com/LibVNC/libvncserver)
    - GPL-2.0, C
    - [Projects using LibVNCServer/LibVNCClient](https://libvnc.github.io/#projects-using)
  - TightVNC
  - ultravnc
  - http://xpra.org/
  - http://winswitch.org/downloads/
  - http://www.karlrunge.com/x11vnc/
    - x11vnc -id {replace-by-window-id}
- [Remmina/Remmina](https://gitlab.com/Remmina/Remmina)
   - GTK Client
   - RDP, VNC, SPICE, X2Go, SSH
- [mitchellh/go-vnc](https://github.com/mitchellh/go-vnc)
  - [kward/go-vnc](https://github.com/kward/go-vnc)
- 相关技术
  - https://gist.github.com/rgl/284d7a56d839e503fd953c110b9cee13
    - take a screenshot of a specific Windows application window in pure Go
  - [vova616/screenshot](https://github.com/vova616/screenshot)
    - cross-platform pure Go screen shot library
  - http://go-lang.cat-v.org/library-bindings

## Virtual

```bash
# QEMU
qemu-system-x86_64 -vnc :1,websocket -M accel=hvf
# 需要 wss
# https://novnc.com/noVNC/vnc.html?host=127.0.0.1&port=5701&path=
```
