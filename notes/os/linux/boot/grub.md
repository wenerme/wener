---
title: GRUB
---

# GRUB

- GRUB
  - 支持 boot 分区加密
    - 2.0.4 还不支持 LUKS2 - 需要指定 `--type luks1`
- 参考
  - [grub manual](https://www.gnu.org/software/grub/manual/grub/)
  - [GNU GRUB](https://en.wikipedia.org/wiki/GNU_GRUB)
  - archlinux [GRUB](https://wiki.archlinux.org/title/GRUB)
  - ubuntu [Grub2](https://help.ubuntu.com/community/Grub2)
  - alpine [main/grub](https://gitlab.alpinelinux.org/alpine/aports/-/tree/master/main/grub)
    - 有加 patch 做一点调整 - 例如支持 /etc/update-extlinux.conf

## 结构

- /boot/grub/grub.cfg - 最终生成的配置 - grub-mkconfig
  - 基于 `/etc/grub.d` 生成
- /etc/default/grub - 环境配置
  - 影响 `/etc/grub.d` 脚本生成结果
- /etc/grub.d
  - 主要脚本 /etc/grub.d/10_linux
  - /etc/grub.d/41_custom 会 source /boot/grub/custom.cfg

**/etc/default/grub**

```shell
GRUB_TIMEOUT=2
GRUB_DISABLE_SUBMENU=y
GRUB_DISABLE_RECOVERY=true
GRUB_CMDLINE_LINUX_DEFAULT="modules=sd-mod,usb-storage,ext4 quiet rootfstype=ext4"

# GRUB_DISABLE_OS_PROBER=false
# GRUB_PRELOAD_MODULES="lvm"
# GRUB_ENABLE_CRYPTODISK=y
```

- GRUB_CMDLINE_LINUX_DEFAULT
  - 正常模式
- GRUB_CMDLINE_LINUX
  - 正常和恢复模式都会用到
- 参考
  - [Grub2/Setup](https://help.ubuntu.com/community/Grub2/Setup)

## /etc/grub.d/10_linux

- 会 source /etc/update-extlinux.conf 并添加配置

```bash
if [ -f /etc/update-extlinux.conf ]; then
	. /etc/update-extlinux.conf
	GRUB_CMDLINE_LINUX_DEFAULT="modules=${modules} ${default_kernel_opts} ${GRUB_CMDLINE_LINUX_DEFAULT}"
fi
```

## Install

```bash
# https://github.com/alpinelinux/alpine-conf/blob/4f960a81e65c7ee1e37b5a4029e2aa47e63e654f/setup-disk.in#L281
grub-install --target=x86_64-efi --efi-directory="$mnt"/boot/efi --bootloader-id=alpine --boot-directory="$mnt"/boot --no-nvram
# fallback
install -D "$mnt"/boot/efi/EFI/alpine/grubx64.efi "$mnt"/boot/efi/EFI/boot/boot$fwa.efi

grub-install --target=i386-pc /dev/sdX
grub-install --target=x86_64-efi --efi-directory=esp --bootloader-id=GRUB

grub-mkconfig -o /boot/grub/grub.cfg
```

# FAQ

## grub-probe: error: cannot find a device for /

先 chroot 在 mount 一次

```bash
chroot /mnt
mount -t ext4 /dev/loop0p2 /

# 现在执行就没问题了
grub-mkconfig -o /boot/grub/grub.cfg.new \
	&& mv /boot/grub/grub.cfg.new /boot/grub/grub.cfg
```
