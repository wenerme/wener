---
title: SlateJS
---

# SlateJS

- [SlateJS](https://github.com/ianstormtaylor/slate)
  - [文档](https://docs.slatejs.org/)
- slate ~84kb + immer
- slate-react ~59kb - +slate ~145kb
- 特性
  - 原生 react
  - 自定义 render
  - 没有固定的文档模型 - 基于接口 - POJO - 可以直接序列化
    - 可以在不同类型之间进行转换
  - 插件就是直接修改 Editor 对象
  - 设计上尽可能映射 DOM 模型 - Mirroring the DOM as much as possible is one of Slate's principles
    - Block、Inline、Leaf、Void 等元素概念
  - Text properties are for non-contiguous, character-level formatting.
  - Element properties are for contiguous, semantic elements in the document.
  - 只读模式可以将 Slate 作为渲染
    - 只会增加 4k 左右依赖 - [ianstormtaylor/slate#2554](https://github.com/ianstormtaylor/slate/issues/2554)
  - 没有默认的完善渲染组件 - 没有视图层
    - 便于利用自定义组件
    - renderElement = DefaultElement - inline 渲染 span，block 渲染 div
    - renderLeaf = DefaultLeaf - 渲染 span
  - 没有内建的样式定义 - 但很容易实现
  - 不只是用来作为富文本编辑
    - 可以用来做 CMS、组件编辑
  - 通过递归渲染 + contentEditbale 实现编辑
- 封装
  - [accordproject/markdown-editor](https://github.com/accordproject/markdown-editor)
    - [demo](https://accordproject-markdown-editor.netlify.com/)
    - 通过 [accordproject/markdown-transform](https://github.com/accordproject/markdown-transform) 实现 dom 和 markdown 互转
  - [outline/rich-markdown-editor](https://github.com/outline/rich-markdown-editor)
  - [Canner/canner-slate-editor](https://github.com/Canner/canner-slate-editor)
    - [demo](https://canner.github.io/canner-slate-editor)
    - 基于 slate 的 markdown 格式 cms 编辑器
    - 没有在维护
- 参考
  - [HN](https://news.ycombinator.com/item?id=28000086)

## FAQ

### 为什么需要 onDOMBeforeInput

处理 [beforeinput](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/beforeinput_event) 事件，上下文菜单中触发的事件。

- [#3302](https://github.com/ianstormtaylor/slate/issues/3302) - What is the purpose of onDOMBeforeInput?
- [facebook/react#11211](https://github.com/facebook/react/issues/11211) React 不支持 beforeinput 事件
