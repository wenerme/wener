---
tags:
  - Awesome
---

# Image Awesome

- [ImageOptim](https://github.com/ImageOptim/ImageOptim)
  - GPLv2
  - macOS 图像优化 GUI 工具
  - Zopfli, PNGOUT, OxiPNG, AdvPNG, PNGCrush, JPEGOptim, Jpegtran, Guetzli, Gifsicle, SVGO, svgcleaner, MozJPEG
  - 无损 PNG: 40%~50%
  - 有损 PNG 75%: ~75%
  - https://imageoptim.com/
  - [ImageOptim/libimagequant](https://github.com/ImageOptim/libimagequant)

## SVG

- [svgo](./svgo.md)
  - MIT, JS
  - 支持有损
- [RazrFalcon/svgcleaner](https://github.com/RazrFalcon/svgcleaner)
  - GPL-2.0, Rust
- scour
  - Apache-2.0, Python

## PNG

- [chrissimpkins/Crunch](https://github.com/chrissimpkins/Crunch)
  - MIT,Python
  - pngquant, GPL
- [shssoichiro/oxipng](https://github.com/shssoichiro/oxipng)
  - MIT, Rust
  - ~30%
- [kornelski/pngquant](https://github.com/kornelski/pngquant)
  - GPLv3
  - 允许损失质量
- [google/zopfli](https://github.com/google/zopfli)
- [Yuriy-Svetlov/compress-images](https://github.com/Yuriy-Svetlov/compress-images)
  - MIT, C, JS
- [imagemin](https://github.com/imagemin/imagemin)
- https://tinypng.com/
  - ~75%

```bash
oxipng -o 6 -i 0 --strip safe *.png
```
