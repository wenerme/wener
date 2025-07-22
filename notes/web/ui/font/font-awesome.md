---
title: Awesome Font
tags:
  - Awesome
---

# Awesome Font

:::tips

- Sans Serif - 无衬线字体
  - 适用于 UI、网页、文档等
  - 字体更简洁，易于阅读
  - 例如: Arial, Helvetica, Roboto, Open Sans, Noto Sans, 微软雅黑, 思源黑体
- Serif - 有衬线字体
  - 适用于印刷、书籍、报纸等
  - 字体更传统，具有装饰性
  - 例如: Times New Roman, Georgia, Baskerville, 楷体, 宋体, 仿宋
- Monospace - 等宽字体
  - 适用于代码编辑器、终端等
  - 每个字符占用相同宽度，便于对齐和阅读
  - 例如: Courier New, Consolas, Monaco, Fira Code, JetBrains Mono, Cascadia Code, LXGW WenKai Mono
- Handwriting - 手写体
  - 适用于个性化、艺术设计等
  - 字体模仿手写风格，具有独特性
  - 例如: Pacifico, Dancing Script, Indie Flower, 微软正黑体
- Display - 展示字体
  - 适用于标题、标志、广告等
  - 字体设计独特，具有视觉冲击力
  - 例如: Lobster, Bebas Neue, Playfair Display

:::

