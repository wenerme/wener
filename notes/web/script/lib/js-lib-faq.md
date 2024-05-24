---
tags:
  - FAQ
---

# JS Library FAQ

## popperjs vs floating-ui

- floating-ui - popper -> floating-ui - 2021 - core ~600b
  - 更底层接口 - 支持 web, React Native, Canvas
  - 提供上层封装
- popperjs - ~3kb - 2006
  - 接口友好，简单易用

---

- [Popper is evolving into Floating UI!](https://github.com/floating-ui/floating-ui/discussions/1425)

## fetch vs axios

- fetch
  - 内置 - 浏览器基本都支持了
  - 通过 abort signal 支持 timeout
- axios
  - ~20kB
  - 支持 timeout
  - 支持实例化 - 携带默认配置信息
  - 支持拦截器
  - 自动 JSON 转换
  - 方便处理上传下载进度

## jsdom vs cheerio

- jsdom
  - 兼容浏览器 DOM API
  - 可在浏览器测试逻辑 - 建议禁用 JS，使用 textContent
  - 不支持 innerText [jsdom/jsdom#1245](https://github.com/jsdom/jsdom/issues/1245)
    - 可以使用 textContent - 所有自节点 text 集合
    - innerText 依赖布局渲染信息 - 通过样式隐藏的元素不会被包含
- cheerio
  - 模仿 jQuery 接口
  - 性能更好
  - 但 平坦 DOM 处理起来不方便
  - 只能在 NodeJs 使用

## Can only have one anonymous define call per script file

- monaco 加载时出现的异常
- [monaco-editor#2283](https://github.com/microsoft/monaco-editor/issues/2283)
