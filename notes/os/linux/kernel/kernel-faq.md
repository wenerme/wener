---
title: Kernel FAQ
tags:
  - FAQ
---

# Kernel FAQ

## 修改

- Linux 5.4
  - linux/pci-aspm.h -> linux/pci.h
- Linux 5.1
  - [get_ds](https://github.com/torvalds/linux/commit/736706bee3298208343a76096370e4f6a5c55915)
    - `get_ds()` -> KERNEL_DS
- Linux 5.0
  - `SUBDIRS=$(PWD)` -> `M=$(shell pwd)`
  - do_gettimeofday
    - `do_gettimeofday(&di->last_lost_tick.tv);` -> `di->last_lost_tick = ktime_get();`
    - 以前在 `linux/timekeeping32.h` 之后被删除
    - [xpp patch](http://git.asterisk.org/gitweb/?p=dahdi/linux.git;a=blobdiff;f=drivers/dahdi/xpp/xbus-pcm.c;h=8bb2fe76c66a143242730e022cf8af3a6268b062;hp=37f9260e7ecb1c7b3e00b7bd942eac7bc95d6d05;hb=ffcd08205c71dcb0e060836359418bef20f07ffa;hpb=8468250328b607cbd2774c2209fbe5826be01098)
  - `struct timeval now` -> `const ktime_t now`;
  - touch_softlockup_watchdog
    - 以前 `linux/sched.h` 现在在 [linux/nmi.h](https://elixir.bootlin.com/linux/v5.4/ident/touch_softlockup_watchdog)