- otf,ttf,woff,woff2
- [ryanoasis/nerd-fonts](https://github.com/ryanoasis/nerd-fonts)
  - Iconic font aggregator, collection, & patcher. 3,600+ icons, 50+ patched fonts
- [Inter typeface family](https://rsms.me/inter)
  - [rsms/inter](https://github.com/rsms/inter)
- [Google fonts](https://fonts.google.com)
- https://fonts.bunny.net/
- PL - PowerLine
- [codingfont](https://www.codingfont.com/)
- Index
  - [fontsource/fontsource](https://github.com/fontsource/fontsource)
    - https://fontsource.org/
    - Self-host Open Source fonts in neatly bundled NPM packages.
  - https://github.com/jaywcjlove/free-font
- 阿里巴巴普惠体
  - https://ics.alibaba.com/font/alibaba-sans
  - https://github.com/liruifengv/alibaba-puhuiti/blob/master/index.html
- Montserrat
  - https://github.com/googlefonts/Montserrat
  - https://github.com/JulietaUla/Montserrat
  - https://fonts.google.com/specimen/Montserrat
- Coding
  - [microsoft/cascadia-code](https://github.com/microsoft/cascadia-code)
  - [source-code-pro](https://github.com/adobe-fonts/source-code-pro)
    - Source Code Pro
- Source Han Sans - 思源黑体
  - Adobe 和 Google 联合开发的开源字体
- 参考
  - [VSC 配置倾斜字体](https://stackoverflow.com/questions/41320848)

| abbr. | stand for             | meaning    |
| ----- | --------------------- | ---------- |
| Mono  |                       | 等宽字体   |
| NF    | Nerd Font             | 包含图标   |
| CN    | Chinese               | 中文字体   |
| CL    | Classical orthography | 古典正体   |
| SF    | Slab-serif            | 厚边字体   |
| QP    | Quasi-proportional    | 准比例字体 |

```bash
# macOS 查看系统字体
fc-list : file family
fc-list : family
```

## Code

- [Fira Code](https://github.com/tonsky/FiraCode)
  - 字体饱满，需要更大屏幕空间
  - 适用于 IDE - 字号较大，同屏文字少
  - 基于 Mozilla Fira Mono
- [JetBrains Mono](https://github.com/JetBrains/JetBrainsMono)
  - 接近 Consolas，强调阅读的流畅感，兼顾辨识度
  - 适用于 文本编辑器 - 字号较小，同屏文字多
- [Cascadia Code](https://github.com/microsoft/cascadia-code)
  - 辨识度强，大小写区分感强，符号区分感强
  - 适用于 命令行 - 每行文字较多，需要强调行距感
  - 来自微软
- [be5invis/Iosevka](https://github.com/be5invis/Iosevka)
  - sans-serif + slab-serif, monospace + quasi‑proportional
  - Iosevka
- Menlo
  - 会连 fi - 导致代码视觉上未对齐

## Monospace

> 写代码推荐 等宽黑体字体

- 等宽字体
- 中文:英文 = 2:1
- [lxgw/LxgwWenKai](https://github.com/lxgw/LxgwWenKai)
  - LXGW WenKai Mono
- [subframe7536/maple-font](https://github.com/subframe7536/maple-font)
  - Maple Mono
- [be5invis/Sarasa-Gothic](https://github.com/be5invis/Sarasa-Gothic)
  - Sarasa Gothic = Inter + Iosevka + Source Han Sans
  - 更纱黑体
  - 比 Maple Mono 窄一点
- Ubuntu Mono
- Inconsolata
- Iosevka
- Noto Sans Mono ExtraCondensed
- 中易宋体
- 中易黑体
- M+ 1m/2m/1mn
- 文泉驿等宽正黑
- 思源黑体HW
- Noto Sans CJK Mono
- Nanum Gothic Coding
- D2 Coding
- Fixedsys
- Xanh Mono
- Input Mono Compressed
- monofur
- MS Gothic

```bash
# Sarasa Gothic
brew install font-sarasa-gothic

# LXGW WenKai Mono
brew install font-lxgw-wenkai

# Maple Mono
# Maple Mono NF
# Maple Mono NF CN
brew install --cask font-maple-mono
brew install --cask font-maple-mono-nf
brew install --cask font-maple-mono-nf-cn
```

## Emoji

- https://icones.js.org/
- [googlefonts/noto-emoji](https://github.com/googlefonts/noto-emoji)
- [microsoft/fluentui-emoji](https://github.com/microsoft/fluentui-emoji)
- Note 黑白 Emoji https://fonts.google.com/noto/specimen/Noto+Emoji
  - [What is black and white and read all over?](https://developers.googleblog.com/2022/04/what-is-black-and-white-and-read-all.html)
- [hfg-gmuend/openmoji](https://github.com/hfg-gmuend/openmoji)
  - CC BY-SA 4.0 [#155](https://github.com/hfg-gmuend/openmoji/issues/155)
    - BY - 要求申明出处
    - SA - 保护修改 - 修改需要开放
  - 所有 [openmoji](https://hfg-gmuend.github.io/openmoji/)
  - [HN](https://news.ycombinator.com/item?id=28403672)
- [twitter/twemoji](https://github.com/twitter/twemoji)
- https://emojipedia.org/
- [Full Emoji List](https://unicode.org/emoji/charts/full-emoji-list.html)
- [emoji-cheat-sheet](https://www.webfx.com/tools/emoji-cheat-sheet/)
- https://tikolu.net/emojimix/
- https://joypixels.com/fonts

## Unicode

- [GNOME/gucharmap](https://gitlab.gnome.org/GNOME/gucharmap)
  - Unicode Character Map
- ufas [UNICODE FONTS FOR ANCIENT SCRIPTS](https://dn-works.com/ufas/)

## variable fonts

- font-variation-settings
- wght - weight
- wdth - width
- slnt - slant
- ital - italic
- opsz - optical size
- e.g.
  - Noto
  - Roboto
- https://fonts.google.com/specimen/Roboto+Flex
  - 有 10+ 可变维度
- https://fonts.google.com/knowledge/introducing_type/introducing_variable_fonts
- https://developers.google.com/web/fundamentals/design-and-ux/typography/variable-fonts
- https://variablefonts.typenetwork.com
- https://medium.com/variable-fonts

---

- https://theblog.adobe.com/can-variable-fonts-illustrator-cc
- https://helpx.adobe.com/nz/photoshop/using/fonts.html#variable_fonts

---

- https://developers.google.com/fonts/docs/getting_started
- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide
- https://developer.microsoft.com/en-us/microsoft-edge/testdrive/demos/variable-fonts

## font glyph

- https://chinese-font.netlify.app/
- https://github.com/allanguys/font-spider-plus
