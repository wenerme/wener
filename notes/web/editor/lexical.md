---
title: lexical
---

# lexical

- [facebook/lexical](https://github.com/facebook/lexical)
  - MIT, FlowJS
  - by Facebook
  - React 体验
  - EditorState single source of truth
    - reconcile DOM
  - 纯 JS 可使用
  - 基于 contentEditable
  - 替代 Draft.js
  - 性能好
    - queueMicrotask
    - React 18+ concurrent 支持
  - 支持 yjs 集成
- ![lexical](https://badgen.net/bundlephobia/min/lexical?label=lexical)
  - 0 依赖
- https://playground.lexical.dev/

:::caution

- 目前还相当不成熟 - 还处于快速开发阶段
  - 目前更建议使用 Tiptap
- 节点耦合插件 - [#1262](https://github.com/facebook/lexical/issues/1262)
  - 无法扩展已有节点 - 做不到 Tiptap 的 Extension 效果

:::

```bash
# react -> list,link,code,overflow,history,markdown,mark,hashtag,selection,dragon,utils,table,clipboard,rich-text,plain-text
npm add lexical @lexical/react

npm add @lexical/file

npm add y-websocket yjs @lexical/yjs
```

- link-preview-generator

## Internal

### Node

- RootNode
- LineBreakNode - `\n`
- ElementNode - 基础类
- TextNode
  - format - bold, italic, underline, strikethrough, code, subscript, superscript
  - mode
    - token - 内容不可编辑，作为整体删除 - tiptap atom
    - inert - 类似 token，会设置 contenteditable=false
    - segmented
  - style - CSS 样式
- DecoratorNode - 修饰现有节点 - tiptap NodeView

```ts
interface Node {
  static getType();
  static clone(node: typeof this);

  // ElementNode 没有 EditorConfig
  // TextNode 有 EditorConfig

  createDOM(config: EditorConfig): HTMLElement;
  // true - replace with createDOM
  updateDOM(prevNode: CustomParagraph, dom: HTMLElement, config: EditorConfig): boolean;

  // for DecoratorNode<React$Node>
  decorate(): React$Node;
}
```

### Node Transform

```ts
editor.registerNodeTransform(TextNode, (textNode) => {
  //
});
```

### Command

```ts
// payload
const HELLO_WORLD_COMMAND: LexicalCommand<string> = createCommand();

editor.dispatchCommand(HELLO_WORLD_COMMAND, 'Hello World!');

editor.registerCommand(
  HELLO_WORLD_COMMAND,
  (payload: string) => {
    console.log(payload); // Hello World!
    return false;
  },
  LowPriority,
);
```

### Listener

```ts
const removeUpdateListener = editor.registerUpdateListener(({ editorState }) => {
  editorState.read(() => {
    // 通过 $ 前缀函数 访问上下文状态
  });
  editor.update(() => {
    // transaction
  });
});

removeUpdateListener();

// 监听内容变化
editor.registerTextContentListener((textContent) => {
  console.log(textContent);
});

// 监听节点修改
editor.registerMutationListener(MyCustomNode, (mutatedNodes) => {
  // mutation: created, destroyed, updated
  for (let [nodeKey, mutation] of mutatedNodes) {
    console.log(nodeKey, mutation);
  }
});
// 只读状态变化
editor.registerReadOnlyListener((readOnly) => {
  console.log(readOnly);
});
//
editor.registerDecoratorListener((decorators) => {
  console.log(decorators);
});
```

### Selection

- RangeSelection
- NodeSelection
- GridSelection
- null

### EditorState
