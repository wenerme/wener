---
title: Firecracker
---
# Firecracker
* 是什么
  * VMM/Virtual Machine Manager
  * 最小虚拟机实现 - 最初用于 serverless 场景
    * 仅支持必须设备 virtio-net, virtio-block, virtio-vsock, serial console, minimal keyboard controller
    * < 125 ms 启动
    * < 5m 初始内存占用
  * 基于 KVM 的 QEMU 替代品
  * Rust 实现
  * 提供 REST 控制接口
  * Kernel 4.14+
* https://github.com/firecracker-microvm/firecracker/blob/master/docs/api_requests/actions.md
* https://github.com/firecracker-microvm/firecracker/tree/master/docs
* [firecracker-microvm/firectl](https://github.com/firecracker-microvm/firectl)

:::note

- 没有电源管理，因此不支持重启，会直接退出
- alpine 内核需要 boot-source.initrd_path => initramfs-virt
- alpine netboot 的 initramfs-virt 没有 ext4
- 系统内 poweroff 或 halt 不会退出 - reboot 会
- 可以发送 SendCtrlAltDel 退出
- 不支持 QCOW2 格式，可以考虑配合 NDB 使用

:::

## alpine

```bash
# download
latest=$(basename $(curl -fsSLI -o /dev/null -w  %{url_effective} https://github.com/firecracker-microvm/firecracker/releases/latest))
curl -LOJ https://github.com/firecracker-microvm/firecracker/releases/download/${latest}/firecracker-${latest}-$(uname -m)
mv firecracker-${latest}-$(uname -m) firecracker
chmod +x firecracker

# rootfs
# =========
# qemu-img create -f raw alpine.rootfs.ext4 1G
fallocate -l 1G ubuntu.rootfs.ext4
mkfs.ext4 ./alpine.rootfs.ext4
mkdir /tmp/rootfs
sudo mount alpine.rootfs.ext4 /tmp/rootfs

curl -OJ https://mirrors.aliyun.com/alpine/v3.12/releases/x86_64/alpine-minirootfs-3.12.0-x86_64.tar.gz
sudo tar zxvf alpine-minirootfs-3.12.0-x86_64.tar.gz -C /tmp/rootfs/
# for mirror
sudo cp /etc/apk/repositories /tmp/rootfs/etc/apk/repositories
sudo cp /etc/resolv.conf /tmp/rootfs/etc
sudo chroot /tmp/rootfs/ /bin/sh

apk add alpine-base util-linux linux-virt haveged
rc-update add haveged
echo root:root | chpasswd
for svc in devfs procfs sysfs; do ln -fs /etc/init.d/$svc /etc/runlevels/boot; done
exit

ln -s agetty /etc/init.d/agetty.ttyS0
echo ttyS0 > /etc/securetty
rc-update add agetty.ttyS0 default

# this initramfs contain required ext4 module
sudo cp /tmp/rootfs/boot/initramfs-virt initramfs-virt
sudo cp /tmp/rootfs/boot/vmlinuz-virt vmlinuz-virt

sudo umount /tmp/rootfs

# kernel
# ==========
curl -LOC- https://raw.githubusercontent.com/torvalds/linux/master/scripts/extract-vmlinux
chmod +x extract-vmlinux
./extract-vmlinux $PWD/vmlinuz-virt > vmlinux-virt

# config & start
# ==========
cat <<CONF > alpine.json
{
  "boot-source": {
    "initrd_path": "initramfs-virt",
    "kernel_image_path": "vmlinux-virt",
    "boot_args": "console=ttyS0 reboot=k panic=1 pci=off modules=virtio_mmio,ext4 rootfstype=ext4"
  },
  "drives": [
    {
      "drive_id": "rootfs",
      "path_on_host": "alpine.rootfs.ext4",
      "is_root_device": true,
      "is_read_only": false
    }
  ],
  "machine-config": {
    "vcpu_count": 1,
    "mem_size_mib": 1024,
    "ht_enabled": false
  }
}
CONF

./firecracker --api-sock /tmp/firecracker.socket --config-file alpine.json

# exit
# ==========
# api request
curl --unix-socket /tmp/firecracker.socket -i \
    -X PUT "http://localhost/actions" \
    -H  "accept: application/json" \
    -H  "Content-Type: application/json" \
    -d '{"action_type": "SendCtrlAltDel"}'
# in vm
reboot

# 检测 KVM 支持
[ -r /dev/kvm ] && [ -w /dev/kvm ] && echo "OK" || echo "FAIL"
```


## ubuntu

```bash
curl -LO http://cdimage.ubuntu.com/ubuntu-base/releases/20.04/release/ubuntu-base-20.04.1-base-amd64.tar.gz

fallocate -l 1G ubuntu.rootfs.ext4
sudo mkfs.ext4 ubuntu.rootfs.ext4

mkdir /tmp/rootfs
sudo mount ubuntu.rootfs.ext4 /tmp/rootfs
sudo tar -xzvf ubuntu-base-20.04.1-base-amd64.tar.gz -C /tmp/rootfs
sudo cp /etc/resolv.conf /tmp/rootfs/etc/
sudo chroot /tmp/rootfs/ /bin/bash

apt update
apt install linux-image-kvm -y
apt install init -y
update-initramfs -u
echo root:root | chpasswd
echo ttyS0 > /etc/securetty
systemctl enable serial-getty@ttyS0.service

exit

sudo cp /tmp/rootfs/boot/initrd.img .
sudo cp /tmp/rootfs/boot/vmlinuz .

sudo umount /tmp/rootfs

sudo chown $USER vmlinuz
./extract-vmlinux $PWD/vmlinuz > vmlinux

cat <<CONF > ubuntu.json
{
  "boot-source": {
    "initrd_path": "initrd.img",
    "kernel_image_path": "vmlinux",
    "boot_args": "console=ttyS0 reboot=k panic=1 pci=off modules=virtio_mmio,ext4 rootfstype=ext4"
  },
  "drives": [
    {
      "drive_id": "rootfs",
      "path_on_host": "alpine.rootfs.ext4",
      "is_root_device": true,
      "is_read_only": false
    }
  ],
  "machine-config": {
    "vcpu_count": 1,
    "mem_size_mib": 1024,
    "ht_enabled": false
  }
}
CONF

./firecracker --api-sock /tmp/firecracker.socket --config-file ubuntu.json
```


```bash
# https://packages.debian.org/sid/linux-image-amd64
```

## centos
```bash
# https://mirrors.aliyun.com/centos/8/BaseOS/x86_64/os/images/pxeboot/
curl --remote-name-all -OC- https://mirrors.aliyun.com/centos/8/BaseOS/x86_64/os/images/pxeboot/{initrd.img,vmlinuz}

extract-vmlinux ./vmlinuz > vmlinux

cat <<CONF > centos.json
{
  "boot-source": {
    "initrd_path": "initrd.img",
    "kernel_image_path": "vmlinux",
    "boot_args": "console=ttyS0 reboot=k panic=1 pci=off modules=virtio_mmio,ext4 rootfstype=ext4"
  },
  "drives": [
    {
      "drive_id": "rootfs",
      "path_on_host": "centos.rootfs.ext4",
      "is_root_device": true,
      "is_read_only": false
    }
  ],
  "machine-config": {
    "vcpu_count": 1,
    "mem_size_mib": 1024,
    "ht_enabled": false
  }
}
CONF

rm /tmp/firecracker.socket;firecracker --api-sock /tmp/firecracker.socket --config-file centos.json
```

# firectl
## network
https://github.com/firecracker-microvm/firecracker/blob/master/docs/network-setup.md

# FAQ
## mount: mounting /dev/vda on /sysroot failed: No such device
* 可能不支持 ext4
* cat /proc/filesystem
