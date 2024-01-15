---
tags:
  - FAQ
---

# Desktop FAQ

- https://wiki.alpinelinux.org/wiki/Intel_Video

```bash
export MESA_LOADER_DRIVER_OVERRIDE=crocus
# newer
export MESA_LOADER_DRIVER_OVERRIDE=iris
```

- xf86-video-intel
  - intel-media-driver
- gst-vaapi

## detect x11 or wayland

```bash
# x11,wayland
echo $XDG_SESSION_TYPE

echo $WAYLAND_DISPLAY # wayland
echo $DISPLAY         # x11

loginctl
# loginctl show-session <SESSION_ID> -p Type

xdpyinfo
```

## Unlock keyring

lightdm autologin 要求 keyring 为 空

```bash
apk add gnome-keyring
# Passwords and Keys 管理应用
apk add seahorse
```

- https://wiki.archlinux.org/title/LightDM#Enabling_autologin
