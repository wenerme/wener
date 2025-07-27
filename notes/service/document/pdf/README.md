---
title: PDF
---

# PDF

- analyzer/debugger
  - [hyzyla/pdf-debugger](https://github.com/hyzyla/pdf-debugger)
    - 显示 pdfjs 的解析结果
  - https://github.com/itext/i7j-rups (java -jar ~/Downloads/itext-rups-7.2.5.jar)
  - https://github.com/desgeeko/pdfsyntax (python3 -m pdfsyntax inspect foo.pdf > output.html)
  - https://github.com/trailofbits/polyfile (polyfile --html output.html foo.pdf)
  - https://www.reportmill.com/snaptea/PDFViewer/ = https://www.reportmill.com/snaptea/PDFViewer/pviewer.html (drag PDF onto it)
  - https://sourceforge.net/projects/pdfinspector/ (an "example" of https://superficial.sourceforge.net/)
  - https://www.o2sol.com/pdfxplorer/overview.htm
  - Mutool
- 工具/命令/tools/commands
  - [poppler-utils](https://poppler.freedesktop.org/)
    - `pdftotext`, `pdfinfo`, `pdfimages`, `pdftohtml`, `pdftoppm`, `pdftops`, `pdfseparate`, `pdfunite`
  - [imagemagick](https://github.com/imagemagick/imagemagick)
    - GPLv3, C
    - 开源图像处理工具，支持 PDF 转图片等操作
    - [ImageMagick](https://imagemagick.org/)
  - [qpdf](https://github.com/qpdf/qpdf)
    - Apache-2.0, C++
    - PDF 文件结构分析、修复和加密/解密工具
  - [pdftk](https://www.pdflabs.com/tools/pdftk-the-pdf-toolkit/)
    - PDF 拆分、合并、加密、解密等多功能工具
  - [img2pdf](https://github.com/josch/img2pdf)
    - LGPLv3, Python
    - 将图片无损转换为 PDF 的命令行工具
- 解析/Reader
  - [mozilla/pdf.js](https://github.com/mozilla/pdf.js)
    - Apache-2.0, JS
  - [modesty/pdf2json](https://github.com/modesty/pdf2json)
    - Apache-2.0, JS
  - [adrienjoly/npm-pdfreader](github.com/adrienjoly/npm-pdfreader)
    - MIT, JS
    - Parse text and tables from PDF
  - ~~[autokent/pdf-parse](https://gitlab.com/autokent/pdf-parse)~~
    - MIT, JS
  - [smalot/pdfparser](https://github.com/smalot/pdfparser)
    - LGPLv3, PHP
- 生成/模板
  - [bpampuch/pdfmake](https://github.com/bpampuch/pdfmake)
    - MIT, JS
    - 结构化数据生成 PDF
    - pdfkit, xmldoc
  - [foliojs/pdfkit](https://github.com/foliojs/pdfkit)
    - MIT, JS
    - PDF 生成
    - fontkit, png-js, jpeg-js, crypto-js
  - [React PDF](./react-pdf.md)
    - yogo+pdfkit
- 渲染/render/显示
  - [wojtekmaj/react-pdf](https://github.com/wojtekmaj/react-pdf)
    - MIT, TS, React
    - pdfjs
  - [Laomai-codefee/pdfjs-annotation-extension](https://github.com/Laomai-codefee/pdfjs-annotation-extension)
    - Apache-2.0, TS
- [Portable Document Format](https://en.wikipedia.org/wiki/Portable_Document_Format)
- [PDF Reference](http://www.adobe.com/devnet/pdf/pdf_reference.html)
- [PDF Hacks](http://www.pdfhacks.com/)
- [Introduction to PDF](https://web.archive.org/web/20141010035745/http://gnupdf.org/Introduction_to_PDF)
- [PDF Readers](http://pdfreaders.org/)
- [PDF processing and analysis with open-source tools](https://www.bitsgalore.org/2021/09/06/pdf-processing-and-analysis-with-open-source-tools)

```bash
# ImageMagick
# 第1页  PDF -> PNG
convert -density 300 input.pdf[0] output.png
convert -density 300 input.pdf[0-3] "output-%d.png"

# 有些 PDF 文档有问题
# -flatten
convert -density 300 input.pdf[0,1,-2,-1] -background white "output-%d.png"

# Poppler
# https://poppler.freedesktop.org/
apt-get install poppler-utils # Debian/Ubuntu
brew install poppler          # macOS
# 文件-1.png
pdftoppm -png 文件{.pdf,}

# 检查
# ==========
qpdf --check input.pdf
gs -o /dev/null -sDEVICE=nullpage input.pdf # Ghostscript 深度渲染检查
verapdf --flavour 1b input.pdf              # VeraPDF 专业标准验证
# 部分修复
qpdf --empty --pages input.pdf -- repaired.pdf
mutool clean -gggg input.pdf repaired.pdf # apk add mupdf-tools

# 基本信息
pdfinfo input.pdf # poppler-utils
```

```
Title:           build.0
Author:          https://imagemagick.org
Creator:         https://imagemagick.org
Producer:        https://imagemagick.org
CreationDate:    Fri Jul 25 14:03:54 2025 CST
ModDate:         Fri Jul 25 14:03:54 2025 CST
Custom Metadata: no
Metadata Stream: no
Tagged:          no
UserProperties:  no
Suspects:        no
Form:            none
JavaScript:      no
Pages:           2
Encrypted:       no
Page size:       558.48 x 769.2 pts
Page rot:        0
File size:       2437384 bytes
Optimized:       no
```

## Tools

- poppler
- pdf2image
- pdftohtml
- xpdf

```bash
brew install poppler

pdfseparate document.pdf %d.pdf
```

# Spec

| ver     | year | Acrobat ver | 主要新特性和里程碑                                                                                                                              |
| :------ | :--- | :---------- | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| **1.0** | 1993 | Acrobat 1.0 | 文本、矢量图形、光栅图像（JPEG, LZW）、设备无关性。                                                                                             |
| **1.1** | 1994 | Acrobat 2.0 | **增强交互性**: 引入链接、注释（Notes）、**密码保护**（40位 RC4）、设备无关色彩。                                                               |
| **1.2** | 1996 | Acrobat 3.0 | **功能扩展**: 交互式表单（AcroForms）、CMYK和专色支持、鼠标事件、外部电影链接。                                                                 |
| **1.3** | 1999 | Acrobat 4.0 | **印刷与动态内容**: 引入**数字签名**、**JavaScript**、ICC色彩配置文件、平滑着色（Smooth Shading）。                                             |
| **1.4** | 2001 | Acrobat 5.0 | **图形透明度**: 引入**透明度 (Transparency)** 模型、JBIG2 压缩（高效黑白压缩）、128位 RC4 加密、初步的“标签化PDF”（Tagged PDF）以支持可访问性。 |
| **1.5** | 2003 | Acrobat 6.0 | **性能与多媒体**: 引入**对象流**（压缩多个PDF对象）、JPEG 2000 压缩、图层（可选内容组, OCG）。                                                  |
| **1.6** | 2004 | Acrobat 7.0 | **富媒体与字体**: 支持嵌入 OpenType 字体、嵌入3D图稿（U3D格式）、AES 加密。                                                                     |
| **1.7** | 2006 | Acrobat 8.0 | ISO 32000-1:2008, 成为国际标准, 增加了更多的注释类型、打印机预设等                                                                              |
| **2.0** | 2017 | -           | ISO 32000-2:2017, 移除私有元素, 改进了**数字签名**（PAdES）、附件处理、地理空间参考、3D数据（PRC格式）、改进的标签化和可访问性。                |
| **2.0** | 2020 | -           | ISO 32000-2:2020                                                                                                                                |

- PDF 1.0 到 1.6，PDF 规范完全由 Adobe 公司控制和发布
- PDF 1.7, ISO 32000-1 - Adobe 主导, ISO 管理
- PDF 2.0 - 由 ISO 委员会内部开发和发布
- 子集标准 (Subsets)
  - **PDF/A**: 用于长期**存档** (Archiving)。
  - **PDF/X**: 用于高端**印刷**和图形交换 (eXchange)。
  - **PDF/E**: 用于工程文档 (Engineering)。
  - **PDF/UA**: 用于确保通用可访问性 (Universal Accessibility)。
- 参考
  - https://pdfa.org/
  - ISO 32000-2:2020 https://pdfa.org/announcing-no-cost-access-to-iso-32000-2-pdf-2-0/
    - 可免费下载 by Adobe, Apryse, Foxit
- Objects - 对象
  - Boolean, Numberic, String, Name, Array, Dictionary, Stream, Null, Indirect
  - Name - `/Type`
  - Stream
    - /Length
    - /Filter
    - /DecodeParms
    - /F - file specification
    - /FFilter
    - /FDecodeParms
    - /DL - number of bytes in the decoded stream
  - Indirect - 对象编号/对象引用
    - `O G R`
    - O 对象编号
    - G Generation Number
    - R - 固定符号 `R`
    - `1 0 R` - 对象编号为 1，代号为 0 的对象引用
- File structure - 文件结构
  - 对象如何在 PDF 文件中存储、访问和更新。
  - Header, Body, Cross-reference table (xref), Trailer
  - Header `%%PDF-1.7`
  - Body - `Array<StreamObject | IndirectObject>`
  - Cross-reference table (xref)
    - 记录了每个对象在文件中的位置
    - information that permits random access to indirect objects
    - indirect object -> bytes offset in PDF file
    - Cross-reference streams
    - `xref` 开头，后跟对象编号和偏移量
    - `trailer` - 包含文档的元数据和其他信息
  - Trailer
    - `Size` - 对象总数
    - `Prev` - 前一个交叉引用表的偏移量, 如果不止一个 cross-reference section
    - `Root` - 文档的根对象 - catalog
    - `Encrypt`
    - `Info` - 文档信息字典
    - `ID` - 文档唯一标识符
  - Incremental updates
    - 通过在文档后面附加内容来更新 PDF
  - Object Stream
    - PDF 1.5+
    - a sequence of indirect objects may be stored, as an alternative to their being stored at the outermost PDF file level.
    - 更高效的存储和访问 - “compressed object”
    - `Type` ObjStm
    - `N`
    - `First` - byte offset
    - `Extends`
  - Cross-reference streams
    - Type
    - Size
    - Index
    - Prev
    - W
- Document structure - 文档结构
  - 描述了如何使用基本对象类型来表示 PDF 文件的组件（如页面、字体、注释等），以及整体的文档结构。
  - catalog
  - page tree - page - content stream
  - outline hierarchy - outline entry
  - structure tree - structure element
  - metadata reference
  - names dictionary - embedded files, javascript
  - interactive form
  - collection
  - infomation & controls
  - `Type` - Catalog
  - Version
  - Extensions
  - Pages
  - PageLabels
  - Names
  - Dests
  - ViewerPreferences
  - PageLayout
  - PageMode
  - Outlines
  - Threads
  - OpenAction
  - AA
  - URI
  - AcroForm
  - Metadata
  - StructTreeRoot
  - MarkInfo
  - Lang
  - SpiderInfo
  - OutputIntents
  - PieceInfo
  - OCProperties
  - Perms
  - Legal
  - Requirements
  - Collection
  - NeedsRendering
  - DSS
  - AF
  - DPartRoot
- Content streams - 内容流
  - 描述页面或其他图形实体外观的指令序列。这些指令虽然也表示为对象，但在概念上与表示文档结构的那些对象是截然不同的，并且是分开描述的。

| 编码/过滤器/Filter | 等同于     | 适用场景                                |
| :----------------- | :--------- | :-------------------------------------- |
| `DCTDecode`        | JPEG       | 彩色/灰度照片                           |
| `FlateDecode`      | PNG / ZIP  | PDF 1.2,截图、图表、Logo                |
| `CCITTFaxDecode`   | 传真 G3/G4 | 黑白扫描件                              |
| `JBIG2Decode`      | JBIG2      | PDF 1.4,黑白文本扫描件                  |
| `JPXDecode`        | JPEG 2000  | PDF 1.5,高质量照片、医学影像            |
| `Crypt`            |            | PDF 1.5, 用于解密由安全处理器加密的数据 |
| RunLengthDecode    |
| LZWDecode          |
| ASCII85Decode      |
| ASCIIHexDecode     |

| Font         | Subtype        | 描述                                                                     |
| :----------- | :------------- | :----------------------------------------------------------------------- |
| **Type 0**   | `Type0`        | (PDF 1.2) 复合字体 — 一种由后代 CIDFont 中的字形组成的字体。             |
| **Type 1**   | `Type1`        | 使用 Type 1 字体技术定义字形形状的字体。                                 |
|              | `MMType1`      | 多重主控字体 — Type 1 字体的扩展，允许从单个字体生成多种多样的字体样式。 |
| **Type 3**   | `Type3`        | 使用 PDF 图形操作符流来定义字形的字体。                                  |
| **TrueType** | `TrueType`     | 基于 TrueType 字体格式的字体，其字形描述基于 TrueType 字形技术。         |
| **CIDFont**  | `CIDFontType0` | (PDF 1.2) 一种 CIDFont，其字形描述基于 CFF 字体技术。                    |
|              | `CIDFontType2` | (PDF 1.2) 一种 CIDFont，其字形描述基于 TrueType 字形技术。               |

- CID - Character Identifier
  - 用于表示 CJK 字符集的字体
  - CIDFont - 字体类型
  - CIDSet - 字符集定义
- CFF - Compact Font Format
  - 用于 Type 0 字体的字形描述
  - 基于 PostScript 字体技术
- 中文文本位于 /Font/ToUnicode beginbfchar
  - ToUnicode 是 CID 信息, 可能 FlateDecode 压缩
  - beginbfchar
    - `<0001> <7535>` - 字符编码和对应的 Unicode 字符

---

- A4,300dpi
  - RAW 大约 33.2 MiB
  - PNG 黑白文本扫描件 0.5MB
- Linearized PDF（线性化PDF）
  - 为快速网络查看而优化
  - 影响 xref
  - 文件会大一点
- 参考
  - https://helpx.adobe.com/acrobat/kb/supported-file-formats-acrobat-reader.html
  - https://en.wikipedia.org/wiki/PDF#Imaging_model

# FAQ

## 水印处理逻辑

- 水印可能会添加一个带 URL 的 Annotation
- 直接在 CONTENTS 的 Steam 中添加内容

## 双面 PDF

没有双面 PDF，只有单面 PDF，通过打印机的双面打印功能实现。

扫描仪的双面扫描功能，只是将扫描的 PDF 文件进行了旋转合并。
