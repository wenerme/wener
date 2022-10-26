---
title: ProseMirror
---

# ProseMirror

- [prosemirror](https://prosemirror.net/)
  - low-level rte toolkit
- 特性
  - 结构化的模型树
  - 模型不可变
  - 支持协作编辑
  - 模型受 schema 限制 - 实现自定义
    - 解析自动化 - 但可能丢弃 schema 之外信息
  - 模型状态变化类似于 redux
  - 整体概念类似于 react+redux
  - 状态 UI 独立
- [Reference manual](https://prosemirror.net/docs/ref/)

:::tip

- 单纯学习 ProseMirror 的设计也非常有意义

:::

```bash
# 核心模块
npm add prosemirror-{state,view,model,schema-basic,schema-list}
npm add --dev @types/prosemirror-{state,view,model,schema-basic,schema-list}
# 扩展模块
npm add prosemirror-{keymap,history,commands,dropcursor,gapcursor,menu,inputrules}
npm add --dev @types/prosemirror-{keymap,history,commands,dropcursor,gapcursor,menu,inputrules}
```

```ts
import { schema } from 'prosemirror-schema-basic';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { DOMParser } from 'prosemirror-model';

import { baseKeymap } from 'prosemirror-commands';
import { undo, redo, history } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';

let content = document.getElementById('content');
let state = EditorState.create({
  // 初始状态
  doc: DOMParser.fromSchema(schema).parse(content),
  schema,
  plugins: [history(), keymap({ 'Mod-z': undo, 'Mod-y': redo }), keymap(baseKeymap)],
});
let view = new EditorView(document.body, { state });

// 基于 schema 可直接构建 doc
let doc = schema.node('doc', null, [
  schema.node('paragraph', null, [schema.text('One.')]),
  schema.node('horizontal_rule'),
  schema.node('paragraph', null, [schema.text('Two!')]),
]);

// Schema 包含 nodes, marks
new Schema({
  nodes: {
    doc: { content: 'block+' },
    paragraph: {
      group: 'block',
      content: 'text*',
      marks: '_',

      toDOM(node) {
        return ['p', 0];
      },
    },
    heading: { group: 'block', content: 'text*', marks: '', attrs: { level: { default: 1 } } },
    text: { inline: true },
  },
  marks: {
    strong: {},
    em: {
      parseDOM: [
        { tag: 'em' }, // Match <em> nodes
        { tag: 'i' }, // and <i> nodes
        { style: 'font-style=italic' }, // and inline 'font-style: italic'
      ],
    },
  },
});
```

- content 语法 - 类似于 PEG 语法、RegExp 语法
  - `paragraph`
  - `paragraph+`
  - `paragraph*`
  - `paragraph{2}`,`paragraph{2,}`,`paragraph{2,3}`
  - `heading paragraph+`
  - `(paragraph | blockquote)+`
- marks
  - `_` 表示任意
- group 定义类型组合
- Plugin
  - props
    - decorations
  - state
- EditorView - typing, clicking, copying, pasting, dragging

