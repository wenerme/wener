# Alpine Raspberry Pi

## Tips
* [RPi-Distro/firmware-nonfree](https://github.com/RPi-Distro/firmware-nonfree/)
* https://wiki.alpinelinux.org/wiki/Raspberry_Pi
* 参考
  * [Raspberry Pi 3 - Configuring it as wireless access point -AP Mode](https://wiki.alpinelinux.org/wiki/Raspberry_Pi_3_-_Configuring_it_as_wireless_access_point_-AP_Mode)

Raspberry Pi 3 Alpine Linux arm64
https://a-delacruz.github.io/alpine/alpine-linux.html

Raspberry Pi 3 64-bit kernel
https://a-delacruz.github.io/ubuntu/rpi3-setup-64bit-kernel

atlury/Alpine-Linux-Allwinner-H3-Distro
https://github.com/atlury/Alpine-Linux-Allwinner-H3-Distro

DIY Fully working Alpine Linux for Allwinner and Other ARM SOCs
https://wiki.alpinelinux.org/wiki/DIY_Fully_working_Alpine_Linux_for_Allwinner_and_Other_ARM_SOCs

http://linux-sunxi.org/Bootable_OS_images

Booting AArch64 Linux
https://www.kernel.org/doc/Documentation/arm64/booting.txt


drive_add 0 file=hotplug.raw,format=raw,if=none,id=usb_disk1
device_add usb-storage,drive=usb_disk1,id=usb_disk11,removable=on
device_del  usb_disk11
drive_del  usb_disk1

Bootstrap Alpinelinux on Scaleway ARM64
https://community.online.net/t/alpine-linux-on-arm64/6022

https://pkgs.alpinelinux.org/package/edge/testing/x86/uboot-tools


https://gist.github.com/MitchRatquest/c09fdcb7c0b854677ee7e4022da13605

```bash

DISK=/dev/sdb
mkfs.ext4 $DISK
mount $DISK /mnt
wget https://mirrors.tuna.tsinghua.edu.cn/alpine/v3.8/main/aarch64/apk-tools-static-2.8.2-r0.apk
tar xvzf apk-tools-static-2.8.2-r0.apk
```

```bash
docker run --rm -it -v $PWD:/host wener/base:aarch64
apk add e2fsprogs
apk fetch -o . apk-tools-static
tar -zxvf apk-tools-static-*.apk

./sbin/apk.static --arch aarch64 -X https://mirrors.tuna.tsinghua.edu.cn/alpine/v3.8/main/ -U --allow-untrusted --root /mnt --initdb add alpine-base
```

https://stackoverflow.com/questions/38837606/how-to-emulate-raspberry-pi-raspbian-with-qemu

https://github.com/dhruvvyas90/qemu-rpi-kernel

kpartx -av your-image.img

qemu-system-arm -kernel kernel-qemu-4.4.12-jessie -cpu arm1176 -m 256 -M versatilepb \
-no-reboot -serial stdio -append "root=/dev/sda2 panic=1 rootfstype=ext4 rw" \
-redir tcp:5022::22 \
-hda 2016-05-27-raspbian-jessie-lite.img

 qemu-system-arm \
-kernel ./qemu-rpi-kernel/kernel-qemu-4.9.59-stretch \
-append "root=/dev/sda2 panic=1 rootfstype=ext4 rw" \
-hda pi_zero_kinetic_raspbian.qcow \
-cpu arm1176 -m 512 \
-M rpi \
-no-reboot \
-serial stdio \
-net nic -net user \
-net tap,ifname=vnet0,script=no,downscript=no
bcm2835-rpi-zero-w.dtb


LBA FAT32 (type 0x0C)

https://github.com/bztsrc/raspi3-tutorial

qemu-system-arm \
    -M raspi2 \
    -append "rw earlyprintk loglevel=8 console=ttyAMA0,115200 dwc_otg.lpm_enable=0 root=/dev/mmcblk0p2" \
    -cpu arm1176 \
    -dtb bcm2709-rpi-2-b.dtb \
    -sd 2016-05-27-raspbian-jessie.img \
    -kernel kernel7.img \
    -m 1G \
    -smp 4 \
    -serial stdio \

qemu-system-arm -M raspi2 \
    -append "rw earlyprintk loglevel=8 console=ttyAMA0,115200 dwc_otg.lpm_enable=0 root=/dev/mmcblk0p2" \
    -cpu arm1176 -dtb bcm2709-rpi-2-b.dtb -sd armhf.raw -kernel kernel7.img -m 1G -smp 4 -serial stdio

qemu-system-arm -M raspi2 \
    -cpu arm1176 -m 1G -smp 4 -clock unix -serial stdio -usb \
    -dtb armhf/bcm2709-rpi-2-b.dtb -kernel armhf/boot/vmlinuz-rpi2 -initrd armhf/boot/initramfs-rpi2 -append "$(cat armhf/cmdline.txt)" -sd armhf.raw

qemu-system-aarch64 -M raspi3 -cpu ?

关于RaspberryPi 3的CPU
https://www.zybuluo.com/SiberiaBear/note/336984
armv7l

https://github.com/bztsrc/qemu-raspi3


qemu-system-aarch64 -M raspi3 \
    -m 1G -smp 4 -clock unix -serial stdio -usb \
    -dtb aarch64/bcm2710-rpi-3-b.dtb -kernel aarch64/boot/vmlinuz-rpi -initrd aarch64/boot/initramfs-rpi -append "$(cat aarch64/cmdline.txt)" -sd aarch64.img

qemu-system-aarch64 -M raspi3 \
    -m 1G -smp 4 -clock unix -serial stdio -usb \
    -dtb aarch64/bcm2710-rpi-3-b.dtb -kernel aarch64/boot/vmlinuz-rpi -initrd aarch64/boot/initramfs-rpi -append "modules=loop,squashfs,sd-mod,usb-storage quiet dwc_otg.lpm_enable=0 console=ttyAMA0,115200 dwc_otg.lpm_enable=0" -sd aarch64.img

网络
https://github.com/nachoparker/qemu-raspbian-network/blob/master/qemu-pi.sh

https://murusfirewall.com/Documentation/OS%20X%20PF%20Manual.pdf
sysctl -w net.inet.ip.forwarding=1

https://superuser.com/questions/1310275/mac-os-10-13-2-internet-sharing-for-multiple-bridges
https://superuser.com/questions/596095/how-do-i-bridge-a-connection-from-wi-fi-to-tap-on-mac-os-x-for-the-emulator-qe

因为 qemu 不支持键盘
在 tty1 之外再添加一个 ttyAMA0 也可以
qemu-system-aarch64 -M raspi3 \
    -m 1G -smp 4 -clock unix -serial stdio -usb \
    -dtb aarch64/bcm2710-rpi-3-b.dtb -kernel aarch64/boot/vmlinuz-rpi -initrd aarch64/boot/initramfs-rpi \
    -append "$(cat aarch64/cmdline.txt) console=ttyAMA0,115200 dwc_otg.lpm_enable=0" -sd aarch64.img \
    -nic user,hostfwd=tcp::2222-:22 -nic nat

console=ttyAMA0,115200 dwc_otg.lpm_enable=0 这样就可以再 stdio 操作了

[    0.396102] dmi: Firmware registration failed.
[    1.084404] brcmvirt-gpio soc:virtgpio: Failed to map physical address
[    1.520944] dwc_otg 3f980000.usb: Bad value for SNPSID: 0x00000000
[    1.544370] Error: Driver 'sdhost-bcm2835' is already registered, aborting...

-device usb-mouse -device usb-kbd -show-cursor

-clock unix -serial stdio -usb -device usb-host,hostbus=2,hostaddr=1

https://superuser.com/questions/690060/how-to-enable-network-with-a-raspberry-pi-emulated-on-qemu

Network

https://wiki.qemu.org/Documentation/Networking#The_new_-nic_option

qemu-system-arm -kernel kernel-qemu -cpu arm1176 -m 256 -M versatilepb -no-reboot -append "root=/dev/sda2" -hda 2013-09-25-wheezy-raspbian.img -kernel kernel-qemu -redir tcp:5022::22

Virtual Raspbian on Qemu unable to connect to the Internet
https://raspberrypi.stackexchange.com/questions/12578

qemu-system-arm -kernel kernel-qemu -cpu arm1176 -m 256 -M versatilepb -no-reboot -serial stdio -append "root=/dev/sda2 panic=1 rootfstype=ext4 rw" -hda 2014-09-09-wheezy-raspbian.img -net nic,macaddr=00:16:3e:00:00:01 -net tap,ifname=tap0,script=no,downscript=no

-nic tap,ifname=tap0,script=no,downscript=no
qemu-system-aarch64: warning: netdev __org.qemu.nic0 has no peer
qemu-system-aarch64: warning: requested NIC (anonymous, model unspecified) was not created (not supported by this machine?)

qemu-system-aarch64: warning: netdev mynet0 has no peer

socket
hubport
tap
user
bridge
vhost-user



Establish connection between Qemu Raspbian machine and Host
https://unix.stackexchange.com/questions/157224/establish-connection-between-qemu-raspbian-machine-and-host

qemu-system-x86_64 -nic user,model=help

http://cedar-renjun.github.io/2015/10/20/something-about-BCM2709-and-BCM2836/

https://en.wikipedia.org/wiki/ARM11
ARM11
Broadcom BCM2835 (Raspberry Pi), BCM21553

鼠标键盘不能用
Mouse and Keyboard not working in qemu emulator
https://stackoverflow.com/questions/19665412

外接键盘 然后 lsusb 然后 -usb -device usb-host,hostbus=2,hostaddr=1

s390x
https://en.wikipedia.org/wiki/Z/Architecture

qemu-system-s390x -m 1g -nographic -cdrom alpine-standard-3.8.0-s390x.iso  -kernel standard/boot/vmlinuz-vanilla -initrd standard/boot/initramfs-vanilla -nic user


```bash
# 安装常用包
apk add wiringpi raspberryip
```

https://git.alpinelinux.org/cgit/mkinitfs
Tool to generate initramfs images for Alpine
https://pkgs.alpinelinux.org/package/edge/main/x86_64/mkinitfs
mkinitfs

fallocate -l 500M MyDrive.img

Driver 'sdhost-bcm2835' is already registered, aborting...
https://github.com/raspberrypi/linux/issues/2098

## ARM

```bash
# Alpine - ARM

wget https://mirrors.tuna.tsinghua.edu.cn/alpine/v3.8/releases/aarch64/alpine-uboot-3.8.0-aarch64.tar.gz
mkdir aarch64
tar zxvf alpine-uboot-3.8.0-aarch64.tar.gz -C aarch64 --no-same-owner

qemu-system-aarch64 -M vexpress-a9 -kernel boot/vmlinuz-vanilla \
  -initrd boot/initramfs-vanilla \
  -append "console=ttyAMA0 verbose debug" -serial stdio

# qemu-system-arm -M vexpress-a9 -kernel zImage -initrd initramfs-grsec -dtb vexpress-v2p-ca9.dtb -hda hda.img -serial stdio
qemu-system-arm -M vexpress-a9 -kernel boot/vmlinuz-vanilla \
  -initrd boot/initramfs-vanilla -dtb boot/dtbs/vexpress-v2p-ca9.dtb \
  -append "console=ttyAMA0 verbose debug" -nographic

qemu-system-arm -M vexpress-a9 -kernel boot/vmlinuz-hardened \
  -initrd boot/initramfs-hardened -dtb boot/dtbs/vexpress-v2p-ca9.dtb \
  -append "console=ttyAMA0 verbose debug root=/dev/mmcblk0" -nographic



```

## Qemu
```
Linux/Multiboot boot specific:
-kernel bzImage use 'bzImage' as kernel image
-append cmdline use 'cmdline' as kernel command line
-initrd file    use 'file' as initial ram disk
-dtb    file    use 'file' as device tree image
```

```bash
wget https://mirrors.tuna.tsinghua.edu.cn/alpine/v3.8/releases/aarch64/alpine-rpi-3.8.0-aarch64.tar.gz
mkdir aarch64
tar zxvf alpine-rpi-3.8.0-aarch64.tar.gz -C aarch64 --no-same-owner

# config-rpi  initramfs-rpi  modloop-rpi  vmlinuz-rpi
qemu-system-aarch64 -M raspi3 -m 1g -kernel boot/vmlinuz-rpi -initrd boot/initramfs-rpi -cdrom 
```

## 制作安装盘
* [Classic install or sys mode on Raspberry Pi](https://wiki.alpinelinux.org/wiki/Classic_install_or_sys_mode_on_Raspberry_Pi)

```bash
# 第一步: 制作启动分区
# ==========
# 格式化 sd
# 第一个分区 128 mb, fat16
# 第二个分区 使用剩下的所有空间
# 假设使用 sdb
DISK=/dev/sdb
echo -e "o\n n\n\n\n\n+128m\nt\n6\na\n n\n\n\n\n\n p\nw\n" | fdisk $DISK

# 创建文件系统
mkdosfs -F 16 ${DISK}1
# 挂载文件系统
mount -t vfat ${DISK}1 /mnt
# 下载并解压系统到启动分区
# 3.7 只支持 armhf
# wget http://mirrors.aliyun.com/alpine/v3.7/releases/armhf/alpine-rpi-3.7.0-armhf.tar.gz
wget http://mirrors.aliyun.com/alpine/v3.8/releases/aarch64/alpine-rpi-3.8.0-aarch64.tar.gz
tar zxvf alpine-rpi-3.8.0-aarch64.tar.gz -C /mnt --no-same-owner
# 添加一条用户配置
echo enable_uart=1 >> /mnt/usercfg.txt
# 卸载后从设备启动
umount /mnt

# 第二步: 安装到实际系统盘
# ==========

```

## 制作镜像文件
制作好的镜像可直接刷到 SD 中启动, 简化操作流程

```bash
# 基于 docker 的制作环境
# losetup https://github.com/moby/moby/issues/27886
docker run --rm -it -v /dev:/dev --privileged -v $PWD:/host --workdir /host wener/base:sys

apk add util-linux dosfstools e2fsprogs

DISKRAW=$PWD/rpi.raw
# 创建镜像和制作分区
dd if=/dev/zero of=$DISKRAW bs=1 count=0 seek=200M
stat $DISKRAW
# 第一个分区 128M FAT16 Boot
echo -e "o\n n\n\n\n\n+128m\nt\n6\na\n n\n\n\n\n\n p\nw\n" | fdisk $DISKRAW

# 创建文件系统
LOOPDEV=$(losetup -Pf --show $DISKRAW)
lsblk $LOOPDEV

mkfs.fat -F 16 ${LOOPDEV}p1
mkfs.ext4 ${LOOPDEV}p2

# 挂载文件系统
mkdir -p mnt/{p1,p2}
mount -t vfat /dev/loop0p1 mnt/p1
mount ${LOOPDEV}p2 mnt
mkdir -p mnt/boot
mount ${LOOPDEV}p1 mnt/boot
# 制作启动分区
# 完成后, 已经能正常启动
wget http://mirrors.aliyun.com/alpine/v3.9/releases/aarch64/alpine-rpi-3.10.3-aarch64.tar.gz
tar zxvf alpine-rpi-3.10.3-aarch64.tar.gz -C mnt/boot --no-same-owner
# 添加一条用户配置
echo enable_uart=1 >> mnt/boot/usercfg.txt

# 制作系统分区
# 卸载后从设备启动

umount -R mnt
losetup -D


```

```bash
# macOS
# 将镜像写入到存储设备
diskutil umountdisk disk2
sudo dd if=rpi.img of=/dev/rdisk2 status=progress bs=16M
```

## n1
```bash
apk add e2fsprogs dosfstools util-linux

truncate -s 350M n1.raw

apk.static -X ${ALPINE_MIRROR}/edge/main -U --allow-untrusted --root mnt --initdb add alpine-base

wget https://mirrors.tuna.tsinghua.edu.cn/alpine/edge/testing/aarch64/linux-amlogic-4.18.14-r0.apk
```
https://mirrors.tuna.tsinghua.edu.cn/alpine/edge/testing/aarch64/uboot-tools-2018.09-r0.apk

## rpi-armhf.sh

```bash
docker run --rm -it -v /dev:/dev --privileged -v $PWD:/host -w /host wener/base:aarch64

apk add util-linux dosfstools e2fsprogs

ARCH=${ARCH:-armhf}
IMAGE=$PWD/$ARCH.img
MIRROR=${MIRROR:-http://mirrors.aliyun.com/alpine}
ALPINE_VERSION=3.9.2
ALPINE=alpine-rpi-${ALPINE_VERSION}-$ARCH.tar.gz

echo Install $ALPINE to $IMAGE

dd if=/dev/zero of=$IMAGE bs=1 count=0 seek=500MB

parted -s $IMAGE mklabel msdos mkpart p fat32 2048s 100% set 1 boot on

mkfs.vfat $IMAGE

[ -e $ALPINE ] || wget $MIRROR/v${ALPINE_VERSION:0:3}/releases/$ARCH/$ALPINE

mkdir mnt
mount $IMAGE mnt

tar zxvf $ALPINE -C mnt --no-same-owner
sync
umount -R mnt
```

## wiringpi
* WiringPi [The GPIO utility](http://wiringpi.com/the-gpio-utility/)
* 仓库源码 https://git.drogon.net/
* Pi 3 的支持需要较新的版本
* 参考
  * [Pi4J/pi4j#319](https://github.com/Pi4J/pi4j/issues/319) Hardware : BCM2835 error on RaspberryPi B+

```bash
# 可直接从仓库安装
apk add wiringpi

# 如果仓库版本不支持则从源码编译
# 参考构建 https://git.alpinelinux.org/cgit/aports/tree/community/wiringpi/APKBUILD
git clone git://git.drogon.net/wiringPi
cd wiringPi
./build
```


## 常见问题

### Raspberry Pi Zero W 无线不能使用
* 新版已包含该固件
* [edge/main/armhf/linux-firmware-brcm](https://pkgs.alpinelinux.org/contents?file=brcmfmac43430-sdio.bin&path=&name=&branch=edge&arch=armhf)
* [#6959](https://bugs.alpinelinux.org/issues/6959) Raspberry Pi Zero W support

https://github.com/raspberrypi/linux/issues/1342
wlan freezes in raspberry pi 3/PiZeroW (Not 3B+)

### Direct firmware load for brcm/brcmfmac43430-sdio.bin failed with error -2

`modprobe brcmfmac` 时出现该异常

https://www.raspberrypi.org/forums/viewtopic.php?t=141834

```
cd /lib/firmware/brcm/
wget https://github.com/RPi-Distro/firmware-nonfree/raw/master/brcm/brcmfmac43430-sdio.txt
wget https://github.com/RPi-Distro/firmware-nonfree/raw/master/brcm/brcmfmac43430-sdio.bin
```

### wiringPiSetup: mmap (GPIO) failed: Operation not permitted
* 安装最新版 wiringpi
* https://bugs.centos.org/view.php?id=13734

### tty_port_close_start: tty->count = 1 port count = 2
* 开启 `enable_uart=1` 后会出现大量的这个错误

### Unsupported ioctl: cmd=0x5331

### can't execute `/bin/login`

* 可能是存储设备有问题, rootfs 挂载失败
* 进入系统后看到如下信息

```
mmc0: fsm 1, hsts 1
mmc0: PIO read timeout - EDM 10841
tty_port_close_start: tty->count = 1 port count = 2
```

## mount: can't setup loop device: No space left on device

## TBD



<!--
mkfs.fat

mount -o offset=<offset in bytes> nps-2010-emails.dd /media/manu/


https://wiki.alpinelinux.org/wiki/How_to_setup_a_Alpine_Linux_mirror
https://wiki.alpinelinux.org/wiki/Local_APK_cache




nmcli dev wifi

networkmanager-1.7.2-r2

ls /sys/class/net
ip li

iwlist wlp1s0 scan | grep ESSID

apk add wpa_supplicant wireless-tools
rc-update add wpa_supplicant boot
service wpa_supplicant start

ip li set wlan0 up
iwlist wlan0 scan | grep ESSID

dhclient wlan0


https://wiki.alpinelinux.org/wiki/Connecting_to_a_wireless_access_point


iwconfig wlan0

mkdir -p /etc/wpa_supplicant
chmod 750 /etc/wpa_supplicant
cat wpa.conf >> /etc/wpa_supplicant/wpa_supplicant.conf

ide-cd
ide-core
cdrom
