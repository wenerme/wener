---
title: CentOS
---

# CentOS

- 下载
  - [cloud.centos.org/centos](https://cloud.centos.org/centos)
- kernel-core - 安装后 70MB
  - 包含内核，依赖 linux-firmware
    - linux-firmware 安装后 350MB

:::caution

- 2020-12-08 宣布项目于 2021 年底停止 - 最后版本 8.4.2105, 7.9-2009
- 后继 OS
  - RockyLinux - 由 CentOS 创建者维护 - 由 AWS 和 Google 赞助
  - AlmaLinux - 由 CloudLinux 维护

:::

```bash
yum module list virt
```

## rootfs

```bash
# rootfs - 这个 rootfs 是用于 docker 的
curl -LOC- https://github.com/CentOS/sig-cloud-instance-images/raw/CentOS-8-x86_64/docker/centos-8-x86_64.tar.xz

qemu-img create -f raw centos.rootfs.ext4 1G
mkfs.ext4 centos.rootfs.ext4
mkdir -p /tmp/rootfs
sudo mount centos.rootfs.ext4 /tmp/rootfs
sudo tar xvf centos-8-x86_64.tar.xz -C /tmp/rootfs/
sudo cp /etc/resolv.conf /tmp/rootfs/etc/resolv.conf
sudo chroot /tmp/rootfs /bin/bash

yum update -y

# 获取到 kernel
yum install -y yum-utils
rpm -Uvh --nodeps $(repoquery --location kernel-core)

exit

```

## install

- [Boot options](https://docs.centos.org/en-US/8-docs/advanced-install/assembly_kickstart-and-advanced-boot-options/)
- minimal 安装完 1.7 G
- 默认 lvm

```bash
curl -OC- http://mirrors.aliyun.com/centos/8.2.2004/isos/x86_64/CentOS-8.2.2004-x86_64-minimal.iso
qemu-img create -f qcow2 centos.qcow2 10G

qemu-system-x86_64 -accel kvm -m 4G -smp 2 -net nic -nic user,hostfwd=tcp::2222-:22 -drive file=centos.qcow2,if=virtio -serial stdio -vnc :10
```

## kernel

- https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html-single/managing_monitoring_and_updating_the_kernel/index
