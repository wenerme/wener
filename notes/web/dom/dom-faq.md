---
title: DOM FAQ
tags:
  - FAQ
---

# DOM FAQ

- FOUC - flash of unstyled content
  - 应用 style 时
- 参考
  - [UI Events Testing Tools](https://w3c.github.io/uievents/tools/main.html)
- Comparison of Event Targets
  - https://developer.mozilla.org/en-US/docs/Web/API/Event/Comparison_of_Event_Targets

## size

- width, height
- clientWidth, clientHeight
- offsetWidth, offsetHeight
  - size+border+padding
- scrollWidth, scrollHeight
  - `scrollbarWidth = offsetWidth - clientWidth - getComputedStyle().borderLeftWidth - getComputedStyle().borderRightWidth`
  - `scrollbarWidth = getComputedStyle().width + getComputedStyle().paddingLeft + getComputedStyle().paddingRight - clientWidth`
    - 在 chrome 下可能不准确
- `element.getBoundingClientRect()`
- naturalWidth, naturalHeight
  - 图片的原始大小

---

- 参考
  - https://stackoverflow.com/questions/21064101

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

- Safari 因为隐私原因，不支持，返回错误结果

## 监听 URL 变化

- 目前无法可靠的检测 url 变化
- patch history 的方式 https://github.com/streamich/react-use/blob/master/src/useLocation.ts
- observe 任何修改然后检测
- Chrome 102+ window.navigation 接口

```js
let last = document.location.href;
const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (last !== document.location.href) {
      last = document.location.href;
      /* Changed */
    }
  });
});

observer.observe(document.querySelector('body'), {
  childList: true,
  subtree: true,
});

// Chrome 102+
navigation.addEventListener('navigate', (e) => {
  console.log(`navigate ->`, e.destination.url);
});
```

## The target origin provided does not match the recipient window's origin

## idle

- [IdleDetector](https://developer.mozilla.org/en-US/docs/Web/API/IdleDetector)
  - API
  - 需要权限
- [Idle Detection](https://web.dev/idle-detection/)
- Chromium 94+
- https://stackoverflow.com/a/10126042/1870054
  - 通过事件检测

## tabIndex

- tabIndex=0
  - Tabbable and focusable
- tabIndex=-1
  - Not tabbable, but focusable

## HTML attributes vs DOM properties

- HTML attributes
  - 可以序列化 - 在 HTML 里能表现出来
  - 所有类型都是 string - 因为序列化
  - 大小写无关
  - 访问方式不同
    - `div.getAttributeNames()`
    - `div.getAttribute('id')`
  - Reflection - property 可能会映射为 attribute
    - `crossOrigin` -> `crossorigin`
    - `ariaLabel` -> `aria-label`
    - `className` -> `class`
    - `htmlFor` -> `for`
    - ⚠️ 注意 `defaultValue` -> `value`
      - `value` property 没有对应的 attribute
- DOM properties
  - 如果一个 property 反映一个 attribute，那么 attribute 为 property 的 source 值
    - 也就是说以 attribute 为准
  - 有初始值和校验逻辑

---

- https://jakearchibald.com/2024/attributes-vs-properties/

## IME

- 事件
  - compositionstart
  - compositionupdate
  - compositionend
