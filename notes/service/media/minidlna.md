---
id: minidlna
title: MiniDLNA
---

# MiniDLNA
* 轻量级的 DLNA/UPnP-AV 服务

```bash
# macOS
brew install minidlna
# AlpineLinux
apk add minidlna

# 前台启动
minidlnad -f ./minidlna.conf -P $PWD/minidlna.pid -d
```

## 配置

__/etc/minidlna.conf__

```ini
# HTTP 端口 - descriptions, SOAP, media transfer
port=8200

# 绑定网口
#network_interface=eth0,eth1

# UID
#user=jmaggard

# 扫描目录
# A - audio, V - video, P - images
media_dir=AVP,/data/media
media_dir=V,/data/music

# 合并 media_dir 到同一个根目录
#merge_media_dirs=no

# 自定义服务名
#friendly_name=My DLNA Server

# 数据库和封面缓存
#db_dir=/var/cache/minidlna

# 日志目录
#log_dir=/var/log

# 日志级别
# 模块日志级别 off, fatal, error, warn, info, or debug
#log_level=general,artwork,database,inotify,scanner,metadata,http,ssdp,tivo=warn

# 封面图片文件
# / 分割
album_art_names=Cover.jpg/cover.jpg/AlbumArtSmall.jpg/albumartsmall.jpg/AlbumArt.jpg/albumart.jpg/Album.jpg/album.jpg/Folder.jpg/folder.jpg/Thumb.jpg/thumb.jpg

# inotify 检测检测新文件进行扫描
inotify=yes

# TiVo HMO 兼容的 .jpg, .mp3 流
enable_tivo=no

# ZeroConf 配置发现
tivo_discovery=bonjour

# 严格模式 - 是否允许服务端进行图片下采样
strict_dlna=no

# 默认 80 地址显示的 URL
#presentation_url=http://www.mylan/index.php

# 默认 895s，notify 间隔
notify_interval=900

# 返回给客户端的串号和模型编号
serial=12345678
model_number=1

# MiniSSDPd socket
#minissdpdsocket=/var/run/minissdpd.sock

# 根容器
# . - 标准容器, B - 浏览目录, M 音乐, V 视频 P 图片
# 可自定义为 ObjectID 1$F -> Music/Playlists
#root_container=.

# 强制排序
#force_sort_criteria=+upnp:class,+upnp:originalTrackNumber,+dc:title

# 最大连接数
#max_connections=50

# 允许软链接指向媒体目录之外
#wide_links=no
```
