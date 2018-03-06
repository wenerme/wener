# Alpine


## Tips
* [jessfraz/apk-file](https://github.com/jessfraz/apk-file)
  * Search file in package from command line

```bash
# 计算块设备容量
echo $(blockdev --getsize64 /dev/sdb1)/1024/1024 | bc -l


apk add shadow
apk add bash
# 更换 shell 为 bash
chsh root -s /bin/bash


# 安装 neofetch
apk add --no-cache -X http://mirrors.aliyun.com/alpine/edge/testing neofetch
# 有些环境下没有 neofetch 可以用screenfetch
apk add --no-cache -X http://mirrors.aliyun.com/alpine/edge/testing screenfetch
```



## 安装
* [Installation](https://wiki.alpinelinux.org/wiki/Installation)
* [alpinelinux/alpine-conf](https://github.com/alpinelinux/alpine-conf)

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
rc-service networking restart
setup-sshd -c openssh
# 默认情况下不允许 root 远程登陆
echo 'PermitRootLogin yes' >> /etc/ssh/sshd_config
rc-service sshd restart
# 设置一个密码, 以便于远程登陆
passwd
# 注意: 如果远程登陆说密码失效, 可能是时间问题, 先在服务器上开启 ntp 同步时间
# 立即同步时间 ntpd -dn -N -p pool.ntp.org

# 远程证书配置好过后可以考虑关闭远程密码登陆
echo 'PasswordAuthentication no' >> /etc/ssh/sshd_config
rc-service sshd restart

# 接下来就可以远程操作了
setup-hostname -n alpine-test
# 使设置的主机名生效
/etc/init.d/hostname --quiet restart

setup-keymap us us
setup-ntp -c busybox
setup-timezone -z Asia/Shanghai

# 添加仓库
# 安装时的安装包位于 /media/sdb/apks/
echo "http://mirrors.aliyun.com/alpine/v$(head -c3 /etc/alpine-release)/main
http://mirrors.aliyun.com/alpine/v$(head -c3 /etc/alpine-release)/community" >> /etc/apk/repositories

# testing 有些尚未发布的, 有时候会用到
echo "@testing http://mirrors.aliyun.com/alpine/edge/testing" >> /etc/apk/repositories

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

# swap 0
setup-disk -m sys -s 0 -v /dev/sda

# 其他的可选参数
# BOOTLOADER grub 或 syslinux
# MBR=/usr/share/syslinux/mbr.bin
# SYSROOT=/mnt
# ERASE_DISKS 可以设置成写入的磁盘, 就不会再进行询问
ROOTFS=btrfs BOOTFS=btrfs VARFS=btrfs DISKLABEL=alp-wen setup-disk -m sys -s 0 -v /dev/sda
```

## 升级
* 查看当前内核版本 https://pkgs.alpinelinux.org/packages?name=linux*&branch=v3.7&repo=main&arch=x86_64
* 3.7 添加了 busybox-extras, 部分原先 busybox 中的工具被移到了该包

```bash
sed -ire 's/v\d\.\d/v3.7/g' /etc/apk/repositories
apk update
# 在进行升级之前先更新 apk 工具
apk add --upgrade apk-tools
# 更新所有的包, --available 会强制更新包, 即便版本是一样的
apk upgrade --available

# 查看是否还有未升级的
apk version
# 内核可能由于依赖原因不会升级
apk info -r linux-hardened
# 将依赖的包进行统一升级即可
apk add --upgrade linux-hardened spl-hardened zfs-hardened

# 如果更新了内核, 则需要重启
sync
reboot
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
* http://mirrors.aliyun.com/alpine/v3.6/main/x86_64/APKINDEX.tar.gz
* https://wiki.alpinelinux.org/wiki/Apkindex_format
* https://wiki.alpinelinux.org/wiki/Apk_spec

## Edge
* https://wiki.alpinelinux.org/wiki/Edge
* "edge" is under constant development so be careful using it in production. It is possible that bugs in "edge" could cause data loss or could break your system.


## Kernal
* vanilla
* virthardened
* hardened
  * [Hardening:wiki](https://en.wikipedia.org/wiki/Hardening_(computing))
  * Grsecurity
* 内核相关包
  * [linux-*](https://pkgs.alpinelinux.org/packages?name=linux-*&branch=v3.6&repo=&arch=x86_64)
  * [*-hardened](https://pkgs.alpinelinux.org/packages?name=*hardened&branch=v3.6&repo=&arch=x86_64)

## Mirror
* [How to setup a Alpine Linux mirror](https://wiki.alpinelinux.org/wiki/How_to_setup_a_Alpine_Linux_mirror)


* rsync://rsync.alpinelinux.org/alpine/
* rsync://mirrors.tuna.tsinghua.edu.cn/alpine/
  * https://github.com/tuna/rsync

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
```

rsync --archive --update --hard-links --delete --delete-after --delay-updates --timeout=600 ~/data/alpine/ root@192.168.1.20:/mnt/disk2t/data/alpine/

__/etc/periodic/hourly/alpine-mirror__

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

```
iface eth0 inet static
    address 192.168.3.3
    netmask 255.255.255.0
    gateway 192.168.3.1
    dns-search example.com
    dns-nameservers 223.5.5.5 114.114.114.114
```

```
resolvconf -u
```
