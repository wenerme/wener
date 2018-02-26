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


## Ubnt
https://github.com/ShaneMcC/vyatta-tinc
vyatta/vyos/edgeos/edgemax 

## EdgeOS

https://wiki.vyos.net/wiki/EdgeOS
a fork of Vyatta developed by Ubiquiti Networks. It runs only on custom hardware based on Cavium Octeon and MIPS chips.

EdgeRouter - Add other Debian packages to EdgeOS
https://help.ubnt.com/hc/en-us/articles/205202560-EdgeMAX-Add-other-Debian-packages-to-EdgeOS

启动脚本
/config/scripts/pre-config.d
不会使用 /etc/modules

```bash
# 默认 PATH 没有 sbin
export PATH=/usr/sbin:/sbin:$PATH

# EdgeRouter 4 v1.9.8
# ===================
uname -a
# Linux FHY 3.10.87-UBNT #1 SMP Wed Aug 23 06:30:43 PDT 2017 mips64 GNU/Linux 
cat /etc/os-release
# PRETTY_NAME="Debian GNU/Linux 7 (wheezy)"
# NAME="Debian GNU/Linux"
# VERSION_ID="7"
# VERSION="7 (wheezy)"
# ID=debian
# ANSI_COLOR="1;31"
# HOME_URL="http://www.debian.org/"
# SUPPORT_URL="http://www.debian.org/support/"
# BUG_REPORT_URL="http://bugs.debian.org/"

# https://www.debian.org/mirror/list.zh-cn.html
# http://mirrors.aliyun.com/debian 没有 mips 相关的内容
# ftp.cn.debian.org/debian/ -> http://mirrors.ustc.edu.cn/debian/
# ftp2.cn.debian.org/debian/ -> https://mirrors.tuna.tsinghua.edu.cn/debian/
configure
set system package repository wheezy components 'main contrib non-free'
set system package repository wheezy distribution wheezy 
set system package repository wheezy url http://mirrors.ustc.edu.cn/debian/
commit
save
exit

apt-get update

# https://packages.debian.org/search?keywords=tinc
# https://wiki.debian.org/DebianExperimental
# 
# deb http://mirrors.ustc.edu.cn/debian/ experimental main
# aptitude search ~S~i~Aexperimental
apt-get -t experimental install tinc

# https://github.com/lancethepants/tinc-mipsel-static
# https://files.lancethepants.com 只有 mipsel
# tinc: ELF 32-bit LSB executable, MIPS, MIPS32 version 1 (SYSV), statically linked, stripped
# Linux FHY 3.10.87-UBNT #1 SMP Wed Aug 23 06:30:43 PDT 2017 mips64 GNU/Linux
# https://cdimage.debian.org/debian-cd/current/mips/iso-cd/
# https://cdimage.debian.org/debian-cd/current/mips/iso-cd/debian-9.3.0-mips-netinst.iso

dpkg --print-architecture
dpkg --print-foreign-architectures
# Cavium Octeon III V0.2  FPU V0.0
# https://gist.github.com/extremecoders-re/3ddddce9416fc8b293198cd13891b68c
wget http://ftp.debian.org/debian/dists/stretch/main/installer-mips/current/images/malta/netboot/initrd.gz
wget http://ftp.debian.org/debian/dists/stretch/main/installer-mips/current/images/malta/netboot/vmlinux-4.9.0-4-4kc-malta

qemu-system-mips -cdrom debian-9.3.0-mips-netinst.iso \
  -hda debian-mips.img \
  -M malta \
  -kernel vmlinux-4.9.0-4-4kc-malta \
  -boot d \
  -initrd initrd.gz \
  -m 512 \
  -append "root=/dev/sda1 nokaslr" 

qemu-system-mipsel -hda hda.qcow \
  -M malta \
  -kernel vmlinux-4.9.0-3-4kc-malta \
  -initrd initrd.gz \
  -m 512 \
  -nographic \
  -append "root=/dev/sda1 nokaslr"

qemu-system-mips -M malta -kernel vmlinux-2.6.32-5-4kc-malta -hda debian_squeeze_mips_standard.qcow2 -append "root=/dev/sda1 console=tty0"
qemu-system-mips -M malta -kernel vmlinux-3.2.0-4-4kc-malta -hda debian_wheezy_mips_standard.qcow2 -append "root=/dev/sda1 console=tty0"


qemu-system-mips -cdrom debian-9.3.0-mips-netinst.iso \
  -hda debian-mips.img \
  -M malta \
  -kernel vmlinux-4.9.0-4-4kc-malta \
  -boot d \
  -initrd initrd.gz \
  -m 512 \
  -append "root=/dev/sda1 console=tty0" 

qemu-system-mips -cdrom debian-9.3.0-mips-netinst.iso \
  -hda debian-mips.img \
  -M malta \
  -kernel vmlinux-4.9.0-4-4kc-malta \
  -initrd initrd.gz \
  -m 512 \
  -append "root=/dev/sda1 console=tty0"

qemu-system-arm -M overo -m 256 -sd ./test.img -clock unix -serial stdio -device usb-mouse -device usb-kbd -show-cursor

qemu-system-arm -M overo -m 256 -sd ./test.img -clock unix -serial stdio -usb -device usb-host,hostbus=2,hostaddr=1
```
 
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
