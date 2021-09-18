---
title: butteraugli
---

# butteraugli

- [google/butteraugli](https://github.com/google/butteraugli)
  - HVS-aware image differences
  - 命令行只支持读取 jpeg 和 png
  - 核心逻辑只有单个 cc 文件
- 参考
  - online [butteraugli](http://libwebpjs.hohenlimburg.org/butteraugli/) - 非常慢
  - https://github.com/google/butteraugli/issues/22
    - 1.0 best, 1.0-1.1 acceptable, > 1.1 not good
    - 实际测试复杂照片
      - avif 分数会比较高 3,4 分，但视觉上根本看不出来区别 - 因为 avifenc 默认 pnsr，支持 ssim - 最新版本支持 butteraugli
      - jxl 相对分数更高 1-2, 因为内部使用 butteraugli

```bash
git clone git@github.com:google/butteraugli.git google/butteraugli
cd google/butteraugli/butteraugli
make

./butteraugli

# 其他编码可以转换为 png 对比
avifenc input.jpg input.avif
avifdec input.avif avif.png
butteraugli input.jpg avif.png avif.ppm

cjxl input.jpg input.jxl -j
djxl input.jxl jxl.png
butteraugli input.jpg jxl.png jxl.ppm
```
