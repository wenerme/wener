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
