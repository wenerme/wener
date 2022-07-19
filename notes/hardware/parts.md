---
title: 配件
---

# 配件

## Server

- HP MicroServer Gen 10 Plus
  - 2020 年
  - 4 盘位
  - 两个半高 PCIe
  - Gen 10 Plus vs Gen 10
    - 外置电源适配器
    - 顶部没有额外的 SATA 空间
    - Plus 只有 Gen 10 一半高
    - iOL 5
- Dell
  - [List of Dell PowerEdge Models](https://www.dell.com/support/kbdoc/en-my/000143479)
  - [How to identify a Dell PowerEdge server generation](https://www.dell.com/support/kbdoc/en-my/000137343)
- 机柜
  - 宽度 550/500, 深度 400
  - rack unit - U, RU - 1+3/4 inches = 44.45mm ~= 45mm
    - 19U = 48.26cm ~= 5m
    - 12U = 600
    - 9U = 450
    - 6U = 300
  - PDU - 机柜电源，排插
  - 机柜轮子一般 50
  - 深度 400 适用于 < 320 的设备 - 预留 80
- 常用 4 盘位 NAS 24cm ~= 6U

## Intel CPU

- v1,v2 同平台
- v3,v4 同平台

| model        | date  | #c  | #t  | base    | turbo   |   TDP | memory     | socket    |
| ------------ | ----- | --- | --- | ------- | ------- | ----: | ---------- | --------- |
| [E5-2650V3]  | Q3'14 | 10  | 20  | 2.3 GHz | 3.0 GHz | 105 W | DDR4       |
| [E5-2666v3]  | 2015  | 10  | 20  | 2.9 GHz | 3.5 GHz | 135 W | DDR4       |
| [E5-2630Lv2] | Q3'13 | 6   | 12  | 2.4 GHz | 2.8 GHz |  60 W | DDR3       |
| [E3-1235Lv5] | Q4'15 | 4   | 4   | 2.0 GHz | 3.0 GHz |  25 W | DDR4,DDR3L | FCLGA1151 |

[e5-2650v3]: https://ark.intel.com/products/81705
[e5-2666v3]: https://www.cpu-upgrade.com/CPUs/Intel/Xeon/E5-2666_v3.html
[e5-2630lv2]: https://ark.intel.com/products/75791
[e3-1235lv5]: https://ark.intel.com/products/88170

- E5-2666v3
  - 亚马逊定制
- [Xeon E5-2660 v2](https://ark.intel.com/content/www/us/en/ark/products/75272/intel-xeon-processor-e52660-v2-25m-cache-2-20-ghz.html)
  - 25M Cache, 2.20 GHz
- [E3-1235Lv5]
  - 8M Cache, 2.00 GHz
  - DDR4-1866/2133, DDR3L-1333/1600 @ 1.35V
  - FCLGA1151

:::tip

- TDP - Thermal Design Power
- E3 数字带 5 的都有集显 无需加显卡
- L - 低电压，TPD 是非 L 的一半左右

:::

- LGA1150
- FCLGA1151

## 内存

- 36JSF2G72PZ-1G9E1
  - 镁光, ECC REG
  - PC3-14900R
  - 16G, 1866 MT/s, 2R×4

### 三星

- [DDR4 SDRAM Memory](https://semiconductor.samsung.com/resources/product-guide/DDR4_Product_guide_May.18.pdf)
- M391A1G43BB1-CRCB1
  - UDIMM, 8G, 2R×2, 2133
  - 非三星官方
- [M391A2K43BB1-CRC]

[m391a2k43bb1-crc]: https://semiconductor.samsung.com/dram/module/ecc-udimm-ecc-sodimm/m391a2k43bb1-crc/

## Motherboard

### E3C232D2I

- AsRock [E3C232D2I](AsRock-E3C232D2I)
  - Intel Xeon E3-1200 v5/v6
  - Dual channel DDR4 2133 ECC UDIMM max 32 GB
  - BMC MegaRAC SP GUI ASPEED AST2400
  - 6 SATA3 by C232
  - 1x PCIe 3.0 x16
  - Integrated IPMI 2.0 with KVM and Dedicated LAN (RTL8211E)
  - Intel i210 x1 + Intel i219 x1
  - MiniITX
  - 1000¥-1500¥ @ 2019

[asrock-e3c232d2i]: https://www.asrockrack.com/general/productdetail.asp?Model=E3C232D2I

:::tip ASRock

- F2,DEL UEFI Setup
- F6 instant flash
- F11 Boot Menu
  - 来电自启 - Advance -> Chipset Configuration -> Restore on AC/Power Lose = Power On
- Tab Switch Screen

:::

## Chipset

## RAID/HBA

:::tip

- 速率指每通道
  - 一个 Port 算 一个 通道
  - 常见 6GB/s, 12GB/s
- SFF8088 - mini-SAS external connectors - 1 分 4

:::

- LSI
  - 主要 RAID 芯片生产商，目前被 broadcom 收购
  - HBA - 2008（6gb）-2308（6gb）-3008（12gb）
  - LSI 2008 - DELL H200 H310 / IBM 1115 1015 / LSI 9240
  - LSI 2308 - LSI 9217/9207 HP 9205 / 浪潮超微 2308
  - 9217=2308 IR 模式
  - 9207=2308 IT 模式
  - LSI 9211-8i IT（SAS 2008）PCIe 2.0 533Mhz 处理器
  - LSI 9207-8i IT（SAS 2308）PCIe 3.0 800Mhz
- [LSI 9205-8i IT](https://docs.broadcom.com/doc/12352040) - HP H220
  - 8 Ports, 6Gb/s SAS 2.1
  - x8, PCIe, 4000 MB/s
  - PCI Power ~9W

## Processor

- ASPEED - VGA+BMC
  - [AST2500]
    - Advanced PCIe Graphics & Remote Management Processor

[ast2500]: https://www.aspeedtech.com/server_ast2500

## MicroSD

- [Samsung EVO Plus - 2021](https://semiconductor.samsung.com/consumer-storage/memory-card/micro-sd-evo-plus-2021/)
  - 64G
    - UHS-I U1, A1, V10
  - 128G
    - UHS-I U3, A2, V30
  - 读 130MB/s
    - 要使用三星的读取器才能达到标称速度 - 超过 UHS-I 速率
    - 实际使用约 90MB/s
    - UHS-I 接口最高 104MB/s
  - 实际
    - 顺序 1M 95MB/s, 80MB/s
    - 随机 4K 12MB/s, 3.5MB/s
  - 参考
    - [EVO Plus MicroSD 存储卡（2021）](https://www.samsung.com/cn/memory-storage/memory-card/evo-plus-512gb-microsd-card-2021-mb-mc512ka-cn/)
    - [Samsung EVO Plus microSD (2021) review](https://www.windowscentral.com/samsung-evo-plus-microsd-review)
    - https://www.hardwarezone.com.sg/tech-news-samsung-s-new-microsd-cards-go-512gb-160mbs-speeds
- [Lexar 633x](https://www.lexar.com/zh-hans/product/lexar-high-performance-633x-microsdhc-microsdxc-uhs-i-存储卡blue系列/)
  - 32G - 读取 100MB/s, 写入 10MB/s+
    - UHS-I U1, A1, V10, C10
  - 64G - 读取 100MB/s, 写入 45MB/s
    - UHS-I U3, A1, V30, C10
- [Lexar 1066x](https://www.lexar.com/zh-hans/product/lexar-professional-1066x-microsdxc-uhs-i-存储卡silver系列/)
  - 64GB - 读取 160MB/s, 写入 70MB/s
    - UHS-I U3, A2, V30
    - 写入速度稍低,采用先进技术以达到超过 UHS-I 104MB/s 规格的读取速度
    - ⚠️ 需要专用 Lexar 读卡器 RevB
  - 128GB - 读取 160MB/s, 写入 120MB/s
    - UHS-I U3, A2, V30

## My Homelab

- NAS
  - [E3C232D2I](#E3C232D2I)
  - Xeon E3-1235L v5
  - 之前 8G - M391A1G43BB1-CRCB1
  - 现在 16G x 2
  - SAS 6T x 4
  - Samsung 125G SSD - 缓存
  - HP H220 - LSI-9205-8i IT - SAS 卡 - 最多 8 盘

# Glossary

- FRU - [Field-replaceable unit](https://en.wikipedia.org/wiki/Field-replaceable_unit)
  - 现场可更换单元
  - https://support.lenovo.com/br/en/solutions/ht036683
- AHB - Advanced High-performance Bus

## CVE

- [CVE-2019-6260](https://nvd.nist.gov/vuln/detail/CVE-2019-6260)
  - ASPEED ast2400, ast2500 BMC
