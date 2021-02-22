# 虚拟网络

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
* https://wiki.libvirt.org/page/Networking

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
