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

- ~~不支持 bt2 [transmission/transmission#1339](https://github.com/transmission/transmission/issues/1339)~~
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

apk add transmission-daemon
mkdir -p /transmission/config
chmod -R 1777 /transmission

/usr/bin/transmission-daemon --foreground --config-dir /transmission/config

# https://hub.docker.com/r/linuxserver/transmission
#  -e TRANSMISSION_WEB_HOME= `#optional` \
#  -e WHITELIST= `#optional` \
#  -e PEERPORT= `#optional` \
#  -e HOST_WHITELIST= `#optional` \
# 9091 WebUI
# 51413 P2P
docker run -d \
  --name=transmission \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=Asia/Shanghai \
  -e USER=transmission \
  -e PASS=CHANGMEPASSWORD \
  -p 9091:9091 \
  -p 51413:51413 \
  -p 51413:51413/udp \
  -v $PWD/config:/config \
  -v $PWD/downloads:/downloads \
  -v $PWD/watch:/watch \
  --restart unless-stopped \
  linuxserver/transmission:latest
```

## deamon

- TRANSMISSION_HOME
  - ~/.config/transmission-daemon
- https://linux.die.net/man/1/transmission-daemon

| Option                           | Default Value | Description                                            |
| -------------------------------- | ------------- | ------------------------------------------------------ |
| `-a, --allowed x.x.x.x,...`      | `127.0.0.1`   | IP 白名单，可以使用 `*`                                |
| `-b, --blocklist`                |               | 启用对等方黑名单                                       |
| `-B, --no-blocklist`             |               | 禁用对等方黑名单                                       |
| `-c directory`                   |               | 监控新 .torrent 文件的目录                             |
| `-C`                             |               | 不监控新 .torrent 文件                                 |
| `-f, --foreground`               |               | 在前台运行并打印错误信息                               |
| `-g, --config-dir directory`     |               | 配置文件目录                                           |
| `-er, --encryption-required`     |               | 加密所有对等连接                                       |
| `-ep, --encryption-preferred`    |               | 优先加密的对等连接                                     |
| `-et, --encryption-tolerated`    |               | 容忍未加密的对等连接                                   |
| `-gsr, --global-seedratio ratio` |               | 所有种子，除非被单个种子设置覆盖，应种到特定比率       |
| `-GSR, --no-global-seedratio`    |               | 所有种子，除非被单个种子设置覆盖，无视比率种子         |
| `-h, --help`                     |               | 显示命令行选项描述                                     |
| `--incomplete-dir dir`           |               | 将新种子内容存储在指定目录，直到下载完成               |
| `--no-incomplete-dir`            |               | 不在不同目录存储未完成的种子                           |
| `-i, --bind-address-ipv4`        | `0.0.0.0`     | 用于IPv4 BitTorrent 连接的监听地址                     |
| `-I, --bind-address-ipv6`        | `::`          | 用于IPv6 BitTorrent 连接的监听地址                     |
| `-r, --rpc-bind-address`         | `0.0.0.0`     | 用于RPC连接的监听地址                                  |
| `--paused`                       |               | 启动时暂停所有种子                                     |
| `-L, --peerlimit-global limit`   | `240`         | 全局对等方限制，适用于默认设置不合适的嵌入式系统       |
| `-l, --peerlimit-torrent limit`  | `60`          | 每个种子的对等方限制，适用于默认设置不合适的嵌入式系统 |
| `-m, --portmap`                  |               | 启用通过 NAT-PMP 或 UPnP 的端口映射                    |
| `-M, --no-portmap`               |               | 禁用端口映射                                           |
| `-o, --dht`                      |               | 启用分布式哈希表 (DHT)                                 |
| `-O, --no-dht`                   |               | 禁用分布式哈希表 (DHT)                                 |
| `-p, --port port`                | `9091`        | 用于RPC请求的端口                                      |
| `-P, --peerport port`            | `51413`       | 用于接收来电的端口                                     |
| `-t, --auth`                     |               | 要求客户端身份验证                                     |
| `-T, --no-auth`                  |               | 不要求客户端身份验证                                   |
| `-u, --username username`        |               | 用于客户端身份验证的用户名                             |
| `-v, --password password`        |               | 用于客户端身份验证的密码                               |
| `-V, --version`                  |               | 显示版本号并退出                                       |
| `-w, --download-dir`             |               | 下载数据存储位置                                       |
| `-e, --logfile`                  |               | 日志文件存储位置                                       |
| `--log-error`                    |               | 显示错误信息                                           |
| `--log-info`                     |               | 显示错误和信息消息                                     |
| `--log-debug`                    |               | 显示错误、信息和调试消息                               |

## conf

| what     | where                               |
| -------- | ----------------------------------- |
| daemon   | `$HOME/.config/transmission-daemon` |
| cli      | `$HOME/.config/transmission-cli`    |
| download | `$HOME/Downloads`                   |

- [Editing Configuration Files](https://github.com/transmission/transmission/wiki/Editing-Configuration-Files)
