---
title: lakka tv
---

# lakka

- [libretro/Lakka-LibreELEC](https://github.com/libretro/Lakka-LibreELEC)
  - LibreELEC+RetroArch
- RPi Download https://www.lakka.tv/get/linux/rpi/
  - https://le-builds.lakka.tv/RPi4.aarch64/Lakka-RPi4.aarch64-4.2.img.gz
  - https://le-builds.lakka.tv/Generic.x86_64/Lakka-Generic.x86_64-4.2.img.gz

:::caution

- Lakka 不支持虚拟化 - 直接操作 GPU 无 XServer

:::

```bash
gzip -d Lakka-Generic.x86_64-4.2.img.gz
# raw 约 2G, qcow2 约 1G
qemu-img convert -O qcow2 Lakka-Generic.x86_64-4.2.{img,qcow2}

qemu-img create -f qcow2 lakka.qcow2 20G
# live, installer
# 默认 live 模式
qemu-system-x86_64 -m 2048 -smp 2 -accel hvf -hda Lakka-Generic.x86_64-4.2.qcow2 -display cocoa -net nic -nic user,hostfwd=tcp::2222-:22
qemu-system-x86_64 -m 2048 -smp 2 -accel kvm -hda Lakka-Generic.x86_64-4.2.img -vnc :1 -net nic -nic user,hostfwd=tcp::2222-:22
```
