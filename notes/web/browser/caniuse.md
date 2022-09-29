---
title: 浏览器兼容
---

# 浏览器兼容

| spec                            | Chrome     | Safari      | NodeJS    | Spec                                                          |
| ------------------------------- | ---------- | ----------- | --------- | ------------------------------------------------------------- |
| container-query                 | Chrome 105 |             |
| window.navigation               | Chrome 102 |             |           | [WICG/navigation-api](https://github.com/WICG/navigation-api) |
| [HTMLInputElement.showPicker()] | Chrome 99  | Safari 16   |
| [structuredClone]               | Chrome 98  | Safari 15.4 | NodeJS 17 |
| CSS Module                      | Chrome 93  |
| JSON Module                     | Chrome 91  |
| import map                      | Chrome 89  |
| globalThis                      | Chrome 71  | Safari 12.1 | NodeJS 12 |
| [AbortController]               | Chrome 66  | Safari 12.1 |
| overscroll-behavior             | Chrome 63  | Safari 16+  |
| dynamic-import                  | Chrome 63  | Safari 11.1 |
| BroadcastChannel                | Chrome 54  | Safari 15.4 |
| Proxy+Reflect                   | Chrome 49  | Safari 10   |
| `<dialog>`                      | Chrome 37  | Safari 15.4 |
| [`<datalist>`]                  | Chrome 20  | Safari 12.1 |

[abortcontroller]: https://developer.mozilla.org/en-US/docs/Web/API/AbortController
[htmlinputelement.showpicker()]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/showPicker
[`<datalist>`]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist
[structuredclone]: https://developer.mozilla.org/en-US/docs/Web/API/structuredClone

- window.navigation
  - 类似于 [remix-run/history](https://github.com/remix-run/history)
  - 接口比 window.history 友好的多
  - navigateEvent.intercept
  - navigateEvent.signal
- structuredclone
  - 支持 Array, Map, Set, Date, RegExp, ArrayBuffer, Blob, File, FileList, TypedArray, ImageBitmap, Image Data, Error
  - 支持 循环引用
- Reflect.getMetadata - 需要额外 import
  - [@abraham/reflection](https://github.com/abraham/reflection)
  - [reflect-metadata](https://github.com/rbuckton/reflect-metadata)
  - Spec https://rbuckton.github.io/reflect-metadata/
- HTMLInputElement.showPicker()
  - 代码触发
  - date, month, week, time, datetime-local, color, file
  - autocomplete
  - datalist
  - https://developer.chrome.com/blog/show-picker/
- `<datalist>`
  - 为 input 提供预设选项
  - 例如: color, text, time, range
- `<fieldset>`
  - 可以用来一下子 disabled 一组 input
  - 可以不在 form 内，提供 form id
- `<input>`
  - 默认 text
  - button, checkbox, color, date, datetime-local, email file, hidden, image, month, number, password, radio, range. reset, search, submit, tel, text, time, url, week
  - image: 图像 submit 按钮
  - 可以不在 form 内，提供 form id
  - list -> datalist

```ts
const structuredClone = globalThis.structuredClone ?? (v)=>JSON.parse(JSON.stringify(v))
```

---

- interop-2022 - 主流浏览器 CSS 新特性同步
  - https://web.dev/interop-2022
  - https://wpt.fyi/interop-2022
- 参考
  - [browserslist/caniuse-lite](https://github.com/browserslist/caniuse-lite)
  - [mdn/browser-compat-data](https://github.com/mdn/browser-compat-data)
