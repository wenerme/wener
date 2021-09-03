---
title: aria2
---

# aria2

- [mayswind/AriaNg](https://github.com/mayswind/AriaNg) - Web
  - [在线](http://ariang.mayswind.net/latest)
- Aria2WebUI

```bash
# RPC 启动 - 不设置权限
aria2c --enable-rpc --rpc-allow-origin-all --rpc-listen-all

# bt 选择下载文件
aria2c --show-files your-torrent-file.torrent
aria2c --select-file=3,6 your-torrent-file.torrent

# 保存磁力链接关联的 torrent 文件
aria2c --bt-metadata-only=true --bt-save-metadata=true <magnet link>

aria2c --help=#rpc
```

```conf
# default 10M
disk-cache=128M
# default 20M
min-split-size=10M

# 单个种子最大连接数, 默认:55
# 此项无论BT还是PT都建议设到999，要想下载速度快，种子连接多多益善
bt-max-peers=999
# 打开DHT功能, PT需要禁用, 默认:true
# 此项PT下载必须设为false，否则有封号风险。BT下载务必设为true，跟流氓软件抢连接全靠它。
enable-dht=true
# 本地节点查找, PT需要禁用, 默认:false
# 此项PT下载必须设为false，否则有封号风险。BT下载可以设为true，个人认为提升连接的能力并不强，但总好过没有吧。
bt-enable-lpd=true
# 种子交换, PT需要禁用, 默认:true
# 此项PT下载必须设为false，否则有封号风险。BT下载务必设为true，可以连接到更多种子。
enable-peer-exchange=true
# 客户端伪装, PT需要
#peer-id-prefix=-TR2770-
#user-agent=Transmission/2.77

#强制加密, 防迅雷必备
#bt-require-crypto=true
#当下载的文件是一个种子(以.torrent结尾)时, 自动下载BT
follow-torrent=true
#启用本地节点查找
bt-enable-lpd=true
```
