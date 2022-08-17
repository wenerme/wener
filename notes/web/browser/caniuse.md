---
title: 浏览器兼容
---

# 浏览器兼容

| spec                            | version                  |
| ------------------------------- | ------------------------ |
| BroadcastChannel                | Chrome 54+, Safari 15.4+ |
| Proxy+Reflect                   | Chrome 49+, Safari 10+   |
| `<dialog>`                      | Chrome 37+, Safari 15.4+ |
| [AbortController]               | Chrom 66+, Safari 12.1   |
| [HTMLInputElement.showPicker()] | Chrome 99+, Safari 16+   |
| [`<datalist>`]                  | Chrom 20+, Safari 12.1   |

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

[abortcontroller]: https://developer.mozilla.org/en-US/docs/Web/API/AbortController
[htmlinputelement.showpicker()]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/showPicker
[`<datalist>`]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist

---

- interop-2022 - 主流浏览器 CSS 新特性同步
  - https://web.dev/interop-2022
  - https://wpt.fyi/interop-2022
- 参考
  - [browserslist/caniuse-lite](https://github.com/browserslist/caniuse-lite)
  - [mdn/browser-compat-data](https://github.com/mdn/browser-compat-data)
