---
title: 南亚科技 (Nanya Technology)
tags:
  - Hardware
  - Memory
  - DRAM
  - DDR3
  - Nanya
---

# 南亚科技 (Nanya Technology) {#nanya-technology}

- 台湾 DRAM 厂商 - Nanya Technology Corporation
- Standard DRAM - DDR2 / DDR3 / DDR4 / DDR5
- Low Power DRAM - LPDDR2 ~ LPDDR5/5X
- KGD

- [Nanya 产品](https://www.nanya.com/en/Product/)
  - [DDR3 产品列表](https://www.nanya.com/en/product/List/450/2249)
  - [DDR3L 产品列表](https://www.nanya.com/en/Product/List/450/7591)
- [NANYA Standard DRAM Part Numbering Guide](https://www.nanya.com/en/Support/50)
  - [PDF](https://www.nanya.com/Files/220)
- 原 NT5CB64M16FP-DII 产品页 `https://www.nanya.com/en/Product/3756/NT5CB64M16FP-DII` 已失效
- 官网 DDR3 列表中 1Gb x16 只有 `NT5CB64M16GP-*`，未见 FP - 2026-10 观察，不代表停产

## NT5CB64M16FP {#nt5cb64m16fp-technical-specifications}

- 1Gb / 128MB，DDR3，x16，F-die
- 路由器、机顶盒等嵌入式设备

- [Datasheet - Commercial, Industrial and Automotive DDR3(L) 1Gb SDRAM v1.8 (08/2015)](https://resources.ampheo.com/static/datasheets/nanya-technology/nt5cb64m16fp-dii.pdf)
  - 镜像，官网已无 FP 产品页

### 主要特性 {#key-features}

| 项目       | 值                                                      |
| :--------- | :------------------------------------------------------ |
| Density    | 1Gb = 64M x 16                                          |
| 内部组织   | 8Mbit x 16 I/O x 8 banks                                |
| Type       | DDR3 SDRAM，8n prefetch，JEDEC DDR3                     |
| Voltage    | `NT5CB` 1.5V ± 0.075V (SSTL_15)                         |
| Package    | 96-ball TFBGA，9.00 x 13.00 mm，ball pitch 0.80 mm      |
| Bank       | BA0 – BA2                                               |
| Row / Col  | A0 – A12 / A0 – A9                                      |
| Page Size  | 2KB                                                     |
| tRFC       | 110ns                                                   |
| tREFI      | Tc ≤ 85℃: 7.8us，Tc > 85℃: 3.9us                        |
| 速度/时序  | 由后缀决定，见下表                                      |
| 特性       | ODT、ZQ (240Ω ±1%)、Write Leveling、ASR、PASR、MPR      |

- PASR 默认禁用，需原厂 electrical fuse 启用（datasheet Note 1）
- Tc > 85℃ 需要 2x refresh，并开启 Extended SRT 或 ASR

### 组织结构 {#organization}

- 型号中没有容量 MB，`64M16` = 64M x 16bit = 1Gb = 128MB
- 同步 DRAM 接口
- 一颗 x16 → 16bit 总线；两颗 → 32bit 总线，共 256MB

### Ordering Information {#ordering-information}

| Part Number         | 类型  | 封装          | Data Rate | CL-tRCD-tRP | 等级                 |
| :------------------ | :---- | :------------ | :-------- | :---------- | :------------------- |
| NT5CB64M16FP-DH     | DDR3  | 96-ball       | 1600      | 10-10-10    | Commercial           |
| NT5CB64M16FP-EK     | DDR3  | 96-ball       | 1866      | 13-13-13    | Commercial           |
| NT5CB64M16FP-FL     | DDR3  | 96-ball       | 2133      | 14-14-14    | Commercial           |
| NT5CB64M16FY-DI     | DDR3  | 96-ball VFBGA | 1600      | 11-11-11    | Commercial           |
| NT5CC64M16FP-DI     | DDR3L | 96-ball       | 1600      | 11-11-11    | Commercial           |
| NT5CC64M16FY-DI     | DDR3L | 96-ball VFBGA | 1600      | 11-11-11    | Commercial           |
| NT5CB64M16FP-DII    | DDR3  | 96-ball       | 1600      | 11-11-11    | Industrial           |
| NT5CC64M16FP-DII    | DDR3L | 96-ball       | 1600      | 11-11-11    | Industrial           |
| NT5CB64M16FP-DIA    | DDR3  | 96-ball       | 1600      | 11-11-11    | Automotive Grade 3   |
| NT5CB64M16FP-DIH    | DDR3  | 96-ball       | 1600      | 11-11-11    | Automotive Grade 2   |
| NT5CB128M8FN-DH     | DDR3  | 78-ball       | 1600      | 10-10-10    | Commercial，x8       |

- 来源：datasheet Ordering Information；DIA/DIH 标注 "Please confirm with NTC for the available schedule"
- 高速 bin 向下兼容低速 bin
- FY = Small Package 8.00 x 13.00 x 1.00 mm

## 南亚部件编号 (Part Number) 解析 {#nanya-part-numbering-system}

示例: `NT 5C B 64M16 F P - DH` 与 `NT 5C B 64M16 F P - DI I`

| Segment   | Meaning               | Details                                                                     |
| :-------- | :-------------------- | :-------------------------------------------------------------------------- |
| **NT**    | Manufacturer          | NANYA Technology                                                            |
| **5C**    | Product Family        | `5T` = DDR2，`5C` = DDR3，`5A` = DDR4，`5F` = DDR5                          |
| **B**     | Interface & Power     | `B` = SSTL_15 (1.5V, 1.5V)，`C` = SSTL_135 (1.35V, 1.35V)，DDR3L            |
| **64M16** | Organization          | Depth x Width，`64M16` = `128M8` = 1Gb；`M` = Mono，`T` = DDP               |
| **F**     | Device Version        | `A` = 1st ... `F` = 6th Version，即 F-die                                   |
| **P**     | Package (RoHS + HF)   | DDR3: `N` = 78-Ball TFBGA，`P` = 96-Ball TFBGA，`Y` = 96-Ball VFBGA         |
| **DH**    | Speed                 | 见下表                                                                      |
| **I**     | Grade (Special Type)  | 无 = Commercial，`I` = Industrial，`H` = Automotive Grade 2，`A` = Grade 3  |

- 新版 guide 中 DDR3 78-ball 有 `1/3/N/Q`，96-ball 有 `2/4/P/R`；2021 版 guide 写明 `N/P` Z height 1.0mm，`Q/R` 1.2mm
- 新版 guide 还有 `R` = 0~105℃，`T` = Quasi IT -40~95℃，`W` = Quasi IT -40~105℃，`U` = Industrial wide temp，`B` = Reduced standby
  - 例如官网 `NT5CB64M16GP-DIT`、`NT5CC64M16GP-DIB`

### DDR3 Speed {#ddr3-speed}

| Code | Data Rate | CL-tRCD-tRP | Clock (MHz) |
| :--- | :-------- | :---------- | :---------- |
| AC   | 800       | 5-5-5       |             |
| AD   | 800       | 6-6-6       |             |
| BD   | 1066      | 6-6-6       |             |
| BE   | 1066      | 7-7-7       |             |
| BF   | 1066      | 8-8-8       |             |
| CF   | 1333      | 8-8-8       |             |
| CG   | 1333      | 9-9-9       |             |
| DH   | 1600      | 10-10-10    | 800         |
| DI   | 1600      | 11-11-11    | 800         |
| EI   | 1866      | 11-11-11    |             |
| EJ   | 1866      | 12-12-12    |             |
| EK   | 1866      | 13-13-13    | 933         |
| FK   | 2133      | 13-13-13    |             |
| FL   | 2133      | 14-14-14    | 1066        |

- 速度码第一位字母对应频率档：A=800，B=1066，C=1333，D=1600，E=1866，F=2133；第二位字母越靠后 CL 越大
- `-DII` = `DI` + `I`，不是 `DH`

### 温度等级 {#temperature-grade}

| Grade                | 后缀 | Tc          |
| :------------------- | :--- | :---------- |
| Commercial           |      | 0℃ ~ 95℃    |
| Industrial           | I    | -40℃ ~ 95℃  |
| Automotive Grade 2   | H    | -40℃ ~ 105℃ |
| Automotive Grade 3   | A    | -40℃ ~ 95℃  |

## DDR3 vs DDR3L {#ddr3-vs-ddr3l}

- `NT5CB` = DDR3 1.5V；`NT5CC` = DDR3L 1.35V (-0.067/+0.1V)
- datasheet Note 4：SSTL_135 兼容 SSTL_15，1.35V DDR3L 可向下兼容 1.5V DDR3
  - DDR3L-RS 例外，不与 DDR3L/DDR3 兼容
- 用 `NT5CC` 替换板上 `NT5CB` 时，供电可保持 1.5V；反过来 1.35V 板子不能直接换 `NT5CB`

## 相关产品 {#related-products}

- Computing - PC / Server，DDR3 / DDR4 / DDR5
- Consumer - 网络设备、机顶盒、数字电视
- Mobile / Low Power - LPDDR3 / LPDDR4
- Industrial / Automotive - 工业、车规

### 同族型号

| 型号                 | 说明                                      |
| :------------------- | :---------------------------------------- |
| NT5CB128M8FN         | 1Gb x8，78-ball，F-die                    |
| NT5CB64M16FP         | 1Gb x16，96-ball TFBGA，F-die             |
| NT5CB64M16FY         | 1Gb x16，96-ball VFBGA 8x13mm，F-die      |
| NT5CC64M16FP         | 1Gb x16，DDR3L，F-die                     |
| NT5CB64M16GP         | 1Gb x16，96-ball，G-die，官网在售         |
| NT5CC64M16GP         | 1Gb x16，DDR3L，G-die，官网在售           |
| NT5CB128M16JR        | 2Gb x16，96-ball，官网在售                |
| NT5CB256M16ER        | 4Gb x16，96-ball，官网在售                |

- 官网在售 - 2026-10 官网列表观察，不等于可供货
- 官网 1Gb x16 DDR3 有 `NT5CB64M16GP-DI/EK/FL` 及 `-DIT/-EKT/-EKI/-EKA/-EKH` - 2026-10 观察
- FP → GP：die 版本不同；兼容性待核验，需对比两份 datasheet 的时序、IDD 和封装尺寸
- 跨厂替代需逐项核对：1Gb、x16、96-ball、电压、速度；分销商给的「equivalent」常有容量错误

## 丝印读法 {#marking}

- 型号行按上面的 part number 规则解析，例如 `NT5CB64M16FP-DH` → DDR3 1.5V、1Gb x16、F-die、96-ball、DDR3-1600 CL10、Commercial
- 日期码 / 批号：公开规范待确认
