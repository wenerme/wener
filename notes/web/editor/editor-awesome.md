---
title: Editor Awesome
tags:
  - Awesome
---

# Editor Awesome

## Web Editor

:::tip

- 推荐👍 Lexical, Tiptap, QuillJS
- React 优先建议选择 Lexical，否则考虑 tiptap/prosemirror

:::

- [prosemirror](./prosemirror/README.md)
  - 实现 Editor 的基础库
- [tiptap](./tiptap/README.md)
- [Hufe921/canvas-editor](https://github.com/Hufe921/canvas-editor)
  - MIT, TS
  - https://hufe.club/canvas-editor-docs/guide/schema.html
- React
  - [facebook/lexical](https://github.com/facebook/lexical)
    - by Facebook, 替代 draftjs
    - https://news.ycombinator.com/item?id=31019778
    - [ozanyurtsever/verbum](https://github.com/ozanyurtsever/verbum)
  - [udecode/plate](./plate.md)
    - MIT, TS, React
    - 基于 Slate
  - [slatejs](./slate.md)
  - [draft.js](./draftjs.md)
    - 使用 immutable-js 管理状态
    - [sstur/react-rte](https://github.com/sstur/react-rte)
    - [jpuri/react-draft-wysiwyg](https://github.com/jpuri/react-draft-wysiwyg)
  - [editablejs/editable](https://github.com/editablejs/editable)
    - Apache-2.0, TS, React
  - [lovasoa/react-contenteditable](https://github.com/lovasoa/react-contenteditable)
    - Apache-2.0, React ContentEditable
    - 非常简单的 ContentEditable 封装
  - [uiwjs/react-md-editor](https://github.com/uiwjs/react-md-editor)
    - MIT, TS
    - npm:@uiw/react-md-editor
- [slab/quill](https://github.com/slab/quill)
  - BSD-3, TS
  - Quill is a modern WYSIWYG editor built for compatibility and extensibility.
  - [zenoamaro/react-quill](https://github.com/zenoamaro/react-quill)
    - npm:react-quill
  - [gtgalone/react-quilljs](https://github.com/gtgalone/react-quilljs)
    - npm:react-quilljs
    - 建议拷贝出来用，就一个 hook
- [tinymce/tinymce](https://github.com/tinymce/tinymce)
  - **GPLv2**
  - The world's most popular JavaScript library for rich text editing
  - What happened to TinyMCE's license? [#9453](https://github.com/tinymce/tinymce/issues/9453)
    - TinyMCE v7 变更为 GPLv2
    - MIT -> GPLv2
    - [hugemce/hugemce](https://github.com/hugemce/hugemce)
  - CKEditor -> TinyMCE
    - 以前的迁移方向，现在 TinyMCE 也是 GPLv2 了
    - CKEditor license 问题
- [ckeditor/ckeditor5](https://github.com/ckeditor/ckeditor5)
  - GPLv2, JS
  - https://ckeditor.com/
- https://github.com/JefMari/awesome-wysiwyg
- [sofish/pen](https://github.com/sofish/pen)
  - enjoy live editing (+markdown)
- [benjamn/kix-standalone](https://github.com/benjamn/kix-standalone)
  - google doc editor - 2010 - archived
- [red-axe/am-editor](https://github.com/red-axe/am-editor)
  - 富文本实时协同编辑器框架
- Video
  - [redotvideo/revideo](https://github.com/redotvideo/revideo)
  - [motion-canvas/motion-canvas](https://github.com/motion-canvas/motion-canvas)

## Collaborative

- 主要功能
  - Text Editor / CRDT
  - Comment
  - Presence
  - Room

---

- yjs
- automerge
- [partykit/partykit](https://github.com/partykit/partykit)
  - MIT, TS
  - simplifies developing multiplayer applications
  - hosting platform for globally distributed, stateful, on-demand, programmable web servers
- [liveblocks/liveblocks](https://github.com/liveblocks/liveblocks)
  - Apache-2.0, TS
  - 只是客户端，不能 SelfHost [#682](https://github.com/liveblocks/liveblocks/issues/682)

## Image Editor

- [steffest/DPaint-js](https://github.com/steffest/DPaint-js)

## Media

- [layerhub-io/react-design-editor](https://github.com/layerhub-io/react-design-editor)
  - MIT, TS, React
  - Image, Presentation and Video editor. React design editor using fabric.js. Canva clone
- [shaongitbd/doory](https://github.com/shaongitbd/doory)
  - 浏览器设计编辑器、可自托管的 Canva 替代方案
  - React、TypeScript、Fabric.js；Django 后端
  - 模板、图层、协作编辑，支持图片、PDF 和视频导出
  - [Attribution Assurance License](https://github.com/shaongitbd/doory/blob/main/LICENSE)，注意署名要求及第三方素材许可
- [bharathreddyza/react-design-editor](https://github.com/bharathreddyza/react-design-editor)

## Code Editor

- [monaco](./monaco.md)
- [codemirror](http://codemirror.net/)
  - [adoption](https://codemirror.net/5/doc/realworld.html)
  - [We are rewriting CodeMirror](https://news.ycombinator.com/item?id=17858672)
- [satya164/react-simple-code-editor](https://github.com/satya164/react-simple-code-editor)
  - works by overlaying a syntax highlighted `<pre>` block over a `<textarea>`
  - 限制
    - 必须字体相同
    - undo 栈与浏览器不一致 - 大部分编辑器都有这样的问题
    - 没有针对性能优化 - 大文档会慢
- [Comparison of JavaScript-based source code editors](https://en.wikipedia.org/wiki/Comparison_of_JavaScript-based_source_code_editors)

## Flow Editor

- https://stately.ai/registry/new
  - XState

## Markdown

- [outline/rich-markdown-editor](https://github.com/outline/rich-markdown-editor)
  - Outline Prosemirror 编辑器
  - 支持 `/` 命令
  - 类 block 编辑器
- [Tencent/cherry-markdown](https://github.com/Tencent/cherry-markdown)
- [bytedance/bytemd](https://github.com/bytedance/bytemd)
  - Svelte
  - 提供 React, Vue
- [Milkdown/milkdown](https://github.com/Milkdown/milkdown)
  - MIT, TS, React
  - prosemirror+remark
- [panphora/overtype](https://github.com/panphora/overtype)
  - MIT, JS
  - markdown editor that's just a textarea
- HyperMD
  - CodeMirror
- TUI Editor
- EasyMDE
  - CodeMirror

## Hex

- https://hexed.it/
- [WerWolv/ImHex](https://github.com/WerWolv/ImHex)
  - GPLv2, C++

## Block

- [TypeCellOS/BlockNote](https://github.com/TypeCellOS/BlockNote)
  - MPLv2, TS, React
  - 基于 tiptap，prosemirror
  - UI mantine, shadcn
- [codex-team/editor.js](./editorjs.md)
  - Apache-2.0, Typescript
  - Native、不依赖框架 - gzip 50kB
  - [editor-js/awesome-editorjs](https://github.com/editor-js/awesome-editorjs)
- [Darginec05/Yoopta-Editor](https://github.com/Darginec05/Yoopta-Editor)
  - 基于 slate
- [appleple/smartblock](https://github.com/appleple/smartblock)
  - React+ProseMirror
  - 不活跃
- [WordPress/gutenberg](https://github.com/WordPress/gutenberg)
  - GPLv2, MPLv2
  - [Automattic/isolated-block-editor](https://github.com/Automattic/isolated-block-editor)
    - 去除 WordPress 依赖
  - [lukecav/awesome-blocks](https://github.com/lukecav/awesome-blocks)
    - for WordPress Gutenberg
- [tobi4120/notion-clone](https://github.com/tobi4120/notion-clone)
- 参考
  - https://open.feishu.cn/document/server-docs/docs/docs-overview
  - https://developers.notion.com/reference/block

## Builder

- Page Builder
- Report Builder
- Form Builder
- Component Builder
- 难点
  - 状态管理
  - 序列化
  - 框架集成
  - 数据接入

---

- [premieroctet/openchakra](https://github.com/premieroctet/openchakra)
- [plasmicapp/plasmic](https://github.com/plasmicapp/plasmic)
  - MIT, TS
- [BuilderIO/mitosis](https://github.com/BuilderIO/mitosis)
  - MIT, TS
  - React, Vue, Qwik, Solid, Angular, Svelte
- [prevwong/reka.js](https://github.com/prevwong/reka.js)
  - MIT, TS
  - State management system to build any no-code editor
- [prevwong/craft.js](https://github.com/prevwong/craft.js)
  - React
- [react-page/react-page](https://github.com/react-page/react-page)
  Next-gen, highly customizable content editor for the browser - based on React and Redux. WYSIWYG on steroids.
  - MIT, TypeScript+React
  - 整页编辑
  - 耦合 mui
- [alibaba/designable](https://github.com/alibaba/designable)
- tinacms
- [measuredco/puck](https://github.com/measuredco/puck)
  - MIT, React

**商业**

- https://codyhouse.co/
- builderio

## IDE/Code

- codemirror
- [DTStack/molecule](https://github.com/DTStack/molecule)

## Misc

- [viebel/klipse](https://github.com/viebel/klipse)
  - eval languages
- [ekzhang/rustpad](https://github.com/ekzhang/rustpad)
  minimal collaborative code editor
  - MIT, Rust
- [wereturtle/ghostwriter](https://github.com/wereturtle/ghostwriter)
  - GPL-3.0, C++
- https://github.com/TryGhost/Admin/tree/main/lib/koenig-editor
- [Rich text / HTML editors and frameworks](https://gist.github.com/manigandham/65543a0bc2bf7006a487)

## Prototyping

- Prototype 场景
  - 2D 像素纬度 - 输出 SVG 或 设计稿 - 实现相对简单
    - 类似 PS，SVG 编辑器
  - Low Code - 部分控制
  - HTML - CMS
    - 编排 HTML 元素，所见即所得 - 需要处理复杂布局逻辑
    - 编辑组件、绑定数据 - 交互复杂

---

- [React-Proto/react-proto](https://github.com/React-Proto/react-proto)
- https://openclipart.org/
  - Public Domain
- [akiraux/Akira](https://github.com/akiraux/Akira)
  - Vala
  - Native Linux App for UI and UX Design built in Vala and GTK
- react-studio

## View

- [mac-s-g/react-json-view](https://github.com/mac-s-g/react-json-view)

## Flow / NodeEditor

- react-flow
- [retejs/rete](https://github.com/retejs/rete)
  - MIT
  - modular framework for visual programming
- DrawIO
- BPMN.js

## Game/Studio

- [raverie-us/raverie-engine](https://github.com/raverie-us/raverie-engine)
  - C++, WASM
  - aims to recreate the Macromedia/Adobe Flash experience of old
  - https://raverie-us.github.io/raverie-engine/
- https://editor.godotengine.org/

## Model/Spec/Schema {#model}

> 设计/扩展 RichText Editor 的核心是理解文档模型

- markdown
- rst
- asciidoc
- [portabletext/portabletext](https://github.com/portabletext/portabletext)
  - Sanity.io 定义的规范
- https://docs.slatejs.org/v/v0.47/guides/data-model
- [editor-js/document-model](https://github.com/editor-js/document-model)
- [ProseMirror/prosemirror-model](https://github.com/ProseMirror/prosemirror-model)
- [Low Code Design](./low-code/README.md)
- https://www.builder.io/c/docs/models-intro
- https://avuejs.com/
  - 写好模板配数据
- https://www.notion.so/blog/data-model-behind-notion

## Glossary

- MIS - 管理信息系统
  - 大多为 Table+Form
