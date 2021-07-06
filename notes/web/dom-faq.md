---
title: DOM FAQ
---

# DOM FAQ

- FOUC - flash of unstyled content
  - 应用 style 时

## ShadowRoot rem & font-size

- 无法覆盖
- 导致 rem 受外部影响 - html font-size
- 可考虑使用 em
- 参考
  - [Why is my Web Component inheriting styles?](https://lamplightdev.com/blog/2019/03/26/why-is-my-web-component-inheriting-styles/)
  - [修改 tailwindcss 使用 px 而不是 rem](https://github.com/tailwindlabs/tailwindcss/issues/1232#issuecomment-754804258)
    - [defaultConfig.stub.js](https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/defaultConfig.stub.js#L7)

## ShadowRoot.mode

- open
  - 记录 element.shadowRoot
  - 受外部 style 影响
- closed
  - 不会记录 root
  - 如有需要需要自己使用 WeakMap 跟踪引用

## shadow dom 重置 host 样式

```css
:host {
  all: initial;
}
```

## 初始化 style

```js
// 新的方式 - 2019, Chrome 73+
var sheet = new CSSStyleSheet();
sheet.replaceSync(`.color { color: pink }`);
host.shadowRoot.adoptedStyleSheets = [sheet];

// 旧的方式
let style = document.createElement('style');
style.textContent = css;
container.appendChild(style);
```
