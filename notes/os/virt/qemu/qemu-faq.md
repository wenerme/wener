---
title: QEMU FAQ
tags:
  - FAQ
---

# QEMU FAQ

- [7 ways we harden our KVM hypervisor at Google Cloud: security in plaintext](https://cloudplatform.googleblog.com/2017/01/7-ways-we-harden-our-KVM-hypervisor-at-Google-Cloud-security-in-plaintext.html)

## 持嵌套虚拟化

- 大多云平台都不支持嵌套虚拟化
- 裸金属服务器 支持虚拟化
- 参考
  - [GCP 嵌套虚拟化简介](https://cloud.google.com/compute/docs/instances/nested-virtualization/overview)
    - Intel Haswell+
      - Sandy Bridge, Ivy Bridge 不可以
      - AMD 不可以
  - [Cloud Provider Instances with KVM support](https://ignite.readthedocs.io/en/stable/cloudprovider/)
    - GCP - 所有支持
    - DO - 所有支持
    - Azure Dv3, Ev3 - 4C16G+ - $140/mo
    - Packet - 4C8G+ - ~$50/mo
    - AWS `*.metal` - 裸金属服务器 - 48CPU+

## RNG

> 建议默认添加，否则可能导致非常慢意外 Hang 住

```
-device virtio-rng-pci
```

默认 `/dev/random`。 可自定义参数

```
-object rng-random,filename=/dev/hwrng,id=rng0 -device virtio-rng-pci,rng=rng0
```

```bash
qemu-system-x86_64 -object rng-random,filename=/dev/urandom,id=rng0 -device virtio-rng-pci,rng=rng0,bus=pci.0,addr=0x7
```

- https://www.qemu.org/docs/master/system/devices/vhost-user-rng.html

## 环境检测

```bash
# KVM 要求 Intel VT, AMD-V
egrep '(vmx|svm)' /proc/cpuinfo

modprobe kvm
modprobe kvm-intel
```

## 访问远程镜像

```bash
# apk add qemu-block-ssh
qemu -drive file=ssh://host/path/to/file,if=virtio,cache=none
```

## qemu: uncaught target signal 4 (Illegal instruction) - core dumped

ppc64le 异常

## qemu-s390x: warning: 'msa5-base' requires 'klmd-sha-512'

s390x 异常

## virtfs

https://wiki.qemu.org/Documentation/9psetup

ProjectZero
QEMU: virtfs permits guest to access entire host filesystem
https://news.ycombinator.com/item?id=13753950

## convert 后无法启动

- 在 macOS 下从 qcow2 转换为 raw 后分区信息丢失
- Linux 未遇到这样的问题
- 转换后可使用 fdisk 检查分区信息

## Overhead

[Containerization vs. Virtualization – More on Overhead](http://www.brightcomputing.com/blog/containerization-vs.-virtualization-more-on-overhead)

## 硬件加速

开启硬件加速和不开启性能可能相差 10 倍+。

```bash
qemu-system-x86_64 -accel help
```

- tcg - JIT 模式
- macOS - hvf, hax
  - hvf 实现不是很完整，可能会出现无法运行的情况
  - 如果加速有问题，尝试修改 smp 为 1
- Windows - hyper, hax
- Linux - kvm

## USB

- https://github.com/qemu/qemu/blob/master/docs/usb2.txt
- https://unix.stackexchange.com/a/251406/47774

```bash
qemu-system-x86_64 \
  -enable-kvm \
  -M q35 \
  -m 2G \
  -usb -usbdevice host:16b2:1001 \
  -usb -usbdevice host:0529:0001 \
  -usbdevice tablet \
  -net nic \
  -net bridge,br=br0 \
  -vga qxl \
  -spice port=5930,disable-ticketing \
  -device virtio-serial-pci \
  -device virtserialport,chardev=spicechannel0,name=com.redhat.spice.0 \
  -chardev spicevmc,id=spicechannel0,name=vdagent \
  -drive file=/mnt/data/win-patch.img,if=virtio
```

## -accel kvm: failed to initialize kvm: Permission denied

```bash
addgroup $USER kvm
```

## 鼠标偏移

```bash
-device usb-ehci,id=usb,bus=pci.0,addr=0x4 -device usb-mouse -device usb-tablet -device usb-kbd
```

## usb

**usb2.0**

- 兼容性更好

```
-device usb-ehci,id=usb,bus=pci.0,addr=0x4
```

**usb3.0**

```
-device nec-usb-xhci,id=usb,bus=pci.0,addr=0x4
```

## Cannot enable HVF when guest CPU has EL3 enabled

- Exception Level 3 (EL3)
  - 最高的特权级别

## TBD

```
no scancode found for keysym 1185
no scancode found for keysym 65306
```
