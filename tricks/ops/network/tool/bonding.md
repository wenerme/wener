---
id: bonding
title: Bonding
---

# Bonding

## Tips


## Link aggregation
* [Link aggregation](https://en.wikipedia.org/wiki/Link_aggregation)
* Linux [bonding](https://wiki.linuxfoundation.org/networking/bonding)
* kernel doc [bonding.txt](https://www.kernel.org/doc/Documentation/networking/bonding.txt)
* http://www.linux-kvm.org/page/HOWTO_BONDING


* [Bonding Modes](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Virtualization/3.3/html/Installation_Guide/Bonding_Modes.html)
* 模式
  * balance-rr - 0 - 轮询负载
    * 唯一单 TCP/IP 流能利用多个网口的模式
    * 代价是碎片化,无序,需要 TCP/IP 拥挤协议控制
    * net.ipv4.tcp_reordering 控制拥挤程度
    * 使用对顺序无要求的协议, 例如 UDP, 基本可以做到线性性能放大
    * 需要交换机配置 etherchannel 或 trunking
  * active-backup - 1 - 主备
    * 保持相同的发送网口
  * balance-xor - 2 - XOR
    * 基于 HASH 算法进行负载均衡
    * 需要交换机配置 etherchannel 或 trunking
  * broadcast - 3 - 广播
    * 所有绑定的网卡都收到相同的数据, 用于特殊需求, 例如两个互相没连接的交换机发送相同的数据
  * 802.3ad - 4 - IEEE 802.3ad
    * 要求交换机支持 IEEE 802.3ad, 网卡带宽理论上可以翻倍
  * balance-tlb - Adaptive transmit load balancing - 5 - 适配器传输负载均衡
    * 输出的数据会通过所有被绑定的网卡输出, 接收则只选择其中一个
  * balance-alb - Adaptive load balancing - 6 - 适配器输入/输出负载模式
    * balance-tlb + receive load balancing (rlb)
    * 在 5 的基础上, 接收数据也实现负载均衡
* balance-rr, active-backup, balance-tlb 和 balance-alb 不需要交换机支持
* balance-alb 和 balance-tlb 不一定所有交换机都能使用
  * 可能会有 arp 问题, 例如有些机器不能相互连接
  * 需要对 miimon, updelay 进行调试
* balance-xor 可能会需要交换机配置
  * You need to set up an interface group (not LACP) on HP and Cisco switches, but apparently it's not necessary on D-Link, Netgear and Fujitsu switches.
* 选项
  * lacp_rate
  * downdelay
* 参考
  * [Achieving 450 MB/s Network File Transfers Using Linux Bonding](http://louwrentius.com/achieving-450-mbs-network-file-transfers-using-linux-bonding.html)
  * [The basics of SMB Multichannel, a feature of Windows Server 2012 and SMB 3.0](https://blogs.technet.microsoft.com/josebda/2012/06/28/the-basics-of-smb-multichannel-a-feature-of-windows-server-2012-and-smb-3-0/)
    * Windows 的 SMB 共享本身支持多通道
    * 协议支持自动发现多网卡, 并且自动利用多网卡进行网络传输
    * 和链路聚合有本质区别
  * [What can you do with a second Ethernet port ?](https://www.linux.com/news/what-can-you-do-second-ethernet-port)
* NOTE
  * 无论如何配置, 单个网络链接都不会超过单个物理链路的速度
  * 802.3ad 需要交换机支持 LACP 组, 性能最好
* Alpine [Bonding](https://wiki.alpinelinux.org/wiki/Bonding)
* ifenslave


```bash
# /etc/network/if-post-down.d/bonding
# /etc/network/if-pre-up.d/bonding
# /etc/network/if-up.d/bonding
apk add bonding
# 手动加载驱动
modprobe bonding
echo bonding | sudo tee -a /etc/modules

# 查看模式
cat /sys/class/net/bond0/bonding/mode
# 查看状态
cat /proc/net/bonding/bond0

ethtool eth0

# jumbo frames
ifconfig bond0 mtu 9000 up

# 添加 slave
ifenslave bond0 eth0 eth1 eth2
# 移除
ifenslave -d bond0 eth1
# 连接
ifenslave -c bond0 eth1
```





## 配置案例
* 需要安装 bonding 才能使用 bond-slaves 这样的指令

### 命令控制

```
auto bond0
iface bond0 inet manual
  down ip link set $IFACE down
  post-down rmmod bonding
  pre-up modprobe bonding mode=4 miimon=200
  up ip link set $IFACE up mtu 9000
  up udevadm trigger

allow-hotplug eth0
iface eth0 inet manual
  up ifenslave bond0 $IFACE
  down ifenslave -d bond0 $IFACE 2> /dev/null

allow-hotplug eth1
iface eth1 inet manual
  up ifenslave bond0 $IFACE
  down ifenslave -d bond0 $IFACE 2> /dev/null
```

### 最简单的配置

```
auto bond0
iface bond0 inet static
	address 192.168.0.2
	netmask 255.255.255.0
	gateway 192.168.0.1
	# specify the ethernet interfaces that should be bonded
	bond-slaves eth0 eth1 eth2 eth3
```

### 四网口聚合
```
allow-hotplug eth0
iface eth0 inet manual

allow-hotplug eth1
iface eth1 inet manual

allow-hotplug eth2
iface eth2 inet manual

allow-hotplug eth3
iface eth3 inet manual

auto bond0
iface bond0 inet static
    address 192.168.1.5
    netmask 255.255.252.0
    gateway 192.168.1.1
    bond-slaves eth0 eth1 eth2 eth3
    bond-mode active-backup
    bond-miimon 100
    bond-downdelay 200
    bond-updelay 200
```

### 无线和有线聚合

```
allow-hotplug wlan0
iface wlan0 inet manual
    wpa-ssid "*censored*"
    wpa-key-mgmt WPA-PSK
    wpa-group TKIP CCMP
    wpa-psk *censored*
    wpa-bridge bond0 # fixes mac address of outgoing packets so that they are consistent
    bond-master bond0
    bond-mode active-backup
    bond-miimon 100 # checks link status every 100 msec
    bond-give-a-chance 10 # when wlan comes up wait up to 10 seconds for it to 

allow-hotplug bond0
iface bond0 inet static
    address 192.168.178.130
    netmask 255.255.255.0
    gateway 192.168.178.1
    bond-slaves eth0 # automatically brings up eth0 and slaves it to this bond
    bond-mode active-backup # uses primary if available, otherwise fallback to other
    bond-primary eth0 # priority to use eth0 when available
    bond-miimon 100
```


## tree /sys/class/net/bond0
* 所有信息

```
/sys/class/net/bond0
├── addr_assign_type
├── addr_len
├── address
├── bonding
│   ├── active_slave
│   ├── ad_actor_key
│   ├── ad_actor_sys_prio
│   ├── ad_actor_system
│   ├── ad_aggregator
│   ├── ad_num_ports
│   ├── ad_partner_key
│   ├── ad_partner_mac
│   ├── ad_select
│   ├── ad_user_port_key
│   ├── all_slaves_active
│   ├── arp_all_targets
│   ├── arp_interval
│   ├── arp_ip_target
│   ├── arp_validate
│   ├── downdelay
│   ├── fail_over_mac
│   ├── lacp_rate
│   ├── lp_interval
│   ├── mii_status
│   ├── miimon
│   ├── min_links
│   ├── mode
│   ├── num_grat_arp
│   ├── num_unsol_na
│   ├── packets_per_slave
│   ├── primary
│   ├── primary_reselect
│   ├── queue_id
│   ├── resend_igmp
│   ├── slaves
│   ├── tlb_dynamic_lb
│   ├── updelay
│   ├── use_carrier
│   └── xmit_hash_policy
├── broadcast
├── carrier
├── carrier_changes
├── dev_id
├── dev_port
├── dormant
├── duplex
├── flags
├── gro_flush_timeout
├── ifalias
├── ifindex
├── iflink
├── link_mode
├── lower_eth1 -> ../../../pci0000:00/0000:00:1c.4/0000:02:00.1/net/eth1
├── lower_eth2 -> ../../../pci0000:00/0000:00:1c.4/0000:02:00.2/net/eth2
├── lower_eth3 -> ../../../pci0000:00/0000:00:1c.4/0000:02:00.3/net/eth3
├── mtu
├── name_assign_type
├── netdev_group
├── operstate
├── phys_port_id
├── phys_port_name
├── phys_switch_id
├── power
│   ├── autosuspend_delay_ms
│   ├── control
│   ├── runtime_active_time
│   ├── runtime_status
│   └── runtime_suspended_time
├── proto_down
├── queues
│   ├── rx-0
│   │   ├── rps_cpus
│   │   └── rps_flow_cnt
│   ├── tx-0
│   │   ├── byte_queue_limits
│   │   │   ├── hold_time
│   │   │   ├── inflight
│   │   │   ├── limit
│   │   │   ├── limit_max
│   │   │   └── limit_min
│   │   ├── tx_maxrate
│   │   ├── tx_timeout
│   │   └── xps_cpus
├── speed
├── statistics
│   ├── collisions
│   ├── multicast
│   ├── rx_bytes
│   ├── rx_compressed
│   ├── rx_crc_errors
│   ├── rx_dropped
│   ├── rx_errors
│   ├── rx_fifo_errors
│   ├── rx_frame_errors
│   ├── rx_length_errors
│   ├── rx_missed_errors
│   ├── rx_nohandler
│   ├── rx_over_errors
│   ├── rx_packets
│   ├── tx_aborted_errors
│   ├── tx_bytes
│   ├── tx_carrier_errors
│   ├── tx_compressed
│   ├── tx_dropped
│   ├── tx_errors
│   ├── tx_fifo_errors
│   ├── tx_heartbeat_errors
│   ├── tx_packets
│   └── tx_window_errors
├── subsystem -> ../../../../class/net
├── tx_queue_len
├── type
└── uevent
```
