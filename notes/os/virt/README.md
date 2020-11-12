---
id: virt
title: 虚拟化
---

# 虚拟化

## Tips
* [Comparison of platform virtualization software](https://en.wikipedia.org/wiki/Comparison_of_platform_virtualization_software)
* Virt Tools [Planet](https://planet.virt-tools.org/)
  * Blogging about open source virtualization
  * News from QEMU, KVM, libvirt, libguestfs, virt-manager and related tools
* SMP?
* HVM
  * [Hardware-assisted virtualization](https://en.wikipedia.org/wiki/Hardware-assisted_virtualization)
  * Intel VT-x
  * AMD-V
* Full virtualization
* paravirtualization
* RHEL [CONFIGURING AND MANAGING VIRTUALIZATION](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/configuring_and_managing_virtualization/index)
  * 很好很长的文档

# FAQ
## /dev/sda vs /dev/vda
* sda
  * IDE/SATA/SCSI 类型设备
  * 完全虚拟化
* vda
  * 半虚拟化 - virtio
  * 比 sda 快
* 参考
  * [what is the difference between /dev/vda and /dev/sda](https://serverfault.com/a/803391/190601)

```bash
# sda
qemu-system-x86_64 -hda alpine.qcow2
# vda
qemu-system-x86_64 -drive file=alpine.qcow2,if=virtio
```

## OpenVZ vs KVM vs Xen
* KVM - Kernel-based
  * Linux 内核模块 - 为第三方工具（QEMU）提供虚拟化支持
  * 通过 virtio 提供 IO 设备虚拟化
* Xen
  * Type 1 全虚拟化
  * 支持虚拟化场景可以使用 Xen-PV - Paravirtualization
  * 不支持场景会使用 Xen-HVM - Hardware Virtual Machine - 使用 QEMU 虚拟硬件
  * dom0 上运行 domU
  * 有管理能力 - 类似于 KVM+Libvirt 或 KVM+其他管理软件
* OpenVZ
  * 基于容器 - 共享内核
  * 一般无法使用 docker、nftables、wg 等 - 需要 host 额外支持 - OpenVZ 7

---

* Red Hat 收购了 Qumranet, KVM 创始公司
* Xen 后的商业公司
  * Citrix
  * Oracle
  * AWS 是 XEN 但在向 KVM 迁移
* KVM 后的商业公司
  * IBM
  * Red Hat

* 参考
  * [Why is the market moving away from xen to kvm?](https://www.reddit.com/r/sysadmin/comments/7cjpe8)
  * [OpenVZ vs KVM vs Xen](https://www.booleanworld.com/openvz-vs-kvm-vs-xen-virtualization-technologies-explained/)
