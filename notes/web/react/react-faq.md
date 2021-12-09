---
title: React FAQ
tags:
  - FAQ
---

# React FAQ

## React Pattern

- innerRef, elementRef, forwardRef 透传内部引用

## React Context

- Context.Provider value 修改需要 rerender 组件
- 一般 Provider 都在比较上层，因此可能会有性能问题
- 使用不会变的 value
  - 不将状态内容作为 value
  - 例如 使用 rxjs BehaviorSubject 作为 value 则可以避免变化，也能订阅变化
  - 可使用 zustand 替代

## 如何选择运行时框架

最早的 React 开发一般使用 CRA，但 CRA 基于 webpack，异常的慢，在 2021 年不再值得使用。

---

- 选择依据
  - 单页面 - vite, nextjs
    - 复杂前端
    - 动态模块 - systemjs, dynamic import, esm
  - 多页面 - vite, nextjs, remix
    - 支持多页面 export
  - 单 HTML 入口 vs. 多 HTML 入口
    - vitejs 支持 多 HTMl 入口
    - nextjs 只支持 单 HTML 入口
  - 需要 SEO/SSR - nextjs, remix
  - 全栈 - nextjs, remix
  - 路由类型
    - 客户端控制 - SPA - vite
    - 服务端控制 - nextjs, remix
  - 网站内容类型
    - 管理后台 - 单页、复杂、CS 交互
    - 营销 - SEO、静态、增量
    - 电商 - 数据、SEO、静态
  - 部署方式
    - 静态 - 需要导出
    - 动态 - 启动服务
      - 部署 NodeJS 会比较麻烦 - node_modules 很大
    - Serverless
- 现在 CS 混合渲染越来越多，值得尝试
- React Server Components 也是一个趋势
  - 组建级动态

## class components vs function components

```tsx title="React.Component"
import React from 'react';

class Hello extends React.Component<{ name: string }, { name: string }> {
  static props = {
    name: 'Wener',
  };

  static getDerivedStateFromProps({ name }) {
    return { name };
  }

  constructor(props) {
    super(props);
  }

  render() {
    return <h1>Hello, {this.state.name}</h1>;
  }

  componentDidMount() {
    console.debug(`componentDidMount`);
  }

  getSnapshotBeforeUpdate(prevProps: Readonly<{ name: string }>, prevState: Readonly<{ name: string }>): any {
    return {};
  }

  componentDidUpdate(prevProps: Readonly<{ name: string }>, prevState: Readonly<{ name: string }>, snapshot?: any) {
    console.debug(`componentDidUpdate`);
  }

  componentWillUnmount() {
    console.debug(`componentWillUnmount`);
  }

  shouldComponentUpdate(
    nextProps: Readonly<{ name: string }>,
    nextState: Readonly<{ name: string }>,
    nextContext: any,
  ): boolean {
    return false;
  }

  /**
   * ErrorBoundary - 仅 ClassComponent 支持
   */
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log(`componentDidCatch`);
  }
}
```

```tsx title="React.FC"
const HelloFC: React.FC<{ name: string }> = ({ name }) => {
  const [state, setState] = useState({ name });
  // getDerivedStateFromProps
  useEffect(() => {
    setState({ name });
  }, [name]);
  useEffect(() => {
    console.debug('componentDidMount');
    return () => {
      console.debug('componentWillUnmount');
    };
  }, []);

  // render
  return (
    <h1>
      Hello, <input value={state.name} onChange={(e) => setState({ name: e.target.name })} />
    </h1>
  );
};
HelloFC.displayName = 'HelloFC';
HelloFC.defaultProps = { name: 'Wener' };

const HelloMemo = React.memo(HelloFC, (a, b) => {
  // shouldComponentUpdate
  return a.name === b.name;
});
```

## Cannot update a component while rendering a different component

- 避免 render 阶段修改状态
- 参考
  - [facebookexperimental/Recoil#12](https://github.com/facebookexperimental/Recoil/issues/12)

```ts
// from
if (storeRef.current && !isEqual(preloadRef.current, props)) {
  console.debug(`DashboardStoreProvider: update preload`);
  preloadRef.current = props;
  storeRef.current.setState(props as any);
}

// to
useDeepCompareEffect(() => {
  if (storeRef.current) {
    storeRef.current.setState(props as any);
  }
}, [props]);
```

## 上下文变化但不从新渲染

0. 使用能够 selector 的状态管理库 - 允许读取部分状态
1. 使用能区分 read 和 write 的库 - 允许独立更新

---

- https://github.com/facebook/react/issues/15156#issuecomment-474590693
  - 拆分大对象上下文 - 避免直接修改
    - 区分常变化的上下文和不常变化的上下文
  - 拆分组件，使用 memo hoc 组件
    - 组件避免不必要刷新
  - 单个组件，使用 useMemo 构建组件
    - 逻辑构建不刷新组件
  - 建议不用 context 来传递数据，使用订阅
  - RFC [useContextSelector](https://github.com/reactjs/rfcs/pull/119)
    - [use-context-selector](https://github.com/dai-shi/use-context-selector)
- [Will this React global state work in Concurrent Mode?](https://github.com/dai-shi/will-this-react-global-state-work-in-concurrent-mode)

## 动态加载 script

react-helmet, next/head 支持 script 标签，但无法检测状态。
react-helmet 可以支持一个 onChangeClientState 来检测。

可以考虑 [useScript](https://usehooks.com/useScript/) 自行封装一个。
