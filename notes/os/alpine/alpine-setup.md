---
title: AlpineLinux Setup
---

# AlpineLinux Setup

- 参考
  - [alpinelinux/alpine-conf](https://github.com/alpinelinux/alpine-conf)
  - [Alpine setup scripts](https://wiki.alpinelinux.org/wiki/Alpine_setup_scripts)

```bash
setup-interfaces -ar
# service networking restart

setup-sshd -c openssh
echo 'PermitRootLogin yes' >> /etc/ssh/sshd_config
service sshd reload

echo root:root | chpasswd
```

```bash
ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null root@127.0.0.1 -p 2222
```

```bash
rc-update add networking
rc-update add acpid
service acpid start

setup-keymap us us
setup-ntp -c chrony
setup-timezone Asia/Shanghai

echo "https://mirrors.tuna.tsinghua.edu.cn/alpine/v$(sed -n 's/\.\d\+$//p' /etc/alpine-release)/main
https://mirrors.tuna.tsinghua.edu.cn/alpine/v$(sed -n 's/\.\d\+$//p' /etc/alpine-release)/community" > /etc/apk/repositories
apk update
apk version -a

apk add util-linux nano curl
# 常用 - 如果想要做小镜像可以不装
apk add shadow bash sudo doas busybox-extras openssh-client openssh-sftp-server

# setup-hostname alpine

# 安装到系统盘 - 注意选择正确的盘符
# qemu 的参数顺序影响 vda 还是 vdb
lsblk
USE_EFI=1 setup-disk -m sys -s 0 -v /dev/vda
```

## setup-disk

- 将系统写入存储介质
- [setup-disk](https://github.com/alpinelinux/alpine-conf/blob/master/setup-disk.in)
  - MKFS_OPTS_BOOT
  - MKFS_OPTS_ROOT
    - ext4 建议 设置 `-b 4096` 强制 4k

---

**diskmode**

- sys - 正常模式，boot 分区和 root 分区 - 适用于 开发环境，桌面，虚拟机
- data - OS 通过内存启动 tmpfs，无 boot 分区
- lvm
- lvmsys
- lvmdata

**bootloader**

- ARCH=s390x -> s390-tools
- ARCH=ppc64le -> grub-ieee1275
- USE_EFI - grub-efi
- BOOTLOADER
  - grub -> grub-bios
  - syslinux
  - zipl
  - raspberrypi-bootloader

```bash

```
