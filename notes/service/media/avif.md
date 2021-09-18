---
title: AVIF
---

# AVIF

- AVIF
  - 衍生自 AV1 - I-frame from AV1
  - 目的是取代 JPEG
  - 中低清场景更好 - Web
    - 因为 video-derived format
    - 照片大多时候也优于 jpegxl
  - 最大分辨率 65536x65536
- https://avif.io/blog/comparisons/avif-vs-jpegxl/
- cq-level 0-63
- cq - Constant/Constrained Quality
- end-usage - Rate control mode - vbr, cbr, cq, or q
- tune - psnr,ssim,butteraugli default: psnr
- butteraugli rate distortion tuning
- Adaptive quantization
- 参数自动调优
- [AOMediaCodec/libavif](https://github.com/AOMediaCodec/libavif)
- [AOMediaCodec/av1-avif](https://github.com/AOMediaCodec/av1-avif)
- [avif-has-landed](https://jakearchibald.com/2020/avif-has-landed/)
- https://github.com/dreampiggy/AVIFQuickLook
- [implementations](https://github.com/AOMediaCodec/av1-avif/wiki#implementations)
- https://old.reddit.com/r/AV1/comments/o7s8hk/high_quality_encoding_of_avif_images_using/
- https://chipsandcheese.com/author/blueswordm/

```bash
# macOS
brew install joedrago/repo/avifenc
# AlpineLinux
apk add libavif-apps
# Debian
apt install libavif-bin

# 16 MB
# -> 1.8 MB
# -> speed 10 1.7 MB
# 和 cjxl -d 1 区别不大
# 默认 speed [6], color QP [24 (Medium) <-> 26 (Medium)], alpha QP [0 (Lossless) <-> 0 (Lossless)], tileRowsLog2 [0], tileColsLog2 [0], 1 worker thread(s)
avifenc input.jpg input.avif
# 推荐
avifenc --min 0 --max 63 -a end-usage=q -a cq-level=18 -a tune=ssim input.jpg input.avif

# intra-only
# -a color:sharpness=2 默认 0
#   how much detail retention you want vs artifacts
# -a color:enable-chroma-deltaq=1 chroma Q variation per SB. Free quality increase
# -a color:qm-min=0 默认 8
# -a color:deltaq-mode=3
# -a color:aq-mode=1
#   variance based AQ mode, works well for intra-only photographic
avifenc -s 6 -j $(nproc) --min 0 --max 63 -a end-usage=q -a cq-level=XX -a color:aq-mode=1 -a color:sharpness=2 -a tune=butteraugli -a color:enable-chroma-deltaq=1 -a color:qm-min=0 -a color:deltaq-mode=3 i.png o.avif

# 无损 - 默认单线程很慢 - jpegxl 默认压出来 4.1M
# 3.4M -> 2.1M
avifenc -l input.png png.avif

# Batch
ls *.jpg | xargs basename -s .jpg | xargs -I {} avifenc -j 12 --min 0 --max 63 -a end-usage=q -a cq-level=18 -a tune=ssim  {}.jpg ../avif/{}.avif
find input -type d | xargs -I {} mkdir -p "avif/{}"
find input -type f -iname '*.jpg' | sed 's/.jpg$//' | xargs -I {} avifenc -j 12 --min 0 --max 63 -a end-usage=q -a cq-level=18 -a tune=ssim -a color:aq-mode=1 -a color:sharpness=2 -a color:enable-chroma-deltaq=1 -a color:qm-min=0 {}.jpg avif/{}.avif
```
