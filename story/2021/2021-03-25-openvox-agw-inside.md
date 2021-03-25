---
title: OpenVox 网关分析
slug: openvox-agw-inside
tags:
  - 嵌入式
  - 系统
---

# OpenVox 网关  分析

 因为淘到一个二手 OpenVox 语音网关，就好奇"里面"长什么样。

Let's find out.

<!-- more -->

## VS-AGU-E2M0800

- VS - VoxStack 系列 - 模块化，热插拔
- AGU - Analog Gateway - 模拟网关
- 软件 1.1.10
- 硬件 1.0.0

## Web 管理界面

界面类似于官方演示 http://admin:admin@demo.openvox.cn:65327

通过开启 ssh, 账号名设置为 super 可获取到 root 权限，默认 SSH 端口 12345。

## 硬件

> 未开箱，不一定准确。

| -    | 规格                                   |
| ---- | -------------------------------------- |
| 内存 | 128M                                   |
| CPU  | ARMv6-compatible processor rev 5 (v6l) |

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

| -        | -                                                                     |
| -------- | --------------------------------------------------------------------- |
| 内核     | Linux General 2.6.33.5 #4 Tue Aug 29 20:38:01 CST 2017 armv6l unknown |
| Busybox  | 1.4.2                                                                 |
| Asterisk | 1.8.20.0 / 1.8.X 发布于 2010-10-21 EOL 2015-10-21                     |

> Busybox applet
>
> [, [[, arping, ash, awk, awx, basename, bunzip2, bzcat, cat, chgrp, chmod, chown, chroot, clear, cp, crond, crontab, cut, date, df, dirname, dmesg, du, echo, egrep, env, expr, false, fgrep, find, free, getty, grep, gunzip, gzip, halt, head, hostid, hostname, httpd, id, ifconfig, init, insmod, ipkg, kill, killall, killall5, klogd, length, less, ln, lock, logger, login, logread, ls, lsmod, md5sum, mdev, mesg, mkdir, mkfifo, mknod, mktemp, mount, mv, nc, netmsg, netstat, nice, nslookup, passwd, pidof, ping, ping6, pivot_root, poweroff, printf, ps, pwd, rdate, reboot, renice, reset, rm, rmdir, rmmod, route, sed, seq, sh, sleep, sort, strings, stty, switch_root, sync, sysctl, syslogd, tail, tar, tee, telnet, test, time, top, touch, tr, traceroute, true, tty, udhcpc, umount, uname, uniq, uptime, vconfig, vi, watchdog, wc, wget, which, xargs, yes, zcat

**内核模块**

| Module    | Size   | Used by     |
| --------- | ------ | ----------- |
| wctdmc1k  | 30096  | 16          |
| dcra      | 8524   | 1 wctdmc1k  |
| dahdi     | 185948 | 17 wctdmc1k |
| krtpd     | 148520 | 0           |
| csmencaps | 14740  | 2           |
| led_key   | 2500   | 4           |

* dahdi
  * wctdmc1k - OpenVox 模拟信号处理模块
  * dcra
* csmencaps - FX 处理相关模块
* led_key - 应该是驱动面板 led 的

### 系统目录

- /www -> /tmp/web/www
- /tmp/web/www - cgi-bin css images index.html js lang - 管理应用
- /data/
  - info/
  - log/
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
| kmod-csme                 | 2.6.33.5+2.14.0-comcerto1000-   |
| kmod-fci                  | 2.6.33.5+7.00-comcerto1000-1    |
| kmod-fpp-csme             | 2.6.33.5+2.14.0-comcerto1000-   |
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

- add_syslog
- addkey_client.sh
- addkey_server.sh
- astmanproxy
- checkAsteriskProc.sh
- checkCapture.sh
- checkStartFinish.sh
- checkasteriskstat
- cluster_mode
- cluster_slave
- cpuusage
- eth_server.conf
- fetch
  - 解密固件
  - openssl enc -aes-256-cbc -d -in firmware.img -pass pass:O7r8yGv0cdlNM4lQ -out firmware.tar.gz
- get_backport
- gwping
- gwpingd
- if_monitor
- keeper
- krtpd_cli
- led_key.ko
- logfile_monitor
- lstast
- net_tool
- ntpclient
- play_all_led
- process_cdr
- readDeviceID
- resetkey
- restore_cfg_file
- safe_append_to_file
- safe_reboot
- set_busytone.sh
- set_config
- set_default
- set_registers.sh
- sys_restore
- unpack.sh
  - 用于解压固件 - unzip, md5 checmsum, 解密, unzip
- watchdog
- web_language_init

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

 固件升级使用 openvox 内置的自定义工具 /usr/bin/auto_update，主要涉及操作 mtd。

```bash
# -i 1 - 使用 ubiblk
auto_update -i 1
# -b 升级 ubook
auto_update -b u-boot.bin
# -f 更新文件， -u 升级系统
auto_update -u -f AnalogGateway.img
```
