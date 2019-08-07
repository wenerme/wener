---
id: mdadm
title: mdadm
---

# Multi Device Administration

## Tips
* [Guide to mdadm](https://raid.wiki.kernel.org/index.php/A_guide_to_mdadm)
* [Software RAID](https://wiki.mikejung.biz/Software_RAID)
* [Linux Raid](https://raid.wiki.kernel.org)
  * [RAID setup](https://raid.wiki.kernel.org/index.php/RAID_setup)
* [Software RAID and LVM](https://wiki.archlinux.org/index.php/Software_RAID_and_LVM)

```bash
# 线性模式
# 合并两个分区，分区大小任意
mdadm --create --verbose /dev/md0 --level=linear --raid-devices=2 /dev/sda1 /dev/sdb2

# RAID 0
# stripe 模式，切分数据散落到个个磁盘，利用并发访问能力，每个分区大小相近
# --spare-devices=1 /dev/sdd1 指定了一个空闲盘
mdadm --create --verbose /dev/md0 --level=mirror --raid-devices=2 /dev/sdb1 /dev/sdc1 --spare-devices=1 /dev/sdd1

# RAID 4/5/6
# 默认块大小 128k 读写场景不同，对性能影响不同
mdadm --create --verbose /dev/md0 --level=5 --raid-devices=3 /dev/sdb1 /dev/sdc1 /dev/sdd1 --spare-devices=1 /dev/sde1

mdadm --create --verbose /dev/md/main --level=6 --raid-devices=8 /dev/sd{a,b,c,d,e,f,g,h} --assume-clean

# 查看重构状态
cat /proc/mdstat
# 扫描生成配置文件
mdadm --detail --scan >> /etc/mdadm/mdadm.conf

# 扫描现有 raid 配置
mdadm --assemble --scan 
# 扫描指定的
mdadm --scan --assemble --uuid=a26bf396:31389f83:0df1722d:f404fe4c

# 停止
mdadm --stop /dev/md0

```

## RAID 文件系统
* 考量点
  * 支持在线扩缩容
  * 支持 stride 和 stripe-width 来优化性能
  * RAID 块大小是性能关键
* 一般为了支撑灵活扩缩容会使用 LVM
* 选择 FS 还需要考虑是否支持校验
* XFS 是相对比较好的选择