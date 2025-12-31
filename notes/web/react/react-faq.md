---
title: React FAQ
tags:
  - FAQ
---

# React FAQ

:::tip

- memo 组件不能接受不了 Context 更新
  - RFC [useContextSelector](https://github.com/reactjs/rfcs/pull/119)
  - [use-context-selector](https://github.com/dai-shi/use-context-selector)

:::

## 如何设计组件

- 面向组件设计 - 组件驱动开发

---

- CSF - Component Story Format
  - [ComponentDriven/csf](https://github.com/ComponentDriven/csf)
  - [Component Story Format (CSF)](https://storybook.js.org/docs/react/api/csf/)
- [Component Driven](https://www.componentdriven.org/)
  - How to be Component Driven
    1. Build one component at a time - Avatar, Button, Input, Tooltip
    2. Combine components - Form, Header, List, Table
    3. Assemble pages - Home page, Settings page, Profile page
    4. Integrate pages into your project - Web app, Marketing site, Docs site

## React Context

- Context.Provider value 修改需要 rerender 组件
- 一般 Provider 都在比较上层，因此可能会有性能问题
- 使用不会变的 value
  - 不将状态内容作为 value
  - 例如 使用 rxjs BehaviorSubject 作为 value 则可以避免变化，也能订阅变化
  - 可使用 zustand 替代

## forwardRef Typescript 添加静态属性

1. assign

```tsx
const Layout = forwardRef(() => {
  return null;
});
Layout.displayName = 'MainLayout';
// 添加静态属性，TS 不会出错
export const MainLayout = Object.assign(Layout, { Slot });
```

2. 定义属性

```tsx
export type Props = {};

export interface CompoundedComponent
  extends React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLInputElement>> {
  yourStaticFunctionOrSomethingLikeThat: () => void;
}

const Component = React.forwardRef<HTMLInputElement, Props>((props, ref) => (
  <input ref={ref} {...props} />
)) as CompoundedComponent;

Component.yourStaticFunctionOrSomethingLikeThat = () => {};
```

---

- Compound Components
- [Compound Components with TypeScript](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/34757#issuecomment-894053907)

## StrictMode

- 在 dev 时渲染两次来检测潜在问题 - Detecting unexpected side effects
  - constructor
  - componentWillMount (or UNSAFE_componentWillMount)
  - componentWillReceiveProps (or UNSAFE_componentWillReceiveProps)
  - componentWillUpdate (or UNSAFE_componentWillUpdate)
  - getDerivedStateFromProps
  - shouldComponentUpdate
  - render
  - setState
- Ensuring reusable state - 模拟 umount、remount
  - componentDidMount
  - componentWillUnmount
  - useEffect
  - useLayoutEffect
  - useInsertionEffect

---

- [React Strict Mode](https://reactjs.org/docs/strict-mode.html)

## useEffect 无依赖 vs. 直接执行

```ts
const callbackRef = useRef(callback);

// 1. useEffect
useEffect(() => {
  callbackRef.current = callback;
});

// 2. 直接赋值
callbackRef.current = callback;
```

- 执行时机不同
  - useEffect 和其他 useEffect 是顺序执行的
    - 可能会延迟执行
  - 直接赋值会在最开始执行
    - 必然会执行

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

## React Class Components vs Function Components

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

## shouldComponentUpdate for Function component

```tsx
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

- [Preventing rerenders with React.memo and useContext hook](https://github.com/facebook/react/issues/15156#issuecomment-474590693)
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

## iframe

```tsx
class A extends React.Component {
  render() {
    return <iframe src='https://www.youtube.com/embed/cWDJoK8zw58' />;
  }
}
class B extends React.Component {
  render() {
    return <div dangerouslySetInnerHTML={{ __html: "<iframe src='https://www.youtube.com/embed/cWDJoK8zw58' />" }} />;
  }
}
```

## CSS in JS

1. 动态注入 CSS

- styled, jsx

2. 预定义 Class

- tailwind

3. 动态 Class 注入 CSS

- [tw-in-js/twind](https://github.com/tw-in-js/twind)

---

- [Implementing RUI, Replit's Design System](https://blog.replit.com/rui-eng)

## 被注入 canvas

```html
<html style="overflow:hidden" lang="en">
  <canvas
    style="inset: 0px; pointer-events: none; position: fixed; z-index: 1000000000;"
    width="1920"
    height="514"
  ></canvas>
  <head></head>
</html>
```

- 由 React Developer Tools 注入

## Cannot assign to read only property '\_status' of object

- 可能 React.lazy 导致
- 可能 隐藏了实际异常

## Typescript 类型

- React.JSX.Element
- ReactElement
- React.Element

## 空内容

- React.Element
  - `<React.Fragment />`
  - `<></>`
- ReactNode
  - false, null, undefined, true

## TypeError: Cannot read properties of null (reading 'useRef')

## Typescript

```ts
React.ButtonHTMLAttributes<HTMLButtonElement>;
React.HTMLProps<HTMLButtonElement>; // 类型范围被扩大，例如 button 的 type 变成 string
React.HTMLAttributes<HTMLDivElement>; // -> AllHTMLAttributes
React.ComponentProps<'div'>; // =ComponentPropsWithRef -> React.JSX.IntrinsicElements
React.ComponentPropsWithoutRef<'div'>; // 推荐用法
React.ComponentPropsWithRef<'div'>; //  如果需要 forward

React.JSX.IntrinsicElements['button'];
```

- HTMLProps
  - 包含更多的内容，例如 ref
- [React TypeScript Cheatsheets](https://github.com/typescript-cheatsheets/react)
- [Patterns by Use Case](https://github.com/typescript-cheatsheets/react/blob/main/docs/advanced/patterns_by_usecase.md)

## ref props

- 将 ref 作为 props 而不是特殊的 forwardRef
- React 19 默认行为
- 支持这样用
- 遗留问题 - ref 可能需要特殊处理
  - class component
    - ref 指向 class instance
    - 2019 后推荐使用函数写组建
  - HOC
- 部分场景存在 introspect ref 并做合并修改
- 参考
  - [Merging Refs](https://www.youtube.com/watch?v=m4QbeS9BTNU)

## as props

- 用于指定组件类型
- 类似的 asChild - 不渲染组件，只传递 props
  - 也可以认为是 as=Fragment

## Error: Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.

## registry

```ts
addReact('YourComponentName', YourComponent);
define('YourComponentName', componentBlueprint);
getDefinition('YourComponentName');
getInstance('YourComponentName', componentID);
isDefined('YourComponentName');
```

- https://www.manageiq.org/docs/guides/ui/register_react_component
- https://github.com/ryansolid/component-register
- https://www.builder.io/c/docs/custom-components-setup
- https://github.com/microsoft/fluentui/tree/master/packages/fluentui/react-component-nesting-registry
- https://github.com/lmerotta-zz/react-plugins

## NotFoundError: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.

- 替代 Fragment 为 div

## Reference: Web Components & React

- [reactjs/rfcs#64](https://github.com/reactjs/rfcs/pull/64#issuecomment-431507924)
- [webcomponents/polyfills](https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs#custom-elements-es5-adapterjs)
- [React Web Components](https://reactjs.org/docs/web-components.html)

```jsx
const Button = lazy(() => import('./components').then((module) => ({ default: module.Button })));

function BrickFlipbox() {
  return (
    <brick-flipbox class='demo'>
      <div>front</div>
      <div>back</div>
    </brick-flipbox>
  );
}

class XSearch extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('span');
    this.attachShadow({ mode: 'open' }).appendChild(mountPoint);

    const name = this.getAttribute('name');
    const url = 'https://www.google.com/search?q=' + encodeURIComponent(name);
    ReactDOM.render(<a href={url}>{name}</a>, mountPoint);
  }
}
customElements.define('x-search', XSearch);
```

```js
// 修改属性
React.cloneElement(child, {
  className: className || null,
});
```

## Performance Resources

- [react-performance.md](https://github.com/markerikson/react-redux-links/blob/master/react-performance.md)
- [React Performance Optimization](https://gist.github.com/slikts/e224b924612d53c1b61f359cfb962c06)
- [React Optimization Checklist](https://gist.github.com/slikts/fd3768de1493419ed9506002b452fcdc)
