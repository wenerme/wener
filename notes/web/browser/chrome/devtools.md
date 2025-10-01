---
title: DevTools
---

# DevTools

- Rendering
  - Layer borders 图层边界
    - 渲染上下文 z-index、position、transform 等
    - Content Layer
- zIndex
  - https://chromewebstore.google.com/detail/devtools-z-index/bcnpmhefiohkpmjacfoanhbjhikegmoe
- 参考
  - https://www.chromium.org/developers/design-documents/gpu-accelerated-compositing-in-chrome/

## Layer borders

1. 内容图层（Content Layer）
   - 包括普通非平铺（Non-Tiled Content Layer）和平铺的内容图层（Tiled Content Layer）。
   - 边界颜色：绿色（非平铺）和橙色（平铺）。
   - 主要用于承载普通的网页内容，例如文字、图片等。
2. 图片图层（Image Layer）
   - 边界颜色：橄榄绿。
   - 专用于处理图片的绘制。
3. 容器图层（Container Layer）
   - 边界颜色：黄色。
   - 用于包裹其他图层，例如创建一个 div，但不直接绘制任何内容。
4. 表面图层（Surface Layer）
   - 边界颜色：蓝绿色。
   - 用于存储渲染的结果，便于 GPU 合成阶段直接使用。
5. 渲染表面（Render Surface）
   - 边界颜色：蓝色。
   - 创建一个独立的渲染上下文（例如 transform, will-change 会导致此类图层生成）。

---

- https://source.chromium.org/chromium/chromium/src/+/main:cc/debug/debug_colors.cc
