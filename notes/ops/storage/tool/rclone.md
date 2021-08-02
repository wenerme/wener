---
title: rclone
---

# Rclone

## Tips

- 默认配置文件 `~/.rclone.conf`

```bash
brew install rclone

# Linux 安装
curl -O https://downloads.rclone.org/rclone-current-linux-amd64.zip
unzip rclone-current-linux-amd64.zip
cd rclone-*-linux-amd64
cp rclone ~/bin

# 使用情况
rclone about gd:

# 不创建配置的使用方式
rclone lsd --webdav-url http://192.168.1.1:8080 :webdav:
rclone lsd --sftp-host example.com :sftp:
rclone lsd --ftp-host 192.168.1.1 --ftp-port 21 --ftp-user anonymous --ftp-pass $(rclone obscure anonymous) :ftp:

# 下载失败可能会创建空文件
# 查看实际占用空间
du -hs . --apparent-size

apk add 	findutils
# 删除空文件
find . -type f -empty -delete
# 删除空目录
find . -type d -empty -delete
```

## google drive

- [#3625](https://github.com/rclone/rclone/issues/3625) - Add gdrive file id support
- [donwa/gclone](https://github.com/donwa/gclone)
  - 基于 rclone，支持替换 sa
- [xyou365/AutoRclone](https://github.com/xyou365/AutoRclone)
  - 切换 sa 上传

```bash
rclone mount gd: /tmp/gd \
  -vv --stats 30s --read-only --allow-other --rc --umask 0222 --attr-timeout 1s \
  --dir-cache-time 672h --vfs-cache-max-age 675h \
  --vfs-read-chunk-size 8M \
  --buffer-size 0 \
  --poll-interval 1m0s \
  --drive-v2-download-min-size 0
```

# FAQ

## ReadFileHandle.Read error: low level retry 1/10: unexpected EOF
