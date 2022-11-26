---
title: PDF
---

# PDF

- [Portable Document Format](https://en.wikipedia.org/wiki/Portable_Document_Format)
- [PDF Reference](http://www.adobe.com/devnet/pdf/pdf_reference.html)
- [PDF Hacks](http://www.pdfhacks.com/)
- [Introduction to PDF](https://web.archive.org/web/20141010035745/http://gnupdf.org/Introduction_to_PDF)
- [PDF Readers](http://pdfreaders.org/)
- [PDF processing and analysis with open-source tools](https://www.bitsgalore.org/2021/09/06/pdf-processing-and-analysis-with-open-source-tools)

## Tools

- poppler
- pdf2image
- pdftohtml
- xpdf

```bash
brew install poppler

pdfseparate document.pdf %d.pdf
```

## Spec

## FAQ

### 水印处理逻辑

- 水印可能会添加一个带 URL 的 Annotation
- 直接在 CONTENTS 的 Steam 中添加内容
