---
title: Libvirt 网络
---

# Libvirt 网络
* [Networking](https://wiki.libvirt.org/page/Networking)

## NAT
* 默认网络
* 简单易用
* 无法直接访问，多一层 NAT 转换

```bash
# 如果没有可以配置
virsh net-define /usr/share/libvirt/networks/default.xml
virsh net-autostart default
virsh net-start default
```

## 桥接

### 系统创建桥接
* [net.bridge.bridge-nf-call](https://wiki.libvirt.org/page/Net.bridge.bridge-nf-call_and_sysctl.conf)

```
auto eth0
iface eth0 inet manual

auto vmbr0
iface vmbr0 inet dhcp
        bridge-ports eth0
        bridge-stp on
        post-up iptables -I FORWARD -m physdev --physdev-is-bridged -j ACCEPT
        pre-down iptables -D FORWARD -m physdev --physdev-is-bridged -j ACCEPT
```

```bash
echo br_netfilter >> /etc/modules-load.d/kvm.conf
modprobe br_netfilter

cat <<CONF >> /etc/sysctl.d/kvm.conf
net.bridge.bridge-nf-call-ip6tables = 0
net.bridge.bridge-nf-call-iptables = 0
net.bridge.bridge-nf-call-arptables = 0
CONF
sysctl -p /etc/sysctl.d/kvm.conf
```

### Libvirt 定义桥接

```xml
<network>
  <name>br10</name>
  <forward mode='nat'>
    <nat>
      <port start='1024' end='65535'/>
    </nat>
  </forward>
  <bridge name='br10' stp='on' delay='0'/>
  <ip address='192.168.30.1' netmask='255.255.255.0'>
    <dhcp>
      <range start='192.168.30.50' end='192.168.30.200'/>
    </dhcp>
  </ip>
</network>
```

### 使用桥接

```xml
<interface type='bridge'>
  <source bridge='vmbr0'/>
  <mac address='00:16:3e:1a:b3:4a'/>
  <model type='virtio'/>
</interface>
```

### QEMU 桥接

```bash
# /etc/qemu/bridge.conf root:qemu 0640
echo allow vmbr0 >> /etc/qemu/bridge.conf

# /usr/lib/qemu/qemu-bridge-helper
# qemu linux.img -netdev bridge,id=hn0 -device virtio-net-pci,netdev=hn0,id=nic1
# qemu linux.img -netdev tap,helper=/usr/local/libexec/qemu-bridge-helper,id=hn0 -device virtio-net-pci,netdev=hn0,id=nic1

qemu-system-x86_64 -accel kvm -m 4G -smp 2 base.qcow2  -vnc :1 -serial stdio \
  -device virtio-net-pci,netdev=n1 -netdev tap,id=n1,"helper=/usr/lib/qemu/qemu-bridge-helper"

# -netdev bridge,br=vmbr0,id=n1 -device virtio-net,netdev=n
```

## 透传
* 直接访问设备

```xml
<devices>
  <interface type='hostdev' managed='yes'>
    <source>
      <address type='pci' domain='0x0' bus='0x00' slot='0x07' function='0x0'/>
    </source>
    <mac address='52:54:00:6d:90:02'>
    <virtualport type='802.1Qbh'>
      <parameters profileid='finance'/>
    </virtualport>
  </interface>
</devices>
```
