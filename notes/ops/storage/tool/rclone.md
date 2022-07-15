---
title: rclone
---

# Rclone

- [rclone/rclone](https://github.com/rclone/rclone)
- 默认配置文件 `~/.config/rclone/rclone.conf`

| flag                     | val | desc                |
| ------------------------ | --- | ------------------- |
| -P,--progress            |     | 显示进度            |
| `--transfers <n>`        | 4   | 并行 数量           |
| --create-empty-src-dirs  |     | copy 创建空目录     |
| `-f,--filter <patterns>` |     |
| --ignore-case            |     | filter 大小写不敏感 |
| `--include <pattern>`    |
| `--exclude <pattern>`    |
| `--files-from <file>`    |     |
| `--min-size <size>`      |
| `--max-size <size>`      |
| `--max-age <age>`        |
| --stats-one-line         |     | 只显示一行状态      |

| command |
| ------- | ---------------------------------- |
| ls      | size,path - 默认递归 `--max-depth` |
| lsl     | mtime,size,path                    |
| lsd     | 目录                               |
| lsf     | 文件+目录 - 便于应用解析的格式     |
| lsjson  |
| copy    | 复制目录                           |
| copyto  | 复制单个文件                       |
| sync    | 同步 - 会删除额外的文件            |
| bisync  | 双向同步 - 会对比 mtime            |

```bash
brew install rclone # macOS

# Linux 安装
curl -O https://downloads.rclone.org/rclone-current-linux-amd64.zip
unzip rclone-current-linux-amd64.zip
cd rclone-*-linux-amd64
cp rclone ~/bin

# Commands
# ==========
rclone copy src:/src dst:/dst # 复制目录
rclone copyto                 # 复制单个文件


# 不创建配置的使用方式
rclone lsd --webdav-url http://192.168.1.1:8080 :webdav:
rclone lsd --sftp-host example.com :sftp:
rclone lsd --ftp-host 192.168.1.1 --ftp-port 21 --ftp-user anonymous --ftp-pass $(rclone obscure anonymous) :ftp:

rclone about gd:      # 使用情况
rclone reconnect gd:  # Token 失效重连
```

- filter
  - https://rclone.org/filtering
  - `+ include-pattern`
  - `- exclude-pattern`
  - `!` - reset

## Web UI

```bash
# 会下载 https://github.com/rclone/rclone-webui-react/releases/download/v2.0.5/currentbuild.zip
# 到 ~/.cache/rclone/webgui/v2.0.5.zip]
rclone rcd --rc-web-gui --rc-addr :5572
```

## google drive

```bash
rclone mount gd: /tmp/gd \
  -vv --stats 30s --read-only --allow-other --rc --umask 0222 --attr-timeout 1s \
  --dir-cache-time 672h --vfs-cache-max-age 675h \
  --vfs-read-chunk-size 8M \
  --buffer-size 0 \
  --poll-interval 1m0s \
  --drive-v2-download-min-size 0
```

- https://rclone.org/drive/#making-your-own-client-id
- [#3625](https://github.com/rclone/rclone/issues/3625) - Add gdrive file id support
- [donwa/gclone](https://github.com/donwa/gclone)
  - 基于 rclone，支持替换 sa
- [xyou365/AutoRclone](https://github.com/xyou365/AutoRclone)
  - 切换 sa 上传

## one drive

- [#4062](https://github.com/rclone/rclone/issues/4062) Implement OneDrive shared with me
- https://rclone.org/webdav/#sharepoint-online

# FAQ

## ReadFileHandle.Read error: low level retry 1/10: unexpected EOF

## Failed to copy: mkdir permission denied

注意存储目录是不是没对，local 目录在 web 和操作的时候不一样

## 常用操作

```bash
# 下载失败可能会创建空文件
# 查看实际占用空间
du -hs . --apparent-size


apk add 	findutils
# 删除空文件
find . -type f -empty -delete
# 删除空目录
find . -type d -empty -delete
```
