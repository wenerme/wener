# Router

## Tips
* [List of router and firewall distributions](https://en.wikipedia.org/wiki/List_of_router_and_firewall_distributions)
* [Comparison of firewalls](https://en.wikipedia.org/wiki/Comparison_of_firewalls)
* RouterOS
  * MikroTik RouterOS
  * Linux
  * x86
* DD-WRT
* OpenWrt
* [VyOS](https://vyos.io/)
  * [VyOS:wikipedia](https://en.wikipedia.org/wiki/VyOS)
  * https://github.com/vyos
* ClearOS
  * [clearos/kernel](https://github.com/clearos/kernel/tree/clear7)
* [IPFire](http://www.ipfire.org/)
* [pfsense](https://www.pfsense.org/)
  * [pfsense/pfsense](https://github.com/pfsense/pfsense)
* [packetfence](https://packetfence.org/)
  * [inverse-inc/packetfence](https://github.com/inverse-inc/packetfence)
  * fully supported, trusted, Free and Open Source network access control (NAC) solution

* [6 best free Linux firewalls of 2017](http://www.techradar.com/news/6-best-free-linux-firewalls-of-2017)

## IPFire
https://wiki.ipfire.org/hardware/requirements

## Router7
https://github.com/rtr7/router7
pure-Go small home internet router

## Ubnt
https://github.com/ShaneMcC/vyatta-tinc
vyatta/vyos/edgeos/edgemax 

## 参考
* [Udoo x86](http://www.udoo.org/udoo-x86/) 相当不错的单片机, x86 架构

http://raspberrypihq.com/how-to-turn-a-raspberry-pi-into-a-wifi-router/

网络相关博客
https://jenssegers.com/
Golang DHCP4 服务器
https://github.com/krolaw/dhcp4

esp8266 Wifi 收发模块 http://www.nodemcu.com/index_cn.html 开发平台

xbee
wifly

TP 和 UNET 都有比较好的 AP
基本思路是 LAN->Server->AP
Server 层可以做到 Packet sniffer

http://askubuntu.com/questions/180733/how-to-setup-an-access-point-mode-wi-fi-hotspot

https://github.com/oblique/create_ap
https://github.com/mdlayher/dhcp6
https://github.com/miekg/dns

https://advancedtomato.com/downloads/router/r7000

没落的 http://www.dualwan.cn
VPN 可以使两边内网互通
http://www.dualwan.cn/index.php/tomato-faq/27-vpn-pptp/512-tomato-dualwan-pptp-serverclient

原版 tomato http://tomato.groov.pl/
https://github.com/Jackysi/advancedtomato
https://advancedtomato.com/ tomato 的 GUI
https://advancedtomato.com/downloads 支持列表

https://en.wikipedia.org/wiki/Tomato_(firmware)


CFE
https://wiki.openwrt.org/doc/techref/bootloader/cfe
https://www.dd-wrt.com/wiki/index.php/Serial_Recovery
https://en.wikipedia.org/wiki/Common_Firmware_Environment


https://zeroshell.org/
Zeroshell is a Linux based distribution  dedicated to the implementation of Router and Firewall Appliances completely administrable via  web interface.

## Captive portal
* [Captive portal:wiki](https://en.wikipedia.org/wiki/Captive_portal)
* [wifidog](http://dev.wifidog.org/)
* pfsense [Captive Portal](https://doc.pfsense.org/index.php/Captive_Portal)

### Optimize

#### 提升无线的功率
* [TX_Power](http://www.dd-wrt.com/wiki/index.php/Advanced_wireless_settings#TX_Power)
* http://www.dd-wrt.com/wiki/index.php/Atheros/ath_wireless_settings#TX_Power
* 番茄默认为 42
* 具体值应该参照设备和国家, 否则可能导致功率过高过热

```bash
wl -i eth1 txpwr 70 #will set your adapter to 70 mW for the 5GHz
wl -i eth0 txpwr 70 #will set your adapter to 70 mW for the 2.4GHz
wl -i eth1 txpwr1 #check transmitt power for 5 GHz
wl -i eth0 txpwr1 #check transmitt power for 2.4 GHz
```

```bash
# CPU 超频
# r6300v2
# CPU 1200, 内存 800 默认为 800,533
nvram set clkfreq=1200,800
nvram commit
reboot
```

## 小米 R1D

* [番茄固件](https://bitbucket.org/tsynik/tomato-arm/downloads/)
* [comcat/miwifi](https://github.com/comcat/miwifi)
  * 内核和相关工具
* [小米路由器固件下载](http://openwrt.io/docs/miwifi/)
* 文章
  * [小米路由内核开发环境搭建](http://wiki.jackslab.org/小米路由内核开发环境搭建)
  * [小米路由vmlinuz.trx格式解析](http://wiki.jackslab.org/小米路由vmlinuz.trx格式解析)
  * [小米路由器CFE](http://www.iptvfans.cn/wiki/index.php/小米路由器CFE)
* TTL, 靠近灯依次为 VCC,GND,Rx,Tx

### FAQ

#### unlzma 失败

需要注意,要使用 9.22 版本的 lzma, 而不是 xz 中携带的 lzma, 在 Ubuntu 下可以直接安装 lzma, 在有些环境中没有原版的 lzma.
