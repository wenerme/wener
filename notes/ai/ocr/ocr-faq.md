---
tags:
  - FAQ
---

# OCR FAQ

- 扫描件通常是 300DPI
  - 转换为 72DPI 相当于缩小 4 倍
- 视觉模型有最小限制
  - Qwen2.5-VL
    - https://github.com/QwenLM/Qwen2.5-VL/blob/d2240f11656bfe404b9ba56db4e51cd09f522ff1/qwen-vl-utils/src/qwen_vl_utils/vision_process.py#L26-L36

```bash
# 缩小 50
convert a.jpg -resize 50% a.50.jpg
# 缩小 4 倍
convert a.jpg -resize 25% a.25.jpg
# 缩小 4 倍，限制高度为 30
convert a.jpg -resize 25% -resize 'x30<' a.output.jpg

# -compress Group4
# -density 300 增加 meta 信息
# -lat 20x20+3% 可能需要调整来到最佳效果
# 轻微高斯模糊有时可以帮助后续的阈值处理，平滑噪点
convert 1.png \
  -colorspace Gray \
  -deskew 40% \
  -normalize \
  -gaussian-blur 0.5 \
  -adaptive-sharpen 0x1.5 \
  -density 300 \
  -lat 20x20-3% \
  -trim +repage \
  1.o.png

magick identify 1.png 1.o.png
magick identify -verbose 1.png 1.o.png
exiftool 1.png 1.o.png
echo 1.png 1.o.png | xargs -n 1 ffprobe -hide_banner
```

## OCR 预处理 {#preprocess}

- 二值化
  - threshold - 阈值
    - 需要掌握 threshold
    - otusu - 大津法
    - sauvola - 自适应阈值
    - adaptive threshold
  - negate - 反色
- 对比度增强与光照均衡
  - normalize
    - 拉伸全局对比度
  - clahe - Contrast Limited Adaptive Histogram Equalization
- 噪声去除
  - median
  - blur
- 锐化
  - sharpen
- 图像歪斜校正 - Deskew
  - rotate
  - OpenCV、Leptonica
- 形态学操作 (Morphological Operations)
  - dilation - 膨胀
  - erosion - 腐蚀
  - opening - 开运算
  - closing - 闭运算
- 分辨率
  - DPI
    - 300DPI
  - 72DPI
- trim
- 参考
  - https://github.com/lovell/sharp/issues/609
  - https://github.com/IgorMeloS/OCR
