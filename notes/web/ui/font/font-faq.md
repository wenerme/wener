---
tags:
  - FAQ
---

# Font FAQ

## ttc

- ttc - TrueType Collection
- 节省空间

## ttf vs otf vs woff vs woff2 vs eot

> 现代 Web 浏览器可以考虑使用 woff2

- ttf - TrueType Font
  - by 苹果
  - 20世纪80年代末
  - 兼容最好
  - 支持大多数操作系统和浏览器
  - 字体文件较大
- otf - OpenType Font
  - by 微软, Adobe
  - TrueType 的扩展
  - 支持 TrueType 和 PostScript 字体
  - 支持更复杂的排版功能
    - 连字（ligatures）、样式集（stylistic sets）和多语言字符
  - 更高级的图形和排版控制
  - 文件大小比 TTF 略大，但功能更丰富
- woff - Web Open Font Format
  - by Mozilla
  - Chrome 5+, Safari 5.1+
  - 专为网页设计
  - 基于 TTF/OTF 文件
  - 包含压缩和元数据
  - 提高了网页字体的加载速度
  - 支持现代浏览器
- woff2 - Web Open Font Format 2
  - by Mozilla
  - Chrome 36+, Safari 14+
  - WOFF 的改进版
  - 更高的压缩率
  - 提供更快的加载时间和更小的文件大小
  - 支持大多数现代浏览器
  - 建议用于网页字体的最佳格式
- eot - Embedded OpenType
  - by 微软
  - 专为 Internet Explorer 设计
  - 支持 IE4+ 浏览器
  - 包含基本的压缩
  - 已逐渐被 WOFF 和 WOFF2 取代
- COLR/CPAL(v0)
  - Chrome 71+, Safari 11
  - 支持彩色矢量字体
  - COLR 表示彩色字形，CPAL 表示调色板
  - 由 Google 和 Microsoft 提出
  - 适用于 Chrome 71+ 和 Safari 11+
  - 允许使用简单的矢量图形来表示彩色字体
- COLR/CPAL(v1)
  - Chrome 98+, ~~Safari~~
  - COLR/CPAL 的扩展版本
  - 支持更复杂的图形特性，如渐变和混合模式
  - 由 Google 提出
  - 适用于 Chrome 98+，目前 Safari 不支持
  - 提供更丰富的彩色字体效果

---

- https://caniuse.com/woff2

## 热门字体

- Montserrat
- Open Sans
- Raleway
- Roboto
- Bebas Neue
- Great Vibes
- Alex Brush
- Lato
- Quicksand
- Pacifico
- Amatic
- Oswald
- ChunkFive
- Aller
- Source Sans Pro
- Allura
- Kaushan Script
- Lobster
- GoodDog
- Ostrich Sans
- Milkshake
- Grand Hotel
- Playfair Display
- League Gothic
- Black Jack
- Cooper Hewitt
- Dancing Script OT
- Poppins
- Caviar Dreams
- Bebas
- PT Sans
- Titillium
- Learning Curve Pro
- Josefin Sans
- Sofia
- Exo
- Antonio
- Windsong
- Lobster Two
- FFF Tusj
- Arizonia
- League Spartan
- Fira Sans
- SeasideResort
- Red Hat
- Museo Slab
- Intro Rust
- Abril Fatface
- Sofia Pro
- Walkway

---

- https://www.fontsquirrel.com/fonts/list/popular
