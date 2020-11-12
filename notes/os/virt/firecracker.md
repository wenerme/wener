---
title: Firecracker
---

# Firecracker

- 是什么
  - VMM/Virtual Machine Manager
  - 最小虚拟机实现 - 最初用于 serverless 场景
    - 仅支持必须设备 virtio-net, virtio-block, virtio-vsock, serial console, minimal keyboard controller
    - < 125 ms 启动
    - < 5m 初始内存占用
  - 基于 KVM 的 QEMU 替代品
  - Rust 实现
  - 提供 REST 控制接口
  - Kernel 4.14+
- 参考
  - https://github.com/firecracker-microvm/firecracker/tree/master/docs
  - [firecracker-microvm/firecracker-containerd](https://github.com/firecracker-microvm/firecracker-containerd)
    - 实现通过 containerd 管理 microVM
  - [firecracker-microvm/firectl](https://github.com/firecracker-microvm/firectl) - 辅助运行 firecracker
  - [weaveworks/ignite](https://github.com/weaveworks/ignite) - 类似 Docker 管理容器一样管理 microVM
  - qemu [docs/microvm](https://github.com/qemu/qemu/blob/master/docs/microvm.rst) - QEMU 支持 microvm
- 问题
  - [#1571](https://github.com/firecracker-microvm/firecracker/issues/1571) - virtio memory balloon

:::info Firecracker 限制

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

# vm 内清除缓存 firecracker 也不会收回内存，因为不支持 balloon
echo 3 > /proc/sys/vm/drop_caches

# 类似 qemu - 但 qemu 更容易添加网络且支持 vnc
# firecracker 默认会添加 root=/dev/vda
# 启动后约 130 MB 额外内存占用 - firecracker 约 70 MB
# pci=off qemu 无法启动
qemu-system-x86_64 \
  -smp 1 -m 1024 -cpu host \
  -M pc,accel=kvm \
  -no-acpi \
  -device virtio-rng-pci -device virtio-balloon -serial stdio \
  -kernel vmlinux-virt \
  -initrd initramfs-virt \
  -append "console=ttyS0 reboot=k panic=1 modules=virtio_mmio,virtio_blk,ext4 rootfstype=ext4 root=/dev/vda" \
  -drive file=alpine.rootfs.ext4,if=virtio,cache=writeback
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

# 接口

- [api_server/swagger/firecracker.yaml](https://github.com/firecracker-microvm/firecracker/blob/master/src/api_server/swagger/firecracker.yaml)
- /actions
  - `{"action_type":""}`
  - FlushMetrics,InstanceStart,SendCtrlAltDel
- /boot-source - 仅启动前
- /drives/{drive_id} - 仅启动前
- /logger
- /machine-config
- /metrics
- /mmds - Microvm Metadata Service
- /mmds/config - 配置 MMDS - 仅启动前
- /network-interfaces/{iface_id} - 仅启动前
- /snapshot/create - 创建为暂停状态的虚拟机创建快照
- /snapshot/load - 加载快照 - 新启动的 Firecracker
- /vm - 虚拟机状态管理
  - `{"state":""}`
  - Paused, Resumed
- /vsock - vsock 设备管理

```yaml
boot-source:
  initrd_path: initrd.img
  kernel_image_path: vmlinux
  boot_args: console=ttyS0 reboot=k panic=1 pci=off modules=virtio_mmio,ext4 rootfstype=ext4
drives:
  - drive_id: rootfs
    path_on_host: centos.rootfs.ext4
    is_root_device: true
    is_read_only: false
    # 可选 - is_root_device 时的启动分区 UUID
    partuuid: 00000000-0000-0000-0000-000000000000
    # 可选 - 访问速率限制
    rate_limiter:
      bandwidth: # 带宽
        one_time_burst: 0
        refill_time: 0
        size: 0
      ops: # 操作
# 日志配置
logger:
  log_path: '' # 必须
  # Error, Warning, Info, Debug
  level: Warning
  show_level: false
  show_log_origin: false
# 机器配置
machine-config:
  # 1-32 - 1 或 1-32 之间偶数
  vcpu_count: 1
  mem_size_mib: 1024
  # Hyperthreading
  ht_enabled: false
  # C3, C2
  # cpu_template: C3
  # 启用后可对内存创建增量快照
  # track_dirty_pages: false

metrics:
  # 存储 JSON 格式 metric 的路径
  metrics_path: ''

network-interfaces:
  - allow_mmds_requests: false # 启用后会响应 HTTP GET 请求 MMDS
    guest_mac: ''
    host_dev_name: ''
    iface_id: ''
    rx_rate_limiter: ''
    tx_rate_limiter: ''

vsock:
  guest_cid: 3
  # UNIX domain socket
  uds_path: ''
  vsock_id: ''
```

## 网络

```bash
# 假设需要桥接的 virbr0 已经存在
ip tuntap add dev fc0 mode tap
ip li set fc0 master virbr0
ip li set fc0 up


sudo ip link add name br0 type bridge
sudo ip addr add 172.20.0.1/24 dev br0
sudo ip link set dev br0 up
sudo sysctl -w net.ipv4.ip_forward=1
sudo iptables --table nat --append POSTROUTING --out-interface enp3s0 -j MASQUERADE
sudo iptables --insert FORWARD --in-interface br0 -j ACCEPT
```

```json
{
  "network-interfaces": [
    {
      "iface_id": "if0",
      "host_dev_name": "fc0"
    }
  ]
}
```

# FAQ

## mount: mounting /dev/vda on /sysroot failed: No such device

- 可能不支持 ext4
- cat /proc/filesystem
