---
tags:
  - Awesome
---

# WebComponent Awesome

## Spec

- [WebComponents](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
  - `CustomElementRegistry.define`
  - `Window.customElements`
  - ShadowDOM
    - Element - attachShadow, shadowRoot, slot, assignedSlot
    - Node - getRootNode, isConnected
    - Event - composed, composedPath
  - Element
    - 生命周期
      - connectedCallback
      - disconnectedCallback
      - adoptedCallback
      - attributeChangedCallback
  - `<template>`, `<slot>`
  - CSS
    - :defined
    - :host
    - :host()
    - :host-context()
    - ::part
    - ::slotted

## 框架/库/工具

- [lit/lit](https://github.com/lit/lit)
- [hybridsjs/hybrids](https://github.com/hybridsjs/hybrids)
- [ionic-team/stencil](https://github.com/ionic-team/stencil)
  - 编译器 - 生成目标组件 - [output-targets](https://stenciljs.com/docs/output-targets)
- [Custom Elements Everywhere](https://custom-elements-everywhere.com/)
  支持 CustomeElement、属性传递
  - React 19 custom element attributes/properties - [react#11347](https://github.com/facebook/react/issues/11347)
    - @experimental 版本 启用 - [ref](https://github.com/facebook/react/issues/11347#issuecomment-988970952https://github.com/facebook/react/issues/11347#issuecomment-988970952)
  - angular,vue,preact,solidjs
  - svelte
    - [Web Components with Svelte](https://www.thisdot.co/blog/web-components-with-svelte)
- [devpunks/snuggsi](https://github.com/devpunks/snuggsi)
  - ~1kb for Custom Elements
- https://open-wc.org/
- https://www.dataformsjs.com/
- https://fast.design/
- [macaron-elements/macaron](https://github.com/macaron-elements/macaron)

## 组件

- [dataformsjs/dataformsjs](https://github.com/dataformsjs/dataformsjs)
- [shoelace-style/shoelace](https://github.com/shoelace-style/shoelace)
  - [Stencil -> LitElement](https://www.abeautifulsite.net/posts/moving-from-stencil-to-lit-element/)
    - Stencil
      - 内部文档缺失 - 对贡献不友好
      - Issues 自动关闭 - 对 Bug 不友好
      - Tree shake 问题 - [#180](https://github.com/shoelace-style/shoelace/issues/180)
    - [src/internal/watch.ts](https://github.com/shoelace-style/shoelace/blob/next/src/internal/watch.ts)
- [microsoft/fast](https://github.com/microsoft/fast)

## 参考

- [nepaul/awesome-web-components](https://github.com/nepaul/awesome-web-components)
- [obetomuniz/awesome-webcomponents](https://github.com/obetomuniz/awesome-webcomponents)
