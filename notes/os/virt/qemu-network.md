---
title: QEMU Networking
tags:
  - Virtualization
  - QEMU
  - Network
  - Bridge
  - TAP
---

# QEMU Networking {#qemu-networking}

- [Networking Documentation - QEMU Wiki](https://wiki.qemu.org/Documentation/Networking)
- [MacVTap - Kernel Newbies](https://virt.kernelnewbies.org/MacVTap)

```bash
qemu-system-x86_64 -nic model=help
qemu-system-x86_64 -netdev ?
```

## User Networking (SLIRP)

Default, easiest, no root required. Slower.

```bash
# Forward host 8080 to guest 80
-netdev user,id=mynet0,hostfwd=tcp::8080-:80 -device e1000,netdev=mynet0
```

## TAP Networking

Requires root/capabilities. High performance.

```bash
# Basic TAP
-netdev tap,id=net0,script=no,downscript=no,ifname=tap0 \
  -device virtio-net-pci,netdev=net0,mac=52:54:00:12:34:56
```

### Setup TAP/Bridge

```bash
modprobe tun tap
ip link add br0 type bridge
ip tuntap add dev tap0 mode tap
ip link set dev tap0 master br0
ip link set dev eth0 master br0
ip link set dev br0 up
```

## MacVTap

Combines tun/tap and bridge.

```bash
sudo ip link add link eth1 name macvtap0 type macvtap mode bridge
sudo ip link set macvtap0 address 1a:46:0b:ca:bc:7b up
sudo ip link show macvtap0

# Launch QEMU with MacVTap (using file descriptors)
# Requires getting tap fd index
-netdev tap,id=net0,script=no,downscript=no,ifname=tap$(< /sys/class/net/macvtap0/ifindex) \
  -device virtio-net-pci,netdev=net0,mac=$(< /sys/class/net/macvtap0/address)
```

## Bridge Helper

```bash
# Allow bridge
echo 'allow virbr0' >> /etc/qemu/bridge.conf

-netdev bridge,id=net0,br=virbr0 -device virtio-net,netdev=net0
```

## VDE (Virtual Distributed Ethernet)

- [VDE on SourceForge](http://vde.sourceforge.net/)

```bash
vde_switch -tap tap0 -daemon -mod 660 -group users
ip link set tap0 up
```

## Tuning

```bash
# Enable IP Forwarding
sysctl net.ipv4.ip_forward=1
sysctl net.ipv4.conf.all.proxy_arp=1
```
