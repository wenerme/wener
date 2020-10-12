---
id: uboot
title: U-Boot
---

# U-Boot

## Ttips

- [Das U-Boot -- the Universal Boot Loader](https://u-boot.readthedocs.io/en/stable/index.html)
  - [Manual](https://www.denx.de/wiki/DULG/Manual)
  - wikipedia [Das U-Boot](https://en.wikipedia.org/wiki/Das_U-Boot)
- 主要用于嵌入式系统的开机加载程序,可以支持多种不同的计算机系统结构.
- 支持架构
  - 68k, ARM, Blackfin, MicroBlaze, MIPS, Nios, SuperH, PPC, RISC-V, x86
- 参考
  - u-boot [qemu-x86](https://u-boot.readthedocs.io/en/stable/board/emulation/qemu-x86.html)
  - 包内容 [uboot-tools](https://pkgs.alpinelinux.org/contents?branch=edge&name=uboot-tools&arch=x86_64&repo=main)
  - [u-boot-all](https://pkgs.alpinelinux.org/packages?name=u-boot-all&branch=edge)
    - 所有开发板的 uboot
  - [RPi U-Boot](https://elinux.org/RPi_U-Boot)
  - [uboot qemu](https://www.cnblogs.com/pengdonglin137/p/12194548.html)
  - [Run u-boot in qemu](https://pandysong.github.io/blog/post/run_u-boot_in_qemu/)
  - https://sourceforge.net/projects/powerast/files/Firmware/
  - https://variwiki.com/index.php?title=U-Boot_features
  - https://linux-sunxi.org/U-Boot
  - https://wiki.alpinelinux.org/wiki/DIY_Fully_working_Alpine_Linux_for_Allwinner_and_Other_ARM_SOCs
  - [mkimg.arm.sh](https://git.alpinelinux.org/aports/tree/scripts/mkimg.arm.sh)
  - [raspberrypi-bootloader](https://pkgs.alpinelinux.org/contents?file=&path=&name=raspberrypi-bootloader&branch=edge)

```bash
# 编译
# 支持配置 https://github.com/u-boot/u-boot/tree/master/configs
# 依赖 https://git.alpinelinux.org/aports/tree/main/uboot-tools/APKBUILD
apk add swig python3-dev bison flex openssl-dev linux-headers
make qemu-x86_64_defconfig
# make cscope
make all -j $(nproc)
# test
qemu-system-x86_64 -nographic -no-reboot -bios u-boot.rom

# vexpress_ca9x4_defconfig
# menuconfig
make qemu_arm64_defconfig
make all -j $(nproc)

# export CROSS_COMPILE=arm-linux-gnueabi-
# export CROSS_COMPILE=aarch64-linux-gnu-
# make ARCH=arm CROSS_COMPILE=arm-linux-gnueabihf- vexpress_ca9x4_defconfig
make ARCH=arm CROSS_COMPILE=arm-linux-gnueabihf- menuconfig
make ARCH=arm CROSS_COMPILE=arm-linux-gnueabihf- -j8

# example - /usr/share/doc/uboot-tools/examples/fw_env.config
apk add uboot-tools uboot-tools-examples

cat <<CONF > boot.scr
usb start
setenv bootargs earlyprintk console=tty0 console=ttyAMA0
CONF
mkimage -A arm -O linux -T script -C none -n boot.scr -d boot.scr boot.scr.uimg

#
# mkenvimage -s 1024 /usr/share/doc/uboot-tools/examples/fw_env.config
fw_printenv -c /usr/share/doc/uboot-tools/examples/fw_env.config
```

- 开发板启动需要有串口来进行调试
- 默认串口配置 115200/8N1 (115200 bps, 8 Bit per character, no parity, 1 stop bit, no handshake)
- Linux 下推荐使用 kermit 或 cu，不要使用 minicom，也可以使用 screen 和 picocom，切记关闭硬件和软件 flow control

## image

- “raw” ELF image (vmlinux)
- uImage format, which contains the compressed vmlinux plus a few extra bytes of metadata that describe the kernel load address.
- [How can I create an uImage from a ELF file](http://www.denx.de/wiki/view/DULG/HowCanICreateAnUImageFromAELFFile)

| arch       | name          |
| ---------- | ------------- |
| alpha      | Alpha         |
| arc        | ARC           |
| arm        | ARM           |
| arm64      | AArch64       |
| avr32      | AVR32         |
| blackfin   | Blackfin      |
| ia64       | IA64          |
| invalid    | Invalid ARCH  |
| m68k       | M68K          |
| microblaze | MicroBlaze    |
| mips       | MIPS          |
| mips64     | MIPS 64 Bit   |
| nds32      | NDS32         |
| nios2      | NIOS II       |
| or1k       | OpenRISC 1000 |
| powerpc    | PowerPC       |
| riscv      | RISC-V        |
| s390       | IBM S390      |
| sandbox    | Sandbox       |
| sh         | SuperH        |
| sparc      | SPARC         |
| sparc64    | SPARC 64 Bit  |
| x86        | Intel x86     |
| x86_64     | AMD x86_64    |
| xtensa     | Xtensa        |

```bash
mkimage -A arm -O linux -T kernel -C gzip -d vmlinux uImage
mkimage -A arm64 -O linux -T ramdisk -C gzip -d init.cpio.gz initramfs.uImage
# https://www.denx.de/wiki/view/DULG/HowCanILoadAndUncompressACompressedImage
# bootm
# -T standalone
```

## boot

- boot.scr.uimg
- https://mediawiki.compulab.com/w/index.php?title=U-Boot:_Quick_reference
- https://www.digi.com/resources/documentation/digidocs/PDFs/90000852.pdf

```bash
# 版本
version
# 主板信息
bdinfo
# 串口信息
coninfo
# cpu 信息
cpu info
cpu detail
# QEMU 固件列表
qfw list

virtio scan
virtio info

# 子系统
ide
usb
virtio
nvme
mmc

#
dm tree

ext4ls ide 0 /
ext4ls ide 0:2 /

ext4load ide 0 ${kernel_addr_r} vmlinuz-lts
ext4load ide 0 ${ramdisk_addr_r} initramfs-lts
zboot ${kernel_addr_r}

# sda
setenv bootargs root=/dev/sda1 ro
load ide 0 ${kernel_addr_r} /vmlinuz-lts
load ide 0 ${ramdisk_addr_r} /initramfs-lts
zboot ${kernel_addr_r} - ${ramdisk_addr_r} ${filesize}

# 持久
setenv bootargs root=UUID=b2aaf743-0418-4d90-94cc-3e6108d7d968 ro
setenv boot zboot 03000000 0 04000000 \${filesize}
setenv bootcmd "ext2load scsi 0:2 03000000 /boot/vmlinuz-3.13.0-58-generic; ext2load scsi 0:2 04000000 /boot/initrd.img-3.13.0-58-generic; run boot"
saveenv

# vda
setenv bootargs root=/dev/vda1 ro
load virtio 0 03000000 /vmlinuz-lts
load virtio 0 04000000 /initramfs-lts
zboot 03000000 0 04000000 ${filesize}

qemu-system-x86_64 -m 1024 -smp 2 -nographic -bios artifacts/uboot/qemu-x86_64/u-boot.rom \
 -kernel virt/vmlinuz-virt -append 'root=/dev/ram console=ttyS0' \
 -initrd virt/initramfs-virt
qfw load
zboot 01000000 - 04000000 5fe85e

part list mmc 0
ls mmc 0:1

load mmc 0:1 0x60008000 zImage
ext4load mmc 0:1 0x60008000 zImage 

load mmc 0:1 0x61000000 vexpress-v2p-ca9.dtb
ext4load mmc 0:1 0x61000000 vexpress-v2p-ca9.dtb

setenv bootargs 'root=/dev/mmcblk0p2 rw rootfstype=ext4 rootwait earlycon console=tty0 console=ttyAMA0 init=/linuxrc ignore_loglevel'
bootz 0x60008000 - 0x61000000



setenv ipaddr 10.8.8.100; setenv netmask 255.255.255.0; setenv serverip 10.8.8.3;
setenv bootargs 'root=/dev/nfs rw nfsroot=10.8.8.3:/home/macrofun/NFS_HOME init=/linuxrc ip=10.8.8.100 console=ttyAMA0';
saveenv

tftp 0x60003000 uImage;
setenv bootargs root=/dev/nfs rw nfsroot=10.8.8.3:/home/macrofun/NFS_HOME,proto=tcp,nfsvers=4,nolock init=/linuxrc ip=10.8.8.100 console=ttyAMA0 console=tty0
# qemu-system-arm -M vexpress-a9 -m 512 -serial stdio  -net nic -net tap,ifname=tap0,script=no -kernel u-boot
# qemu-system-aarch64 -nographic -curses -machine virt -cpu cortex-a57 -bios u-boot.bin
```

```shell
if load ${devtype} ${devnum}:${bootpart} ${kernel_addr_r} /boot/Image; then
  echo fdt: ${fdtfile}
  if load ${devtype} ${devnum}:${bootpart} ${fdt_addr_r} /boot/dtbs/${fdtfile}; then
    if load ${devtype} ${devnum}:${bootpart} ${ramdisk_addr_r} /boot/initramfs-linux.img; then
      booti ${kernel_addr_r} ${ramdisk_addr_r}:${filesize} ${fdt_addr_r};
    else
      booti ${kernel_addr_r} - ${fdt_addr_r};
    fi;
  fi;
fi
```

## 启动日志

```
Valid Boot Flag
Setup Size = 0x00004400
Magic signature found
Using boot protocol version 2.0c
Linux kernel version 3.13.0-58-generic (buildd@allspice) #97-Ubuntu SMP Wed Jul 8 02:56:15 UTC 2015
Building boot_params at 0x00090000
Loading bzImage at address 100000 (5805728 bytes)
Magic signature found
Initial RAM disk at linear address 0x04000000, size 19215259 bytes
Kernel command line: "root=/dev/disk/by-partuuid/965c59ee-1822-4326-90d2-b02446050059 ro"

Starting kernel ...
```

## command

? - alias for 'help'
base - print or set address offset
bdinfo - print Board Info structure
blkcache - block cache diagnostics and control
boot - boot default, i.e., run 'bootcmd'
bootd - boot default, i.e., run 'bootcmd'
bootefi - Boots an EFI payload from memory
bootelf - Boot from an ELF image in memory
bootm - boot application image from memory
bootp - boot image via network using BOOTP/TFTP protocol
bootstage - Boot stage command
bootvx - Boot vxWorks from an ELF image
cmp - memory compare
coninfo - print console devices and information
cp - memory copy
cpu - display information about CPUs
crc32 - checksum calculation
date - get/set/reset date & time
dhcp - boot image via network using DHCP/TFTP protocol
diskboot - boot from IDE device
dm - Driver model low level access
echo - echo args to console
editenv - edit environment variable
env - environment handling commands
exit - exit script
ext2load - load binary file from a Ext2 filesystem
ext2ls - list files in a directory (default /)
ext4load - load binary file from a Ext4 filesystem
ext4ls - list files in a directory (default /)
ext4size - determine a file's size
ext4write - create a file in the root directory
false - do nothing, unsuccessfully
fatinfo - print information about filesystem
fatload - load binary file from a dos filesystem
fatls - list files in a directory (default /)
fatmkdir - create a directory
fatrm - delete a file
fatsize - determine a file's size
fatwrite - write file into a dos filesystem
fdt - flattened device tree utility commands
fstype - Look up a filesystem type
gettime - get timer val elapsed
go - start application at address 'addr'
help - print command description/usage
ide - IDE sub-system
iminfo - print header information for application image
imxtract - extract a part of a multi-image
interrupts- enable or disable interrupts
iod - IO space display
iow - IO space modify
irqinfo - print information about IRQs
itest - return true/false on integer compare
lcdputs - print string on video framebuffer
ln - Create a symbolic link
load - load binary file from a filesystem
loadb - load binary file over serial line (kermit mode)
loads - load S-Record file over serial line
loadx - load binary file over serial line (xmodem mode)
loady - load binary file over serial line (ymodem mode)
loop - infinite loop on address range
ls - list files in a directory (default /)
md - memory display
mii - MII utility commands
mm - memory modify (auto-incrementing address)
mtrr - Use x86 memory type range registers (32-bit only)
mw - memory write (fill)
nm - memory modify (constant address)
nvme - NVM Express sub-system
part - disk partition related commands
pci - list and access PCI Configuration Space
ping - send ICMP ECHO_REQUEST to network host
printenv - print environment variables
pxe - commands to get and boot from pxe files
qfw - QEMU firmware interface
reset - Perform RESET of the CPU
run - run commands in an environment variable
save - save file to a filesystem
scsi - SCSI sub-system
scsiboot - boot from SCSI device
setcurs - set cursor position within screen
setenv - set environment variables
sf - SPI flash sub-system
showvar - print local hushshell variables
size - determine a file's size
sleep - delay execution for some time
source - run script from memory
sspi - SPI utility command
sysboot - command to get and boot from syslinux files
test - minimal test like /bin/sh
tftpboot - boot image via network using TFTP protocol
time - run commands and summarize execution time
true - do nothing, successfully
usb - USB sub-system
usbboot - boot from USB device
version - print monitor, compiler and linker version
virtio - virtio block devices sub-system
zboot - Boot bzImage

# FAQ

## Error loading uncompressed kernel without PVH ELF Note

`-machine type=pc-i440fx-3.1`
