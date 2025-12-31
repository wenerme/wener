---
title: Linux Swap 管理 (Swap Management)
tags:
  - Linux
  - SysAdmin
  - Swap
  - Memory
---

# Linux Swap 管理 (Swap Management) {#linux-swap-management}

```bash
apk add util-linux-misc # util-linux 提供全功能的 swap 工具

swapon --show   # 查看交换区
cat /proc/swaps #
```

- Swap Files:
  - Ubuntu: `/swap.img`
  - macOS: `/private/var/vm/swapfile*`
  - Windows: `C:\pagefile.sys`
  - Generic: `/swapfile`

Linux uses `swappiness` to control swap usage.

- `vm.swappiness` (0-100), default 60.
- 0: Avoid swap as much as possible.
- 10: Use swap when 90% memory is filled (10% free).
- 100: Aggressive swapping.

> [!NOTE]
> `vm.swappiness` modification requires reboot or `sysctl -p` to persist, but takes effect immediately if written to `/proc`.

```bash
# Linux
# 永久修改 /etc/sysctl.conf -> sysctl -p
# 运行时修改:
sysctl vm.swappiness=10

# Operations
swapoff -a        # Disable all swap
swapon -a         # Enable all swap
cat /proc/meminfo # Check memory/swap
free -h           # Show usage
top               # Monitor
cat /proc/swaps   # List swap devices
vmstat            # Virtual memory stats

# macOS
vm_stat                          # Virtual memory stats
ls -lh /private/var/vm/swapfile* # List swap files

# Alpine Linux
echo vm.swappiness=10 > /etc/sysctl.d/swap.conf
/etc/init.d/sysctl restart
rc-update add swap boot
```

## 添加 swap

```bash
# 4G 交换区
# dd if=/dev/zero of=/sysswap count=512 bs=8MiB status=progress
fallocate -l 4G /sysswap

chmod 600 /sysswap
mkswap /sysswap
swapon /sysswap
# 将 swap 添加到 fstab
echo /sysswap swap swap sw 0 0 >> /etc/fstab

sysctl vm.swappiness=10
```

## 删除 swap

```bash
# 先关闭 swap
swapoff /sysswap
# 删除 swap 文件
rm -f /sysswap
# 删除 fstab 中的 swap
sed -i '/\/sysswap/d' /etc/fstab
```

## 参考

- [How to add swap on CentOS 7](https://www.digitalocean.com/community/tutorials/how-to-add-swap-on-centos-7)
