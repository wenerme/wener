---
title: Alpine on ARM
tags:
  - OS
  - Alpine
  - ARM
---

# Alpine on ARM

- [Alpine on ARM](https://wiki.alpinelinux.org/wiki/Alpine_on_ARM)

```bash
qemu-system-arm -M vexpress-a9 -kernel zImage -initrd initramfs-grsec -dtb vexpress-v2p-ca9.dtb -hda hda.img -serial stdio
```
