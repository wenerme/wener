---
tags:
  - Insight
---

# react-reconciler

- RootTag
  - LegacyRoot 0
    - 不支持并发, 兼容旧版
  - BlockingRoot 1
    - 支持并发
    - 可以中断，提高用户体验
  - ConcurrentRoot 2
    - 支持并发
- createHydrationContainer
  - 将预先渲染的 HTML 结构与客户端的 React 组件树关联起来
- React.act
  - 等待更新完成
- 参考
  - https://github.com/pmndrs/react-nil
    - Async Components https://github.com/pmndrs/react-nil/issues/18
  - https://www.npmjs.com/package/react-reconciler
