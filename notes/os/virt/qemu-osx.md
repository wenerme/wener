---
title: QEMU on macOS
tags:
  - Virtualization
  - QEMU
  - macOS
  - Hypervisor
---

# QEMU on macOS {#qemu-on-macos}

- [OSX-KVM](https://github.com/kholia/OSX-KVM) - Run macOS on QEMU/KVM.
- [VDHH - Veertu Desktop Hosted Hypervisor](https://github.com/veertuinc/vdhh)
  - Type 2 hypervisor on top of Apple `Hypervisor.framework` and QEMU.

## Acceleration

- **Hypervisor.framework**: Native macOS hypervisor accelerator (`-accel hvf`).
- **HAXM** (Legacy): [Accelerating QEMU on Windows with HAXM](https://www.qemu.org/2017/11/22/haxm-usage-windows/).

## Resources

- [Qemu on MacOSX with Hypervisor Framework (2017)](http://www.breakintheweb.com/2017/10/14/Qemu-on-MacOSX-with-Hypervisor-Framework/)
- [Alpine Linux on ARMv7 QEMU](https://arvanta.net/alpine/install-armv7-qemu/)
