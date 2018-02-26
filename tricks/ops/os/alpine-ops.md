## Alpine Operation

## Tips

```bash
# 常用命令
lsblk --output NAME,SIZE,VENDOR,FSTYPE,LABEL,UUID,MODE
# 使用 NAME 排序
lsblk -x NAME --output NAME,SIZE,VENDOR,FSTYPE,LABEL,UUID,MODE
```

## bash
* [*-bash-completion](https://pkgs.alpinelinux.org/packages?name=*-bash-completion&branch=v3.6&repo=&arch=x86_64)
  * 其他的 bash 补全的包

```bash
# Bash
apk add shadow bash
# 该步骤要求输入密码
chsh root -s /bin/bash

# 补全
apk add bash-completion
# 加载补全
source /etc/profile.d/bash_completion.sh
```

## base

```bash
# 常用工具
apk add nano file grep htop rsync curl

apk add openssl
```

## ca
```bash
# /etc/ssl/certs/ca-certificates.crt
```

## ops-base
```bash
# easy to op
apk add tmux mosh

# util-linux
apk add util-linux
apk add blkid cfdisk findmnt mcookie setpriv sfdisk
# 补全
apk add util-linux-bash-completion
```

## Container

```bash
# Docker
apk add docker
rc-update add docker
```


## ops-tool

```bash
apk add pciutils
apk add usbutils
apk add lsof
apk add parted
apk add ddrescue


# dmidecode ownership vpddecode biosdecode
apk add dmidecode
```

## setup-disk

```bash
# 制作系统盘
# swap 0
setup-disk -m sys -s 0 -v /dev/sda

# ==========
# 新系统检查项
# ==========
# 修改主机名
setup-hostname -n alpine-test
/etc/init.d/hostname --quiet restart
nano /etc/hosts

# 修改网络地址
nano /etc/network/interfaces
```

## 磁盘扩展
* 

```bash
# 扩展分区
# 假设分区结构为: boot,swap,root,空闲
# 删除第三个分区, 再创建第三个分区, 确保起点位置不变
fdisk /dev/sda

# 重启
reboot

# 扩展文件系统
apk add e2fsprogs-extra
resize2fs /dev/sda3

# parted 也可以
parted /dev/sdb resize 1 1 200M
parted /dev/sdb resizepart 1 400M
resize2fs /dev/sdb1 400M
```

## udev
* Gentoo [Eudev](https://wiki.gentoo.org/wiki/Project:Eudev)

```bash
# 设置 /dev/disk
apk add udev-init-scripts
# OpenRC compatible fork of systemd-udev
apk add eudev
# init: udev udev-trigger udev-postmount udev-settle
rc-update add udev sysinit
rc-update add udev-trigger sysinit

# 如果想要立即启用
rc-service udev start
rc-service udev-trigger start

udevadm trigger

# 该包会影响网卡名字
# 会添加 /lib/udev/rules.d/80-net-name-slot.rules
# 需要参数 net.ifnames=0 来关闭
# 大多数时候不需要
apk add eudev-netifnames
```

## zfs

* 先安装 [udev](#udev) 环境
* 使用 zfs 时最好使用 uuid, 因为名字可能会发生变化
* 0.6 时, 导致直接系统重启
* 0.6 的 init 不是 openrc 的脚本, 启动会警告

```bash
apk add zfs zfs-{scripts,udev,utils-py}
# 如果是 hardened 内核
apk add zfs-hardened
# vanilla
# apk add zfs-vanilla
# 加载内核模块
modprobe zfs

# init: zfs-import zfs-mount zfs-share zfs-zed
rc-update add zfs-import sysinit
rc-update add zfs-mount sysinit

# 立即启动
rc-service zfs-import start
rc-service zfs-mount start

# 检测是否正常
zpool status

# 查看磁盘量
parted --list
# 查看现有磁盘 UUID
# 依赖于 udev
# 一般会有 ata, scsi, wwn 前缀之类
ls -lh /dev/disk/by-id/
# 只看主盘
ls -lh /dev/disk/by-id/ | grep 'sd.$'

# -f 强制创建, 避免 Does not contain an EFI label 错误
# -o ashift=12 使用高级磁盘格式
# -m /mnt/data 指定挂载点, 不指定则默认挂载为 /<pool>
# p1 Pool 的名字
# raidz 使用 RADI-Z 冗余
zpool create -f -o ashift=12 -m /mnt/data p1 \
  raidz \
    ata-VBOX_HARDDISK_VB63cffc10-3a66b288 \
    ata-VBOX_HARDDISK_VBfb21373d-56cc6c57 \
    ata-VBOX_HARDDISK_VB91ae7aad-d4a73895

# 查看状态
zpool status

#   pool: p1
#  state: ONLINE
#   scan: none requested
# config:
# 
# 	NAME                                       STATE     READ WRITE CKSUM
# 	p1                                         ONLINE       0     0     0
# 	  raidz1-0                                 ONLINE       0     0     0
# 	    ata-VBOX_HARDDISK_VB63cffc10-3a66b288  ONLINE       0     0     0
# 	    ata-VBOX_HARDDISK_VBfb21373d-56cc6c57  ONLINE       0     0     0
# 	    ata-VBOX_HARDDISK_VB91ae7aad-d4a73895  ONLINE       0     0     0
# 
# errors: No known data errors

# 此时可以重启测试看看 pool 是否还在

zpool status -x

# 将 scrub 作为周期性任务
echo '#!/bin/sh -
zpool scrub main
' > /etc/periodic/daily/zfs-scrub
```

### uninstall zfs
```bash
# 销毁使用的 pool
zpool destroy pool

# 停止 service
rc-service zfs-import stop
rc-service zfs-mount stop

# 移除 init
rc-update del zfs-import sysinit
rc-update del zfs-mount sysinit

# 移除内核模块
modprobe -r zfs
```

## btrfs
* kernel [btrfs](	https://btrfs.wiki.kernel.org/)
  * [btrfs.5](https://btrfs.wiki.kernel.org/index.php/Manpage/btrfs(5))
  * [Status](https://btrfs.wiki.kernel.org/index.php/Status)
  * [Mount options](https://btrfs.wiki.kernel.org/index.php/Mount_options)
  * [Incremental Backup](https://btrfs.wiki.kernel.org/index.php/Incremental_Backup)
  * [FAQ](https://btrfs.wiki.kernel.org/index.php/Problem_FAQ)
  * [Gotchas](https://btrfs.wiki.kernel.org/index.php/Gotchas)
    * 不建议使用 RAID5, RAID6
  * [Using Btrfs with Multiple Devices](https://btrfs.wiki.kernel.org/index.php/Using_Btrfs_with_Multiple_Devices)
  
* Debian [Btrfs](https://wiki.debian.org/Btrfs)
  * 不要使用 4.11.x
  * quotas 和 qgroups 有问题
  * subvol 不能够被挂在为不同的选项
  * compress=lzo 可能比较危险
  * -o compress 可能会放大碎片
* Archlinux [Btrfs](https://wiki.archlinux.org/index.php/Btrfs)
  * [中文](https://wiki.archlinux.org/index.php/Btrfs_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))
* raid0, raid1, raid5, raid6, raid10, dup, single

```bash
# 辅助程序
apk add btrfs-progs
apk add btrfs-progs-extra
# 补全
apk add btrfs-progs-bash-completion

# 加载内核模块
modprobe btrfs
# 确保启动时加载
echo btrfs >> /etc/modules

# 加载模块后会生成, 如果没有可以手动创建
# mknod /dev/btrfs-control c 10 234

# -M 混合元数据和数据, 适用于小数据, 数据大了过后磁盘布局不可预见
# -L 指定标签
# -U 可手动指定 UUID, 避免修改 fstab
# -O 指定特性
mkfs.btrfs --help

# 查看支持的特性
mkfs.btrfs -O list-all
# mixed-bg            - mixed data and metadata block groups (0x4, compat=2.6.37, safe=2.6.37)
# extref              - increased hardlink limit per file to 65536 (0x40, compat=3.7, safe=3.12, default=3.12)
# raid56              - raid56 extended format (0x80, compat=3.9)
# skinny-metadata     - reduced-size metadata extent refs (0x100, compat=3.10, safe=3.18, default=3.18)
# no-holes            - no explicit hole extents for files (0x200, compat=3.14, safe=4.0)

# a.b.c.d 做 raid 1
# 这几个设备的 uuid 会变成一样
mkfs.btrfs -d raid1 -m raid1 /dev/sd{a,b,c,d}

# 此时可以将任意一个设备进行挂载
mount /dev/sda /mnt/main/

# 设备扫描
btrfs device scan
# 查看文件系统
btrfs filesystem show
# 查看使用量
btrfs fi df /data

# 执行 scrub
# https://btrfs.wiki.kernel.org/index.php/Manpage/btrfs-scrub
# 结果会存储于 /var/lib/btrfs/
btrfs sc start /data
# 查看执行状态
btrfs sc status /data

# 执行 check
# check or repair a btrfs filesystem
# https://btrfs.wiki.kernel.org/index.php/Manpage/btrfs-check
# 不建议执行在线检测

# 自动挂载需要修改 /etc/fstab
echo "UUID=$(blkid -s UUID -o value /dev/sda) /data btrfs defaults 0 0" >> /etc/fstab
```

### failed to read the system array
* 会导致启动时挂载失败

```bash
[ 1985.671707] BTRFS info (device sde): disk space caching is enabled
[ 1985.671712] BTRFS info (device sde): has skinny extents
[ 1985.675608] BTRFS error (device sde): failed to read the system array: -5
[ 1985.731217] BTRFS error (device sde): open_ctree failed
```

```bash
# 从新扫描后挂载
btrfs dev scan
mount -a

# 如果还不行可以尝试
btrfs rescue zero-log /dev/sde
mount -a
```

## netwoking

## bonding
* Alpine [Bonding](https://wiki.alpinelinux.org/wiki/Bonding)

```bash
# /etc/network/if-post-down.d/bonding
# /etc/network/if-pre-up.d/bonding
# /etc/network/if-up.d/bonding
apk add bonding

# 查看模式
cat /sys/class/net/bond0/bonding/mode
# 查看状态
cat /proc/net/bonding/bond0

ethtool eth0
```

```
auto bond0
iface bond0 inet static
	address 192.168.0.2
	netmask 255.255.255.0
	gateway 192.168.0.1
	# specify the ethernet interfaces that should be bonded
	bond-slaves eth0 eth1 eth2 eth3
```

__tree /sys/class/net/bond0__

```
/sys/class/net/bond0
├── addr_assign_type
├── addr_len
├── address
├── bonding
│   ├── active_slave
│   ├── ad_actor_key
│   ├── ad_actor_sys_prio
│   ├── ad_actor_system
│   ├── ad_aggregator
│   ├── ad_num_ports
│   ├── ad_partner_key
│   ├── ad_partner_mac
│   ├── ad_select
│   ├── ad_user_port_key
│   ├── all_slaves_active
│   ├── arp_all_targets
│   ├── arp_interval
│   ├── arp_ip_target
│   ├── arp_validate
│   ├── downdelay
│   ├── fail_over_mac
│   ├── lacp_rate
│   ├── lp_interval
│   ├── mii_status
│   ├── miimon
│   ├── min_links
│   ├── mode
│   ├── num_grat_arp
│   ├── num_unsol_na
│   ├── packets_per_slave
│   ├── primary
│   ├── primary_reselect
│   ├── queue_id
│   ├── resend_igmp
│   ├── slaves
│   ├── tlb_dynamic_lb
│   ├── updelay
│   ├── use_carrier
│   └── xmit_hash_policy
├── broadcast
├── carrier
├── carrier_changes
├── dev_id
├── dev_port
├── dormant
├── duplex
├── flags
├── gro_flush_timeout
├── ifalias
├── ifindex
├── iflink
├── link_mode
├── lower_eth1 -> ../../../pci0000:00/0000:00:1c.4/0000:02:00.1/net/eth1
├── lower_eth2 -> ../../../pci0000:00/0000:00:1c.4/0000:02:00.2/net/eth2
├── lower_eth3 -> ../../../pci0000:00/0000:00:1c.4/0000:02:00.3/net/eth3
├── mtu
├── name_assign_type
├── netdev_group
├── operstate
├── phys_port_id
├── phys_port_name
├── phys_switch_id
├── power
│   ├── autosuspend_delay_ms
│   ├── control
│   ├── runtime_active_time
│   ├── runtime_status
│   └── runtime_suspended_time
├── proto_down
├── queues
│   ├── rx-0
│   │   ├── rps_cpus
│   │   └── rps_flow_cnt
│   ├── tx-0
│   │   ├── byte_queue_limits
│   │   │   ├── hold_time
│   │   │   ├── inflight
│   │   │   ├── limit
│   │   │   ├── limit_max
│   │   │   └── limit_min
│   │   ├── tx_maxrate
│   │   ├── tx_timeout
│   │   └── xps_cpus
├── speed
├── statistics
│   ├── collisions
│   ├── multicast
│   ├── rx_bytes
│   ├── rx_compressed
│   ├── rx_crc_errors
│   ├── rx_dropped
│   ├── rx_errors
│   ├── rx_fifo_errors
│   ├── rx_frame_errors
│   ├── rx_length_errors
│   ├── rx_missed_errors
│   ├── rx_nohandler
│   ├── rx_over_errors
│   ├── rx_packets
│   ├── tx_aborted_errors
│   ├── tx_bytes
│   ├── tx_carrier_errors
│   ├── tx_compressed
│   ├── tx_dropped
│   ├── tx_errors
│   ├── tx_fifo_errors
│   ├── tx_heartbeat_errors
│   ├── tx_packets
│   └── tx_window_errors
├── subsystem -> ../../../../class/net
├── tx_queue_len
├── type
└── uevent
```

## networking


```bash
apk add ethtool
# 支持更多的参数
apk add ifupdown
apk add iftop
# 支持 -v
apk add run-parts
apk add iproute2
# A utility to ping multiple hosts at once
# http://fping.org/
apk add fping
```

```bash
# 设置地址和掩码
ifconfig eth1 192.168.8.182 netmask 255.255.252.0
# 实际调用
# 这里的 run-parts 可能是 busybox 的 run-parts, 不支持 -v, 建议额外安装
# run-parts --exit-on-error --verbose /etc/network/if-pre-up.d
# ip addr add 192.168.8.182/255.255.252.0 broadcast 192.168.11.255 	  dev eth1 label eth1
ifup -v eth1
```

```
BusyBox v1.26.2 (2017-10-04 13:37:41 GMT) multi-call binary.

Usage: run-parts [-a ARG]... [-u UMASK] [--reverse] [--test] [--exit-on-error] DIRECTORY

Run a bunch of scripts in DIRECTORY

	-a ARG		Pass ARG as argument to scripts
	-u UMASK	Set UMASK before running scripts
	--reverse	Reverse execution order
	--test		Dry run
	--exit-on-error	Exit if a script exits with non-zero
```

```
Usage: run-parts [OPTION]... DIRECTORY
      --test          print script names which would run, but don't run them.
      --list          print names of all valid files (can not be used with
                      --test)
  -v, --verbose       print script names before running them.
      --report        print script names if they produce output.
      --reverse       reverse execution order of scripts.
      --exit-on-error exit as soon as a script returns with a non-zero exit
                      code.
      --lsbsysinit    validate filenames based on LSB sysinit specs.
      --new-session   run each script in a separate process session
      --regex=PATTERN validate filenames based on POSIX ERE pattern PATTERN.
  -u, --umask=UMASK   sets umask to UMASK (octal), default is 022.
  -a, --arg=ARGUMENT  pass ARGUMENT to scripts, use once for each argument.
  -V, --version       output version information and exit.
  -h, --help          display this help and exit.
```

## init
* openrc
* `/etc/conf.d/localmount`
  * 可配置强制挂载点

```conf
```

## iscsi
* https://github.com/open-iscsi
* https://github.com/open-iscsi/open-iscsi
* https://github.com/open-iscsi/targetcli-fb
* https://wiki.archlinux.org/index.php/ISCSI_Target

http://scst.sourceforge.net/

```bash
# An administration shell for storage targets
# init: targetcli
# bin: targetcli
# apk add targetcli

# ISCSI target for SCST - userspace tools
# apk add iscsi-scst

# High performance, transport independent, multi-platform iSCSI initiator
# init: iscsid
# bin: iscsi_discovery, iscsiadm, iscsi-iname
# sbin: iscsid, iscsistart
# conf: 
#   /etc/iscsi/initiatorname.iscsi
#   /etc/iscsi/iscsid.conf
#   /etc/iscsi/ifaces/iface
apk add open-iscsi

```

## netatalk
* [netatalk](http://netatalk.sourceforge.net)
* [Netatalk:wiki](https://en.wikipedia.org/wiki/Netatalk)
* [APF](https://en.wikipedia.org/wiki/Apple_Filing_Protocol) - Apple Filing Protocol
  * CNID - Catalog Node ID
  * 使用 ID 引用, 而非路径
* http://netatalk.sourceforge.net/3.1/htmldocs/configuration.html

## stress

```bash
stress --vm-bytes $(awk '/MemFree/{printf "%d\n", $2 * 0.9;}' < /proc/meminfo)k --vm-keep -m 1
stress --vm-bytes $(awk '/MemFree/{printf "%d\n", $2 * 0.097;}' < /proc/meminfo)k --vm-keep -m 10 
```

## S.M.A.R.T
* https://help.ubuntu.com/community/Smartmontools
* https://en.wikipedia.org/wiki/S.M.A.R.T.
https://wiki.archlinux.org/index.php/S.M.A.R.T.

https://en.wikipedia.org/wiki/Comparison_of_S.M.A.R.T._tools

```bash
smartctl

```

## disk
* badblocks
* e2fsprogs-extra

```bash
apk add cdrkit
# 检测 iso 是否可启动
# 结果中会包含 El Torito 信息
# https://en.wikipedia.org/wiki/El_Torito_(CD-ROM_standard)
isoinfo -d -i is_it_bootable.iso

# burn iso
pv spp-2016.10.0.iso | dd bs=4M of=/dev/sdd
```
## QEMU
* [QEMU](https://www.qemu.org/)
  * [Doc](https://qemu.weilnetz.de/doc/qemu-doc.html)

If you want to run VM as unprivileged user and let Qemu create tunX devices,
then you must add that user to the group "qemu".
If you use KVM for hardware-assisted virtualization, then you may also need
to add that user to the group "kvm".


https://wiki.archlinux.org/index.php/QEMU_(简体中文)

https://allyourco.de/running-vmware-esxi-under-qemu-kvm/

### kvm
* https://wiki.alpinelinux.org/wiki/KVM

```bash
# 基础
apk add qemu-system-x86_64 libvirt
# 32 位
apk add qemu-system-i386
# 如果需要 GUI 管理
apk add libvirt-daemon dbus polkit
# 如果想用其他磁盘格式
apk add qemu-img
# 启用内核模块
modprobe kvm-intel
# 如果是 AMD
# modprobe kvm-amd

# 开机启用
rc-update add libvirtd
rc-update add dbus

# KVM 默认会桥接 NAT, 如果想使用默认的网络配置, 需要加载 tun 模块
modprobe tun

# 添加用户到分组
addgroup $USER kvm
addgroup $USER qemu
addgroup $USER libvirt
```

### virtual-disk
* https://en.wikibooks.org/wiki/QEMU/Images
* qemu-nbd
  * QEMU Disk Network Block Device Server

```bash
modprobe nbd max_part=16
# 链接
qemu-nbd -c /dev/nbd0 image.qcow2
partprobe /dev/nbd0
# 挂载
mount /dev/nbd0p1 /mnt/image

umount /mnt/image

# 断开连接
qemu-nbd -c /dev/nbd0

```


## ntfs

```bash
# Manual http://www.tuxera.com/community/open-source-ntfs-3g/#tab-1414502373-2-22
# http://www.tuxera.com/community/ntfs-3g-manual/
apk add ntfs-3g ntfs-3g-progs

# 挂载
mount -t ntfs-3g /dev/sda1 /mnt/windows
# 或
echo '/dev/sda1 /mnt/windows ntfs-3g defaults 0 0' >  /etc/fstab
```


## ftp

* Archlinux [vsftpd](https://wiki.archlinux.org/index.php/Very_Secure_FTP_Daemon)
* [vsftpd.conf](http://vsftpd.beasts.org/vsftpd_conf.html)
* https://security.appspot.com/vsftpd.html

```bash
apk add vsftp
# 修改配置
nano /etc/vsftpd/vsftpd.conf
# 最简配置, 允许匿名操作
cp /etc/vsftpd/vsftpd.conf /etc/vsftpd/vsftpd.conf.old
echo "
anonymous_enable=YES
write_enable=YES
anon_upload_enable=YES
anon_mkdir_write_enable=YES
dirmessage_enable=YES
xferlog_enable=YES
xferlog_file=/dev/stdout
connect_from_port_20=YES
ftpd_banner=Welcome to wener FTP service.
listen=YES
background=NO
" > /etc/vsftpd/vsftpd.conf

```

## lvm
```bash
apk add lvm2
modprobe dm-mod

# 扫描逻辑分组
vgscan
# 激活
vgchange -ay SangomaVG
lvs
# 挂载
mount /dev/SangomaVG/root /mnt/data
```


## build
* [Creating an Alpine package](https://wiki.alpinelinux.org/wiki/Creating_an_Alpine_package)
* https://wiki.alpinelinux.org/wiki/APKBUILD_Reference
* https://wiki.alpinelinux.org/wiki/Apkindex_format

```bash
# 环境设置
DEV_USER=dev

apk add alpine-sdk
adduser $DEV_USER
echo "$DEV_USER  ALL=(ALL) ALL" >> /etc/sudoers

# 修改 PACKAGER 信息
vi /etc/abuild.conf
addgroup $DEV_USER abuild

# 缓存目录
mkdir -p /var/cache/distfiles
# 给所有人写的权限
# 也可以只给 abuild 组 chgrp abuild /var/cache/distfiles; chmod g+w /var/cache/distfiles
chmod a+w /var/cache/distfiles

# 切换为 $DEV_USER 登陆
# 生成秘钥
abuild-keygen -a -i
#git config --global user.name "Your Full Name"
#git config --global user.email "your@email.address"
mkdir -p /gits
cd /gits
git clone git://git.alpinelinux.org/aports
# 查看相关帮助
abuild -h
```

```bash
# /var/cache/distfiles
abuild checksum
abuild -r
# 位于 $HOME/packages/main/x86_64
```

```bash
docker run --rm -it -v $PWD:/build -v $PWD/distfiles:/var/cache/distfiles -u builder wener/edge:builder
```

* Invalid configuration `x86_64-alpine-linux-musl`: machine `x86_64-alpine-linux` not recognized
  * 可以将 `--build` 和 `--host` 设置为 `x86_64-alpine-linux`
  * 因为部分项目构建是无法将 `musl` 识别为 `gnu`


```
$ abuild -h
abuild 3.0.0_rc3
usage: abuild [options] [-P REPODEST] [-s SRCDEST] [-D DESCRIPTION] [cmd] ...
       abuild [-c] -n PKGNAME[-PKGVER]
Options:
 -A  Print CARCH and exit
 -c  Enable colored output
 -d  Disable dependency checking
 -D  Set APKINDEX description (default: $repo $(git describe))
 -f  Force specified cmd, even if they are already done
 -F  Force run as root
 -h  Show this help
 -i  Install PKG after successful build
 -k  Keep built packages, even if APKBUILD or sources are newer
 -K  Keep buildtime temp dirs and files (srcdir/pkgdir/deps)
 -m  Disable colors (monochrome)
 -P  Set REPODEST as the repository location for created packages
 -q  Quiet
 -r  Install missing dependencies from system repository (using sudo)
 -R  Recursively build and install missing dependencies (using sudo)
 -s  Set source package destination directory
 -u  Recursively build and upgrade all dependencies (using sudo)
 -v  Verbose: show every command as it is run (very noisy)

Commands:
  build       Compile and install package into $pkgdir
  check       Run any defined tests concerning the package
  checksum    Generate checksum to be included in APKBUILD
  clean       Remove temp build and install dirs
  cleancache  Remove downloaded files from $SRCDEST
  cleanoldpkg Remove binary packages except current version
  cleanpkg    Remove already built binary and source package
  deps        Install packages listed in makedepends and depends
  fetch       Fetch sources to $SRCDEST and verify checksums
  index       Regenerate indexes in $REPODEST
  listpkg     List target packages
  package     Create package in $REPODEST
  prepare     Apply patches
  rootbld     Build package in clean chroot
  rootpkg     Run 'package', the split functions and create apks as fakeroot
  sanitycheck Basic sanity check of APKBUILD
  snapshot    Create a $giturl or $svnurl snapshot and upload to $disturl
  sourcecheck Check if remote source package exists upstream
  srcpkg      Make a source package
  undeps      Uninstall packages listed in makedepends and depends
  unpack      Unpack sources to $srcdir
  up2date     Compare target and sources dates
  verify      Verify checksums

To activate cross compilation specify in environment:
  CHOST       Arch or hostspec of machine to generate packages for
  CTARGET     Arch or hostspec of machine to generate compiler for
```


## libguestfs
* https://en.wikipedia.org/wiki/Libguestfs
* https://bugs.alpinelinux.org/issues/1792
* 会编译失败, 因为用了 glibc 特有的 printf 修饰符
  * https://www.redhat.com/archives/libguestfs/2016-August/msg00002.html
  * No support for glibc-style extended printf formatters.

```bash

```

```
guestfish: guest filesystem shell
guestfish lets you edit virtual machine filesystems
Copyright (C) 2009-2016 Red Hat Inc.
Usage:
  guestfish [--options] cmd [: cmd : cmd ...]
Options:
  -h|--cmd-help        List available commands
  -h|--cmd-help cmd    Display detailed help on 'cmd'
  -a|--add image       Add image
  -c|--connect uri     Specify libvirt URI for -d option
  --csh                Make --listen csh-compatible
  -d|--domain guest    Add disks from libvirt guest
  --echo-keys          Don't turn off echo for passphrases
  -f|--file file       Read commands from file
  --format[=raw|..]    Force disk format for -a option
  -i|--inspector       Automatically mount filesystems
  --keys-from-stdin    Read passphrases from stdin
  --listen             Listen for remote commands
  --live               Connect to a live virtual machine
  -m|--mount dev[:mnt[:opts[:fstype]]]
                       Mount dev on mnt (if omitted, /)
  --network            Enable network
  -N|--new [filename=]type
                       Create prepared disk (test<N>.img or filename)
  -n|--no-sync         Don't autosync
  --no-dest-paths      Don't tab-complete paths from guest fs
  --pipe-error         Pipe commands can detect write errors
  --progress-bars      Enable progress bars even when not interactive
  --no-progress-bars   Disable progress bars
  --remote[=pid]       Send commands to remote guestfish
  -r|--ro              Mount read-only
  --selinux            Enable SELinux support
  -v|--verbose         Verbose messages
  -V|--version         Display version and exit
  -w|--rw              Mount read-write
  -x                   Echo each command before executing it

To examine a disk image, ISO, hard disk, filesystem etc:
  guestfish [--ro|--rw] -i -a /path/to/disk.img
or
  guestfish [--ro|--rw] -i -d name-of-libvirt-domain

--ro recommended to avoid any writes to the disk image.  If -i option fails
run again without -i and use 'run' + 'list-filesystems' + 'mount' cmds.

For more information, see the manpage guestfish(1).
```

## acf
* [Alpine Configuration Framework Design](https://wiki.alpinelinux.org/wiki/Alpine_Configuration_Framework_Design)
* [ACF packages](https://wiki.alpinelinux.org/wiki/ACF_packages)
* [acf-*](https://pkgs.alpinelinux.org/packages?name=acf-*&branch=v3.6&arch=x86_64)

```bash
```

## crond

```
echo 'CRON_OPTS="-c /etc/crontabs -L /var/log/crond.log -l 6"' > /etc/conf.d/crond
rc-update add crond
rc-service crond restart
```

## benchmark





## FAQ
### ip: ioctl 0x8913 failed: no such device
* 可能是网卡名字发生了改变

### 恢复网卡名字
* 安装 udev 后可能会出现, 因为 udev 可能会进行重命名
* 此时 eth0 可能就不存在了, 此时可能名字为 enp0s3 这样的
* 在 udev 中改变 if name 的为独立包, `	eudev-netifnames`, 将该包移除即可
  * `/lib/udev/rules.d/80-net-name-slot.rules`

```bash
# 查看网络设备名
cat /proc/net/dev

# 查看网络控制器
lspci | egrep -i --color 'network|ethernet'
# 查看网络相关硬件
lshw -class network

ifconfig -a
ip link show
ip a
```

### 文件系统变成了只读

* 看看 `/etc/fstab` 的 UUID 是否有多的,错误的或重复的
* 使用 df 查看当前挂载设备
* blkid 查看设备 UUID
* 从新挂载为读写 `mount -rw -o remount UUID=<正确的 UUID> /`
* 修改 `/etc/fstab`
* 重启

### find: /sys/module/pcc_cpufreq
 
* 查看 linux/cpufreq


### traps: rc-status[3854] general protection
* `rc-status sysinit` 时出现该异常
* [OpenRC/openrc#168](https://github.com/OpenRC/openrc/issues/168)

```
[ 6921.149981] traps: rc-status[3854] general protection ip:7ca2e00baa1b sp:7ecdf01d7038 error:0
[ 6921.149987]  in ld-musl-x86_64.so.1[7ca2e009d000+89000]
[ 6921.150003] grsec: From 192.168.11.29: Segmentation fault occurred at            (nil) in /bin/rc-status[rc-status:3854] uid/euid:0/0 gid/egid:0/0, parent /bin/bash[bash:3570] uid/euid:0/0 gid/egid:0/0
[ 6921.150020] grsec: From 192.168.11.29: denied resource overstep by requesting 4096 for RLIMIT_CORE against limit 0 for /bin/rc-status[rc-status:3854] uid/euid:0/0 gid/egid:0/0, parent /bin/bash[bash:3570] uid/euid:0/0 gid/egid:0/0
```

```bash
# 生成转储的异常为 denied resource overstep by requesting 4096 for RLIMIT_CORE against limit 0
# 查看当前的 limit
ulimit -a
# 配置文件
cat /etc/security/limits.conf
# RLIMIT_CORE = 0 说明不能创建转储
# 针对当前会话设置, 再次调用时会生成 core 文件
ulimit -c 4096
```

RLIMIT_AS //进程的最大虚内存空间，字节为单位。
RLIMIT_CORE //内核转存文件的最大长度。
RLIMIT_CPU //最大允许的CPU使用时间，秒为单位。当进程达到软限制，内核将给其发送SIGXCPU信号，这一信号的默认行为是终止进程的执行。然而，可以捕捉信号，处理句柄可将控制返回给主程序。如果进程继续耗费CPU时间，核心会以每秒一次的频率给其发送SIGXCPU信号，直到达到硬限制，那时将给进程发送 SIGKILL信号终止其执行。
RLIMIT_DATA //进程数据段的最大值。
RLIMIT_FSIZE //进程可建立的文件的最大长度。如果进程试图超出这一限制时，核心会给其发送SIGXFSZ信号，默认情况下将终止进程的执行。
RLIMIT_LOCKS //进程可建立的锁和租赁的最大值。
RLIMIT_MEMLOCK //进程可锁定在内存中的最大数据量，字节为单位。
RLIMIT_MSGQUEUE //进程可为POSIX消息队列分配的最大字节数。
RLIMIT_NICE //进程可通过setpriority() 或 nice()调用设置的最大完美值。
RLIMIT_NOFILE //指定比进程可打开的最大文件描述词大一的值，超出此值，将会产生EMFILE错误。
RLIMIT_NPROC //用户可拥有的最大进程数。
RLIMIT_RTPRIO //进程可通过sched_setscheduler 和 sched_setparam设置的最大实时优先级。
RLIMIT_SIGPENDING //用户可拥有的最大挂起信号数。
RLIMIT_STACK //最大的进程堆栈，以字节为单位。


### ip: RTNETLINK answers: File exists
* ip addr add 时出现
* usually indicates that a route already exists and you are trying to add it again. 
* [rtnetlink.7](http://man7.org/linux/man-pages/man7/rtnetlink.7.html)
  * Linux IPv4 routing socket
* 网络启停时是依据 `/var/run/ifstate` 中的 if 状态进行操作
* 如果一开始停止失败, 那么就会导致启动是会, 导致实际的 if 状态和 ifstate 中的状态不一致
* [Two Default Gateways on One System](https://www.thomas-krenn.com/en/wiki/Two_Default_Gateways_on_One_System)
* inetfaces 中只能指定一条 gateway
  * 如果指定了多条会出现该异常
* [Linux Advanced Routing & Traffic Control](http://lartc.org/)

```bash
# 例如
ip addr add 192.168.8.182/255.255.252.0 broadcast 192.168.8.255 dev eth1 label eth1
# 此时可以尝试
ip addr flush dev eth1
# 查看实际操作
strace -e open ifup eth1
# 直接添加 eth1=eth1
nano /var/run/ifstate
# 然后就可以正常操作 ifup 和 ifdown 了
```



### grsec: time set by /sbin/hwclock[hwclock:2863]
```
[   14.977686] grsec: time set by /sbin/hwclock[hwclock:2863] uid/euid:0/0 gid/egid:0/0, parent /lib/rc/sh/openrc-run.sh[openrc-run.sh:2838] uid/euid:0/0 gid/egid:0/0
```

### node docker seg fault
* [sass/node-sass#2031](https://github.com/sass/node-sass/issues/2031) Segmentation fault on Node 8 alpine (docker)
* 是由于线程栈太小了导致
* jubel-han 的 [Dockerfile](https://github.com/jubel-han/dockerfiles/blob/master/node/Dockerfile) 提供了一个 LD_PRELOAD 
* [What is the LD_PRELOAD trick?](https://stackoverflow.com/q/426230/1870054)
* http://wiki.musl-libc.org/wiki/Functional_differences_from_glibc#Thread_stack_size

### PHP 下 iconv 有问题
Alpine 下 PHP 的 iconv 有问题 https://github.com/docker-library/php/issues/428
https://github.com/docker-library/php/issues/240

```bash
apk add --no-cache gnu-libiconv --repository http://mirrors.aliyun.com/alpine/edge/testing
LD_PRELOAD=/usr/lib/preloadable_libiconv.so php
# 或
export LD_PRELOAD="/usr/lib/preloadable_libiconv.so php"
```

```Dockerfile
RUN apk add gnu-libiconv --no-cache --repository mirrors.aliyun.com/alpine/edge/testing
ENV LD_PRELOAD /usr/lib/preloadable_libiconv.so php
```

### rc-status sysinit 异常
* 可能是由于 zfs-zed 导致
* https://github.com/OpenRC/openrc/issues/168#issuecomment-349870167
* https://github.com/zfsonlinux/zfs/issues/6930
* https://wiki.debian.org/LSBInitScripts

### InfiniBand

```
[   12.225627] mlx4_core 0000:42:00.0: PCIe link speed is 5.0GT/s, device supports 5.0GT/s
[   12.225632] mlx4_core 0000:42:00.0: PCIe link width is x8, device supports x8
[   12.501725] NET: Registered protocol family 10
[   12.537987] mlx4_en: Mellanox ConnectX HCA Ethernet driver v2.2-1 (Feb 2014)
[   12.538258] mlx4_en 0000:42:00.0: Activating port:1
[   12.550287] mlx4_en: 0000:42:00.0: Port 1: Using 256 TX rings
[   12.550289] mlx4_en: 0000:42:00.0: Port 1: Using 8 RX rings
[   12.550292] mlx4_en: 0000:42:00.0: Port 1:   frag:0 - size:1522 prefix:0 stride:1536
[   12.550428] mlx4_en: 0000:42:00.0: Port 1: Initializing port
[   12.563234] <mlx4_ib> mlx4_ib_add: mlx4_ib: Mellanox ConnectX InfiniBand driver v2.2-1 (Feb 2014)
[   12.566383] <mlx4_ib> mlx4_ib_add: counter index 1 for port 1 allocated 1
```

```
$ tree /lib/modules/4.9.65-1-hardened/kernel/drivers/infiniband/
/lib/modules/4.9.65-1-hardened/kernel/drivers/infiniband/
├── core
│   ├── ib_cm.ko
│   ├── ib_core.ko
│   ├── ib_ucm.ko
│   ├── ib_umad.ko
│   ├── ib_uverbs.ko
│   ├── iw_cm.ko
│   ├── rdma_cm.ko
│   └── rdma_ucm.ko
├── hw
│   ├── cxgb3
│   │   └── iw_cxgb3.ko
│   ├── cxgb4
│   │   └── iw_cxgb4.ko
│   ├── hfi1
│   │   └── hfi1.ko
│   ├── i40iw
│   │   └── i40iw.ko
│   ├── mlx4
│   │   └── mlx4_ib.ko
│   ├── mlx5
│   │   └── mlx5_ib.ko
│   ├── mthca
│   │   └── ib_mthca.ko
│   ├── nes
│   │   └── iw_nes.ko
│   └── qib
│       └── ib_qib.ko
├── sw
│   ├── rdmavt
│   │   └── rdmavt.ko
│   └── rxe
│       └── rdma_rxe.ko
└── ulp
    ├── ipoib
    │   └── ib_ipoib.ko
    ├── iser
    │   └── ib_iser.ko
    ├── isert
    │   └── ib_isert.ko
    ├── srp
    │   └── ib_srp.ko
    └── srpt
        └── ib_srpt.ko
```


### TBD
```
[    0.013013] DMAR-IR: This system BIOS has enabled interrupt remapping
               on a chipset that contains an erratum making that
               feature unstable.  To maintain system stability
               interrupt remapping is being disabled.  Please
               contact your BIOS vendor for an update



[ 7785.189928] perf: interrupt took too long (2658 > 2500), lowering kernel.perf_event_max_sample_rate to 75000
```
