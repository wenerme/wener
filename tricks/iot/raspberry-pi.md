# Raspberry Pi

## Tips
* 认证的外置设备
  * http://elinux.org/RPi_VerifiedPeripherals
* config.txt
  * [RPiconfig](http://elinux.org/RPiconfig)
  * [config.txt](https://raw.githubusercontent.com/Evilpaul/RPi-config/master/config.txt)
    * 带说明的配置文件
* cmdline.txt
  * [RPi_cmdline.txt](http://elinux.org/RPi_cmdline.txt)
* Projects
  * [How we built a Smart Office system based on Raspberry Pi](http://monterail.com/blog/2016/how-we-built-a-truly-smart-office-system-based-on-raspberry-pi/)
    * [HN](https://news.ycombinator.com/item?id=12771201)
    * 灯控
      * Finder 继电器
      * ISP814 光感
      * MCP23017 控制 - I2C - Pi
      * DMX 灯控 - IR - Pi

* 扩展 GPIO [Port expander](http://en.wikipedia.org/wiki/Port_expander)
  * MCP23017
  * MAX7219, MAX7221, MAX6950, MAX6951 and TLC5940
* USB 转 GPIO
  * [FT245B](http://www.ftdichip.com/Products/ICs/FT245B.htm)
* Alpine
  * Alpine 可以安装在 Pi 上
  * Pi3 可能会出现 ttyS0 的问题, 参考 [这里](https://bugs.alpinelinux.org/issues/7024)
    * 在 config.txt 上添加 dtoverlay=pi3-disable-bt 或 enable_uart=1 即可


```bash

# 安装 QEmu
# 从 https://github.com/dhruvvyas90/qemu-rpi-kernel 下载内核
# 从 https://www.raspbian.org/RaspbianImages 下载镜像
#

curl -L https://github.com/dhruvvyas90/qemu-rpi-kernel/raw/master/kernel-qemu-4.4.13-jessie -o kernel-qemu

qemu-system-arm -kernel kernel-qemu -cpu arm1176 -m 256 -M versatilepb -serial stdio -append "root=/dev/sda2" -hda 2016-05-27-raspbian-jessie-lite.img -clock dynticks

qemu-system-arm -kernel kernel-qemu -cpu arm1176 -m 256 -M versatilepb -no-reboot -append "root=/dev/sda2 rw vga=normal console=ttyAMA0" -drive format=raw,file=2016-05-27-raspbian-jessie-lite.img -redir tcp:5022::22

qemu-system-arm -kernel kernel-qemu -cpu arm1176 -m 256 -M versatilepb -no-reboot -serial stdio -append "root=/dev/sda2 panic=1" -hda 2016-05-27-raspbian-jessie-lite.img -redir tcp:5022::22

qemu-system-arm -kernel kernel-qemu -cpu arm1176 -m 256 -M versatilepb -no-reboot -serial stdio -append "root=/dev/sda2 panic=1 rootfstype=ext4 rw init=/bin/sh" -hda 2016-05-27-raspbian-jessie-lite.img

qemu-system-arm -kernel kernel-qemu -cpu arm1176 -m 256 -M versatilepb -no-reboot -serial stdio -append "root=/dev/sda2 panic=1 rootfstype=ext4 rw" -hda 2016-05-27-raspbian-jessie-lite.img

# 加载 img 的第二个分区,注释 /etc/ld.so.preload 中的第一行 libarmmem 然后记得 sync
# 因为在 OSX 下无法挂载 ext4, 所以我是在 docker 下进行操作的
docker run --rm -it --privileged -v `pwd`:/host ubuntu
cd /host
apt install parted
parted
# unit B
# print
#   Number  Start      End          Size         Type     File system  Flags
#    1      4194304B   70254591B    66060288B    primary  fat16        lba
#    2      70254592B  1387266047B  1317011456B  primary  ext4
# q
mkdir /mnt/tmp
# 使用第二个分区起始位置 70254592
mount -o loop,offset=70254592 2016-05-27-raspbian-jessie-lite.img /mnt/tmp/
# 编辑注释掉第一行
vi /mnt/tmp/etc/ld.so.preload

# 参考
#   http://raspberrypi.stackexchange.com/questions/165/emulation-on-a-linux-pc
#   https://github.com/debian-pi/raspbian-ua-netinst/issues/149
#   https://www.raspberrypi.org/forums/viewtopic.php?f=29&t=37386
#   http://askubuntu.com/a/236284/267103 如何挂载 img
```


### RPi
https://en.wikipedia.org/wiki/Raspberry_Pi

https://www.raspberrypi.org/blog/vote-top-20-raspberry-pi-projects-magpi/

__规格__

型号 | SoC | Arch | Mem | CPU |
----|----|----|----
1 A | BCM2835 | ARMv6 32bit | 256 MB | 700 MHz single-core ARM1176JZF-S
1 A+/B/B+ | - | - | 512 MB | -
2 B | BCM2836 | ARMv7 32bit | 1G | 900 MHz 32-bitquad-core ARM Cortex-A7
3 B | BCM2837 | ARMv8 64/32 bit | - | 1.2 GHz 64-bit quad-core ARM Cortex-A53
Zer W   | BCM2835 | ARMv6Z 32bit | 512 MB | 1 GHz single-core ARM1176JZF-S

__GPU__

Broadcom VideoCore IV @ 250 MHz (BCM2837: 3D part of GPU @ 300 MHz, video part of GPU @ 400 MHz)
OpenGL ES 2.0 (BCM2835, BCM2836: 24 GFLOPS / BCM2837: 28.8 GFLOPS)
MPEG-2 and VC-1 (with license),[48] 1080p30 H.264/MPEG-4 AVC high-profile decoder and encoder (BCM2837: 1080p60)


### RPi 1

http://www.raspberrypi.org/wp-content/uploads/2012/02/BCM2835-ARM-Peripherals.pdf

```
Rev 1 Raspberry Pi
+------+------+--------+
| GPIO | Phys | Name   |
+------+------+--------+
|   0  |   3  | SDA    |
|   1  |   5  | SCL    |
|   4  |   7  | GPIO 7 |
|   7  |  26  | CE1    |
|   8  |  24  | CE0    |
|   9  |  21  | MISO   |
|  10  |  19  | MOSI   |
|  11  |  23  | SCLK   |
|  14  |   8  | TxD    |
|  15  |  10  | RxD    |
|  17  |  11  | GPIO 0 |
|  18  |  12  | GPIO 1 |
|  21  |  13  | GPIO 2 |
|  22  |  15  | GPIO 3 |
|  23  |  16  | GPIO 4 |
|  24  |  18  | GPIO 5 |
|  25  |  22  | GPIO 6 |
+------+------+--------+
```

## 参考
* [raspberrypi.org](https://www.raspberrypi.org/)
* [raspberrypi@Github](https://github.com/raspberrypi)
* [raspberrypilearning@Github](https://github.com/raspberrypilearning)

https://www.modmypi.com/blog/raspberry-pis-remotes-ir-receivers
IR 感应

## Ubuntu MATE

* [raspberry-pi](https://ubuntu-mate.org/raspberry-pi/)

```bash
# 制作安装盘
sudo apt-get install gddrescue xz-utils
unxz ubuntu-mate-16.04.2-desktop-armhf-raspberry-pi.img.xz
sudo ddrescue -D --force ubuntu-mate-16.04.2-desktop-armhf-raspberry-pi.img /dev/sdx
# macOS 使用 dd, 使用 ddrescue 会出错
# sudo dd bs=1M if=ubuntu-mate-16.04.2-desktop-armhf-raspberry-pi.img of=/dev/rdisk3
```

## Alpine
* [Raspberry_Pi](https://wiki.alpinelinux.org/wiki/Raspberry_Pi)
* 安装
  * 格式化为 msdos
  * 将 tar 解压到目录即可
* 默认为无盘模式

### FAQ
#### 没有无线
Broadcom 网卡固件需要自己自己编译, 参考 [Broadcom Wi-Fi Chipset Users](https://wiki.alpinelinux.org/wiki/Connecting_to_a_wireless_access_point#Broadcom_Wi-Fi_Chipset_Users)

```bash
# 添加以使用分组等功能
apk add shadow sudo
# 创建 dev 账号, 添加 dev 账号到 abuild 分组, 使用 dev 账号进行编译
# 因为 abuild 默认不允许 root 编译, 即便使用 -F 参数也会出现一些问题
useradd dev
usermod -a -G abuild dev
# 添加到 sudoer, 在最下面添加 dev ALL=(ALL) ALL
visuo
# 切换为 dev 账号
su dev

sudo apk add abuild-sdk git
cd ~
git clone https://github.com/alpinelinux/aports
cd aports/non-free/b43-firmware
# 如果遇到证书问题,可参考 https://wiki.alpinelinux.org/wiki/Abuild_and_Helpers#abuild-keygen
abuild -r
# 编译好后会生成在 ~/packages 下
```

#### 无法安装固件
可参考 [#5144](https://bugs.alpinelinux.org/issues/5144), 可能由于 `/.modloop` 只读导致

## 术语

### GPIO

General Purpuse I/O


## 电源计算

## FAQ

### HDMI 花屏
尝试调整 config.txt 中的参数

```
# 参考
# https://github.com/watterott/HDMI-Display/blob/master/docu/config.txt
# hdmi_cvt=<width> <height> <framerate> <aspect> <margins> <interlaced> <reduced_blanking>
# hdmi_timing=<h_active_pixels> <h_sync_polarity> <h_front_porch> <h_sync_pulse> <h_back_porch> <v_active_lines> <v_sync_polarity> <v_front_porch> <v_sync_pulse> <v_back_porch> <v_sync_offset_a> <v_sync_offset_b> <pixel_rep> <framerate> <interlaced> <pixel_freq> <aspect>
# aspect ratio: 1=4:3, 2=14:9, 3=16:9, 4=5:4, 5=16:10, 6=15:9, 7=21:9, 8=64:27

# 800x480 显示器
max_usb_current=1
hdmi_group=2
hdmi_mode=87
hdmi_cvt 800 480 60 6 0 0 0

# HKC 显示器
hdmi_group=2
hdmi_mode=87
disable_overscan=1
hdmi_cvt 2560 1440 60 3 0 0 0
```

### 中文界面乱码

```bash
# 安装字体
apt-get install ttf-wqy-zenhei
# 安装输入法
apt-get install scim-pinyin
# 配置 locale 为 en_US.UTF-8,zh_CN.UTF-8
raspi-config
```
