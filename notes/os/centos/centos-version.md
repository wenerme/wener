---
tags:
  - Version
---

# CentOS 版本

## CentOS 8

- 内核 4.18+
- RHEL 8/Fedora 28
- nftable 替代 iptable
- firewalld 默认使用 nftable
- qemu 2.2
  - virt 仓库下 4.2
- 仓库
  - update 仓库没有了 - BaseOS/os + AppStream 取代
  - BaseOS/kickstart 停留在发布点状态
- 包
  - 新增 Cockpit

## CentOS 7

- 网卡名字会使用 eth 格式了而不是 bios 名字
- 移除 net-tools 包 - 没有了 ifconfig, netstat - 使用 iproute2
