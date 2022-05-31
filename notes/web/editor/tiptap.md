---
title: tiptap
---

# tiptap

- [ueberdosis/tiptap](https://github.com/ueberdosis/tiptap)
  - MIT, Typescript
  - Headlees，框架无关的编辑器
  - 基于 ProseMirror
  - 支持协作编辑 - y.js
  - Pro 提供部分额外扩展 - emoji, details
- ![@tiptap/core min](https://badgen.net/bundlephobia/min/@tiptap/core?label=@tiptap/core%20min)
  - prosemirror 188k - prosemirror-{view,model,transform,state,commands,schema-list,keymap}
  - @tiptap/core +58k
  - @tiptap/starter-kit +4k - 扩展都很小
  - @tiptap/react 包含 @popperjs/core, tippy.js ~ +60k
  - ~310kb

:::note

- 默认会 inject 一点 css - [packages/core/src/style.ts](https://github.com/ueberdosis/tiptap/blob/main/packages/core/src/style.ts)
- 没有内置 Markdown 支持 - 可使用 prosemirror-markdown
  - 可参考 [nextcloud/text](https://github.com/nextcloud/text)

:::

```bash
npm add @tiptap/{starter-kit,html}
# starter 以外常用扩展
npm add @tiptap/extension-{underline,text-style,text-align,underline,link,font-family,color,character-count}

npm add @tiptap/extension-image
npm add @tiptap/extension-table{,-row,-cell,-header}
npm add @tiptap/extension-task-{list,item}

npm add @tiptap/extension-horizontal-rule
```

## @tiptap/html

- JSON <-> HTML
- 不需要 Editor 实例
- 基于 zeed-dom
  - +85k
  - css-what +10k
- HTML 也是基于 JSON 模型生成的
  - prosemirror-model - DOMSerializer, DOMParser

```ts
// Browser + server-side
import { generateHTML, generateJSON } from '@tiptap/html';
// 轻量级
import { generateHTML, generateJSON } from '@tiptap/core';
```

## Extensions

- `@tiptap/extension-{name}`
- 样式/Mark
  - code - `<code>`
  - bold - strong, b, style.font-weight=bold/bolder/500-900
  - color - 基于 text-style - style.color
  - font-family - 基于 text-style - style.fontFamily
  - link - a
  - subscript - sub, style.vertical-align=sub
  - superscript - sup, style.vertical-align=super
  - text-align - style.textAlign
  - text-style - 实现自定义属性 - 包装为 span,
  - typography - 常用字符替换 - addInputRules - 例如 `+-` -> `±`
  - underline - u
  - strike - s, del, strike, style.text-decoration=line-through
  - italic - em, i, style.font-style=italic
  - highlight - data-color, style.backgroundColor
- 元素/node
  - blockquote - `<blockquote>`
  - code-block - `<pre><code class="lang">`
  - code-block-lowlight - 语法高亮 - [lowlight] 基于 highlight.js
  - document - `Node.create({name: 'doc',topNode: true,content: 'block+'})`
  - emoji - PRO
  - hard-break - br
  - hash-tag - WIP
  - details - PRO - DetailsSummary, DetailsContent
  - heading - h1-h6
  - horizontal-rule - hr
  - image - `<img src>`
  - list-item - li
  - mention - `<span data-id data-label>`
  - ordered-list - ol
  - bullet-list - ul
  - paragraph - p
  - text - `Node.create({name: 'text',group: 'inline'})`
  - table
    - table-cell
    - table-header
    - table-row
  - task-list
    - task-item
- 扩展
  - placeholder - Editor 内容为空时的占位内容 - ProseMirrorPlugin
  - history - undo, redo
  - bubble-menu - 选中时出现的菜单 - 基于 tippy.js
  - floating-menu - 空白行出现
  - character-count - 记录数量 - 可限定输入数量
  - focus - 如果 Node 有 focus 添加 className has-focus - ProseMirrorPlugin
  - dropcursor - prosemirror-dropcursor
  - gapcursor - 处理 Node 上的 allowGapCursor 属性 - prosemirror-gapcursor
- 协作 - y-prosemirror
  - collaboration
  - collaboration-cursor
- starter-kit
  - blockquote, bullet-list, list-item, ordered-list, paragraph, code, code-block, document, heading
  - strike, bold, text, italic
  - hard-break, horizontal-rule
  - history
  - dropcursor, gapcursor

[lowlight]: https://github.com/wooorm/lowlight

:::tip

- 扩展功能 Node 会记录类型到 `data-type` - 例如 TaskList -> `ul[data-type=taskList]`
- Mark 常见 command 模式 `set<Mark>`,`unset<Mark>`,`toggle<Mark>`

:::

---

- Community Extensions [ueberdosis/tiptap#819](https://github.com/ueberdosis/tiptap/issues/819)
- https://tiptap.dev/experiments/commands
- https://github.com/ueberdosis/tiptap/issues/1036
  - indent
  - https://github.com/Leecason/element-tiptap/tree/master/src/extensions
    - tiptap v1
- https://tiptap.dev/api/extensions
- https://github.com/ueberdosis/tiptap/tree/main/packages
- jump-anchor
  - https://gist.github.com/mackmm145/f100a62de841464872785e3d041be13f

## nextcloud/text

- 节点/Node
  - [Emoji](https://github.com/nextcloud/text/blob/master/src/extensions/Emoji.js)
    - 选取组件 [EmojiPicker.vue](https://github.com/nextcloud/nextcloud-vue/blob/master/src/components/EmojiPicker/EmojiPicker.vue)
    - React 版 [missive/emoji-mart](https://github.com/missive/emoji-mart)
    - Vue fork [serebrov/emoji-mart-vue](https://github.com/serebrov/emoji-mart-vue)
- 扩展/Extension
  - Keymap - Ctrl-f 触发浏览器搜索而非 Editor
  - Markdown - 增加 toMarkdown，使用 prosemirror-markdown 进行默认序列化
  - Collaboration
  - UserColor

---

- [nextcloud/text](https://github.com/nextcloud/text)

## Schema

- [schema](https://tiptap.dev/api/schema)

```json title="model.json"
{
  "type": "doc",
  "content": [
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "Wow, this editor instance exports its content as JSON."
        }
      ]
    }
  ]
}
```

# FAQ

## Tiptap v1 vs Tiptap v2

- Tiptap v1
  - Vue
- Tiptap v2
  - 核心 Headless
  - React, Vue, Alpine, Svelte
  - 协作
  - @mentions 补全
