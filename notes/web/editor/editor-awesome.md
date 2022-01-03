---
title: Editor Awesome
tags:
  - Awesome
---

# Editor Awesome

- [ekzhang/rustpad](https://github.com/ekzhang/rustpad)
  minimal collaborative code editor
  - MIT, Rust

## Web Editor

- [prosemirror](https://github.com/ProseMirror/prosemirror)
- [quilljs/quill](https://github.com/quilljs/quill)
  - Quill is a modern WYSIWYG editor built for compatibility and extensibility.
  - [zenoamaro/react-quill](https://github.com/zenoamaro/react-quill)
- [tinymce/tinymce](https://github.com/tinymce/tinymce)
  - The world's most popular JavaScript library for rich text editing
- [draft.js](https://github.com/facebook/draft-js)
  - 使用 immutable-js 管理状态
  - [sstur/react-rte](https://github.com/sstur/react-rte)
  - [jpuri/react-draft-wysiwyg](https://github.com/jpuri/react-draft-wysiwyg)
- [ianstormtaylor/slate](https://github.com/ianstormtaylor/slate)
- https://ckeditor.com/
- https://github.com/JefMari/awesome-wysiwyg
- [sofish/pen](https://github.com/sofish/pen)
  - enjoy live editing (+markdown)
- [lovasoa/react-contenteditable](https://github.com/lovasoa/react-contenteditable)
  - React ContentEditable

## Markdown

- [outline/rich-markdown-editor](https://github.com/outline/rich-markdown-editor)
  - Outline Prosemirror 编辑器
  - 支持 `/` 命令
  - 类 block 编辑器
- [Tencent/cherry-markdown](https://github.com/Tencent/cherry-markdown)

## Block

- [codex-team/editor.js](https://github.com/codex-team/editor.js)
  - Apache-2.0, Typescript
- [appleple/smartblock](https://github.com/appleple/smartblock)
  - React+ProseMirror
  - 不活跃
- [WordPress/gutenberg](https://github.com/WordPress/gutenberg)
  - [Automattic/isolated-block-editor](https://github.com/Automattic/isolated-block-editor)
    - 去除 WordPress 依赖
- [tobi4120/notion-clone](https://github.com/tobi4120/notion-clone)
- [portabletext/portabletext](https://github.com/portabletext/portabletext)
  - Sanity.io 定义的规范
- [NotionX/react-notion-x](https://github.com/NotionX/react-notion-x)

## Page Builder

- [react-page/react-page](https://github.com/react-page/react-page)
  Next-gen, highly customizable content editor for the browser - based on React and Redux. WYSIWYG on steroids.
  - MIT, TypeScript+React
  - 整页编辑

## IDE/Code

- codemirror
- [DTStack/molecule](https://github.com/DTStack/molecule)

## Misc

- [viebel/klipse](https://github.com/viebel/klipse)
  - eval languages

# FAQ

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
- https://jekyllrb.com/docs/front-matter/
- https://gohugo.io/content-management/front-matter/
- https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#markdown-frontmatter
- [jonschlinkert/gray-matter](https://github.com/jonschlinkert/gray-matter)

```mdx title="yaml front matter"
---
title: abc
---
```
