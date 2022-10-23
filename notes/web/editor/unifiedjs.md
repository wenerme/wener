---
title: unifiedjs
---

# unifiedjs

- [unifiedjs/unified](https://github.com/unifiedjs/unified)
  - interface for parsing, inspecting, transforming, and serializing content through syntax trees
- [learn](https://unifiedjs.com/learn/)
- 主要处理模块
  - retext - natural language
  - [remark](https://remark.js.org/) - markdown
    - https://github.com/remarkjs/remark/blob/main/doc/plugins.md
  - rehype - HTML
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
