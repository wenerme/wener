---
title: ImageMagick
---

# imagemagick


- [ImageMagick/ImageMagick](https://github.com/ImageMagick/ImageMagick)
- http://www.imagemagick.org/
- http://www.imagemagick.org/script/formats.php
  - PNG, JPEG, GIF, HEIC, TIFF, DPX, EXR, WebP, Postscript, PDF, and SVG
- resize, flip, mirror, rotate, distort, shear and transform images, adjust image colors, apply various special effects, or draw text, lines, polygons, ellipses and Bézier curves.

```bash
# 添加 svg 和 opencl 支持
brew reinstall imagemagick

# 处理 SVG 也可以考虑 inkscape
# 但在 macos 下 xserver 显示的不太好
# brew cask info inkscape

convert hd.jpg -resize 1920x1080 hd_1080p.png
convert hd.jpg -resize 2048x1080 hd_2k.png
convert hd.jpg -resize 2048x hd_w2048.png

convert hd.jpg -resize 1080x hd_w1080.png

convert hd.jpg -fuzz 5% -trim +repage -alpha set -bordercolor none -border 48x48 -resize 1080x hd_w1080.png

# 照片保持原本的方向
magick hd.jpg -auto-orient -resize 1080x hd_w1080.png
```

## Convert

- http://www.imagemagick.org/script/convert.php

```bash
# -append 自上至下合并
# +append 自左至右合并
convert a.png b.png -append full.png

convert -resize ${resize}x${resize} -unsharp 1x4

mogrify -resize 16x12 -quality 100 -path ../new-thumbs *.jpg

# 合并 PDF
convert -density 150 *.pdf output.pdf
convert -density 600 file1.pdf file2.pdf -resize 50% new.pdf

# ghostscript
gs -dBATCH -dNOPAUSE -q -sDEVICE=pdfwrite -sOutputFile=temp.pdf pdf1.pdf pdf2.pdf
# PDF Toolkit
pdftk pdf1.pdf pdf2.pdf cat output temp.pdf

magick mogrify -monitor -format jpg *.HEIC
```

# FAQ

## The convert command is deprecated in IMv7, use "magick" instead of "convert" or "magick convert"

- `convert` -> `magick convert`
- IM7

---

- convert, mogrify, identify, composite -> magick
