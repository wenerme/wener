---
title: RAID
---

# RAID

- [RAID](https://en.wikipedia.org/wiki/RAID)
  - Redundant Array of Independent Disks - 独立硬盘冗余阵列
- [Standard_RAID_levels](https://en.wikipedia.org/wiki/Standard_RAID_levels)
  - RAID 0
  - RAID 1
  - RAID 2
  - RAID 3
  - RAID 4
  - RAID 5
  - write hole
    - in which data and parity become inconsistent after a power loss
  - RAID 6
- [Nested RAID levels](https://en.wikipedia.org/wiki/Nested_RAID_levels)
  - RAID 01 (RAID 0+1)
  - RAID 03 (RAID 0+3)
  - RAID 10 (RAID 1+0)
  - RAID 50 (RAID 5+0)
  - RAID 60 (RAID 6+0)
  - RAID 100 (RAID 10+0)
- [Data striping](https://en.wikipedia.org/wiki/Data_striping) - 数据分条
  - segmenting logically sequential data, such as a file, so that consecutive segments are stored on different physical storage devices.
  - 增加吞吐量
  - IO 负载
- archlinux [RAID](https://wiki.archlinux.org/index.php/RAID)

```bash
# 查看使用时间
# Power_On_Hours
smartctl --all /dev/sdj  | command grep -i Power
```

## 硬件

- JBOD - Just Bunch Of Disk - RAID 卡的一种模式
- HBA - Host Bus Adapter - 直通卡 - Dell HBA
- IT - Initiator Target - LSI 固件能力，类似 HBA
- 基于 IOC 的产品，一般称为 HBA 卡，也就是常说的直连卡，一般支持 Raid0/1/10/1E
- 基于 ROC 的产品，一般称为 Raid 卡，一般带有缓存，支持 Raid0/1/10/1E/5/50/6/60，可选 BBU，附带的高级软件包括：CacheCade、FashPath、SafeStore 等
- 1064、1064e、1068、1068e、2008、2308、3008 属于 IOC；2108、2208 属于 ROC；
- 博通收购了 Mega LSI
- 参考
  - [Hardware Raid Setup using MegaCli](https://raid.wiki.kernel.org/index.php/Hardware_Raid_Setup_using_MegaCli)
  - [LSI MegaRAID SAS](https://hwraid.le-vert.net/wiki/LSIMegaRAIDSAS)
  - 博通 [RAID 控制器](https://www.broadcom.com/products/storage/raid-controllers/)
  - 博通 [HAB](https://www.broadcom.com/products/storage/host-bus-adapters/)
  - [Introduction to LSI's MegaCLI Utility](https://www.cisco.com/c/en/us/support/docs/servers-unified-computing/ucs-c-series-rack-servers/115020-intro-lsi-megacli-00.html)
  - ftp://download2.boulder.ibm.com/ecc/sar/CMA/XSA/ibm_utl_sraidmr_megacli-8.00.48_linux_32-64.zip
  - [Note that MegaCLI is now called StorCLI](https://www.thomas-krenn.com/en/wiki/StorCLI)
  - [MegaRAID](https://www.thomas-krenn.com/en/download.html?product=12190)
  - [StorCLI Reference Manual](https://docs.broadcom.com/docs/12352476)
  - [Storcli 常用命令](http://blog.51cto.com/mofesi/1309251)

```bash
./storcli64 show
```

# FAQ

## 如何选择 RAID

做 RAID 首先要考虑目的

- 性能
  - 利用多磁盘并发 IO
  - RAID 10
- 空间利用率
  - 副本数量
  - RAID 5
- 可用性
  - 允许坏多少硬盘
  - RAID 6 - 目前使用较多，存储成本低

其次还需要考虑有什么硬件，SSD、大容量 3.5 SATA、大容量 3.5 SAS、小容量 2.5 SAS，硬件不同可能导致组建 RAID 的方式和结果不同。
一般为了加速 RAID 可能会加 SSD 来做日志存储。

组建 RAID 可能还需要额外的内存和 CPU，根据需要的特性来进行选择

- ZFS
  - 占用较多内存，至少 1T 1G，默认使用 50%
  - 可以进行 LZ4 压缩，不占用太多 CPU
- mdadm
  - 不需要太多内存
  - 没有附加特性
  - 可平滑迁移
- 硬件 - 现在已经不推荐
  - 无需内存
  - 部分 RAID 卡自带缓存
  - 没有附加特性
  - 与硬件绑定，难以监控管理，存储不易迁移

除了基础的 RAID 能力，如果还需要更多的附加能力，则不在普通 RAID 的范畴内，可考虑 ZFS，例如

- 增量备份
- 快照
- 去重

## 阵列卡 vs 直通卡

> 软 RAID 推荐使用直通卡 HBA

- JBOD 比 MD RAID0 快约 30%
- [JOBD vs RAID](https://tobert.github.io/post/2014-06-17-jbod-vs-raid.html)

## JBOD vs HBA

- JBOD
  - RAID 卡功能
  - 模糊了 HBA 界线
  - 在没有 HBA 卡的时候使用 RAID 卡的 JBOD 达到相同的目的
- HBA
  - 直通卡
