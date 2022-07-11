---
title: JPEG XL
---

# JPEG XL

- **Royalty-free**
- [libjxl/libjxl](https://github.com/libjxl/libjxl)
- https://jpeg.org/jpegxl
- 目的是取代旧的 JPEG
- XL - Long Term
- image/jxl
- 适用于高清照片 - 相机、工作室、工业
  - Optimized for high fidelity
- Web 大约在 2021 年底能实现支持
- -d
  - 视效参数 - 而不是数学参数
  - JPEP 默认 0 其他 默认 1.0
  - 推荐 0.5-3.0
- https://github.com/yllan/JXLook
- PPT [JPEG XL Overview](https://docs.google.com/presentation/d/1LlmUR0Uoh4dgT3DjanLjhlXrk_5W2nJBDqDAMbhe8v8)
  - FLIF/FUIF - 无损+有损 压缩
  - Lossless Pik
  - Lossless WebP
  - 无损 JPEG 重压来自 谷歌 brunsli
- 核心
  - 多功能 容器 格式
  - 无损+有损 压缩
  - 无损重压 JPEG - 20%
  - VarDCT
  - Progressive decode
  - XYB color space / Human visual system based color space
    - Y: luma
    - X: difference L-M
    - B: S
  - Adaptive quantization
  - 无损上下文检测

```bash
brew install jpeg-xl
cjxl -v --help

# 支持重压 JPEG - 无损
# 16MB -> 14MB
cjxl input.jpg lossless-input.jxl
# -> 4.1 MB
cjxl -j input.jpg lossy-input.jxl
# -> 4MB
cjxl -d 1 input.jpg input-d1.jxl
# 噪点
cjxl -j --photon_noise=ISO3200 input.jpg lossy-input.jxl
# 无损
# 3.4M -> 4.1M
cjxl input.png -d 0 png.jxl
# 比 AVIF 单线程还慢 -> 1.5M
cjxl input.png -d 0 -e 9 png.jxl
```
