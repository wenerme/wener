---
title: sharp
---

# sharp

- [lovell/sharp](https://github.com/lovell/sharp)
  - 基于 libvips
- 类似针对视频的 [fluent-ffmpeg](./fluent-ffmpeg.md)
- wasm 目前无法再浏览器使用

:::caution

- 支持的 tiff 功能有限

:::

```bash
# 支持使用 wasm
# @img/sharp-wasm32/sharp.node
npm install --cpu=wasm32 sharp
```

- SHARP_IGNORE_GLOBAL_LIBVIPS
- SHARP_FORCE_GLOBAL_LIBVIPS
- VIPS_CONCURRENCY

# FAQ

## JPEG error: marker was not found

图片损坏
