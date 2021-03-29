---
title: OpenVox VoxStack 网关分析
slug: openvox-gw-inside
tags:
  - 嵌入式
  - 系统
  - VoIP
---

# OpenVox 模拟网关分析

因为淘到一个二手 OpenVox 语音网关，就好奇"里面"长什么样。

Let's find out.

<!-- more -->

## VS-AGU-E2M0800

- VS - VoxStack 系列 - 模块化，热插拔
- AGU - Analog Gateway - 模拟网关
- 软件 1.1.10
- 硬件 1.0.0

一张卡两个模块

- E2M8HJ9DJ68P - VS 模块
  - M83241G13 - Freescale Semiconductor - NXP
    - Telecom Interface ICs C1K-LS102M 450MHz
    - IC C1K 450MHZ VOIP 448BGA
- FXS-420 v1.2 - FS42HJ1KK4UY5
  - S13215-FM
- FXO-400 v1.4 - FXODHJO2XT6L
  - 3019-FT 1718FF L0L4
  - Si3050-FT 1708EM F1Q5

## Web 管理界面

界面类似于官方演示 http://admin:admin@demo.openvox.cn:65327

通过开启 ssh, 账号名设置为 super 可获取到 root 权限，默认 SSH 端口 12345。

## 硬件

> 未开箱，不一定准确。

| -    | 规格                                   |
| ---- | -------------------------------------- |
| 内存 | 120MB                                  |
| CPU  | ARMv6-compatible processor rev 5 (v6l) |

**Comcerto 1000 M83263G**

- ARM1136 - 2 Core, 650MHz
- 敏迅科技/Mindspeed Technologies 芯片
- Mindspeed 主要提供 VoIP 领域解决方案 - DSP, LTE, Transcede
- VoIP, Security Engine, PCIe 2, RGMII 2
- SDRAM 16/32 bit DDR2-800/667/533
- L1 缓存 2x(64K D$/64K I$)
- VoIP 能力
  - Field hardened voice features
  - World class acoustic echo cancellation technology
  - Narrow and wideband codecs
  - G.711, G.729, G.722, G.723.1, iLBC, T.38, G.729.1, G.722.2, AMR, AMR Wideband
  - Enhanced echo canceller, CID-I/II, VAD/CNG, AGC
  - 3-Way conferencing
- TDM/PCM interface for glue-less VoIP support
- 2009 年

**/proc/cpuinfo**

```
Processor	: ARMv6-compatible processor rev 5 (v6l)
BogoMIPS	: 648.80
Features	: swp half thumb fastmult edsp java
CPU implementer	: 0x41
CPU architecture: 6TEJ
CPU variant	: 0x1
CPU part	: 0xb36
CPU revision	: 5

Hardware	: Comcerto 1000 (EVM)
Revision	: 0000
Serial		: 0000000000000000
```

## 系统环境

> 底层基于 OpenWrt

| -        | -                                                                     |
| -------- | --------------------------------------------------------------------- |
| uname -a | Linux General 2.6.33.5 #4 Tue Aug 29 20:38:01 CST 2017 armv6l unknown |
| Busybox  | 1.4.2                                                                 |
| Asterisk | 1.8.20.0 / 1.8.X 发布于 2010-10-21 EOL 2015-10-21                     |
| dahdi    | 2.6.0                                                                 |
| dcra     | 0.1.0                                                                 |

