---
title: Proxmox VE
---

# Proxmox VE

- [proxmox.com](https://www.proxmox.com/)
  - 基于 Debian 的虚拟化平台
  - 支持 KVM 虚拟机 + LXC 容器
  - Web 管理界面，集群支持
- [对比 VMware vSphere, Hyper-V, XenServer](https://www.proxmox.com/en/proxmox-ve/comparison)

## 订阅说明

| 版本       | 仓库                | 支持                     |
| ---------- | ------------------- | ------------------------ |
| Enterprise | pve-enterprise      | 稳定更新 + 技术支持      |
| Community  | pve-no-subscription | 无支持，仅社区论坛       |

- 默认安装使用 Enterprise 仓库，未订阅需切换到 No-Subscription
- [Package Repositories](https://pve.proxmox.com/wiki/Package_Repositories)

```bash
# 切换到免费仓库
echo "deb http://download.proxmox.com/debian/pve bookworm pve-no-subscription" > /etc/apt/sources.list.d/pve-no-subscription.list
rm /etc/apt/sources.list.d/pve-enterprise.list
apt update
```

## QEMU 模拟测试

```bash
# 创建磁盘 (安装后约占 2GB)
qemu-img create -f qcow2 pve.qcow2 32G

# 安装
qemu-system-x86_64 -smp 4 -m 4G \
  -hda pve.qcow2 \
  -cdrom proxmox-ve_8.x.iso \
  -boot d

# 启动 (端口转发)
qemu-system-x86_64 -smp 4 -m 4G \
  -hda pve.qcow2 \
  -net nic -net user,hostfwd=tcp::8006-:8006,hostfwd=tcp::22-:22
```

- Web UI: https://localhost:8006
