---
tags:
  - Format
---

# TIFF

- TIFF - Tagged Image File Format
- 浏览器不支持渲染 TIFF
- IFDs - Image File Directories

| type | for         |
| ---- | ----------- |
| 0    | WhiteIsZero |
| 1    | BlackIsZero |
| 2    | RGB         |
| 3    | Palette     |
| 4    | GrayScale   |
| 5    | RGB Palette |
| 6    | YCbCr       |

## 参考 {#reference}

- [image-js/tiff](https://github.com/image-js/tiff)
  - 不支持 Image Type 6 - YCbCr
  - npm:tiff
- [photopea/UTIF.js](https://github.com/photopea/UTIF.js)
  - npm:utif
  - Fast and advanced TIFF decoder
  - 依赖 npm:pako for zlib decompression
- 参考
  - Konva 支持通过 utif 来转码 https://github.com/konvajs/react-konva/issues/262

# FAQ

## Input buffer has corrupt header: tiff2vips: tile size out of range

- sharp 加载 tiff 出错
