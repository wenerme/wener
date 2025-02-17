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
# 第1页  PDF -> PNG
convert -density 300 input.pdf[0] output.png
convert -density 300 input.pdf[0-3] "output-%d.png"
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

# FAQ

## 水印处理逻辑

- 水印可能会添加一个带 URL 的 Annotation
- 直接在 CONTENTS 的 Steam 中添加内容

## 双面 PDF

没有双面 PDF，只有单面 PDF，通过打印机的双面打印功能实现。

扫描仪的双面扫描功能，只是将扫描的 PDF 文件进行了旋转合并。
