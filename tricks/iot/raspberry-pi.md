# Raspberry Pi

## Tips
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

## 参考
* [raspberrypi.org](https://www.raspberrypi.org/)
* [raspberrypi@Github](https://github.com/raspberrypi)
* [raspberrypilearning@Github](https://github.com/raspberrypilearning)

## 术语

### GPIO

General Purpuse I/O


## 电源计算
