---
slug: qemu-windows-host
title: QEMU Windows 宿主机
---

# QEMU Windows HOST

## Tips

- [W64](https://qemu.weilnetz.de/w64/)
  - QEMU Binaries for Windows and QEMU Documentation
- accel
  - hax
    - 自 2.9 支持使用 HAXM, 类似于 Linux 的 KVM
  - whpx - Windows Hypervisor Platform accelerator
- Windows XP 最后版本为 2.7.0

# FAQ

## Could not load library WinHvPlatform.dll

## HAXM vs HyperV

- [Hardware acceleration for emulator performance (Hyper-V & HAXM)](https://docs.microsoft.com/en-us/xamarin/android/get-started/installation/android-emulator/hardware-acceleration)

| Scenario              | HAXM | WHPX    | Hypervisor.Framework |
| --------------------- | ---- | ------- | -------------------- |
| Intel Processor       | ✅   | ✅      | ✅                   |
| AMD Processor         |      | ✅      |
| Hyper-V               |      | ✅      |
| nested Virtualization |      | Limited |
| Docker                |      | ✅      | ✅                   |
