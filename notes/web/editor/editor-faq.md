---
tags:
  - FAQ
---

# Editor FAQ

## Lexical vs TiptapV2 vs DraftJS vs SlateJS

- lexical - ![lexical](https://badgen.net/bundlephobia/min/lexical)
  - reconcile dom
  - 体积小
  - 借鉴 Draft, Slate, ProseMirror 实现
  - 默认支持 Markdown
  - 基础体验比 tiptap 好
    - TextNode 支持 format、style - 在 tiptap 里需要很多 extension
  - 不够成熟
    - 部分功能欠缺 - draggable block
    - 社区生态
- tiptap - starter-kit ![@tiptap/starter-kit](https://badgen.net/bundlephobia/min/@tiptap/starter-kit) + 80kB @tiptap/react (@popperjs/core,tippy.js)
  - 基于 prosemirror
    - 生态好
    - 基础体积大
    - 更加 low level - 基础格式语义也要通过 Extension 实现
      - schema 可扩展
  - tiptap v1 vue -> tiptap v2 + binding
  - React 体验弱于 lexical
  - 可能需要和 prosemirror 打交道
    - 学习曲线高
  - 依赖大量 Extension
- SlateJS - ![slate](https://badgen.net/bundlephobia/min/slate)
  - 开发不活跃
  - 原生 React
- DraftJS - ![draft-js](https://badgen.net/bundlephobia/min/draft-js)
  - Web 早期 - contentEditable 跨浏览器不好，很多额外处理
  - React 早期 - 对 React 18+ 不友好 - 性能差
  - ImmutableJS didn't scale well

## 处理从 MS Word 粘贴的问题

- 读取 text/rtf，解析内容，转换

```bash
osascript -e 'the clipboard as record' | less
```

- [codex-team/editor.js#729](https://github.com/codex-team/editor.js/issues/729)

## Modeline

```ini
# vim: ts=2 sw=2 et
```

- vim http://vim.wikia.com/wiki/Modeline_magic

## Frontmatter

```mdx title="yaml front matter"
---
title: abc
---
```

- https://jekyllrb.com/docs/front-matter/
- https://gohugo.io/content-management/front-matter/
- https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#markdown-frontmatter
- [jonschlinkert/gray-matter](https://github.com/jonschlinkert/gray-matter)
