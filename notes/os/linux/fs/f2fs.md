---
title: f2fs
---

# f2fs

- F2FS - Flash-Friendly File System
  - 2012 by Samsung, Huawei, Google
- Linux 3.8+, Android 5.0+
- 功能特性
  - 压缩
  - 文件级加密
- 适用于配备 FTL（Flash Translation Layer）的 NAND 闪存。
- 与 JFFS 或 UBIFS 不同，它依赖于 FTL 来处理写入分布。
- FTL
  - 作用
    - 地址映射 - LBA -> PBA
    - 垃圾回收 - GC/Garbage Collection
    - 磨损均衡 - Wear Leveling
    - 错误管理
  - 常见设备
    - SSD
    - eMMC
    - UFS
    - SD
- 原始的 NAND 没有 FTL 需要使用专门的文件系统，如 JFFS2 或 UBIFS。
- vs ext4
  - ext4
    - 支持 SSD 优化选项 discard, noatime
    - 适合混合负载
    - 随机写入性能在闪存设备上可能不如 f2fs
  - f2fs
    - 使用 LSD/Log-structured Design 优化随机写入
    - 减少写放大，提供更好的小文件处理能力
    - 文件碎片更少
- 参考
  - wikipedia [F2FS](https://en.wikipedia.org/wiki/F2FS)

```bash
# MODEL SSD EMMC
lsblk -o NAME,FSTYPE,SIZE,MOUNTPOINT,MODEL
dmesg | grep -i 'ftl|flash'
sudo hdparm -I /dev/sdX
```
