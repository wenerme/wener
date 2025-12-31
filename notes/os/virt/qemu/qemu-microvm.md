---
title: MicroVM
---

# MicroVM

- 是什么？
  - QEMU 受 Firecracker 启发开发的一种机器类型
  - 最小化 - 不支持 PCI 和 ACPI
  - 适用于短期运行 Guest
- QEMU [microvm](https://github.com/qemu/qemu/blob/master/docs/system/i386/microvm.rst)

```bash
qemu-system-x86_64 \
  -M microvm,x-option-roms=off,pit=off,pic=off,isa-serial=off,rtc=off \
  -enable-kvm \
  -cpu host \
  -m 512m \
  -smp 1 \
  -kernel vmlinux-virt \
  -initrd initramfs-virt \
  -append "console=hvc0 root=/dev/vda rw" \
  -nodefaults \
  -no-user-config \
  -nographic \
  -chardev stdio,id=virtiocon0 \
  -device virtio-serial-device \
  -device virtconsole,chardev=virtiocon0 \
  -drive id=rootfs,file=alpine.rootfs.ext4,format=raw,if=none \
  -device virtio-blk-device,drive=rootfs \
  -netdev user,id=net0,hostfwd=tcp::10022-:22 \
  -device virtio-net-device,netdev=net0

# with Legacy
qemu-system-x86_64 -M microvm \
  -enable-kvm -cpu host -m 512m -smp 2 \
  -kernel vmlinux-virt \
  -initrd initramfs-virt \
  -append "earlyprintk=ttyS0 console=ttyS0 root=/dev/vda" \
  -nodefaults -no-user-config -nographic \
  -serial stdio \
  -drive id=test,file=alpine.rootfs.ext4,format=raw,if=none \
  -device virtio-blk-device,drive=test \
  -netdev tap,id=tap0,script=no,downscript=no \
  -device virtio-net-device,netdev=tap0

qemu-system-x86_64 -M microvm \
  -enable-kvm -cpu host -m 512m -smp 1 \
  -kernel vmlinuz-virt \
  -initrd initramfs-virt \
  -append "earlyprintk=ttyS0 console=ttyS0 rootfstype=ext4 root=/dev/vda" \
  -nodefaults -no-user-config -nographic \
  -serial stdio \
  -drive id=rootfs,file=alpine.rootfs.ext4,format=raw,if=none \
  -device virtio-blk-device,drive=rootfs

qemu-system-x86_64 \
  -M microvm \
  -enable-kvm -cpu host -m 512m -smp 1 \
  -kernel vmlinuz-virt \
  -initrd initramfs-virt \
  -append "console=hvc0 root=/dev/vda rw" \
  -nodefaults -no-user-config -nographic \
  -chardev stdio,id=virtiocon0 \
  -device virtio-serial-device \
  -device virtconsole,chardev=virtiocon0 \
  -drive id=rootfs,file=alpine.rootfs.ext4,format=raw,if=none \
  -device virtio-blk-device,drive=rootfs \
  -netdev tap,id=tap0,script=no,downscript=no \
  -device virtio-net-device,netdev=tap0

# no Legacy
qemu-system-x86_64 \
  -M microvm,x-option-roms=off,pit=off,pic=off,isa-serial=off,rtc=off \
  -enable-kvm -cpu host -m 512m -smp 2 \
  -kernel vmlinux -append "console=hvc0 root=/dev/vda" \
  -nodefaults -no-user-config -nographic \
  -chardev stdio,id=virtiocon0 \
  -device virtio-serial-device \
  -device virtconsole,chardev=virtiocon0 \
  -drive id=test,file=test.img,format=raw,if=none \
  -device virtio-blk-device,drive=test \
  -netdev tap,id=tap0,script=no,downscript=no \
  -device virtio-net-device,netdev=tap0
```
