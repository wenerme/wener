---
tags:
  - Desktop
---

# Alpine Desktop

- setup-desktop
  - xfce
    - setup-xorg-base, xfce4, xfce4-terminal, xfce4-screensaver
    - lightdm
    - elogind, polkit-elogind, gvfs
  - xfce-wayland
    - setup-wayland-base, xfce4, xfce4-terminal, xfce4-screensaver
    - greetd
    - labwc
    - elogind, polkit-elogind, gvfs
  - mate
    - setup-xorg-base, mate-desktop-environment
    - lightdm
    - polkit, dbus, dbus-x11, gvfs
  - lxqt
    - setup-xorg-base, lxqt, lxqt-qtplugin
    - lightdm
    - lxqt-desktop, lximage-qt, pavucontrol-qt
    - openbox
    - sddm
    - elogind, polkit-elogind, gvfs, udisks2
  - gnome
    - setup-wayland-base, gnome gnome-apps-core
    - gdm
  - plasma
    - setup-wayland-base, plasma-desktop-meta, kde-applications-base
    - sddm
  - sway
    - setup-wayland-base
    - sway (平铺式 Wayland 合成器), foot (终端模拟器), i3status (状态栏), grim (截图工具), swaylockd (锁屏), wmenu (应用启动器)
    - 不需要传统的显示管理器
    - 从 TTY 通过 sway 命令直接启动
  - https://gitlab.alpinelinux.org/alpine/alpine-conf/-/blob/master/setup-desktop.in
  - rc-update del acpid
    - 由 elogind 处理
- 组 audio, video, netdev


```bash
# sway
# 会默认安装 firefox
setup-desktop sway
apk add icu-data-full
```
