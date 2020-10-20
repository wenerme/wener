---
id: iwd
title: IWD
---

# iwd
## Tips
* [iwd](https://pkgs.alpinelinux.org/contents?branch=edge&name=iwd&arch=x86_64&repo=community)
  * `/usr/libexec/iwd` - 守护进程
  * /usr/libexec/ead -  Ethernet authentication daemon
  * /usr/bin/iwmon - 监听 RF 包
  * /usr/bin/iwctl - 通过 dbus 与 iwd 交互
    * 三种模式分别使用相同名字的命令去控制
* 密码位于 `/var/lib/iwd`
* 密码要求 8-63 位 ASCII 编码
* 设备有三种模式
  * station
  * ap
  * ad-hoc
    * [WANET](https://en.wikipedia.org/wiki/Wireless_ad_hoc_network)
    
```bash
# 
device list
device wlan0 show
device wlan0 set-property Powered on
device wlan0 set-property Mode station

station wlan0 scan
# 连接 - 会提示输入密码
station wlan0 connect <SSID>

# 查看设备信息
adapter list
adapter wlan0 show
# 查看连接过的网络
# 可以设置 AutoConnect - 默认开启
known-networks list

# 查看支持 wsc 的设备
wsc list
```
