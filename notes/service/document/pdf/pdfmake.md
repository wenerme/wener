---
title: pdfmake
---

# pdfmake

- [bpampuch/pdfmake](https://github.com/bpampuch/pdfmake)
  - MIT, JS

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
