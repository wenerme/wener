# binfmt_misc

Linux 下执行其他架构的内核模块.

## Tips

```bash
cat /boot/config-hardened | grep BINFMT
modprobe binfmt_misc
lsmod | grep binfmt
modinfo binfmt_misc
mount binfmt_misc -t binfmt_misc /proc/sys/fs/binfmt_misc

# 注册 qemu-arm
# 可能会出现错误 bash: echo: write error: Invalid argument 但会成功
echo ':qemu-arm:M::\x7fELF\x01\x01\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x02\x00\x28\x00:\xff\xff\xff\xff\xff\xff\xff\x00\xff\xff\xff\xff\xff\xff\xff\xff\xfe\xff\xff\xff:/usr/bin/qemu-arm:' > /proc/sys/fs/binfmt_misc/register

# 可以基于 docker 使用
docker run -it --rm --privileged wener/base
# 挂载以便于操作
mount binfmt_misc -t binfmt_misc /proc/sys/fs/binfmt_misc
# 查看已注册的
ls /proc/sys/fs/binfmt_misc
# 查看注册信息
cat /proc/sys/fs/binfmt_misc/qemu-arm

wget https://raw.githubusercontent.com/qemu/qemu/master/scripts/qemu-binfmt-conf.sh
chmod +x qemu-binfmt-conf.sh
./qemu-binfmt-conf.sh --help

 ./qemu-binfmt-conf.sh --qemu-path /usr/bin
# chroot alpine arm
# ===============
apk add --no-cache qemu-arm
# wget http://dl-cdn.alpinelinux.org/alpine/v3.7/releases/armhf/alpine-minirootfs-3.7.0-armhf.tar.gz
wget http://mirrors.aliyun.com/alpine/v3.7/releases/armhf/alpine-minirootfs-3.7.0-armhf.tar.gz
mkdir arm-root
tar zxvf alpine-minirootfs-3.7.0-armhf.tar.gz -C arm-root

# 使用 qemu-arm 执行和直接执行应该得到同样的结果
qemu-arm arm-root/bin/busybox
# /lib/ld-musl-armhf.so.1: No such file or directory
arm-root/bin/busybox
# /lib/ld-musl-armhf.so.1: No such file or directory

# 将 qemu-arm 拷贝到 binfmt 注册的位置, 默认为 /usr/bin/qemu-arm
cp /usr/bin/qemu-arm arm-root/usr/bin/qemu-arm
# chroot 并启动 ash
chroot arm-root /usr/bin/qemu-arm /bin/busybox ash
# 显示的是 armv7l
uname -a
# Linux 58bf1bbf2e35 4.9.60-linuxkit-aufs #1 SMP Mon Nov 6 16:00:12 UTC 2017 armv7l Linux
```

https://wiki.alpinelinux.org/wiki/Installing_Alpine_Linux_in_a_chroot
https://wiki.alpinelinux.org/wiki/Chroot


https://github.com/postmarketOS/pmbootstrap/issues/107

sysctl -w kernel.grsecurity.chroot_deny_chmod=0

/proc/sys/kernel/grsecurity
ls -1 /proc/sys/kernel/grsecurity | xargs -I '___' sysctl -w kernel.grsecurity.___=0

ls -1 /proc/sys/kernel/grsecurity/chroot* | xargs -I '___' basename ___ | xargs -I '___' sysctl -w kernel.grsecurity.___=0

s390x_magic='\x7fELF\x02\x02\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x02\x00\x16'
s390x_mask='\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xfe\xff\xff'
s390x_family=s390x
