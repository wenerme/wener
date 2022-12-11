---
title: Alpine
---

# Alpine

- ARCH - 架构支持
  - x86_64
  - x86
  - armhf
  - armv7
  - aarch64
  - s390x
  - mips64 - **mips64be**
  - ppc64le
- [adelielinux](https://adelielinux.org/)
  - 基于 Alpine 针对桌面的系统
  - https://code.foxkit.us/groups/adelie
- https://postmarketos.org/
  - 基于 Alpine 的移动操作系统
- GitLab 上关于 [安全的问题](https://gitlab.alpinelinux.org/alpine/aports/issues?state=closed&label_name%5B%5D=T-Security)
- [jessfraz/apk-file](https://github.com/jessfraz/apk-file)
  - Search file in package from command line

```bash
# 计算块设备容量
echo $(blockdev --getsize64 /dev/sdb1)/1024/1024 | bc -l


apk add shadow
apk add bash
# 更换 shell 为 bash
chsh root -s /bin/bash


# 安装 neofetch
apk add --no-cache -X http://mirrors.aliyun.com/alpine/edge/community neofetch
# 有些环境下没有 neofetch 可以用screenfetch
apk add --no-cache -X http://mirrors.aliyun.com/alpine/edge/testing screenfetch
```

## 安装

- [Installation](https://wiki.alpinelinux.org/wiki/Installation)
- [alpinelinux/alpine-conf](https://github.com/alpinelinux/alpine-conf)

```bash
# 制作启动盘
dd if=alpine.iso of=/dev/sdx



# https://wiki.alpinelinux.org/wiki/Alpine_setup_scripts
# 统一初始化
# 分为 keymap,hostname,interfaces,dns,timezone,proxy,disk,ntp,cache,lbu,apkrepos 等
setup-alpine

# 也可以分开设置, 建议先设置网卡和 sshd, 那么接下来的操作就可以在远程操作
# 网卡建议使用引导进行设置, 否则需要手动写配置文件
setup-interfaces
# 设置完网卡后可能需要重启网络服务
service networking restart
setup-sshd -c openssh
# 默认情况下不允许 root 远程登陆
echo 'PermitRootLogin yes' >> /etc/ssh/sshd_config
service sshd reload
# 设置一个密码, 以便于远程登陆
# passwd
echo root:PASSWORD | chpasswd

# 注意: 如果远程登陆说密码失效, 可能是时间问题, 先在服务器上开启 ntp 同步时间
# 立即同步时间 ntpd -dn -N -p pool.ntp.org

# 远程证书配置好过后可以考虑关闭远程密码登陆
echo 'PasswordAuthentication no' >> /etc/ssh/sshd_config
service sshd reload

# 接下来就可以远程操作了
setup-hostname -n alpine-test
# 使设置的主机名生效
/etc/init.d/hostname --quiet restart

setup-keymap us us
setup-ntp -c chrony
setup-timezone Asia/Shanghai

# 添加仓库
# 安装时的安装包位于 /media/sdb/apks/
echo "http://mirrors.aliyun.com/alpine/v$(sed -n 's/\.\d\+$//p' /etc/alpine-release)/main
http://mirrors.aliyun.com/alpine/v$(sed -n 's/\.\d\+$//p' /etc/alpine-release)/community" >> /etc/apk/repositories

grep VERSION_ID /etc/os-release | grep -Eo '\d+\.\d+'

# testing 有些尚未发布的, 有时候会用到
echo "@testing http://mirrors.aliyun.com/alpine/edge/testing" >> /etc/apk/repositories

# 上海交大的镜像更新最快
# http://mirrors.sjtug.sjtu.edu.cn/alpine/
echo "http://mirrors.sjtug.sjtu.edu.cn/alpine/v$(sed -n 's/\.\d\+$//p' /etc/alpine-release)/main
http://mirrors.sjtug.sjtu.edu.cn/alpine/v$(sed -n 's/\.\d\+$//p' /etc/alpine-release)/community" > /etc/apk/repositories

# 或者直接用 edge
echo "http://mirrors.aliyun.com/alpine/edge/main
http://mirrors.aliyun.com/alpine/edge/community
@testing http://mirrors.aliyun.com/alpine/edge/testing" >> /etc/apk/repositories

apk update


# 创建回答文件, 然后可直接编辑
setup-alpine -c ans
# 使用回答文件进行初始化
setup-alpine -f ans

# 存储设置
# =======
# 如果只是想直接装到 U 盘, 那么至少需要 setup-interfaces, setup-sshd(从远程方便操作, 可以粘贴复制), 添加仓库, 然后才能 setup-disk
# 因为 setup-disk 需要安装一些包

# -s 0 无交换区
# -v 详细输出
# -m 磁盘格式
# -k 内核 vanilla, varthardend, hardended
# https://pkgs.alpinelinux.org/packages?name=linux-*&branch=v3.7&arch=x86_64&maintainer=Natanael+Copa
# BOOT_SIZE 100m 启动分区大小, 一般安装完成后 20m 左右, 默认会给 100
setup-disk -m sys -s 0 -v /dev/sda

# 不询问
ERASE_DISKS=/dev/sda setup-disk -m sys -s 0 -v /dev/sda

# apk add sfdisk e2fsprogs syslinux

# 其他的可选参数
# BOOTLOADER grub 或 syslinux
# MBR=/usr/share/syslinux/mbr.bin
# SYSROOT=/mnt
# ERASE_DISKS=/dev/sda 可以设置成写入的磁盘, 就不会再进行询问
# MKFS_OPTS_BOOT="-F" MKFS_OPTS_VAR="-F" mkfs 重复创建不询问
# 会安装的包 根据 fs 类型不同会有不同
# apk add --quiet sfdisk e2fsprogs
# 安装动作
# apk add --root /mnt --initdb --quiet --progress --update-cache --clean-protected --overlay-from-stdin --repository https://mirrors.ustc.edu.cn/alpine/v3.11/main --repository https://mirrors.ustc.edu.cn/alpine/v3.11/community alpine-base e2fsprogs openssh openssl syslinux acct linux-virt alpine-base
ROOTFS=btrfs BOOTFS=btrfs VARFS=btrfs DISKLABEL=alp-wen setup-disk -m sys -s 0 -v /dev/sda

# 使用 EFI
# DISKLABEL 为 gpt
# BOOTLOADER 为 grub
# 启动分区格式为 vfat
USE_EFI=1 setup-disk -m sys -s 0 -v /dev/sdb
```

acct linux-$KERNEL_FLAVOR alpine-base

DISKLABEL=gpt
USE_EFI gpt,grub,boot-vfat

```bash
PREFIX=
. "$PREFIX/lib/libalpine.sh"
. "$PREFIX/lib/dasd-functions.sh"

MBR=${MBR:-"/usr/share/syslinux/mbr.bin"}
ROOTFS=${ROOTFS:-ext4}
BOOTFS=${BOOTFS:-ext4}
VARFS=${VARFS:-ext4}
BOOTLOADER=${BOOTLOADER:-syslinux}
DISKLABEL=${DISKLABEL:-dos}
# default location for mounted root
SYSROOT=${SYSROOT:-/mnt}

# machine arch
ARCH=$(apk --print-arch)
```

### 制作磁盘镜像

```bash
# 创建 2g 镜像
qemu-img create -f qcow2 virt.qcow2 2g
# 从 cd 启动安装到镜像盘
# 转发 22 到本地 2222
qemu-system-x86_64 -cdrom alpine-virt-3.7.0-x86_64.iso -boot b -hda virt.qcow2 -net nic -net user,hostfwd=tcp::2222-:22

# 启用网络
echo -e '\n\n' | setup-interface
rc-service networking restart
rc-u
# 配置 ssh 远程登陆
setup-sshd -c openssh
echo 'PermitRootLogin yes' >> /etc/ssh/sshd_config
rc-service sshd restart
# 设置密码为 root
echo 'root:root' | chpasswd

# 另外一个终端从本地 2222 进入
ssh root@127.0.0.1 -p 2222
echo "http://mirrors.aliyun.com/alpine/v$(sed -n 's/\.\d\+$//p' /etc/alpine-release)/main
http://mirrors.aliyun.com/alpine/v$(sed -n 's/\.\d\+$//p' /etc/alpine-release)/community
@testing http://mirrors.aliyun.com/alpine/edge/testing" >> /etc/apk/repositories
apk update
# 安装到磁盘
setup-disk -m sys -s 0 /dev/sda
# 完毕关机
poweroff
```

```bash
# 从镜像启动
qemu-system-x86_64 -hda virt.qcow2 -net nic -net user,hostfwd=tcp::2222-:22

# 初始化配置
setup-hostname -n alpine-test
/etc/init.d/hostname --quiet restart
setup-keymap us us
setup-ntp -c busybox
setup-timezone -z Asia/Shanghai
# 常用包
apk add nano busybox-extras

# 结束配置
poweroff
# 压缩磁盘
# 可能会清除分区上的 boot 信息
# mv virt.qcow2 virt-backup.qcow2
# qemu-img convert -O qcow2 virt-backup.qcow2 virt.qcow2

# 附加配置 - Bash
# ============
# 默认为 ash, 修改为 bash
apk add shadow bash
echo root | chsh root -s /bin/bash
apk add bash-completion
source /etc/profile.d/bash_completion.sh

# 附加配置 - man
# ============
# 默认没有 manpages
# 安装时如果需要文档, 可以安装 包名-doc
apk add --no-cache man man-pages mdocml-apropos less less-doc
export PAGER=less

# 附加配置 - Docker
# ============
# 一般镜像都可以把 docker 做上, 因为非常常用
apk add docker
rc-update add docker
rc-service docker restart
# 修改镜像
tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://registry.docker-cn.com"]
}
EOF
rc-service docker restart
# 验证配置成功
docker info

# 附加配置 - neofetch
# ============
# 快速的查看当前环境
apk add --no-cache -X http://mirrors.aliyun.com/alpine/edge/community neofetch
```

## Mips

https://bugs.alpinelinux.org/issues/5643
https://patchwork.alpinelinux.org/bundle/Lochnair/mips-port/?state=*

搜索 mips
https://github.com/alpinelinux/aports/blob/master/main/gcc/APKBUILD

## USB

```
usbutils-008-r0

libusb-1.0.20-r0
libusb-dev-1.0.20-r0
libusb-compat-dev-0.1.5-r3

usbredir-doc-0.7-r2
usbredir-0.7-r2
usbredir-dev-0.7-r2
usbredir-server-0.7-r2

libgusb-0.2.9-r1
libgusb-dev-0.2.9-r1
libgusb-doc-0.2.9-r1

libusb-compat-0.1.5-r3
usb-modeswitch-doc-2.4.0-r0
usbutils-doc-008-r0

usb-modeswitch-2.4.0-r0

usb-modeswitch-udev-2.4.0-r0
hwdata-usb-0.282-r0
```

## APKINDEX

- http://mirrors.aliyun.com/alpine/v3.6/main/x86_64/APKINDEX.tar.gz
- https://wiki.alpinelinux.org/wiki/Apkindex_format
- https://wiki.alpinelinux.org/wiki/Apk_spec

## Edge

- https://wiki.alpinelinux.org/wiki/Edge
- "edge" is under constant development so be careful using it in production. It is possible that bugs in "edge" could cause data loss or could break your system.

## Kernal

- vanilla
- virthardened
- hardened
  - [Hardening:wiki](<https://en.wikipedia.org/wiki/Hardening_(computing)>)
  - Grsecurity
- 内核相关包
  - [linux-\*](https://pkgs.alpinelinux.org/packages?name=linux-*&branch=v3.6&repo=&arch=x86_64)
  - [\*-hardened](https://pkgs.alpinelinux.org/packages?name=*hardened&branch=v3.6&repo=&arch=x86_64)

## Mirror

- [How to setup a Alpine Linux mirror](https://wiki.alpinelinux.org/wiki/How_to_setup_a_Alpine_Linux_mirror)

- rsync://rsync.alpinelinux.org/alpine/
- rsync://mirrors.tuna.tsinghua.edu.cn/alpine/
  - https://github.com/tuna/rsync

```bash
# 添加 -r iso --limit-rate=2m
wget -np -rNP repos --cut-dirs 1 -e robots=off -X latest-stable,edge http://mirrors.aliyun.com/alpine/

rsync \
  --archive \
  --update \
  --hard-links \
  --delete \
  --delete-after \
  --delay-updates \
  --timeout=600 \
  --exclude="*" \
  --include=/mnt/disk2t/data/alpine/include.txt \
  rsync://rsync.alpinelinux.org/alpine/ mirror/

rsync \
  --archive \
  --update \
  --hard-links \
  --delete \
  --delete-after \
  --delay-updates \
  --timeout=600 \
  rsync://mirrors.tuna.tsinghua.edu.cn/alpine/ mirror/

# 同步单个目录并显示进度
rsync \
  --archive \
  --update \
  --hard-links \
  --delete \
  --delete-after \
  --delay-updates \
  --timeout=600 \
  --progress \
  rsync://mirrors.tuna.tsinghua.edu.cn/alpine/v3.7/ mirror/v3.7/

# 可同时同步另外一个目录以达到并发
# --bwlimit=KBPS 带宽限制
rsync \
  --archive \
  --update \
  --hard-links \
  --delete \
  --delete-after \
  --delay-updates \
  --timeout=600 \
  --bwlimit=5000 \
  rsync://mirrors.tuna.tsinghua.edu.cn/alpine/v3.6/ mirror/v3.6/

rsync --archive --update --hard-links --delete --delete-after --delay-updates --timeout=600 ~/data/alpine/ root@192.168.1.20:/mnt/disk2t/data/alpine/

rsync --archive --update --hard-links --timeout=600 --progress --exclude-from .rsyncignore rsync://mirrors.tuna.tsinghua.edu.cn/alpine/ ./

rsync -auHP --timeout=600 --exclude edge --exclude 'v2.*' rsync://mirrors.tuna.tsinghua.edu.cn/alpine/ /alpine/mirror/
```

**/etc/periodic/hourly/alpine-mirror**

```bash
#!/bin/sh
# make sure we never run 2 rsync at the same time
lockfile="/tmp/alpine-mirror.lock"
if [ -z "$flock" ] ; then
  exec env flock=1 flock -n $lockfile "$0" "$@"
fi

src=rsync://rsync.alpinelinux.org/alpine/
dest=/var/www/localhost/htdocs/alpine/

# uncomment this to exclude old v2.x branches
#exclude="--exclude v2.*"

mkdir -p "$dest"
/usr/bin/rsync \
        --archive \
        --update \
        --hard-links \
        --delete \
        --delete-after \
        --delay-updates \
        --timeout=600 \
        $exclude \
        "$src" "$dest"
```

```bash
chmod +x /etc/periodic/hourly/alpine-mirror
```

## FAQ

### 手动指定 DNS

1. 直接修改 `/etc/resolv.conf`
2. 修改网络配置

```
iface eth0 inet static
    address 192.168.3.3
    netmask 255.255.255.0
    gateway 192.168.3.1
    dns-search example.com
    dns-nameservers 223.5.5.5 114.114.114.114
```

```bash
# 该命令来源于 openresolv
resolvconf -u
```
