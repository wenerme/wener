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
