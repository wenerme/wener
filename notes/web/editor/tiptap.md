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
  - 188k - prosemirror-{view,model,transform,state,commands,schema-list,keymap}
  - @tiptap/core +58k
  - @tiptap/starter-kit +4k - 扩展都很小
  - @tiptap/react 包含 @popperjs/core, tippy.js ~ +60k

:::note

- 默认会 inject 一点 css - [packages/core/src/style.ts](https://github.com/ueberdosis/tiptap/blob/main/packages/core/src/style.ts)
- 没有内置 Markdown 支持
  - [nextcloud/text](https://github.com/nextcloud/text)

:::

```bash
npm add @tiptap/{starter-kit,html}
# starter 以外扩展
npm add @tiptap/extension-{underline,text-style,text-align,underline,link,font-family,color,character-count}

npm add @tiptap/extension-image
npm add @tiptap/extension-table{,-row,-cell,-header}
npm add @tiptap/extension-task-{list,item}

npm add @tiptap/extension-horizontal-rule
```

## Editor

- Node + Mark 组成 ProseMirror 的 Schema
- 方法
  - chain - 一次性执行多个 commands
  - getHTML, getJSON, getText
  - getAttributes
  - isActive - 检查选中内容是否匹配条件
  - registerPlugin, unregisterPlugin
  - setOptions, setEditable, isEditable, isEmpty
- commands
  - focus - focus Editor
- 事件
  - beforeCreate, creaate
  - update
  - selectionUpdate
  - transaction
  - focus, blur
  - destroy

## Node vs Mark

- Node
  - block 元素
  - tag 标签
  - atom 为不可直接编辑 Node - 例如 Mention
- Mark
  - node 的属性
  - tag 属性、样式

```ts
const MyNode = Node.create({
  name: 'my-node',
  content: 'block+', // 允许内容 - +,*,?,|,()
  group: 'block', // node 分组
  inline: true,
  atom: false,
  selectable: true,
  draggable: true,
  code: false,
  whitespace: 'pre', // 控制空白 处理 逻辑
  defining: false, // 粘贴的时候是否保留
  allowGapCursor: false,
  isolating: false, // 隔离编辑范围 - 例如 TableCell
  tableRole: 'cell', //  Table 扩展定义的角色 - table, row, cell, header_cell
  marks: 'bold', // 允许 mark - _ 任意, '' 不允许
});
const MyMark = Node.create({
  inclusive: false, // 光标在结尾的时候是否包含在当前 mark - 例如 Link 为 false
  excludes: 'bold', // 排他 mark
  group: 'basic',
  code: false, // 内容是否为代码
  spanning: false, // 是否可以跨多个节点
});
```

## @tiptap/html

- JSON <-> HTML
- 不需要 Editor 实例
- 基于 zeed-dom
  - +85k
  - css-what +10k

```ts
// Browser + server-side
import { generateHTML, generateJSON } from '@tiptap/html';
// 轻量级
import { generateHTML, generateJSON } from '@tiptap/core';
```

## Extensions

```ts
// typescript 类型信息

interface CustomExtensionOptions {}
interface CustomExtensionStorage {}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    customExtension: {
      /**
       * Comments will be added to the autocomplete.
       */
      yourCommand: (someProp: any) => ReturnType;
    };
  }
}

// Node.create, Mark.create
const CustomExtension = Extension.create<CustomExtensionOptions, CustomExtensionStorage>({
  name: 'customExtension',

  content: 'paragraph*',
  draggable: true,

  addAttributes() {
    // this.{name,editor,type,options,parent,}
    return {
      ...this.parent?.(), // 扩展时 继承上级
      color: {
        default: 'pink',
        rendered: true, // 是否渲染属性
        parseHTML: (element) => element.getAttribute('data-color'),
        renderHTML: (attributes) => {
          return {
            'data-color': attributes.color,
            style: `color: ${attributes.color}`,
          };
        },
      },
    };
  },

  addGlobalAttributes() {
    // 全局属性
    return [
      {
        // extend 扩展
        types: ['heading', 'paragraph'],
        // 添加的额外属性
        attributes: {
          textAlign: {
            default: 'left',
            renderHTML: (attributes) => ({
              style: `text-align: ${attributes.textAlign}`,
            }),
            parseHTML: (element) => element.style.textAlign || 'left',
          },
        },
      },
    ];
  },

  // 定义如何渲染 HTML
  renderHTML({ HTMLAttributes }) {
    // tag,属性,children
    // tag,属性,0 - 0 表示 content 插入位置
    return ['pre', ['code', HTMLAttributes, 0]];
    // import { mergeAttributes } from '@tiptap/core'
    return ['a', mergeAttributes(HTMLAttributes, { rel: this.options.rel }), 0];
  },
  parseHTML() {
    return [
      {
        tag: 'strong',
      },
      {
        tag: 'b',
        // node.hasAttribute('style')
        // node.getAttribute('data-color')
        getAttrs: (node) => node.style.fontWeight !== 'normal' && null,
      },
    ];
  },

  addCommands() {
    return {
      paragraph:
        () =>
        ({ commands }) => {
          // 访问其他 commands
          return commands.setNode('paragraph');
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-l': () => this.editor.commands.toggleBulletList(),
    };
  },

  addInputRules() {
    // 当输入指定内容时匹配为 type - 例如 markdown 语法 ~~ -> Strike
    // 规则一般以 $ 结尾
    // import { markInputRule } from '@tiptap/core'
    // const inputRegex = /(?:^|\s)((?:~)((?:[^~]+))(?:~))$/
    return [
      markInputRule({
        find: inputRegex,
        type: this.type,
      }),
    ];
  },
  addPasteRules() {
    // 规则一般不会以 $ 结尾
    // import { markPasteRule } from '@tiptap/core'
    // const pasteRegex = /(?:^|\s)((?:~)((?:[^~]+))(?:~))/g
    return [
      markPasteRule({
        find: pasteRegex,
        type: this.type,
      }),
    ];
  },

  addStorage() {
    // 外部访问 editor.storage.customExtension.counter
    return {
      counter: 100,
    };
  },

  // 事件
  onUpdate() {
    this.storage.counter += 1;
  },

  /* 高级扩展 */

  // 扩展 ProseMirror
  addProseMirrorPlugins() {
    return [
      history(),
      // …
    ];
  },

  addNodeView() {
    // 为编辑元素增加交互功能
    // https://tiptap.dev/guide/node-views
    return ({ editor, node, getPos, HTMLAttributes, decorations, extension }) => {
      const { view } = editor;
      // view.dispatch

      const dom = document.createElement('div');
      dom.innerHTML = 'Node View';

      const button = document.createElement('button');
      button.innerHTML = `Counter ${node.attrs.count}`;

      button.addEventListener('click', () => {
        if (typeof getPos === 'function') {
          view.dispatch(
            // 更新 node
            view.state.tr.setNodeMarkup(getPos(), undefined, {
              // node.attrs.count 访问定义的 属性
              count: node.attrs.count + 1,
            }),
          );

          editor.commands.focus();
        }
      });

      const content = document.createElement('div');

      dom.append(button, content);

      return {
        dom: container,
        // 可编辑内容 - 由 tiptap 渲染
        contentDOM: content,
      };
      // React 组件
      // import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react'
      // 组件内返回 NodeViewWrapper
      // props.node.attrs.count 访问 node 属性
      // props.updateAttributes 修改 属性
      // 内容使用 NodeViewContent
      return ReactNodeViewRenderer(Component);
    };
  },
});
```

- addKeyboardShortcuts
  - Mod 指代 Cmd 或 Control
  - Shift, Alt, Control, Cmd
  - https://keycode.info/

---

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

- https://tiptap.dev/experiments/commands
- https://github.com/ueberdosis/tiptap/issues/1036
  - indent
  - https://github.com/Leecason/element-tiptap/tree/master/src/extensions
    - tiptap v1
- https://tiptap.dev/api/extensions
- https://github.com/ueberdosis/tiptap/tree/main/packages

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
