---
title: Netboot
---

# Netboot

- [google/netboot](https://github.com/google/netboot)
  - Go 实现
- AlpineLinux
  - [PXE boot](https://wiki.alpinelinux.org/wiki/PXE_boot)
  - netboot [boot.alpinelinux.org](http://boot.alpinelinux.org/)
  - Mirror 里也都有 netboot 依赖用的东西 https://mirrors.sjtug.sjtu.edu.cn/alpine/v3.16/releases/x86_64/netboot/
- ArchLinux
  - [Netboot](https://wiki.archlinux.org/index.php/Netboot)
- 参考
  - [How to use gPXE with QEMU](http://etherboot.org/wiki/qemu)
  - [thereapsz/alpine-pxe](https://github.com/thereapsz/alpine-pxe)
    - 在 docker 中运行 ubuntu 的 pxe 服务
  - [Debugging PXE boot with QEMU](http://www.saminiir.com/debugging-pxe-boot/)
- https://en.wikipedia.org/wiki/Storage_area_network

| 后缀          | 说明                                           |
| ------------- | ---------------------------------------------- |
| .iso          | CD/DVD, 虚拟光驱, DARC/iLO, VMware, VBox       |
| .dsk          | 1.44 MB 软盘, 虚拟软盘, DARC/iLO, VMware, VBox |
| .usb          | 用于创建 USB                                   |
| .lkrn         | 用于从 GRUB/EXTLINUX 启动                      |
| .kpxe         | DHCP 启动镜像或內建 iPXE 网卡                  |
| undionly.kpxe | 带 UNDI 支持的 PXE 镜像                        |
| .efi          | EFI 启动镜像                                   |

```bash
wget -nd -P x86_64 --mirror http://boot.alpinelinux.org/images/latest-stable/x86_64/
```

## iPXE

- [ipxe.org](http://ipxe.org)
- [ipxe/ipxe](https://github.com/ipxe/ipxe)
- Wikipedia [IPXE](https://en.wikipedia.org/wiki/IPXE)
- [命令行](http://ipxe.org/cmd)
- 下载目录 [boot.ipxe.org](http://boot.ipxe.org/)
- 在 PXE 上新增特性
  - boot from a web server via HTTP
  - boot from an iSCSI SAN
  - boot from a Fibre Channel SAN via FCoE
  - boot from an AoE SAN
  - boot from a wireless network
  - boot from a wide-area network
  - boot from an Infiniband network
  - control the boot process with a script
- QMUE 集成了 iPXE
- 有些网卡集成了 iPXE
- 参考
  - [Custom iPXE](https://help.packet.net/technical/infrastructure/custom-ipxe)
- 注意
  - QEMU 不支持 https
  - QMEU 版本为 1.0.0 很多命令没有

```bash
# 使用 Esc+2 切换到 monitor, Esc+1 切换到控制台
qemu-system-x86_64 -net nic -net user -curses

# 或者使用官方的内核
curl http://boot.ipxe.org/ipxe.lkrn -O
qemu-system-x86_64 -net nic -net user
```

### 自定义

```bash
# http://ipxe.org/download
# http://ipxe.org/howto/chainloading
# 例如
make bin/undionly.kpxe EMBED=demo.ipxe
```

### 命令行

```bash
# 所有配置 http://ipxe.org/cfg
# 查看当前版本号
show version
# 显示构建的平台
show platform

# 自动配置网络
dhcp

# ipxe 的演示脚本
chain http://boot.ipxe.org/demo/boot.php
```

### http://boot.ipxe.org/demo/boot.php

```bash
#!ipxe

kernel vmlinuz-3.16.0-rc4 bootfile=http://boot.ipxe.org/demo/boot.php fastboot initrd=initrd.img
initrd initrd.img
boot
```

## AlpineLinux

- https://pkgs.alpinelinux.org/package/edge/testing/x86_64/alpine-ipxe

```bash
# 使用 alpine 启动脚本
# QEMU 报 imgtrust 命令找不到 http://ipxe.org/cmd/imgtrust
chain --autofree http://boot.alpinelinux.org/boot.ipxe
```

### http://boot.alpinelinux.org/boot.ipxe

```bash
#!ipxe

set os Alpine Linux
cpuid --ext 29 && set arch x86_64 || set arch x86

imgtrust --permanent

menu ${os} [ ${arch} ]
item latest-stable Latest stable
item edge Edge (development)
choose version || goto alpine_exit
goto boot

:boot
set img-url http://boot.alpinelinux.org/images/${version}/${arch}
set repo-url http://dl-cdn.alpinelinux.org/alpine/${version}/main
imgfree
kernel ${img-url}/vmlinuz-vanilla alpine_repo=${repo-url} modules=loop,squashfs modloop=${img-url}/modloop-vanilla quiet nomodeset
imgverify vmlinuz-vanilla ${img-url}/vmlinuz-vanilla.sig
initrd ${img-url}/initramfs-vanilla
imgverify initramfs-vanilla ${img-url}/initramfs-vanilla.sig
boot
goto alpine_exit

:alpine_exit
clear menu
exit 0
```

## netboot.xyz

- [netboot.xyz](https://netboot.xyz/)
  - [HN](https://news.ycombinator.com/item?id=10923460)
- [antonym/netboot.xyz](https://github.com/antonym/netboot.xyz)
  - 所有的脚本 [src/](https://github.com/antonym/netboot.xyz/tree/master/src)
- [tftp](https://netboot.xyz/booting/tftp/)
- 启动配置 https://boot.netboot.xyz/boot.cfg
- memdisk https://boot.netboot.xyz/memdisk
- 默认脚本 https://boot.netboot.xyz
- 支持的系统
  - Alpine Linux
  - Antergos
  - Arch Linux
  - CentOS
  - CoreOS Container Linux
  - Debian
  - Devuan
  - Fedora
  - FreeBSD
  - FreeDOS
  - Gentoo
  - IPFire
  - Mageia
  - Manjaro Linux
  - Microsoft Windows
  - MirOS
  - OpenBSD
  - OpenSUSE
  - RancherOS
  - Red Hat Enterprise Linux
  - Scientific Linux
  - Tiny Core Linux
  - Ubuntu
- 支持的架构
  - x86_64
  - i386
  - arm

```bash
# 使用 netboot.xyz 启动脚本
# 如果不支持 https 则可以使用 http
chain --autofree https://boot.netboot.xyz
```

### https://boot.netboot.xyz

```bash
#!ipxe
####       boot.netboot.xyz initial loader       ####
#### see http://netboot.xyz for more information ####
set conn_type https
chain --autofree https://boot.netboot.xyz/menu.ipxe || echo HTTPS failed... attempting HTTP...
set conn_type http
chain --autofree http://boot.netboot.xyz/menu.ipxe || echo HTTP failed, localbooting...
```
