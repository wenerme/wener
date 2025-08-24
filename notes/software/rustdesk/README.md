---
title: rustdesk
---

# rustdesk

:::tip

为什么选择 RustDesk?

- 免费
- 无任何限制，链接数量，用户等
- 功能完善 - 远程桌面、文件传输、端口转发、摄像头、可选的用户管理
- 支持所有的平台 - Windows、macOS、移动端
- 可以自己部署的中继服务器

:::

- [rustdesk/rustdesk](https://github.com/rustdesk/rustdesk)
  - AGPLv3, Rust
- https://github.com/rustdesk/rustdesk/issues/3565
  - sciter -> flutter_desktop
- 21115: TCP
  - Relay, Session
  - hbbs
- 21116: TCP
  - hbbr
  - 文件、流量中继
  - rendezvous server

## Awesome

- [kingmo888/rustdesk-api-server](https://github.com/kingmo888/rustdesk-api-server)
  - Python
  - 基于Django的RustDesk Api&Web Server，除了支持api所有功能，还支持web注册、管理、展示等。
- [v5star/rustdesk-api](https://github.com/v5star/rustdesk-api)
  - PHP
- [lejianwen/rustdesk-api](https://github.com/lejianwen/rustdesk-api)
  - MIT, Go
  - Api Server, web admin ,web client, web client v2
- API Server
  - [xiaoyi510/rustdesk-api-server](https://github.com/xiaoyi510/rustdesk-api-server)
    - Go 语言实现，可以参考 API
  - [lantongxue/rustdesk-api-server-pro](https://github.com/lantongxue/rustdesk-api-server-pro)
    - AGPLv3, TS, Vue, Go
  - [lantongxue/rustdesk-api-server](https://github.com/lantongxue/rustdesk-api-server)
    - PHP
- [danbai225/go-rustdesk-server](https://github.com/danbai225/go-rustdesk-server)
  - Golang 实现的 Rustdesk Server

## Client

- ID Server
- Relay Server
- API Server
- Key
- hbbs - 中继
- hbbr - 反向
- ~/Library/Preferences/com.carriez.RustDesk
  - RustDesk.toml
  - RustDesk2.toml
  - RustDesk_lan_peers.toml
  - RustDesk_local.toml
  - peers.toml
  - `peers/*.toml`

```toml title="RustDesk2.toml"
rendezvous_server = 'hbbs.example.com:21116'
nat_type = 1
serial = 0

[options]
local-ip-addr = '192.168.1.2'
custom-rendezvous-server = 'hbbs.example.com'
key = 'HBBS-KEY'
relay-server = 'hbbs.example.com'
audio-input = 'MacBook Pro Microphone'
```

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

## No Display

- 当前没有显示器
- Windows 使用 MSI 安装
  - 使用管理员，允许无用户的情况下运行
- 其他解决方案
  - Headless Ghost HDMI 转接头
  - 虚拟显示驱动
