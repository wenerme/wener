---
title: 配件
---

# 配件

# Intel CPU

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

# 内存

- 36JSF2G72PZ-1G9E1
  - 镁光, ECC REG
  - PC3-14900R
  - 16G, 1866 MT/s, 2R×4

## 三星

- [DDR4 SDRAM Memory](https://semiconductor.samsung.com/resources/product-guide/DDR4_Product_guide_May.18.pdf)
- M391A1G43BB1-CRCB1
  - UDIMM, 8G, 2R×2, 2133
  - 非三星官方
- [M391A2K43BB1-CRC]

[m391a2k43bb1-crc]: https://semiconductor.samsung.com/dram/module/ecc-udimm-ecc-sodimm/m391a2k43bb1-crc/

## Motherboard

- AsRock [E3C232D2I]
  - Intel Xeon E3-1200 v5/v6
  - Dual channel DDR4 2133 ECC UDIMM max 32 GB
  - BMC MegaRAC SP GUI ASPEED AST2400
  - 6 SATA3 by C232
  - 1x PCIe 3.0 x16
  - Integrated IPMI 2.0 with KVM and Dedicated LAN (RTL8211E)
  - Intel i210 x1 + Intel i219 x1
  - MiniITX
  - 1000¥-1500¥ @ 2019

[e3c232d2i]: https://www.asrockrack.com/general/productdetail.asp?Model=E3C232D2I

:::tip ASRock

- F2,DEL UEFI Setup
- F6 instant flash
- F11 Bootr Menu
- Tab Switch Screen

:::

## Chipset

## Processor

- ASPEED - VGA+BMC
  - [AST2500]
    - Advanced PCIe Graphics & Remote Management Processor

[ast2500]: https://www.aspeedtech.com/server_ast2500

## Mine

- NAS
  - E3C232D2I
  - Xeon E3-1235L v5
  - M391A1G43BB1-CRCB1
  - SAS 6T x 4

# Glossary

- FRU - [Field-replaceable unit](https://en.wikipedia.org/wiki/Field-replaceable_unit)
  - 现场可更换单元
  - https://support.lenovo.com/br/en/solutions/ht036683
- AHB - Advanced High-performance Bus

## CVE

- [CVE-2019-6260](https://nvd.nist.gov/vuln/detail/CVE-2019-6260)
  - ASPEED ast2400, ast2500 BMC
