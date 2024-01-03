---
title: Tiptap Extension
---

# Tiptap Extension

- 类型
  - Node.create - 增加 Node
  - Mark.create - 增加 Mark
  - Extension.create - 增加 扩展现有 Node、Mark
- 扩展 Schema - NodeSpec, MarkSpec
  - extendMarkSchema
  - extendNodeSchema

## Editor

- Node + Mark 组成 ProseMirror 的 Schema
- 方法
  - chain - 一次性执行多个 commands
    - 在一次 tx 里
  - can - 判断 command 能否自信
    - 不会传递 dispatch
  - getHTML, getJSON, getText
  - getAttributes
  - isActive - 检查选中内容是否匹配条件
  - registerPlugin, unregisterPlugin
  - setOptions, setEditable
  - destroy
- 属性
  - commands - 所有命令
    - focus - focus Editor
  - storage - 插件额外信息存储
  - state - 状态存储
  - isEditable
  - isEmpty
  - isDestroyed
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
    // 全局属性 - 增强其他扩展
    return [
      {
        // 扩展目标类型属性
        types: ['heading', 'paragraph'],
        // 添加的额外属性
        attributes: {
          textAlign: {
            default: 'left', // 默认值
            rendered: true, // 是否调用渲染
            keepOnSplit: true, // 切分元素时是否保留
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

  // 合并到 options
  addOptions() {
    return {};
  },

  // 合并到 storage
  addStorage() {
    // 存储引用 editor.extensionStorage[extension.name] = extension.storage
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

- 扩展点
  - options, storage - Extension 本身状态
  - schema - Node, Mark
  - commands
  - 事件 - beforeCreate, create, update, selectionUpdate, transaction, focus, blur, destroy
  - ProseMirror 插件
    - 顺序 - inputRules, pasteRules, keymap, 其他
    - inputRulesPlugin(InputRules) - 合并为一个插件
    - PasteRules - 多个插件
    - addKeyboardShortcuts
      - prosemirror-keymap
      - Mod 指代 Cmd 或 Control
      - Shift, Alt, Control, Cmd
      - https://keycode.info/
    - ProseMirrorPlugins - 原生插件
- extension 的核心上下文
  - name, options, storage, editor, type
  - type=getSchemaTypeByName(extension.name, this.schema)
    - 用于 Node 和 Mark
