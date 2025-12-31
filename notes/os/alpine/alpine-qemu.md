---
title: Alpine QEMU
tags:
  - OS
  - Alpine
  - QEMU
---

# Alpine QEMU

```bash
curl -L https://github.com/dhruvvyas90/qemu-rpi-kernel/raw/master/kernel-qemu-4.4.13-jessie -o kernel-qemu

qemu-system-arm -kernel kernel-qemu -cpu arm1176 -m 256 -M versatilepb -serial stdio -append "root=/dev/sda2" -hda 2016-05-27-raspbian-jessie-lite.img -clock dynticks

qemu-system-arm -kernel kernel-qemu -cpu arm1176 -m 256 -M versatilepb -no-reboot -append "root=/dev/sda2 rw vga=normal console=ttyAMA0" -drive format=raw,file=2016-05-27-raspbian-jessie-lite.img -redir tcp:5022::22

qemu-system-arm -kernel kernel-qemu -cpu arm1176 -m 256 -M versatilepb -no-reboot -serial stdio -append "root=/dev/sda2 panic=1" -hda 2016-05-27-raspbian-jessie-lite.img -redir tcp:5022::22

qemu-system-arm -kernel kernel-qemu -cpu arm1176 -m 256 -M versatilepb -no-reboot -serial stdio -append "root=/dev/sda2 panic=1 rootfstype=ext4 rw init=/bin/sh" -hda 2016-05-27-raspbian-jessie-lite.img

qemu-system-arm -kernel kernel-qemu -cpu arm1176 -m 256 -M versatilepb -no-reboot -serial stdio -append "root=/dev/sda2 panic=1 rootfstype=ext4 rw" -hda 2016-05-27-raspbian-jessie-lite.img

qemu-system-aarch64 -M raspi3

qemu-system-aarch64 -M vexpress-a9 -kernel boot/vmlinuz-vanilla \
  -initrd boot/initramfs-vanilla \
  -append "console=ttyAMA0 verbose debug" -serial stdio

qemu-system-aarch64 -M raspi3

qemu-system-aarch64 -M raspi3 -m 1G \
  -kernel alpine-rpi-3.12/boot/vmlinuz-rpi \
  -initrd alpine-rpi-3.12/boot/initramfs-rpi \
  -append "dwc_otg.lpm_enable=0 console=serial0,115200 console=tty1 root=/dev/mmcblk0p2 rootfstype=ext4 elevator=deadline fsck.repair=yes rootwait" -serial stdio \
  -sd dist/target.img
```
