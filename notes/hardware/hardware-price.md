---
title: 硬件价格
---

# 硬件价格

:::tip

- 避免: 浪潮、国产
- 二手为主

:::

- PGA - Pin Grid Array - 插针网格阵列
  - 阵脚在 CPU 上
- LGA - Land grid array - 平面网格数组封装
  - 阵脚在底座上
  - [LGA 3647](https://en.wikipedia.org/wiki/LGA_3647)
  - 2011-3
  - 2011
  - 1366
  - FCLGA 3647
- [Intel](./intel.md)

| Socket   | CPU                   | C/T    | Base    | Boost  | L2      | L3     | TDP  | Note    |
| -------- | --------------------- | ------ | ------- | ------ | ------- | ------ | ---- | ------- |
|          | Intel Xeon E5 2686 V4 |
| LGA 3647 | Intel Xeon Gold 6133  | 20C40T | 2.50GHz |        | 20×1 MB | 27.5MB | 150W | **OEM** |
| SP3      | AMD EPYC 7601         | 32C64T | 2.2GHz  | 3.2GHz |         | 64MB   | 180W |

<!--

https://ark.intel.com/content/www/us/en/ark/products/120479/intel-xeon-gold-6136-processor-24-75m-cache-3-00-ghz.html

-->

> **Note** 注意
>
> - M.2 vs U.2
>   - M.2 主要是家用消费级别
>   - U.2/SFF-8639 主要是企业级别
> - SSD TWB
>   - SSD 的写入寿命，可重复写入次数。
>   - 容量越大，寿命越长。
>   - SSD 本身相当于消耗品。

## 2024-10

- SATA3 企业级 - 能保持和 SAS 差不多 特性/性能
  - 12T,14T,16T - 45-65 ¥/T - 质保 1,2,3 年

## 2023-06

**SSD**

| unit                             | Cap. | price              | IO                  | Seq R     | Seq W      | 4kQD32 IOPS |     TBW | P/E  | Note   |
| -------------------------------- | ---: | ------------------ | ------------------- | --------- | ---------- | ----------: | ------: | ---- | ------ |
| Intel S3520                      | 800G | 1000+<br/>**250+** | SATA                | 450MB/s   | 380MB/s    |     67K/17K |  1462TB | 1828 | 企业级 |
| Intel S4500                      | 960G | 1200+<br/>**500+** | SATA                | 500MB/s   | 490MB/s    |     72K/33K |  1860TB | 1937 | 企业级 |
| Samsung PM881                    |   1T | 700+<br/>**400+**  | SATA                | 560MS/s   | 530MB/s    |     98K/88K |         |      |
| Samsung PM893                    | 960G | 700+               | SATA                | 550MS/s   | 520MB/s    |     98K/30K |  1752TB | 1825 | 企业级 |
| Samsung 870 EVO                  |   1T | 600+               | SATA                | 550MS/s   | 530MB/s    |     98K/88K |   600TB | 600  |        |
| Samsung 990 PRO                  |   1T | 700+               | M.2 NVMe            | 7450MB/s  | 6900MB/s   | 1200K/1550K |   600TB | 600  |
| KIOXIA EXCERIA                   | 960G | 200                | SATA                | 555MB/s   | 540MB/s    |     81K/88K |   240TB | 250  | 消费级 |
| KIOXIA EXCERIA G2 NVMe           |   1T | 300+               | M.2 NVMe            | 2,100     | 1700 MB/s  |   360K/400K |   400TB | 400  |
| KIOXIA EXCERIA PLUS G2 NVMe RD20 |   1T | 550+               | M.2 NVMe            | 3,400     | 3,200 MB/s |   680K/620K |   400TB | 400  |
| Intel DC P4510                   |  8TB | **2800+**          | U.2 2.5 PCIe 3.1 x4 | 3200 MB/s | 3000 MB/s  |   640K/135K | 13.88PB | 1735 | 企业级 |

> **Note**
>
> - 标粗价格为二手，一般 TBW 能达到 80%-90% 以上。
> - 价格尽量选择了 1T 作为参考，其他容量可直接计算。
> - 作为对比 SAS/10K 的 4k IOPS 约 **150**。

- Samsung PM893 有 240G, 480G, 960G, 1.92TB, 3.84TB, 7.68TB
- Samsung 870 EVO 有 250GB, 500G, 1T, 2T, 4T
- KIOXIA EXCERIA 有 240G, 480G, 960G
- KIOXIA EXCERIA G2 有 500GB, 1TB, 2TB

<!--
https://wcm-stg.intel.com/content/www/cn/zh/ark/products/122572/intel-ssd-dc-p4510-series-8-0tb-2-5in-pcie-3-1-x4-3d2-tlc.html

https://wcm-stg.intel.com/content/www/cn/zh/ark/products/120524/intel-ssd-dc-s4500-series-1-9tb-2-5in-sata-6gbs-3d1-tlc.html
https://semiconductor.samsung.com/ssd/pc-ssd/pm881/
https://semiconductor.samsung.com/consumer-storage/internal-ssd/990-pro/
https://semiconductor.samsung.com/consumer-storage/internal-ssd/980pro/
https://semiconductor.samsung.com/consumer-storage/internal-ssd/870evo/
https://semiconductor.samsung.com/ssd/datacenter-ssd/pm893/
https://apac.kioxia.com/en-apac/personal/ssd/exceria-plus-g2-nvme-ssd.html
https://apac.kioxia.com/en-apac/personal/ssd/exceria-sata-ssd.html
https://www.samsung.com/us/business/computing/memory-storage/enterprise-solid-state-drives/pm893-2-5-sata-960gb-mz-7l396000/

https://pudongfuwuqi.taobao.com/
https://shop110538690.taobao.com/
-->

**平台**

|                                     unit | price | note                 |
| ---------------------------------------: | ----- | -------------------- |
| 平台 2U @2018 年+, Dell, Intel XEON 6133 | 8000+ | 40C80T, 8×2.5 SATA3  |
|   平台 2U @2018 年+, Dell, AMD EPYC 7601 | 6500+ | 64C128T, 24×2.5SATA3 |
|  平台 2U @2018 年+, H3C, Intel XEON 6133 | 4000+ | 40C80T, 8×2.5 SATA3  |
|                        DDR4 16G @2133MHz | 120   |
|                        DDR4 32G @2133MHz | 200   |
|                        DDR4 32G @2933MHz | 300   |
|                        DDR4 64G @2400MHz | 400   |
|                        DDR4 64G @2933MHz | 600   |

**配置参考**

- Intel S4500 960G×8 ~= ¥4000
  - 上述单机最多 24 盘，全部插满，dRAID，约 20T 可用 ~= 24×500 ~= ¥12000
  - 剩余 16 盘位，可预留 2 备用盘
  - 如果觉得容量不够，可装更多盘
  - 单盘最多有 8T，但一般 2T 居多
- +DDR4 32G × 24 = 768G ~= ¥5000
  - 一般有 32 个插槽，32G 插满为 1T ~= ¥6400
  - 单根内存最多有 128G，但一般 16G、32G、64G 居多
- **可选/可调** +M.2 NVMe 缓存 ~= ¥1000
- +平台 6000
- ~= 4000+5000+1000+6000 ~= 16000

<!--
DELL EMC R7425
平台 4500
直通 500 24口
CPU 700
盘架 20
电源 300
7 全高，1半高。

H330|

铂金(Platinum)最高端，主要是8xxx系列，8路;
黄金(Gold)其次，主要是5xxx和6xxx系列，4路
银(Silver)，主要是4xxx系列，双路;
铜(Bronze)，涵盖3xxx系列。

MySQL
https://dev.mysql.com/doc/refman/8.0/en/innodb-configuring-io-capacity.html
https://dev.mysql.com/doc/refman/8.0/en/optimizing-innodb-diskio.html
https://dev.mysql.com/doc/refman/8.0/en/innodb-parameters.html#sysvar_innodb_flush_method

innodb-flush-method=nofsync

ZFS 可关闭 double write buffer
-->

**阿里云定价参考**

| Service  |  IOPS | IO       |    Price/T |  Price/G |
| -------- | ----: | -------- | ---------: | -------: |
| ESSD PL0 |   10k | 180MB/s  |  500¥ T/月 | 0.5/G/月 |
| ESSD PL1 |   50k | 350MB/s  | 1000¥ T/月 |   1/G/月 |
| ESSD PL2 |  100k | 750MB/s  | 2000¥ T/月 |   2/G/月 |
| ESSD PL3 | 1000k | 4000MB/s | 4000¥ T/月 |   4/G/月 |

- IOPS 和容量强相关
- 不同等级对最低容量有要求

<!--
https://ecs-buy.aliyun.com/disk
-->

## 2023-03

|                     unit | price |
| -----------------------: | ----- |
|        平台 1U @2015 年+ | 1500+ |
|        平台 2U @2015 年+ | 1500+ |
|        平台 1U @2018 年+ | 1800+ |
|        DDR4 16G @2133MHz | 120   |
|        DDR4 32G @2133MHz | 200   |
|        DDR3 16G @1866MHz | 50    |
| CPU E5-2696V4 2.2G22C44T | 900   |
| CPU E5-2686V4 2.3G18C32T | 200   |
| CPU E5-2699V3 2.3G18C32T | 410   |
|     SAS 2.5 15K 600G128M | 120   |
|     SAS 2.5 10K 1.2T128M | 300   |
|      SAS 3.5 7.2K 6T256M | 320   |
|     SAS 3.5 7.2K 10T256M | 550   |

- 其他
  - 网卡 - 10gbe
  - 电源
  - HBA
  - UPS
  - SSD
  - USB
- 先确定平台
  - 影响 CPU/内存/硬盘
- 按需 配置 CPU/内存/硬盘
- v3 v4 同平台

---

例如：

- 36 核心 72 线程 384G 4.8T = 2000+3000+1000 = ¥6000
- 36 核心 72 线程 768G 4.8T = 2000+5000+1000 = ¥8000
- 44 核心 88 线程 768G 80T = 3500+5000+5000 = ¥13500
- 类似阿里云
  - 64 vCPU 256 GiB - ¥7000/月
  - 高效云盘 ¥0.35/GB/月 - ¥350/T/月
  - 1 年~=¥9 万/年

---

- 36 核心 72 线程 ~= ¥2000
  - CPU E5-2686V4 × 2 = ¥400
  - 平台 1500 - CPU 挑机器
- 44 核心 88 线程 ~= ¥3500
  - CPU E5-2696V4 × 2 = ¥1800
  - 平台 1500 - CPU 挑机器
- +DDR4 16G × 24 = 384G ~= ¥3000
- +DDR4 32G × 24 = 768G ~= ¥5000
- +SAS 2.5 15K 600G128M × 8 = 4.8T ~= ¥1000
- +SAS 3.5 7.2K 10T256M × 8 = 80T ~= ¥5000

## 2018-04

- SAS 6T - 750¥ - ~125¥/T
