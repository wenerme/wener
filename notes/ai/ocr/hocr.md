---
title: hOCR
---

# hOCR

- HTML, 利用 class 和 title 属性来存储 OCR 的元数据（坐标、置信度、层级结构）
- https://github.com/kba/hocr-spec
- http://kba.github.io/hocr-spec/1.2/
- 参考
  - pdfsandwich
  - ocrmypdf

```
box LEFT TOP RIGHT BOTTOM
baseline [+/- DECIMAL_FLOAT] [+/- INT]
textangle [+/- DECIMAL_FLOAT]
```

```html
<div class="ocr_page" id="page_1">
  <div class="ocr_carea" id="column_2" title="bbox 313 324 733 1922">
    <div class="ocr_par" id="par_7">...</div>
    <div class="ocr_par" id="par_19">...</div>
  </div>
</div>
```

```
ocr_document
  ocr_linear
    ocr_title
    ocr_author
    ocr_abstract
    ocr_part [<H1>]
      ocr_chapter [<H1>]
        ocr_section [<H2>]
          ocr_sub*section [<H3>,<H4>]
            ocr_display
            ocr_blockquote [<BLOCKQUOTE>]
            ocr_par [<P>]
```
