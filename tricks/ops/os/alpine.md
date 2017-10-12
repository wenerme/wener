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
apk add --no-cache -X http://dl-3.alpinelinux.org/alpine/edge/testing/ neofetch
```



## 安装
* [Installation](https://wiki.alpinelinux.org/wiki/Installation)

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

# Edge 可选, 用于安装一些特殊的, 或者更新的
echo "@edge http://mirrors.aliyun.com/alpine/edge/main
@testing http://mirrors.aliyun.com/alpine/edge/testing" >> /etc/apk/repositories

# 或者直接用 edge
echo "http://mirrors.aliyun.com/alpine/edge/main
http://mirrors.aliyun.com/alpine/edge/community
@testing http://mirrors.aliyun.com/alpine/edge/testing" >> /etc/apk/repositories

apk update


# 创建回答文件, 然后可直接编辑
setup-alpine -c ans
# 使用回答文件进行初始化
setup-alpine -f ans

# 如果只是想直接装到 U 盘, 那么至少需要 setup-interfaces, setup-sshd(从远程方便操作, 可以粘贴复制), 添加仓库, 然后才能 setup-disk
# 因为 setup-disk 需要安装一些包

# swap 0
setup-disk -m sys -s 0 -v /dev/sda
```



## USB

```
usbutils-008-r0
libusb-1.0.20-r0
usbredir-doc-0.7-r2
usbredir-0.7-r2
libgusb-0.2.9-r1
libusb-compat-0.1.5-r3
usb-modeswitch-doc-2.4.0-r0
usbutils-doc-008-r0
libusb-dev-1.0.20-r0
usbredir-dev-0.7-r2
libgusb-doc-0.2.9-r1
usbredir-server-0.7-r2
usb-modeswitch-2.4.0-r0
libusb-compat-dev-0.1.5-r3
libgusb-dev-0.2.9-r1
usb-modeswitch-udev-2.4.0-r0
hwdata-usb-0.282-r0
```

## NTFS

```bash
# Manual http://www.tuxera.com/community/open-source-ntfs-3g/#tab-1414502373-2-22
# http://www.tuxera.com/community/ntfs-3g-manual/
apk add ntfs-3g ntfs-3g-progs

# 挂载
mount -t ntfs-3g /dev/sda1 /mnt/windows
# 或
echo '/dev/sda1 /mnt/windows ntfs-3g defaults 0 0' >  /etc/fstab
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

/mnt/disk2t/data/alpine

```bash
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
  rsync://rsync.alpinelinux.org/alpine/ /mnt/disk2t/data/alpine/mirror/
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

## APKBUILD
* [Creating an Alpine package](https://wiki.alpinelinux.org/wiki/Creating_an_Alpine_package)
* https://wiki.alpinelinux.org/wiki/APKBUILD_Reference
* https://wiki.alpinelinux.org/wiki/Apkindex_format

```bash
DEV_USER=dev

apk add alpine-sdk
adduser $DEV_USER
echo "$DEV_USER  ALL=(ALL) ALL" >> /etc/sudoers

# 修改 PACKAGER 信息
vi /etc/abuild.conf
addgroup $DEV_USER abuild

# 缓存目录
mkdir -p /var/cache/distfiles
# 给所有人写的权限
# 也可以只给 abuild 组 chgrp abuild /var/cache/distfiles; chmod g+w /var/cache/distfiles
chmod a+w /var/cache/distfiles

# 切换为 $DEV_USER 登陆
# 生成秘钥
abuild-keygen -a -i
#git config --global user.name "Your Full Name"
#git config --global user.email "your@email.address"
mkdir -p /gits
cd /gits
git clone git://git.alpinelinux.org/aports
# 查看相关帮助
abuild -h
```

```bash
# /var/cache/distfiles
abuild checksum
abuild -r
# 位于 $HOME/packages/main/x86_64
```

```bash
docker run --rm -it -v $PWD:/build -v $PWD/distfiles:/var/cache/distfiles -u builder wener/edge:builder
```

* Invalid configuration `x86_64-alpine-linux-musl`: machine `x86_64-alpine-linux` not recognized
  * 可以将 `--build` 和 `--host` 设置为 `x86_64-alpine-linux`
  * 因为部分项目构建是无法将 `musl` 识别为 `gnu`


```
$ abuild -h
abuild 3.0.0_rc3
usage: abuild [options] [-P REPODEST] [-s SRCDEST] [-D DESCRIPTION] [cmd] ...
       abuild [-c] -n PKGNAME[-PKGVER]
Options:
 -A  Print CARCH and exit
 -c  Enable colored output
 -d  Disable dependency checking
 -D  Set APKINDEX description (default: $repo $(git describe))
 -f  Force specified cmd, even if they are already done
 -F  Force run as root
 -h  Show this help
 -i  Install PKG after successful build
 -k  Keep built packages, even if APKBUILD or sources are newer
 -K  Keep buildtime temp dirs and files (srcdir/pkgdir/deps)
 -m  Disable colors (monochrome)
 -P  Set REPODEST as the repository location for created packages
 -q  Quiet
 -r  Install missing dependencies from system repository (using sudo)
 -R  Recursively build and install missing dependencies (using sudo)
 -s  Set source package destination directory
 -u  Recursively build and upgrade all dependencies (using sudo)
 -v  Verbose: show every command as it is run (very noisy)

Commands:
  build       Compile and install package into $pkgdir
  check       Run any defined tests concerning the package
  checksum    Generate checksum to be included in APKBUILD
  clean       Remove temp build and install dirs
  cleancache  Remove downloaded files from $SRCDEST
  cleanoldpkg Remove binary packages except current version
  cleanpkg    Remove already built binary and source package
  deps        Install packages listed in makedepends and depends
  fetch       Fetch sources to $SRCDEST and verify checksums
  index       Regenerate indexes in $REPODEST
  listpkg     List target packages
  package     Create package in $REPODEST
  prepare     Apply patches
  rootbld     Build package in clean chroot
  rootpkg     Run 'package', the split functions and create apks as fakeroot
  sanitycheck Basic sanity check of APKBUILD
  snapshot    Create a $giturl or $svnurl snapshot and upload to $disturl
  sourcecheck Check if remote source package exists upstream
  srcpkg      Make a source package
  undeps      Uninstall packages listed in makedepends and depends
  unpack      Unpack sources to $srcdir
  up2date     Compare target and sources dates
  verify      Verify checksums

To activate cross compilation specify in environment:
  CHOST       Arch or hostspec of machine to generate packages for
  CTARGET     Arch or hostspec of machine to generate compiler for
```
