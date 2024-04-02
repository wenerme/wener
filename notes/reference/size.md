---
title: Size
---

# Size

- A4 为 A3 对折大小 - 可以此类推
- DPI - Dots Per Inch - 打印
  - 600 - 归档
  - 300 - 打印
  - 150
  - 72 - 普通
- PPI - Pixels Per Inch - 显示器
  - > = 200 - 视网膜屏, HiDPI
- 银行卡/身份证
  - 8.56 cm × 5.398 cm
  - 85.6 mm × 53.98 mm
  - 3.37 inch × 2.125 inch × 0.0625
  - [ISO/IEC 7810](https://en.wikipedia.org/wiki/ISO/IEC_7810) - ID-1

| Social          |         Size | Ratio  |
| --------------- | -----------: | ------ |
| FB Page Cover   |  1640×664 px | 1:2.46 |
| FB Shared Image |  1200×630 px | 1:1.91 |
| FB Event Image  | 1920×1080 px | 16:9   |
| FB Group Header |  1640×856 px | 1:1.91 |
| Instagram       | 1080×1080 px | 1:1    |
| Insta Story     | 1080×1920 px | 9:16   |
| Youtube Profile |   800×800 px | 1:1    |
| Youtube Cover   | 2560×1440 px | 16:9   |
| Twitter Profile |   400×400 px | 1:1    |
| Twitter Header  |  1500×500 px | 3:1    |

| Print         |       Size | Pixel     | pt             |
| ------------- | ---------: | --------- | -------------- |
| A3            | 297×420 mm |
| A4            | 210×297 mm | 2480×3508 | 595.28, 841.89 |
| A5            | 148×210 mm |
| B3            | 353×500 mm |
| B4            | 250×353 mm |
| B5            | 176×250 mm |           | 498.9, 708.66  |
| JIS B5        | 182x257 mm |
| Letter        |  8.5×11 in |
| Ledger        |   11×17 in |
| Business Card |   3.5×2 in |

- 1mm=2.83465pt
- 凭证封面
  - 252x148
  - 增票 243mm×142mm
  - A5 212x150
  - 240mm×140mm
  - 245mm×130mm
  - 245mm×150mm
  - 245mm×145mm
- Japanese Industrial Standards (JIS)
- https://github.com/diegomura/react-pdf/blob/master/packages/layout/src/page/getSize.js
- https://papersizes.io/japanese/jb5

| Photo      |       inch |           mm | note |
| ---------- | ---------: | -----------: | ---- |
| Wallet     |     2×3 in |
| Enprint    |   3.5×5 in |
| -          |    8×12 in |
| -          |   12×18 in |
| -          |   16×24 in |
| -          |   20×30 in |
| -          |   24×36 in |
| 2R         | 2.5×3.5 in |
| 3R,L,5 寸  |   3.5×5 in |
| 4R,KG,6 寸 |     4×6 in |   102×152 mm |
| 5R         |     5×7 in |
| 6R         |     6×8 in |
| S8R,A4     |    8×10 in |
| 10R        |   10×12 in |
| 1 寸       |            |   25 x 35 mm |
| 2 寸证件照 |            | 37  x  49 mm |
| 标准 2 寸  |            |   37 x 53 mm |

- 4R - 标准 135 底片尺寸
- R -> Rect
  - 2,4,6,8,10,12
- S -> Sequre
  - 4,6,8,10
- Cube - 2x3
- Wallet - 3x4
- 日本标准
  - E,L,KG,2L,8P,6P,6PW,4P,4PW
- [Photo print sizes](https://en.wikipedia.org/wiki/Photo_print_sizes)

| Screen  |         Size |
| ------- | -----------: |
| VGA     |   640×480 px |
| XGA     |  1024×768 px |
| HD      |  1280×720 px |
| -       |  1366×768 px |
| -       |     1440x900 |
| -       |  1536×864 px |
| -       |  1600×900 px |
| Full HD | 1920×1080 px |
| 2K      | 2048×1080 px |
| UHD     | 3840×2160 px |
| 4K      | 4096×2160 px |

- https://gs.statcounter.com/screen-resolution-stats/desktop/worldwide

| Mobile          |         Size |
| --------------- | -----------: |
| iPhone 4        |   640×900 px |
| iPhone 5        |  640×1136 px |
| iPhone 6 7 8    |  750×1334 px |
| iPhone 6+ 7+ 8+ | 1080×1920 px |
| iPhone X        |    1125×2436 |

| AD     | Size      |
| ------ | --------- |
| Banner | 468×60 px |

| Size        | Screen   |
| ----------- | -------- |
| 2880 x 1800 | MBP 15   |
| 2560 x 1440 | QHD/WQHD |

<!--
720x400
80×25 text mode
VGA 80 × 25
9×16 pixels per character

8×16 pixels per character. The 9th pixel column is a repeated 8th pixel column.
This separates most characters for a nicer visual impression.

https://wiki.osdev.org/Text_Mode_Cursor#Font_based_.22graphical.22_cursor

https://retrocomputing.stackexchange.com/a/14808

-->

```bash
system_profiler SPDisplaysDataType | grep Resolution
```
