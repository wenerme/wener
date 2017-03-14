# Swap

Linux 中的交换文件称为  `swappiness`,swappiness 的值为当内存达到某个百分比时会进行交换. 0 为不使用交换, 10 为 当内存达到 90% 后会使用交换.

> 该值修改后需要重启

```bash
# Linux
# 可直接修改 /etc/sysctl.conf 中的值,之后需要 sysctl -p 加载新的配置
# 在系统运行时修改交换
sysctl vm.swappiness=10
# 清除所有交换
swapoff -a
# 启用所有交换.
swapon -a
# 查看交换区的使用
cat /proc/meminfo
free
top
# 查看哪些设备作为交换
cat /proc/swaps
# 当前虚拟内存的使用统计
vmstat

# MAC OS X
# 查看虚拟内存使用量即交换区
vm_stat
# 查看使用的交换文件
ls -lh /private/var/vm/swapfile*
```


## 添加 swap

```bash
# 4G 交换区
dd if=/dev/zero of=/sysswap count=512 bs=8MiB status=progress
chmod 600 /sysswap
mkswap /sysswap
swapon /sysswap
# 将 swap 添加到 fstab
echo /sysswap   swap    swap    sw  0   0 >> /etc/fstab

sysctl vm.swappiness=10
```

## 参考
* [How to add swap on CentOS 7](https://www.digitalocean.com/community/tutorials/how-to-add-swap-on-centos-7)
