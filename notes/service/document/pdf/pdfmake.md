---
title: pdfmake
---

# pdfmake

- [bpampuch/pdfmake](https://github.com/bpampuch/pdfmake)
  - MIT, JS
  - 使用 pdfkit, xmldoc 生成 PDF

:::caution

- 图片只支持 JPEG 和 PNG 格式
  - 因为 pdfkit 只支持这两种格式 https://pdfkit.org/docs/images.html

:::

```ts
// PdfPrinter 用于 Node.js
import PdfPrinter from 'pdfmake';

// createPdf 用于浏览器
import createPdf from 'pdfmake/build/pdfmake';

// 文档内容
import type { TDocumentDefinitions } from 'pdfmake/interfaces';
```

```ts
export type Content =
  | string // =ContentText
  | number
  | Content[] // =ContentStack
  | ContentText
  | ContentColumns
  | ContentStack
  | ContentUnorderedList
  | ContentOrderedList
  | ContentTable
  | ContentAnchor
  | ContentPageReference
  | ContentTextReference
  | ContentToc
  | ContentTocItem
  | ContentImage
  | ContentSvg
  | ContentQr
  | ContentCanvas;
```
