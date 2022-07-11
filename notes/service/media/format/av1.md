---
title: AV1
---

# AV1

> AV1 编码非常非常慢
> macOS Intel i7-8750H (12) @ 2.20GHz fps=1

- [Encode/AV1](https://trac.ffmpeg.org/wiki/Encode/AV1)
- libaom
  - Constant quality
  - Constrained quality
  - 2-pass average bitrate
  - 1-pass average bitrate
- libsvtav1 - Intel x86-64 codec for AV1
  - Scalable Video Technology for AV1
  - 会比 libaom 快
- librav1e - Xiph encoder for AV1

```bash
ffmpeg -h encoder=libaom-av1

# Constant quality
# CRF 0–63 - 0 lossless
ffmpeg -i input.mp4 -c:v libaom-av1 -crf 30 -b:v 0 av1_test.mkv

# libsvtav1
ffmpeg -i input.mp4 -c:v libsvtav1 -y test.mp4
```
