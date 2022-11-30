---
title: Xvfb
---

# Xvfb

```bash
# docker run --rm -it -v $PWD:/host -w /host -p 5701:5701 --name vnc wener/base
apk add xvfb xdpyinfo
Xvfb :1

Xvfb :1 -screen 0 1280x1024x24
xdpyinfo -display :1 # 判断是否启动成功

#
export DISPLAY=:1

apk add fluxbox
fluxbox -display :1 &

apk add glib
apk add -X https://mirrors.sjtug.sjtu.edu.cn/alpine/edge/testing wmctrl
wmctrl -m

# 默认密码文件
x11vnc -storepasswd vnc ./passwd
# https://novnc.com/noVNC/vnc.html?host=localhost&port=5901&path=&encrypt=0
x11vnc -forever -shared -ncache 10 -display :1 -wait 20 -rfbauth passwd -rfbport 5901
```

```bash
file /tmp/.X11-unix/X1 # socket
```

- XDMCP
- XKB
- X DAMAGE
- -shmem
  - fb in shared memory
- -fbdir directory
  - fb in mmap

## chrome

```bash
dbus-uuidgen > /etc/machine-id

# reset dir
rm -rf $HOME/.cache/chromium
rm -rf $HOME/.config/chromium

apk add chromium

/usr/bin/chromium-browser ${EXTRA_CHROME_OPTION} \
  --purge-memory-button \
  --clear-token-service \
  --disable-3d-apis \
  --disable-accelerated-video \
  --disable-background-mode \
  --disable-gpu \
  --disable-infobars \
  --disable-metrics \
  --disable-preconnect \
  --disable-software-rasterizer \
  --disable-speech-api \
  --disable-sync \
  --disable-sync-app-list \
  --disable-translate \
  --disable-voice-input \
  --disable-webgl \
  --disable-web-security \
  --force-device-scale-factor=1 \
  --ignore-certificate-errors \
  --load-extension=/home/chrome/plugin \
  --no-first-run \
  --no-pings \
  --no-sandbox \
  --reset-variation-state \
  --user-data-dir \
  --window-position=0,0 \
  --window-size=1280,1024 \
  https://wener.me
```
