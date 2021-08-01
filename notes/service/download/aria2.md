---
title: aria2
---

# aria2

- [mayswind/AriaNg](https://github.com/mayswind/AriaNg) - Web
  - [在线](http://ariang.mayswind.net/latest)

```bash
# RPC 启动 - 不设置权限
aria2c --enable-rpc --rpc-allow-origin-all --rpc-listen-all

# bt 选择下载文件
aria2c --show-files your-torrent-file.torrent
aria2c --select-file=3,6 your-torrent-file.torrent

# 保存磁力链接关联的 torrent 文件
aria2c --bt-metadata-only=true --bt-save-metadata=true <magnet link>
```
