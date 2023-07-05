---
id: interfaces
---

# interfaces

## Tips

- debian [interfaces.5](https://manpages.debian.org/stretch/ifupdown/interfaces.5.en.html)
- /etc/network/interfaces
  - 网络接口配置
  - 通过 [ifupdown](https://git.busybox.net/busybox/tree/networking/ifupdown.c) 操作 - busybox 有提供
    - `/var/run/ifstate` 记录状态 - 有可能在 `/etc/network/run/ifstate`
    - inet - manual wvdial ppp static bootp dhcp loopback
    - inet6 - static manual loopback v4tunnel
  - 根据提供 ifupdown 的包不同，功能可能不同
  - 命令可通过其他包扩展
  - 执行阶段 pre-up up/post-up down/pre-down post-down
- 参考
  - [Obtain IP from DHCP sever but set DNS servers statically on Debian](https://unix.stackexchange.com/questions/346967)
  - [/etc/network/\*](https://pkgs.alpinelinux.org/contents?file=&path=%2Fetc%2Fnetwork%2F*&name=&branch=edge&arch=x86_64)
    - interfaces 指令处理脚本
    - static-routing tunnel bonding vlan vde2 bridge openvswitch fwsnort sqm-scripts
  - [Good detailed explanation of /etc/network/interfaces syntax?](https://unix.stackexchange.com/questions/128439)
- network-extras
- class
  - auto
  - allow-hotplug


:::caution

* ifupdown 不同 interfaces 会有些微的不同
* interfaces 本质是将执行的脚本以配置化的方式呈现
  * imperative -> declartive

:::

| var       | desc                                                           |
| --------- | -------------------------------------------------------------- |
| IFACE     | 名字 或 `--all`                                                |
| LOGICAL   | 逻辑名 或 `auto`                                               |
| ADDRFAM   | 地址类型 或 `meta`                                             |
| METHOD    | 配置方式 或 `none`                                             |
| CLASS     | 接口类型 `--allow` 的值，使用 `--all` 时为 `auto`              |
| MODE      | `start`,`stop`                                                 |
| PHASE     | pre-up, post-up, pre-down, post-down                           |
| VERBOSITY | `--verbose` 值， 1 或 0                                        |
| PATH      | `/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin` |

```bash
apk add bonding tunnel static-routing vlan bridge vde2 fwsnort
```

```bash
# 检查 table 是否存
ip ro li tab mytab 2>/dev/null || echo NO

install -Dv /dev/null /etc/udhcpc/udhcpc.conf
echo IF_PEER_DNS=no >> /etc/udhcpc/udhcpc.conf
# 不要修改 resolve.conf
echo RESOLV_CONF=no >> /etc/udhcpc/udhcpc.conf
```

```bash
# 修改名字
rename foo=bar

# [VARIABLE]/VALUE[/[OPTIONS]][=LOGICAL]
auto /eth*=eth
iface eth inet dhcp

auto eth0 eth1

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
auto br0
iface br0 inet dhcp
  # 有该配置说明是桥接
  # 特殊值 none all
  bridge-ports vnet0 vnet1
  # 等待端口
  # bridge-waitport 0
  # bridge-ageing 0
  # bridge-bridgeprio 0
  # forward delay - 默认 30s
  # bridge-fd 30
  # bridge-gcint 0
  # bridge-hello 0
  # bridge-maxage 0
  # bridge-pathcost 0
  # 0-65535
  # bridge-portprio 0
  # 是否开启 STP - 如果不是唯一的 bridge 则需要打开
  # bridge-stp on
```

```bash
# 当前的 mac 信息
bridge fdb
```

# Methods
## inet
### static

```ini
# Address (dotted quad/netmask) required
address address
# Netmask (dotted quad or number of bits) deprecated
netmask mask
# Broadcast address (dotted quad, + or -) deprecated. Default value: "+"
broadcast broadcast_address
# Routing metric for default gateway (integer)
metric metric
# Default gateway (dotted quad)
gateway address
# Address of other end point (dotted quad). Note the spelling of "point-to".
pointopoint address
# Link local address or "random".
hwaddress address
# MTU size
mtu size
# Address validity scope. Possible values: global, link, host
scope
```

### manual

```ini
# Link local address or "random".
hwaddress address
# MTU size
mtu size
```

### dhcp
```ini
# Hostname to be requested (pump, dhcpcd, udhcpc)
hostname hostname
# Metric for added routes (dhclient)
metric metric
# Preferred lease time in hours (pump)
leasehours leasehours
# Preferred lease time in seconds (dhcpcd)
leasetime leasetime
# Vendor class identifier (dhcpcd)
vendor vendor
# Client identifier (dhcpcd)
client client
# Hardware address.
hwaddress address
```

### bootp
```ini
# Tell the server to use file as the bootfile.
bootfile file
# Use the IP address address to communicate with the server.
server address
# Use addr as the hardware address instead of whatever it really is.
hwaddr addr
```

### tunnel
* This method is used to create GRE or IPIP tunnels. You need to have the ip binary from the iproute package. For GRE tunnels, you will need to load the ip_gre module and the ipip module for IPIP tunnels.

```ini
# Local address (dotted quad) required
address address
# Tunnel type (either GRE or IPIP) required
mode type
# Address of other tunnel endpoint required
endpoint address
# Remote address (remote address inside tunnel)
dstaddr address
# Address of the local endpoint
local address
# Routing metric for default gateway (integer)
metric metric
# Default gateway
gateway address
# TTL setting
ttl time
# MTU size
mtu size
```

### ppp
This method uses pon/poff to configure a PPP interface

```ini
# Use name as the provider (from /etc/ppp/peers).
provider name
# Use number as the ppp unit number.
unit number
# Pass string as additional options to pon.
options string
```

### wvdial
This method uses wvdial to configure a PPP interface. See that command for more details.

```ini
# Use name as the provider (from /etc/wvdial.conf).
provider name
```


### ipv4ll

This method uses avahi-autoipd to configure an interface with an IPv4 Link-Layer address (169.254.0.0/16 family). This method is also known as APIPA or IPAC, and often colloquially referred to as "Zeroconf address".

## ipx
### static
This method may be used to setup an IPX interface. It requires the ipx_interface command.
Options

```ini
# type of Ethernet frames to use (e.g. 802.2)
frame type
# Network number
netnum id
```
### dynamic

```ini
# type of Ethernet frames to use (e.g. 802.2)
frame type
```

## inet6
### auto

This method may be used to define interfaces with automatically assigned IPv6 addresses. Using this method on its own doesn't mean that RDNSS options will be applied, too. To make this happen, rdnssd daemon must be installed, properly configured and running. If stateless DHCPv6 support is turned on, then additional network configuration parameters such as DNS and NTP servers will be retrieved from a DHCP server. Please note that on ifdown, the lease is not currently released (a known bug).

```ini
# Privacy extensions (RFC4941) (0=off, 1=assign, 2=prefer)
privext int
# Accept router advertisements (0=off, 1=on, 2=on+forwarding). Default value: "2"
accept_ra int
# Use stateless DHCPv6 (0=off, 1=on)
dhcp int
# Request a prefix through DHCPv6 Prefix Delegation (0=off, 1=on). Default value: "0"
request_prefix int
# Number of attempts to wait for a link-local address. Default value: "60"
ll-attempts
# Link-local address polling interval in seconds. Default value: "0.1"
ll-interval
```

### loopback

### static

```ini
# Address (colon delimited/netmask) required
address address
# Netmask (number of bits, eg 64) deprecated
netmask mask
# Routing metric for default gateway (integer)
metric metric
# Default gateway (colon delimited)
gateway address
# Medium type, driver dependent
media type
# Hardware address or "random"
hwaddress address
# MTU size
mtu size
# Accept router advertisements (0=off, 1=on, 2=on+forwarding)
accept_ra int
# Perform stateless autoconfiguration (0=off, 1=on). Default value: "0"
autoconf int
# Privacy extensions (RFC3041) (0=off, 1=assign, 2=prefer)
privext int
# Address validity scope. Possible values: global, site, link, host
scope
# Time that address remains preferred
preferred-lifetime int
# Number of attempts to settle DAD (0 to disable DAD). Default value: "60"
dad-attempts
# DAD state polling interval in seconds. Default value: "0.1"
dad-interval
```

### manual

```ini
# Hardware address or "random"
hwaddress address
# MTU size
mtu size
```

### dhcp

```ini
# Hardware address or "random"
hwaddress address
# Accept router advertisements (0=off, 1=on, 2=on+forwarding). Default value: "1"
accept_ra int
# Perform stateless autoconfiguration (0=off, 1=on)
autoconf int
# Request a prefix through DHCPv6 Prefix Delegation (0=off, 1=on). Default value: "0"
request_prefix int
# Number of attempts to wait for a link-local address. Default value: "60"
ll-attempts
# Link-local address polling interval in seconds. Default value: "0.1"
ll-interval
```

### v4tunnel
IPv6-over-IPv4 tunnel. It requires the ip command from the iproute package.

```ini
# Address (colon delimited/netmask) required
address address
# Netmask (number of bits, eg 64) deprecated
netmask mask
# Address of other tunnel endpoint (IPv4 dotted quad) required
endpoint address
# Address of the local endpoint (IPv4 dotted quad)
local address
# Routing metric for default gateway (integer)
metric metric
# Default gateway (colon delimited)
gateway address
# TTL setting
ttl time
# MTU size
mtu size
# Time that address remains preferred
preferred-lifetime int
```

### 6to4

This method may be used to setup an 6to4 tunnel. It requires the ip command from the iproute package.

```ini
# Address of the local endpoint (IPv4 dotted quad) required
local address
# Routing metric for default gateway (integer)
metric metric
# TTL setting
ttl time
# MTU size
mtu size
# Time that address remains preferred
preferred-lifetime int
```

### can
This method may be used to setup an Controller Area Network (CAN) interface. It requires the the ip command from the iproute

```ini
# bitrate (1..1000000) required
bitrate bitrate
# sample point (0.000..0.999)
samplepoint samplepoint
# loop back CAN Messages (on|off)
loopback loopback
# listen only mode (on|off)
listenonly listenonly
# activate triple sampling (on|off)
triple triple
# one shot mode (on|off)
oneshot oneshot
# activate berr reporting (on|off)
berr berr
```

## FAQ

### 多网口

- 如果多网口，则不要使用相同网段
- 如果要使用相同网段则配置多个路由表
- Linux 默认会响应所有本地 IP - 即便对应网口未配置

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

- macvlan
  - 可以认为是主网卡的子网口 - 例如 eth0.0
- macvtap
  - 是类似于 macvlan 的 tap 虚拟网络设备
  - 主要用于 libvirt/KVM
  - 实现在不需要桥接的情况下直接与底层设备交互实现类似桥接的效果

```bash
# macvtap
ip link add link eth2 macvtap2 address 00:22:33:44:55:66 type macvtap mode bridge
ip link set macvtap2 up
ip link show macvtap2

```

- [notes on macvlan/macvtap](https://backreference.org/2014/03/20/some-notes-on-macvlanmacvtap/)

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

## 配置命令映射

```
auto eth0
iface eth0 inet dhcp
  hostname my-host
```

```bash
ip li set eth0
udhcpc -i eth0 -h my-host
```

---

```
auto bond0
iface bond0 inet dhcp
  bond-member eth0
```

```bash
ip li add bond0 type bond
ifenslave bond0 eth0
ip li set eth0 up
ip li set bond0 up
udhcpc -i bond0
```

## multi interface

```sh
auto eth0
iface eth0 inet static
	address 192.168.1.11
	netmask 255.255.255.0
  pre-up ip ro li tab e0 &>/dev/null || echo '10 e0' >> /etc/iproute2/rt_tables
  post-up ip ro add 192.168.1.0/24 dev eth0 src 192.168.1.11 table e0
  post-up ip ro add default via 192.168.1.1 dev eth0 table e0
  post-up ip ru add from 192.168.1.11/32 table e0
  post-up ip ru add to 192.168.1.11/32 table e0
```
