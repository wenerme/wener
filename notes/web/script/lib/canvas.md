---
title: canvas
tags:
  - NodeJS
---

# canvas

- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas)
  - Chrome 69+
- [window.createImageBitmap](https://developer.mozilla.org/en-US/docs/Web/API/Window/createImageBitmap)
  - ImageBitmap
- context
  - 2d - 绘制 2D 图形
  - bitmaprenderer - 绘制位图
  - webgl - 基于 OpenGL ES 2.0 的 3D 绘制
  - webgl2 - 基于 OpenGL ES 3.0 的 3D 绘制
  - webgpu - 基于 WebGPU 的 3D 绘制

```ts
type CanvasImageSource =
  | HTMLOrSVGImageElement
  | HTMLVideoElement
  | HTMLCanvasElement
  | ImageBitmap
  | OffscreenCanvas
  | VideoFrame;
type ImageBitmapSource = CanvasImageSource | Blob | ImageData;
```


## NodeJS

- [Automattic/node-canvas](https://github.com/Automattic/node-canvas)
  - MIT, JS, C++
  - Cairo backed Canvas implementation for NodeJS.
  - 支持平台
    - macOS x86/64
    - macOS aarch64 (aka Apple silicon)
    - Linux x86/64 (glibc only)
    - Windows x86/64

```bash
# AlpineLinux
apk add pkgconf cairo-dev pango-dev libpng-dev jpeg-dev giflib-dev librsvg-dev

# macOS
# https://github.com/Automattic/node-canvas/issues/2036
brew install pkg-config cairo pango libpng jpeg giflib librsvg
```
