---
title: Netboot
---

# Netboot

- [google/netboot](https://github.com/google/netboot)
  - Go 实现
- AlpineLinux
  - [Alpine Netboot](../../alpine/alpine-pxe.md)
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
