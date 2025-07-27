---
title: ImageMagick
---

# imagemagick

- [ImageMagick/ImageMagick](https://github.com/ImageMagick/ImageMagick)
- https://www.imagemagick.org/
- https://www.imagemagick.org/script/formats.php
  - PNG, JPEG, GIF, HEIC, TIFF, DPX, EXR, WebP, Postscript, PDF, and SVG
- resize, flip, mirror, rotate, distort, shear and transform images, adjust image colors, apply various special effects, or draw text, lines, polygons, ellipses and Bézier curves.

:::tip

- 新版本 `convert`, `magick convert` 命令被弃用，使用 `magick convert` 替代

:::

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

**参数顺序**

```
资源 -> 输入选项 -> 输入文件 -> 输出选项 -> 输出文件
```

| command | for                |
| ------- | ------------------ |
| mogrify | 批量转换, 原地修改 |
| convert | 转换格式           |

- https://www.imagemagick.org/script/mogrify.php

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

## Options

- -limit type value
  - width, height, area, memory, map, disk, file, thread, throttle, time
  - 默认 768 files, 3GB of image area, 1.5GiB memory, 3GiB memory map, and 18.45EB of disk
  - 当前限制 `identify -list resource`
  - memory - 限制内存上限
  - map - 限制内存映射上限
  - disk - 限制磁盘使用上限
  - area - 限制图像区域上限 - 超过这个限制的图像将被直接放到磁盘，避免一张图片就占用过多内存
  - thread - 限制线程数
- https://imagemagick.org/script/command-line-options.php

# FAQ

## The convert command is deprecated in IMv7, use "magick" instead of "convert" or "magick convert"

- `convert`, `magick convert` -> `magick`
- IM7

---

- convert, mogrify, identify, composite -> magick

## Nonstandard tile width 2556, convert file.

- TIFF 的 tile width 和 tile length 不是 16 的倍数

## Unknown field with tag ... encountered

```
Unknown field with tag 512 (0x200) encountered.
Unknown field with tag 513 (0x201) encountered.
Unknown field with tag 514 (0x202) encountered.
Unknown field with tag 515 (0x203) encountered.
```

- TIFFReadDirectory

| tag | for                         |
| --- | --------------------------- |
| 512 | JPEGProc                    |
| 513 | JPEGInterchangeFormat       |
| 514 | JPEGInterchangeFormatLength |
| 515 | JPEGRestartInterval         |

- JPEG-in-TIFF
- Accusoft ImageGear.NET
- https://help.accusoft.com/ImageGear-Net/v22.1/Windows/HTML/topic367.html

```bash
identify -verbose file.tif
exiftool file.tif
```
