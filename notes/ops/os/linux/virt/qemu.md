---
slug: qemu
title: QEMU
---

# QEMU

## Tips

- [qemu.org](https://www.qemu.org/)
- [QEMU:wiki](https://en.wikipedia.org/wiki/QEMU)
- https://www.qemu.org/docs/master/
- https://qemu.weilnetz.de/doc/qemu-doc.html
- VirtualBox , Xen 和 KVM 基于 QEMU
- 安卓虚拟机基于 QEMU ARM 虚拟
- QEMU-SystemC 使用 QEMU 来模拟使用 SystemC 开发的硬件
- Symmetric multiprocessing (SMP
- 网络
  - [Setup NAT Network for QEMU in Mac OSX](https://blog.san-ss.com.ar/2016/04/setup-nat-network-for-qemu-macosx)
- https://en.wikipedia.org/wiki/Network_block_device
- https://www.gitbook.com/book/stamp711/vexpress-a9-on-qemu/details

- qemu-system-\$ARCH - 系统虚拟化
- qemu-\$ARCH - 用户空间模拟
- qemu-edid - edid generator 测试工具
- [qemu-ga](https://www.qemu.org/docs/master/interop/qemu-ga.html) - Guest Agent
  - 宿主机获取信息
  - 设置时间
  - 读写文件
  - 同步、冻结文件系统
  - 暂存/suspend
  - 配置本地处理器
  - 设置密码
- qemu-img - 镜像操作工具
- qemu-io - Disk exerciser
- qemu-keymap
- qemu-nbd - Disk Network Block Device Server
- qemu-storage-daemon
  - provides access to QEMU block-layer/QMP features like blocks jobs or built-in NBD server without starting a full VM
- [qemu-pr-helper](https://www.qemu.org/docs/master/interop/pr-helper.html) - Persistent Reservation helper
  - SCSI 设备透传, scsi-block, scsi-generic
- accel - 硬件加速
  - tcg - 无加速 - 默认
  - kvm - Linux
  - hax - Intel 平台 - macOS/Windows
  - whpa - hyperv

https://wiki.archlinux.org/index.php/QEMU_(简体中文)
https://wiki.gentoo.org/wiki/QEMU/Options

http://www.tightvnc.com/download.php

https://wiki.qemu.org/Documentation/Platforms/ARM
https://wiki.qemu.org/Features/CPUModels

machine
https://remimin.github.io/2019/07/09/qemu_machine_type/

```bash
# Mac 安装
brew install qemu

# 使用硬件加速启动一个空虚拟机
qemu-system-x86_64 -machine accel=kvm

# 生成随机 mac 地址到 macaddr
printf -v macaddr "52:54:%02x:%02x:%02x:%02x" $(( $RANDOM & 0xff)) $(( $RANDOM & 0xff )) $(( $RANDOM & 0xff)) $(( $RANDOM & 0xff ))

random-macaddr(){
  printf "52:54:%02x:%02x:%02x:%02x" $(( $RANDOM & 0xff)) $(( $RANDOM & 0xff )) $(( $RANDOM & 0xff)) $(( $RANDOM & 0xff ))
}

# -netdev tap,id=t0,ifname=en5,script=no,downscript=no -device e1000,netdev=t0,id=nic0,mac=52:54:00:12:34:58
qemu-system-x86_64 -hda vdisk.img -cdrom alpine-standard-3.6.2-x86_64.iso -netdev user,id=en5,net=192.168.8.0/22,dhcpstart=192.168.8.1 -device e1000,netdev=en5,id=nic0,mac=$(random-macaddr)

# 在 macOS 下使用桥接
# 1. 需要在网络偏好中添加一个桥接网络,需要选择物理网卡
# 2. 启动时使用自定义的脚本
qemu-system-x86_64 -smp 2 -vnc :5 -m 1024 -drive file=disk.img,if=virtio -device virtio-balloon -boot c \
  -net nic,model=virtio,macaddr=54:54:00:55:55:55 -net tap,script=../scripts/tap-up,downscript=../scripts/tap-down

# tap-up
TAPDEV="$1"
BRIDGEDEV="bridge0"
ifconfig $BRIDGEDEV addm $TAPDEV

# tap-down
TAPDEV="$1"
BRIDGEDEV="bridge0"
ifconfig $BRIDGEDEV deletem $TAPDEV

# OpenWRT - ARM
# https://wiki.openwrt.org/doc/howto/qemu
# 下载页 https://downloads.openwrt.org/snapshots/trunk/realview/generic/
# 由于没有对应的 PCI 实现, 无法从磁盘等 IDE/SCSI 控制器启动, 但可以从 SD 启动, 只是可能 SD 有大小限制
wget https://downloads.openwrt.org/snapshots/trunk/realview/generic/openwrt-realview-vmlinux-initramfs.elf
qemu-system-arm -M realview-eb-mpcore -kernel openwrt-realview-vmlinux-initramfs.elf -net nic -net user -nographic

# 从 SD 启动
wget https://downloads.openwrt.org/snapshots/trunk/realview/generic/openwrt-realview-vmlinux.elf
wget https://downloads.openwrt.org/snapshots/trunk/realview/generic/openwrt-realview-sdcard.img
qemu-system-arm -M realview-pbx-a9 -m 1024M -nographic \
  -kernel openwrt-realview-vmlinux.elf \
  -sd openwrt-realview-sdcard.img \
  -append "console=ttyAMA0 verbose debug root=/dev/mmcblk0p1"

# Alpine - ARM
tar -zxvf alpine-uboot-3.6.2-armhf.tar.gz -C alpine-uboot-3.6.2-armhf
cd alpine-uboot-3.6.2-armhf
# qemu-system-arm -M vexpress-a9 -kernel zImage -initrd initramfs-grsec -dtb vexpress-v2p-ca9.dtb -hda hda.img -serial stdio
qemu-system-arm -M vexpress-a9 -kernel boot/vmlinuz-hardened \
  -initrd boot/initramfs-hardened -dtb boot/dtbs/vexpress-v2p-ca9.dtb \
  -append "console=ttyAMA0 verbose debug" -nographic

qemu-system-arm -M vexpress-a9 -kernel boot/vmlinuz-hardened \
  -initrd boot/initramfs-hardened -dtb boot/dtbs/vexpress-v2p-ca9.dtb \
  -append "console=ttyAMA0 verbose debug root=/dev/mmcblk0" -nographic

```

## 快捷键

- M -> 修饰键
  - 默认为 Ctrl+Alt
  - `-alt-grab` - `Ctrl-Alt-Shift`
  - `-ctrl-grab` - 右 Ctrl

| 快捷键 | 作用                                                      |
| ------ | --------------------------------------------------------- |
| M-f    | 全屏切换                                                  |
| M-+    | 增大屏幕                                                  |
| M--    | 缩小屏幕                                                  |
| M-u    | 恢复屏幕大小                                              |
| M-n    | 切换为虚拟控制台 'n', 1: 目标系统显示, 2: 监视器, 3: 串口 |
| C-A    | 切换键盘和鼠标捕获                                        |
| C-a h  | 在 `-nographic` 显示帮助                                  |

## 特性

- 运行模式
  - 全系统模拟
    - 运行任意系统任意架构
  - 用户模式模拟
    - 需要与宿主机架构相同
  - 虚拟化
    - 运行于 KVM 和 XEN
- 特点
  - 在没有主机驱动的前提下提供可接受的性能
  - 支持多台
  - 提供精确的软件模拟 FPU
- PC 支持模拟的外设
  - i440FX host PCI bridge and PIIX3 PCI to ISA bridge
  - Cirrus CLGD 5446 PCI VGA card or dummy VGA card with Bochs VESA extensions (hardware level, including all non standard modes).
  - PS/2 mouse and keyboard
  - 2 PCI IDE interfaces with hard disk and CD-ROM support
  - Floppy disk
  - PCI and ISA network adapters
  - Serial ports
  - IPMI BMC, either and internal or external one
  - Creative SoundBlaster 16 sound card
  - ENSONIQ AudioPCI ES1370 sound card
  - Intel 82801AA AC97 Audio compatible sound card
  - Intel HD Audio Controller and HDA codec
  - Adlib (OPL2) - Yamaha YM3812 compatible chip
  - Gravis Ultrasound GF1 sound card
  - CS4231A compatible sound card
  - PCI UHCI, OHCI, EHCI or XHCI USB controller and a virtual USB-1.1 hub.
- SMP is supported with up to 255 CPUs.

## 虚拟化说明

- x86/x86-64
  - 特性
    - 支持 16/32 为地址段; 支持模拟 LDT/GDT 和 IDT; 支持 VM86 允许 DOSEMU; 部分支持 MMX/3DNow, SSE, SSE2, SSE3, SSE4, x86-64 SVM
    - 用户空间模拟支持主机页文件大于 4k
    - QEMU 支持在 x86 自身模拟
    - 包含部分测试程序 `tests/test-i386`
  - 限制
    - Limited x86-64 support
    - IPC syscalls are missing
    - The x86 segment limits and access rights are not tested at every memory access (yet). Hopefully, very few OSes seem to rely on that for normal use.
- ARM
  - 完全支持 ARM7 用户模拟
  - Linux 支持 NWFPE FPU
  - 能运行大部分 ARM Linux 二进制文件