> Busybox applet
>
> [, [[, arping, ash, awk, awx, basename, bunzip2, bzcat, cat, chgrp, chmod, chown, chroot, clear, cp, crond, crontab, cut, date, df, dirname, dmesg, du, echo, egrep, env, expr, false, fgrep, find, free, getty, grep, gunzip, gzip, halt, head, hostid, hostname, httpd, id, ifconfig, init, insmod, ipkg, kill, killall, killall5, klogd, length, less, ln, lock, logger, login, logread, ls, lsmod, md5sum, mdev, mesg, mkdir, mkfifo, mknod, mktemp, mount, mv, nc, netmsg, netstat, nice, nslookup, passwd, pidof, ping, ping6, pivot_root, poweroff, printf, ps, pwd, rdate, reboot, renice, reset, rm, rmdir, rmmod, route, sed, seq, sh, sleep, sort, strings, stty, switch_root, sync, sysctl, syslogd, tail, tar, tee, telnet, test, time, top, touch, tr, traceroute, true, tty, udhcpc, umount, uname, uniq, uptime, vconfig, vi, watchdog, wc, wget, which, xargs, yes, zcat

**cmdline**

```
init=/etc/preinit ubi.mtd=4,2048 ubi.block=0,0 root=/dev/ubiblk0_0 ro rootfstype=squashfs hwaddress=eth0,a0:98:05:0e:04:8e hwaddress=eth2,00:03:7F:0B:00:01 console=ttyS0,115200 mtdparts=comcertonand:256k(uboot),128k(env),128K(param),4M(kernel),20M(root),4M(ekernel),20M(eroot),16M(config),-(system) partno=M83263G fppmode=1
```

**内核模块**

| Module    | Size   | Used by     |
| --------- | ------ | ----------- |
| wctdmc1k  | 30096  | 16          |
| dcra      | 8524   | 1 wctdmc1k  |
| dahdi     | 185948 | 17 wctdmc1k |
| krtpd     | 148520 | 0           |
| csmencaps | 14740  | 2           |
| led_key   | 2500   | 4           |

- dahdi
  - wctdmc1k - OpenVox 模拟信号处理模块
    - WCTDMC1K 设备驱动 - Mindspeed 开发的芯片驱动
  - dcra - opvx_dcra - Access Dahdi Channel Registers through procfs
- csmencaps - 应该是 FX 处理相关模块
- led_key - 应该是驱动面板 led 的
- krtpd - Kernel RTP proxy for Asterisk - openvox 开发
  - 类似功能开源 [sipwise/rtpengine](https://github.com/sipwise/rtpengine)

```
filename:       /lib/modules/2.6.33.5/dcra.ko
license:        GPL v2
alias:          opvx_dcra
description:    Access Dahdi Channel Registers through procfs
parmtype:       maxchan:int
parmtype:       debug:int
depends:
vermagic:       2.6.33.5 mod_unload ARMv6
```

**主要用户进程**

| proc                                                | desc            |
| --------------------------------------------------- | --------------- |
| /bin/php /my_tools/keeper                           |
| /bin/php /my_tools/logfile_monitor                  |
| /my_tools/checkasteriskstat                         |
| /my_tools/ntpclient                                 | 时间同步        |
| /my_tools/resetkey                                  |
| /my_tools/sys_restore                               |
| /my_tools/watchdog                                  |
| /usr/sbin/crond                                     | 定时任务        |
| /webservice/service                                 |
| asterisk -g                                         | asterisk 主进程 |
| dropbear -p 12345                                   | SSH 守护进程    |
| lighttpd -f /etc/lighttpd.conf -m /usr/lib/lighttpd | Web 服务        |

### 系统目录

- /www -> /tmp/web/www
- /tmp/web/www - cgi-bin css images index.html js lang - 管理应用
- /data/
  - info/
  - log/
    - cdr.db - SQLite 通话记录
    - sys-log - 系统日志
    - update.txt - 更新日志
  - sms/
- /my_tools/ - 系统工具
- /webservice/service - 服务
- /version
  - version - 系统版本
  - build_time - 构建时间
  - cfg_ver_list - 配置版本 - 内容 `1.1.10`
  - def_cfg.tar.gz - asterisk 配置备份
  - openvpn.sample_configs.tar.gz
  - sip_bendpoints.sample_configs.tar.gz

**系统挂载**

| dev            | size   | path          | fstype           |
| -------------- | ------ | ------------- | ---------------- |
| /dev/ubiblk0_0 | 16.1M  | /             | rootfs, squashfs |
| none           | 57.5M  | /tmp          | tmpfs            |
| tmpfs          | 512.0k | /dev          | tmpfs            |
| /dev/mtdblock7 | 16.0M  | /etc/asterisk | jffs2            |
| /dev/mtdblock8 | 63.5M  | /data         | jffs2            |

**mtd 分区**

| mtd  | fs    | range                         | name    | size   | mount         |
| ---- | ----- | ----------------------------- | ------- | ------ | ------------- |
| mtd0 |       | 0x000000000000-0x000000040000 | uboot   | 256k   |
| mtd1 |       | 0x000000040000-0x000000060000 | env     | 128k   |
| mtd2 |       | 0x000000060000-0x000000080000 | param   | 128K   |
| mtd3 |       | 0x000000080000-0x000000480000 | kernel  | 4M     |
| mtd4 | ubi0  | 0x000000480000-0x000001880000 | root    | 20MB   | /             |
| mtd5 |       | 0x000001880000-0x000001c80000 | ekernel | 4M     |
| mtd6 |       | 0x000001c80000-0x000003080000 | eroot   | 20M    |
| mtd7 | jffs2 | 0x000003080000-0x000004080000 | config  | 16M    | /etc/asterisk |
| mtd8 | jffs2 | 0x000004080000-0x000008000000 | system  | 63.5MB | /data         |

**v1.1.23**

版本变化底层系统和软件均无变化，变化的主要是 php 代码和部分配置。

| -        | -                                                                      |
| -------- | ---------------------------------------------------------------------- |
| uname -a | Linux General 2.6.33.5 #23 Mon Oct 14 17:12:50 CST 2019 armv6l unknown |

### 安装包

> ipkg list

| pkg                       | ver                             |
| ------------------------- | ------------------------------- |
| base-files-comcerto1000   | 14-unknown                      |
| busybox                   | 1.4.2-1                         |
| cmm                       | 7.00-5                          |
| cyclesoak                 | none-1                          |
| dropbear                  | 0.49-1                          |
| ethtool                   | 3-0                             |
| hotplug2                  | 0.9-1                           |
| ip                        | 2.6.23-1                        |
| kernel                    | 2.6.33.5-comcerto1000-1         |
| kmod-csme                 | 2.6.33.5+2.14.0-comcerto1000-1  |
| kmod-fci                  | 2.6.33.5+7.00-comcerto1000-1    |
| kmod-fpp-csme             | 2.6.33.5+2.14.0-comcerto1000-1  |
| kmod-fpp-driver           | 2.6.33.5-comcerto1000-1         |
| kmod-ipt-conntrack        | 2.6.33.5-comcerto1000-1         |
| kmod-ipt-core             | 2.6.33.5-comcerto1000-1         |
| kmod-matisse              | 1.00-0                          |
| kmod-nf-conntrack-netlink | 2.6.33.5-comcerto1000-1         |
| kmod-nfnetlink            | 2.6.33.5-comcerto1000-1         |
| ldd                       | 14                              |
| libc                      | 2.7-14                          |
| libcli                    | 1.9.3-1                         |
| libgcc                    | 4.1.2-14                        |
| libgdbm                   | 1.8.3-0                         |
| libgmp                    | 4.2.1-1                         |
| libiptc                   | 1.4.7-1                         |
| libncurses                | 5.2-8                           |
| libnfconntrack            | 0.0.100                         |
| libnfnetlink              | 1.0.0                           |
| libopenssl                | 0.9.8q-1                        |
| libpcap                   | 1.1.1-2                         |
| libpopt                   | 1.7-4                           |
| libpthread                | 2.7-14                          |
| librt                     | 2.7-14                          |
| libstdcpp                 | 4.1.2-14                        |
| libxtables                | 1.4.7-1                         |
| msp-firmware              | 2.6.33.5+3.00.11-comcerto1000-1 |
| mtd                       | 5                               |
| ntpclient                 | 2003_194-2                      |
| openssl-util              | 0.9.8q-1                        |
| ppp                       | 2.4.3-7                         |
| ppp-mod-pppoe             | 2.4.3-7                         |
| rp-pppoe-client           | 3.8-1                           |
| udevtrigger               | 106-1                           |
| vapi                      | 2.14.0                          |
| zlib                      | 1.2.3-3                         |

**/etc/ipkg.conf**

```
/etc/ipkg.conf
src snapshots http://openwrt.org/downloads/snapshots/$S/packages
dest root /
dest ram /tmp
```

### 系统工具/my_tools

| name                 | type     | desc                                            |
| -------------------- | -------- | ----------------------------------------------- |
| add_syslog           | shell    | log 到 syslog                                   |
| addkey_client.sh     | shell    |
| addkey_server.sh     | shell    |
| astmanproxy          |          | Asterisk Manager Proxy                          |
| checkAsteriskProc.sh | shell    | 检测并启动 dahdi 和 asterisk                    |
| checkCapture.sh      | shell    | dahdi 停止 dump 给定 chanid                     |
| checkStartFinish.sh  | shell    | sleep 1000s 重启                                |
| checkasteriskstat    |
| cluster_mode         | php      | 配置集群模式 - master, slave, standalone        |
| cluster_slave        |          | slave 应用                                      |
| cpuusage             |          | CPU 使用情况 - 类似 vmstat                      |
| eth_server.conf      |          |
| fetch                |          | 解密固件                                        |
| get_backport         |
| gwping               |          | eth ping 客户端                                 |
| gwpingd              |          | eth_server - eth_server.conf 为配置文件         |
| if_monitor           |          |
| keeper               |          | 保持进程存在 - 类似 supervisor                  |
| krtpd_cli            |
| led_key.ko           | 内核模块 |
| logfile_monitor      | php      | 日志监控                                        |
| lstast               |
| net_tool             |          | 获取网卡信息                                    |
| ntpclient            |          | NTP 客户端                                      |
| play_all_led         |          | 所有 LED 亮                                     |
| process_cdr          |          | CDR 处理                                        |
| readDeviceID         |
| resetkey             |
| restore_cfg_file     |          | 恢复 asterisk 配置文件                          |
| safe_append_to_file  |
| safe_reboot          | shell    | reboot                                          |
| set_busytone.sh      | shell    | fxomon.conf busytone 设置                       |
| set_config           |          | 配置文件操作                                    |
| set_default          |
| set_registers.sh     | shell    | 注册 dcra                                       |
| sys_restore          |
| unpack.sh            | shell    | 用于解压固件 - unzip, md5 checmsum, 解密, unzip |
| watchdog             |
| web_language_init    | php      | 初始化 web 的语言                               |

- astmanproxy
  - [davetroy/astmanproxy](https://github.com/davetroy/astmanproxy)

```bash
# 固件解密 - 类似 fetch
openssl enc -aes-256-cbc -d -in firmware.img -pass pass:O7r8yGv0cdlNM4lQ -out firmware.tar.gz

# 获取配置
/my_tools/set_config /etc/asterisk/gw/web_server.conf get option_value general port 2
```

## 固件

官网提供固件下载 https://www.openvox.cn/pub/firmwares , Web 界面支持上传或在线更新。

固件更新上传逻辑位于 /www/cgi-bin/php/system-tools.php 。
固件准备好后通过 /my_tools/unpack.sh 解压升级。

**固件格式**

- AnalogGateway-current.bin -> tar.gz
  - firmware/AnalogGateway-1.1.20.img.md5
  - firmware/AnalogGateway-1.1.20.img - openssl enc'd data with salted password
- AnalogGateway-1.1.20.img - 解密 -> tar.gz
  - AnalogGateway.img - 应该为系统镜像
  - key - AnalogGateway.img 的 md5 checksum
  - u-boot.bin - bootloader
  - upgrade.sh - 升级脚本

```bash
# 下载
curl -O https://www.openvox.cn/pub/firmwares/Analog%20Gateway/AnalogGateway-current.bin
# 固件为 tar.gz
tar zxvf AnalogGateway-current.bin
cd firmware
# 固件经过 openssl 加密 - 解密后为 tar.tz
openssl enc -aes-256-cbc -d -in AnalogGateway-*.img -pass pass:O7r8yGv0cdlNM4lQ -out AnalogGateway.tar.gz

# 解压获取实际内容
mkdir firmware
tar zxvf AnalogGateway.tar.gz -C firmware
```

**固件升级**

固件升级使用 openvox 内置的自定义工具 /usr/bin/auto_update，主要涉及操作 mtd。

```bash
# -i 1 - 使用 ubiblk
auto_update -i 1
# -b 升级 ubook
auto_update -b u-boot.bin
# -f 更新文件， -u 升级系统
auto_update -u -f AnalogGateway.img
```

## 集群模式

运行模式通过 /my_tools/cluster_mode 配置。

**slave extension**

```ini
#include sip_general.conf
#include sip_endpoints.conf
#include sip_slave.conf

#include extensions_macro.conf
#include extensions_slave.conf
#include extensions_dialmatchingrules.conf

# ext = slave_password+index
[fxs-<ext>-<master_ip>]
exten => #00,1,playback(Ext_number)
exten => #00,n,agi(getsipbinding.sh)
exten => #00,n,Wait(1)
exten => #00,n,Hangup()
exten => s,1,Dial(SIP/$sip_extension-$slave_masterip)
exten => s,n,Hangup()

exten => *1*2*3*4,1,agi(factoryreset.sh)
exten => *1*2*3*4,n,Hangup()
exten => **,1,playback(IP_address)
exten => **,n,agi(geteth0ip.sh)

[sip-$sip_extension]
exten => _X.,1,GotoIf($["${SIP_HEADER(X-Best-Codec)}" = ""]?dial)
exten => _X.,n,Set(SIP_CODEC=${SIP_HEADER(X-Best-Codec)})
exten => _X.,n(dial),Dial(dahdi/${i}r1/${EXTEN},$DIALTIMEOUT)
exten => _X.,n,Hangup()
```

**master extension**

```ini
#include sip_general.conf
#include sip_endpoints.conf
#include sip_master.conf

#include extensions_macro.conf
#include extensions_fxs.conf
#include extensions_master.conf
#include extensions_internal.conf
#include extensions_routing.conf
;#include extensions_sipdef.conf
#include extensions_dialmatchingrules.conf
```

## VS_USB-400

- 无线网关

### 系统环境

- 软件版本 2.1.22
- 硬件版本 1.0
- 一个主控，多个模块，模块不带 CPU
- 无线模块为 高通 Gobi 无线宽带芯片技术 - GobiNet - USB 驱动
- 通道 STM32, 底板 MCU STM8
- 该版本包含 frpc - 允许 openvox cloud 建立链接 - 映射了 ssh 和 web

> 该版本最大的区别是模块不在是独立系统。

| HW     | Desc                                   |
| ------ | -------------------------------------- |
| CPU    | Intel(R) Atom(TM) CPU Z3735G @ 1.33GHz |
| Memory | 1 G                                    |
| Disk   | 16 G Flash                             |

| SW            | Desc                                                                                        |
| ------------- | ------------------------------------------------------------------------------------------- |
| Debian        | 8                                                                                           |
| uname -a      | Linux Wireless-Gateway 4.19.81 #7 SMP Thu Feb 13 08:24:02 CST 2020 i686 i386                |
| Busybox       | v1.22.1                                                                                     |
| Asterisk      | 1.8.20.0                                                                                    |
| /proc/cmdline | BOOT_IMAGE=/vmlinuz ro root=LABEL=kernel1 intel_pstate=disable quiet console=ttyS0,115200n8 |

**/proc/mtrr**

```
reg00: base=0x0ffd00000 ( 4093MB), size=    4MB, count=1: write-protect
reg01: base=0x000000000 (    0MB), size= 1024MB, count=1: write-back
reg02: base=0x03e000000 (  992MB), size=   32MB, count=1: uncachable
reg03: base=0x03d000000 (  976MB), size=   16MB, count=1: uncachable
reg04: base=0x03ce00000 (  974MB), size=    2MB, count=1: uncachable
reg05: base=0x03c800000 (  968MB), size=    4MB, count=1: uncachable
```

**/proc/mounts**

| dev            | size   | path     | fs       |
| -------------- | ------ | -------- | -------- |
| /dev/mmcblk0p6 | 487.9M | /etc/cfg | ext4     |
| /dev/mmcblk0p7 | 487.9M | /data    | ext4     |
| /dev/mmcblk0p2 | 92.8M  | /boot    | ext4     |
| /dev/mmcblk0p4 | 28.9M  | /gateway | squashfs |

**modules**

- GobiNet - 驱动无线模块
- usb_wwan
- cdc_acm
- ch341
- usbserial - 依赖 USB 串口
- cdc_ether
- usbnet
- r8152
- snd_pcm
- snd_timer
- i2c_hid
- i2c_algo_bit
- soundcore
- sdhci_acpi
- button

### 系统目录

- /my_tools -> /gateway/my_tools
- /sound -> /gateway/sound
- /webservice -> /gateway/webservice
- /version -> /gateway/version
- /www -> /gateway/www
- /conf
- /data
  - log/
    - cdr.db
    - smsinbox.db
    - smsoutbox.db
- /etc
  - cfg/ - Asteris 配置 - 独立挂载 - 可备份
    - gw/ - 网关配置
      - n2n/ - 2 层 Mesh 组网
      - sim840w.conf - SIM 模块配置 - AT 命令之类
      - sim6320.conf - SIM 模块配置
      - uc15.conf - SIM 模块配置 - UC15
      - sms.conf - 短信配置
    - cloud/ - 应该是 openvox 云平台之类的 - https://cloud.openvox.com.cn/
      - cloud.conf
      - frpc.ini - openvox 访问 ssh 和 web 的后门
  - udev/rules.d/
    - gobinet.rules - GobiNet 映射 - `/sys/class/net/gobinet*`
    - internet.rules - 模块内部 usbnet 映射 - 会 symlink 到 `/dev/opvx/`
- /tmp
  - hw_info.cfg - 硬件配置 - 由于生成 asterisk gw_gsm.conf 和 extra-channels.conf 配置
- /usr/sbin/cloudMain
- /usr/sbin/cloudExternal
- /usr/sbin/cloudNat
- /gateway - 完整网关系统 - 独立挂载
  - www/ - PHP 网站
  - my_tools/ - 工具集

## Asterisk

> 不管什么版本的网关，Asterisk 的版本似乎都没有变过 - 1.8.20.0

| mod        | desc                                   |
| ---------- | -------------------------------------- |
| chan_extra | GSM/CDMA Telephony Driver FOR Asterisk |

- chan_extra
  - OpenVox 开发的无线模块 - GSM, CDMA 和新的 LTE 均使用该模块
  - opvxg4xx 驱动提供支持
  - 配置文件 extra-channels.conf, chan_extra.conf
  - GSM, CDMA 基于 DAHDi
  - 4G LTE 基于 GobiNet 内核驱动
  - 驱动下载 https://www.openvox.cn/pub/misc/GSM/

```bash
modprobe opvxg4xx
```

```bash
# Asterisk 命令
gsm show spans
```
