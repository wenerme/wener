---
title: rustdesk
---

# rustdesk

- [rustdesk/rustdesk](https://github.com/rustdesk/rustdesk)
- https://github.com/rustdesk/rustdesk/issues/3565
  - sciter -> flutter_desktop

# FAQ

## Unsupported Display server, X11 or Wayland expected

- 使用 flatpak 时出现
- https://github.com/rustdesk/rustdesk/issues/670
- 新版本支持了 Wayland
- 不支持情况
  - `/etc/gdm3/custom.conf`
    - WaylandEnable=false
- 不支持 xwayland
- https://github.com/rustdesk/rustdesk/issues/5949
  - https://github.com/flatpak/xdg-desktop-portal
  - https://flatpak.github.io/xdg-desktop-portal/docs/doc-org.freedesktop.portal.RemoteDesktop.html

```bash
# systemd?
apk add elogind
loginctl
```
