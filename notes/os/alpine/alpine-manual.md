---
title: Alpine QEMU Manual
tags:
  - OS
  - Alpine
  - QEMU
  - Manual
---

# Qemu Manual

## 使用 Qemu 制作启动盘

```bash
# 宿主机上操作
# ==========
# 创建磁盘并从 cd 启动, 映射虚拟机 22 到本地 2222 端口, 默认账号 root
qemu-img create -f raw alp-x86.raw 1g
# 密码 root
# -m 1g 默认内存过低, 安装时可能出现内存不够
# mac 可添加 -accel hvf 进行加速
qemu-system-x86_64 -m 1g -hda alp-x86.raw -net nic -net user,hostfwd=tcp::2222-:22 -cdrom alpine-extended-3.8.0-x86_64.iso -boot d

# 虚拟机操作
# ==========
# 设置网络, 默认即可
setup-interfaces
rc-service networking restart
# 设置 sshd, 允许 root 远程登陆, 并为 root 设置密码
setup-sshd -c openssh
echo 'PermitRootLogin yes' >> /etc/ssh/sshd_config
echo root:root | chpasswd
rc-service sshd restart

# 宿主机操作
# ==========
# 远程登陆到虚拟机中
ssh-keygen -R [127.0.0.1]:2222
ssh root@127.0.0.1 -p 2222

# 设置仓库镜像, 更新索引
echo "http://mirrors.aliyun.com/alpine/v$(head -c3 /etc/alpine-release)/main
http://mirrors.aliyun.com/alpine/v$(head -c3 /etc/alpine-release)/community" >> /etc/apk/repositories
apk update

# 安装到创建的硬盘
# -m sys 安装为本地磁盘, 可指定 data, sys
# -s 0 不启用交换区
# -k hardened 内核风格, 可指定 hardened(默认), virthardened, virt, vanilla
# -L 使用 LVM
# 环境变量
# BOOT_SIZE=100m 启动分区大小, 默认 100m, 实际安装只会占用 20m 左右
# BOOTLOADER=syslinux 可选择 syslinux, grub
# BOOTFS, ROOTFS, VARFS 指定不同分区文件系统,可选择 ext2, ext3, ext4(默认), btrfs, xfs, vfat(EFI,只用于 boot)
# ERASE_DISKS=/dev/sda 这样可以不询问是否擦除磁盘
# 例如
# BOOT_SIZE=50m setup-disk -m sys -k hardened -s 0 /dev/sda
ERASE_DISKS=/dev/sda setup-disk -m sys -s 0 /dev/sda
# 安装完成关机
poweroff
```

镜像制作完成,可直接安装到 usb

```bash
# macOS 安装到 U 盘
diskutils unmountDisk disk2
sudo dd if=alp-x86.raw of=/dev/rdisk2 status=progress bs=16M

# 可以做个备份以便于以后使用
# gzip -k alp-x86.raw
```

```bash
# 安装完成后关机, 从新的磁盘启动
qemu-system-x86_64 -hda alp-x86.raw -net nic -net user,hostfwd=tcp::2222-:22

# 虚拟机操作
# ==========
# 设置网络, 默认即可
setup-interfaces
rc-service networking restart

# 宿主机操作
# ==========
# 远程登陆到虚拟机中
ssh root@127.0.0.1 -p 2222

# 常用的初始化设置
setup-ntp -c busybox
setup-timezone -z Asia/Shanghai
setup-keymap us us

# 常用的包
apk add --no-cache util-linux e2fsprogs-extra nano curl
# 删除命令行操作记录
rm ~/.ash_history

# 至此该镜像即可作为标准系统基础进行使用了
```

## Qemu UEFI

https://wiki.alpinelinux.org/wiki/Create_UEFI_boot_USB

## Qemu GPT

## chroot
