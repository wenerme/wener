---
title: Dnsmasq FAQ
---

# Dnsmasq FAQ

## dnsmasq: setting capabilities failed: Operation not permitted

- Docker 里遇到
- 用 root 启动

```bash
dnsmasq --user=root
```

## dnsmasq: failed to bind DHCP server socket: Address in use

- 67 端口被占用
- 使用 bind-interfaces

## libvirtd dnsmasq

```bash
/usr/sbin/dnsmasq --conf-file=/var/lib/libvirt/dnsmasq/default.conf --leasefile-ro --dhcp-script=/usr/lib/libvirt/libvirt_leaseshelper
```

```
##WARNING:  THIS IS AN AUTO-GENERATED FILE. CHANGES TO IT ARE LIKELY TO BE
##OVERWRITTEN AND LOST.  Changes to this configuration should be made using:
##    virsh net-edit default
## or other application using the libvirt API.
##
## dnsmasq conf file created by libvirt
strict-order
pid-file=/var/run/libvirt/network/default.pid
except-interface=lo
bind-dynamic
interface=virbr0
dhcp-range=192.168.122.2,192.168.122.254,255.255.255.0
dhcp-no-override
dhcp-authoritative
dhcp-lease-max=253
dhcp-hostsfile=/var/lib/libvirt/dnsmasq/default.hostsfile
addn-hosts=/var/lib/libvirt/dnsmasq/default.addnhosts
```

## dnsmasq as

```ini
auth-server=localhost
auth-zone=localhost,127.0.0.0/24
# 会解析所有的 cluster.internal 结尾域名
# x.cluster.internal
# x.x.cluster.internal
address=/cluster.internal/192.168.1.1
```

## 所有域名 CNAME 为其他域名

```ini
# 所有 example.com 都会 CNAME 为 wener.me
cname=*.example.com,wener.me,180
auth-server=example.com
auth-zone=example.com
```
