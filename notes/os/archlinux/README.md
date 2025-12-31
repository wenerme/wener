---
title: ArchLinux
tags:
  - OS
  - ArchLinux
---

# ArchLinux

## Tips

- 核心组件
  - [grub](https://wiki.archlinux.org/index.php/GRUB)
  - [pacman](https://wiki.archlinux.org/index.php/pacman)
  - [systemd](https://wiki.archlinux.org/index.php/systemd)
  - [netctl](https://wiki.archlinux.org/index.php/netctl)
- [Installation Guide](https://wiki.archlinux.org/index.php/installation_guide)
- [Deprecation of net-tools](https://www.archlinux.org/news/deprecation-of-net-tools/)
  - 没有 `ifconfig`, 用 `ip addr`
  - `iproute2` replaces `net-tools`
- [init](https://wiki.archlinux.org/index.php/init)
- [Systemd](https://wiki.archlinux.org/index.php/Systemd)
- [Netctl](https://wiki.archlinux.org/index.php/Netctl)
- [Arch compared to other distributions](https://wiki.archlinux.org/index.php/arch_compared_to_other_distributions)

```bash
systemctl status
systemctl list-units # = systemctl
systemctl --failed
# /usr/lib/systemd/system/ 和 /etc/systemd/system/
systemctl list-unit-files
systemctl start unit
```

```bash
qemu-img create arch.qcow2 -f qcow2 6g
qemu-system-x86_64 -m 2g -smp 4 -cdrom archlinux-2018.07.01-x86_64.iso -hda arch.qcow2 -nic user,hostfwd=tcp::2222-:22
```

## Installation Steps

```bash
# /dev/sda1 /boot 100m
# /dev/sda2 /
fdisk /dev/sda

mkfs.ext4 /dev/sda1
mkfs.ext4 /dev/sda2

# 挂载设备
mount /dev/sda2 /mnt
mkdir /mnt/boot
mount /dev/sda1 /mnt/boot

# 安装基础系统
pacstrap /mnt base
# 生成 fstab
genfstab -U /mnt >> /mnt/etc/fstab

# 加入新的 rootfs 进行配置
arch-chroot /mnt

# 设置时区
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
# 生成 /etc/adjtime
hwclock --systohc
# 如果需要添加新的 locale
# nano /etc/locale.gen

# 如果修改了 mkinitcpio.conf
# mkinitcpio -p linux

# 安装 grub 引导程序
pacman -S grub
# 如果想要使用 eth0 这样的网络设备名而不是 enps0 这样的
# 可以先在 /dev/default/grub 里添加内核参数 net.ifnames=0
grub-mkconfig -o /boot/grub/grub.cfg
grub-install /dev/sda

# 设置密码
passwd

exit
umount -R /mnt
reboot
```

### Mirror Configuration

```bash
mv /etc/pacman.d/mirrorlist /etc/pacman.d/mirrorlist.backup
echo 'Server = http://mirrors.tuna.tsinghua.edu.cn/archlinux/$repo/os/$arch' > /etc/pacman.d/mirrorlist
```
