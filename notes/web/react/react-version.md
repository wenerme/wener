---
title: React Version
tags:
  - Version
---

# React Version

| ver                      | date       |
| ------------------------ | ---------- |
| [React 18](#react-18)    |
| [React 17](#react-17)    | 2020-10-20 |
| [React 16.8](#react-168) | 2019-02-06 |

:::tip Roadmap

- 支持自定义元素属性 - [#11347](https://github.com/facebook/react/issues/11347)
  - 更好支持 WebComponents
  - React 19

:::

:::info

- Add a "module" entry in package.json [#10021](https://github.com/facebook/react/issues/10021)
  - React 作为 ESM
  - 目前主要问题是 cjs 和 esm 混合可能导致各种问题 - react 不能轻易变动
  - 目前大的生态在放弃 cjs - 还是会保留 umd
- Formalize top-level ES exports [#11503](https://github.com/facebook/react/issues/11503)
  - 解决 `import * as React` 问题
  - 目前 ESM 内已经使用 `import React from 'react';` - 2020-02 [#18102](https://github.com/facebook/react/pull/18102)
- Support for reparenting  [#3965](https://github.com/facebook/react/issues/3965)
- Remove Factory Components [#13560](https://github.com/facebook/react/issues/13560)
  - deprecated in React 17.x

:::

- [create-element-changes.md](https://github.com/reactjs/rfcs/blob/createlement-rfc/text/0000-create-element-changes.md)
- 2022-06 [What We've Been Working On](https://reactjs.org/blog/2022/06/15/react-labs-what-we-have-been-working-on-june-2022.html)
  - Server Components
  - Asset Loading
  - SSR 优化
  - React Optimizing Compiler
  - Offscreen
  - Transition Tracing

## React 18

:::caution

- FC 默认无 children 属性

:::

- automatic batching
- concurrent feature
  - startTransition
  - useTransition
  - useDeferredValue
    - 类似 useDebounedValue 但结合 React 并行进行渲染，而不是自行决定 delay 时间
    - 提升 UX 体验
  - APIs for library
    - useId - for ARIA - aria-labaledby
    - 生成表单元素
    - [useSyncExternalStore](https://github.com/reactwg/react-18/discussions/86)
    - useInsertionEffect
- streaming server renderer
  - suspense on server
    - 细粒度控制 hydration
      - hydration 不会阻塞浏览器，可能会被中断，根据用户操作进行优先
- 实验特性
  - server component - 可通过 nextjs 使用
  - React.memo - UX vs DX
    - React Forget - 自动 memo 的编译器
- 参考
  - What's New in React 18? [HN](https://news.ycombinator.com/item?id=28696748)
- ReactDOM.render -> ReactDOM.createRoot

```jsx
// before
ReactDOM.render(<App />, el);
// after
const root = ReactDOM.createRoot(el);
root.render(<App />);

// 服务端渲染 为 aria 生成唯一 ID
const MyInputs = () => {
  const id = useId();
  return (
    <>
      <label htmlForm={`${id}-name`}>Name</label>
      <input id={`${id}-name`} />
    </>
  );
};
```

## React 17

- 内部结构变化，为下一个版本做准备 - 无功能变化
- children 处理有变化 - 总是作为 props 传递
  - 早期区分是为了在 DEV 时区别静态和动态内容
- key 独立传递 - `jsx('div', props, key)`
- depreacted componentWillMount, componentWillReceiveProps, componentWillUpdate
  - polyfill [react-lifecycles-compat](https://github.com/reactjs/react-lifecycles-compat)
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
import {jsx as _jsx} from 'react/jsx-runtime';

function App() {
  // return React.createElement('h1', null, 'Hello world');
  return _jsx('h1', {children: 'Hello world'});
}
```

- React DOM
  - `ReactDOM.render(<App />, rootNode)` 会在 rootNode 监听事件 - 之前是 document 上监听

## React 16.8

- 新增 Functional Component
- 新增 Hooks
