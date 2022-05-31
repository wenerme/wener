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
  - 模型状态变化类似于 redux
  - 整体概念类似于 react+redux
  - 状态 UI 独立
- [Reference manual](https://prosemirror.net/docs/ref/)

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

## 模块

- 模块 - `prosemirror-<module>`
- prosemirror-state - 编辑器状态
  - EditorState
  - Transaction
  - Selection - from,to - anchor,head
    - TextSelection
    - NodeSelection - node
    - AllSelection
  - Plugin
  - PluginKey
- prosemirror-view - Web 编辑器 - DOM <-> State
  - EditorView
  - Decoration
  - DecorationSet
- prosemirror-model - 定义文档模型
  - Node
  - Fragment - node's collection of child nodes
  - Mark
  - Slice
  - ResolvedPos
  - NodeRange
  - Schema
  - NodeType
  - MarkType
  - ContentMatch
  - DOMParser
  - DOMSerializer
- prosemirror-transform - 状态事务
  - Step - ReplaceStep, ReplaceAroundStep, AddMarkStep, RemoveMarkStep
  - StepResult
  - Mappable - StepMap, Mapping
  - MapResult
  - Transform
- prosemirror-commands
- prosemirror-keymap
- prosemirror-history
- prosemirror-inputrules - 输入特定内容，触发命令 - 实现 Markdown 输入语法
  - InputRule
- prosemirror-collab
- prosemirror-gapcursor
- prosemirror-schema-basic - 类 CommonMark 的 Schema, 不包含 list
  - nodes - doc, paragraph, blockquote, horizontal_rule, heading, code_block, text, image, hard_break
  - marks - line, em, strong, code
- prosemirror-schema-list - 类 CommonMark 的 列表 schema
  - orderedList, bulletList, listItem
- prosemirror-markdown
- prosemirror-menu
- prosemirror-dropcursor
- prosemirror-table
- prosemirror-changeset

```json title="model"
{
  "type": "",
  "attrs": {},
  "content": {},
  "marks": [
    {
      "type": "",
      "attr": {}
    }
  ]
}
```

```ts
// 数组 - ['tag',{},0]
type DOMOutputSpec = string | DOMNode | {dom: DOMNode, contentDOM?: HTMLElement} | [string, ...any]
// 供 DOMSerializer 使用
type NodeToDOM = (node: Node) => DOMOutputSpe
type MarkToDOM = (mark: Mark, inline: boolean) => DOMOutputSpec

interface PluginSpec{
  key⁠?: PluginKey
  props⁠?: EditorProps
  state⁠?: StateField<any>

    view⁠?: (view: EditorView) => PluginView
    filterTransaction⁠?: (tr: Transaction, state: EditorState)=> boolean
    appendTransaction⁠?: (
      transactions: /*readonly*/ Transaction[],
      oldState: EditorState,
      newState: EditorState
    )=> Transaction | null | undefined
}
```
