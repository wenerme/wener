---
title: Alpine Virt
---

# Alpine Virt

- alpine virt flavor 是什么
  - 适用于虚拟化环境的内核
  - 没有固件
  - modules 更少更小 - 包含 virtio 相关模块
  - /boot 14MB + /lib/modules 61MB=75 MB
  - rootfs 可小到 20 MB
- 默认 features: ata base cdrom ext4 keymap kms mmc raid scsi usb virtio

```bash
qemu-system-x86_64 -m 2048 -enable-kvm -serial stdio \
  -cdrom https://dl-cdn.alpinelinux.org/alpine/v3.16/releases/x86_64/alpine-virt-3.16.0-x86_64.iso
```
