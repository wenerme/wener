# Alpine Raspberry Pi

## Tips
* [RPi-Distro/firmware-nonfree](https://github.com/RPi-Distro/firmware-nonfree/)
* 参考
  * [Raspberry Pi 3 - Configuring it as wireless access point -AP Mode](https://wiki.alpinelinux.org/wiki/Raspberry_Pi_3_-_Configuring_it_as_wireless_access_point_-AP_Mode)

```bash
# 安装常用包
apk add wiringpi raspberryip
```

## 安装
* [Classic install or sys mode on Raspberry Pi](https://wiki.alpinelinux.org/wiki/Classic_install_or_sys_mode_on_Raspberry_Pi)

```bash
# 第一步: 制作启动分区
# ==========
# 格式化 sd
# 第一个分区 128 mb, fat16
# 第二个分区 使用剩下的所有空间
fidks /dev/sdb
# 创建文件系统
mkdosfs -F 16 /dev/sdb1
# 挂载文件系统
mount -t vfat /dev/sda1 /mnt
# 下载并解压系统到启动分区
wget http://mirrors.aliyun.com/alpine/v3.7/releases/armhf/alpine-rpi-3.7.0-armhf.tar.gz
tar zxvf alpine-rpi-3.7.0-armhf.tar.gz -C /mnt --no-same-owner
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
docker run --rm -it -v $PWD:/host --workdir /host wener/base:sys
# 创建镜像和制作分区
dd if=/dev/zero of=rpi.img bs=1 count=0 seek=1G
stat rpi.img
# 第一个分区 126M FAT16 Boot
fdisk rpi.img

# 创建文件系统
losetup -f -P rpi.img
losetup -l
mkfs.fat -F 16 /dev/loop0p1
mkfs.ext4 /dev/loop0p2

# 挂载文件系统
mkdir -p mnt/{p1,p2}
mount -t vfat /dev/loop0p1 mnt/p1
mount /dev/loop0p2 mnt/p2
# 制作启动分区
# 完成后, 已经能正常启动
wget http://mirrors.aliyun.com/alpine/v3.7/releases/armhf/alpine-rpi-3.7.0-armhf.tar.gz
tar zxvf alpine-rpi-3.7.0-armhf.tar.gz -C mnt/p1 --no-same-owner
# 添加一条用户配置
echo enable_uart=1 >> mnt/p1/usercfg.txt

# 制作系统分区
# 卸载后从设备启动

losetup -D
umount mnt/{p1,p2}

```

```bash
# macOS
# 将镜像写入到存储设备
diskutil umountdisk disk2
sudo dd if=rpi.img of=/dev/rdisk2 status=progress bs=16M
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

### wiringPiSetup: mmap (GPIO) failed: Operation not permitted
* 安装最新版 wiringpi
* https://bugs.centos.org/view.php?id=13734

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
