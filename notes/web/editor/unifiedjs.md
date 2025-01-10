---
title: unifiedjs
---

# unifiedjs

- [unifiedjs/unified](https://github.com/unifiedjs/unified)
  - interface for parsing, inspecting, transforming, and serializing content through syntax trees
- [learn](https://unifiedjs.com/learn/)
- 主要处理模块
  - retext - natural language
  - [remarkjs/remark](https://github.com/remarkjs/remark)
    - https://remark.js.org/ - markdown
    - https://github.com/remarkjs/remark/blob/main/doc/plugins.md
  - [rehype/rehype](https://github.com/rehypejs/rehype) - HTML
  - [micromark/micromark](https://github.com/micromark/micromark)
    - commonmark (optionally gfm) compliant markdown parser
    - 如果只需要 markdown -> HTML
- [vfile](https://github.com/vfile/vfile)
  - Virtual file format for text processing
- mdast-util-to-hast
- AST - 语法树结构
  - [unist](https://github.com/syntax-tree/unist)
    - Universal Syntax Tree
    - 基础 AST - 其他 AST 扩展于该 AST
    - Node
      - type
      - data
      - position: Position
        - start: Point
          - line, column, offset
        - end, indent
    - Parent extends Node
      - `children: Node[]`
    - Literal extends Node
      - value: any
  - [mdast](https://github.com/syntax-tree/mdast)
    - Markdown Abstract Syntax Tree
  - [hast](https://github.com/syntax-tree/hast)
    - HTML, SVG, MathML
    - Hypertext Abstract Syntax Tree
  - nlcst - for natural language
  - xast - for XML
- [micromark](https://github.com/micromark/micromark)
  - state machine
  - 替代 remark-parse
  - SyntaxExtension
  - HtmlExtension

```ts
import { micromark } from 'micromark';
import { gfm, gfmHtml } from 'micromark-extension-gfm';

const value = '* [x] done';

const result = micromark(value, {
  extensions: [gfm()],
  htmlExtensions: [gfmHtml()],
});

// 输出 HTML
console.log(result);
```

- MDN
  - https://github.com/mdn/yari/tree/main/markdown
- mdxhast
- recma - Remark (re) and ECMAScript (ecma).
  - 用于转换 [esast](https://github.com/syntax-tree/esast)

## remark

- remark-parse - markdown -> mdast
- remark-stringify - mdast -> markdown
- remark-gfm - GitHub Flavored Markdown
- remark-toc - Table of Contents
- remark-slug - slugify headings
- remark-html - mdast -> HTML

---

- 插件列表
  - https://github.com/remarkjs/remark/blob/main/doc/plugins.md
- docusaurus 的 md 处理逻辑
  - https://github.com/facebook/docusaurus/blob/main/packages/docusaurus-mdx-loader/src/processor.ts

## rehype

## ref

- https://www.npmjs.com/package/next-mdx-remote

## vfile

- [vfile](https://github.com/vfile/vfile)
  - Virtual file format for text processing
