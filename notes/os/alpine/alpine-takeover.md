---
title: takeover
tags:
  - Trick
---

# takeover

- 将 VPS 替换为 AlpineLinux 环境
- 用于平台不支持自定义镜像或者没有 AlpineLinux 的场景

## 准备环境 {#prepare}

```bash
mkdir /takeover
mount -t tmpfs tmpfs /takeover

cd /takeover
mkdir -p etc
cp /etc/resolv.conf etc # 保留 DNS 配置

curl -LO https://raw.githubusercontent.com/marcan/takeover.sh/master/takeover.sh
curl -LO https://raw.githubusercontent.com/marcan/takeover.sh/master/fakeinit.c
curl -LO https://busybox.net/downloads/binaries/1.35.0-x86_64-linux-musl/busybox

curl -LO https://mirrors.tuna.tsinghua.edu.cn/alpine/v3.21/main/x86_64/apk-tools-static-2.14.6-r2.apk
mkdir apk-tools-static
tar zxvf apk-tools-static-*.apk -C .
./sbin/apk.static --version

chmod +x takeover.sh
chmod +x busybox
# apt update; apt install -y gcc # for debian/ubuntu
gcc fakeinit.c -o fakeinit -static # compile fakeinit as static
ldd fakeinit                       # ensure it's static: not a dynamic executable

# Setup the chroot environment
chroot /takeover /busybox sh
# --root /takeover
# apk.static -X http://mirrors.tuna.tsinghua.edu.cn/alpine/v3.17/main --allow-untrusted --initdb add alpine-base
#apk.static -X http://mirrors.tuna.tsinghua.edu.cn/alpine/latest-stable/main --allow-untrusted --initdb add alpine-base
apk.static -X http://dl-cdn.alpinelinux.org/latest-stable/main --allow-untrusted --initdb add alpine-base

# /etc/apk/repositories
# for China
# setup-apkrepos http://mirrors.tuna.tsinghua.edu.cn/alpine/v3.21/main http://mirrors.tuna.tsinghua.edu.cn/alpine/v3.21/community
setup-apkrepos -c -1 # choose first mirror dl-cdn.alpinelinux.org
apk add shadow util-linux
# ln -s /usr/bin/passwd /bin/passwd               # takeover.sh use this
setup-sshd -c openssh                              # 安装 ssh
echo "PermitRootLogin yes" >> /etc/ssh/sshd_config # 允许 root 使用密码登录
exit                                               # 退出 chroot
```

<!--
# sh takeover.sh
# ssh root@HOSTNAME -p 80 # 中间进入第二个 SSH
-->

## takeover

- takeover 前注意 /etc/network/interfaces 是否是特殊情况
- 完成 takeover 后原先系统的 init 就和 ssh 进入的环境没关系了
- takeover 不会对原系统有任何影响

```bash
TO=/takeover
# e.g. systemd
OLD_INIT=$(readlink /proc/1/exe)
PORT=80

# 为 SSH 设置新的密码
./busybox chroot . /usr/bin/passwd
# 使用 busybox 准备环境
./busybox sh
rm -f etc/mtab
ln -s /proc/mounts etc/mtab
mkdir -p old_root
mount -t tmpfs tmp tmp
mount -t proc proc proc
mount -t sysfs sys sys
mount -t devtmpfs dev dev
mount --bind /dev/pts dev/pts
exit

# /dev/pts/0
TTY="$(./busybox tty)"

exec < "$TO/$TTY" > "$TO/$TTY" 2> "$TO/$TTY"
# 准备新的 init
./busybox cat > tmp/${OLD_INIT##*/} << EOF
#!${TO}/busybox sh

exec <"${TO}/${TTY}" >"${TO}/${TTY}" 2>"${TO}/${TTY}"
cd "${TO}"

./busybox echo "Init takeover successful"
./busybox echo "Pivoting root..."
./busybox mount --make-rprivate /
./busybox unshare -m
./busybox pivot_root . old_root
./busybox echo "Chrooting and running init..."
exec ./busybox chroot . /fakeinit
EOF
./busybox chmod +x tmp/${OLD_INIT##*/}

# 启动 SSH
# ssh root@HOSTNAME -p 80
./busybox chroot . /usr/bin/ssh-keygen -A
./busybox chroot . /usr/sbin/sshd -p $PORT -o PermitRootLogin=yes

./busybox mount --bind tmp/${OLD_INIT##*/} ${OLD_INIT} # 切换 init
telinit u                                              # 重新加载 init
```

## reinstall

```bash
# 进入新的 ssh 环境
ssh root@HOSTNAME -p 80
```

**cleanup**

- 清理旧的进程
- 最终 unmount /old_root

```bash
umount -R /old_root
```

**setup**

- setup-disk 会把当前系统环境做到硬盘
- 因此 apk add 的内容也会在安装后的系统里

```bash
apk add curl nano bash file util-linux
# setup /etc/network/interfaces 如果不是 DHCP 需要根据情况调整
setup-interfaces -a

# 确保网络启动
# ln -fs /etc/init.d/networking /etc/runlevels/boot
rc-update add networking boot

# 假设 /dev/vda 为安装盘
# 假设是在云平台因此使用 virt
ERASE_DISKS=/dev/vda setup-disk -m sys -s 0 -k virt /dev/vda

# 可以二次检查
mount /dev/vda2 /mnt
mount /dev/vda1 /mnt/boot
```

- 重启进入新的系统

# FAQ

- [marcan/takeover.sh](https://github.com/marcan/takeover.sh)

## pivot_root: (null): Resource busy

- 需要修改脚本增加 `unshare -m`

```bash
./busybox unshare -m
```
