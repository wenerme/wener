---
title: 存储硬件常见问题
tags:
  - FAQ
---

# 存储硬件常见问题 {#storage-hardware-faq}

## NAND 闪存单元 {#nand-flash-cell}

| abbr. |         stand for | bits/cell | first ssd            | P/E                         | cn       |
| ----- | ----------------: | --------- | -------------------- | --------------------------- | -------- |
| SLC   | Single-Level Cell | 1         |                      |                             | 单层单元 |
| DLC   | Double-level cell | 2         |                      |                             | 双层单元 |
| MLC   |  Multi-Level Cell | 2         |                      |                             | 多层单元 |
| TLC   | Triple-Level Cell | 3         | 2010 Samsung 840 SSD | 5xnm,2500                   | 三层单元 |
| QLC   |   Quad-Level Cell | 4         | 2018 Micron 5210 ION | 3xnm,2xnm,1xnm 1250,750,500 | 四层单元 |
| PLC   |  Penta-level cell | 5         |                      | 1xm,35                      | 五层单元 |

- level 越低，速度越快，成本越高，容量越低
- level 越高，误码率越高
  - ECC、BCH
- 制程影响 P/E
- eMLC - 企业级 MLC
  - 低错误率
- [Multi-level cell](https://en.wikipedia.org/wiki/Multi-level_cell)

## NOR vs NAND {#nor-vs-nand}

- NOR
  - 可以随机读写
  - 平行方式连接
- NAND
  - 按页读写
  - 低面积、高容量、低成本
  - 顺序方式连接

## HPC 存储系统 {#hpc-storage-systems}

| System      | Year | Peak PFLOPS | # Cores | Storage Capacity | # Disks  |
| ----------- | ---- | ----------- | ------- | ---------------- | -------- |
| ASCI Purple | 2005 | 0.1         | 12k     | 2 PB             | 10K      |
| HPCS        | 2012 | 16          | 500K+   | 40+ PB           | 100K+    |
| Exascale    | 2018 | 1000        | ~150M   | ~1,000 PB        | ~200K-1M |

- https://www.usenix.org/legacy/events/lisa11/tech/slides/deenadhayalan.pdf

## 4K 块大小 {#4k-block-size}

- 2010 年 - 512 -> 4096
  - 高级格式化
- IDEMA - International Disk Drive Equipment and Materials Association - 国际硬盘设备与材料协会
- http://www.seagate.com/cn/zh/tech-insights/advanced-format-4k-sector-hard-drives-master-ti/

## 磨损均衡 {#wear-leveling}

- Wear Leveling
- 延长闪存存储设备（如 SSD 和 U 盘）寿命的技术
- 闪存存储设备由许多存储单元（称为块）组成，每个块都有有限的写入/擦除周期。为了避免某些块因过度使用而过早损坏，Wear Leveling 会确保写入操作均匀分布在整个存储器的所有块中。
- 动态均衡
  - 写入的时候均衡
- 静态均衡
  - 没有写入的时候会移动冷数据
