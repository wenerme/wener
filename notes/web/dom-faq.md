---
title: DOM FAQ
---

# DOM FAQ

- FOUC - flash of unstyled content
  - 应用 style 时
- 参考
  - [UI Events Testing Tools](https://w3c.github.io/uievents/tools/main.html)
- Comparison of Event Targets
  - https://developer.mozilla.org/en-US/docs/Web/API/Event/Comparison_of_Event_Targets

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

## a 的 download 不生效

- 如果 HTTP 有 Content-Disposition 头 则优先
- 非 same-origin download 属性无效

可以选择预先下载 base64 然后下载

```html
<!-- same orgin -->
<a href="/wp-content/uploads/file.mp4" download="file.mp4">
  <!-- pre-download -->
  <a download href="data:application/octet-stream;base64,PD94ANDSOON">Download Me</a></a
>
```

## key vs code

- key - 实际输入内容
  - 用于文本输入
  - 受键盘布局影响
- code - 输入的物理布局
  - 用于操作控制
  - 不受键盘布局影响
- 参考
  - [Keyboard Event Viewer](https://w3c.github.io/uievents/tools/key-event-viewer.html)
  - [What’s New with KeyboardEvents? Keys and Codes!](https://developers.google.com/web/updates/2016/04/keyboardevent-keys-codes)

| key   | code      |
| ----- | --------- |
| a     | KeyA      |
| A     | KeyA      |
| 1     | Digit1    |
| `!`   | Digit1    |
| `-`   | Minus     |
| Enter | Enter     |
| Shift | ShiftLeft |

## 字体检测

```js
document.fonts.check('12px ui-serif');
```
