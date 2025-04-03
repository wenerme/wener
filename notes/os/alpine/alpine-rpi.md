---
tags:
  - RaspberryPi
  - Gaget
---

# Alpine Linux on Raspberry Pi

| gen         | arch    |
| ----------- | ------- |
| Pi Zero/W   | armhf   |
| Pi 2, Pi 3+ | armv7   |
| Pi 3, Pi 5  | aarch64 |

- 下载镜像
  - https://alpinelinux.org/downloads/
  - https://mirrors.aliyun.com/alpine/latest-stable/releases/aarch64/
- dd img 到 sd/tf 卡, 插入树莓派即可启动

## Emulator

```bash
# Alpine netboot 的 dtb 启动有点问题
# https://mirrors.aliyun.com/alpine/latest-stable/releases/aarch64/netboot/dtbs-lts/broadcom/bcm2711-rpi-4-b.dtb
# 使用 https://github.com/raspberrypi/firmware 的
curl --remote-name-all \
  https://mirrors.aliyun.com/alpine/latest-stable/releases/aarch64/netboot/initramfs-virt \
  https://mirrors.aliyun.com/alpine/latest-stable/releases/aarch64/netboot/vmlinuz-virt \
  https://mirrors.aliyun.com/alpine/latest-stable/releases/aarch64/netboot/initramfs-rpi \
  https://mirrors.aliyun.com/alpine/latest-stable/releases/aarch64/netboot/vmlinuz-rpi \
  https://github.com/raspberrypi/firmware/raw/refs/heads/master/boot/bcm2711-rpi-4-b.dtb

# linux-rpi 包里包含了 kernel+dtb
curl -LO https://mirrors.aliyun.com/alpine/latest-stable/main/aarch64/linux-rpi-6.12.13-r0.apk
tar zxvf linux-rpi-6.12.13-r0.apk boot

# 能够使用 virt 进入镜像
qemu-system-aarch64 -M virt -smp 4 -m 4G -cpu cortex-a72 \
  -nographic \
  -kernel vmlinuz-virt \
  -initrd initramfs-virt \
  -hda alpine-rpi-aarch64.img

qemu-system-aarch64 -M raspi4b -smp 4 -m 2G -cpu cortex-a72 \
  -dtb bcm2711-rpi-4-b.dtb \
  -kernel vmlinuz-rpi \
  -initrd initramfs-rpi \
  -append "console=tty1 console=ttyAMA0,115200 root=/dev/mmcblk0p2 rootwait verbose debug earlycon=pl011,mmio32,0xfe201000" \
  -sd alpine-rpi-aarch64.img \
  -serial stdio \
  -d guest_errors,unimp

qemu-system-aarch64 -M raspi3 -smp 4 -m 1G -cpu cortex-a53 -dtb bcm2837-rpi-3-b.dtb \
  -kernel vmlinuz-rpi \
  -initrd initramfs-rpi \
  -append "console=tty1 console=ttyAMA0,115200 root=/dev/mmcblk0p2 rootwait verbose debug earlycon=pl011,mmio32,0xfe201000" \
  -sd alpine-rpi-aarch64.img \
  -serial stdio \
  -d guest_errors,unimp

qemu-system-aarch64 -m 2G -M raspi4b -cpu cortex-a72 \
  -kernel vmlinuz-rpi \
  -dtb bcm2711-rpi-4-b.dtb \
  -drive if=sd,file=alpine-rpi-aarch64.img,format=raw \
  -net user,hostfwd=tcp::6022-:22 \
  -kernel vmlinuz-rpi \
  -append "rw earlyprintk loglevel=8 console=ttyAMA0,115200 dwc_otg.lpm_enable=0 root=/dev/mmcblk0p2 rootwait  panic=1" \
  -no-reboot -nographic -d guest_errors,unimp -D error.log

qemu-system-aarch64 \
  -M raspi4b -nographic \
  -usb \
  -device usb-mouse \
  -device usb-kbd \
  -device 'usb-net,netdev=net0' \
  -netdev 'user,id=net0,hostfwd=tcp::5022-:22' \
  -drive "if=sd,file=alpine-rpi-aarch64.img,index=0,format=raw" \
  -kernel vmlinuz-rpi \
  -initrd initramfs-rpi \
  -dtb bcm2711-rpi-4-b.dtb \
  -append 'rw earlyprintk loglevel=8 console=ttyAMA0,115200 dwc_otg.lpm_enable=0 root=/dev/mmcblk0p2 rootdelay=1'

qemu-system-aarch64 -M raspi3b -cpu cortex-a53 -m 1G \
  -usb \
  -device usb-mouse \
  -device usb-kbd \
  -kernel vmlinuz-rpi \
  -initrd initramfs-rpi \
  -dtb bcm2837-rpi-3-b.dtb \
  -sd alpine-rpi-aarch64.img \
  -net user,hostfwd=tcp::6022-:22 \
  -append "rw earlyprintk console=tty1 console=ttyAMA0,115200 dwc_otg.lpm_enable=0 root=/dev/mmcblk0p1 rootwait panic=1 verbose debug" \
  -no-reboot -serial stdio \
  -d guest_errors,unimp
```

