---
title: QEMU ARM64
---

# QEMU ARM64

```bash
# 系统镜像
curl -Lo alpine-virt-aarch64.iso https://mirrors.tuna.tsinghua.edu.cn/alpine/v3.17/releases/aarch64/alpine-virt-3.17.2-aarch64.iso
# aavmf
curl -Lo aavmf.apk https://mirrors.tuna.tsinghua.edu.cn/alpine/edge/community/aarch64/aavmf-0.0.202211-r0.apk
tar zxvf aavmf.apk --strip-components 2
ls AAVMF

# 准备系统盘
qemu-img create -f qcow2 alpine-aarch64.qcow2 20G
# ISO 启动安装
qemu-system-aarch64 \
  -M virt,gic-version=3 \
  -cpu cortex-a57 -m 512M \
  -net nic -nic user,hostfwd=tcp::2222-:22 \
  -drive if=pflash,format=raw,readonly=on,file="AAVMF/AAVMF_CODE.fd" \
  -device ramfb -device usb-ehci -device usb-kbd -device usb-mouse \
  -drive file=alpine-aarch64.qcow2 \
  -cdrom alpine-virt-aarch64.iso

ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null root@127.0.0.1 -p 2222

# 安装好后确保能正常启动
qemu-system-aarch64 \
  -M virt,gic-version=3 \
  -cpu cortex-a57 -m 512M \
  -net nic -nic user,hostfwd=tcp::2222-:22 \
  -drive if=pflash,format=raw,readonly=on,file="AAVMF/AAVMF_CODE.fd" \
  -device ramfb -device usb-ehci -device usb-kbd -device usb-mouse \
  -drive file=alpine-aarch64.qcow2

# 150mb -> 60mb
# qemu-img convert -O qcow2 alpine-aarch64.qcow2 alpine-3.17-aarch64.qcow2 -c
```

<!--

-device virtio-gpu

-fsdev local,path=/path/to/your/folder,security_model=none,id=test_dev \
-device virtio-9p-pci,fsdev=test_dev,mount_tag=test_mount

mount -t 9p -o trans=virtio test_mount /mnt
 -->

- https://www.qemu.org/docs/master/system/arm/virt.html
- https://unix.stackexchange.com/a/623044/47774

## NVME

```bash
# CONFIG_BLK_DEV_NVME=m 需要手动配置
cat /boot/config-virt | grep -i nvme | grep -v "^#"

# 添加 nvme 到 features
cat /etc/mkinitfs/mkinitfs.conf

# 添加参数 GRUB_CMDLINE_LINUX_DEFAULT
# nvme_core.io_timeout=4294967295 nvme_core.admin_timeout=4294967295
nano /etc/default/grub

mkinitfs
grub-mkconfig -o /boot/grub/grub.cfg
```

- https://help.aliyun.com/document_detail/400536.htm

## x86_64 NVME

```bash
qemu-system-x86_64 -m 2G -net nic -nic user,hostfwd=tcp::2222-:22 \
  -bios OVMF/OVMF.fd \
  -hda dist/alpine-virt-3.18.0-x86_64-efi-20G.qcow2

ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null root@127.0.0.1 -p 2222
```
