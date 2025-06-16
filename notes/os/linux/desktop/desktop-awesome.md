---
title: Desktop Awesome
tags:
  - Awesome
---

# Desktop Awesome

- XDG - X Design Group
- [specifications.freedesktop.org](https://specifications.freedesktop.org)
  - [Sound Theme Specification](https://specifications.freedesktop.org/sound-theme-spec/sound-theme-spec-latest.html)
  - [dbus-specification](https://dbus.freedesktop.org/doc/dbus-specification.html)
- gnome [DraftSpecs](https://wiki.gnome.org/DraftSpecs)
  - [Thumbnail management DBus specification](https://wiki.gnome.org/DraftSpecs/ThumbnailerSpec)
- https://regolith-linux.org/
- [Xpra-org/xpra](https://github.com/Xpra-org/xpra)
  - GPLv2, Python
  - XPra - screen for X - Persistent remote applications for X11
  - screen sharing for X11, MacOS and MSWindows
  - https://xpra.org/
  - [Xpra-org/xpra-html5](https://github.com/Xpra-org/xpra-html5)
    - https://xpra.org/html5/connect.html
- Screensaver
  - [sandydoo/flux](https://github.com/sandydoo/flux)
    - macOS Drift screensaver
- DE/Desktop Environment/桌面环境
  - Xfce
  - LXDE - Lightweight X11 Desktop Environment
    - 建议使用 LXQt 替代
  - LXQt
  - Unity
    - by Canonical for Ubuntu
    - 2017 停止 - Ubuntu 18.04 使用 GNOME
    - 由 UBPorts 作为 Lomiri 继续开发
  - [Comparison of X Window System desktop environments](https://en.wikipedia.org/wiki/Comparison_of_X_Window_System_desktop_environments)

| DE         | Adopted by                                      |
| ---------- | ----------------------------------------------- |
| GNOME      | Fedora Workstation, Ubuntu, Debian, Pop!\_OS    |
| KDE Plasma | KDE Neon, openSUSE, Kubuntu, Manjaro KDE        |
| XFCE       | Xubuntu, Linux Mint (XFCE Edition), EndeavourOS |
| MATE       | Ubuntu MATE, Linux Mint (MATE Edition)          |
| LXQt       | Lubuntu                                         |
| Sway       |

## Windowing System

- [X11](./x11/README.md)
  - 1984-06
- Wayland
  - v1.0 @ 2012
  - rootless
  - EGL-based
  - adopted by:
    - fedora v25, ubuntu 21.04, rhel v8 @2019, debian
    - pmOS, rpi
- macOS/iOS Quartz
  - NeXT, NeXTSTEP, Mac OS X
- Plan 9 rio
- Android SurfaceFlinger, EGL for 3D
- Network
  - VNC
    - [x11vnc](./x11/x11vnc.md)
  - RDP
  - Citrix XenApp
- 虚拟
  - [xvfb](./x11/xvfb.md)
- XQuartz
  - runs X applications in macOS’s native windowing system
- XWayland
  - X Server running as a Wayland client
- X.Org Server
  - by X.Org Foundation
  - 实现 X Window System display server

## Window Manager

- EWMH [Extended Window Manager Hints](https://specifications.freedesktop.org/wm-spec/wm-spec-1.5.html)
  - blackbox >= 0.70
  - icewm
  - kwin - KDE
  - metacity - GNOME
  - openbox >= 3
  - sawfish
  - fvwm
  - waimea
  - pekwm
  - enlightenment
  - xfce >= 4
  - fluxbox >= 0.9.6
  - matchbox
  - window maker >= 0.91
- [baskerville/bspwm](https://github.com/baskerville/bspwm)
  - BSD-2-Clause, C
  - tiling
- [fluxbox/fluxbox](https://github.com/fluxbox/fluxbox)
  - MIT, C++
  - 基于 Blackbox
  - lightweight and highly-configurable window manager
- wmctrl
  - interact with an EWMH/NetWM compatible X Window Manager
- compiz
- beryl
- awesome
  - 基于 dwm
  - dwm fork with XCB, EWMH, Lua script, Xft, D-Bus, multihead.
- i3
  - wmii fork with XCB, multihead, vertical column, command mode
- http://suckless.org/
  - http://dwm.suckless.org/

## Themes

- https://www.pling.com/
- https://www.xfce-look.org/

# FAQ

- /usr/share/applications/micro.desktop
- /usr/share/icons/hicolor/scalable/apps/micro-logo.svg
