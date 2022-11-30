---
title: x11vnc
---

# x11vnc

- [LibVNC/x11vnc](https://github.com/LibVNC/x11vnc)
  - GPL-2.0, C
  - `brew install x11vnc`
  - VNC server for real X displays
- $HOME/.x11vncrc
  - -norc
- http://www.karlrunge.com/x11vnc

```bash
# 默认密码文件
x11vnc -storepasswd vnc ./passwd
x11vnc -forever -shared -ncache 10 -display :1 -wait 20 -rfbauth passwd -rfbport 5901

x11vnc -create \
  -env FD_PROG=/usr/bin/fluxbox \
	-env X11VNC_FINDDISPLAY_ALWAYS_FAILS=1 \
  -env X11VNC_CREATE_GEOM=${1:-1920x1080x32} \
  -gone 'killall Xvfb' \
  -forever -shared \
  -o /var/log/x11vnc.log \
  -bg -nopw
```

- -auth $XAUTHORITY
  - XAUTHORITY
  - -auth guess
    - -findauth
- -rfbauth $RFB_PASSWORD_FILE
- id windiwid
  - xrandr
  - 使用 xwininfo 选取窗口
- sid windowid
  - shift root view
  - 裁剪
- clip WxH+X+Y
- scale fraction
  - geometry WxH
- viewonly
- shared
- once
- forrever
  - =many
- nevershared
- timeout n
- sleepin
- tightfilexfer
- ultrafilexfer
- connect
  - reverse conn
  - proxy
- vncconnect
  - VNC_CONNECT
- allow
- input
  - K - Keystroke
  - M - Mouse
  - B - Button Click
  - C - Clipboard
  - F - File transfer - ultravnc
- viewpasswd
- passwdfile
- showrfbauth
- FD_XDM=1
- XDM/GDM/KDM
- ~/.Xauthority

# FAQ

## x11vnc 1280x12288

因为 `-ncache 10`

大多客户端都不支持 Client Side Cacheing

- https://github.com/LibVNC/x11vnc/blob/master/doc/FAQ.md#q-79-can-x11vnc-do-client-side-caching-of-pixel-data-ie-so-when-that-pixel-data-is-needed-again-it-does-not-have-to-be-retransmitted-over-the-network
