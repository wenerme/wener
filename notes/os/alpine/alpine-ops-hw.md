---
title: Alpine Hardware Operation
tags:
  - OS
  - Alpine
  - Hardware
---

# AlpineLinux Hardware Operation

## 硬件信息

```bash
apk add pciutils
apk add usbutils

# dmidecode ownership vpddecode biosdecode
apk add dmidecode

# 从硬件设备的 DMI 表提取信息
dmidecode -t memory
dmidecode -t system
dmidecode -t bios
dmidecode -t processor
# 获取主板信息
dmidecode -t 2

# 硬件列表
apk add lshw
# 内存
lshw -short -C memory
# HTML 查看
lshw -html > lshw.html
# 移除敏感信息
lshw -sanitize -html > lshw.html

lscpu
lsblk
lsusb
lspci
lsscsi

# 硬盘信息
hdparm /dev/sda1
```

## S.M.A.R.T

- 硬盘信息
- [Ubuntu Smartmontools](https://help.ubuntu.com/community/Smartmontools)
- [S.M.A.R.T. - Wikipedia](https://en.wikipedia.org/wiki/S.M.A.R.T.)
- [S.M.A.R.T. - Arch Wiki](https://wiki.archlinux.org/index.php/S.M.A.R.T.)
- [Comparison of S.M.A.R.T. tools](https://en.wikipedia.org/wiki/Comparison_of_S.M.A.R.T._tools)

```bash
# 基础信息
smartctl -i /dev/sda
# 完整信息
smartctl -a /dev/sdb
```

## lm_sensors

- 传感器
- CPU 温度

```bash
apk add lm_sensors lm_sensors-detect
# 检测
sensors-detect
# 显示传感器信息
sensors
```

- [hddtemp](https://github.com/guzu/hddtemp)
- [Hddtemp - Arch Wiki](https://wiki.archlinux.org/index.php/Hddtemp)
