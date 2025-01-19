---
title: React Patterns
tags:
  - Pattern
---

# React Patterns

| name                                                      | note                                         |
| --------------------------------------------------------- | -------------------------------------------- |
| _基础_                                                    |
| [条件渲染](#conditonal-rendering)                         | `?:`                                         |
| [上下文](#provider-and-context)                           | `createContext`, `useContext`                |
| [自定义 Hooks](#custom-hooks) 复用逻辑                    | `useXxx`                                     |
| [高阶组建](#hoc)                                          | `withProps(Comp)`                            |
| [渲染属性](#render-props)                                 | `render`, `children`                         |
| [布局组件](#layout-components)                            |
| [组合组件](#compound-components)                          | `Layout.Sidebar`                             |
| [展现和容器组建](#prsentational-and-container-components) |
| [代理组件](#proxy-component)                              | `const Btn = (props)=> <button {...props}/>` |
| [受控组建](#controlled-and-uncontrolled-components)       |
| _高级_                                                    |
| [as 属性](#as-props) 自定义组建                           | `<Button as='a'/>`                           |
| [control 属性](#control-props) 传递不透明上下文           | `<Controller control={control}/>`            |
| [flexRender](#flex-render) 灵活渲染组建和元素             |
| [组建外状态](#out-of-tree-state) 细粒度控制状态和渲染     | `useStore()`                                 |
| [Hooks from Context](#hooks-from-context)                 | `useTableHooks()`                            |
| [Portal cross boundary](#portal-cross-boundary)           |

- `innerRef`, `elementRef` - forwardRef 透传内部引用
- `mergeRefs` - 合并多个 ref，使得外部和内部都能拿到 ref
- `defaultValue`, `defaultValues`, `initialValues` - 初始状态 props
- Prop Collections and Getters
  - 传递 getXyzProps 返回的 props 到 Component
- State Initializers - 状态初始器 - `<Comp createState={()=>({})}/>`
- Array as children
- Style component - 同 Proxy component 但关注样式属性
- Container component
  - 获取数据，传递给具体组件
- State hoisting
  - 提升状态倒上层
  - 例如: 表单
- State reducer pattern
  - 基于 Command 操作状态
  - 可以 Rewind
  - 可以全局状态 - 可跟踪
  - 写起来相对繁琐

---

- https://reactpatterns.com/

## Sidecar

- 分离业务逻辑和渲染

```tsx
const ResourceList = () => {
  return (
    <Root>
      <Sidecar />
      List Content
    </Root>
  );
};

// 封装所有业务逻辑，不渲染内容
const Sidecar = () => {
  const store = useRootStore();
  const { pageSize } = useStore(
    store,
    useShallow(({ pageSize }) => ({ pageSize })),
  );

  const { data, loading, error } = useQuery({
    variables: { pageSize },
  });
  useEffect(() => {
    store.setState({ data, loading, error });
  }, [data, loading, error]);
  return null;
};
```

## Raw State vs State Wrapper

- Raw State
  - 直接、易于理解、灵活
  - 直接暴露 state 和操作方法
  - actions 封装部分预设的操作逻辑
- State Wrapper
  - 封装、可维护（没有暴露过多细节）、易扩展、适用于复杂场景
  - 本质还是维护和操作 state
  - 但是使用体验上感觉是在操作组件

```tsx
// Raw State
type StoreState = {
  active: any;

  actions: {
    setActive: (active: any) => void;
  };
};

// State Wrapper
type ReactTable = {
  state: any;
  getOptions: () => any;
  setPageSize: (size: number) => void;
};
```

## Composable Primitive

- 原子组件
- 组合、复用
- 参考
  - cmdk
  - radix-ui
  - base-ui

```tsx
const MyList = ()=>{
  return (
    <List.Root>
      <List.Header>Header</List.Header>
      <List.Search></List.Search>
      <List.Item>1</List.Item>
      <List.Item>2</List.Item>
    </List>
  );
}
```

## Non-Rendering State Management Components {#non-rendering-state-management-components}

- 避免 rerender
- 状态/hook 复用

```tsx
export const CurrentListTableQueryReactor = () => {
  let store = useReactTableStore();
  let { useListQuery } = useListQueryContext();
  const { data } = useListQuery();

  useEffect(() => {
    if (!data) return;
    store.getState().setOptions((prev) => ({
      ...prev,
      data: data.data,
      rowCount: data.total,
    }));
  }, [data]);

  return null;
};
```

## Portal cross boundary {#portal-cross-boundary}

- createPortal 可以跨越边界, 且共享状态
- 可以直接渲染到 window.open 的窗口
- 可以直接渲染到 iframe
- 可以直接渲染到 shadow dom

# 自定义 Hooks {#custom-hooks}

- Custom Hook Pattern
- 逻辑复用
- 封装公共业务逻辑

## 控制属性 {#control-props}

- Control Props Pattern
- 传递一个 opaque/不透明 的 controller
- 隐藏内部实现
- 例如: react-hook-form 的 control 参数
- 例如: 直接传递 zustand 的 store
- Material UI

## flex render

- 允许传 Component 或者 ReactElement
- 允许覆盖或合并 props
- 例如: react-table

```tsx
import React, { ReactElement, ReactNode } from 'react';
import { mergeProps as defaultMergeProps } from '@wener/reaction';
import { isReactComponent } from '@wener/reaction';

/**
 * FlexRenderable maybe a component maybe an element
 *
 * The Component doesn't have to match the props type
 */
export type FlexRenderable<TProps> = React.ReactNode | React.ComponentType<Partial<TProps>>;

/**
 * flexRender will try to render a component or a React node
 *
 * When passing a {@link mergeProps}, will clone the element and merge the props.
 *
 * @param Comp component or react node
 * @param props props to pass to component
 * @param mergeProps merge props to pass to component
 * @see {@link https://github.com/TanStack/table/blob/af00c821b7943bc0f6d62a19b3ad514e3f315d75/packages/react-table/src/index.tsx TanStack/table}
 */
export function flexRender<TProps extends object>(
  Comp: FlexRenderable<TProps>,
  props: TProps,
  mergeProps?: ((a: TProps, b: TProps) => TProps) | true,
): ReactNode | ReactElement {
  if (!Comp) {
    return null;
  }
  if (isReactComponent<TProps>(Comp)) {
    return <Comp {...props} />;
  }
  // for mergeProps
  {
    if (mergeProps === true) {
      mergeProps = flexRender.mergeProps;
    }
    if (typeof mergeProps === 'function' && typeof Comp === 'object' && 'props' in Comp) {
      return React.cloneElement(Comp, (mergeProps as any)(Comp.props, props));
    }
  }
  // various ReactNode types
  return Comp as any;
}

flexRender.mergeProps = defaultMergeProps;
```

## out of tree state

- 可以在 React 组建外控制状态
- 可以细粒度控制 渲染
- 可按需监听变化
- 抽取业务逻辑
- [zustand](./zustand.md), [valtio](./valtio.md), [jotai](./jotai.md)

```tsx
const CounterStore = createStore(0);

const Counter = () => {
  const count = useStore(CounterStore);
  return <div onClick={() => CounterStore.setState((s) => s + 1)}>{count}</div>;
};
```

## as props

- 允许自定义组件类型
- 例如 Button 组件可以是 button, a, div, Link 等
- 例如 Container 组建可以时 form, div, fieldset 等

```tsx
const Button: React.FC<{ as?: any }> = ({ as: As = 'button', ...props }) => {
  return <As {...props} />;
};
```

## 高阶组件 {#hoc}

- HOC - Higher Order Components
- 预设 props
- 对 组建进行 修饰/wrapper/decorator

```tsx
const MyButton = withStyle(Button, { className: '' });
```

## 代理组件 {#proxy-component}

- 实现自定义主题、样式

```tsx
const Button = (props) => <button type='button' {...props} />;
```

## 渲染属性 {#render-props}

```tsx
const Node = (
  <Comp
    // render props
    render={({ isActive }) => (isActive ? 'Active' : '')}
    // props based on state
    className={{ isActive } ? 'active' : ''}
  >
    {/* render props as children */}
    {/* 函数做为子元素 - function as children */}
    {({ isActive }) => (isActive ? 'Active' : 'Inactive')}
  </Comp>
);
```

## 组合组件 {#compound-components}

```tsx
const Layout = ({ children }) => {
  return <div>{children}</div>;
};
Layout.Sidebar = ({ children }) => {
  return <aside>{children}</aside>;
};
```

## 布局组件 {#layout-components}

```tsx
const Layout = ({ sidebar, status, menu,children }) => (
  <div>
    <menu>{menu}</menu>
    <aside>{sidebar}</aside>
    <main>{children}</main>
    <footer>{status}</aside>
  </div>
);
```

## Provider and Context

- React 的 IoC
- Provider/Context
- createContext
  - 按需创建 Context
  - 多个相同 Context 并存

:::caution

- memo 会导致 Context 变化无法被检测到
- useContext 不支持 select 可能导致性能问题 - 大状态需要注意
  - 可以使用 out of tree state 解决

:::

## Controlled and Uncontrolled Components

```tsx
// state = value
const MyComp = ({ state, onStateChange }) => {
  return <div></div>;
};
```

**可控组件**

```tsx
const MyComp: React.FC<{
  value: any;
  onChange?: (value: any) => void;
  defaultValue?: any;
}> = (props) => {
  const [value, setValue] = useControllable(props);
  return <div></div>;
};
```

## Prsentational and Container Components

- 业务逻辑和展现逻辑分离
- 业务逻辑放到 Container Components
- 展现逻辑放到 Prsentational Components

## 条件渲染 {#conditonal-rendering}

```tsx
const Comp = ({ condition }) => {
  return <>{condition ? <div>True</div> : <div>False</div>}</>;
};
```

:::tip 相同位置组建会保留状态

```tsx
const Comp = ({ condition }) => {
  return (
    <>
      {/* 会保留状态: 因为相同组建，位置相同 */}
      {condition ? <Counter name='YES' /> : <Counter name='NO' />}

      {/* 不会保留状态: 位置不同  */}
      {condition && <Counter name='YES' />}
      {condition || <Counter name='NO' />}
    </>
  );
};
```

:::

## Hooks from Context

- 避免传递非常深的 props
- 通过 Context 传递 Hooks
- 让组件可以自行选择是否使用 Hooks
- 抽取公共组建逻辑
- 可修改 children 的逻辑

```tsx
interface TableHooks<T extends {id:string}>{
  // react-query
  useQuery: (opts) => UseQueryResult<T>;
  useSelected: () => T[];
}

const useTableHooks(){
  return useContext(TableHooksContext);
}
```

## Slot Pattern

- 组件传递逻辑层的 IoC
- 类似 WebComponents 的 slot 属性
- Pros
  - 解偶 需要自上而下 传参数的问题
  - 思维层更直观 - 不需要关心如何展现的，只需要关心需要展现
  - 逻辑通用
- Cons
  - Slot 如果不限定上下文可能会混淆 - 通过 `createSlotContext` + Compound Component 方式避免
  - 直接传递 children 到别的节点会丢失 Context
    - 实际 Context 不是 Slot 位置的 Context
    - 可以用 Portal 解决
    - 可以把 Context 放到更上层解决
- 参考
  - [Web Components > Using templates and slots](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots)

```tsx
const SlotDemo = (
  <Layout>
    <Layout.Slot name='Sidebar' placement='top'>
      Menus
    </Layout.Slot>
    <Layout.Slot name='Footer' placement='right'>
      Copyright
    </Layout.Slot>
    <h3>Layout Title</h3>
    <section>Content</section>
  </Layout>
);
```
