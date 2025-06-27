---
title: aria2
---

# aria2

- [aria2/aria2](https://github.com/aria2/aria2)
  - GPLv2, C++
- webui
  - [mayswind/AriaNg](https://github.com/mayswind/AriaNg) - Web
    - [在线](http://ariang.mayswind.net/latest)
  - Aria2WebUI
  - [ziahamza/webui-aria2](https://github.com/ziahamza/webui-aria2)
- 参考
  - [aria2c.1](https://aria2.github.io/manual/en/html/aria2c.html)
  - [P3TERX/Aria2-Pro-Docker](https://github.com/P3TERX/Aria2-Pro-Docker)
    - CUSTOM_TRACKER_URL
      - https://cdn.jsdelivr.net/gh/wenerme/repository@master/trackers_aira2.txt
      - 默认 https://trackerslist.com/all_aria2.txt
        - [XIU2/TrackersListCollection](https://github.com/XIU2/TrackersListCollection)
  - [P3TERX/aria2.conf](https://github.com/P3TERX/aria2.conf)
  - [qzm/aria2.conf](https://gist.github.com/qzm/a54559726896d5e6bf21adf2363ad334)

```bash
# RPC 启动 - 不设置权限
aria2c --enable-rpc --rpc-allow-origin-all --rpc-listen-all

# bt 选择下载文件
aria2c --show-files your-torrent-file.torrent
aria2c --select-file=3,6 your-torrent-file.torrent

# 保存磁力链接关联的 torrent 文件
aria2c --bt-metadata-only=true --bt-save-metadata=true --daemon=false "magnet:?xt=urn:btih:xyz"

aria2c --help=#rpc

# 设置 tracker
curl -LO https://github.com/ngosang/trackerslist/raw/master/trackers_all_ip.txt
echo bt-tracker=$(grep . trackers_all_ip.txt | tr '\n' ',') > ~/.aria2/aria2.conf
```

| flag                                 | default | val             |
| ------------------------------------ | ------- | --------------- |
| `-d,--dir <DIR>`                     |         | 下载目录        |
| -D,--daemon                          |         | daemon          |
| --conf-path                          |         |
| `-j, --max-concurrent-downloads=<N>` | 5       | 最大并发下载数  |
| `-c, --continue [true\|false]`       |         | for HTTP(S)/FTP |

## 配置 {configuration}

- --conf-path
  - $XDG_CACHE_HOME/aria2
  - $HOME/.aria2
- ./
  - aria2.conf

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

## explain

```
[#2089b0 400.0KiB/33.2MiB(1%) CN:1 DL:115.7KiB ETA:4m51s]
```

- #NNNNNN -GID 前 6 位
- X/Y(Z%) - Completed length, the total file length and its ratio. If --select-file is used, this is the sum of selected file.
- SEED Share ratio. The client is now seeding. After BitTorrent download finished, size information is replaced with this.
- CN - 链接数
- SD - seeder 连接数
- DL - 下载速率

- https://aria2.github.io/manual/en/html/aria2c.html#console-readout

## bt tracker

```bash
curl -LO https://github.com/ngosang/trackerslist/raw/master/trackers_all_ip.txt
echo bt-tracker=$(grep . trackers_all_ip.txt | tr '\n' ',') > ~/.aria2/aria2.conf
```

## conf demo

```ini
summary-interval=0
lowest-speed-limit=50K
max-concurrent-downloads=10
max-connection-per-server=10
min-split-size=5M
split=10

enable-rpc
rpc-listen-all
rpc-allow-origin-all
rpc-save-upload-metadata

enable-dht
bt-save-metadata
bt-load-saved-metadata
bt-seed-unverified
bt-max-peers=0
bt-max-open-files=2000
bt-request-peer-speed-limit=100K
bt-tracker-interval=120
bt-request-peer-speed-limit=5M
save-session=${HOME}/.aria2/session
save-session-interval=300
input-file=${HOME}/.aria2/session
max-concurrent-downloads=99999
seed-time=180
```

```bash
touch $HOME/.aria2/session
```

## RPC

- `/jsonrpc`
  - HTTP, WebSocket
- `/rpc` - XML RPC
- GID - 下载唯一 ID - 16 位 - `2089b05ecca3d829`

```http
POST http://127.0.0.1/jsonrpc

{"jsonrpc":"2.0","method":"aria2.getGlobalStat","id":"1","params":["token:SECRET"]}
```

```bash
# 避免 base64 后参数过长，使用 pipe 传递 body
{
  echo -n '{"jsonrpc":"2.0","method":"aria2.addTorrent","id":"1","params":["token:SECRET","'
  base64 -w 0 'file.torrent'
  echo -n '",[""],{}]}'
} | curl http://127.0.0.1/jsonrpc -d @-

# 批量下载 torrent
# 注意替换 SECRET 和 地址
find . -type f -iname '*.torrent' | sort -u | xargs -I % bash -c $'echo;echo Downloading "%";{ echo -n \'{"jsonrpc":"2.0","method":"aria2.addTorrent","id":"1","params":["token:SECRET","\';base64 -w 0 "%";echo -n \'",[""],{}]}\'; } | curl http://127.0.0.1/jsonrpc -d @-'
```

**aria2.getGlobalStat**

```json
{
  "id": "1",
  "jsonrpc": "2.0",
  "result": {
    "downloadSpeed": "0",
    "numActive": "2",
    "numStopped": "54",
    "numStoppedTotal": "56",
    "numWaiting": "1",
    "uploadSpeed": "0"
  }
}
```

**aria2.getVersion**

```json
{
  "id": "1",
  "jsonrpc": "2.0",
  "result": {
    "enabledFeatures": [
      "Async DNS",
      "BitTorrent",
      "Firefox3 Cookie",
      "GZip",
      "HTTPS",
      "Message Digest",
      "Metalink",
      "XML-RPC",
      "SFTP"
    ],
    "version": "1.36.0"
  }
}
```

## 筛选已经下载好的文件

- 忽略有 `.aria2` 的文件

```bash
find . -iname '*字幕组*' -not -iname '*.aria2' | xargs -I {} sh -c '[ -e "{}.aria2" ] && echo "{}" || echo' | sort -u | awk NF
```

## .aria2

- https://github.com/aria2/aria2/issues/792
