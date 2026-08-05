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
- Decoding
  - 2022+ 的设备基本都没问题了
- 参考
  - https://jellywatch.app/blog/av1-codec-jellyfin-future-streaming-encode-decode-2026

| Hardware             | AV1 Encoding    |
| -------------------- | --------------- |
| Apple M3+            | VideoToolbox    |
| Intel Arc A-series   | quality debated |
| Intel 12th Gen+ iGPU | Limited         |
| NVIDIA RTX 40-series | NVENC AV1       |
| AMD RX 7000-series   | AMF AV1         |

```bash
ffmpeg -h encoder=libaom-av1

# Constant quality
# CRF 0–63 - 0 lossless
ffmpeg -i input.mp4 -c:v libaom-av1 -crf 30 -b:v 0 av1_test.mkv

# libsvtav1
ffmpeg -i input.mp4 -c:v libsvtav1 -y test.mp4
```