- https://github.com/raspberrypi/firmware
- https://www.raspberrypi.com/documentation/computers/raspberry-pi.html
- https://www.qemu.org/docs/master/system/arm/raspi.html
- `earlycon=pl011,mmio32,0xfe201000`
  - 提前看到日志
- `panic=1`
  - 内核 panic 时重启
  - 有 graphic 的时候可能不方便看到输出内容
- -nic user,model=bcmgenet
- MR Raspberry Pi 4 Model B https://gitlab.com/qemu-project/qemu/-/issues/1208

<!--
https://github.com/faf0/macos-qemu-rpi/blob/master/native-emulation/run.sh
-->

| Filename       | Description                                                                                                                  |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `bootcode.bin` | 第一阶段引导加载程序。GPU 会首先运行这个程序，它负责初始化硬件并加载第二阶段引导加载程序 (`start.elf` 或 `start4.elf`)。     |
| `start.elf`    | 第二阶段引导加载程序 (适用于较早的 Raspberry Pi 型号)。它会读取 `config.txt` 和 `cmdline.txt` 文件，并加载内核和 initramfs。 |
| `start4.elf`   | 第二阶段引导加载程序 (适用于 Raspberry Pi 4 及更新型号)。功能与 `start.elf` 类似，但针对新硬件进行了优化。                   |
| `start4cd.elf` | `start4.elf` 的替代版本，用于从 CD-ROM 启动（如果硬件支持）。                                                                |
| `start4db.elf` | `start4.elf` 的替代版本，用于双缓冲启动。                                                                                    |
| `start4x.elf`  | `start4.elf` 的替代版本，通常用于 PXE 启动。                                                                                 |
| `start_cd.elf` | `start.elf` 的替代版本，用于从 CD-ROM 启动（如果硬件支持）。                                                                 |
| `start_db.elf` | `start.elf` 的替代版本，用于双缓冲启动。                                                                                     |
| `start_x.elf`  | `start.elf` 的替代版本，通常用于 PXE 启动。                                                                                  |
| `fixup.dat`    | GPU 固件文件 (适用于较早的 Raspberry Pi 型号)，包含 GPU 的二进制 blob 和配置信息。                                           |
| `fixup4.dat`   | GPU 固件文件 (适用于 Raspberry Pi 4 及更新型号)，包含 GPU 的二进制 blob 和配置信息。                                         |
| `fixup4cd.dat` | `fixup4.dat` 的替代版本，用于从 CD-ROM 启动。                                                                                |
| `fixup4db.dat` | `fixup4.dat` 的替代版本，用于双缓冲启动。                                                                                    |
| `fixup4x.dat`  | `fixup4.dat` 的替代版本，通常用于 PXE 启动。                                                                                 |
| `fixup_cd.dat` | `fixup.dat` 的替代版本，用于从 CD-ROM 启动。                                                                                 |
| `fixup_db.dat` | `fixup.dat` 的替代版本，用于双缓冲启动。                                                                                     |
| `fixup_x.dat`  | `fixup.dat` 的替代版本，通常用于 PXE 启动。                                                                                  |

- maskrom is responsible for setting up cache-as-ram, loading a .bin file from the SD card
- bootcode.bin is then responsible for initializing the ddr2 controller, then loading start.elf
- start.elf then initiailizes all of the other gpu peripherals, copies a pre-compiled armstub at the arm reset vector, patches in the load-addr of kernel.img, and also loads kernel.img

# 参考

- https://github.com/qemu/qemu/blob/master/hw/arm/raspi.c
- https://github.com/qemu/qemu/blob/master/hw/arm/raspi4b.c
- https://forums.raspberrypi.com/viewtopic.php?t=339101

# FAQ

## 鼠标键盘不能用

外接键盘 然后 lsusb 然后 -usb -device usb-host,hostbus=2,hostaddr=1

- [Mouse and Keyboard not working in qemu emulator](https://stackoverflow.com/questions/19665412)

## udhcpc: socket(AF_PACKET,2,8): Address family not supported by protocol

qemu 用户空间权限不够, 不能 DHCP

```bash
# 手动配置
ip addr add 10.0.2.15/24 dev eth0
ip link set up dev eth0
ip route add default via 10.0.2.2
echo "nameserver 8.8.8.8" > /etc/resolv.conf

ping 1.1.1.1
ping wener.me
```
