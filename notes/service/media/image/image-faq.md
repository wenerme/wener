---
tags:
  - FAQ
---

# Image FAQ

```bash
# HEIC -> jpg
# -strip 移除元数据
mogrify -strip -format jpg *.HEIC
```

## icns

```bash
sips -g all icons.icns
# iconutil --convert iconset your-icon.icns --output output-folder

png2icns app-icon.icns favicon-16x16.png favicon-32x32.png

convert favicon.svg -define icon:auto-resize=64,48,32,16 favicon.ico
```

```bash
mkdir icon.iconset

convert appicon.png -resize 16x16 icon.iconset/icon_16x16.png
convert appicon.png -resize 32x32 icon.iconset/icon_16x16@2x.png
convert appicon.png -resize 32x32 icon.iconset/icon_32x32.png
convert appicon.png -resize 64x64 icon.iconset/icon_32x32@2x.png
convert appicon.png -resize 128x128 icon.iconset/icon_128x128.png
convert appicon.png -resize 256x256 icon.iconset/icon_128x128@2x.png
convert appicon.png -resize 256x256 icon.iconset/icon_256x256.png
convert appicon.png -resize 512x512 icon.iconset/icon_256x256@2x.png
convert appicon.png -resize 512x512 icon.iconset/icon_512x512.png
convert appicon.png -resize 1024x1024 icon.iconset/icon_512x512@2x.png

sips -z 16 16     appicon.png --out icon.iconset/icon_16x16.png
sips -z 32 32     appicon.png --out icon.iconset/icon_16x16@2x.png
sips -z 32 32     appicon.png --out icon.iconset/icon_32x32.png
sips -z 64 64     appicon.png --out icon.iconset/icon_32x32@2x.png
sips -z 128 128   appicon.png --out icon.iconset/icon_128x128.png
sips -z 256 256   appicon.png --out icon.iconset/icon_128x128@2x.png
sips -z 256 256   appicon.png --out icon.iconset/icon_256x256.png
sips -z 512 512   appicon.png --out icon.iconset/icon_256x256@2x.png
sips -z 512 512   appicon.png --out icon.iconset/icon_512x512.png
sips -z 1024 1024 appicon.png --out icon.iconset/icon_512x512@2x.png

iconutil --convert icns icon.iconset
```

## PSNR

- Peak signal-to-noise ratio
- 信噪比
- 评估图像质量的一种方法
