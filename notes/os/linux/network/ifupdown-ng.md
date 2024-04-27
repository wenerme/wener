---
title: ifupdown-ng
---

# ifupdown-ng

- [ifupdown-ng/ifupdown-ng](https://github.com/ifupdown-ng/ifupdown-ng)
- [ifupdown-ng](https://pkgs.alpinelinux.org/packages?name=ifupdown-ng*&branch=edge&arch=x86_64)
- ifupdown-ng [interfaces-bond.5](https://github.com/ifupdown-ng/ifupdown-ng/blob/main/doc/interfaces-bond.scd)
  - bond-members, slaves, bond-slaves
  - bond-mode
  - bond-xmit-hash-policy
  - bond-min-links
  - bond-miimon=0 - MII link monitoring 间隔 - 0 禁用
  - bond-use-carrier=1 - 0 -> ioctls, 1 -> netif_carrier_ok
  - bond-updelay=0
  - bond-downdelay=0
  - bond-all-slaves-active=0 - inactive port 收到的重复 frame 处理方式 - 0 drop, 1 deliver
  - bond-packets-per-slave=1 - 0-65535 - 仅针对 balance-rr
  - bond-lp-interval=1 - 1-0x7fffffff - 仅针对 balance-tlb, balance-alb
  - bond-resend-igmp=1 - 0-255 - IGMP membership reports to send after a link failover happend.
    - 针对 balance-rr, active-backup, balance-tlb, balance-alb
  - LACP
    - bond-lacp-rate=slow - 0=slow, 1=fast
    - bond-ad-select=stable - stable=0, bandwidth=1, cound=2
    - bond-ad-actor-sys-prio=65535 - 0-65535
    - bond-ad-user-port-key=0 - 0 - 1023
  - active/backup - active-backup, balance-tlb, balance-alb
    - bond-primary _interface_ - 当 interface 活跃时，作为主要接口
    - bond-primary-reselect _always_ - always=0, better=1, failure=2
      - 选择 primary 接口的逻辑
    - bond-fail-over-mac _none_ - none=0, active=1, follow=2 - active-backup 是否设置所有 members 为相同 mac
    - bond-num-grat-arp _1_ - 0-255
      - bond-num-unsol-na
    - bond-peer-notif-delay _0_
  - ARP
    - bond-arp-ip-target
    - bond-arp-interval
    - bond-arp-validate
    - bond-arp-all-targets - ifupdown-ng [interfaces-bond.5](https://github.com/ifupdown-ng/ifupdown-ng/blob/main/doc/interfaces-bond.scd)
  - bond-members, slaves, bond-slaves
  - bond-mode
  - bond-xmit-hash-policy
  - bond-min-links
  - bond-miimon=0 - MII link monitoring 间隔 - 0 禁用
  - bond-use-carrier=1 - 0 -> ioctls, 1 -> netif_carrier_ok
  - bond-updelay=0
  - bond-downdelay=0
  - bond-all-slaves-active=0 - inactive port 收到的重复 frame 处理方式 - 0 drop, 1 deliver
  - bond-packets-per-slave=1 - 0-65535 - 仅针对 balance-rr
  - bond-lp-interval=1 - 1-0x7fffffff - 仅针对 balance-tlb, balance-alb
  - bond-resend-igmp=1 - 0-255 - IGMP membership reports to send after a link failover happend.
    - 针对 balance-rr, active-backup, balance-tlb, balance-alb
  - LACP
    - bond-lacp-rate=slow - 0=slow, 1=fast
    - bond-ad-select=stable - stable=0, bandwidth=1, cound=2
    - bond-ad-actor-sys-prio=65535 - 0-65535
    - bond-ad-user-port-key=0 - 0 - 1023
  - active/backup - active-backup, balance-tlb, balance-alb
    - bond-primary _interface_ - 当 interface 活跃时，作为主要接口
    - bond-primary-reselect _always_ - always=0, better=1, failure=2
      - 选择 primary 接口的逻辑
    - bond-fail-over-mac _none_ - none=0, active=1, follow=2 - active-backup 是否设置所有 members 为相同 mac
    - bond-num-grat-arp _1_ - 0-255
      - bond-num-unsol-na
    - bond-peer-notif-delay _0_
  - ARP
    - bond-arp-ip-target
    - bond-arp-interval
    - bond-arp-validate
    - bond-arp-all-targets

## interfaces

| Syntax                         | Description                          |
| ------------------------------ | ------------------------------------ |
| **address** _address_          | 配置 IP 地址，自动补充适当的子网掩码 |
| **netmask** _netmask_          | 设置后备子网掩码                     |
| **point-to-point** _address_   | 设置点对点网络配置的对端 IP 地址     |
| **gateway** _address_          | 设置默认网关地址                     |
| **link-type** _link-type_      | 定义接口的链路类型                   |
| **veth-peer-name** _peer-name_ | 指定 veth 对端接口的名称             |
| **alias** _alias_              | 设置接口别名                         |
| **requires** _interfaces_...   | 定义启动前需先启动的接口             |
| **inherit** _object_           | 接口继承其它配置对象的设置           |
| **use** _executor_             | 指定使用的执行器                     |
| **pre-down** _command_         | 在接口关闭前执行的命令               |
| **down** _command_             | 关闭接口时执行的命令                 |
| **post-down** _command_        | 接口关闭后执行的命令                 |
| **pre-up** _command_           | 在接口启动前执行的命令               |
| **up** _command_               | 启动接口时执行的命令                 |
| **post-up** _command_          | 接口启动后执行的命令                 |

- https://github.com/ifupdown-ng/ifupdown-ng/blob/main/doc/interfaces.scd

## executor

- wifi - AlpineLinux 3.15+
  - wifi-ssid
  - wifi-psk

```interfaces
# 账号密码模式
iface wifi-home
	use dhcp
	wifi-ssid HomeNetwork
	wifi-psk ExamplePassphrase
# 配置文件模式
iface wifi-work
	use dhcp
	wifi-config-path /etc/network/wpa-work.conf
```
