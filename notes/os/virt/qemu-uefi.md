---
title: QEMU UEFI Support (OVMF)
tags:
  - Virtualization
  - QEMU
  - UEFI
  - OVMF
---

# QEMU UEFI Support (OVMF) {#qemu-uefi-ovmf}

- [Open Virtual Machine Firmware (OVMF)](https://github.com/tianocore/edk2/blob/master/OvmfPkg/README#L62)
- [Ubuntu UEFI/OVMF](https://wiki.ubuntu.com/UEFI/OVMF)
- [Debian SecureBoot/VirtualMachine](https://wiki.debian.org/SecureBoot/VirtualMachine)
- [Kraxel Repos](https://www.kraxel.org/repos/)

## Installation (Alpine Linux)

```bash
apk add ovmf
# From edge community
# apk add ovmf -X https://mirrors.aliyun.com/alpine/edge/community/

# Manual Download
curl -O https://mirrors.aliyun.com/alpine/edge/community/x86_64/ovmf-0.0.201908-r1.apk
# Extract bios.bin
```

## Usage

Use `-bios` to specify the OVMF firmware.

```bash
# Basic usage
qemu-system-x86_64 -bios /usr/share/ovmf/bios.bin

# macOS (HVF acceleration)
qemu-system-x86_64 -accel hvf -m 4G -smp 2 \
  -net nic -nic user,hostfwd=tcp::2222-:22 \
  -drive file=disk.qcow2,if=virtio \
  -serial stdio -display cocoa -bios bios.bin

# KVM
qemu-system-x86_64 -accel kvm -m 4G -smp 2 \
  -net nic -nic user,hostfwd=tcp::2222-:22 \
  -drive file=disk.qcow2,if=virtio \
  -serial stdio -bios /usr/share/ovmf/bios.bin -vnc :10
```

> [!TIP]
> Use `-L .` to tell QEMU to look for `bios.bin` in the current directory.

## Troubleshooting

- **No Bootable Disk**: Use UEFI Shell.
- **Commands**: `diskpart`, `wmic diskdrive`.
