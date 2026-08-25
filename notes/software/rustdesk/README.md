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

| port  | protocol | service                                 |
| ----- | -------- | --------------------------------------- |
| 21114 | TCP      | Web Console（RustDesk Server Pro）      |
| 21115 | TCP      | NAT 类型检测（`hbbs`）                  |
| 21116 | TCP/UDP  | ID 注册、心跳、打洞与连接协调（`hbbs`） |
| 21117 | TCP      | 中继服务（`hbbr`）                      |
| 21118 | TCP      | WebSocket ID/信令服务（`hbbs`）         |
| 21119 | TCP      | WebSocket 中继服务（`hbbr`）            |

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

## Conf

- ~/Library/Preferences/com.carriez.RustDesk/RustDesk.toml
- ~/Library/Preferences/com.carriez.RustDesk/RustDesk2.toml
- %AppData%\RustDesk\config\RustDesk.toml
- ~/.config/rustdesk/RustDesk.toml

```bash
# macOS key
ioreg -rd1 -c IOPlatformExpertDevice | grep IOPlatformUUID
```

- crypto_secretbox_open_easy

## CLI

- /Applications/RustDesk.app/Contents/MacOS/RustDesk

| 用法                   | 作用                                 | 备注                                                                             |
| ---------------------- | ------------------------------------ | -------------------------------------------------------------------------------- |
| `--connect <ID>`       | 普通远程桌面控制                     |                                                                                  |
| `--file-transfer <ID>` | 直接进入文件传输                     | 不打开普通桌面控制界面                                                           |
| `--view-camera <ID>`   | 查看远端摄像头                       | 当前源码已加入                                                                   |
| `--port-forward <ID>`  | 打开 TCP Port Forward / Tunnel 模式  | CLI parser 本身只直接读取 ID，具体端口通常再由 UI/session 配置                   |
| `--terminal <ID>`      | 打开远程 Terminal 会话               | 当前新版源码已有                                                                 |
| `--rdp <ID>`           | 以 RDP 模式连接                      | RustDesk 的 RDP 本质基于 TCP tunnel/port forwarding，并不是自己实现一套 RDP 协议 |
| `--play <arg>`         | `play` 类型的内部/deep-link 会话入口 | 官方文档没有把它作为稳定公开 CLI 完整说明，不建议依赖其参数细节                  |

```bash
# macOS
alias rustdesk='/Applications/RustDesk.app/Contents/MacOS/RustDesk'

rustdesk --connect 123456789
rustdesk --connect '123456789@rd-a.example.com:21116?key=YOUR_KEY'

# macOS Open URL
open 'rustdesk://connect/123?password=xxx&relay=true'
```

```
rustdesk://connect/123?password=xxx&relay=true
# /r force relay
123456789/r@public

rustdesk://terminal/<ID>
```

- rendezvous Server 21116
- 附加参数可以作为 ID query
  - --password PASS
  - --relay
  - --switch_uuid UUID - 内部会话切换参数
- 如果只有 --password，那么是修改本地的 Password

**管理**

- --get-id
- --set-id
- --password PASS - 设置密码
- --set-unlock-pin PIN
- --config CONFIG
- --import-config RustDesk.toml
- --option KEY VALUE
- --server
- --tray
- --cm - Connection Manager
- --whiteboard
- --update DMG

**Service**

```
--service
--install-service
--uninstall-service
--check-hwcodec-config
--terminal-helper
--remove
```

## Terminal

- rust portable_pty
- Windows pwsh.exe, Windows PowerShell, cmd.exe
- 持久化 terminal-persistent=Y

```bash
# Guest
rustdesk --option enable-terminal Y
# Host
rustdesk --terminal 123456789
```

## Web

- 官方
  - https://rustdesk.com/web
  - ~~Web Client V1~~
  - Web Client V2
- [marcpope/cortendesk](https://github.com/marcpope/cortendesk)
  - TS
- [UNITRONIX/BetterDesk](https://github.com/UNITRONIX/BetterDesk)
  - JS Web Client + Go
  - Server
  - Console
  - Web Client
  - API
  - Agent
- MonsieurBiche/rustdesk-web-client
  - Web v1 Fork
  - docker-rustdesk-web-client

```
rd.example.com:443

/ws/id     -> hbbs:21118
/ws/relay  -> hbbr:21119
```

- https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/

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
