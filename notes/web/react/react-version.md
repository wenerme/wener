---
title: React Version
---

# React Version

- [create-element-changes.md](https://github.com/reactjs/rfcs/blob/createlement-rfc/text/0000-create-element-changes.md)

| ver  | date       |
| ---- | ---------- |
| 18   |
| 17   | 2020-10-20 |
| 16.8 | 2019-02-06 |

## 18

- automatic batching
- startTransition
- React.lazy - streaming server renderer
- concurrent rendering

## 17

- 内部结构变化，为下一个版本做准备 - 无功能变化
- children 处理有变化 - 总是作为 props 传递
  - 早期区分是为了在 DEV 时区别静态和动态内容
- key 独立传递 - `jsx('div', props, key)`
- 不再需要对事件进行 persist

```jsx
<input
  onChange={(e) => {
    e.persist(); // 17 之后不再需要
    update((s) => {
      // 之前如果不 persist 可能为 null
      s.value = e.target.value;
    });
  }}
/>
```

- 新的 JSX 转换 - jsx 不再需要引入 React
  - react/jsx-runtime
  - react/jsx-dev-runtime
  - 也可以与其他 JSX 项目共享

```jsx
import { jsx as _jsx } from 'react/jsx-runtime';

function App() {
  // return React.createElement('h1', null, 'Hello world');
  return _jsx('h1', { children: 'Hello world' });
}
```

- React DOM
  - `ReactDOM.render(<App />, rootNode)` 会在 rootNode 监听事件 - 之前是 document 上监听

## 16.8

- 引入 Hooks
