---
title: transmission
---

# transmission

- [transmission/transmission](https://github.com/transmission/transmission)
  - GPL/MIT, C
  - 下载器
  - 支持 RPC
  - 内置 Web UI
  - 提供 Remote GUI
  - 提供 Native GUI
- cli - TUI
  - transmission-create - 创建 .torrent 文件
  - transmission-daemon - http://localhost:9091
  - transmission-edit - 修改 .torrent 的 announce
  - transmission-remote - 远程控制 CLI
  - transmission-show - 显示 .torrent 元数据
- 参考
  - [transmission-daemon.1](https://manpages.debian.org/testing/transmission-daemon/transmission-daemon.1.en.html)
  - archlinux[transmission](https://wiki.archlinux.org/title/transmission)
  - WebUI
    - [ronggang/transmission-web-control](https://github.com/ronggang/transmission-web-control)
    - [transmission-remote-gui/transgui](https://github.com/transmission-remote-gui/transgui)

:::tip

- 不支持 bt2 [transmission/transmission#1339](https://github.com/transmission/transmission/issues/1339)
- 不支持 WebRTC [#47](https://github.com/transmission/transmission/issues/47)

:::

```bash
# macOS
# casks transmission transmission-remote-gui
brew install transmission-cli

# 当前配置
transmission-daemon -d
# 前台启动
# http://localhost:9091
transmission-daemon -f
```

## conf

| what     | where                               |
| -------- | ----------------------------------- |
| daemon   | `$HOME/.config/transmission-daemon` |
| cli      | `$HOME/.config/transmission-cli`    |
| download | `$HOME/Downloads`                   |

- [Editing Configuration Files](https://github.com/transmission/transmission/wiki/Editing-Configuration-Files)
