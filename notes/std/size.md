---
title: Size
---

# Size

|  from |        to | note    |
| ----: | --------: | ------- |
|  1 cm | 0.3937 in |
|  1 in |   2.54 cm |
|  1 cm | 28.346 pt | 72dpi   |
|  1 cm | 37.795 px | 96dpi   |
|  1 in | 72.000 pt | 72dpi   |
|  1 in | 96.000 px | 96dpi   |
| 1 rem |     16 px | default |

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
  - px - 1011 × 638
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

- https://screensizemap.com/

## CSS Absolute length units

| Unit | Name                | Equivalent to       | cn           |
| ---- | ------------------- | ------------------- | ------------ |
| cm   | Centimeters         | 1cm = 96px/2.54     | 厘米         |
| in   | Inches              | 1in = 2.54cm = 96px | 英寸         |
| mm   | Millimeters         | 1mm = 1/10th of 1cm | 毫米         |
| pc   | Picas               | 1pc = 1/6th of 1in  | 派卡         |
| pt   | Points              | 1pt = 1/72th of 1in | 点           |
| px   | Pixels              | 1px = 1/96th of 1in | 像素         |
| Q    | Quarter-millimeters | 1Q = 1/40th of 1cm  | 四分之一毫米 |

- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Values_and_Units
  - Absolute length units

## Resolution

| Resolution | Ratio |         Quality | low motion | high motion | audio |
| ---------: | ----: | --------------: | ---------: | ----------: | ----: |
|    426x240 |  16:9 |            240p |       400k |        600k |   64k |
|    640x360 |  16:9 |            360p |       700k |        900k |   96k |
|    640x480 |   4:3 |         SD 480p |      1000k |       1200k |  128k |
|    854x480 |  16:9 |            480p |      1250k |       1600k |  128k |
|   1280x720 |  16:9 |         HD 720p |      2500k |       3200k |  128k |
|   1280x720 |  16:9 |   HD 720p 60fps |      3500k |       4400k |  128k |
|  1920x1080 |  16:9 |       FHD 1080p |      4500k |       5300k |  192k |
|  1920x1080 |  16:9 | FHD 1080p 60fps |      5800k |       7400k |  192k |
|  3840x2160 |  16:9 |              4k |     14000k |       18200 |  192k |
|  3840x2160 |  16:9 |        4k 60fps |     23000k |      29500k |  192k |

| Res. Type |  Name | Ratio |      Size |
| --------: | ----: | ----: | --------: |
|        SD |  480p |   4:3 |   640x480 |
|        HD |  720p |  16:9 |  1280x720 |
|       FHD | 1080p |  16:9 | 1920x1080 |
|       QHD | 1440p |  16:9 | 2560x1440 |
|        2K | 1440p |  16:9 | 2560x1440 |
|    4K UHD | 2160p |  16:9 | 3840x2160 |
|   8K FUHD | 4320p |  16:9 | 7680x4320 |

- 16:9 = 1.77
- SD - Standard Definition
- HD - High Definition
- FHD - Full High Definition
- UHD - Ultra High Definition
- QHD - Quad High Definition
- [List of common display resolutions](https://en.wikipedia.org/wiki/List_of_common_display_resolutions)

|     abbr. | size      | notes    |
| --------: | --------- | -------- |
|      ntsc | 720x480   |
|       pal | 720x576   |
|     qntsc | 352x240   |
|      qpal | 352x288   |
|     sntsc | 640x480   |
|      spal | 768x576   |
|      film | 352x240   |
| ntsc-film | 352x240   |
|     sqcif | 128x96    |
|      qcif | 176x144   |
|       cif | 352x288   |
|      4cif | 704x576   |
|     16cif | 1408x1152 |
|     qqvga | 160x120   | 1/4 QVGA |
|      qvga | 320x240   | 1/4 VGA  |
|       vga | 640x480   |
|      svga | 800x600   |
|       xga | 1024x768  |
|      uxga | 1600x1200 |
|      qxga | 2048x1536 |
|      sxga | 1280x1024 |
|     qsxga | 2560x2048 |
|     hsxga | 5120x4096 |
|      wvga | 852x480   |
|      wxga | 1366x768  |
|     wsxga | 1600x1024 |
|     wuxga | 1920x1200 |
|     woxga | 2560x1600 |
|    wqsxga | 3200x2048 |
|    wquxga | 3840x2400 |
|    whsxga | 6400x4096 |
|    whuxga | 7680x4800 |
|       cga | 320x200   |
|       ega | 640x350   |
|     hd480 | 852x480   |
|     hd720 | 1280x720  |
|    hd1080 | 1920x1080 |
|        2k | 2048x1080 |
|    2kflat | 1998x1080 |
|   2kscope | 2048x858  |
|        4k | 4096x2160 |
|    4kflat | 3996x2160 |
|   4kscope | 4096x1716 |
|       nhd | 640x360   |
|     hqvga | 240x160   |
|     wqvga | 400x240   |
|    fwqvga | 432x240   |
|      hvga | 480x320   | 1/2 VGA  |
|       qhd | 960x540   |
|     2kdci | 2048x1080 |
|     4kdci | 4096x2160 |
|   uhd2160 | 3840x2160 |
|   uhd4320 | 7680x4320 |

- VAG - Video Graphics Array
  - 640x480
- QVGA - Quarter VGA
  - 1/4 VGA

## Avatar

- github avatar 460x460
- Instagram
  - avatar 320x320
  - Square 1080x1080
  - Portrait 1080x1350
  - Landscape 1080x566
  - Stories & Reels 1080x1920
