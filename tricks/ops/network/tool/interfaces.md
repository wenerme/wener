# interfaces
## Tips
* [interfaces.5](https://manpages.debian.org/stretch/ifupdown/interfaces.5.en.html)
* /etc/network/interfaces
  * 网络接口配置
  * 通过 [ifupdown](https://git.busybox.net/busybox/tree/networking/ifupdown.c) 操作 - busybox 有提供
    * `/var/run/ifstate` 记录状态 - 有可能在 `/etc/network/run/ifstate`
  * 根据提供 ifupdown 的包不同，功能可能不同
  * 命令可通过其他包扩展
  * 执行阶段 pre-up up/post-up down/pre-down post-down
* 参考
  * [Obtain IP from DHCP sever but set DNS servers statically on Debian](https://unix.stackexchange.com/questions/346967)
  * [/etc/network/*](https://pkgs.alpinelinux.org/contents?file=&path=%2Fetc%2Fnetwork%2F*&name=&branch=edge&arch=x86_64)
    * interfaces 指令处理脚本
  * [Good detailed explanation of /etc/network/interfaces syntax?](https://unix.stackexchange.com/questions/128439)
* network-extras

IFACE
The physical name of the interface being processed, or "--all" (see below).
LOGICAL
The logical name of the interface being processed, or "auto" (see below).
ADDRFAM
The address family of the interface, or "meta" (see below).
METHOD
The method of the interface (e.g., static), or "none" (see below).
CLASS
The class of interfaces being processed. This is a copy of the value given to the --allow option when running ifup or ifdown, otherwise it is set to "auto" when the --all option is used.
MODE
start if run from ifup, stop if run from ifdown.
PHASE
As per MODE, but with finer granularity, distinguishing the pre-up, post-up, pre-down and post-down phases.
VERBOSITY
Indicates whether --verbose was used; set to 1 if so, 0 if not.
PATH
The command search path: /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin


```bash
# 检查 table 是否存
ip ro li tab mytab 2>/dev/null || echo NO

install -Dv /dev/null /etc/udhcpc/udhcpc.conf
echo IF_PEER_DNS=no >> /etc/udhcpc/udhcpc.conf
```


```bash
# 多接口
# ===================
# https://www.thomas-krenn.com/en/wiki/Two_Default_Gateways_on_One_System
# echo '1 tgbe' | tee -a /etc/iprpite2/rt_tables

# 适用于多子网
# ip route add 10.10.0.0/24 如果子网已经存在则会失败
iface eth2 inet static
    address 10.10.0.10
    netmask 255.255.255.0
    post-up ip route add 10.10.0.0/24 dev eth1 src 10.10.0.10 table tgbe
    post-up ip route add default via 10.10.0.1 dev eth1 table tgbe
    post-up ip rule add from 10.10.0.10/32 table tgbe
    post-up ip rule add to 10.10.0.10/32 table tgbe

# 使用相同接口返回 - 适用于默认网关已经存在但想要通过 IP 使用网口时
# 使用这个 IP 则会通过这个接口
iface eth2 inet static
    address 10.10.0.10
    netmask 255.255.255.0
    # 自动添加 table
    # pre-up ip ro li tab tgbe &>/dev/null || echo '10 tgbe' >> /etc/iproute2/rt_tables
    post-up ip rule add from 10.10.0.10 table tgbe
    post-up ip ro add default via 10.10.0.1 dev eth2 table tgbe

# wireguard
# ===================
# 依赖 wireguard-vanilla/wireguard-virt wireguard-tools-wg
auto wg0
iface wg0 inet static
    address 10.10.0.1
    netmask 255.255.255.0
    pre-up ip link add dev wg0 type wireguard
    pre-up ip link set dev wg0 mtu 1450
    pre-up wg setconf wg0 /etc/network/wg0.conf
    post-down ip link delete dev wg0

# bonding
# ===================
# Slaves
auto eth0
iface eth0 inet manual
    bond-master bond0
    bond-primary eth0
    bond-mode active-backup

auto wlan0
iface wlan0 inet manual
    wpa-conf /etc/network/wpa.conf
    bond-master bond0
    bond-primary eth0
    bond-mode active-backup

# Master
auto bond0
iface bond0 inet dhcp
    bond-slaves none
    bond-primary eth0
    bond-mode active-backup
    bond-miimon 100

# bridge
# ===================

```

## FAQ
### 多网口
* 如果多网口，则不要使用相同网段
* 如果要使用相同网段则配置多个路由表
* Linux 默认会响应所有本地 IP - 即便对应网口未配置

```ini
# 调整 arp 配置
net.ipv4.conf.all.arp_announce = 2
net.ipv4.conf.all.arp_ignore = 1
net.ipv4.conf.default.accept_source_route = 0
net.ipv4.conf.default.arp_announce = 2
net.ipv4.conf.default.arp_ignore = 1
net.ipv4.conf.default.rp_filter = 1
net.ipv4.conf.eth0.arp_announce = 2
net.ipv4.conf.eth0.arp_ignore = 1
net.ipv4.conf.eth1.arp_announce = 2
net.ipv4.conf.eth1.arp_ignore = 1
```

### macvtap vs macvlan
* macvlan
  * 可以认为是主网卡的子网口 - 例如 eth0.0
* macvtap
  * 是类似于 macvlan 的 tap 虚拟网络设备
  * 主要用于 libvirt/KVM
  * 实现在不需要桥接的情况下直接与底层设备交互实现类似桥接的效果

```bash
# macvtap
ip link add link eth2 macvtap2 address 00:22:33:44:55:66 type macvtap mode bridge
ip link set macvtap2 up
ip link show macvtap2

```

* [notes on macvlan/macvtap](https://backreference.org/2014/03/20/some-notes-on-macvlanmacvtap/)

## 多口

```
# 从 eth4 10gbe 192.168.1.101 来的就从 10gbe 出
auto eth4
iface eth4 inet static
  address 192.168.1.101
  netmask 255.255.252.0
  mtu 9000
  pre-up ip ro li tab tgbe &>/dev/null || echo '10 tgbe' >> /etc/iproute2/rt_tables
  post-up ip ru add from 192.168.1.101 table tgbe
  post-up ip ro add default via 192.168.1.1 dev eth4 table tgbe
```
