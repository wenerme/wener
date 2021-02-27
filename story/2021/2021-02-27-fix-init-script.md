---
slug: fix-init-script
title: 记录一次修复 init 脚本的经历
---

# 记录一次修复 init 脚本的经历

## 问题产生过程
由于定制化过 `/usr/share/mkinitfs/initramfs-init` 脚本，在升级大版本后，该文件被覆盖，导致生成的 initramfs 无法启动系统。

正常情况升级 `/etc` 下会产生 `.apk-new` 后缀文件避免升级覆盖，但由于是 `/usr/share` 下文件，因此导致覆盖。

## 难点
* 系统使用静态 IP
  * 需要提供相同 IP 段地址才能进行 SSH
  * 假设IP为 192.168.66.99/22
* 系统在硬盘上 - M2
  * 无法直接在其他系统上进行修复
  * 通过提供 U盘 系统在原地恢复
* root 盘有 luks 加密
  * 依赖硬件环境
  * QEMU 启动无法模拟相同环境
  * 需要手动输入密钥进行挂载
* root 密码为 UUID
  * 极其难输入
  * 且需要输入多次，因此选择网络打通通过 SSH 登陆

## 操作过程

<!-- more -->

### 准备虚拟机和环境

```bash
# QEMU 虚拟机
apk add qemu-system-x86_64

# 桥接模拟网络环境 - 使用相同 IP 段访问
ip li add vmbr0 type bridge
ip li set vmbr0 up
# 桥接以便于访问 192.168.66.99/22
ip addr add 192.168.66.1/22 dev vmbr0

# 允许 qemu 桥接网卡
echo 'allow vmbr0' >> /etc/qemu/bridge.conf
```

### 启动系统

```bash
# 提供 vnc 方便查看
# -curses 方便输入 luks 密钥
# 桥接 vmbr0
qemu-system-x86_64 -accel kvm -m 2G \
  -vnc 0.0.0.0:1 /dev/sda \
  -netdev bridge,br=vmbr0,id=n1 -device virtio-net,netdev=n1 \
  -curses
```

启动后无法进入系统，/sysroot 挂载失败，出现修复 shell

```
mount: mounting /dev/sda2 on /sysroot failed: Invalid argument
Mounting root failed.
initramfs emergency recovery shell launched. Type 'exit' to continue boot
sh: can't access tty; job control turned off
/ #
```

此时手动挂载 /sysroot

```bash
cryptsetup open /dev/sda2 cryptroot
# 粘贴密钥

# 挂载 sysroot
mount /dev/mapper/cryptroot /sysroot

# 退出 shell 正常进入系统
exit
```

### 修复 init 脚本

```bash
# 将准备好的 init 脚本直接覆盖
rsync --rsync-path='sudo rsync' --no-owner initramfs-init admin@192.168.66.99:/usr/share/mkinitfs/initramfs-init

# 进入虚拟机
ssh admin@192.168.66.99

# 从新生成 initramfs
mkinitfs

# 为安全起见，验证脚本正确
mkdir -p /tmp/init
cd /tmp/init
# 解压到当前目录
zcat < /boot/initramfs-lts | cpio -idmv
# 确保是正确的脚本
cat init
```

### 避免再次出现问题
/etc 下配置不会被覆盖，lbu 还能备份，因此将 init 脚本放到 etc，修改 mkinitfs 配置指向期望的脚本。

[mkinitfs](https://github.com/alpinelinux/mkinitfs/blob/master/mkinitfs.in) 的配置文件位于 `/etc/mkinitfs/mkinitfs.conf`, 默认配置 features, 该文件会被脚本直接 source ([mkinitfs.in#L237](https://github.com/alpinelinux/mkinitfs/blob/a4d6120aa949cdb6d18eb8241c4706f96685a359/mkinitfs.in#L237)), 从脚本可看出配置变量为 init.

```bash
cp /usr/share/mkinitfs/initramfs-init /etc/mkinitfs/initramfs-init
echo "init=/etc/mkinitfs/initramfs-init" >> /etc/mkinitfs/mkinitfs.conf
```

## 总结
不要修改 `/usr/share` 下的默认配置，将配置放到 `/etc` 下，安全可靠，还可以使用 lbu 备份。
