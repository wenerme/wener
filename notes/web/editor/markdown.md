---
title: Markdown
---

# Markdown

- [markedjs/marked](https://github.com/markedjs/marked)
- A markdown parser and compiler
- [syntax-tree/mdast](https://github.com/syntax-tree/mdast)
- [remark.js.org](https://remark.js.org/)
- [MDX AST](https://mdxjs.com/advanced/ast)
- [MDX Playground](https://mdxjs.com/playground)
- Content as structured data
  - [unifiedjs](https://unifiedjs.com/)
- [StackOverflow: Runnable code snippets](https://stackoverflow.blog/2014/09/16/introducing-runnable-javascript-css-and-html-code-snippets/)

```md
<!-- begin snippet: js hide: false console: true babel: false -->

<!-- language: lang-css -->

    .container {
      overflow-y: scroll;
      overscroll-behavior-y: contain;
      scroll-snap-type: y mandatory;
    }

    .container > div > div:last-child {
      scroll-snap-align: end;
    }

    .container > div > div {
      background: lightgray;
      height: 3rem;
      font-size: 1.5rem;
    }
    .container > div > div:nth-child(2n) {
      background: gray;
    }

<!-- language: lang-html -->

    <div class="container" style="height:6rem">
    <div>
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    </div>
    </div>

<!-- end snippet -->
```
